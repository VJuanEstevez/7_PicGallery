import { escapeHtml } from './utils.js'

let region = null

function getRegion() {
  if (!region) region = document.getElementById('toast-region')
  return region
}

export function toast(message, options = {}) {
  const { type = 'info', icon = 'check' } = options
  const container = getRegion()
  if (!container) return

  const element = document.createElement('div')
  element.className = `toast toast--${type}`
  element.innerHTML = `
    <svg class="icon" aria-hidden="true"><use href="#icon-${icon}"></use></svg>
    <span>${escapeHtml(message)}</span>
  `

  container.append(element)

  window.setTimeout(() => {
    element.classList.add('is-leaving')
    window.setTimeout(() => element.remove(), 220)
  }, 2800)
}
