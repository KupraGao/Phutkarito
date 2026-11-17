const ready = new Map<string, boolean>();
const pending = new Map<string, Promise<boolean>>();

export function knownAsset(src: string) {
  return ready.get(src);
}

export function assetExists(src: string) {
  const cached = pending.get(src);
  if (cached) return cached;

  const request = fetch(src, { method: "GET", headers: { Range: "bytes=0-0" } })
    .then((response) => {
      const ok = response.ok;
      ready.set(src, ok);
      return ok;
    })
    .catch(() => {
      ready.set(src, false);
      return false;
    });

  pending.set(src, request);
  return request;
}

let viewer: Promise<void> | null = null;

export function loadModelViewer() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.customElements?.get("model-viewer")) return Promise.resolve();
  if (!viewer) {
    viewer = import("@google/model-viewer/dist/model-viewer.min.js")
      .then(() => undefined)
      .catch((error: unknown) => {
        viewer = null;
        throw error;
      });
  }
  return viewer;
}
