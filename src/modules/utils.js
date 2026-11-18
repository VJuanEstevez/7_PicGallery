export const qs = (selector, root = document) => root.querySelector(selector)
export const qsa = (selector, root = document) => [...root.querySelectorAll(selector)]

export function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      })[character]
  )
}

export function formatBytes(bytes) {
  const value = Number(bytes) || 0
  if (value < 1024) return `${value} B`

  const units = ['KB', 'MB', 'GB', 'TB']
  let amount = value
  let unit = -1

  do {
    amount /= 1024
    unit += 1
  } while (amount >= 1024 && unit < units.length - 1)

  return `${new Intl.NumberFormat('es-ES', {
    maximumFractionDigits: amount < 10 ? 1 : 0
  }).format(amount)} ${units[unit]}`
}

export function formatNumber(value) {
  return new Intl.NumberFormat('es-ES').format(Number(value) || 0)
}

export function formatDate(value) {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return '—'

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date)
}

export function formatCounter(index, total) {
  return `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`
}

export function assetUrl(path) {
  const base = import.meta.env?.BASE_URL || '/'
  return `${base}${String(path).replace(/^\/+/, '')}`
}

export function uid() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID()
  return `img-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function debounce(callback, delay = 200) {
  let timer = 0

  return (...args) => {
    window.clearTimeout(timer)
    timer = window.setTimeout(() => callback(...args), delay)
  }
}

export function slugify(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function titleFromFilename(filename) {
  const base = String(filename)
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (!base) return 'Sin título'
  return base.charAt(0).toUpperCase() + base.slice(1)
}

export function extensionOf(src) {
  try {
    const pathname = new URL(src, window.location.href).pathname
    const match = pathname.match(/\.([a-z0-9]+)$/i)
    return match ? match[1].toLowerCase() : 'jpg'
  } catch {
    return 'jpg'
  }
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.append(textarea)
    textarea.select()

    try {
      return document.execCommand('copy')
    } catch {
      return false
    } finally {
      textarea.remove()
    }
  }
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function hexToRgb(hex) {
  const clean = String(hex).replace('#', '')
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((character) => character + character)
          .join('')
      : clean.padEnd(6, '0').slice(0, 6)

  return [
    Number.parseInt(full.slice(0, 2), 16),
    Number.parseInt(full.slice(2, 4), 16),
    Number.parseInt(full.slice(4, 6), 16)
  ]
}

export function rgbToHex(red, green, blue) {
  return `#${[red, green, blue]
    .map((channel) => clamp(Math.round(channel), 0, 255).toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()}`
}

export function colorDistance(first, second) {
  return Math.sqrt(
    (first[0] - second[0]) ** 2 +
      (first[1] - second[1]) ** 2 +
      (first[2] - second[2]) ** 2
  )
}

export function downloadImage({ src, title, format }) {
  const link = document.createElement('a')
  const extension =
    format === 'PNG' ? 'png' : format === 'WEBP' ? 'webp' : extensionOf(src)

  link.href = src
  link.download = `${slugify(title) || 'imagen'}.${extension}`
  link.rel = 'noopener'
  document.body.append(link)
  link.click()
  link.remove()
}
