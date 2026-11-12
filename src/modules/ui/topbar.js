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
    state.filters.colors.length > 0 ||
    state.filters.formats.length > 0

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

  root.innerHTML = `
    <button
      class="icon-btn topbar__menu"
      type="button"
      data-action="toggle-sidebar"
      aria-label="${state.sidebarOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}"
      aria-expanded="${state.sidebarOpen}"
      aria-controls="sidebar"
    >
      <svg class="icon" aria-hidden="true"><use href="#icon-menu"></use></svg>
    </button>

    <div class="topbar__heading">
      <p class="eyebrow">${getFolderEyebrow(state.activeFolder)} <span>/ Archivo</span></p>
      <h1 class="topbar__title">${escapeHtml(getFolderTitle(state.activeFolder))}</h1>
      <p class="topbar__sub">${subtitle}</p>
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

      <label class="sort">
        <svg class="icon" aria-hidden="true"><use href="#icon-sort"></use></svg>
        <span class="visually-hidden">Ordenar imágenes</span>
        <select data-sort-select data-focus-key="sort">
          <option value="recent" ${state.sort === 'recent' ? 'selected' : ''}>Más recientes</option>
          <option value="name" ${state.sort === 'name' ? 'selected' : ''}>Nombre A–Z</option>
          <option value="size" ${state.sort === 'size' ? 'selected' : ''}>Peso mayor</option>
          <option value="manual" ${state.sort === 'manual' ? 'selected' : ''}>Orden manual</option>
        </select>
      </label>

      <button class="btn btn--ghost" type="button" data-action="open-export" data-focus-key="export">
        <svg class="icon" aria-hidden="true"><use href="#icon-layout"></use></svg>
        <span class="btn__label">Exportar</span>
      </button>

      <button class="btn btn--primary" type="button" data-action="open-upload" data-focus-key="upload">
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
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-info"></use></svg>
      </button>
    </div>
  `
}
