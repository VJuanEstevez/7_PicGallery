import { getFolderImages } from '../store.js'
import { formatNumber } from '../utils.js'

export function exportSectionTemplate(state) {
  const count = getFolderImages(state).length

  return `
    <details class="sidebar__section sidebar__section--export" data-section="export">
      <summary class="sidebar__summary" aria-label="Exportar" data-tooltip="Exportar">
        <svg class="icon" aria-hidden="true"><use href="#icon-download"></use></svg>
        <span class="sidebar__summary-label">Exportar</span>
        <svg class="sidebar__chevron icon" aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
      </summary>
      <div class="sidebar__section-body">
        <div class="export-menu">
          <button
            class="export-option"
            type="button"
            data-action="download-collection"
            data-focus-key="sidebar-export-zip"
            data-tooltip="Descargar un ZIP con las imágenes originales"
          >
            <svg class="icon" aria-hidden="true"><use href="#icon-download"></use></svg>
            <span class="nav-item__text">ZIP</span>
            <small class="export-option__hint">Originales</small>
          </button>
          <button
            class="export-option"
            type="button"
            data-action="export-pdf"
            data-focus-key="sidebar-export-pdf"
            data-tooltip="Crear un PDF en cuadrícula"
          >
            <svg class="icon" aria-hidden="true"><use href="#icon-document"></use></svg>
            <span class="nav-item__text">PDF</span>
            <small class="export-option__hint">Cuadrícula</small>
          </button>
          <button
            class="export-option"
            type="button"
            data-action="export-video"
            data-focus-key="sidebar-export-video"
            data-tooltip="Crear una presentación en vídeo"
          >
            <svg class="icon" aria-hidden="true"><use href="#icon-film"></use></svg>
            <span class="nav-item__text">Vídeo</span>
            <small class="export-option__hint">Polaroids</small>
          </button>
        </div>
        <p class="export-menu__note">
          Se exportarán las ${formatNumber(count)} ${count === 1 ? 'imagen' : 'imágenes'} de la carpeta activa.
        </p>
      </div>
    </details>
  `
}
