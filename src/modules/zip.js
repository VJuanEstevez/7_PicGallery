/* Minimal store-only ZIP writer (no compression). */

const CRC_TABLE = (() => {
  const table = new Uint32Array(256)

  for (let index = 0; index < 256; index += 1) {
    let value = index
    for (let bit = 0; bit < 8; bit += 1) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1
    }
    table[index] = value >>> 0
  }

  return table
})()

function crc32(data) {
  let crc = 0xffffffff

  for (let index = 0; index < data.length; index += 1) {
    crc = CRC_TABLE[(crc ^ data[index]) & 0xff] ^ (crc >>> 8)
  }

  return (crc ^ 0xffffffff) >>> 0
}

function dosDateTime(date = new Date()) {
  const year = Math.max(1980, date.getFullYear())
  const time =
    (date.getHours() << 11) |
    (date.getMinutes() << 5) |
    Math.floor(date.getSeconds() / 2)
  const day = ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate()

  return { time, date: day }
}

function writeUint32(view, offset, value) {
  view.setUint32(offset, value >>> 0, true)
}

function writeUint16(view, offset, value) {
  view.setUint16(offset, value & 0xffff, true)
}

/**
 * Build a ZIP blob from entries of the shape `{ name, data }` where `name`
 * may contain `/` to nest files inside folders. Names are stored as UTF-8.
 */
export function createZip(files) {
  const encoder = new TextEncoder()
  const { time, date } = dosDateTime()

  const entries = files.map((file) => {
    const data = file.data instanceof Uint8Array ? file.data : new Uint8Array(file.data)
    return {
      name: encoder.encode(file.name),
      data,
      crc: crc32(data)
    }
  })

  let offset = 0
  const localBlocks = []
  const centralBlocks = []
  let centralSize = 0

  for (const entry of entries) {
    const block = new Uint8Array(30 + entry.name.length + entry.data.length)
    const view = new DataView(block.buffer)

    writeUint32(view, 0, 0x04034b50)
    writeUint16(view, 4, 20)
    writeUint16(view, 6, 0x0800)
    writeUint16(view, 8, 0)
    writeUint16(view, 10, time)
    writeUint16(view, 12, date)
    writeUint32(view, 14, entry.crc)
    writeUint32(view, 18, entry.data.length)
    writeUint32(view, 22, entry.data.length)
    writeUint16(view, 26, entry.name.length)
    writeUint16(view, 28, 0)
    block.set(entry.name, 30)
    block.set(entry.data, 30 + entry.name.length)

    const central = new Uint8Array(46 + entry.name.length)
    const centralView = new DataView(central.buffer)

    writeUint32(centralView, 0, 0x02014b50)
    writeUint16(centralView, 4, 20)
    writeUint16(centralView, 6, 20)
    writeUint16(centralView, 8, 0x0800)
    writeUint16(centralView, 10, 0)
    writeUint16(centralView, 12, time)
    writeUint16(centralView, 14, date)
    writeUint32(centralView, 16, entry.crc)
    writeUint32(centralView, 20, entry.data.length)
    writeUint32(centralView, 24, entry.data.length)
    writeUint16(centralView, 28, entry.name.length)
    writeUint16(centralView, 30, 0)
    writeUint16(centralView, 32, 0)
    writeUint16(centralView, 34, 0)
    writeUint16(centralView, 36, 0)
    writeUint32(centralView, 38, 0)
    writeUint32(centralView, 42, offset)
    central.set(entry.name, 46)

    localBlocks.push(block)
    centralBlocks.push(central)
    offset += block.length
    centralSize += central.length
  }

  const end = new Uint8Array(22)
  const endView = new DataView(end.buffer)
  writeUint32(endView, 0, 0x06054b50)
  writeUint16(endView, 4, 0)
  writeUint16(endView, 6, 0)
  writeUint16(endView, 8, entries.length)
  writeUint16(endView, 10, entries.length)
  writeUint32(endView, 12, centralSize)
  writeUint32(endView, 16, offset)
  writeUint16(endView, 20, 0)

  return new Blob([...localBlocks, ...centralBlocks, end], {
    type: 'application/zip'
  })
}
