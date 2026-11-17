"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { products } from "../data/site";
import { sceneFor } from "./hero/scenes";
import { useHeroMotion } from "./hero/useHeroMotion";
import { VisualSlot } from "./hero/VisualSlot";
import styles from "./Hero.module.css";

const pieces = [
  { id: "dipper", place: "dipper", layer: "front", depth: 20, bob: true, image: "/images/hero-dipper.webp", node: null },
  { id: "bee", place: "bee", layer: "back", depth: 32, bob: true, image: "/images/hero-bee.webp", node: null },
  { id: "linden", place: "linden", layer: "back", depth: 28, bob: true, image: "/images/hero-linden.webp", node: null },
] as const;

const places = {
  dipper: styles.dipper,
  bee: styles.bee,
  linden: styles.linden,
} as const;

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const spinRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const swipeRef = useRef<{ x: number; y: number } | null>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  indexRef.current = index;

  const motion = useHeroMotion(
    rootRef,
    spinRef,
    floatRef,
    parallaxRef,
    copyRef,
    cardsRef,
    indexRef,
    products.length,
    index,
    setIndex,
  );
  const scene = sceneFor(index);
  const product = products[index] ?? products[0];

  function select(next: number, direction = 1) {
    const wrapped = (next + products.length) % products.length;
    motion.go(wrapped, direction);
  }

  function onKeys(event: React.KeyboardEvent<HTMLDivElement>) {
    const key = event.key;
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(key)) return;
    event.preventDefault();
    const direction = key === "ArrowLeft" || key === "End" ? -1 : 1;
    const next = key === "Home" ? 0 : key === "End" ? products.length - 1 : index + direction;
    select(next, key === "ArrowLeft" ? -1 : 1);
    const buttons = event.currentTarget.querySelectorAll("button");
    const wrapped = key === "Home" ? 0 : key === "End" ? products.length - 1 : (next + products.length) % products.length;
    buttons[wrapped]?.focus();
  }

  function onPointerDown(event: React.PointerEvent<HTMLElement>) {
    if ((event.target as HTMLElement).closest("a, button")) return;
    swipeRef.current = { x: event.clientX, y: event.clientY };
  }

  function onPointerUp(event: React.PointerEvent<HTMLElement>) {
    const start = swipeRef.current;
    swipeRef.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 64 || Math.abs(dx) < Math.abs(dy) * 1.3) return;
    select(indexRef.current + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  }

  function pull(event: React.PointerEvent<HTMLElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const surface = event.currentTarget.querySelector<HTMLElement>("[data-magnet]");
    if (!surface) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left - box.width / 2) * 0.2;
    const y = (event.clientY - box.top - box.height / 2) * 0.32;
    surface.style.transform = `translate(${x}px, ${y}px)`;
  }

  function release(event: React.PointerEvent<HTMLElement>) {
    const surface = event.currentTarget.querySelector<HTMLElement>("[data-magnet]");
    if (surface) surface.style.transform = "";
  }

  return (
    <section
      id="home"
      ref={rootRef}
      className={styles.stage}
      data-scene={scene.id}
      data-live="true"
      data-paused={paused ? "true" : "false"}
      data-enter=""
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className={`${styles.ornament} ${places[piece.place]} ${piece.layer === "front" ? styles.front : styles.back}`}
          data-ornament=""
          data-on={scene.ornaments.includes(piece.id) ? "true" : "false"}
          data-depth={piece.depth}
          data-layer={piece.layer}
          aria-hidden="true"
        >
          <div data-pop="" className={styles.pop}>
            <div className={piece.bob ? styles.bob : undefined} style={{ animationDelay: piece.bob ? `${piece.depth * -40}ms` : undefined }}>
              <VisualSlot image={piece.image} alt="">
                {piece.node}
              </VisualSlot>
            </div>
          </div>
        </div>
      ))}

      <div className={styles.centerLayer}>
        <div className={styles.anchor}>
          <div className={styles.shadow} aria-hidden="true" />
          <div ref={parallaxRef} className={styles.parallax}>
            <div ref={floatRef} className={styles.floater}>
              <div ref={spinRef} className={styles.spin}>
                {scene.visual === "jar" ? (
                  <div className={styles.labeledJar}>
                    <Image
                      src="/images/honey-hero-tall.webp"
                      alt=""
                      fill
                      sizes="(max-width: 768px) 80vw, 480px"
                      style={{ objectFit: "contain" }}
                      draggable={false}
                      priority
                    />
                    <Image
                      src="/images/logo3.png"
                      alt=""
                      width={1439}
                      height={605}
                      className={styles.jarLabel}
                      draggable={false}
                    />
                  </div>
                ) : (
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes="(max-width: 899px) 74vw, 600px"
                    style={{ objectFit: "contain" }}
                    draggable={false}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          className={styles.pause}
          aria-pressed={paused}
          aria-label={paused ? "ანიმაციის გაშვება" : "ანიმაციის შეჩერება"}
          onClick={() => {
            const next = !paused;
            setPaused(next);
            motion.setPaused(next);
          }}
        >
          {paused ? (
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M5 3.5v9l8-4.5-8-4.5z" fill="currentColor" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4 3h3v10H4zM9 3h3v10H9z" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>

      <div className={styles.copyWrap} ref={copyRef}>
        <div className={styles.copy} id="product-panel" role="tabpanel" aria-labelledby={`product-tab-${index}`}>
          <div key={product.name}>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.body}>{product.description}</p>
            <p className={styles.meta}>
              {product.volume}
              <span aria-hidden="true"> · </span>
              {product.price}
            </p>
          </div>
          <div className={styles.actions}>
            <a className={styles.primary} href="#products" onPointerMove={pull} onPointerLeave={release}>
              <span className={styles.magnet} data-magnet="">
                პროდუქციის ნახვა
              </span>
            </a>
            <a className={styles.quiet} href="#news">
              სიახლეების წაკითხვა
            </a>
          </div>
        </div>
      </div>

      <div className={styles.dock} ref={cardsRef}>
        <div className={styles.switcher} role="tablist" aria-label="პროდუქცია" onKeyDown={onKeys}>
          {products.map((item, itemIndex) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              className={styles.tab}
              id={`product-tab-${itemIndex}`}
              aria-selected={itemIndex === index}
              aria-controls="product-panel"
              tabIndex={itemIndex === index ? 0 : -1}
              onClick={() => select(itemIndex, itemIndex >= index ? 1 : -1)}
            >
              <span className={styles.thumb} style={{ position: "relative" }}>
                <Image src={item.image} alt="" fill sizes="72px" className={styles.thumbImg} />
              </span>
              <span className={styles.tabCopy}>
                <span className={styles.tabName}>{item.name}</span>
                <span className={styles.tabMeta}>{item.volume}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
