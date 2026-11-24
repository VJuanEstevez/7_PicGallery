import { getFolderImages, getFolderTitle, getState } from '../store.js'
import { slugify } from '../utils.js'
import { toast } from '../toast.js'
import {
  downloadBlob,
  fetchImageBytes,
  imageToJpegBytes,
  safeSegment,
  shuffle
} from './shared.js'

const PAGE_WIDTH = 841.89
const PAGE_HEIGHT = 595.28
const MARGIN = 32
const DEFAULT_GAP = 10

function layoutFor(option) {
  if (option === 'random') return { cols: 4, rows: 4, random: true }
  const [cols, rows] = String(option).split('x').map(Number)
  return { cols: cols || 3, rows: rows || 3, random: false }
}

function isFree(occupied, col, row, spanX, spanY) {
  for (let currentRow = row; currentRow < row + spanY; currentRow += 1) {
    for (let currentCol = col; currentCol < col + spanX; currentCol += 1) {
      if (occupied.has(`${currentRow}:${currentCol}`)) return false
    }
  }
  return true
}

function occupy(occupied, col, row, spanX, spanY) {
  for (let currentRow = row; currentRow < row + spanY; currentRow += 1) {
    for (let currentCol = col; currentCol < col + spanX; currentCol += 1) {
      occupied.add(`${currentRow}:${currentCol}`)
    }
  }
}

function randomCells(cols, rows) {
  const occupied = new Set()
  const cells = []

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (occupied.has(`${row}:${col}`)) continue

      let spanX = 1
      let spanY = 1

      if (
        col + 1 < cols &&
        isFree(occupied, col, row, 2, 1) &&
        Math.random() < 0.24
      ) {
        spanX = 2
      }
      if (
        row + 1 < rows &&
        isFree(occupied, col, row, spanX, 2) &&
        Math.random() < 0.18
      ) {
        spanY = 2
      }

      occupy(occupied, col, row, spanX, spanY)
      cells.push({ col, row, spanX, spanY })
    }
  }

  return shuffle(cells)
}

function fixedCells(cols, rows) {
  const cells = []
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      cells.push({ col, row, spanX: 1, spanY: 1 })
    }
  }
  return cells
}

function cellRect(cell, cols, rows, gap) {
  const cellWidth = (PAGE_WIDTH - MARGIN * 2) / cols
  const cellHeight = (PAGE_HEIGHT - MARGIN * 2) / rows

  return {
    x: MARGIN + cell.col * cellWidth + gap / 2,
    y:
      PAGE_HEIGHT -
      MARGIN -
      (cell.row + cell.spanY) * cellHeight +
      gap / 2,
    width: cell.spanX * cellWidth - gap,
    height: cell.spanY * cellHeight - gap
  }
}

function drawImage(page, embedded, rect) {
  page.drawImage(embedded, {
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height
  })
}

export async function exportPdf(options, onProgress) {
  const { layout, gap: gapOption } = options ?? {}
  const gapValue = Number(gapOption)
  const gap = Number.isFinite(gapValue) ? Math.max(0, gapValue) : DEFAULT_GAP
  const state = getState()
  const images = getFolderImages(state)

  if (images.length === 0) {
    toast('Esta vista no contiene imágenes para exportar', {
      type: 'error',
      icon: 'info'
    })
    return
  }

  const { cols, rows, random } = layoutFor(layout)
  const cells = random ? randomCells(cols, rows) : fixedCells(cols, rows)
  const ordered = random ? shuffle(images) : images

  try {
    const { PDFDocument } = await import('pdf-lib')
    const document = await PDFDocument.create()
    let cursor = 0
    let done = 0
    let failed = 0

    while (cursor < ordered.length) {
      const page = document.addPage([PAGE_WIDTH, PAGE_HEIGHT])
      const batch = []

      for (const cell of cells) {
        if (cursor >= ordered.length) break
        batch.push({ cell, image: ordered[cursor] })
        cursor += 1
      }

      for (const { cell, image } of batch) {
        try {
          const rect = cellRect(cell, cols, rows, gap)
          const bytes = await fetchImageBytes(image)
          const jpeg = await imageToJpegBytes(bytes, 0.88, rect.width / rect.height)
          const embedded = await document.embedJpg(jpeg)
          drawImage(page, embedded, rect)
        } catch {
          failed += 1
        }
        done += 1
        onProgress?.(done, ordered.length)
      }
    }

    const bytes = await document.save()
    const name = safeSegment(getFolderTitle(state.activeFolder), 'coleccion')
    downloadBlob(
      new Blob([bytes], { type: 'application/pdf' }),
      `${slugify(name) || 'coleccion'}.pdf`
    )

    toast(
      failed > 0
        ? `${done - failed} de ${done} imágenes exportadas en PDF`
        : `PDF descargado con ${done} ${done === 1 ? 'imagen' : 'imágenes'}`
    )
  } catch {
    toast('No se pudo generar el PDF', { type: 'error', icon: 'info' })
  }
}
