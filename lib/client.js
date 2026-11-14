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
		function errorMessage(error) {
			return error instanceof Error ? error.message : String(error);
		}
		function UpdatesPanel({ ctx }) {
			const copy = copyFor(useActiveLocale(ctx));
			const [updates, setUpdates] = react.default.useState([]);
			const [busy, setBusy] = react.default.useState(false);
			const [status, setStatus] = react.default.useState({ kind: "ready" });
			const check = async () => {
				setBusy(true);
				setStatus({ kind: "checking" });
				try {
					const listed = await ctx.remote.pluginManager.listBundles();
					if (!listed.ok) throw new Error(listed.error.message);
					const allInstalled = listed.value.filter((bundle) => bundle.installed && bundle.version);
					const installed = allInstalled.filter((bundle) => bundle.update === "registry" && bundle.name !== ID);
					const skipped = allInstalled.filter((bundle) => bundle.update !== "registry").length;
					const found = [];
					let failed = 0;
					for (const bundle of installed) {
						const answer = await ctx.remote.pluginManager.listVersions(bundle.name, {});
						if (!answer.ok || answer.value.status !== "listed") {
							failed++;
							continue;
						}
						const candidate = answer.value.versions.find((version) => version.bundle && !version.incompatible && !version.deprecated);
						if (candidate) found.push({
							name: bundle.name,
							currentVersion: answer.value.installed,
							version: candidate.version,
							registry: answer.value.registry,
							selected: true
						});
					}
					setUpdates(found);
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
						error: errorMessage(error)
					});
				} finally {
					setBusy(false);
				}
			};
			const toggle = (name) => setUpdates((rows) => rows.map((row) => row.name === name ? {
				...row,
				selected: !row.selected
			} : row));
			const applySelected = async () => {
				const selected = updates.filter((row) => row.selected && row.name !== ID);
				if (!selected.length) {
					setStatus({ kind: "select" });
					return;
				}
				setBusy(true);
				const results = [];
				try {
					for (const item of selected) {
						setStatus({
							kind: "updating",
							name: item.name,
							version: item.version
						});
						try {
							const response = await ctx.remote.pluginManager.updateBundle(item.name, item.version, { registry: item.registry });
							if (!response.ok) {
								results.push({
									name: item.name,
									ok: false,
									detail: response.error.message
								});
								continue;
							}
							const result = response.value.result;
							const ok = result.application === "applied" || result.application === "restart-required" || result.application === "overridden";
							results.push({
								name: item.name,
								ok,
								detail: ok ? result.application : result.error?.code ?? "update failed"
							});
						} catch (error) {
							results.push({
								name: item.name,
								ok: false,
								detail: errorMessage(error)
							});
						}
					}
					const succeededNames = new Set(results.filter((item) => item.ok).map((item) => item.name));
					const succeeded = succeededNames.size;
					const failed = results.length - succeeded;
					setStatus({
						kind: "updated",
						succeeded,
						failed
					});
					setUpdates((rows) => rows.filter((row) => !succeededNames.has(row.name)));
				} catch (error) {
					setStatus({
						kind: "update-error",
						error: errorMessage(error)
					});
				} finally {
					setBusy(false);
				}
			};
			return react.default.createElement("section", { style: {
				padding: 24,
				maxWidth: 760,
				margin: "0 auto",
				color: "var(--text-primary, inherit)"
			} }, react.default.createElement("h2", { style: { margin: "0 0 8px" } }, copy.title), react.default.createElement("p", { style: { opacity: .75 } }, copy.description), react.default.createElement("div", { style: {
				display: "flex",
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
				"aria-live": "polite"
			}, statusText(status, copy)), ...updates.map((row) => react.default.createElement("label", {
				key: row.name,
				style: {
					display: "flex",
					alignItems: "center",
					gap: 10,
					padding: "10px 12px",
					borderBottom: "1px solid var(--border-subtle, #8884)"
				}
			}, react.default.createElement("input", {
				type: "checkbox",
				checked: row.selected,
				disabled: busy,
				onChange: () => toggle(row.name)
			}), react.default.createElement("span", { style: { flex: 1 } }, row.name), react.default.createElement("code", null, `${row.currentVersion} → ${row.version}`))));
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