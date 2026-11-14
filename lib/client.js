window.__ModuleLoader__.load({
	id: "dsh-plugin-bulk-update",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		// \0rolldown/runtime.js
		var __create = Object.create;
		var __defProp = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __getProtoOf = Object.getPrototypeOf;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
		var __copyProps = (to, from, except, desc) => {
			if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
				key = keys[i];
				if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
					get: ((k) => from[k]).bind(null, key),
					enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
				});
			}
			return to;
		};
		var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
			value: mod,
			enumerable: true
		}) : target, mod));
		let react = require("react");
		react = __toESM(react, 1);
		// src/client/diagnostics.ts
		function safeDiagnostic(value) {
			return value.replace(/\x1b\[[0-?]*[ -/]*[@-~]/gu, "").replace(/\b(Bearer|Basic)\s+[A-Za-z0-9._~+\/-]+=*/giu, "$1 [redacted]").replace(/((?:_authToken|api[_-]?key|password|access[_-]?token)\s*[=:]\s*)["']?[^\s"',;]+/giu, "$1[redacted]").replace(/(https?:\/\/)[^\s/@]+:[^\s/@]+@/giu, "$1[redacted]@").trim();
		}
		function failureDetail(value, fallback) {
			const lines = [];
			const seen = /* @__PURE__ */ new Set();
			function read(item, depth = 0) {
				if (depth > 3 || item == null || seen.has(item)) return;
				seen.add(item);
				if (typeof item === "string") {
					if (item.trim()) lines.push(item);
					return;
				}
				if (typeof item !== "object") return;
				const record = item;
				for (const key of [
					"code",
					"message",
					"diagnostic",
					"reason",
					"kind",
					"unmet"
				]) if (typeof record[key] === "string" && record[key].trim()) lines.push(record[key]);
				if (record.timedOut === true) lines.push("timeout");
				if (typeof record.exitCode === "number" && record.exitCode !== 0) lines.push(`exitCode: ${record.exitCode}`);
				if (Array.isArray(record.incompatible)) {
					for (const issue of record.incompatible) if (issue && typeof issue === "object") {
						const { name, version, runtimeVersion, requirements } = issue;
						const requirementText = requirements && typeof requirements === "object" ? Object.entries(requirements).map(([key, range]) => `${key}: ${String(range)}`).join("; ") : "";
						lines.push(`${String(name ?? "")}@${String(version ?? "")} (DSH ${String(runtimeVersion ?? "")}): ${requirementText}`);
					}
				}
				read(record.error, depth + 1);
				read(record.packageResult, depth + 1);
				if (typeof record.output === "string" && record.output.trim()) lines.push(record.output.length > 8e3 ? `…\n${record.output.slice(-8e3)}` : record.output);
				if (typeof record.logPath === "string" && record.logPath) lines.push(`logPath: ${record.logPath}`);
				if (typeof record.application === "string") lines.push(`application: ${record.application}`);
			}
			read(value);
			const text = [...new Set(lines.map(safeDiagnostic).filter(Boolean))].join("\n");
			return text ? text.length > 14e3 ? `${text.slice(0, 14e3)}\n…` : text : fallback;
		}
		// src/client/panel-copy.ts
		const COPY$1 = {
			en: {
				checkProgress: (done, total) => `Checked ${done} of ${total}`,
				updateProgress: (done, total) => `Processed ${done} of ${total}`,
				errorsTitle: "Error details",
				checkFailure: "Could not check this plugin.",
				updateFailure: "The update did not complete. DSH provided no further details.",
				listLabel: "Available plugin updates",
				restartRequired: "Restart DSH to finish applying the update.",
				overridden: "The update is installed, but a higher-priority setting overrides its activation.",
				restoreLabel: "Restoring the previous version"
			},
			ru: {
				checkProgress: (done, total) => `Проверено ${done} из ${total}`,
				updateProgress: (done, total) => `Обработано ${done} из ${total}`,
				errorsTitle: "Причины ошибок",
				checkFailure: "Не удалось проверить этот плагин.",
				updateFailure: "Обновление не завершено. DSH не сообщил дополнительных сведений.",
				listLabel: "Доступные обновления плагинов",
				restartRequired: "Для применения обновления перезапустите DSH.",
				overridden: "Обновление установлено, но его включение переопределено настройкой с более высоким приоритетом.",
				restoreLabel: "Восстановление предыдущей версии"
			},
			zh: {
				checkProgress: (done, total) => `已检查 ${done} / ${total}`,
				updateProgress: (done, total) => `已处理 ${done} / ${total}`,
				errorsTitle: "错误详情",
				checkFailure: "无法检查此插件。",
				updateFailure: "更新未完成，DSH 未提供更多详情。",
				listLabel: "可用插件更新",
				restartRequired: "请重启 DSH 以完成应用更新。",
				overridden: "更新已安装，但其启用状态被更高优先级的设置覆盖。",
				restoreLabel: "恢复上一版本"
			},
			ja: {
				checkProgress: (done, total) => `確認済み ${done} / ${total}`,
				updateProgress: (done, total) => `処理済み ${done} / ${total}`,
				errorsTitle: "エラーの詳細",
				checkFailure: "このプラグインを確認できませんでした。",
				updateFailure: "更新が完了しませんでした。DSH から追加の詳細はありません。",
				listLabel: "利用可能なプラグイン更新",
				restartRequired: "更新を適用するには DSH を再起動してください。",
				overridden: "更新はインストール済みですが、有効化は優先度の高い設定で上書きされています。",
				restoreLabel: "以前のバージョンの復元"
			},
			de: {
				checkProgress: (done, total) => `${done} von ${total} geprüft`,
				updateProgress: (done, total) => `${done} von ${total} bearbeitet`,
				errorsTitle: "Fehlerdetails",
				checkFailure: "Dieses Plugin konnte nicht geprüft werden.",
				updateFailure: "Das Update wurde nicht abgeschlossen. DSH hat keine weiteren Details geliefert.",
				listLabel: "Verfügbare Plugin-Updates",
				restartRequired: "Starte DSH neu, um das Update anzuwenden.",
				overridden: "Das Update ist installiert, aber eine höher priorisierte Einstellung überschreibt seine Aktivierung.",
				restoreLabel: "Vorherige Version wiederherstellen"
			},
			es: {
				checkProgress: (done, total) => `Comprobados ${done} de ${total}`,
				updateProgress: (done, total) => `Procesados ${done} de ${total}`,
				errorsTitle: "Detalles de errores",
				checkFailure: "No se pudo comprobar este plugin.",
				updateFailure: "La actualización no se completó. DSH no proporcionó más detalles.",
				listLabel: "Actualizaciones de plugins disponibles",
				restartRequired: "Reinicia DSH para aplicar la actualización.",
				overridden: "La actualización está instalada, pero un ajuste de mayor prioridad anula su activación.",
				restoreLabel: "Restauración de la versión anterior"
			},
			fr: {
				checkProgress: (done, total) => `${done} sur ${total} vérifiés`,
				updateProgress: (done, total) => `${done} sur ${total} traités`,
				errorsTitle: "Détails des erreurs",
				checkFailure: "Impossible de vérifier ce plugin.",
				updateFailure: "La mise à jour ne s’est pas terminée. DSH n’a fourni aucun détail supplémentaire.",
				listLabel: "Mises à jour de plugins disponibles",
				restartRequired: "Redémarrez DSH pour appliquer la mise à jour.",
				overridden: "La mise à jour est installée, mais un réglage de priorité supérieure remplace son activation.",
				restoreLabel: "Restauration de la version précédente"
			},
			pt: {
				checkProgress: (done, total) => `Verificados ${done} de ${total}`,
				updateProgress: (done, total) => `Processados ${done} de ${total}`,
				errorsTitle: "Detalhes dos erros",
				checkFailure: "Não foi possível verificar este plugin.",
				updateFailure: "A atualização não foi concluída. O DSH não forneceu mais detalhes.",
				listLabel: "Atualizações de plugins disponíveis",
				restartRequired: "Reinicie o DSH para aplicar a atualização.",
				overridden: "A atualização foi instalada, mas uma configuração de maior prioridade substitui sua ativação.",
				restoreLabel: "Restauração da versão anterior"
			}
		};
		function panelCopyFor(locale) {
			return COPY$1[locale.toLowerCase().split(/[-_]/u, 1)[0]] ?? COPY$1.en;
		}
		// src/client/index.ts
		const ID = "dsh-plugin-bulk-update";
		const COPY = {
			de: {
				navLabel: "Updates",
				title: "Plugin-Updates",
				tooltip: "Plugin-Updates",
				description: "Prüfe Versionen, wähle die gewünschten Pakete aus und starte die Aktualisierung. Geprüft werden Registry-Pakete; Git- und offizielle Pakete sind nicht im standardmäßigen Versionskatalog enthalten. Dieser Updater aktualisiert sich nicht selbst; aktualisieren Sie ihn separat über den DSH-Pluginmanager.",
				ready: "Wähle „Prüfen“, um nach verfügbaren Updates zu suchen.",
				checking: "Installierte Plugins werden geprüft…",
				check: "Prüfen",
				wait: "Bitte warten…",
				updateSelected: "Ausgewählte aktualisieren",
				selectAtLeastOne: "Wähle mindestens ein Update aus.",
				found: (count, skipped, failed) => `Updates gefunden: ${count}${skipped ? ` · ohne Registry-Katalog übersprungen: ${skipped}` : ""}${failed ? ` · Prüfung fehlgeschlagen: ${failed}` : ""}`,
				none: (skipped, failed) => `Keine kompatiblen Updates gefunden.${skipped ? ` Pakete ohne Registry-Katalog übersprungen: ${skipped}.` : ""}${failed ? ` Pakete konnten nicht geprüft werden: ${failed}.` : ""}`,
				checkError: (error) => `Prüfung fehlgeschlagen: ${error}`,
				updating: (name, version) => `Aktualisiere ${name} → ${version}…`,
				updated: (succeeded, failed) => `Aktualisierung abgeschlossen: ${succeeded} erfolgreich${failed ? ` · ${failed} fehlgeschlagen` : ""}.`,
				updateError: (error) => `Aktualisierung fehlgeschlagen: ${error}`
			},
			en: {
				navLabel: "Updates",
				title: "Plugin updates",
				tooltip: "Plugin updates",
				description: "Check versions, select the packages you want, and start the update. Registry packages are checked; Git and official packages are not covered by the standard version catalog. This updater skips itself; update it separately in DSH’s plugin manager.",
				ready: "Select “Check” to look for available updates.",
				checking: "Checking installed plugins…",
				check: "Check",
				wait: "Please wait…",
				updateSelected: "Update selected",
				selectAtLeastOne: "Select at least one update.",
				found: (count, skipped, failed) => `Updates found: ${count}${skipped ? ` · skipped without a registry catalog: ${skipped}` : ""}${failed ? ` · could not check: ${failed}` : ""}`,
				none: (skipped, failed) => `No compatible updates found.${skipped ? ` Packages without a registry catalog skipped: ${skipped}.` : ""}${failed ? ` Packages that could not be checked: ${failed}.` : ""}`,
				checkError: (error) => `Check failed: ${error}`,
				updating: (name, version) => `Updating ${name} → ${version}…`,
				updated: (succeeded, failed) => `Update complete: ${succeeded} succeeded${failed ? ` · ${failed} failed` : ""}.`,
				updateError: (error) => `Update failed: ${error}`
			},
			es: {
				navLabel: "Actualizaciones",
				title: "Actualizaciones de plugins",
				tooltip: "Actualizaciones de plugins",
				description: "Comprueba las versiones, selecciona los paquetes que quieras y comienza la actualización. Se comprueban los paquetes de registry; los paquetes de Git y los oficiales no están incluidos en el catálogo de versiones estándar. Este actualizador se omite a sí mismo; actualícelo por separado desde el administrador de plugins de DSH.",
				ready: "Pulsa «Comprobar» para buscar actualizaciones disponibles.",
				checking: "Comprobando los plugins instalados…",
				check: "Comprobar",
				wait: "Espera…",
				updateSelected: "Actualizar seleccionados",
				selectAtLeastOne: "Selecciona al menos una actualización.",
				found: (count, skipped, failed) => `Actualizaciones encontradas: ${count}${skipped ? ` · omitidas por no tener catálogo de registry: ${skipped}` : ""}${failed ? ` · no se pudieron comprobar: ${failed}` : ""}`,
				none: (skipped, failed) => `No se encontraron actualizaciones compatibles.${skipped ? ` Paquetes omitidos por no tener catálogo de registry: ${skipped}.` : ""}${failed ? ` Paquetes que no se pudieron comprobar: ${failed}.` : ""}`,
				checkError: (error) => `Error al comprobar: ${error}`,
				updating: (name, version) => `Actualizando ${name} → ${version}…`,
				updated: (succeeded, failed) => `Actualización completada: ${succeeded} correctas${failed ? ` · ${failed} fallidas` : ""}.`,
				updateError: (error) => `Error al actualizar: ${error}`
			},
			fr: {
				navLabel: "Mises à jour",
				title: "Mises à jour des plugins",
				tooltip: "Mises à jour des plugins",
				description: "Vérifiez les versions, sélectionnez les packages souhaités et lancez la mise à jour. Les packages registry sont vérifiés ; les packages Git et officiels ne figurent pas dans le catalogue standard des versions. Cet outil s’exclut lui-même ; mettez-le à jour séparément depuis le gestionnaire de plugins de DSH.",
				ready: "Sélectionnez « Vérifier » pour rechercher les mises à jour disponibles.",
				checking: "Vérification des plugins installés…",
				check: "Vérifier",
				wait: "Veuillez patienter…",
				updateSelected: "Mettre à jour la sélection",
				selectAtLeastOne: "Sélectionnez au moins une mise à jour.",
				found: (count, skipped, failed) => `Mises à jour trouvées : ${count}${skipped ? ` · ignorées sans catalogue registry : ${skipped}` : ""}${failed ? ` · vérification impossible : ${failed}` : ""}`,
				none: (skipped, failed) => `Aucune mise à jour compatible trouvée.${skipped ? ` Packages ignorés sans catalogue registry : ${skipped}.` : ""}${failed ? ` Packages impossibles à vérifier : ${failed}.` : ""}`,
				checkError: (error) => `Échec de la vérification : ${error}`,
				updating: (name, version) => `Mise à jour de ${name} → ${version}…`,
				updated: (succeeded, failed) => `Mise à jour terminée : ${succeeded} réussie(s)${failed ? ` · ${failed} échec(s)` : ""}.`,
				updateError: (error) => `Échec de la mise à jour : ${error}`
			},
			ja: {
				navLabel: "更新",
				title: "プラグインの更新",
				tooltip: "プラグインの更新",
				description: "バージョンを確認し、更新するパッケージを選んで更新を開始します。確認対象は registry パッケージです。Git パッケージと公式パッケージは標準のバージョンカタログの対象外です。この更新プラグイン自体は対象外です。DSH のプラグインマネージャーから個別に更新してください。",
				ready: "「確認」を選択して、利用可能な更新を検索してください。",
				checking: "インストール済みプラグインを確認しています…",
				check: "確認",
				wait: "お待ちください…",
				updateSelected: "選択した項目を更新",
				selectAtLeastOne: "少なくとも1つの更新を選択してください。",
				found: (count, skipped, failed) => `更新が見つかりました: ${count}${skipped ? ` · registry カタログがなくスキップ: ${skipped}` : ""}${failed ? ` · 確認できなかった項目: ${failed}` : ""}`,
				none: (skipped, failed) => `互換性のある更新は見つかりませんでした。${skipped ? ` registry カタログがなくスキップしたパッケージ: ${skipped}。` : ""}${failed ? ` 確認できなかったパッケージ: ${failed}。` : ""}`,
				checkError: (error) => `確認に失敗しました: ${error}`,
				updating: (name, version) => `${name} を ${version} に更新しています…`,
				updated: (succeeded, failed) => `更新完了: 成功 ${succeeded}${failed ? ` · 失敗 ${failed}` : ""}。`,
				updateError: (error) => `更新に失敗しました: ${error}`
			},
			pt: {
				navLabel: "Atualizações",
				title: "Atualizações de plugins",
				tooltip: "Atualizações de plugins",
				description: "Verifique as versões, selecione os pacotes desejados e inicie a atualização. São verificados os pacotes de registry; pacotes Git e oficiais não fazem parte do catálogo padrão de versões. Este atualizador ignora a si próprio; atualize-o separadamente no gerenciador de plugins do DSH.",
				ready: "Selecione «Verificar» para procurar atualizações disponíveis.",
				checking: "Verificando os plugins instalados…",
				check: "Verificar",
				wait: "Aguarde…",
				updateSelected: "Atualizar selecionados",
				selectAtLeastOne: "Selecione pelo menos uma atualização.",
				found: (count, skipped, failed) => `Atualizações encontradas: ${count}${skipped ? ` · ignoradas sem catálogo de registry: ${skipped}` : ""}${failed ? ` · não foi possível verificar: ${failed}` : ""}`,
				none: (skipped, failed) => `Nenhuma atualização compatível encontrada.${skipped ? ` Pacotes ignorados por não terem catálogo de registry: ${skipped}.` : ""}${failed ? ` Pacotes que não foi possível verificar: ${failed}.` : ""}`,
				checkError: (error) => `Falha na verificação: ${error}`,
				updating: (name, version) => `Atualizando ${name} → ${version}…`,
				updated: (succeeded, failed) => `Atualização concluída: ${succeeded} com sucesso${failed ? ` · ${failed} com falha` : ""}.`,
				updateError: (error) => `Falha na atualização: ${error}`
			},
			ru: {
				navLabel: "Обновления",
				title: "Обновления плагинов",
				tooltip: "Обновления плагинов",
				description: "Проверьте версии, отметьте нужные пакеты и запустите обновление. Проверяются registry-пакеты; Git- и официальные пакеты штатный список версий не охватывает. Сам обновлятор себя пропускает; обновляйте его отдельно через менеджер плагинов DSH.",
				ready: "Нажмите «Проверить», чтобы найти доступные обновления.",
				checking: "Проверяю установленные плагины…",
				check: "Проверить",
				wait: "Подождите…",
				updateSelected: "Обновить выбранные",
				selectAtLeastOne: "Выберите хотя бы одно обновление.",
				found: (count, skipped, failed) => `Найдено обновлений: ${count}${skipped ? ` · без registry-каталога пропущено: ${skipped}` : ""}${failed ? ` · проверка не удалась для: ${failed}` : ""}`,
				none: (skipped, failed) => `Доступных совместимых обновлений не найдено.${skipped ? ` Пакетов без registry-каталога пропущено: ${skipped}.` : ""}${failed ? ` Не удалось проверить пакетов: ${failed}.` : ""}`,
				checkError: (error) => `Ошибка проверки: ${error}`,
				updating: (name, version) => `Обновляю ${name} → ${version}…`,
				updated: (succeeded, failed) => `Обновление завершено: успешно ${succeeded}${failed ? ` · не удалось ${failed}` : ""}.`,
				updateError: (error) => `Ошибка обновления: ${error}`
			},
			zh: {
				navLabel: "更新",
				title: "插件更新",
				tooltip: "插件更新",
				description: "检查版本，选择需要更新的插件，然后开始更新。仅检查 registry 插件；Git 和官方插件不在标准版本目录的检查范围内。此更新器会跳过自身；请在 DSH 插件管理器中单独更新。",
				ready: "点击“检查”以查找可用更新。",
				checking: "正在检查已安装的插件…",
				check: "检查",
				wait: "请稍候…",
				updateSelected: "更新所选项",
				selectAtLeastOne: "请至少选择一个更新项。",
				found: (count, skipped, failed) => `发现更新：${count}${skipped ? ` · 无 registry 目录而跳过：${skipped}` : ""}${failed ? ` · 检查失败：${failed}` : ""}`,
				none: (skipped, failed) => `没有找到兼容的更新。${skipped ? ` 无 registry 目录而跳过的插件：${skipped}。` : ""}${failed ? ` 检查失败的插件：${failed}。` : ""}`,
				checkError: (error) => `检查失败：${error}`,
				updating: (name, version) => `正在更新 ${name} → ${version}…`,
				updated: (succeeded, failed) => `更新完成：成功 ${succeeded}${failed ? ` · 失败 ${failed}` : ""}。`,
				updateError: (error) => `更新失败：${error}`
			}
		};
		function copyFor(locale) {
			const language = locale.toLowerCase().split(/[-_]/u, 1)[0];
			return COPY[language] ?? COPY.en;
		}
		function statusText(status, copy) {
			switch (status.kind) {
				case "ready": return copy.ready;
				case "checking": return copy.checking;
				case "found": return copy.found(status.count, status.skipped, status.failed);
				case "none": return copy.none(status.skipped, status.failed);
				case "check-error": return copy.checkError(status.error);
				case "select": return copy.selectAtLeastOne;
				case "updating": return copy.updating(status.name, status.version);
				case "updated": return copy.updated(status.succeeded, status.failed);
				case "update-error": return copy.updateError(status.error);
			}
		}
		function useActiveLocale(ctx) {
			const locale = ctx.get("locale");
			const subscribe = react.default.useCallback((onChange) => locale.subscribe(onChange), [locale]);
			const getSnapshot = react.default.useCallback(() => locale.getSnapshot().active, [locale]);
			return react.default.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
		}
		function Icon(props) {
			const copy = copyFor(useActiveLocale(props.ctx));
			return react.default.createElement("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 32 32",
				width: props.size ?? 22,
				height: props.size ?? 22,
				role: "img",
				"aria-label": copy.tooltip,
				focusable: false,
				style: {
					display: "block",
					flexShrink: 0,
					opacity: props.active ? 1 : .82
				}
			}, react.default.createElement("title", null, copy.tooltip), react.default.createElement("g", { fill: "currentColor" }, react.default.createElement("rect", {
				x: 9,
				y: 9,
				width: 6,
				height: 6,
				rx: 1.5
			}), react.default.createElement("rect", {
				x: 17,
				y: 9,
				width: 6,
				height: 6,
				rx: 1.5
			}), react.default.createElement("rect", {
				x: 9,
				y: 17,
				width: 6,
				height: 6,
				rx: 1.5
			}), react.default.createElement("rect", {
				x: 17,
				y: 17,
				width: 6,
				height: 6,
				rx: 1.5,
				opacity: .4
			})), react.default.createElement("path", {
				d: "M6.808 25.192 A13 13 0 1 1 28.557 12.635",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: 2.4,
				strokeLinecap: "round"
			}), react.default.createElement("path", {
				d: "M24.8 11.7 L29.1 15.2 L30.8 9.8 Z",
				fill: "currentColor"
			}));
		}
		function UpdatesPanel({ ctx }) {
			const locale = useActiveLocale(ctx);
			const copy = copyFor(locale);
			const extra = panelCopyFor(locale);
			const [updates, setUpdates] = react.default.useState([]);
			const [busy, setBusy] = react.default.useState(false);
			const [status, setStatus] = react.default.useState({ kind: "ready" });
			const [progress, setProgress] = react.default.useState(null);
			const [problems, setProblems] = react.default.useState([]);
			const [notices, setNotices] = react.default.useState([]);
			const running = react.default.useRef(false);
			const check = async () => {
				if (running.current) return;
				running.current = true;
				setBusy(true);
				setUpdates([]);
				setProblems([]);
				setNotices([]);
				setProgress(null);
				setStatus({ kind: "checking" });
				try {
					const listed = await ctx.remote.pluginManager.listBundles();
					if (!listed.ok) throw listed.error;
					const allInstalled = listed.value.filter((bundle) => bundle.installed && bundle.version);
					const installed = allInstalled.filter((bundle) => bundle.update === "registry" && bundle.name !== ID);
					const skipped = allInstalled.filter((bundle) => bundle.update !== "registry").length;
					const found = [];
					let failed = 0;
					setProgress({
						phase: "checking",
						completed: 0,
						total: installed.length
					});
					for (const [index, bundle] of installed.entries()) {
						setProgress({
							phase: "checking",
							completed: index,
							total: installed.length,
							current: bundle.name
						});
						try {
							const answer = await ctx.remote.pluginManager.listVersions(bundle.name, {});
							if (!answer.ok) throw answer.error;
							if (answer.value.status !== "listed") throw answer.value;
							const candidate = answer.value.versions.find((version) => version.bundle && !version.incompatible && !version.deprecated);
							if (candidate) {
								found.push({
									name: bundle.name,
									currentVersion: answer.value.installed,
									version: candidate.version,
									registry: answer.value.registry,
									selected: true
								});
								setUpdates([...found]);
							}
						} catch (error) {
							failed++;
							const detail = failureDetail(error, extra.checkFailure);
							setProblems((rows) => [...rows, {
								name: bundle.name,
								stage: "check",
								detail
							}]);
						} finally {
							setProgress({
								phase: "checking",
								completed: index + 1,
								total: installed.length
							});
						}
					}
					setStatus(found.length ? {
						kind: "found",
						count: found.length,
						skipped,
						failed
					} : {
						kind: "none",
						skipped,
						failed
					});
				} catch (error) {
					setStatus({
						kind: "check-error",
						error: failureDetail(error, extra.checkFailure)
					});
				} finally {
					running.current = false;
					setBusy(false);
				}
			};
			const toggle = (name) => setUpdates((rows) => rows.map((row) => row.name === name ? {
				...row,
				selected: !row.selected
			} : row));
			const applySelected = async () => {
				if (running.current) return;
				const selected = updates.filter((row) => row.selected && row.name !== ID);
				if (!selected.length) {
					setStatus({ kind: "select" });
					return;
				}
				running.current = true;
				setBusy(true);
				setProblems((rows) => rows.filter((row) => row.stage !== "update" || !selected.some((item) => item.name === row.name)));
				let succeeded = 0;
				let failed = 0;
				try {
					for (const [index, item] of selected.entries()) {
						setProgress({
							phase: "updating",
							completed: index,
							total: selected.length,
							current: item.name
						});
						setStatus({
							kind: "updating",
							name: item.name,
							version: item.version
						});
						try {
							const response = await ctx.remote.pluginManager.updateBundle(item.name, item.version, { registry: item.registry });
							if (!response.ok) throw response.error;
							const { result, step, restore } = response.value;
							if (!(step === "install" && [
								"applied",
								"restart-required",
								"overridden"
							].includes(result.application))) {
								let detail = `step: ${step}\n${failureDetail(result, extra.updateFailure)}`;
								if (restore) detail += `\n${extra.restoreLabel}:\n${failureDetail(restore, extra.updateFailure)}`;
								throw new Error(detail);
							}
							succeeded++;
							setUpdates((rows) => rows.filter((row) => row.name !== item.name));
							if (result.application === "restart-required") setNotices((rows) => [...rows, `${item.name}: ${extra.restartRequired}`]);
							if (result.application === "overridden") setNotices((rows) => [...rows, `${item.name}: ${extra.overridden}`]);
							if (result.warnings?.length) setNotices((rows) => [...rows, `${item.name}: ${failureDetail(result.warnings.join("\n"), "")}`]);
						} catch (error) {
							failed++;
							const detail = failureDetail(error, extra.updateFailure);
							setProblems((rows) => [...rows, {
								name: item.name,
								stage: "update",
								detail
							}]);
						} finally {
							setProgress({
								phase: "updating",
								completed: index + 1,
								total: selected.length
							});
						}
					}
					setStatus({
						kind: "updated",
						succeeded,
						failed
					});
				} catch (error) {
					setStatus({
						kind: "update-error",
						error: failureDetail(error, extra.updateFailure)
					});
				} finally {
					running.current = false;
					setBusy(false);
				}
			};
			const progressText = progress ? (progress.phase === "checking" ? extra.checkProgress : extra.updateProgress)(progress.completed, progress.total) : copy.checking;
			const scrollStyle = updates.length > 10 ? {
				maxHeight: "min(55vh, 480px)",
				overflowY: "scroll",
				scrollbarGutter: "stable",
				overscrollBehavior: "contain"
			} : {};
			const diagnosticStyle = {
				whiteSpace: "pre-wrap",
				overflowWrap: "anywhere",
				fontFamily: "inherit",
				fontSize: "0.875em",
				margin: "6px 0 0"
			};
			return react.default.createElement("section", { style: {
				padding: 24,
				maxWidth: 760,
				margin: "0 auto",
				color: "var(--text-primary, inherit)",
				boxSizing: "border-box",
				height: "100%",
				overflowY: "auto"
			} }, react.default.createElement("h2", { style: { margin: "0 0 8px" } }, copy.title), react.default.createElement("p", { style: { opacity: .75 } }, copy.description), react.default.createElement("div", { style: {
				display: "flex",
				flexWrap: "wrap",
				gap: 8,
				margin: "16px 0"
			} }, react.default.createElement("button", {
				type: "button",
				disabled: busy,
				onClick: check
			}, busy ? copy.wait : copy.check), react.default.createElement("button", {
				type: "button",
				disabled: busy || !updates.some((row) => row.selected),
				onClick: applySelected
			}, copy.updateSelected)), react.default.createElement("p", {
				role: "status",
				"aria-live": "polite",
				style: {
					overflowWrap: "anywhere",
					whiteSpace: "pre-wrap"
				}
			}, statusText(status, copy)), (busy || progress && progress.total > 0) && react.default.createElement("div", {
				"data-testid": "operation-progress",
				style: { marginBottom: 16 }
			}, react.default.createElement("div", {
				role: "status",
				"aria-live": "polite",
				style: { overflowWrap: "anywhere" }
			}, progressText, progress?.current ? ` — ${progress.current}` : ""), react.default.createElement("progress", {
				max: progress?.total || 1,
				value: progress ? progress.completed : void 0,
				"aria-label": progressText,
				style: {
					width: "100%",
					height: 12,
					accentColor: "var(--accent-primary, #178cb6)"
				}
			})), react.default.createElement("div", {
				role: "region",
				"aria-label": extra.listLabel,
				"aria-busy": busy,
				tabIndex: updates.length > 10 ? 0 : void 0,
				"data-testid": "updates-list",
				style: scrollStyle
			}, ...updates.map((row) => react.default.createElement("label", {
				key: row.name,
				style: {
					display: "flex",
					alignItems: "center",
					gap: 10,
					minHeight: 48,
					boxSizing: "border-box",
					padding: "10px 12px",
					borderBottom: "1px solid var(--border-subtle, #8884)"
				}
			}, react.default.createElement("input", {
				type: "checkbox",
				checked: row.selected,
				disabled: busy,
				onChange: () => toggle(row.name)
			}), react.default.createElement("span", { style: {
				flex: 1,
				minWidth: 0,
				overflowWrap: "anywhere"
			} }, row.name), react.default.createElement("code", { style: {
				overflowWrap: "anywhere",
				textAlign: "right"
			} }, `${row.currentVersion} → ${row.version}`)))), ...notices.map((notice, index) => react.default.createElement("p", {
				key: `notice-${index}`,
				style: { overflowWrap: "anywhere" }
			}, notice)), problems.length > 0 && react.default.createElement("section", {
				"data-testid": "error-details",
				style: { marginTop: 20 }
			}, react.default.createElement("h3", null, extra.errorsTitle), react.default.createElement("div", {
				role: "region",
				"aria-label": extra.errorsTitle,
				tabIndex: problems.length > 10 ? 0 : void 0,
				style: problems.length > 10 ? {
					maxHeight: 480,
					overflowY: "auto"
				} : {}
			}, ...problems.map((problem) => react.default.createElement("div", {
				key: `${problem.stage}-${problem.name}`,
				style: {
					padding: "10px 12px",
					marginBottom: 8,
					borderLeft: "3px solid var(--text-danger, #c34b4b)"
				}
			}, react.default.createElement("strong", { style: { overflowWrap: "anywhere" } }, problem.name), react.default.createElement("pre", { style: diagnosticStyle }, problem.detail))))));
		}
		const inject = [
			"slots",
			"remote",
			"remote.pluginManager",
			"locale"
		];
		function apply(ctx) {
			const locale = ctx.get("locale");
			ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({
				name: "sidebar.panellist",
				id: ID,
				order: 50,
				label: () => copyFor(locale.getSnapshot().active).navLabel
			}, (props) => react.default.createElement(Icon, {
				...props,
				ctx
			})));
			ctx.slots.inject("main", () => ctx.slots.register({
				name: "main",
				key: ID
			}, () => react.default.createElement(UpdatesPanel, { ctx })));
		}
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map