import { getState, getVisibleImages } from '../store.js'
import { formatNumber } from '../utils.js'

function layoutLabelFor(state) {
  return state.view.layout === 'list'
    ? 'Lista'
    : `Cuadrícula ${state.view.columns} × ${state.view.columns}`
}

export function renderToolbar(root) {
  const state = getState()
  const visible = getVisibleImages(state)
  const filtersActive =
    state.filters.colors.length > 0 ||
    state.filters.formats.length > 0 ||
    state.filters.tags.length > 0 ||
    state.filters.query.trim() !== ''

  const allSelected =
    visible.length > 0 &&
    visible.every((image) => state.selectedIds.includes(image.id))

  const { layout, columns, gap } = state.view
  const isList = layout === 'list'

  root.innerHTML = `
    <div class="toolbar__group toolbar__group--view">
      <span class="toolbar__label">Vista</span>
      <div class="toolbar__view">
        <div class="segmented segmented--icons" role="group" aria-label="Modo de vista">
          <button
            class="segmented__item${isList ? '' : ' is-active'}"
            type="button"
            data-action="view-layout"
            data-layout="grid"
            data-focus-key="layout-grid"
            aria-pressed="${!isList}"
            data-tooltip="Ver en cuadrícula"
          >
            <svg class="icon" aria-hidden="true"><use href="#icon-grid"></use></svg>
            <span class="visually-hidden">Cuadrícula</span>
          </button>
          <button
            class="segmented__item${isList ? ' is-active' : ''}"
            type="button"
            data-action="view-layout"
            data-layout="list"
            data-focus-key="layout-list"
            aria-pressed="${isList}"
            data-tooltip="Ver en lista"
          >
            <svg class="icon" aria-hidden="true"><use href="#icon-list"></use></svg>
            <span class="visually-hidden">Lista</span>
          </button>
        </div>

        <label class="toolbar__range">
          <span>Columnas</span>
          <input
            id="toolbar-columns"
            type="range"
            min="3"
            max="8"
            step="1"
            value="${columns}"
            data-view-columns
            data-focus-key="toolbar-columns"
          />
          <output for="toolbar-columns" data-output="columns">${columns} × ${columns}</output>
        </label>

        <label class="toolbar__range">
          <span>Separación</span>
          <input
            id="toolbar-gap"
            type="range"
            min="6"
            max="20"
            step="2"
            value="${gap}"
            data-view-gap
            data-focus-key="toolbar-gap"
          />
          <output for="toolbar-gap" data-output="gap">${gap} px</output>
        </label>
      </div>
    </div>

    <div class="toolbar__group toolbar__group--display">
      <span class="toolbar__label">Datos de las imágenes</span>
      <div class="toolbar__checks">
        <label class="toolbar__check">
          <input
            type="checkbox"
            data-view-meta
            data-focus-key="toolbar-view-meta"
            ${state.view.showMeta ? 'checked' : ''}
          />
          Mostrar nombre y datos
        </label>
      </div>
    </div>

    <div class="toolbar__end">
      <span class="toolbar__count">${formatNumber(visible.length)} de ${formatNumber(state.images.length)}</span>
      <button
        class="text-btn"
        type="button"
        data-action="select-all"
        data-focus-key="select-all"
        data-tooltip="${
          allSelected
            ? 'Deseleccionar todas las imágenes visibles'
            : 'Seleccionar todas las imágenes visibles'
        }"
        ${visible.length === 0 ? 'disabled' : ''}
      >
        ${allSelected ? 'Quitar selección' : 'Seleccionar todo'}
      </button>
      <button
        class="text-btn"
        type="button"
        data-action="clear-filters"
        data-focus-key="clear-filters"
        data-tooltip="Quitar todos los filtros activos"
        ${filtersActive ? '' : 'disabled'}
      >
        Limpiar filtros
      </button>
      <button
        class="text-btn text-btn--danger"
        type="button"
        data-action="delete-all-images"
        data-focus-key="delete-all-images"
        aria-label="Eliminar todas las imágenes de la biblioteca"
        data-tooltip="Eliminar todas las imágenes"
        ${state.images.length === 0 ? 'disabled' : ''}
      >
        Eliminar todas
      </button>

      <label class="sort toolbar__sort">
        <svg class="icon" aria-hidden="true"><use href="#icon-sort"></use></svg>
        <span class="visually-hidden">Ordenar imágenes</span>
        <select data-sort-select data-focus-key="sort">
          <option value="recent" ${state.sort === 'recent' ? 'selected' : ''}>Más recientes</option>
          <option value="name" ${state.sort === 'name' ? 'selected' : ''}>Nombre A–Z</option>
          <option value="size" ${state.sort === 'size' ? 'selected' : ''}>Peso mayor</option>
          <option value="manual" ${state.sort === 'manual' ? 'selected' : ''}>Orden manual</option>
        </select>
      </label>
    </div>
  `
}

export function updateToolbarView() {
  const state = getState()
  const { layout, columns, gap } = state.view
  const isList = layout === 'list'

  const layoutLabel = document.querySelector('[data-toolbar-layout-label]')
  if (layoutLabel) layoutLabel.textContent = layoutLabelFor(state)

  const gapLabel = document.querySelector('[data-toolbar-gap-label]')
  if (gapLabel) gapLabel.textContent = `Separación ${gap} px`

  const summaryIcon = document.querySelector('.toolbar__summary use')
  summaryIcon?.setAttribute('href', isList ? '#icon-list' : '#icon-grid')

  document.querySelectorAll('[data-action="view-layout"]').forEach((button) => {
    const active = button.dataset.layout === layout
    button.classList.toggle('is-active', active)
    button.setAttribute('aria-pressed', String(active))
  })

  document.querySelectorAll('[data-view-layout]').forEach((select) => {
    if (select.value !== layout) select.value = layout
  })

  document.querySelectorAll('[data-view-columns]').forEach((input) => {
    if (input.value !== String(columns)) input.value = String(columns)
  })

  document.querySelectorAll('[data-view-gap]').forEach((input) => {
    if (input.value !== String(gap)) input.value = String(gap)
  })

  document.querySelectorAll('[data-view-meta]').forEach((input) => {
    if (input.checked !== state.view.showMeta) input.checked = state.view.showMeta
  })

  document.querySelectorAll('[data-output="columns"]').forEach((output) => {
    output.textContent = `${columns} × ${columns}`
  })

  document.querySelectorAll('[data-output="gap"]').forEach((output) => {
    output.textContent = `${gap} px`
  })
}
