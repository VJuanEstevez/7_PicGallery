import { getFolder, getState, moveImages, reorderImages } from './store.js'
import { toast } from './toast.js'

let dragIds = []

function clearDropClasses() {
  document.querySelectorAll('.is-drop-target').forEach((element) => {
    element.classList.remove('is-drop-target')
  })

  document.querySelectorAll('.drop-before, .drop-after').forEach((element) => {
    element.classList.remove('drop-before', 'drop-after')
    delete element.dataset.dropPosition
  })
}

function cleanup() {
  clearDropClasses()
  document.querySelectorAll('.is-dragging').forEach((element) => {
    element.classList.remove('is-dragging')
  })
  document.body.classList.remove('is-dragging-cards')
  dragIds = []
}

export function initDragDrop() {
  document.addEventListener('dragstart', (event) => {
    const card = event.target.closest('[data-card-id]')
    if (!card) return

    const state = getState()
    const id = card.dataset.cardId
    const selected = state.selectedIds.includes(id)

    dragIds = selected && state.selectedIds.length > 1 ? [...state.selectedIds] : [id]

    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('application/x-picgallery', JSON.stringify(dragIds))
    event.dataTransfer.setData('text/plain', dragIds.join(','))

    card.classList.add('is-dragging')
    document.body.classList.add('is-dragging-cards')
  })

  document.addEventListener('dragend', cleanup)

  document.addEventListener('dragover', (event) => {
    if (dragIds.length === 0) return

    const folder = event.target.closest('[data-drop-folder]')
    if (folder) {
      event.preventDefault()
      event.dataTransfer.dropEffect = 'move'
      clearDropClasses()
      folder.classList.add('is-drop-target')
      return
    }

    const card = event.target.closest('[data-card-id]')
    if (!card || dragIds.includes(card.dataset.cardId)) return

    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    clearDropClasses()

    const bounds = card.getBoundingClientRect()
    const vertical = card.classList.contains('card--list')
    const position = vertical
      ? event.clientY < bounds.top + bounds.height / 2
        ? 'before'
        : 'after'
      : event.clientX < bounds.left + bounds.width / 2
        ? 'before'
        : 'after'

    card.classList.add(position === 'before' ? 'drop-before' : 'drop-after')
    card.dataset.dropPosition = position
  })

  document.addEventListener('dragleave', (event) => {
    const folder = event.target.closest('[data-drop-folder]')
    if (folder) folder.classList.remove('is-drop-target')
  })

  document.addEventListener('drop', (event) => {
    if (dragIds.length === 0) return

    const folder = event.target.closest('[data-drop-folder]')

    if (folder) {
      event.preventDefault()
      const folderId = folder.dataset.dropFolder
      const folderName = getFolder(folderId)?.name ?? 'la carpeta'
      const count = dragIds.length

      moveImages(dragIds, folderId)
      toast(
        count === 1
          ? `Imagen movida a ${folderName}`
          : `${count} imágenes movidas a ${folderName}`
      )
      cleanup()
      return
    }

    const card = event.target.closest('[data-card-id]')

    if (card?.dataset.dropPosition) {
      event.preventDefault()
      reorderImages(dragIds, card.dataset.cardId, card.dataset.dropPosition)
      cleanup()
    }
  })
}
