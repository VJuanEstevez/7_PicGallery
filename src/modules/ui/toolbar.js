import { getCounts, getState, getVisibleImages } from '../store.js'
import { formatNumber } from '../utils.js'

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

export function renderToolbar(root) {
  const state = getState()
  const visible = getVisibleImages(state)
  const counts = getCounts(state)
  const colorsActive = state.filters.colors.length > 0
  const filtersActive =
    colorsActive ||
    state.filters.formats.length > 0 ||
    state.filters.query.trim() !== ''

  const colorChips = COLOR_FILTERS.map(
    (filter) => `
      <button
        class="chip${state.filters.colors.includes(filter.id) ? ' is-active' : ''}"
        type="button"
        data-action="toggle-color"
        data-color="${filter.id}"
        data-focus-key="color-${filter.id}"
        aria-pressed="${state.filters.colors.includes(filter.id)}"
      >
        <span class="chip__dot" style="--dot: ${filter.color}" aria-hidden="true"></span>
        ${filter.label}
      </button>
    `
  ).join('')

  const formatButtons = FORMATS.map((format) => {
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
  }).join('')

  const allSelected =
    visible.length > 0 &&
    visible.every((image) => state.selectedIds.includes(image.id))

  root.innerHTML = `
    <div class="toolbar__group">
      <span class="toolbar__label">Color</span>
      <div class="chips" role="group" aria-label="Filtrar por color dominante">
        <button
          class="chip${colorsActive ? '' : ' is-active'}"
          type="button"
          data-action="toggle-color"
          data-color="all"
          data-focus-key="color-all"
          aria-pressed="${!colorsActive}"
        >
          <span class="chip__dot chip__dot--all" aria-hidden="true"></span>
          Todos
        </button>
        ${colorChips}
      </div>
    </div>

    <div class="toolbar__group">
      <span class="toolbar__label">Formato</span>
      <div class="segmented" role="group" aria-label="Filtrar por formato de archivo">
        ${formatButtons}
      </div>
    </div>

    <div class="toolbar__end">
      <span class="toolbar__count">${formatNumber(visible.length)} de ${formatNumber(state.images.length)}</span>
      <button
        class="text-btn"
        type="button"
        data-action="select-all"
        data-focus-key="select-all"
        ${visible.length === 0 ? 'disabled' : ''}
      >
        ${allSelected ? 'Quitar selección' : 'Seleccionar todo'}
      </button>
      <button
        class="text-btn"
        type="button"
        data-action="clear-filters"
        data-focus-key="clear-filters"
        ${filtersActive ? '' : 'disabled'}
      >
        Limpiar filtros
      </button>
    </div>
  `
}
