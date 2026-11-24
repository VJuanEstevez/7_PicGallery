import { getState, getVisibleImages } from "../store.js";
import { formatNumber } from "../utils.js";

export function renderToolbar(root) {
  const state = getState();
  const visible = getVisibleImages(state);
  const filtersActive = state.filters.tags.length > 0 || state.filters.query.trim() !== "";

  const allSelected =
    visible.length > 0 && visible.every((image) => state.selectedIds.includes(image.id));

  const { layout, columns, gap } = state.view;
  const isList = layout === "list";
  const hasImages = state.images.length > 0;

  const selectAllTooltip = allSelected
    ? "Deseleccionar todas las imágenes visibles"
    : "Seleccionar todas las imágenes visibles";

  root.innerHTML = `
    <div class="toolbar__zone toolbar__zone--view">
      <div class="toolbar__controls">
        <div class="segmented segmented--icons" role="group" aria-label="Modo de vista">
          <button
            class="segmented__item${isList ? "" : " is-active"}"
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
            class="segmented__item${isList ? " is-active" : ""}"
            type="button"
            data-action="view-layout"
            data-layout="list"
            data-focus-key="layout-list"
            aria-pressed="${isList}"
            data-tooltip="Ver en lista"
          >
            <svg class="icon" aria-hidden="true"><use href="#icon-list"></use></svg>
          </button>
        </div>
      </div>
    </div>

    <div class="toolbar__zone toolbar__zone--end">
      <div class="toolbar__controls toolbar__controls--end">
        <span class="toolbar__count">
          <span class="visually-hidden">Imágenes visibles: </span>${formatNumber(visible.length)} de ${formatNumber(state.images.length)}
        </span>

        <label class="sort toolbar__sort">
          <svg class="icon" aria-hidden="true"><use href="#icon-sort"></use></svg>
          <span class="visually-hidden">Ordenar imágenes</span>
          <select data-sort-select data-focus-key="sort">
            <option value="recent" ${state.sort === "recent" ? "selected" : ""}>Más recientes</option>
            <option value="name" ${state.sort === "name" ? "selected" : ""}>Nombre A–Z</option>
            <option value="size" ${state.sort === "size" ? "selected" : ""}>Peso mayor</option>
            <option value="manual" ${state.sort === "manual" ? "selected" : ""}>Orden manual</option>
          </select>
        </label>
      </div>
    </div>
  `;
}

export function updateToolbarView() {
  const state = getState();
  const { layout, columns, gap } = state.view;

  document.querySelectorAll('[data-action="view-layout"]').forEach((button) => {
    const active = button.dataset.layout === layout;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  document.querySelectorAll("[data-view-columns]").forEach((input) => {
    if (input.value !== String(columns)) input.value = String(columns);
  });

  document.querySelectorAll("[data-view-gap]").forEach((input) => {
    if (input.value !== String(gap)) input.value = String(gap);
  });

  document.querySelectorAll("[data-view-meta]").forEach((input) => {
    if (input.checked !== state.view.showMeta) input.checked = state.view.showMeta;
  });

  document.querySelectorAll('[data-output="columns"]').forEach((output) => {
    output.textContent = `${columns} × ${columns}`;
  });

  document.querySelectorAll('[data-output="gap"]').forEach((output) => {
    output.textContent = `${gap} px`;
  });
}
