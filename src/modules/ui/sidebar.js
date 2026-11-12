import { getCounts, getFormatBreakdown, getState, getTotalBytes } from '../store.js'
import { escapeHtml, formatBytes, formatNumber } from '../utils.js'

const FORMAT_COLORS = {
  JPG: 'var(--format-jpg)',
  PNG: 'var(--format-png)',
  WEBP: 'var(--format-webp)',
  RAW: 'var(--format-raw)'
}

function navItem(state, id, label, icon, count) {
  const active = state.activeFolder === id

  return `
    <button
      class="nav-item${active ? ' is-active' : ''}"
      type="button"
      data-action="folder"
      data-folder="${id}"
      data-focus-key="folder-${id}"
      ${active ? 'aria-current="page"' : ''}
    >
      <svg class="icon" aria-hidden="true"><use href="#icon-${icon}"></use></svg>
      <span class="nav-item__text">${label}</span>
      <span class="nav-item__count mono">${formatNumber(count)}</span>
    </button>
  `
}

function folderItem(state, folder, count) {
  const active = state.activeFolder === folder.id

  return `
    <button
      class="folder-item${active ? ' is-active' : ''}"
      type="button"
      data-action="folder"
      data-folder="${escapeHtml(folder.id)}"
      data-drop-folder="${escapeHtml(folder.id)}"
      data-focus-key="folder-${escapeHtml(folder.id)}"
      style="--dot: ${escapeHtml(folder.color)}"
      ${active ? 'aria-current="page"' : ''}
    >
      <span class="folder-item__dot" aria-hidden="true"></span>
      <span class="folder-item__name">${escapeHtml(folder.name)}</span>
      <span class="folder-item__count mono">${formatNumber(count)}</span>
    </button>
  `
}

export function renderSidebar(root) {
  const state = getState()
  const counts = getCounts(state)
  const totalBytes = getTotalBytes(state.images)
  const breakdown = getFormatBreakdown(state.images)
  const total = counts.total || 1

  const formatBar = breakdown
    .filter((entry) => entry.count > 0)
    .map(
      (entry) => `
        <span
          style="--mix-color: ${FORMAT_COLORS[entry.format]}; flex: ${entry.count}"
          title="${entry.format}: ${formatNumber(entry.count)}"
        ></span>
      `
    )
    .join('')

  const formatLegend = breakdown
    .map(
      (entry) => `
        <li style="--mix-color: ${FORMAT_COLORS[entry.format]}">
          <i aria-hidden="true"></i>
          <span>${entry.format}</span>
          <span class="mono">${formatNumber(entry.count)}</span>
        </li>
      `
    )
    .join('')

  const folders = state.folders
    .map((folder) => folderItem(state, folder, counts.folders[folder.id] ?? 0))
    .join('')

  root.innerHTML = `
    <div class="brand">
      <span class="brand__mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
      <span class="brand__text">
        <strong>PicGallery</strong>
        <small>Archivo visual</small>
      </span>
    </div>

    <nav class="sidebar__nav" aria-label="Biblioteca">
      <p class="sidebar__label">Biblioteca</p>
      ${navItem(state, 'all', 'Todas las imágenes', 'grid', counts.total)}
      ${navItem(state, 'favorites', 'Favoritos', 'star', counts.favorites)}
      ${navItem(state, 'recent', 'Recientes', 'clock', counts.recent)}
    </nav>

    <div class="sidebar__section">
      <div class="sidebar__section-head">
        <p class="sidebar__label">Carpetas</p>
        <button
          class="icon-btn icon-btn--dark"
          type="button"
          data-action="new-folder"
          aria-label="Crear carpeta"
          title="Crear carpeta"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-plus"></use></svg>
        </button>
      </div>
      <div class="sidebar__folders">${folders}</div>
    </div>

    <div class="sidebar__foot">
      <div class="format-mix">
        <div class="format-mix__head">
          <span class="sidebar__label">Composición</span>
          <span class="mono">${formatNumber(counts.total)}</span>
        </div>
        <div
          class="format-mix__bar"
          role="img"
          aria-label="Distribución de formatos de la biblioteca"
        >${formatBar}</div>
        <ul class="format-mix__legend">${formatLegend}</ul>
      </div>
      <p class="sidebar__stamp">
        ${formatNumber(counts.total)} imágenes · ${formatBytes(totalBytes)}<br />
        Archivo local · v1.0
      </p>
    </div>
  `
}
