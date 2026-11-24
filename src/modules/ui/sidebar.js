import { getCounts, getState, getTags, getTotalBytes } from "../store.js";
import { escapeHtml, formatBytes, formatNumber } from "../utils.js";
import { exportSectionTemplate } from "./sidebar-export.js";

const sectionState = {
  folders: true,
  tags: false,
  export: false,
};

const sectionTouched = new Set();

/* The label is visible while the sidebar is expanded; collapsed, only the icon
   remains, so the summary carries its own tooltip and accessible name. */
function summaryAttributes(label) {
  return `aria-label="${label}" data-tooltip="${label}"`;
}

function summaryTemplate(icon, label, extra = "") {
  return `
    <svg class="icon" aria-hidden="true"><use href="#icon-${icon}"></use></svg>
    <span class="sidebar__summary-label">${label}</span>
    ${extra}
    <svg class="sidebar__chevron icon" aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
  `;
}

function openAttribute(id) {
  return sectionState[id] ? "open" : "";
}

function captureSectionState(root) {
  root.querySelectorAll("[data-section]").forEach((details) => {
    sectionState[details.dataset.section] = details.open;
  });
}

function navItem(state, id, label, icon, count) {
  const active = state.activeFolder === id;

  return `
    <button
      class="nav-item${active ? " is-active" : ""}"
      type="button"
      data-action="folder"
      data-folder="${id}"
      data-focus-key="folder-${id}"
      data-tooltip="${
        id === "all" ? "Ver toda la biblioteca" : "Ver solo las imágenes marcadas como favoritas"
      }"
      ${active ? 'aria-current="page"' : ""}
    >
      <svg class="icon" aria-hidden="true"><use href="#icon-${icon}"></use></svg>
      <span class="nav-item__text">${label}</span>
      <span class="nav-item__count mono">${formatNumber(count)}</span>
    </button>
  `;
}

function folderItem(state, folder, count) {
  const active = state.activeFolder === folder.id;
  const name = escapeHtml(folder.name);
  const deletable = folder.id !== "inbox";

  return `
    <div class="folder-row">
      <div
        class="folder-item${active ? " is-active" : ""}"
        data-drop-folder="${escapeHtml(folder.id)}"
        style="--dot: ${escapeHtml(folder.color)}"
      >
        <button
          class="folder-item__open"
          type="button"
          data-action="folder"
          data-folder="${escapeHtml(folder.id)}"
          data-focus-key="folder-${escapeHtml(folder.id)}"
          data-tooltip="Abrir la carpeta ${name}"
          ${active ? 'aria-current="page"' : ""}
        >
          <span class="visually-hidden">Abrir la carpeta ${name}</span>
        </button>
        <span class="folder-item__dot" aria-hidden="true"></span>
        <button
          class="folder-item__name"
          type="button"
          data-action="rename-folder"
          data-folder="${escapeHtml(folder.id)}"
          data-focus-key="rename-folder-name-${escapeHtml(folder.id)}"
          aria-label="Renombrar la carpeta ${name}"
          data-tooltip="Renombrar carpeta"
        >${name}</button>
        <span class="folder-item__count mono" aria-hidden="true">${formatNumber(count)}</span>
      </div>
      <button
        class="folder-rename"
        type="button"
        data-action="rename-folder"
        data-folder="${escapeHtml(folder.id)}"
        data-focus-key="rename-folder-${escapeHtml(folder.id)}"
        aria-label="Renombrar la carpeta ${name}"
        data-tooltip="Renombrar carpeta"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-pencil"></use></svg>
      </button>
      ${
        deletable
          ? `
            <button
              class="folder-delete"
              type="button"
              data-action="delete-folder"
              data-folder="${escapeHtml(folder.id)}"
              data-focus-key="delete-folder-${escapeHtml(folder.id)}"
              aria-label="Eliminar la carpeta ${name}"
              data-tooltip="Eliminar carpeta"
            >
              <svg class="icon" aria-hidden="true"><use href="#icon-trash"></use></svg>
            </button>
          `
          : ""
      }
    </div>
  `;
}

function tagsTemplate(state) {
  const tags = getTags(state.images);
  if (tags.length === 0) return "";

  const active = state.filters.tags;
  const open = sectionTouched.has("tags")
    ? sectionState.tags
    : sectionState.tags || active.length > 0;

  return `
    <details class="sidebar__section sidebar__section--nested" data-section="tags" ${open ? "open" : ""}>
      <summary class="sidebar__summary sidebar__summary--nested" ${summaryAttributes("Etiquetas")}>
        ${summaryTemplate(
          "tag",
          "Etiquetas",
          `<span class="sidebar__summary-count mono">${formatNumber(tags.length)}</span>`
        )}
      </summary>
      <div class="sidebar__section-body">
        <div class="tag-list" role="group" aria-label="Filtrar por etiquetas">
          ${tags
            .map(
              ({ tag, count }) => `
                <button
                  class="tag${active.includes(tag) ? " is-active" : ""}"
                  type="button"
                  data-action="toggle-tag"
                  data-tag="${escapeHtml(tag)}"
                  data-focus-key="tag-${escapeHtml(tag)}"
                  data-tooltip="${
                    active.includes(tag)
                      ? "Quitar el filtro por esta etiqueta"
                      : "Filtrar por esta etiqueta"
                  }"
                  aria-pressed="${active.includes(tag)}"
                >
                  ${escapeHtml(tag)}
                  <span class="mono">${formatNumber(count)}</span>
                </button>
              `
            )
            .join("")}
        </div>
      </div>
    </details>
  `;
}

export function renderSidebar(root) {
  captureSectionState(root);

  const state = getState();
  const counts = getCounts(state);
  const totalBytes = getTotalBytes(state.images);

  const folders = state.folders
    .map((folder) => folderItem(state, folder, counts.folders[folder.id] ?? 0))
    .join("");

  root.innerHTML = `
    <div class="brand">
      <span class="brand__mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
      <span class="brand__text">
        <strong>PicGallery</strong>
      </span>
      <button
        class="sidebar__close"
        type="button"
        data-action="close-sidebar"
        aria-label="Cerrar menú de navegación"
        data-tooltip="Cerrar menú"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-close"></use></svg>
      </button>
    </div>

    <nav class="sidebar__nav" aria-label="Biblioteca">
      ${navItem(state, "all", "Todas las imágenes", "grid", counts.total)}
      ${navItem(state, "favorites", "Favoritos", "star", counts.favorites)}
    </nav>

    <details class="sidebar__section" data-section="folders" ${openAttribute("folders")}>
      <summary class="sidebar__summary" ${summaryAttributes("Carpetas")}>
        ${summaryTemplate("folder", "Carpetas")}
      </summary>
      <div class="sidebar__section-body">
        <div class="sidebar__section-head">
          <button
            class="icon-btn icon-btn--dark icon-btn--pill"
            type="button"
            data-action="new-folder"
            data-focus-key="sidebar-new-folder"
          >
            <svg class="icon" aria-hidden="true"><use href="#icon-plus"></use></svg>
            <span>Crear carpeta</span>
          </button>
        </div>
        <div class="sidebar__folders">${folders}</div>
        ${tagsTemplate(state)}
      </div>
    </details>

    ${exportSectionTemplate(state)}

    <div class="sidebar__foot">
      <button
        class="sidebar__settings"
        type="button"
        data-action="open-settings"
        data-focus-key="sidebar-settings"
        data-tooltip="Abrir ajustes de vista"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-sliders"></use></svg>
        <span>Ajustes</span>
      </button>
    </div>
  `;

  root.querySelectorAll("[data-section]").forEach((details) => {
    details.addEventListener("toggle", () => {
      sectionTouched.add(details.dataset.section);
      sectionState[details.dataset.section] = details.open;
    });
  });
}
