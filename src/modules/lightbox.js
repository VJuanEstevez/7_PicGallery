import {
  getFolderTitle,
  getState,
  getVisibleImages,
  setActiveImage,
  toggleFavorite
} from './store.js'
import {
  escapeHtml,
  formatBytes,
  formatCounter
} from './utils.js'
import { toast } from './toast.js'

let dialog = null
let list = []
let index = 0
let startX = null

function getDialog() {
  if (!dialog) dialog = document.getElementById('lightbox')
  return dialog
}

function currentImage() {
  const state = getState()
  return state.images.find((image) => image.id === list[index]) ?? null
}

function filmstripTemplate(state) {
  return list
    .map((id, position) => {
      const image = state.images.find((entry) => entry.id === id)
      if (!image) return ''

      return `
        <button
          class="lightbox__thumb${position === index ? ' is-active' : ''}"
          type="button"
          data-action="lightbox-go"
          data-index="${position}"
          aria-label="Ver ${escapeHtml(image.title)}"
          data-tooltip="${escapeHtml(image.title)}"
          ${position === index ? 'aria-current="true"' : ''}
        >
          <img src="${escapeHtml(image.src)}" alt="" loading="lazy" />
        </button>
      `
    })
    .join('')
}

function buildSkeleton(state) {
  const element = getDialog()

  element.innerHTML = `
    <div class="lightbox__inner">
      <header class="lightbox__top">
        <div class="lightbox__heading">
          <span class="lightbox__counter mono" id="lightbox-counter" aria-live="polite"></span>
          <h2 class="lightbox__title" id="lightbox-title"></h2>
        </div>
        <div class="lightbox__tools">
          <button
            class="lightbox__tool"
            id="lightbox-fav"
            type="button"
            data-action="lightbox-favorite"
            aria-label="Añadir a favoritos"
            data-tooltip="Añadir a favoritos"
          >
            <svg class="icon" aria-hidden="true"><use href="#icon-heart"></use></svg>
          </button>
          <button
            class="lightbox__tool"
            id="lightbox-rename"
            type="button"
            data-action="rename-image"
            aria-label="Cambiar nombre"
            data-tooltip="Cambiar nombre"
          >
            <svg class="icon" aria-hidden="true"><use href="#icon-pencil"></use></svg>
          </button>
          <button
            class="lightbox__tool"
            id="lightbox-download"
            type="button"
            data-action="download"
            aria-label="Descargar imagen"
            data-tooltip="Descargar imagen"
          >
            <svg class="icon" aria-hidden="true"><use href="#icon-download"></use></svg>
          </button>
          <button
            class="lightbox__tool lightbox__tool--danger"
            id="lightbox-delete"
            type="button"
            data-action="delete-image"
            aria-label="Eliminar imagen"
            data-tooltip="Eliminar imagen"
          >
            <svg class="icon" aria-hidden="true"><use href="#icon-trash"></use></svg>
          </button>
          <button
            class="lightbox__tool"
            type="button"
            data-action="lightbox-close"
            aria-label="Cerrar visor"
            data-tooltip="Cerrar visor"
          >
            <svg class="icon" aria-hidden="true"><use href="#icon-close"></use></svg>
          </button>
        </div>
      </header>

      <div class="lightbox__stage" id="lightbox-stage">
        <img class="lightbox__img is-loading" id="lightbox-image" alt="" />
        <button
          class="lightbox__nav lightbox__nav--prev"
          type="button"
          data-action="lightbox-prev"
          aria-label="Imagen anterior"
          data-tooltip="Imagen anterior"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-chevron-left"></use></svg>
        </button>
        <button
          class="lightbox__nav lightbox__nav--next"
          type="button"
          data-action="lightbox-next"
          aria-label="Imagen siguiente"
          data-tooltip="Imagen siguiente"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
        </button>
      </div>

      <div class="lightbox__foot">
        <div class="lightbox__meta" id="lightbox-meta"></div>
        <div class="lightbox__palette" id="lightbox-palette"></div>
      </div>

      <div class="lightbox__filmstrip" id="lightbox-filmstrip" role="group" aria-label="Miniaturas de la colección">
        ${filmstripTemplate(state)}
      </div>
    </div>
  `

  element.onclick = (event) => {
    if (event.target === element) element.close()
  }

  element.onkeydown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go(-1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      go(1)
    }
  }

  const stage = element.querySelector('#lightbox-stage')

  stage.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button')) return
    startX = event.clientX
  })

  stage.addEventListener('pointerup', (event) => {
    if (startX === null) return
    const distance = event.clientX - startX
    startX = null
    if (Math.abs(distance) < 50) return
    go(distance > 0 ? -1 : 1)
  })

  stage.addEventListener('pointercancel', () => {
    startX = null
  })
}

function updateLightbox() {
  const element = getDialog()
  const state = getState()
  const image = currentImage()

  if (!image) return

  const imageElement = element.querySelector('#lightbox-image')
  const counter = element.querySelector('#lightbox-counter')
  const title = element.querySelector('#lightbox-title')
  const meta = element.querySelector('#lightbox-meta')
  const palette = element.querySelector('#lightbox-palette')
  const favorite = element.querySelector('#lightbox-fav')
  const download = element.querySelector('#lightbox-download')
  const rename = element.querySelector('#lightbox-rename')
  const remove = element.querySelector('#lightbox-delete')
  const filmstrip = element.querySelector('#lightbox-filmstrip')

  counter.textContent = formatCounter(index, list.length)
  title.textContent = image.title

  const sameSource = imageElement.getAttribute('src') === image.src

  if (sameSource) {
    imageElement.classList.remove('is-loading')
  } else {
    imageElement.classList.add('is-loading')
    imageElement.src = image.src
  }

  imageElement.onload = () => imageElement.classList.remove('is-loading')
  imageElement.onerror = () => imageElement.classList.remove('is-loading')
  imageElement.alt = image.title

  meta.innerHTML = `
    <span>${image.width} × ${image.height} px</span>
    <span>${formatBytes(image.bytes)}</span>
    <span>${escapeHtml(image.format)}${image.format === 'RAW' ? ' · proxy JPG' : ''}</span>
    <span>${escapeHtml(getFolderTitle(image.folderId))}</span>
  `

  palette.innerHTML = (image.palette ?? [])
    .map(
      (hex) => `
        <button
          class="lightbox__swatch"
          type="button"
          data-action="copy-hex"
          data-hex="${escapeHtml(hex)}"
          style="--hex: ${escapeHtml(hex)}"
          aria-label="Copiar el color ${escapeHtml(hex)}"
          data-tooltip="Copiar ${escapeHtml(hex)}"
        ></button>
      `
    )
    .join('')

  favorite.classList.toggle('is-fav', Boolean(image.favorite))
  favorite.setAttribute('aria-pressed', String(Boolean(image.favorite)))
  favorite.setAttribute(
    'aria-label',
    image.favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'
  )
  favorite.setAttribute(
    'data-tooltip',
    image.favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'
  )

  download.dataset.id = image.id
  download.setAttribute('aria-label', `Descargar ${image.title}`)

  if (rename) {
    rename.dataset.id = image.id
    rename.setAttribute('aria-label', `Cambiar el nombre de ${image.title}`)
  }

  if (remove) {
    remove.dataset.id = image.id
    remove.setAttribute('aria-label', `Eliminar ${image.title}`)
  }

  if (filmstrip) {
    filmstrip.querySelectorAll('[data-action="lightbox-go"]').forEach((thumb) => {
      const active = Number(thumb.dataset.index) === index
      thumb.classList.toggle('is-active', active)
      if (active) thumb.setAttribute('aria-current', 'true')
      else thumb.removeAttribute('aria-current')
    })

    filmstrip
      .querySelector('.lightbox__thumb.is-active')
      ?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }

  const stateIndex = state.images.findIndex((entry) => entry.id === image.id)
  const neighbors = [
    list[(index + 1) % list.length],
    list[(index - 1 + list.length) % list.length]
  ]

  for (const id of neighbors) {
    const neighbor = state.images.find((entry) => entry.id === id)
    if (neighbor) {
      const preload = new Image()
      preload.src = neighbor.src
    }
  }

  if (stateIndex === -1) return
}

function go(delta) {
  if (list.length === 0) return
  index = (index + delta + list.length) % list.length
  const id = list[index]
  updateLightbox()
  setActiveImage(id)
}

function goTo(position) {
  if (position < 0 || position >= list.length) return
  index = position
  const id = list[index]
  updateLightbox()
  setActiveImage(id)
}

export function openLightbox(id) {
  const state = getState()
  const visible = getVisibleImages(state)
  let images = visible.length > 0 ? visible : state.images
  let position = images.findIndex((image) => image.id === id)

  if (position === -1) {
    images = state.images
    position = images.findIndex((image) => image.id === id)
  }

  if (position === -1) return

  list = images.map((image) => image.id)
  index = position

  const element = getDialog()
  buildSkeleton(state)

  if (!element.open) element.showModal()

  updateLightbox()
  setActiveImage(id)
  element.querySelector('[data-action="lightbox-close"]')?.focus()
}

export function closeLightbox() {
  const element = getDialog()
  if (element?.open) element.close()
}

export function isLightboxOpen() {
  return Boolean(getDialog()?.open)
}

export function syncLightbox() {
  if (!isLightboxOpen()) return
  const element = getDialog()
  const image = currentImage()
  if (!element || !image) return

  const title = element.querySelector('#lightbox-title')
  if (title) title.textContent = image.title

  const picture = element.querySelector('#lightbox-image')
  if (picture) picture.alt = image.title

  const favorite = element.querySelector('#lightbox-fav')
  favorite?.classList.toggle('is-fav', Boolean(image.favorite))
  favorite?.setAttribute('aria-pressed', String(Boolean(image.favorite)))

  const download = element.querySelector('#lightbox-download')
  download?.setAttribute('aria-label', `Descargar ${image.title}`)

  const rename = element.querySelector('#lightbox-rename')
  rename?.setAttribute('aria-label', `Cambiar el nombre de ${image.title}`)

  const remove = element.querySelector('#lightbox-delete')
  remove?.setAttribute('aria-label', `Eliminar ${image.title}`)

  const palette = element.querySelector('#lightbox-palette')
  if (palette) {
    palette.innerHTML = (image.palette ?? [])
      .map(
        (hex) => `
          <button
            class="lightbox__swatch"
            type="button"
            data-action="copy-hex"
            data-hex="${escapeHtml(hex)}"
            style="--hex: ${escapeHtml(hex)}"
            aria-label="Copiar el color ${escapeHtml(hex)}"
            data-tooltip="Copiar ${escapeHtml(hex)}"
          ></button>
        `
      )
      .join('')
  }
}

export function handleLightboxFavorite() {
  const image = currentImage()
  if (!image) return

  const favorite = toggleFavorite(image.id)
  syncLightbox()
  toast(favorite ? 'Añadida a favoritos' : 'Quitada de favoritos')
}

export function navigateLightbox(delta) {
  go(delta)
}

export function goToLightbox(position) {
  goTo(position)
}
