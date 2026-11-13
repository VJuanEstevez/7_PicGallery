import { getState, renameImage } from './store.js'
import { escapeHtml } from './utils.js'
import { toast } from './toast.js'

let dialog = null
let pendingId = null

function getDialog() {
  if (!dialog) dialog = document.getElementById('rename-dialog')
  return dialog
}

function renderRenameDialog() {
  const state = getState()
  const image = state.images.find((entry) => entry.id === pendingId)
  if (!image) return

  const element = getDialog()
  element.innerHTML = `
    <form class="dialog__form" id="rename-form">
      <header class="dialog__head">
        <div>
          <p class="eyebrow">Editar</p>
          <h2 class="dialog__title" id="rename-title">Cambiar nombre</h2>
          <p class="dialog__sub">Actualiza el nombre con el que se muestra la imagen en la biblioteca.</p>
        </div>
        <button
          class="icon-btn icon-btn--bare"
          type="button"
          data-action="close-dialog"
          data-dialog="rename-dialog"
          aria-label="Cerrar"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-close"></use></svg>
        </button>
      </header>

      <div class="dialog__body">
        <label class="field">
          <span>Nombre de la imagen</span>
          <input
            type="text"
            data-rename-input
            value="${escapeHtml(image.title)}"
            maxlength="120"
            autocomplete="off"
            required
          />
        </label>
        <p class="hint">El nuevo nombre se usará también en la ficha técnica y en las presentaciones exportadas.</p>
      </div>

      <footer class="dialog__foot">
        <button
          class="btn btn--ghost"
          type="button"
          data-action="close-dialog"
          data-dialog="rename-dialog"
        >
          Cancelar
        </button>
        <button class="btn btn--primary" type="submit">
          <svg class="icon" aria-hidden="true"><use href="#icon-check"></use></svg>
          Guardar nombre
        </button>
      </footer>
    </form>
  `

  const form = element.querySelector('#rename-form')
  const input = element.querySelector('[data-rename-input]')

  if (input) {
    input.focus()
    input.select()
  }

  form?.addEventListener('submit', (event) => {
    event.preventDefault()
    const title = input?.value.trim() ?? ''
    if (!title) {
      input?.focus()
      return
    }

    renameImage(pendingId, title)
    element.close()
    toast('Nombre actualizado')
  })
}

export function openRenameDialog(id) {
  const state = getState()
  if (!state.images.some((image) => image.id === id)) return

  pendingId = id
  renderRenameDialog()

  const element = getDialog()
  if (!element.open) element.showModal()
}
