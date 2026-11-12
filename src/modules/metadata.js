import { paletteFromBitmap } from './palette.js'

const RAW_EXTENSIONS = new Set([
  'dng',
  'cr2',
  'cr3',
  'crw',
  'nef',
  'nrw',
  'arw',
  'srf',
  'sr2',
  'raf',
  'orf',
  'rw2',
  'pef',
  'srw',
  '3fr',
  'fff',
  'iiq',
  'mos'
])

export function formatFromFile(file) {
  const extension = file.name.split('.').pop()?.toLowerCase() || ''
  if (RAW_EXTENSIONS.has(extension)) return 'RAW'
  if (extension === 'png' || file.type === 'image/png') return 'PNG'
  if (extension === 'webp' || file.type === 'image/webp') return 'WEBP'
  if (['jpg', 'jpeg'].includes(extension) || file.type === 'image/jpeg') return 'JPG'
  return null
}

export function isSupportedFile(file) {
  const format = formatFromFile(file)
  return format === 'JPG' || format === 'PNG' || format === 'WEBP'
}

export async function inspectFile(file) {
  const format = formatFromFile(file)

  if (!format) {
    throw new Error(`${file.name}: formato no compatible.`)
  }

  if (format === 'RAW') {
    throw new Error(`${file.name}: los RAW necesitan un proxy JPG para verse en el navegador.`)
  }

  const bitmap = await createImageBitmap(file)

  try {
    return {
      width: bitmap.width,
      height: bitmap.height,
      format,
      bytes: file.size,
      palette: paletteFromBitmap(bitmap)
    }
  } finally {
    bitmap.close?.()
  }
}
