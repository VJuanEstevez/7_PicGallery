import { getFolderImages, getFolderTitle, getState } from '../store.js'
import { formatNumber } from '../utils.js'
import { exportPdf } from '../export/pdf.js'

let dialog = null
let busy = false

function getDialog() {
  if (!dialog) dialog = document.getElementById('pdf-export-dialog')
  return dialog
}

function template() {
  return `
    <div class="dialog__form">
      <header class="dialog__head">
        <div>
          <p class="eyebrow">Exportar</p>
          <h2 class="dialog__title" id="pdf-export-title">PDF en cuadrícula</h2>
          <p class="dialog__sub">Las imágenes de la carpeta activa, distribuidas en páginas A4 apaisadas.</p>
        </div>
        <button
          class="icon-btn icon-btn--bare"
          type="button"
          data-action="close-dialog"
          data-dialog="pdf-export-dialog"
          aria-label="Cerrar"
          data-tooltip="Cerrar"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-close"></use></svg>
        </button>
      </header>

      <div class="dialog__body">
        <p class="export-summary" data-export-summary></p>

        <fieldset class="export-field">
          <legend>Cuadrícula</legend>
          <div class="export-options">
            <label class="export-choice">
              <input type="radio" name="pdf-layout" value="2x2" />
              <span>2 × 2</span>
            </label>
            <label class="export-choice">
              <input type="radio" name="pdf-layout" value="3x3" checked />
              <span>3 × 3</span>
            </label>
            <label class="export-choice">
              <input type="radio" name="pdf-layout" value="4x4" />
              <span>4 × 4</span>
            </label>
            <label class="export-choice">
              <input type="radio" name="pdf-layout" value="5x5" />
              <span>5 × 5</span>
            </label>
            <label class="export-choice">
              <input type="radio" name="pdf-layout" value="random" />
              <span>Aleatoria</span>
            </label>
          </div>
        </fieldset>

        <div class="export-field">
          <label class="export-range" for="pdf-gap">
            <span>Separación entre imágenes</span>
            <output for="pdf-gap" data-output="pdf-gap">10 px</output>
          </label>
          <input
            id="pdf-gap"
            type="range"
            min="0"
            max="24"
            step="1"
            value="10"
            data-export-gap
          />
        </div>

        <p class="export-note">Las imágenes recortan para ocupar cada celda. La opción aleatoria mezcla las imágenes y hace que algunas celdas ocupen dos columnas o dos filas.</p>
        <progress class="export-progress" data-export-progress value="0" max="1" hidden></progress>
      </div>

      <footer class="dialog__foot">
        <button
          class="btn btn--ghost"
          type="button"
          data-action="close-dialog"
          data-dialog="pdf-export-dialog"
        >Cancelar</button>
        <button
          class="btn btn--primary"
          type="button"
          data-action="pdf-export-run"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-download"></use></svg>
          Exportar PDF
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

  const layout =
    element.querySelector('input[name="pdf-layout"]:checked')?.value ?? '3x3'
  const gap = Number(element.querySelector('[data-export-gap]').value)
  const button = element.querySelector('[data-action="pdf-export-run"]')
  const progress = element.querySelector('[data-export-progress]')

  busy = true
  button.disabled = true
  button.setAttribute('aria-busy', 'true')
  progress.hidden = false
  progress.max = 1
  progress.value = 0

  await exportPdf({ layout, gap }, (done, total) => {
    progress.max = total
    progress.value = done
  })

  busy = false
  button.disabled = false
  button.removeAttribute('aria-busy')
}

export function initPdfExportDialog() {
  const element = getDialog()
  if (!element || element.dataset.ready) return

  element.innerHTML = template()
  element.dataset.ready = 'true'

  element.addEventListener('input', (event) => {
    const slider = event.target.closest('[data-export-gap]')
    if (!slider) return
    element.querySelector('[data-output="pdf-gap"]').textContent =
      `${slider.value} px`
  })

  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-action="export-pdf"]')) {
      openDialog()
      return
    }
    if (event.target.closest('[data-action="pdf-export-run"]')) run()
  })
}
