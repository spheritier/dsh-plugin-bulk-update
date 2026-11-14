// Render diagnostic text, never HTML. Keep useful details without exposing common credential forms.
export function safeDiagnostic(value: string): string {
  return value
    .replace(/\x1b\[[0-?]*[ -/]*[@-~]/gu, '')
    .replace(/\b(Bearer|Basic)\s+[A-Za-z0-9._~+\/-]+=*/giu, '$1 [redacted]')
    .replace(/((?:_authToken|api[_-]?key|password|access[_-]?token)\s*[=:]\s*)["']?[^\s"',;]+/giu, '$1[redacted]')
    .replace(/(https?:\/\/)[^\s/@]+:[^\s/@]+@/giu, '$1[redacted]@')
    .trim()
}

export function failureDetail(value: unknown, fallback: string): string {
  const lines: string[] = []
  const seen = new Set<unknown>()
  function read(item: unknown, depth = 0): void {
    if (depth > 3 || item == null || seen.has(item)) return
    seen.add(item)
    if (typeof item === 'string') { if (item.trim()) lines.push(item); return }
    if (typeof item !== 'object') return
    const record = item as Record<string, unknown>
    for (const key of ['code', 'message', 'diagnostic', 'reason', 'kind', 'unmet']) {
      if (typeof record[key] === 'string' && record[key].trim()) lines.push(record[key])
    }
    if (record.timedOut === true) lines.push('timeout')
    if (typeof record.exitCode === 'number' && record.exitCode !== 0) lines.push(`exitCode: ${record.exitCode}`)
    if (Array.isArray(record.incompatible)) {
      for (const issue of record.incompatible) {
        if (issue && typeof issue === 'object') {
          const { name, version, runtimeVersion, requirements } = issue as Record<string, unknown>
          const requirementText = requirements && typeof requirements === 'object'
            ? Object.entries(requirements).map(([key, range]) => `${key}: ${String(range)}`).join('; ') : ''
          lines.push(`${String(name ?? '')}@${String(version ?? '')} (DSH ${String(runtimeVersion ?? '')}): ${requirementText}`)
        }
      }
    }
    read(record.error, depth + 1)
    read(record.packageResult, depth + 1)
    if (typeof record.output === 'string' && record.output.trim()) {
      lines.push(record.output.length > 8000 ? `…\n${record.output.slice(-8000)}` : record.output)
    }
    if (typeof record.logPath === 'string' && record.logPath) lines.push(`logPath: ${record.logPath}`)
    if (typeof record.application === 'string') lines.push(`application: ${record.application}`)
  }
  read(value)
  const text = [...new Set(lines.map(safeDiagnostic).filter(Boolean))].join('\n')
  return text ? (text.length > 14000 ? `${text.slice(0, 14000)}\n…` : text) : fallback
}
