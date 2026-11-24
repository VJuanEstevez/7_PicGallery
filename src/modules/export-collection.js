import { getFolderImages, getFolderTitle, getState } from "./store.js";
import { slugify } from "./utils.js";
import { createZip } from "./zip.js";
import { toast } from "./toast.js";
import { downloadBlob, extensionFor, fetchImageBytes, safeSegment } from "./export/shared.js";

const MAX_CONCURRENT = 4;

let busy = false;

/**
 * Download the active folder (or library view) as a ZIP containing a single
 * root folder with its images, ignoring the current search and filters.
 */
export async function downloadCollection() {
  if (busy) return;

  const state = getState();
  const images = getFolderImages(state);

  if (images.length === 0) {
    toast("Esta vista no contiene imágenes para exportar", {
      type: "error",
      icon: "info",
    });
    return;
  }

  busy = true;
  const button = document.querySelector('[data-action="download-collection"]');
  if (button) {
    button.disabled = true;
    button.setAttribute("aria-busy", "true");
  }

  const folderName = safeSegment(getFolderTitle(state.activeFolder), "Colección");
  const order = new Map(images.map((image, index) => [image.id, index]));
  const queue = [...images];
  const results = [];
  const failed = [];

  try {
    const worker = async () => {
      while (queue.length > 0) {
        const image = queue.shift();
        try {
          results.push({ image, data: await fetchImageBytes(image) });
        } catch {
          failed.push(image);
        }
      }
    };

    await Promise.all(
      Array.from({ length: Math.min(MAX_CONCURRENT, queue.length) }, () => worker())
    );

    results.sort((first, second) => order.get(first.image.id) - order.get(second.image.id));

    if (results.length === 0) throw new Error("No image could be read");

    const used = new Set();
    const files = results.map(({ image, data }) => {
      const base = slugify(image.title) || "imagen";
      const extension = extensionFor(image);
      let name = `${base}.${extension}`;
      let suffix = 2;

      while (used.has(name.toLowerCase())) {
        name = `${base}-${suffix}.${extension}`;
        suffix += 1;
      }

      used.add(name.toLowerCase());
      return { name: `${folderName}/${name}`, data };
    });

    const blob = createZip(files);
    await downloadBlob(blob, `${slugify(folderName) || "coleccion"}.zip`);

    toast(
      failed.length > 0
        ? `${results.length} de ${images.length} imágenes exportadas`
        : results.length === 1
          ? `${folderName}.zip descargado`
          : `${folderName}.zip descargado con ${results.length} imágenes`
    );

    if (failed.length > 0) {
      toast("Algunas imágenes no se pudieron leer", { type: "error", icon: "info" });
    }
  } catch {
    toast("No se pudo exportar la colección", { type: "error", icon: "info" });
  } finally {
    busy = false;
    if (button?.isConnected) {
      button.disabled = false;
      button.removeAttribute("aria-busy");
    }
  }
}
