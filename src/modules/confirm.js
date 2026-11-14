import { escapeHtml } from './utils.js'

let dialog = null
let resolver = null

function getDialog() {
  if (!dialog) dialog = document.getElementById('confirm-dialog')
  return dialog
}

export function confirmAction({
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  danger = false
} = {}) {
  const element = getDialog()
  if (!element) return Promise.resolve(false)

  if (resolver) {
    resolver(false)
    resolver = null
  }

  if (element.open) element.close()

  element.innerHTML = `
    <form method="dialog" class="dialog__form">
      <header class="dialog__head">
        <div>
          <p class="eyebrow">Confirmar acción</p>
          <h2 class="dialog__title" id="confirm-title">${escapeHtml(title)}</h2>
        </div>
      </header>
      <div class="dialog__body">
        <p class="confirm__message">${escapeHtml(message)}</p>
      </div>
      <footer class="dialog__foot">
        <button
          class="btn btn--ghost"
          type="submit"
          value="cancel"
          data-tooltip="Volver sin ejecutar la acción"
        >
          ${escapeHtml(cancelLabel)}
        </button>
        <button
          class="btn ${danger ? 'btn--danger' : 'btn--primary'}"
          type="submit"
          value="confirm"
          data-tooltip="Confirmar la acción"
        >
          ${escapeHtml(confirmLabel)}
        </button>
      </footer>
    </form>
  `

  element.returnValue = ''
  element.showModal()

  return new Promise((resolve) => {
    resolver = resolve

    element.addEventListener(
      'close',
      () => {
        const confirmed = element.returnValue === 'confirm'
        resolver = null
        resolve(confirmed)
      },
      { once: true }
    )
  })
}
