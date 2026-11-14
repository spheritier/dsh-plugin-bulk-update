export type PanelCopy = {
  checkProgress: (done: number, total: number) => string
  updateProgress: (done: number, total: number) => string
  errorsTitle: string
  checkFailure: string
  updateFailure: string
  listLabel: string
  restartRequired: string
  overridden: string
  restoreLabel: string
}

const COPY: Record<string, PanelCopy> = {
  en: {
    checkProgress: (done, total) => `Checked ${done} of ${total}`,
    updateProgress: (done, total) => `Processed ${done} of ${total}`,
    errorsTitle: 'Error details', checkFailure: 'Could not check this plugin.',
    updateFailure: 'The update did not complete. DSH provided no further details.',
    listLabel: 'Available plugin updates', restartRequired: 'Restart DSH to finish applying the update.',
    overridden: 'The update is installed, but a higher-priority setting overrides its activation.', restoreLabel: 'Restoring the previous version',
  },
  ru: {
    checkProgress: (done, total) => `Проверено ${done} из ${total}`,
    updateProgress: (done, total) => `Обработано ${done} из ${total}`,
    errorsTitle: 'Причины ошибок', checkFailure: 'Не удалось проверить этот плагин.',
    updateFailure: 'Обновление не завершено. DSH не сообщил дополнительных сведений.',
    listLabel: 'Доступные обновления плагинов', restartRequired: 'Для применения обновления перезапустите DSH.',
    overridden: 'Обновление установлено, но его включение переопределено настройкой с более высоким приоритетом.', restoreLabel: 'Восстановление предыдущей версии',
  },
  zh: {
    checkProgress: (done, total) => `已检查 ${done} / ${total}`,
    updateProgress: (done, total) => `已处理 ${done} / ${total}`,
    errorsTitle: '错误详情', checkFailure: '无法检查此插件。',
    updateFailure: '更新未完成，DSH 未提供更多详情。',
    listLabel: '可用插件更新', restartRequired: '请重启 DSH 以完成应用更新。',
    overridden: '更新已安装，但其启用状态被更高优先级的设置覆盖。', restoreLabel: '恢复上一版本',
  },
  ja: {
    checkProgress: (done, total) => `確認済み ${done} / ${total}`,
    updateProgress: (done, total) => `処理済み ${done} / ${total}`,
    errorsTitle: 'エラーの詳細', checkFailure: 'このプラグインを確認できませんでした。',
    updateFailure: '更新が完了しませんでした。DSH から追加の詳細はありません。',
    listLabel: '利用可能なプラグイン更新', restartRequired: '更新を適用するには DSH を再起動してください。',
    overridden: '更新はインストール済みですが、有効化は優先度の高い設定で上書きされています。', restoreLabel: '以前のバージョンの復元',
  },
  de: {
    checkProgress: (done, total) => `${done} von ${total} geprüft`,
    updateProgress: (done, total) => `${done} von ${total} bearbeitet`,
    errorsTitle: 'Fehlerdetails', checkFailure: 'Dieses Plugin konnte nicht geprüft werden.',
    updateFailure: 'Das Update wurde nicht abgeschlossen. DSH hat keine weiteren Details geliefert.',
    listLabel: 'Verfügbare Plugin-Updates', restartRequired: 'Starte DSH neu, um das Update anzuwenden.',
    overridden: 'Das Update ist installiert, aber eine höher priorisierte Einstellung überschreibt seine Aktivierung.', restoreLabel: 'Vorherige Version wiederherstellen',
  },
  es: {
    checkProgress: (done, total) => `Comprobados ${done} de ${total}`,
    updateProgress: (done, total) => `Procesados ${done} de ${total}`,
    errorsTitle: 'Detalles de errores', checkFailure: 'No se pudo comprobar este plugin.',
    updateFailure: 'La actualización no se completó. DSH no proporcionó más detalles.',
    listLabel: 'Actualizaciones de plugins disponibles', restartRequired: 'Reinicia DSH para aplicar la actualización.',
    overridden: 'La actualización está instalada, pero un ajuste de mayor prioridad anula su activación.', restoreLabel: 'Restauración de la versión anterior',
  },
  fr: {
    checkProgress: (done, total) => `${done} sur ${total} vérifiés`,
    updateProgress: (done, total) => `${done} sur ${total} traités`,
    errorsTitle: 'Détails des erreurs', checkFailure: 'Impossible de vérifier ce plugin.',
    updateFailure: 'La mise à jour ne s’est pas terminée. DSH n’a fourni aucun détail supplémentaire.',
    listLabel: 'Mises à jour de plugins disponibles', restartRequired: 'Redémarrez DSH pour appliquer la mise à jour.',
    overridden: 'La mise à jour est installée, mais un réglage de priorité supérieure remplace son activation.', restoreLabel: 'Restauration de la version précédente',
  },
  pt: {
    checkProgress: (done, total) => `Verificados ${done} de ${total}`,
    updateProgress: (done, total) => `Processados ${done} de ${total}`,
    errorsTitle: 'Detalhes dos erros', checkFailure: 'Não foi possível verificar este plugin.',
    updateFailure: 'A atualização não foi concluída. O DSH não forneceu mais detalhes.',
    listLabel: 'Atualizações de plugins disponíveis', restartRequired: 'Reinicie o DSH para aplicar a atualização.',
    overridden: 'A atualização foi instalada, mas uma configuração de maior prioridade substitui sua ativação.', restoreLabel: 'Restauração da versão anterior',
  },
}

export function panelCopyFor(locale: string): PanelCopy {
  return COPY[locale.toLowerCase().split(/[-_]/u, 1)[0]] ?? COPY.en
}
