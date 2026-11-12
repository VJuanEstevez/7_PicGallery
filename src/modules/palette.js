import { colorDistance, hexToRgb, hueFamily, rgbToHex, rgbToHsl } from './utils.js'

const SAMPLE_SIZE = 64
const MAX_CANDIDATES = 48
const MERGE_DISTANCE = 44
const PALETTE_SIZE = 6

export async function extractPaletteFromSource(src) {
  const response = await fetch(src)
  if (!response.ok) throw new Error(`No se pudo leer ${src}`)
  const blob = await response.blob()
  return extractPaletteFromBlob(blob)
}

export async function extractPaletteFromBlob(blob) {
  const bitmap = await createImageBitmap(blob)
  try {
    return paletteFromBitmap(bitmap)
  } finally {
    bitmap.close?.()
  }
}

export function paletteFromBitmap(bitmap) {
  const canvas = document.createElement('canvas')
  canvas.width = SAMPLE_SIZE
  canvas.height = SAMPLE_SIZE

  const context = canvas.getContext('2d', { willReadFrequently: true })
  context.drawImage(bitmap, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE)

  const { data } = context.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE)
  return paletteFromPixels(data)
}

export function paletteFromPixels(data) {
  const buckets = new Map()

  for (let index = 0; index < data.length; index += 4) {
    if (data[index + 3] < 128) continue

    const red = data[index]
    const green = data[index + 1]
    const blue = data[index + 2]
    const key = ((red >> 4) << 8) | ((green >> 4) << 4) | (blue >> 4)

    let bucket = buckets.get(key)
    if (!bucket) {
      bucket = { count: 0, red: 0, green: 0, blue: 0 }
      buckets.set(key, bucket)
    }

    bucket.count += 1
    bucket.red += red
    bucket.green += green
    bucket.blue += blue
  }

  const candidates = [...buckets.values()]
    .map((bucket) => ({
      count: bucket.count,
      rgb: [
        bucket.red / bucket.count,
        bucket.green / bucket.count,
        bucket.blue / bucket.count
      ]
    }))
    .sort((first, second) => second.count - first.count)
    .slice(0, MAX_CANDIDATES)

  const merged = []

  for (const candidate of candidates) {
    const near = merged.find(
      (entry) => colorDistance(entry.rgb, candidate.rgb) < MERGE_DISTANCE
    )

    if (!near) {
      merged.push({
        count: candidate.count,
        rgb: [...candidate.rgb]
      })
      continue
    }

    const total = near.count + candidate.count
    near.rgb = [
      (near.rgb[0] * near.count + candidate.rgb[0] * candidate.count) / total,
      (near.rgb[1] * near.count + candidate.rgb[1] * candidate.count) / total,
      (near.rgb[2] * near.count + candidate.rgb[2] * candidate.count) / total
    ]
    near.count = total
  }

  merged.sort((first, second) => second.count - first.count)

  const palette = merged
    .slice(0, PALETTE_SIZE)
    .map((entry) => rgbToHex(entry.rgb[0], entry.rgb[1], entry.rgb[2]))

  while (palette.length < PALETTE_SIZE) {
    const base = hexToRgb(palette.at(-1) || '#8c8a85')
    const factor = 0.72 + palette.length * 0.07
    palette.push(
      rgbToHex(
        base[0] * factor,
        base[1] * factor,
        base[2] * factor
      )
    )
  }

  return palette
}

export function dominantFamily(palette) {
  if (!Array.isArray(palette) || palette.length === 0) return 'neutral'

  const scores = new Map()

  palette.forEach((hex, index) => {
    const [red, green, blue] = hexToRgb(hex)
    const { h, s, l } = rgbToHsl(red, green, blue)

    if (s < 0.18 || l < 0.08 || l > 0.94) return

    const family = hueFamily(h)
    const weight =
      (1 - index / palette.length) *
      (0.35 + s) *
      (l > 0.2 && l < 0.8 ? 1 : 0.6)

    scores.set(family, (scores.get(family) || 0) + weight)
  })

  if (scores.size === 0) return 'neutral'

  return [...scores.entries()].sort((first, second) => second[1] - first[1])[0][0]
}
