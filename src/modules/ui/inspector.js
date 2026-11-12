import {
  getActiveImage,
  getFolder,
  getFolderTitle,
  getState
} from '../store.js'
import { escapeHtml, formatBytes, formatDate } from '../utils.js'

function paletteTemplate(image) {
  if (!Array.isArray(image.palette) || image.palette.length === 0) {
    return `<p class="palette__empty">Extrayendo la paleta de la imagen…</p>`
  }

  return `
    <div class="palette__grid">
      ${image.palette
        .map(
          (hex, index) => `
            <button
              class="swatch"
              type="button"
              data-action="copy-hex"
              data-hex="${escapeHtml(hex)}"
              data-focus-key="swatch-${escapeHtml(image.id)}-${index}"
              aria-label="Copiar el color ${escapeHtml(hex)}"
              title="Copiar ${escapeHtml(hex)}"
            >
              <span class="swatch__color" style="--hex: ${escapeHtml(hex)}"></span>
              <span class="swatch__hex">${escapeHtml(hex)}</span>
            </button>
          `
        )
        .join('')}
    </div>
  `
}

export function renderInspector(root) {
  const state = getState()
  const image = getActiveImage(state)

  if (!image) {
    root.innerHTML = `
      <div class="inspector__head">
        <span class="inspector__label">Ficha técnica</span>
        <button
          class="icon-btn icon-btn--bare"
          type="button"
          data-action="close-inspector"
          aria-label="Cerrar ficha técnica"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-close"></use></svg>
        </button>
      </div>
      <div class="inspector__empty">
        <svg class="icon" aria-hidden="true"><use href="#icon-image"></use></svg>
        <strong>Selecciona una imagen</strong>
        <p>Haz clic en una tarjeta para ver sus datos técnicos y su paleta de color.</p>
      </div>
    `
    return
  }

  const folder = getFolder(image.folderId)
  const folderName = getFolderTitle(image.folderId)
  const folderColor = folder?.color ?? '#8c8a85'
  const formatNote = image.format === 'RAW' ? 'Vista previa JPG' : ''
  const favorite = Boolean(image.favorite)
  const title = escapeHtml(image.title)

  const spine = (image.palette ?? ['#d7d3ca'])
    .map((hex) => `<span style="--swatch: ${escapeHtml(hex)}"></span>`)
    .join('')

  root.innerHTML = `
    <div class="inspector__head">
      <span class="inspector__label">Ficha técnica</span>
      <button
        class="icon-btn icon-btn--bare"
        type="button"
        data-action="close-inspector"
        aria-label="Cerrar ficha técnica"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-close"></use></svg>
      </button>
    </div>

    <div class="inspector__preview">
      <div class="inspector__spine" aria-hidden="true">${spine}</div>
      <button
        class="inspector__open"
        type="button"
        data-action="open-image"
        data-id="${escapeHtml(image.id)}"
        aria-label="Abrir ${title} en el visor"
      >
        <img src="${escapeHtml(image.src)}" alt="${title}" />
      </button>
      <span class="format-badge" data-format="${escapeHtml(image.format)}">
        ${escapeHtml(image.format)}
      </span>
      <button
        class="inspector__fav${favorite ? ' is-fav' : ''}"
        type="button"
        data-action="favorite"
        data-id="${escapeHtml(image.id)}"
        data-focus-key="inspector-fav"
        aria-pressed="${favorite}"
        aria-label="${favorite ? `Quitar ${title} de favoritos` : `Añadir ${title} a favoritos`}"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-heart"></use></svg>
      </button>
    </div>

    <h2 class="inspector__title">${title}</h2>
    <p class="inspector__folder">
      <i style="--dot: ${escapeHtml(folderColor)}" aria-hidden="true"></i>
      ${escapeHtml(folderName)}
    </p>

    <div class="inspector__actions">
      <button class="btn btn--dark btn--sm" type="button" data-action="open-image" data-id="${escapeHtml(image.id)}">
        <svg class="icon" aria-hidden="true"><use href="#icon-arrow-up-right"></use></svg>
        Ver en grande
      </button>
      <button class="btn btn--ghost btn--sm" type="button" data-action="open-move" data-id="${escapeHtml(image.id)}">
        <svg class="icon" aria-hidden="true"><use href="#icon-move"></use></svg>
        Mover
      </button>
      <button
        class="icon-btn icon-btn--bare"
        type="button"
        data-action="download"
        data-id="${escapeHtml(image.id)}"
        aria-label="Descargar ${title}"
        title="Descargar"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-download"></use></svg>
      </button>
    </div>

    <dl class="meta-list">
      <div class="meta-row">
        <dt>Dimensiones</dt>
        <dd>${image.width} × ${image.height} px</dd>
      </div>
      <div class="meta-row">
        <dt>Peso</dt>
        <dd>${formatBytes(image.bytes)}</dd>
      </div>
      <div class="meta-row">
        <dt>Formato</dt>
        <dd>${escapeHtml(image.format)}${formatNote ? `<small>${formatNote}</small>` : ''}</dd>
      </div>
      <div class="meta-row">
        <dt>Carpeta</dt>
        <dd>${escapeHtml(folderName)}</dd>
      </div>
      <div class="meta-row">
        <dt>Añadida</dt>
        <dd>${formatDate(image.createdAt)}</dd>
      </div>
    </dl>

    <section class="palette" aria-labelledby="palette-title">
      <div class="palette__head">
        <h3 class="palette__title" id="palette-title">Paleta extraída</h3>
        ${
          image.palette
            ? `<button class="text-btn" type="button" data-action="copy-palette" data-id="${escapeHtml(image.id)}">Copiar paleta</button>`
            : ''
        }
      </div>
      ${paletteTemplate(image)}
    </section>
  `
}
