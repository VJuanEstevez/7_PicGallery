import {
  getFolderEyebrow,
  getFolderTitle,
  getState,
  getTotalBytes,
  getVisibleImages
} from '../store.js'
import { escapeHtml, formatBytes, formatNumber } from '../utils.js'

export function getTopbarSubtitle(state = getState()) {
  const visible = getVisibleImages(state)
  const filtersActive =
    state.filters.query.trim() !== '' ||
    state.filters.tags.length > 0

  const totalBytes = getTotalBytes(state.images)
  const visibleBytes = getTotalBytes(visible)

  return filtersActive
    ? `${formatNumber(visible.length)} de ${formatNumber(state.images.length)} imágenes · ${formatBytes(visibleBytes)}`
    : `${formatNumber(state.images.length)} imágenes · ${formatBytes(totalBytes)}`
}

export function renderTopbar(root) {
  const state = getState()
  const subtitle = getTopbarSubtitle(state)

  const inspectorExpanded = state.inspectorOpen || state.inspectorDrawer
  const mobile = window.matchMedia('(max-width: 1024px)').matches
  const sidebarExpanded = mobile ? state.sidebarOpen : !state.sidebarCollapsed
  const sidebarLabel = mobile
    ? sidebarExpanded
      ? 'Cerrar menú de navegación'
      : 'Abrir menú de navegación'
    : sidebarExpanded
      ? 'Ocultar menú de navegación'
      : 'Mostrar menú de navegación'

  root.innerHTML = `
    <button
      class="icon-btn topbar__menu"
      type="button"
      data-action="toggle-sidebar"
      aria-label="${sidebarLabel}"
      aria-expanded="${sidebarExpanded}"
      aria-controls="sidebar"
      data-tooltip="${sidebarExpanded ? 'Ocultar el menú' : 'Mostrar el menú'}"
    >
      <svg class="icon" aria-hidden="true"><use href="#icon-menu"></use></svg>
    </button>

    <div class="topbar__heading">
      <p class="eyebrow">${getFolderEyebrow(state.activeFolder)}
      <h1 class="topbar__title">${escapeHtml(getFolderTitle(state.activeFolder))}</h1>
    </div>

    <div class="topbar__actions">
      <label class="search">
        <svg class="icon" aria-hidden="true"><use href="#icon-search"></use></svg>
        <span class="visually-hidden">Buscar imágenes por título</span>
        <input
          type="search"
          data-search
          data-focus-key="search"
          placeholder="Buscar por título…"
          autocomplete="off"
          value="${escapeHtml(state.filters.query)}"
        />
      </label>

      <button
        class="btn btn--primary"
        type="button"
        data-action="open-upload"
        data-focus-key="upload"
        data-tooltip="Añadir imágenes a la biblioteca"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-plus"></use></svg>
        Añadir imágenes
      </button>

      <button
        class="icon-btn"
        type="button"
        data-action="toggle-inspector"
        aria-label="${inspectorExpanded ? 'Ocultar ficha técnica' : 'Mostrar ficha técnica'}"
        aria-expanded="${inspectorExpanded}"
        aria-controls="inspector"
        data-focus-key="inspector-toggle"
        data-tooltip="${inspectorExpanded ? 'Ocultar ficha técnica' : 'Mostrar ficha técnica'}"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-info"></use></svg>
      </button>
    </div>
  `
}
