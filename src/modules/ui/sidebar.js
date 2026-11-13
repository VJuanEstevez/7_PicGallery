import {
  getCounts,
  getFormatBreakdown,
  getState,
  getTags,
  getTotalBytes
} from '../store.js'
import { escapeHtml, formatBytes, formatNumber } from '../utils.js'

const FORMAT_COLORS = {
  JPG: 'var(--format-jpg)',
  PNG: 'var(--format-png)',
  WEBP: 'var(--format-webp)',
  RAW: 'var(--format-raw)'
}

const COLOR_FILTERS = [
  { id: 'red', label: 'Rojos', color: '#d93a2b' },
  { id: 'orange', label: 'Naranjas', color: '#e87722' },
  { id: 'yellow', label: 'Amarillos', color: '#e8b923' },
  { id: 'green', label: 'Verdes', color: '#3e7c4a' },
  { id: 'cyan', label: 'Cian', color: '#2b9c9c' },
  { id: 'blue', label: 'Azules', color: '#2a4bd7' },
  { id: 'purple', label: 'Morados', color: '#7a4b9e' },
  { id: 'neutral', label: 'Neutros', color: '#8c8a85' }
]

const FORMATS = ['JPG', 'PNG', 'WEBP', 'RAW']

const sectionState = {
  library: true,
  folders: true,
  filters: true,
  view: false,
  tags: false,
  stats: false
}

const sectionTouched = new Set()

function summaryTemplate(icon, label, extra = '') {
  return `
    <svg class="icon" aria-hidden="true"><use href="#icon-${icon}"></use></svg>
    <span class="sidebar__summary-label">${label}</span>
    ${extra}
    <svg class="sidebar__chevron icon" aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
  `
}

function openAttribute(id) {
  return sectionState[id] ? 'open' : ''
}

function captureSectionState(root) {
  root.querySelectorAll('[data-section]').forEach((details) => {
    sectionState[details.dataset.section] = details.open
  })
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
  const name = escapeHtml(folder.name)
  const deletable = folder.id !== 'inbox'

  return `
    <div class="folder-row">
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
        <span class="folder-item__name">${name}</span>
        <span class="folder-item__count mono">${formatNumber(count)}</span>
      </button>
      ${
        deletable
          ? `
            <button
              class="folder-delete"
              type="button"
              data-action="delete-folder"
              data-folder="${escapeHtml(folder.id)}"
              data-focus-key="delete-folder-${escapeHtml(folder.id)}"
              aria-label="Eliminar la carpeta ${name}"
              title="Eliminar carpeta"
            >
              <svg class="icon" aria-hidden="true"><use href="#icon-trash"></use></svg>
            </button>
          `
          : ''
      }
    </div>
  `
}

function colorFilterTemplate(state) {
  const active = state.filters.colors
  const chips = COLOR_FILTERS.map(
    (filter) => `
      <button
        class="chip${active.includes(filter.id) ? ' is-active' : ''}"
        type="button"
        data-action="toggle-color"
        data-color="${filter.id}"
        data-focus-key="color-${filter.id}"
        aria-pressed="${active.includes(filter.id)}"
      >
        <span class="chip__dot" style="--dot: ${filter.color}" aria-hidden="true"></span>
        ${filter.label}
      </button>
    `
  ).join('')

  return `
    <div class="chips chips--dark" role="group" aria-label="Filtrar por color dominante">
      <button
        class="chip${active.length === 0 ? ' is-active' : ''}"
        type="button"
        data-action="toggle-color"
        data-color="all"
        data-focus-key="color-all"
        aria-pressed="${active.length === 0}"
      >
        <span class="chip__dot chip__dot--all" aria-hidden="true"></span>
        Todos
      </button>
      ${chips}
    </div>
  `
}

function formatFilterTemplate(state, counts) {
  return `
    <div class="segmented segmented--dark" role="group" aria-label="Filtrar por formato de archivo">
      ${FORMATS.map((format) => {
        const active = state.filters.formats.includes(format)
        return `
          <button
            class="segmented__item${active ? ' is-active' : ''}"
            type="button"
            data-action="toggle-format"
            data-format="${format}"
            data-focus-key="format-${format}"
            aria-pressed="${active}"
          >
            ${format} <span class="mono">${formatNumber(counts.formats[format] ?? 0)}</span>
          </button>
        `
      }).join('')}
    </div>
  `
}

function tagsTemplate(state) {
  const tags = getTags(state.images)
  if (tags.length === 0) return ''

  const active = state.filters.tags
  const open = sectionTouched.has('tags')
    ? sectionState.tags
    : sectionState.tags || active.length > 0

  return `
    <details class="sidebar__section sidebar__section--nested" data-section="tags" ${open ? 'open' : ''}>
      <summary class="sidebar__summary sidebar__summary--nested">
        ${summaryTemplate(
          'tag',
          'Etiquetas',
          `<span class="sidebar__summary-count mono">${formatNumber(tags.length)}</span>`
        )}
      </summary>
      <div class="sidebar__section-body">
        <div class="tag-list" role="group" aria-label="Filtrar por etiquetas">
          ${tags
            .map(
              ({ tag, count }) => `
                <button
                  class="tag${active.includes(tag) ? ' is-active' : ''}"
                  type="button"
                  data-action="toggle-tag"
                  data-tag="${escapeHtml(tag)}"
                  data-focus-key="tag-${escapeHtml(tag)}"
                  aria-pressed="${active.includes(tag)}"
                >
                  ${escapeHtml(tag)}
                  <span class="mono">${formatNumber(count)}</span>
                </button>
              `
            )
            .join('')}
        </div>
      </div>
    </details>
  `
}

function viewTemplate(state) {
  const { layout, columns, gap, showMeta } = state.view

  return `
    <details class="sidebar__section" data-section="view" ${openAttribute('view')}>
      <summary class="sidebar__summary">
        ${summaryTemplate('layout', 'Vista')}
      </summary>
      <div class="sidebar__section-body">
        <label class="sidebar__field">
          <span>Diseño</span>
          <select data-view-layout data-focus-key="view-layout">
            <option value="grid" ${layout === 'grid' ? 'selected' : ''}>Cuadrícula</option>
            <option value="list" ${layout === 'list' ? 'selected' : ''}>Lista</option>
          </select>
        </label>

        <div class="sidebar__range">
          <label for="view-columns">
            Columnas
            <output for="view-columns" data-output="columns">${columns} × ${columns}</output>
          </label>
          <input
            id="view-columns"
            type="range"
            min="3"
            max="8"
            step="1"
            value="${columns}"
            data-view-columns
            data-focus-key="view-columns"
          />
        </div>

        <div class="sidebar__range">
          <label for="view-gap">
            Separación
            <output for="view-gap" data-output="gap">${gap} px</output>
          </label>
          <input
            id="view-gap"
            type="range"
            min="0"
            max="48"
            step="2"
            value="${gap}"
            data-view-gap
            data-focus-key="view-gap"
          />
        </div>

        <label class="toggle-field toggle-field--dark">
          <input
            type="checkbox"
            data-view-meta
            data-focus-key="view-meta"
            ${showMeta ? 'checked' : ''}
          />
          Mostrar nombre y datos
        </label>
      </div>
    </details>
  `
}

export function renderSidebar(root) {
  captureSectionState(root)

  const state = getState()
  const counts = getCounts(state)
  const totalBytes = getTotalBytes(state.images)
  const breakdown = getFormatBreakdown(state.images)

  const filtersActive =
    state.filters.query.trim() !== '' ||
    state.filters.colors.length > 0 ||
    state.filters.formats.length > 0 ||
    state.filters.tags.length > 0

  const activeFilterCount =
    state.filters.colors.length +
    state.filters.formats.length +
    state.filters.tags.length

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
      </span>
      <button
        class="sidebar__close"
        type="button"
        data-action="close-sidebar"
        aria-label="Cerrar menú de navegación"
        title="Cerrar menú"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-close"></use></svg>
      </button>
    </div>

    <details class="sidebar__section" data-section="library" ${openAttribute('library')}>
      <summary class="sidebar__summary">
        ${summaryTemplate(
          'grid',
          'Biblioteca',
          `<span class="sidebar__summary-count mono">${formatNumber(counts.total)}</span>`
        )}
      </summary>
      <div class="sidebar__section-body">
        <nav class="sidebar__nav" aria-label="Biblioteca">
          ${navItem(state, 'all', 'Todas las imágenes', 'grid', counts.total)}
          ${navItem(state, 'favorites', 'Favoritos', 'star', counts.favorites)}
        </nav>
      </div>
    </details>

    <details class="sidebar__section" data-section="folders" ${openAttribute('folders')}>
      <summary class="sidebar__summary">
        ${summaryTemplate('folder', 'Carpetas')}
      </summary>
      <div class="sidebar__section-body">
        <div class="sidebar__section-head">
          <span class="sidebar__sublabel">Organización</span>
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
        ${tagsTemplate(state)}
      </div>
    </details>

    <details class="sidebar__section" data-section="filters" ${openAttribute('filters')}>
      <summary class="sidebar__summary">
        ${summaryTemplate(
          'sliders',
          'Filtros',
          activeFilterCount > 0
            ? `<span class="sidebar__summary-count mono">${formatNumber(activeFilterCount)}</span>`
            : ''
        )}
      </summary>
      <div class="sidebar__section-body">
        <div class="sidebar__section-head">
          <span class="sidebar__sublabel">Refinar</span>
          <button
            class="sidebar__reset"
            type="button"
            data-action="clear-filters"
            data-focus-key="sidebar-clear-filters"
            ${filtersActive ? '' : 'disabled'}
          >
            Limpiar
          </button>
        </div>
        <div class="sidebar__filter">
          <span class="sidebar__sublabel">Color</span>
          ${colorFilterTemplate(state)}
        </div>
        <div class="sidebar__filter">
          <span class="sidebar__sublabel">Formato</span>
          ${formatFilterTemplate(state, counts)}
        </div>
      </div>
    </details>

    ${viewTemplate(state)}

    <div class="sidebar__foot">
      <details class="sidebar__section sidebar__section--foot" data-section="stats" ${openAttribute('stats')}>
        <summary class="sidebar__summary">
          ${summaryTemplate('palette', 'Composición')}
        </summary>
        <div class="sidebar__section-body">
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
        </div>
      </details>

      <button
        class="sidebar__export"
        type="button"
        data-action="open-export"
        data-focus-key="sidebar-export"
        title="Exportar colección"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-download"></use></svg>
        <span>Exportar colección</span>
      </button>

      <p class="sidebar__stamp">
        ${formatNumber(counts.total)} imágenes · ${formatBytes(totalBytes)}
      </p>
    </div>
  `

  root.querySelectorAll('[data-section]').forEach((details) => {
    details.addEventListener('toggle', () => {
      sectionTouched.add(details.dataset.section)
      sectionState[details.dataset.section] = details.open
    })
  })
}
