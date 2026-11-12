import { getState, moveImages } from './store.js'
import { escapeHtml, formatNumber } from './utils.js'
import { toast } from './toast.js'

let pendingIds = []
let dialog = null

function getDialog() {
  if (!dialog) dialog = document.getElementById('move-dialog')
  return dialog
}

function renderMoveDialog() {
  const state = getState()
  const element = getDialog()
  const first = state.images.find((image) => image.id === pendingIds[0])
  const currentFolder = first?.folderId ?? state.folders[0]?.id
  const count = pendingIds.length

  const folders = state.folders
    .map((folder) => {
      const folderCount = state.images.filter(
        (image) => image.folderId === folder.id
      ).length

      return `
        <label class="folder-choice__item" style="--dot: ${escapeHtml(folder.color)}">
          <input
            type="radio"
            name="target-folder"
            value="${escapeHtml(folder.id)}"
          />
          <span>${escapeHtml(folder.name)}</span>
          <span class="mono">${formatNumber(folderCount)}</span>
          <i aria-hidden="true"></i>
        </label>
      `
    })
    .join('')

  element.innerHTML = `
    <form class="dialog__form" id="move-form">
      <header class="dialog__head">
        <div>
          <p class="eyebrow">Organizar</p>
          <h2 class="dialog__title" id="move-title">
            Mover ${count === 1 ? '1 imagen' : `${count} imágenes`}
          </h2>
          <p class="dialog__sub">Elige la carpeta de destino para la selección.</p>
        </div>
        <button
          class="icon-btn icon-btn--bare"
          type="button"
          data-action="close-dialog"
          data-dialog="move-dialog"
          aria-label="Cerrar"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-close"></use></svg>
        </button>
      </header>

      <div class="dialog__body">
        <fieldset class="field" style="border: 0; padding: 0; margin: 0">
          <legend class="visually-hidden">Carpeta de destino</legend>
          <div class="folder-choice">${folders}</div>
        </fieldset>
      </div>

      <footer class="dialog__foot">
        <button
          class="btn btn--ghost"
          type="button"
          data-action="close-dialog"
          data-dialog="move-dialog"
        >
          Cancelar
        </button>
        <button class="btn btn--primary" type="submit">Mover aquí</button>
      </footer>
    </form>
  `

  const selected = element.querySelector(
    `input[name="target-folder"][value="${CSS.escape(currentFolder)}"]`
  )
  if (selected) selected.checked = true

  element.querySelector('#move-form')?.addEventListener('submit', (event) => {
    event.preventDefault()
    const checked = element.querySelector('input[name="target-folder"]:checked')
    if (!checked) return

    const folder = state.folders.find((entry) => entry.id === checked.value)
    const total = pendingIds.length

    moveImages(pendingIds, checked.value)
    element.close()
    toast(
      total === 1
        ? `Imagen movida a ${folder?.name ?? 'la carpeta'}`
        : `${total} imágenes movidas a ${folder?.name ?? 'la carpeta'}`
    )
  })
}

export function openMoveDialog(ids) {
  pendingIds = [...new Set(ids)]
  if (pendingIds.length === 0) return

  renderMoveDialog()
  const element = getDialog()
  if (!element.open) element.showModal()
}
