import { addImages, clearFilters, getState, setFolder, setSort } from './store.js'
import { formatFromFile, inspectFile } from './metadata.js'
import { saveUpload } from './db.js'
import { escapeHtml, titleFromFilename, uid } from './utils.js'
import { toast } from './toast.js'

const MAX_SIZE = 25 * 1024 * 1024

let dialog = null
let fileInput = null
let processing = false
let dragDepth = 0

function getDialog() {
  if (!dialog) dialog = document.getElementById('upload-dialog')
  return dialog
}

function defaultFolder() {
  const state = getState()
  const isUserFolder = state.folders.some(
    (folder) => folder.id === state.activeFolder
  )
  return isUserFolder ? state.activeFolder : 'inbox'
}

function selectedFolder() {
  return dialog?.querySelector('#upload-folder')?.value || defaultFolder()
}

function renderUploadDialog() {
  const state = getState()
  const target = defaultFolder()

  const options = state.folders
    .map(
      (folder) => `
        <option value="${escapeHtml(folder.id)}" ${folder.id === target ? 'selected' : ''}>
          ${escapeHtml(folder.name)}
        </option>
      `
    )
    .join('')

  dialog.innerHTML = `
    <form class="dialog__form" id="upload-form">
      <header class="dialog__head">
        <div>
          <p class="eyebrow">Añadir</p>
          <h2 class="dialog__title" id="upload-title">Añadir imágenes</h2>
          <p class="dialog__sub">Se guardan en este navegador, listas para organizar.</p>
        </div>
        <button
          class="icon-btn icon-btn--bare"
          type="button"
          data-action="close-dialog"
          data-dialog="upload-dialog"
          aria-label="Cerrar"
          data-tooltip="Cerrar"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-close"></use></svg>
        </button>
      </header>

      <div class="dialog__body">
        <label
          class="dropzone"
          id="upload-dropzone"
          for="upload-file-input"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-image"></use></svg>
          <strong>Arrastra imágenes aquí</strong>
          <span>o haz clic para elegirlas desde tu equipo</span>
          <input
            type="file"
            id="upload-file-input"
            accept="image/jpeg,image/png,image/webp"
            multiple
            hidden
          />
        </label>

        <label class="field" style="margin-top: 1.25rem">
          <span>Carpeta de destino</span>
          <select id="upload-folder">${options}</select>
        </label>

        <p class="hint">
          Formatos admitidos: JPG, PNG y WEBP · máximo 25 MB por archivo.
          Los RAW se muestran en el catálogo como proxy JPG, pero no se pueden subir.
        </p>
      </div>

      <footer class="dialog__foot">
        <button
          class="btn btn--ghost"
          type="button"
          data-action="close-dialog"
          data-dialog="upload-dialog"
          data-tooltip="Cerrar sin añadir imágenes"
        >
          Cerrar
        </button>
        <button
          class="btn btn--primary"
          type="button"
          data-action="pick-files"
          data-tooltip="Explorar imágenes en el equipo"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-plus"></use></svg>
          Elegir imágenes
        </button>
      </footer>
    </form>
  `

  fileInput = dialog.querySelector('#upload-file-input')
  const dropzone = dialog.querySelector('#upload-dropzone')

  dropzone.addEventListener('dragover', (event) => {
    event.preventDefault()
    event.stopPropagation()
    dropzone.classList.add('is-dragover')
  })

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('is-dragover')
  })

  dropzone.addEventListener('drop', (event) => {
    event.preventDefault()
    event.stopPropagation()
    dropzone.classList.remove('is-dragover')
    dragDepth = 0

    const overlay = document.getElementById('drop-overlay')
    if (overlay) overlay.hidden = true

    const files = [...event.dataTransfer.files]
    if (files.length > 0) processFiles(files, selectedFolder())
  })

  fileInput.addEventListener('change', () => {
    const files = [...fileInput.files]
    if (files.length > 0) processFiles(files, selectedFolder())
    fileInput.value = ''
  })
}

async function processFiles(files, folderId) {
  if (processing) return
  processing = true

  const added = []
  const errors = []

  for (const file of files) {
    if (file.size > MAX_SIZE) {
      errors.push(`${file.name}: supera el límite de 25 MB.`)
      continue
    }

    const format = formatFromFile(file)

    if (!format) {
      errors.push(`${file.name}: formato no compatible.`)
      continue
    }

    if (format === 'RAW') {
      errors.push(`${file.name}: los RAW necesitan un proxy JPG.`)
      continue
    }

    try {
      const info = await inspectFile(file)
      const id = uid()
      const src = URL.createObjectURL(file)
      const image = {
        id,
        title: titleFromFilename(file.name),
        description: '',
        src,
        format: info.format,
        width: info.width,
        height: info.height,
        bytes: file.size,
        folderId,
        favorite: false,
        createdAt: new Date().toISOString(),
        origin: 'upload',
        palette: info.palette
      }

      const { src: _src, ...meta } = image
      await saveUpload({ id, blob: file, meta }).catch(() => null)
      added.push(image)
    } catch (error) {
      errors.push(error.message || `${file.name}: no se pudo procesar.`)
    }
  }

  processing = false

  if (added.length > 0) {
    addImages(added)
    clearFilters()
    setFolder(folderId)
    setSort('recent')

    const element = getDialog()
    if (element.open) element.close()

    toast(added.length === 1 ? 'Imagen añadida' : `${added.length} imágenes añadidas`)
  }

  if (errors.length > 0) {
    toast(errors[0], { type: 'error', icon: 'info' })
  }
}

export function initUpload() {
  dialog = document.getElementById('upload-dialog')
  const overlay = document.getElementById('drop-overlay')

  window.addEventListener('dragenter', (event) => {
    if (!event.dataTransfer?.types.includes('Files')) return
    event.preventDefault()
    dragDepth += 1
    if (overlay) overlay.hidden = false
  })

  window.addEventListener('dragover', (event) => {
    if (!event.dataTransfer?.types.includes('Files')) return
    event.preventDefault()
  })

  window.addEventListener('dragleave', (event) => {
    if (!event.dataTransfer?.types.includes('Files')) return
    dragDepth = Math.max(0, dragDepth - 1)
    if (dragDepth === 0 && overlay) overlay.hidden = true
  })

  window.addEventListener('drop', (event) => {
    if (!event.dataTransfer?.files?.length) return
    event.preventDefault()
    dragDepth = 0
    if (overlay) overlay.hidden = true

    const files = [...event.dataTransfer.files]
    if (files.length > 0) processFiles(files, defaultFolder())
  })
}

export function openUploadDialog() {
  renderUploadDialog()
  const element = getDialog()
  if (!element.open) element.showModal()
}

export function pickFiles() {
  fileInput?.click()
}
