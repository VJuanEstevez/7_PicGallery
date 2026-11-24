import { toast } from "./toast.js";

let deferredPrompt = null;

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
}

export function initPwa() {
  registerServiceWorker();

  const button = document.getElementById("install-app");
  if (!button || isStandalone()) return;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    button.hidden = false;
  });

  button.addEventListener("click", async () => {
    if (!deferredPrompt) return;

    const prompt = deferredPrompt;
    deferredPrompt = null;
    prompt.prompt();

    try {
      const { outcome } = await prompt.userChoice;
      if (outcome === "accepted") toast("Aplicación instalada");
    } catch {
      // The browser may dismiss the prompt without a choice.
    }
    button.hidden = true;
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    button.hidden = true;
  });
}
