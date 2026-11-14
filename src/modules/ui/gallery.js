import { getFolderTitle, getState, getVisibleImages } from '../store.js'
import { escapeHtml, formatBytes } from '../utils.js'

function paletteSpine(image) {
  const palette =
    Array.isArray(image.palette) && image.palette.length > 0
      ? image.palette
      : ['#d7d3ca', '#d7d3ca', '#d7d3ca', '#d7d3ca', '#d7d3ca', '#d7d3ca']

  return palette
    .map((hex) => `<span style="--swatch: ${escapeHtml(hex)}"></span>`)
    .join('')
}

function cardTemplate(image, index, state) {
  const selected = state.selectedIds.includes(image.id)
  const active = state.activeImageId === image.id
  const favorite = Boolean(image.favorite)
  const title = escapeHtml(image.title)
  const format = escapeHtml(image.format)
  const formatTitle =
    image.format === 'RAW' ? 'RAW · vista previa JPG' : image.format
  const isList = state.view.layout === 'list'
  const folderName = escapeHtml(getFolderTitle(image.folderId))
  const tags = (image.tags ?? [])
    .map((tag) => `<li>${escapeHtml(tag)}</li>`)
    .join('')

  const description = image.description
    ? `<p class="card__desc">${escapeHtml(image.description)}</p>`
    : ''

  const facts = isList
    ? `
      <dl class="card__facts">
        <div>
          <dt>Formato</dt>
          <dd>${format}${image.format === 'RAW' ? ' · proxy JPG' : ''}</dd>
        </div>
        <div class="card__fact--dimensions">
          <dt>Dimensiones</dt>
          <dd>${image.width} × ${image.height} px</dd>
        </div>
        <div class="card__fact--size">
          <dt>Peso</dt>
          <dd>${formatBytes(image.bytes)}</dd>
        </div>
        <div>
          <dt>Carpeta</dt>
          <dd>${folderName}</dd>
        </div>
        ${
          tags
            ? `
              <div class="card__fact--tags">
                <dt>Etiquetas</dt>
                <dd><ul class="card__tags">${tags}</ul></dd>
              </div>
            `
            : ''
        }
      </dl>
    `
    : ''

  return `
    <article
      class="card${isList ? ' card--list' : ''}${selected ? ' is-selected' : ''}${active ? ' is-active' : ''}"
      data-card-id="${escapeHtml(image.id)}"
      draggable="true"
      style="--i: ${index}"
    >
      <div class="card__media">
        <button
          class="card__open"
          type="button"
          data-action="open-image"
          data-id="${escapeHtml(image.id)}"
          data-focus-key="open-${escapeHtml(image.id)}"
          aria-label="Abrir ${title} en el visor"
          data-tooltip="Abrir en grande"
          draggable="true"
        >
          <img
            class="card__img"
            src="${escapeHtml(image.src)}"
            alt="${title}"
            loading="lazy"
            decoding="async"
          />
          <span class="card__zoom" aria-hidden="true">
            <svg class="icon"><use href="#icon-arrow-up-right"></use></svg>
          </span>
        </button>

        <div class="card__palette" aria-hidden="true">${paletteSpine(image)}</div>

        <label class="card__select">
          <input
            type="checkbox"
            data-select="${escapeHtml(image.id)}"
            data-focus-key="select-${escapeHtml(image.id)}"
            ${selected ? 'checked' : ''}
            aria-label="Seleccionar ${title}"
          />
          <span class="card__check">
            <svg class="icon" aria-hidden="true"><use href="#icon-check"></use></svg>
          </span>
        </label>

        <button
          class="card__fav${favorite ? ' is-fav' : ''}"
          type="button"
          data-action="favorite"
          data-id="${escapeHtml(image.id)}"
          data-focus-key="fav-${escapeHtml(image.id)}"
          aria-pressed="${favorite}"
          aria-label="${favorite ? `Quitar ${title} de favoritos` : `Añadir ${title} a favoritos`}"
          data-tooltip="${
            favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'
          }"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-heart"></use></svg>
        </button>

        <button
          class="card__rename"
          type="button"
          data-action="rename-image"
          data-id="${escapeHtml(image.id)}"
          data-focus-key="rename-${escapeHtml(image.id)}"
          aria-label="Cambiar el nombre de ${title}"
          data-tooltip="Cambiar nombre"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-pencil"></use></svg>
        </button>

        <button
          class="card__delete"
          type="button"
          data-action="delete-image"
          data-id="${escapeHtml(image.id)}"
          data-focus-key="delete-${escapeHtml(image.id)}"
          aria-label="Eliminar ${title}"
          data-tooltip="Eliminar imagen"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-trash"></use></svg>
        </button>

        <span class="format-badge" data-format="${format}" title="${formatTitle}">
          ${format}
        </span>
      </div>

      <div class="card__meta">
        <div class="card__heading">
          <h3 class="card__title" title="${title}">${title}</h3>
          <span class="card__spec">
            <span class="card__spec-dims">${image.width}×${image.height}</span>
            <span class="card__spec-sep" aria-hidden="true"> · </span>
            <span class="card__spec-size">${formatBytes(image.bytes)}</span>
          </span>
        </div>
        ${description}
        ${facts}
      </div>
    </article>
  `
}

function emptyTemplate(state, hasFilters) {
  if (state.images.length === 0) {
    return `
      <div class="gallery-empty">
        <span class="gallery-empty__icon" aria-hidden="true">
          <svg class="icon"><use href="#icon-image"></use></svg>
        </span>
        <h2>Tu biblioteca está vacía</h2>
        <p>Añade tu primera imagen para empezar a organizar la colección.</p>
        <button
          class="btn btn--primary"
          type="button"
          data-action="open-upload"
          data-tooltip="Elegir imágenes del equipo"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-plus"></use></svg>
          Añadir imágenes
        </button>
      </div>
    `
  }

  if (hasFilters) {
    return `
      <div class="gallery-empty">
        <span class="gallery-empty__icon" aria-hidden="true">
          <svg class="icon"><use href="#icon-search"></use></svg>
        </span>
        <h2>Nada por aquí</h2>
        <p>No hay imágenes que coincidan con los filtros activos. Prueba con otro color, formato, etiqueta o búsqueda.</p>
        <button
          class="btn btn--ghost"
          type="button"
          data-action="clear-filters"
          data-tooltip="Quitar todos los filtros activos"
        >
          Limpiar filtros
        </button>
      </div>
    `
  }

  return `
    <div class="gallery-empty">
      <span class="gallery-empty__icon" aria-hidden="true">
        <svg class="icon"><use href="#icon-folder"></use></svg>
      </span>
      <h2>Esta carpeta está vacía</h2>
      <p>Mueve imágenes desde otra carpeta o añade nuevas piezas a la colección.</p>
      <button
        class="btn btn--primary"
        type="button"
        data-action="open-upload"
        data-tooltip="Elegir imágenes del equipo"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-plus"></use></svg>
        Añadir imágenes
      </button>
    </div>
  `
}

export function renderGallery(root, options = {}) {
  const state = getState()
  const visible = getVisibleImages(state)
  const hasFilters =
    state.filters.query.trim() !== '' ||
    state.filters.colors.length > 0 ||
    state.filters.formats.length > 0 ||
    state.filters.tags.length > 0

  if (visible.length === 0) {
    root.innerHTML = `
      <section class="gallery-wrap" aria-label="Imágenes de la colección">
        ${emptyTemplate(state, hasFilters)}
      </section>
    `
    return
  }

  const cards = visible
    .map((image, index) => cardTemplate(image, index, state))
    .join('')

  const { layout, columns, gap, showMeta } = state.view

  root.innerHTML = `
    <section class="gallery-wrap" aria-label="Imágenes de la colección">
      <h2 class="visually-hidden">Imágenes de la colección</h2>
      <div
        class="gallery${layout === 'list' ? ' is-list' : ''}${showMeta ? '' : ' is-meta-hidden'}${options.animate ? ' is-entering' : ''}"
        id="gallery"
        style="--cols: ${columns}; --gap: ${gap}px"
      >
        ${cards}
      </div>
    </section>
  `

  if (options.animate) {
    window.setTimeout(() => {
      document.getElementById('gallery')?.classList.remove('is-entering')
    }, 1100)
  }
}

export function updateGalleryLayout() {
  const state = getState()
  const gallery = document.getElementById('gallery')
  if (!gallery) return

  const { layout, columns, gap, showMeta } = state.view
  gallery.style.setProperty('--cols', String(columns))
  gallery.style.setProperty('--gap', `${gap}px`)
  gallery.classList.toggle('is-list', layout === 'list')
  gallery.classList.toggle('is-meta-hidden', !showMeta)
}

export function updateSelectionUI() {
  const state = getState()

  document.querySelectorAll('[data-card-id]').forEach((card) => {
    const selected = state.selectedIds.includes(card.dataset.cardId)
    const checkbox = card.querySelector('input[data-select]')

    card.classList.toggle('is-selected', selected)
    if (checkbox) checkbox.checked = selected
  })
}

export function updateActiveUI() {
  const state = getState()

  document.querySelectorAll('[data-card-id]').forEach((card) => {
    card.classList.toggle('is-active', card.dataset.cardId === state.activeImageId)
  })
}

export function updatePaletteUI() {
  const state = getState()

  document.querySelectorAll('[data-card-id]').forEach((card) => {
    const image = state.images.find((entry) => entry.id === card.dataset.cardId)
    const spine = card.querySelector('.card__palette')
    if (!image?.palette || !spine) return

    spine.innerHTML = image.palette
      .map((hex) => `<span style="--swatch: ${escapeHtml(hex)}"></span>`)
      .join('')
  })
}

export function updateFavoriteUI(id) {
  const state = getState()
  const image = state.images.find((entry) => entry.id === id)
  if (!image) return

  const button = document.querySelector(
    `[data-card-id="${CSS.escape(id)}"] [data-action="favorite"]`
  )
  if (!button) return

  button.classList.toggle('is-fav', Boolean(image.favorite))
  button.setAttribute('aria-pressed', String(Boolean(image.favorite)))
  button.setAttribute(
    'aria-label',
    image.favorite
      ? `Quitar ${image.title} de favoritos`
      : `Añadir ${image.title} a favoritos`
  )
}
