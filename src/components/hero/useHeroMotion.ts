"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { sceneFor, sceneVars } from "./scenes";

type Go = (next: number, direction: number) => void;

function prefersReduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function finePointer() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function useHeroMotion(
  rootRef: RefObject<HTMLElement | null>,
  spinRef: RefObject<HTMLElement | null>,
  floatRef: RefObject<HTMLElement | null>,
  parallaxRef: RefObject<HTMLElement | null>,
  copyRef: RefObject<HTMLElement | null>,
  cardsRef: RefObject<HTMLElement | null>,
  indexRef: RefObject<number>,
  count: number,
  index: number,
  setIndex: (index: number) => void,
) {
  const goRef = useRef<Go>(() => {});
  const pausedRef = useRef(false);
  const setPausedRef = useRef<(paused: boolean) => void>(() => {});

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const spin = spinRef.current;
      const floater = floatRef.current;
      const parallax = parallaxRef.current;
      const copy = copyRef.current;
      const cards = cardsRef.current;
      let floatTween: gsap.core.Tween | null = null;
      let switchTween: gsap.core.Timeline | null = null;
      let busy = false;
      const reduced = prefersReduced();
      const fine = finePointer();

      const paint = (index: number, duration: number) => {
        gsap.to(document.documentElement, {
          ...sceneVars(sceneFor(index)),
          duration,
          ease: "power2.inOut",
          overwrite: "auto",
        });
      };

      if (!reduced && spin && copy && cards) {
        const active = root.querySelectorAll<HTMLElement>('[data-ornament][data-on="true"] [data-pop]');
        gsap.set(active, { scale: 0.45, rotation: -8 });
        gsap.set(copy, { opacity: 0, y: 28 });
        gsap.set(cards, { opacity: 0, y: 24 });
        gsap.set(spin, { opacity: 0, y: 18, scale: 0.98 });

        const entrance = gsap.timeline({
          onComplete: () => {
            if (floater && !pausedRef.current) {
              floatTween = gsap.to(floater, {
                y: -16,
                duration: 2.8,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
              });
            }
          },
        });

        entrance.to(spin, { opacity: 1, y: 0, scale: 1, duration: 0.68, ease: "power2.out" }, 0.08);
        entrance.to(active, { scale: 1, rotation: 0, stagger: 0.045, duration: 0.7, ease: "back.out(1.5)" }, 0.28);
        entrance.to(copy, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.24);
        entrance.to(cards, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 0.36);
      }

      const movers = gsap.utils.toArray<HTMLElement>("[data-depth]", root).map((element) => ({
        element,
        depth: Number(element.dataset.depth) || 0,
        layer: element.dataset.layer || "mid",
        x: gsap.quickTo(element, "x", { duration: 0.7, ease: "power3.out" }),
        y: gsap.quickTo(element, "y", { duration: 0.7, ease: "power3.out" }),
      }));
      const productX = parallax ? gsap.quickTo(parallax, "x", { duration: 0.8, ease: "power3.out" }) : null;
      const productY = parallax ? gsap.quickTo(parallax, "y", { duration: 0.8, ease: "power3.out" }) : null;
      const productR = parallax ? gsap.quickTo(parallax, "rotation", { duration: 0.8, ease: "power3.out" }) : null;

      let px = 0;
      let py = 0;
      let scroll = 0;
      let cursorX = 0;
      let cursorY = 0;
      let pointing = false;
      let frame = 0;

      const apply = () => {
        frame = 0;
        if (reduced || pausedRef.current) return;
        const box = root.getBoundingClientRect();
        movers.forEach((mover) => {
          let pushX = 0;
          let pushY = 0;
          if (pointing && fine) {
            const centerX = mover.element.offsetLeft + mover.element.offsetWidth / 2;
            const centerY = mover.element.offsetTop + mover.element.offsetHeight / 2;
            const dx = centerX - (cursorX - box.left);
            const dy = centerY - (cursorY - box.top);
            const distance = Math.hypot(dx, dy) || 1;
            const radius = mover.layer === "front" ? 160 : 110;
            if (distance < radius) {
              const force = (radius - distance) / radius;
              const reach = mover.layer === "front" ? 72 : 34;
              pushX = (dx / distance) * force * reach;
              pushY = (dy / distance) * force * reach * 0.75;
            }
          }
          const scrollShift =
            mover.layer === "back" ? scroll * 42 : mover.layer === "front" ? scroll * -22 : scroll * 12;
          mover.x(px * mover.depth + pushX);
          mover.y(py * mover.depth * 0.55 + scrollShift + pushY);
        });
        if (fine && productX && productY && productR) {
          productX(px * 20);
          productY(py * 12 + scroll * 10);
          productR(px * 2.4);
        }
      };

      const requestApply = () => {
        if (frame) return;
        frame = window.requestAnimationFrame(apply);
      };

      const onMove = (event: PointerEvent) => {
        if (reduced || !fine || pausedRef.current) return;
        const box = root.getBoundingClientRect();
        px = (event.clientX - box.left) / box.width - 0.5;
        py = (event.clientY - box.top) / box.height - 0.5;
        cursorX = event.clientX;
        cursorY = event.clientY;
        pointing = true;
        requestApply();
      };

      const onScroll = () => {
        if (reduced || pausedRef.current) return;
        scroll = Math.min(1, Math.max(0, window.scrollY / root.offsetHeight));
        requestApply();
      };

      const onVisibility = () => {
        const hidden = document.hidden || root.dataset.live === "false";
        if (hidden || pausedRef.current) {
          floatTween?.pause();
        } else if (!reduced) {
          floatTween?.play();
        }
      };

      const observer = new IntersectionObserver(
        ([entry]) => {
          root.dataset.live = entry.isIntersecting ? "true" : "false";
          onVisibility();
        },
        { threshold: 0.12 },
      );
      observer.observe(root);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);

      setPausedRef.current = (paused) => {
        pausedRef.current = paused;
        root.dataset.paused = paused ? "true" : "false";
        if (paused || reduced) {
          floatTween?.pause();
          gsap.to(movers.map((mover) => mover.element), { x: 0, y: 0, duration: 0.35, overwrite: "auto" });
          if (parallax) gsap.to(parallax, { x: 0, y: 0, rotation: 0, duration: 0.35, overwrite: "auto" });
          return;
        }
        floatTween?.play();
      };

      goRef.current = (next, direction) => {
        if (busy || next === indexRef.current || next < 0 || next >= count) return;
        const instant = reduced || pausedRef.current;
        if (instant) {
          setIndex(next);
          paint(next, reduced ? 0 : 0.35);
          return;
        }
        if (!spin) {
          setIndex(next);
          paint(next, 0.6);
          return;
        }

        busy = true;
        paint(next, 0.75);
        const leaving = root.querySelectorAll<HTMLElement>('[data-ornament][data-on="true"] [data-pop]');
        switchTween?.kill();
        gsap.killTweensOf(spin);
        const offset = direction < 0 ? -14 : 14;
        switchTween = gsap.timeline({
          onComplete: () => {
            busy = false;
          },
        });
        switchTween
          .to(spin, { opacity: 0, x: -offset, duration: 0.18, ease: "power2.in" }, 0)
          .to(leaving, { scale: 0.88, duration: 0.18, ease: "power2.in" }, 0)
          .call(() => setIndex(next))
          .set(spin, { x: offset, y: 0, scale: 0.99 })
          .to(spin, { opacity: 1, x: 0, scale: 1, duration: 0.38, ease: "power2.out" }, "+=0.04");
      };

      return () => {
        observer.disconnect();
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("scroll", onScroll);
        document.removeEventListener("visibilitychange", onVisibility);
        if (frame) cancelAnimationFrame(frame);
      };
    }, root);

    return () => {
      ctx.revert();
      const rootStyle = document.documentElement.style;
      Object.keys(sceneVars(sceneFor(0))).forEach((key) => rootStyle.removeProperty(key));
    };
  }, [cardsRef, copyRef, count, floatRef, indexRef, parallaxRef, rootRef, setIndex, spinRef]);

  const burstReady = useRef(false);
  useLayoutEffect(() => {
    if (!burstReady.current) {
      burstReady.current = true;
      return;
    }
    const root = rootRef.current;
    if (!root || prefersReduced() || pausedRef.current) return;
    const entering = root.querySelectorAll<HTMLElement>('[data-ornament][data-on="true"] [data-pop]');
    gsap.fromTo(
      entering,
      { scale: 0.35, rotation: 16 },
      { scale: 1, rotation: 0, duration: 0.55, stagger: 0.04, ease: "back.out(1.7)" },
    );
  }, [index, rootRef]);

  return {
    go: (next: number, direction = 1) => goRef.current(next, direction),
    setPaused: (paused: boolean) => setPausedRef.current(paused),
  };
}
