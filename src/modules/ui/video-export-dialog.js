import { getFolderImages, getFolderTitle, getState } from '../store.js'
import { formatNumber } from '../utils.js'
import { exportVideo } from '../export/video.js'

let dialog = null
let busy = false

function getDialog() {
  if (!dialog) dialog = document.getElementById('video-export-dialog')
  return dialog
}

function formatSeconds(milliseconds) {
  return `${new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(milliseconds / 1000)} s`
}

function template() {
  const fall = 1200

  return `
    <div class="dialog__form">
      <header class="dialog__head">
        <div>
          <p class="eyebrow">Exportar</p>
          <h2 class="dialog__title" id="video-export-title">Vídeo de polaroids</h2>
          <p class="dialog__sub">Cada foto cae y se apila sobre la anterior en un vídeo WebM.</p>
        </div>
        <button
          class="icon-btn icon-btn--bare"
          type="button"
          data-action="close-dialog"
          data-dialog="video-export-dialog"
          aria-label="Cerrar"
          data-tooltip="Cerrar"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-close"></use></svg>
        </button>
      </header>

      <div class="dialog__body">
        <p class="export-summary" data-export-summary></p>

        <div class="export-field">
          <label class="export-range" for="video-fall">
            <span>Duración de cada caída</span>
            <output for="video-fall" data-output="video-fall">${formatSeconds(fall)}</output>
          </label>
          <input
            id="video-fall"
            type="range"
            min="400"
            max="2400"
            step="100"
            value="${fall}"
            data-export-fall
          />
        </div>

        <div class="export-field">
          <label class="export-select" for="video-background">
            <span>Fondo</span>
            <select id="video-background" data-export-background>
              <option value="wood">Madera</option>
              <option value="linen">Lino</option>
              <option value="plain">Liso</option>
            </select>
          </label>
        </div>

        <label class="export-toggle">
          <input type="checkbox" data-export-random />
          <span>
            <strong>Orden aleatorio</strong>
            <small>Mezcla las imágenes antes de crear la presentación.</small>
          </span>
        </label>

        <progress class="export-progress" data-export-progress value="0" max="1" hidden></progress>
      </div>

      <footer class="dialog__foot">
        <button
          class="btn btn--ghost"
          type="button"
          data-action="close-dialog"
          data-dialog="video-export-dialog"
        >Cancelar</button>
        <button
          class="btn btn--primary"
          type="button"
          data-action="video-export-run"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-film"></use></svg>
          Crear vídeo
        </button>
      </footer>
    </div>
  `
}

function openDialog() {
  const element = getDialog()
  if (!element || element.open || busy) return

  const state = getState()
  const count = getFolderImages(state).length
  const summary = element.querySelector('[data-export-summary]')
  summary.textContent = `${formatNumber(count)} ${count === 1 ? 'imagen' : 'imágenes'} en “${getFolderTitle(state.activeFolder)}”.`

  const progress = element.querySelector('[data-export-progress]')
  progress.hidden = true
  progress.value = 0
  element.showModal()
}

async function run() {
  if (busy) return
  const element = getDialog()
  if (!element) return

  const button = element.querySelector('[data-action="video-export-run"]')
  const progress = element.querySelector('[data-export-progress]')
  const options = {
    fallDuration: Number(element.querySelector('[data-export-fall]').value),
    random: element.querySelector('[data-export-random]').checked,
    background: element.querySelector('[data-export-background]').value
  }

  busy = true
  button.disabled = true
  button.setAttribute('aria-busy', 'true')
  progress.hidden = false
  progress.max = 1
  progress.value = 0

  await exportVideo(options, (done, total) => {
    if (progress.value === done) return
    progress.max = total
    progress.value = done
  })

  busy = false
  button.disabled = false
  button.removeAttribute('aria-busy')
}

export function initVideoExportDialog() {
  const element = getDialog()
  if (!element || element.dataset.ready) return

  element.innerHTML = template()
  element.dataset.ready = 'true'

  element.addEventListener('input', (event) => {
    const slider = event.target.closest('[data-export-fall]')
    if (!slider) return
    element.querySelector('[data-output="video-fall"]').textContent = formatSeconds(
      Number(slider.value)
    )
  })

  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-action="export-video"]')) {
      openDialog()
      return
    }
    if (event.target.closest('[data-action="video-export-run"]')) run()
  })
}
