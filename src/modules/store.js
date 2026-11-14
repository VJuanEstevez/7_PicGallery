import { deleteUpload, getAllUploads } from './db.js'
import { seedFolders, seedImages } from './seed.js'
import { loadSavedState, savePersistedState } from './storage.js'
import { assetUrl, debounce, slugify } from './utils.js'
import { dominantFamily } from './palette.js'

const RECENT_LIMIT = 8
const FOLDER_COLORS = ['#c8553d', '#1b2aff', '#3e7c4a', '#7a4b9e', '#d8a400', '#2b9c9c']

const state = {
  folders: seedFolders.map((folder) => ({ ...folder })),
  images: seedImages.map((image) => ({
    ...image,
    tags: [...(image.tags ?? [])],
    src: assetUrl(image.file),
    origin: 'seed',
    palette: null
  })),
  sort: 'recent',
  activeFolder: 'all',
  filters: {
    query: '',
    colors: [],
    formats: [],
    tags: []
  },
  view: {
    layout: 'grid',
    columns: 4,
    gap: 16,
    showMeta: true
  },
  selectedIds: [],
  activeImageId: null,
  sidebarOpen: false,
  sidebarCollapsed: false,
  inspectorOpen: true,
  inspectorDrawer: false,
  deletedIds: [],
  deletedFolderIds: [],
  ready: false
}

const listeners = new Set()

const persist = debounce(() => {
  savePersistedState({
    version: 2,
    folders: state.folders,
    images: state.images.map(({ src, ...image }) => image),
    orderIds: state.images.map((image) => image.id),
    sort: state.sort,
    activeFolder: state.activeFolder,
    activeImageId: state.activeImageId,
    inspectorOpen: state.inspectorOpen,
    sidebarCollapsed: state.sidebarCollapsed,
    filters: state.filters,
    view: state.view,
    deletedIds: state.deletedIds,
    deletedFolderIds: state.deletedFolderIds
  })
}, 250)

function notify(reason = 'update') {
  persist()
  for (const listener of listeners) listener(state, reason)
}

function syncActiveWithVisible() {
  const visible = getVisibleImages()
  if (!visible.some((image) => image.id === state.activeImageId)) {
    state.activeImageId = visible[0]?.id ?? null
  }
}

export function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getState() {
  return state
}

export function getFolder(id) {
  return state.folders.find((folder) => folder.id === id)
}

export function getFolderTitle(id) {
  if (id === 'all') return 'Todas las imágenes'
  if (id === 'favorites') return 'Favoritos'
  if (id === 'recent') return 'Recientes'
  return getFolder(id)?.name ?? 'Colección'
}

export function getFolderEyebrow(id) {
  if (id === 'all') return 'Biblioteca'
  if (id === 'favorites') return 'Selección personal'
  if (id === 'recent') return 'Últimas incorporaciones'
  return 'Carpeta'
}

export function getVisibleImages(current = state) {
  let images = current.images

  if (current.activeFolder === 'favorites') {
    images = images.filter((image) => image.favorite)
  } else if (current.activeFolder === 'recent') {
    images = [...images]
      .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt))
      .slice(0, RECENT_LIMIT)
  } else if (current.activeFolder !== 'all') {
    images = images.filter((image) => image.folderId === current.activeFolder)
  }

  const query = current.filters.query.trim().toLowerCase()

  if (query) {
    images = images.filter((image) => {
      const folder = getFolderTitle(image.folderId).toLowerCase()
      return `${image.title} ${image.description ?? ''} ${folder}`
        .toLowerCase()
        .includes(query)
    })
  }

  if (current.filters.formats.length > 0) {
    images = images.filter((image) => current.filters.formats.includes(image.format))
  }

  if (current.filters.colors.length > 0) {
    images = images.filter((image) => {
      if (!image.palette) return false
      return current.filters.colors.includes(dominantFamily(image.palette))
    })
  }

  if (current.filters.tags.length > 0) {
    images = images.filter((image) => {
      const tags = image.tags ?? []
      return current.filters.tags.every((tag) => tags.includes(tag))
    })
  }

  if (current.sort === 'recent') {
    images = [...images].sort(
      (first, second) => new Date(second.createdAt) - new Date(first.createdAt)
    )
  } else if (current.sort === 'name') {
    images = [...images].sort((first, second) =>
      first.title.localeCompare(second.title, 'es', { sensitivity: 'base' })
    )
  } else if (current.sort === 'size') {
    images = [...images].sort((first, second) => second.bytes - first.bytes)
  }

  return images
}

export function getTotalBytes(images = state.images) {
  return images.reduce((total, image) => total + (Number(image.bytes) || 0), 0)
}

export function getFormatBreakdown(images = state.images) {
  const formats = ['JPG', 'PNG', 'WEBP', 'RAW']
  return formats.map((format) => {
    const subset = images.filter((image) => image.format === format)
    return {
      format,
      count: subset.length,
      bytes: getTotalBytes(subset)
    }
  })
}

export function getCounts(current = state) {
  const folders = Object.fromEntries(
    current.folders.map((folder) => [
      folder.id,
      current.images.filter((image) => image.folderId === folder.id).length
    ])
  )

  return {
    total: current.images.length,
    favorites: current.images.filter((image) => image.favorite).length,
    recent: Math.min(RECENT_LIMIT, current.images.length),
    folders,
    formats: Object.fromEntries(
      getFormatBreakdown(current.images).map((entry) => [entry.format, entry.count])
    )
  }
}

export function getTags(images = state.images) {
  const counts = new Map()

  for (const image of images) {
    for (const tag of image.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }

  return [...counts.entries()]
    .sort(
      (first, second) =>
        second[1] - first[1] ||
        first[0].localeCompare(second[0], 'es', { sensitivity: 'base' })
    )
    .map(([tag, count]) => ({ tag, count }))
}

export function getActiveImage(current = state) {
  return current.images.find((image) => image.id === current.activeImageId) ?? null
}

export function getSelectedImages(current = state) {
  const selected = new Set(current.selectedIds)
  return current.images.filter((image) => selected.has(image.id))
}

export function isRecentImage(image, current = state) {
  return getVisibleImages({ ...current, activeFolder: 'recent' }).some(
    (entry) => entry.id === image.id
  )
}

export function setFolder(id) {
  if (!['all', 'favorites', 'recent'].includes(id) && !getFolder(id)) return
  state.activeFolder = id
  state.selectedIds = []
  state.sidebarOpen = false
  const visible = getVisibleImages()
  state.activeImageId = visible[0]?.id ?? null
  notify('folder')
}

export function setQuery(query) {
  state.filters.query = query
  state.selectedIds = []
  const visible = getVisibleImages()
  if (!visible.some((image) => image.id === state.activeImageId)) {
    state.activeImageId = visible[0]?.id ?? null
  }
  notify('filters')
}

export function toggleColor(color) {
  if (color === 'all') {
    state.filters.colors = []
  } else {
    const colors = new Set(state.filters.colors)
    if (colors.has(color)) colors.delete(color)
    else colors.add(color)
    state.filters.colors = [...colors]
  }

  state.selectedIds = []
  const visible = getVisibleImages()
  if (!visible.some((image) => image.id === state.activeImageId)) {
    state.activeImageId = visible[0]?.id ?? null
  }
  notify('filters')
}

export function toggleFormat(format) {
  const formats = new Set(state.filters.formats)
  if (formats.has(format)) formats.delete(format)
  else formats.add(format)
  state.filters.formats = [...formats]

  state.selectedIds = []
  const visible = getVisibleImages()
  if (!visible.some((image) => image.id === state.activeImageId)) {
    state.activeImageId = visible[0]?.id ?? null
  }
  notify('filters')
}

export function toggleTag(tag) {
  const tags = new Set(state.filters.tags)
  if (tags.has(tag)) tags.delete(tag)
  else tags.add(tag)
  state.filters.tags = [...tags]

  state.selectedIds = []
  const visible = getVisibleImages()
  if (!visible.some((image) => image.id === state.activeImageId)) {
    state.activeImageId = visible[0]?.id ?? null
  }
  notify('filters')
}

export function clearFilters() {
  state.filters = { query: '', colors: [], formats: [], tags: [] }
  state.selectedIds = []
  const visible = getVisibleImages()
  if (!visible.some((image) => image.id === state.activeImageId)) {
    state.activeImageId = visible[0]?.id ?? null
  }
  notify('filters')
}

export function setSort(sort) {
  if (!['recent', 'name', 'size', 'manual'].includes(sort)) return
  state.sort = sort
  notify('sort')
}

export function setActiveImage(id) {
  if (!state.images.some((image) => image.id === id)) return
  state.activeImageId = id
  notify('active')
}

export function toggleSelection(id, force) {
  const selected = new Set(state.selectedIds)
  const shouldSelect = force ?? !selected.has(id)

  if (shouldSelect) selected.add(id)
  else selected.delete(id)

  state.selectedIds = [...selected]
  state.activeImageId = id
  notify('selection')
}

export function selectAll(ids) {
  state.selectedIds = [...ids]
  notify('selection')
}

export function clearSelection() {
  if (state.selectedIds.length === 0) return
  state.selectedIds = []
  notify('selection')
}

export function toggleFavorite(id) {
  const image = state.images.find((entry) => entry.id === id)
  if (!image) return

  image.favorite = !image.favorite
  syncActiveWithVisible()
  notify('favorite')
  return image.favorite
}

export function setFavorites(ids, value) {
  const selected = new Set(ids)
  let changed = false

  for (const image of state.images) {
    if (!selected.has(image.id)) continue
    image.favorite = Boolean(value)
    changed = true
  }

  if (!changed) return

  syncActiveWithVisible()
  notify('favorite')
}

export function moveImages(ids, folderId) {
  if (!getFolder(folderId)) return
  const selected = new Set(ids)

  for (const image of state.images) {
    if (selected.has(image.id)) image.folderId = folderId
  }

  state.selectedIds = []
  syncActiveWithVisible()
  notify('move')
}

export function deleteImages(ids) {
  const removed = new Set(ids)
  const gone = state.images.filter((image) => removed.has(image.id))
  if (gone.length === 0) return 0

  state.images = state.images.filter((image) => !removed.has(image.id))

  const deleted = new Set(state.deletedIds)
  for (const image of gone) {
    deleted.add(image.id)
    if (image.origin === 'upload') {
      deleteUpload(image.id).catch(() => null)
      if (image.src?.startsWith('blob:')) URL.revokeObjectURL(image.src)
    }
  }
  state.deletedIds = [...deleted]

  state.selectedIds = state.selectedIds.filter((id) => !removed.has(id))
  if (removed.has(state.activeImageId)) state.activeImageId = null
  syncActiveWithVisible()
  notify('delete')
  return gone.length
}

export function deleteImage(id) {
  return deleteImages([id])
}

export function renameImage(id, title) {
  const image = state.images.find((entry) => entry.id === id)
  if (!image) return null

  const clean = String(title ?? '').trim()
  if (!clean) return null
  if (image.title === clean) return clean

  image.title = clean
  notify('update')
  return clean
}

export function deleteAllImages() {
  return deleteImages(state.images.map((image) => image.id))
}

export function renameFolder(id, name) {
  const folder = getFolder(id)
  if (!folder) return null

  const clean = String(name ?? '').trim()
  if (!clean) return null
  if (folder.name === clean) return clean

  folder.name = clean
  notify('update')
  return clean
}

export function deleteFolder(id) {
  if (id === 'inbox') return false

  const folder = getFolder(id)
  if (!folder) return false

  for (const image of state.images) {
    if (image.folderId === id) image.folderId = 'inbox'
  }

  state.folders = state.folders.filter((entry) => entry.id !== id)
  if (!state.deletedFolderIds.includes(id)) state.deletedFolderIds.push(id)
  if (state.activeFolder === id) state.activeFolder = 'all'

  syncActiveWithVisible()
  notify('folder-delete')
  return true
}

export function setView(patch, reason = 'view-style') {
  const next = { ...state.view, ...patch }

  state.view = {
    layout: next.layout === 'list' ? 'list' : 'grid',
    columns: Math.min(8, Math.max(3, Number(next.columns) || 4)),
    gap: Math.min(48, Math.max(0, Number(next.gap) || 0)),
    showMeta: next.showMeta !== false
  }

  notify(reason)
}

export function reorderImages(draggedIds, targetId, position) {
  const dragged = new Set(draggedIds)
  if (dragged.size === 0 || dragged.has(targetId)) return

  const moving = state.images.filter((image) => dragged.has(image.id))
  const rest = state.images.filter((image) => !dragged.has(image.id))
  const targetIndex = rest.findIndex((image) => image.id === targetId)
  if (targetIndex === -1 || moving.length === 0) return

  const insertAt = position === 'after' ? targetIndex + 1 : targetIndex
  state.images = [
    ...rest.slice(0, insertAt),
    ...moving,
    ...rest.slice(insertAt)
  ]
  state.sort = 'manual'
  state.selectedIds = []
  notify('reorder')
}

export function createFolder(name) {
  const cleanName = name.trim()
  if (!cleanName) return null

  const base = slugify(cleanName) || 'carpeta'
  let id = base
  let suffix = 2
  while (state.folders.some((folder) => folder.id === id)) {
    id = `${base}-${suffix}`
    suffix += 1
  }

  state.folders.push({
    id,
    name: cleanName,
    color: FOLDER_COLORS[state.folders.length % FOLDER_COLORS.length]
  })
  state.deletedFolderIds = state.deletedFolderIds.filter((deleted) => deleted !== id)
  notify('folder-create')
  return id
}

export function setPalettes(updates) {
  let changed = false

  for (const [id, palette] of Object.entries(updates)) {
    const image = state.images.find((entry) => entry.id === id)
    if (!image || image.palette || !Array.isArray(palette)) continue
    image.palette = palette
    changed = true
  }

  if (!changed) return

  syncActiveWithVisible()
  notify('palettes')
}

export function addImages(images) {
  if (!images.length) return
  state.images = [...images, ...state.images]
  state.activeImageId = images[0].id
  state.selectedIds = []
  notify('upload')
}

export function setSidebarOpen(open) {
  state.sidebarOpen = Boolean(open)
  notify('ui')
}

export function setSidebarCollapsed(collapsed) {
  state.sidebarCollapsed = Boolean(collapsed)
  notify('ui')
}

export function setInspectorOpen(open) {
  state.inspectorOpen = Boolean(open)
  notify('ui')
}

export function setInspectorDrawer(open) {
  state.inspectorDrawer = Boolean(open)
  notify('ui')
}

export function closeOverlays() {
  if (!state.sidebarOpen && !state.inspectorDrawer) return
  state.sidebarOpen = false
  state.inspectorDrawer = false
  notify('ui')
}

export async function initStore() {
  const saved = loadSavedState()

  if (saved) {
    state.deletedIds = Array.isArray(saved.deletedIds)
      ? [...new Set(saved.deletedIds)]
      : []
    state.deletedFolderIds = Array.isArray(saved.deletedFolderIds)
      ? [...new Set(saved.deletedFolderIds)]
      : []

    const deletedFolders = new Set(state.deletedFolderIds)
    state.folders = state.folders.filter((folder) => !deletedFolders.has(folder.id))

    if (Array.isArray(saved.folders) && saved.folders.length > 0) {
      const restored = saved.folders.filter(
        (folder) => !deletedFolders.has(folder.id)
      )
      const savedIds = new Set(restored.map((folder) => folder.id))
      const missing = seedFolders.filter(
        (folder) => !savedIds.has(folder.id) && !deletedFolders.has(folder.id)
      )
      state.folders = [...restored, ...missing]
    }

    if (saved.sort) state.sort = saved.sort
    if (saved.activeFolder) state.activeFolder = saved.activeFolder
    if (saved.activeImageId) state.activeImageId = saved.activeImageId
    if (typeof saved.inspectorOpen === 'boolean') state.inspectorOpen = saved.inspectorOpen
    if (typeof saved.sidebarCollapsed === 'boolean') {
      state.sidebarCollapsed = saved.sidebarCollapsed
    }

    if (saved.filters) {
      state.filters = {
        query: typeof saved.filters.query === 'string' ? saved.filters.query : '',
        colors: Array.isArray(saved.filters.colors) ? saved.filters.colors : [],
        formats: Array.isArray(saved.filters.formats) ? saved.filters.formats : [],
        tags: Array.isArray(saved.filters.tags) ? saved.filters.tags : []
      }
    }

    if (saved.view) {
      state.view = {
        layout: saved.view.layout === 'list' ? 'list' : 'grid',
        columns: Math.min(8, Math.max(3, Number(saved.view.columns) || 4)),
        gap: Math.min(48, Math.max(0, Number(saved.view.gap) || 0)),
        showMeta: saved.view.showMeta !== false
      }
    }

    const deleted = new Set(state.deletedIds)
    state.images = state.images.filter((image) => !deleted.has(image.id))

    const overrides = new Map(
      (saved.images ?? [])
        .filter((image) => !deleted.has(image.id))
        .map((image) => [image.id, image])
    )

    state.images = state.images.map((image) => {
      const override = overrides.get(image.id)
      if (!override) return image
      return {
        ...image,
        ...override,
        src: image.src,
        origin: 'seed'
      }
    })

    const uploadEntries = (saved.images ?? []).filter(
      (image) => image.origin === 'upload' && !deleted.has(image.id)
    )

    if (uploadEntries.length > 0) {
      const uploads = await getAllUploads().catch(() => [])
      const records = new Map(uploads.map((record) => [record.id, record]))

      for (const entry of uploadEntries) {
        const record = records.get(entry.id)
        if (!record?.blob) continue
        state.images.push({
          ...entry,
          src: URL.createObjectURL(record.blob),
          origin: 'upload'
        })
      }
    }

    if (Array.isArray(saved.orderIds)) {
      const byId = new Map(state.images.map((image) => [image.id, image]))
      const orderedIds = new Set(saved.orderIds)
      const ordered = saved.orderIds
        .map((id) => byId.get(id))
        .filter(Boolean)
      const rest = state.images.filter((image) => !orderedIds.has(image.id))
      state.images = [...ordered, ...rest]
    }
  }

  const validFolder =
    ['all', 'favorites', 'recent'].includes(state.activeFolder) ||
    Boolean(getFolder(state.activeFolder))

  if (!validFolder) state.activeFolder = 'all'

  if (!state.images.some((image) => image.id === state.activeImageId)) {
    state.activeImageId = state.images[0]?.id ?? null
  }

  state.ready = true
  notify('init')
  return state
}
