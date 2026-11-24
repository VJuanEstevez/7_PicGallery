import { getFolderImages, getFolderTitle, getState } from '../store.js'
import { slugify } from '../utils.js'
import { toast } from '../toast.js'
import {
  downloadBlob,
  fetchImageBytes,
  loadImageElement,
  safeSegment,
  shuffle
} from './shared.js'

const WIDTH = 1280
const HEIGHT = 720
const FPS = 30
const HOLD = 380
const FRAME_WIDTH = 340
const FRAME_HEIGHT = 400
const PHOTO_HEIGHT = 312

function preferredMimeType() {
  if (typeof MediaRecorder.isTypeSupported !== 'function') return ''

  const candidates = [
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8',
    'video/webm'
  ]
  return candidates.find((type) => MediaRecorder.isTypeSupported(type)) ?? ''
}

function drawBackground(context, kind) {
  const gradient = context.createLinearGradient(0, 0, WIDTH, HEIGHT)

  if (kind === 'wood') {
    gradient.addColorStop(0, '#8b6747')
    gradient.addColorStop(1, '#5f422c')
    context.fillStyle = gradient
    context.fillRect(0, 0, WIDTH, HEIGHT)

    context.strokeStyle = 'rgb(35 22 12 / 0.22)'
    context.lineWidth = 2
    for (let row = 1; row < 9; row += 1) {
      const y = (HEIGHT / 9) * row
      context.beginPath()
      context.moveTo(0, y)
      context.lineTo(WIDTH, y)
      context.stroke()
    }
    context.strokeStyle = 'rgb(255 235 200 / 0.08)'
    context.lineWidth = 1
    for (let index = 0; index < 70; index += 1) {
      const y = (index * 83) % HEIGHT
      context.beginPath()
      context.moveTo(0, y)
      context.bezierCurveTo(WIDTH / 3, y + 6, (WIDTH * 2) / 3, y - 6, WIDTH, y)
      context.stroke()
    }
    return
  }

  if (kind === 'linen') {
    gradient.addColorStop(0, '#ded8c9')
    gradient.addColorStop(1, '#c9c1b0')
    context.fillStyle = gradient
    context.fillRect(0, 0, WIDTH, HEIGHT)

    context.strokeStyle = 'rgb(255 255 255 / 0.16)'
    context.lineWidth = 1
    for (let x = 0; x < WIDTH; x += 6) {
      context.beginPath()
      context.moveTo(x, 0)
      context.lineTo(x, HEIGHT)
      context.stroke()
    }
    context.strokeStyle = 'rgb(90 78 60 / 0.08)'
    for (let y = 0; y < HEIGHT; y += 6) {
      context.beginPath()
      context.moveTo(0, y)
      context.lineTo(WIDTH, y)
      context.stroke()
    }
    return
  }

  gradient.addColorStop(0, '#ebe7dd')
  gradient.addColorStop(1, '#d6d1c6')
  context.fillStyle = gradient
  context.fillRect(0, 0, WIDTH, HEIGHT)
}

function drawPolaroid(context, item, image, progress) {
  const eased = 1 - (1 - progress) ** 3
  const overshoot = Math.sin(progress * Math.PI) * 12

  context.save()
  context.globalAlpha = Math.min(1, progress * 4)
  context.translate(
    item.x,
    -HEIGHT * 0.65 + (item.y + HEIGHT * 0.65) * eased
  )
  context.rotate(item.rotation - (1 - eased) * 0.42)

  context.shadowColor = `rgb(0 0 0 / ${0.16 + eased * 0.16})`
  context.shadowBlur = 30
  context.shadowOffsetY = 16 + overshoot
  context.fillStyle = '#fbfaf6'
  context.fillRect(
    -FRAME_WIDTH / 2,
    -FRAME_HEIGHT / 2,
    FRAME_WIDTH,
    FRAME_HEIGHT
  )
  context.shadowColor = 'transparent'
  context.shadowBlur = 0
  context.shadowOffsetY = 0

  const photoWidth = FRAME_WIDTH - 32
  const photoTop = -FRAME_HEIGHT / 2 + 16
  const scale = Math.max(photoWidth / image.width, PHOTO_HEIGHT / image.height)
  const sourceWidth = photoWidth / scale
  const sourceHeight = PHOTO_HEIGHT / scale

  context.drawImage(
    image,
    (image.width - sourceWidth) / 2,
    (image.height - sourceHeight) / 2,
    sourceWidth,
    sourceHeight,
    -photoWidth / 2,
    photoTop,
    photoWidth,
    PHOTO_HEIGHT
  )
  context.restore()
}

function buildTimeline(images, fallDuration) {
  const entries = []
  let start = 0

  const minX = FRAME_WIDTH / 2 + 24
  const maxX = WIDTH - minX
  const minY = FRAME_HEIGHT / 2 + 24
  const maxY = HEIGHT - minY
  let previousX = minX + Math.random() * (maxX - minX)
  let previousY = minY + Math.random() * (maxY - minY)

  images.forEach((image) => {
    const end = start + fallDuration
    const x = Math.min(
      maxX,
      Math.max(minX, previousX + (Math.random() - 0.5) * 520)
    )
    const y = Math.min(
      maxY,
      Math.max(minY, previousY + (Math.random() - 0.5) * 380)
    )
    entries.push({
      image,
      start,
      end,
      x,
      y,
      rotation: (Math.random() - 0.5) * 0.3
    })
    previousX = x
    previousY = y
    start = end + HOLD
  })

  return { entries, total: start + 900 }
}

export async function exportVideo(options, onProgress) {
  const state = getState()
  const images = getFolderImages(state)

  if (images.length === 0) {
    toast('Esta vista no contiene imágenes para exportar', {
      type: 'error',
      icon: 'info'
    })
    return
  }
  if (typeof MediaRecorder === 'undefined') {
    toast('Este navegador no puede grabar vídeo', { type: 'error', icon: 'info' })
    return
  }

  const canvas = document.createElement('canvas')
  canvas.width = WIDTH
  canvas.height = HEIGHT
  const context = canvas.getContext('2d')

  if (!canvas.captureStream) {
    toast('Este navegador no puede capturar el lienzo', {
      type: 'error',
      icon: 'info'
    })
    return
  }

  const fallDuration = Math.max(300, Number(options.fallDuration) || 1200)
  const ordered = options.random ? shuffle(images) : images
  const { entries, total } = buildTimeline(ordered, fallDuration)
  const urls = []

  try {
    for (const entry of entries) {
      const bytes = await fetchImageBytes(entry.image)
      const loaded = await loadImageElement(bytes)
      entry.image = loaded.element
      urls.push(loaded.url)
    }

    const stream = canvas.captureStream(FPS)
    const mimeType = preferredMimeType()
    const recorder = new MediaRecorder(
      stream,
      mimeType
        ? { mimeType, videoBitsPerSecond: 4_000_000 }
        : { videoBitsPerSecond: 4_000_000 }
    )
    const chunks = []
    const finished = new Promise((resolve) => {
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data)
      }
      recorder.onstop = () =>
        resolve(new Blob(chunks, { type: mimeType || 'video/webm' }))
    })

    onProgress?.(0, entries.length)
    recorder.start(200)
    const startedAt = performance.now()

    await new Promise((resolve) => {
      const tick = () => {
        const elapsed = performance.now() - startedAt
        drawBackground(context, options.background)

        let landed = 0
        for (const entry of entries) {
          if (elapsed < entry.start) continue
          const progress = Math.min(
            1,
            (elapsed - entry.start) / (entry.end - entry.start)
          )
          if (progress === 1) landed += 1
          drawPolaroid(context, entry, entry.image, progress)
        }
        onProgress?.(landed, entries.length)

        if (elapsed >= total) {
          recorder.stop()
          resolve()
          return
        }
        window.requestAnimationFrame(tick)
      }
      window.requestAnimationFrame(tick)
    })

    const blob = await finished
    stream.getTracks().forEach((track) => track.stop())
    const name = safeSegment(getFolderTitle(state.activeFolder), 'presentacion')
    downloadBlob(blob, `${slugify(name) || 'presentacion'}.webm`)
    toast(`Vídeo descargado con ${entries.length} imágenes`)
  } catch {
    toast('No se pudo generar el vídeo', { type: 'error', icon: 'info' })
  } finally {
    urls.forEach((url) => URL.revokeObjectURL(url))
  }
}
