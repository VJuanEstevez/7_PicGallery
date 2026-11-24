import { extensionOf } from "../utils.js";

export function extensionFor(image) {
  const format = String(image.format ?? "").toUpperCase();

  if (format === "PNG") return "png";
  if (format === "WEBP") return "webp";
  if (format === "JPEG" || format === "JPG") return "jpg";

  return extensionOf(image.src);
}

export function safeSegment(value, fallback) {
  const clean = String(value)
    .replace(/[\\/:*?"<>|]+/g, "-")
    .replace(/\s+/g, " ")
    .trim();

  return clean || fallback;
}

export function shuffle(items) {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    const current = result[index];
    result[index] = result[other];
    result[other] = current;
  }

  return result;
}

export async function fetchImageBytes(image) {
  const response = await fetch(image.src);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return new Uint8Array(await response.arrayBuffer());
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.rel = "noopener";

  document.body.append(link);
  link.click();
  link.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function base64ToBytes(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

export async function imageToJpegBytes(bytes, quality = 0.88, targetRatio = 0) {
  const bitmap = await createImageBitmap(new Blob([bytes]));
  let sourceWidth = bitmap.width;
  let sourceHeight = bitmap.height;
  let sourceX = 0;
  let sourceY = 0;

  if (targetRatio > 0) {
    const ratio = sourceWidth / sourceHeight;
    if (ratio > targetRatio) {
      sourceWidth = sourceHeight * targetRatio;
      sourceX = (bitmap.width - sourceWidth) / 2;
    } else {
      sourceHeight = sourceWidth / targetRatio;
      sourceY = (bitmap.height - sourceHeight) / 2;
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(sourceWidth));
  canvas.height = Math.max(1, Math.round(sourceHeight));

  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(
    bitmap,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    canvas.width,
    canvas.height
  );
  bitmap.close?.();

  return base64ToBytes(canvas.toDataURL("image/jpeg", quality).split(",")[1]);
}

export async function loadImageElement(bytes) {
  const url = URL.createObjectURL(new Blob([bytes]));
  const element = new Image();
  element.src = url;
  await element.decode();
  return { element, url };
}
