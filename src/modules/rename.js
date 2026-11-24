import { getState, renameFolder, renameImage } from "./store.js";
import { escapeHtml } from "./utils.js";
import { toast } from "./toast.js";

let dialog = null;
let pending = null;

function getDialog() {
  if (!dialog) dialog = document.getElementById("rename-dialog");
  return dialog;
}

function renameCopy() {
  if (pending?.type === "folder") {
    return {
      eyebrow: "Organizar",
      title: "Renombrar carpeta",
      sub: "Actualiza el nombre con el que se muestra la carpeta en la biblioteca.",
      field: "Nombre de la carpeta",
      hint: "El nuevo nombre se usará también en la ficha técnica de sus imágenes.",
    };
  }

  return {
    eyebrow: "Editar",
    title: "Cambiar nombre",
    sub: "Actualiza el nombre con el que se muestra la imagen en la biblioteca.",
    field: "Nombre de la imagen",
    hint: "El nuevo nombre se usará también en la ficha técnica y en las presentaciones exportadas.",
  };
}

function currentValue() {
  const state = getState();

  if (pending?.type === "folder") {
    return state.folders.find((folder) => folder.id === pending.id)?.name ?? "";
  }

  return state.images.find((image) => image.id === pending.id)?.title ?? "";
}

function pendingExists() {
  const state = getState();
  if (!pending) return false;

  return pending.type === "folder"
    ? state.folders.some((folder) => folder.id === pending.id)
    : state.images.some((image) => image.id === pending.id);
}

function renderRenameDialog() {
  if (!pendingExists()) return;

  const copy = renameCopy();
  const element = getDialog();

  element.innerHTML = `
    <form class="dialog__form" id="rename-form">
      <header class="dialog__head">
        <div>
          <p class="eyebrow">${copy.eyebrow}</p>
          <h2 class="dialog__title" id="rename-title">${copy.title}</h2>
          <p class="dialog__sub">${copy.sub}</p>
        </div>
        <button
          class="icon-btn icon-btn--bare"
          type="button"
          data-action="close-dialog"
          data-dialog="rename-dialog"
          aria-label="Cerrar"
          data-tooltip="Cerrar"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-close"></use></svg>
        </button>
      </header>

      <div class="dialog__body">
        <label class="field">
          <span>${copy.field}</span>
          <input
            type="text"
            data-rename-input
            value="${escapeHtml(currentValue())}"
            maxlength="120"
            autocomplete="off"
            required
          />
        </label>
        <p class="hint">${copy.hint}</p>
      </div>

      <footer class="dialog__foot">
        <button
          class="btn btn--ghost"
          type="button"
          data-action="close-dialog"
          data-dialog="rename-dialog"
          data-tooltip="Descartar el cambio"
        >
          Cancelar
        </button>
        <button
          class="btn btn--primary"
          type="submit"
          data-tooltip="Guardar el nuevo nombre"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-check"></use></svg>
          Guardar nombre
        </button>
      </footer>
    </form>
  `;

  const form = element.querySelector("#rename-form");
  const input = element.querySelector("[data-rename-input]");

  if (input) {
    input.focus();
    input.select();
  }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input?.value.trim() ?? "";
    if (!value) {
      input?.focus();
      return;
    }

    if (pending.type === "folder") {
      const renamed = renameFolder(pending.id, value);
      toast(renamed ? `Carpeta “${value}” renombrada` : "No se pudo renombrar la carpeta");
    } else {
      renameImage(pending.id, value);
      toast("Nombre actualizado");
    }

    element.close();
  });
}

export function openRenameDialog(id) {
  const state = getState();
  if (!state.images.some((image) => image.id === id)) return;

  pending = { type: "image", id };
  renderRenameDialog();

  const element = getDialog();
  if (!element.open) element.showModal();
}

export function openFolderRenameDialog(id) {
  const state = getState();
  if (!state.folders.some((folder) => folder.id === id)) return;

  pending = { type: "folder", id };
  renderRenameDialog();

  const element = getDialog();
  if (!element.open) element.showModal();
}
