import {
  clearFilters,
  clearSelection,
  closeOverlays,
  createFolder,
  deleteAllImages,
  deleteFolder,
  deleteImage,
  deleteImages,
  getFolder,
  getSelectedImages,
  getState,
  getVisibleImages,
  initStore,
  selectAll,
  setFavorites,
  setFolder,
  setInspectorDrawer,
  setInspectorOpen,
  setPalettes,
  setQuery,
  setSidebarCollapsed,
  setSidebarOpen,
  setSort,
  setView,
  subscribe,
  toggleFavorite,
  toggleSelection,
  toggleTag
} from './modules/store.js'

import { renderSidebar } from './modules/ui/sidebar.js'
import { getTopbarSubtitle, renderTopbar } from './modules/ui/topbar.js'
import { renderToolbar, updateToolbarView } from './modules/ui/toolbar.js'
import {
  renderGallery,
  updateActiveUI,
  updateGalleryLayout,
  updatePaletteUI,
  updateSelectionUI
} from './modules/ui/gallery.js'
import { renderInspector } from './modules/ui/inspector.js'
import { renderBulkBar } from './modules/ui/bulk.js'

import { initDragDrop } from './modules/dragdrop.js'
import { initUpload, openUploadDialog, pickFiles } from './modules/upload.js'
import { openMoveDialog } from './modules/move.js'
import { openFolderRenameDialog, openRenameDialog } from './modules/rename.js'
import {
  closeLightbox,
  goToLightbox,
  handleLightboxFavorite,
  isLightboxOpen,
  navigateLightbox,
  openLightbox,
  syncLightbox
} from './modules/lightbox.js'
import { extractPaletteFromSource } from './modules/palette.js'
import { toast } from './modules/toast.js'
import { copyText, downloadImage } from './modules/utils.js'
import { confirmAction } from './modules/confirm.js'
import { initSettings, openSettingsDialog } from './modules/settings.js'
import { downloadCollection } from './modules/export-collection.js'
import { initPdfExportDialog } from './modules/ui/pdf-export-dialog.js'
import { initVideoExportDialog } from './modules/ui/video-export-dialog.js'
import { initPwa } from './modules/pwa.js'

const app = document.getElementById('app')
const sidebar = document.getElementById('sidebar')
const topbar = document.getElementById('topbar')
const toolbar = document.getElementById('toolbar')
const galleryRegion = document.getElementById('gallery-region')
const inspector = document.getElementById('inspector')
const bulkBar = document.getElementById('bulk-bar')
const scrim = document.getElementById('scrim')

let searchTimer = 0
let resizeTimer = 0

function captureFocus() {
  const element = document.activeElement
  if (!element || !element.dataset?.focusKey) return null

  return {
    key: element.dataset.focusKey,
    start: element.selectionStart,
    end: element.selectionEnd
  }
}

function restoreFocus(focus) {
  if (!focus) return

  const element = document.querySelector(
    `[data-focus-key="${CSS.escape(focus.key)}"]`
  )
  if (!element) return

  element.focus({ preventScroll: true })

  if (
    typeof focus.start === 'number' &&
    typeof element.setSelectionRange === 'function'
  ) {
    try {
      element.setSelectionRange(focus.start, focus.end)
    } catch {
      // Some input types do not support selection ranges.
    }
  }
}

function applyUiState(state) {
  const narrow = window.matchMedia('(max-width: 1200px)').matches
  const mobile = window.matchMedia('(max-width: 1024px)').matches

  app.classList.toggle('is-sidebar-open', state.sidebarOpen)
  app.classList.toggle('is-sidebar-collapsed', !mobile && state.sidebarCollapsed)
  app.classList.toggle(
    'is-inspector-open',
    narrow ? state.inspectorDrawer : state.inspectorOpen
  )

  const scrimVisible =
    (mobile && state.sidebarOpen) || (narrow && state.inspectorDrawer)

  scrim.hidden = !scrimVisible
  scrim.classList.toggle('is-visible', scrimVisible)

  const sidebarButton = topbar.querySelector('[data-action="toggle-sidebar"]')
  if (sidebarButton) {
    const expanded = mobile ? state.sidebarOpen : !state.sidebarCollapsed
    sidebarButton.setAttribute('aria-expanded', String(expanded))
    sidebarButton.setAttribute('data-tooltip', expanded ? 'Ocultar el menú' : 'Mostrar el menú')
    sidebarButton.setAttribute(
      'aria-label',
      mobile
        ? expanded
          ? 'Cerrar menú de navegación'
          : 'Abrir menú de navegación'
        : expanded
          ? 'Ocultar menú de navegación'
          : 'Mostrar menú de navegación'
    )
  }

  const inspectorButton = topbar.querySelector('[data-action="toggle-inspector"]')
  if (inspectorButton) {
    const expanded = narrow ? state.inspectorDrawer : state.inspectorOpen
    inspectorButton.setAttribute('aria-expanded', String(expanded))
    inspectorButton.setAttribute(
      'data-tooltip',
      expanded ? 'Ocultar ficha técnica' : 'Mostrar ficha técnica'
    )
    inspectorButton.setAttribute(
      'aria-label',
      expanded ? 'Ocultar ficha técnica' : 'Mostrar ficha técnica'
    )
  }
}

function updateTopbarSubtitle(state) {
  const subtitle = topbar.querySelector('.topbar__sub')
  if (subtitle) subtitle.textContent = getTopbarSubtitle(state)
}

function syncSearchValue(state) {
  const search = topbar.querySelector('[data-search]')
  if (search && search.value !== state.filters.query) {
    search.value = state.filters.query
  }
}

function syncSortValue(state) {
  const select = document.querySelector('[data-sort-select]')
  if (select && select.value !== state.sort) select.value = state.sort
}

function render(reason = 'update') {
  const focus = captureFocus()
  const state = getState()

  if (
    reason === 'init' ||
    reason === 'folder' ||
    reason === 'folder-delete' ||
    reason === 'move' ||
    reason === 'upload' ||
    reason === 'delete' ||
    reason === 'favorite' ||
    reason === 'update'
  ) {
    renderSidebar(sidebar)
    renderTopbar(topbar)
    renderToolbar(toolbar)
    renderGallery(galleryRegion, { animate: reason === 'init' })
    renderInspector(inspector)
    renderBulkBar(bulkBar)
    updateToolbarView()
    syncLightbox()

    if (reason === 'folder' || reason === 'upload') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  } else if (reason === 'filters') {
    updateTopbarSubtitle(state)
    syncSearchValue(state)
    renderSidebar(sidebar)
    renderToolbar(toolbar)
    renderGallery(galleryRegion)
    renderInspector(inspector)
    renderBulkBar(bulkBar)
  } else if (reason === 'selection') {
    updateSelectionUI()
    updateActiveUI()
    renderToolbar(toolbar)
    renderInspector(inspector)
    renderBulkBar(bulkBar)
  } else if (reason === 'active') {
    updateActiveUI()
    renderInspector(inspector)
  } else if (reason === 'palettes') {
    updatePaletteUI()
    renderInspector(inspector)
    syncLightbox()
  } else if (reason === 'sort' || reason === 'reorder') {
    renderGallery(galleryRegion)
    syncSortValue(state)
  } else if (reason === 'view') {
    renderToolbar(toolbar)
    renderGallery(galleryRegion)
    updateToolbarView()
  } else if (reason === 'view-style') {
    updateGalleryLayout()
    updateToolbarView()
  } else if (reason === 'folder-create') {
    renderSidebar(sidebar)
  }

  applyUiState(state)
  restoreFocus(focus)
}

function handleSelectAll() {
  const state = getState()
  const visible = getVisibleImages(state)
  const allSelected =
    visible.length > 0 &&
    visible.every((image) => state.selectedIds.includes(image.id))

  if (allSelected) clearSelection()
  else selectAll(visible.map((image) => image.id))
}

function toggleBulkFavorite() {
  const selected = getSelectedImages()
  if (selected.length === 0) return

  const allFavorite = selected.every((image) => image.favorite)
  setFavorites(
    selected.map((image) => image.id),
    !allFavorite
  )
  toast(
    allFavorite ? 'Selección quitada de favoritos' : 'Selección añadida a favoritos'
  )
}

function handleFavorite(id) {
  const favorite = toggleFavorite(id)
  toast(favorite ? 'Añadida a favoritos' : 'Quitada de favoritos')
}

function handleDownload(id) {
  const image = getState().images.find((entry) => entry.id === id)
  if (!image) return

  downloadImage(image)
  toast(
    image.format === 'RAW' ? 'Descargando proxy JPG' : 'Descarga iniciada'
  )
}

async function handleCopyHex(hex) {
  if (!hex) return
  const copied = await copyText(hex)
  toast(copied ? `${hex} copiado` : 'No se pudo copiar el color', {
    type: copied ? 'info' : 'error',
    icon: copied ? 'copy' : 'info'
  })
}

async function handleCopyPalette(id) {
  const image = getState().images.find((entry) => entry.id === id)
  if (!image?.palette?.length) return

  const copied = await copyText(image.palette.join(', '))
  toast(copied ? 'Paleta copiada' : 'No se pudo copiar la paleta', {
    type: copied ? 'info' : 'error',
    icon: copied ? 'copy' : 'info'
  })
}

function closeDialog(id) {
  const dialog = document.getElementById(id)
  if (dialog?.open) dialog.close()
}

function openImage(id) {
  closeOverlays()
  openLightbox(id)
}

function startFolderCreate() {
  const list = sidebar.querySelector('.sidebar__folders')
  if (!list || list.querySelector('.folder-create')) return

  const form = document.createElement('form')
  form.className = 'folder-create'
  form.innerHTML = `
    <input
      type="text"
      name="folder-name"
      placeholder="Nueva carpeta"
      aria-label="Nombre de la nueva carpeta"
      autocomplete="off"
    />
    <button type="submit" aria-label="Crear carpeta" data-tooltip="Crear carpeta">
      <svg class="icon" aria-hidden="true"><use href="#icon-check"></use></svg>
    </button>
  `

  list.append(form)
  const input = form.querySelector('input')
  input.focus()

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const name = input.value.trim()
    if (!name) {
      input.focus()
      return
    }

    const id = createFolder(name)
    toast(`Carpeta “${name}” creada`)

    if (id) {
      window.requestAnimationFrame(() => {
        document
          .querySelector(`[data-focus-key="folder-${CSS.escape(id)}"]`)
          ?.focus()
      })
    }
  })

  form.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return
    event.stopPropagation()
    form.remove()
  })
}

function setupListeners() {
  document.addEventListener('click', async (event) => {
    const summary = event.target.closest('.sidebar__summary')
    if (
      summary &&
      app.classList.contains('is-sidebar-collapsed') &&
      !window.matchMedia('(max-width: 1024px)').matches
    ) {
      setSidebarCollapsed(false)
    }

    const target = event.target.closest('[data-action]')
    if (!target) return

    const action = target.dataset.action

    switch (action) {
      case 'folder':
        setFolder(target.dataset.folder)
        break

      case 'toggle-sidebar': {
        const state = getState()
        const mobile = window.matchMedia('(max-width: 1024px)').matches

        if (mobile) {
          if (!state.sidebarOpen) setInspectorDrawer(false)
          setSidebarOpen(!state.sidebarOpen)
        } else {
          setSidebarCollapsed(!state.sidebarCollapsed)
        }
        break
      }

      case 'close-sidebar':
        setSidebarOpen(false)
        break

      case 'toggle-inspector': {
        const state = getState()
        const narrow = window.matchMedia('(max-width: 1200px)').matches

        if (narrow) {
          if (!state.inspectorDrawer) setSidebarOpen(false)
          setInspectorDrawer(!state.inspectorDrawer)
        } else {
          setInspectorOpen(!state.inspectorOpen)
        }
        break
      }

      case 'close-inspector': {
        const narrow = window.matchMedia('(max-width: 1200px)').matches
        if (narrow) setInspectorDrawer(false)
        else setInspectorOpen(false)
        break
      }

      case 'new-folder':
        startFolderCreate()
        break

      case 'open-upload':
        openUploadDialog()
        break

      case 'pick-files':
        pickFiles()
        break

      case 'download-collection':
        await downloadCollection()
        break

      case 'open-settings':
        openSettingsDialog()
        break

      case 'open-move':
        openMoveDialog([target.dataset.id])
        break

      case 'rename-image':
        openRenameDialog(target.dataset.id)
        break

      case 'rename-folder':
        openFolderRenameDialog(target.dataset.folder)
        break

      case 'view-layout':
        setView({ layout: target.dataset.layout === 'list' ? 'list' : 'grid' }, 'view')
        break

      case 'bulk-move':
        openMoveDialog(getState().selectedIds)
        break

      case 'bulk-favorite':
        toggleBulkFavorite()
        break

      case 'bulk-delete': {
        const ids = getState().selectedIds
        if (ids.length === 0) break

        const confirmed = await confirmAction({
          title: 'Eliminar selección',
          message: `Se eliminarán ${ids.length} ${ids.length === 1 ? 'imagen' : 'imágenes'} de la biblioteca. Esta acción no se puede deshacer.`,
          confirmLabel: 'Eliminar',
          danger: true
        })
        if (!confirmed) break

        if (isLightboxOpen()) closeLightbox()
        const total = deleteImages(ids)
        toast(total === 1 ? 'Imagen eliminada' : `${total} imágenes eliminadas`)
        break
      }

      case 'bulk-clear':
        clearSelection()
        break

      case 'select-all':
        handleSelectAll()
        break

      case 'clear-filters':
        clearFilters()
        break

      case 'delete-image': {
        const image = getState().images.find(
          (entry) => entry.id === target.dataset.id
        )
        if (!image) break

        const confirmed = await confirmAction({
          title: 'Eliminar imagen',
          message: `Se eliminará “${image.title}” de la biblioteca. Esta acción no se puede deshacer.`,
          confirmLabel: 'Eliminar',
          danger: true
        })
        if (!confirmed) break

        if (isLightboxOpen()) closeLightbox()
        deleteImage(image.id)
        toast('Imagen eliminada')
        break
      }

      case 'delete-all-images': {
        const state = getState()
        if (state.images.length === 0) break

        const confirmed = await confirmAction({
          title: 'Eliminar todas las imágenes',
          message: `Se eliminarán las ${state.images.length} imágenes de la biblioteca. Esta acción no se puede deshacer.`,
          confirmLabel: 'Eliminar todas',
          danger: true
        })
        if (!confirmed) break

        if (isLightboxOpen()) closeLightbox()
        const total = deleteAllImages()
        toast(total === 1 ? 'Imagen eliminada' : `${total} imágenes eliminadas`)
        break
      }

      case 'delete-folder': {
        const folder = getFolder(target.dataset.folder)
        if (!folder) break

        const confirmed = await confirmAction({
          title: 'Eliminar carpeta',
          message: `Se eliminará la carpeta “${folder.name}”. Las imágenes que contenga se moverán a “Sin clasificar”.`,
          confirmLabel: 'Eliminar carpeta',
          danger: true
        })
        if (!confirmed) break

        const removed = deleteFolder(folder.id)
        if (removed) toast(`Carpeta “${folder.name}” eliminada`)
        break
      }

      case 'toggle-tag':
        toggleTag(target.dataset.tag)
        break

      case 'open-image':
        openImage(target.dataset.id)
        break

      case 'favorite':
        handleFavorite(target.dataset.id)
        break

      case 'download':
        handleDownload(target.dataset.id)
        break

      case 'copy-hex':
        await handleCopyHex(target.dataset.hex)
        break

      case 'copy-palette':
        await handleCopyPalette(target.dataset.id)
        break

      case 'close-dialog':
        closeDialog(target.dataset.dialog)
        break

      case 'lightbox-close':
        closeLightbox()
        break

      case 'lightbox-prev':
        navigateLightbox(-1)
        break

      case 'lightbox-next':
        navigateLightbox(1)
        break

      case 'lightbox-favorite':
        handleLightboxFavorite()
        break

      case 'lightbox-go':
        goToLightbox(Number(target.dataset.index))
        break

      default:
        break
    }
  })

  document.addEventListener('change', (event) => {
    const checkbox = event.target.closest('input[data-select]')
    if (checkbox) {
      toggleSelection(checkbox.dataset.select, checkbox.checked)
      return
    }

    const meta = event.target.closest('[data-view-meta]')
    if (meta) {
      setView({ showMeta: meta.checked }, 'view-style')
      return
    }

    const sort = event.target.closest('[data-sort-select]')
    if (sort) setSort(sort.value)
  })

  document.addEventListener('input', (event) => {
    const columns = event.target.closest('[data-view-columns]')
    if (columns) {
      const value = Number(columns.value)
      setView({ columns: value }, 'view-style')
      return
    }

    const gap = event.target.closest('[data-view-gap]')
    if (gap) {
      const value = Number(gap.value)
      setView({ gap: value }, 'view-style')
      return
    }

    const search = event.target.closest('[data-search]')
    if (!search) return

    window.clearTimeout(searchTimer)
    const value = search.value
    searchTimer = window.setTimeout(() => setQuery(value), 130)
  })

  document.addEventListener('search', (event) => {
    if (event.target.matches('[data-search]')) setQuery(event.target.value)
  })

  document.addEventListener('keydown', (event) => {
    const typing = event.target.closest(
      'input, textarea, select, [contenteditable="true"]'
    )
    const dialogOpen = Boolean(document.querySelector('dialog[open]'))

    if (
      !typing &&
      !dialogOpen &&
      (event.key === '/' ||
        ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'))
    ) {
      event.preventDefault()
      topbar.querySelector('[data-search]')?.focus()
      return
    }

    if (event.key === 'Escape' && !dialogOpen) {
      closeOverlays()
    }
  })

  scrim.addEventListener('click', closeOverlays)

  for (const id of [
    'move-dialog',
    'rename-dialog',
    'upload-dialog',
    'confirm-dialog',
    'settings-dialog',
    'pdf-export-dialog',
    'video-export-dialog'
  ]) {
    const dialog = document.getElementById(id)
    dialog?.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close()
    })
  }

  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(() => {
      if (window.innerWidth > 1200) setInspectorDrawer(false)
      if (window.innerWidth > 1024) setSidebarOpen(false)
      applyUiState(getState())
    }, 120)
  })
}

async function hydratePalettes() {
  const state = getState()
  const missing = state.images.filter((image) => !image.palette)
  if (missing.length === 0) return

  const updates = {}
  const queue = [...missing]

  const worker = async () => {
    while (queue.length > 0) {
      const image = queue.shift()
      if (!image) continue

      try {
        updates[image.id] = await extractPaletteFromSource(image.src)
      } catch {
        // Images that cannot be sampled keep their neutral placeholder.
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(4, queue.length) }, () => worker())
  )

  if (Object.keys(updates).length > 0) setPalettes(updates)
}

async function boot() {
  initDragDrop()
  initUpload()
  initSettings()
  initPdfExportDialog()
  initVideoExportDialog()
  initPwa()
  setupListeners()

  try {
    await initStore()
  } catch (error) {
    console.error(error)
    render('init')
    toast('No se pudo cargar la biblioteca guardada.', {
      type: 'error',
      icon: 'info'
    })
  }

  hydratePalettes()
}

subscribe((state, reason) => render(reason))
boot()
