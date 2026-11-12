import { getSelectedImages, getState, getTotalBytes } from '../store.js'
import { formatBytes, formatNumber } from '../utils.js'

export function renderBulkBar(root) {
  const state = getState()
  const selected = getSelectedImages(state)

  if (selected.length === 0) {
    root.innerHTML = ''
    return
  }

  const allFavorite = selected.every((image) => image.favorite)
  const label = `${formatNumber(selected.length)} ${selected.length === 1 ? 'seleccionada' : 'seleccionadas'}`

  root.innerHTML = `
    <section class="bulk" aria-label="Acciones de selección">
      <span class="bulk__count">${label} · ${formatBytes(getTotalBytes(selected))}</span>
      <span class="bulk__divider" aria-hidden="true"></span>
      <button class="bulk__btn bulk__btn--primary" type="button" data-action="bulk-move" data-focus-key="bulk-move">
        <svg class="icon" aria-hidden="true"><use href="#icon-move"></use></svg>
        Mover a…
      </button>
      <button class="bulk__btn" type="button" data-action="bulk-favorite" data-focus-key="bulk-favorite">
        <svg class="icon" aria-hidden="true"><use href="#icon-heart"></use></svg>
        ${allFavorite ? 'Quitar favorito' : 'Favorito'}
      </button>
      <button class="bulk__btn" type="button" data-action="bulk-clear" data-focus-key="bulk-clear">
        <svg class="icon" aria-hidden="true"><use href="#icon-close"></use></svg>
        Quitar selección
      </button>
    </section>
  `
}
