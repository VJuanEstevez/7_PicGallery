import { getState } from "./store.js";

let dialog = null;

function getDialog() {
  if (!dialog) dialog = document.getElementById("settings-dialog");
  return dialog;
}

export function initSettings() {
  const element = getDialog();
  if (!element || element.dataset.ready) return;

  const { columns, gap, showMeta } = getState().view;

  element.innerHTML = `
    <div class="dialog__form">
      <header class="dialog__head">
        <div>
          <p class="eyebrow">Preferencias</p>
          <h2 class="dialog__title" id="settings-title">Ajustes de vista</h2>
          <p class="dialog__sub">Controla cómo se muestran las imágenes en la biblioteca.</p>
        </div>
        <button
          class="icon-btn icon-btn--bare"
          type="button"
          data-action="close-dialog"
          data-dialog="settings-dialog"
          aria-label="Cerrar"
          data-tooltip="Cerrar"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-close"></use></svg>
        </button>
      </header>

      <div class="dialog__body">
        <div class="settings__range">
          <label for="settings-columns">
            <span>Columnas</span>
            <output for="settings-columns" data-output="columns">${columns} × ${columns}</output>
          </label>
          <input
            id="settings-columns"
            type="range"
            min="3"
            max="8"
            step="1"
            value="${columns}"
            data-view-columns
            data-focus-key="settings-columns"
          />
        </div>

        <div class="settings__range">
          <label for="settings-gap">
            <span>Separación</span>
            <output for="settings-gap" data-output="gap">${gap} px</output>
          </label>
          <input
            id="settings-gap"
            type="range"
            min="0"
            max="48"
            step="2"
            value="${gap}"
            data-view-gap
            data-focus-key="settings-gap"
          />
        </div>

        <label class="settings__toggle">
          <input
            type="checkbox"
            data-view-meta
            data-focus-key="settings-meta"
            ${showMeta ? "checked" : ""}
          />
          <span>
            <strong>Mostrar nombre, datos y formato de imagen</strong>
            <small>En cada tarjeta aparecerá el título, las dimensiones, el peso y el formato.</small>
          </span>
        </label>
      </div>

      <footer class="dialog__foot">
        <button
          class="btn btn--primary"
          type="button"
          data-action="close-dialog"
          data-dialog="settings-dialog"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-check"></use></svg>
          Listo
        </button>
      </footer>
    </div>
  `;

  element.dataset.ready = "true";
}

export function openSettingsDialog() {
  initSettings();
  const element = getDialog();
  if (!element || element.open) return;
  element.showModal();
}
