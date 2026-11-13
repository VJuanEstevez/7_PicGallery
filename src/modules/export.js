import {
  getFolderTitle,
  getSelectedImages,
  getState,
  getTotalBytes,
  getVisibleImages
} from './store.js'
import {
  escapeHtml,
  formatBytes,
  formatDate,
  formatNumber
} from './utils.js'
import { toast } from './toast.js'

let dialog = null
let settings = {
  title: '',
  client: '',
  date: '',
  notes: '',
  columns: 3,
  scope: 'collection',
  palette: true,
  name: true,
  meta: true
}

function getDialog() {
  if (!dialog) dialog = document.getElementById('export-dialog')
  return dialog
}

function defaultTitle() {
  const state = getState()
  return state.activeFolder === 'all'
    ? 'Colección completa'
    : getFolderTitle(state.activeFolder)
}

function todayValue() {
  return new Date().toISOString().slice(0, 10)
}

function chunk(items, size) {
  const pages = []
  for (let index = 0; index < items.length; index += size) {
    pages.push(items.slice(index, index + size))
  }
  return pages
}

function perPage(columns) {
  if (Number(columns) === 2) return 4
  if (Number(columns) === 4) return 12
  return 9
}

function coverSwatches(images) {
  const colors = []

  for (const image of images) {
    for (const hex of image.palette ?? []) {
      if (!colors.includes(hex)) colors.push(hex)
      if (colors.length >= 12) return colors
    }
  }

  return colors
}

function buildSheet(images, options) {
  const columns = Number(options.columns) || 3
  const pages = chunk(images, perPage(columns))
  const totalBytes = getTotalBytes(images)
  const swatches = options.palette ? coverSwatches(images) : []

  const cover = `
    <article class="sheet__cover">
      <div class="sheet__brand"><i></i> PicGallery · Archivo visual</div>
      <div class="sheet__cover-rule"></div>
      <h1>${escapeHtml(options.title || 'Colección PicGallery')}</h1>
      ${
        options.client
          ? `<p class="sheet__cover-client">Para ${escapeHtml(options.client)}</p>`
          : ''
      }
      <div class="sheet__cover-meta">
        <span>${formatDate(new Date(`${options.date || todayValue()}T12:00:00`))}</span>
        <span>${formatNumber(images.length)} imágenes</span>
        <span>${formatBytes(totalBytes)}</span>
      </div>
      ${
        options.notes
          ? `<p class="sheet__cover-notes">${escapeHtml(options.notes)}</p>`
          : ''
      }
      ${
        swatches.length > 0
          ? `<div class="sheet__cover-palette">${swatches
              .map((hex) => `<span class="sheet__cover-swatch" style="--hex: ${escapeHtml(hex)}"></span>`)
              .join('')}</div>`
          : ''
      }
      <div class="sheet__cover-footer">
        <span>PicGallery</span>
        <span>Presentación</span>
      </div>
    </article>
  `

  const sheets = pages
    .map(
      (page, pageIndex) => `
        <section class="sheet__page">
          <header class="sheet__page-head">
            <span class="sheet__page-title">${escapeHtml(options.title || 'Colección PicGallery')}</span>
            <span class="sheet__page-num">${String(pageIndex + 1).padStart(2, '0')} / ${String(pages.length).padStart(2, '0')}</span>
          </header>
          <div class="sheet__grid" style="--cols: ${columns}">
            ${page
              .map(
                (image) => `
                  <figure class="sheet__figure">
                    <img
                      src="${escapeHtml(image.src)}"
                      alt="${escapeHtml(image.title)}"
                      loading="eager"
                      decoding="async"
                    />
                    ${
                      options.name || options.meta
                        ? `
                          <figcaption class="sheet__caption">
                            ${
                              options.name
                                ? `<strong>${escapeHtml(image.title)}</strong>`
                                : ''
                            }
                            ${
                              options.meta
                                ? `<span>${escapeHtml(image.format)} · ${image.width}×${image.height} · ${formatBytes(image.bytes)}</span>`
                                : ''
                            }
                          </figcaption>
                        `
                        : ''
                    }
                    ${
                      options.palette && image.palette
                        ? `<div class="sheet__palette" aria-hidden="true">${image.palette
                            .map((hex) => `<i style="--hex: ${escapeHtml(hex)}"></i>`)
                            .join('')}</div>`
                        : ''
                    }
                  </figure>
                `
              )
              .join('')}
          </div>
        </section>
      `
    )
    .join('')

  return `<div class="sheet">${cover}${sheets}</div>`
}

function currentImages() {
  return settings.scope === 'selection'
    ? getSelectedImages()
    : getVisibleImages()
}

function updatePreview() {
  const element = getDialog()
  const preview = element.querySelector('#export-preview')
  const printSheet = document.getElementById('print-sheet')
  const pageCount = element.querySelector('#export-page-count')
  const printButton = element.querySelector('[data-action="export-print"]')
  const images = currentImages()

  if (!preview || !printSheet) return

  if (images.length === 0) {
    preview.innerHTML = `
      <div class="export__empty">
        <strong>No hay imágenes para presentar</strong>
        <p>Selecciona alguna imagen o cambia el alcance de la presentación.</p>
      </div>
    `
    printSheet.innerHTML = ''
    if (pageCount) pageCount.textContent = '0 imágenes'
    if (printButton) printButton.disabled = true
    return
  }

  const html = buildSheet(images, settings)
  const pages = Math.ceil(images.length / perPage(settings.columns))

  preview.innerHTML = html
  printSheet.innerHTML = html

  if (pageCount) {
    pageCount.textContent = `${formatNumber(images.length)} imágenes · ${pages} ${pages === 1 ? 'página' : 'páginas'}`
  }

  if (printButton) printButton.disabled = false
}

function readSettings() {
  const element = getDialog()
  if (!element) return

  const value = (name) =>
    element.querySelector(`[data-export-field="${name}"]`)?.value ?? ''

  settings = {
    title: value('title').trim(),
    client: value('client').trim(),
    date: value('date'),
    notes: value('notes').trim(),
    columns: Number(value('columns')) || 3,
    scope:
      element.querySelector('input[name="export-scope"]:checked')?.value ??
      'collection',
    palette: Boolean(
      element.querySelector('[data-export-field="palette"]')?.checked
    ),
    name: Boolean(element.querySelector('[data-export-field="name"]')?.checked),
    meta: Boolean(element.querySelector('[data-export-field="meta"]')?.checked)
  }
}

function handleSettingsChange(event) {
  if (
    !event.target.matches('[data-export-field]') &&
    !event.target.matches('input[name="export-scope"]')
  ) {
    return
  }

  readSettings()
  updatePreview()
}

function renderExportDialog() {
  const state = getState()
  const selected = getSelectedImages(state)
  const collectionCount = getVisibleImages(state).length
  const hasSelection = selected.length > 0

  settings = {
    title: defaultTitle(),
    client: '',
    date: todayValue(),
    notes: '',
    columns: 3,
    scope: hasSelection ? 'selection' : 'collection',
    palette: true,
    name: true,
    meta: true
  }

  const element = getDialog()

  element.innerHTML = `
    <form class="dialog__form" id="export-form">
      <header class="dialog__head">
        <div>
          <p class="eyebrow">Presentación</p>
          <h2 class="dialog__title" id="export-title">Exportar colección</h2>
          <p class="dialog__sub">Prepara una hoja en cuadrícula lista para clientes.</p>
        </div>
        <button
          class="icon-btn icon-btn--bare"
          type="button"
          data-action="close-dialog"
          data-dialog="export-dialog"
          aria-label="Cerrar"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-close"></use></svg>
        </button>
      </header>

      <div class="export__body">
        <div class="export__settings">
          <label class="field">
            <span>Título de la presentación</span>
            <input data-export-field="title" value="${escapeHtml(settings.title)}" />
          </label>

          <div class="field field--row">
            <label class="field">
              <span>Cliente</span>
              <input data-export-field="client" placeholder="Nombre del cliente" />
            </label>
            <label class="field">
              <span>Fecha</span>
              <input type="date" data-export-field="date" value="${settings.date}" />
            </label>
          </div>

          <label class="field">
            <span>Notas</span>
            <textarea
              data-export-field="notes"
              placeholder="Una breve introducción para la presentación…"
            ></textarea>
          </label>

          <label class="field">
            <span>Columnas de la cuadrícula</span>
            <select data-export-field="columns">
              <option value="2" ${settings.columns === 2 ? 'selected' : ''}>2 columnas · formato amplio</option>
              <option value="3" ${settings.columns === 3 ? 'selected' : ''}>3 columnas · equilibrio</option>
              <option value="4" ${settings.columns === 4 ? 'selected' : ''}>4 columnas · catálogo</option>
            </select>
          </label>

          <fieldset class="export__scope">
            <legend>Imágenes a incluir</legend>
            <label class="toggle-field">
              <input type="radio" name="export-scope" value="collection" ${settings.scope === 'collection' ? 'checked' : ''} />
              Toda la colección (${formatNumber(collectionCount)})
            </label>
            <label class="toggle-field">
              <input type="radio" name="export-scope" value="selection" ${settings.scope === 'selection' ? 'checked' : ''} ${hasSelection ? '' : 'disabled'} />
              Solo la selección (${formatNumber(selected.length)})
            </label>
          </fieldset>

          <label class="toggle-field">
            <input type="checkbox" data-export-field="palette" ${settings.palette ? 'checked' : ''} />
            Mostrar paleta de color
          </label>
          <label class="toggle-field">
            <input type="checkbox" data-export-field="name" ${settings.name ? 'checked' : ''} />
            Mostrar nombre
          </label>
          <label class="toggle-field">
            <input type="checkbox" data-export-field="meta" ${settings.meta ? 'checked' : ''} />
            Mostrar ficha técnica
          </label>
        </div>

        <div class="export__preview-wrap">
          <div class="export__preview-head">
            <span class="eyebrow">Vista previa</span>
            <span class="mono" id="export-page-count"></span>
          </div>
          <div class="export__preview" id="export-preview"></div>
        </div>
      </div>

      <footer class="dialog__foot">
        <span class="hint" style="margin-right: auto">Se imprimirá en A4 horizontal.</span>
        <button
          class="btn btn--ghost"
          type="button"
          data-action="close-dialog"
          data-dialog="export-dialog"
        >
          Cancelar
        </button>
        <button class="btn btn--primary" type="button" data-action="export-print">
          <svg class="icon" aria-hidden="true"><use href="#icon-download"></use></svg>
          Imprimir / Guardar PDF
        </button>
      </footer>
    </form>
  `

  updatePreview()
}

export function initExport() {
  dialog = document.getElementById('export-dialog')

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close()
  })

  dialog.addEventListener('input', handleSettingsChange)
  dialog.addEventListener('change', handleSettingsChange)
}

export function openExportDialog() {
  const images = getVisibleImages()
  if (images.length === 0) {
    toast('No hay imágenes visibles para exportar.', {
      type: 'error',
      icon: 'info'
    })
    return
  }

  renderExportDialog()
  const element = getDialog()
  if (!element.open) element.showModal()
}

export async function printPresentation() {
  const images = currentImages()

  if (images.length === 0) {
    toast('No hay imágenes para presentar.', { type: 'error', icon: 'info' })
    return
  }

  const printSheet = document.getElementById('print-sheet')
  const pending = [...printSheet.querySelectorAll('img')]

  await Promise.all(
    pending.map(
      (image) =>
        new Promise((resolve) => {
          if (image.complete) {
            resolve()
            return
          }
          image.addEventListener('load', resolve, { once: true })
          image.addEventListener('error', resolve, { once: true })
        })
    )
  )

  const previousTitle = document.title
  document.title = `${settings.title || 'PicGallery'} — PicGallery`

  const restore = () => {
    document.title = previousTitle
    window.removeEventListener('afterprint', restore)
  }

  window.addEventListener('afterprint', restore)
  window.print()
}
