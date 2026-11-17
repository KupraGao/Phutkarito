"use client";

import { createElement, useEffect, useState, type ReactNode } from "react";
import { assetExists, knownAsset, loadModelViewer } from "./assets";

type Mode = "fallback" | "image" | "model";

type Props = {
  model?: string;
  image?: string;
  alt: string;
  className?: string;
  dimensional?: boolean;
  children: ReactNode;
};

function ModelView({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return createElement("model-viewer", {
    src,
    alt,
    className,
    loading: "eager",
    reveal: "auto",
    exposure: "1.05",
    "interaction-prompt": "none",
    "shadow-intensity": "0.85",
    "camera-orbit": "0deg 78deg 108%",
    "disable-zoom": true,
    style: { width: "100%", height: "100%", background: "transparent", pointerEvents: "none" },
  });
}

export function VisualSlot({ model, image, alt, className, dimensional = false, children }: Props) {
  const knownModel = dimensional && model ? knownAsset(model) : undefined;
  const knownImage = image ? knownAsset(image) : undefined;
  const initial: Mode = knownModel ? "model" : knownImage ? "image" : "fallback";
  const [mode, setMode] = useState<Mode>(initial);

  useEffect(() => {
    let live = true;

    async function resolve() {
      if (dimensional && model) {
        const exists = await assetExists(model);
        if (!live) return;
        if (exists) {
          try {
            await loadModelViewer();
            if (live) setMode("model");
            return;
          } catch {
            if (!live) return;
          }
        }
      }

      if (image) {
        const exists = await assetExists(image);
        if (!live) return;
        if (exists) {
          setMode("image");
          return;
        }
      }

      if (live) setMode("fallback");
    }

    void resolve();
    return () => {
      live = false;
    };
  }, [dimensional, image, model]);

  if (mode === "model" && model) {
    return <ModelView src={model} alt={alt} className={className} />;
  }

  if (mode === "image" && image) {
    return <img src={image} alt={alt} className={className} draggable={false} />;
  }

  return children;
}
