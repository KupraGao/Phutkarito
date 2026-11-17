"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";

const links = [
  { href: "#products", label: "პროდუქცია" },
  { href: "#about", label: "ჩვენ შესახებ" },
  { href: "#news", label: "სიახლეები" },
  { href: "#contact", label: "კონტაქტი" },
];

function pull(event: React.PointerEvent<HTMLElement>) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const surface = event.currentTarget.querySelector<HTMLElement>("[data-magnet]");
  if (!surface) return;
  const box = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - box.left - box.width / 2) * 0.18;
  const y = (event.clientY - box.top - box.height / 2) * 0.28;
  surface.style.transform = `translate(${x}px, ${y}px)`;
}

function release(event: React.PointerEvent<HTMLElement>) {
  const surface = event.currentTarget.querySelector<HTMLElement>("[data-magnet]");
  if (surface) surface.style.transform = "";
}

export default function Navbar({ article = false }: { article?: boolean }) {
  const home = article ? "/" : "";
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("home");
      if (!hero) {
        setSolid(true);
        return;
      }
      setSolid(window.scrollY > hero.offsetHeight * 0.62);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 860px)");
    const onChange = () => {
      if (!media.matches) setOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!open || !header) return;
    const previousOverflow = document.body.style.overflow;
    const siblings = [...(header.parentElement?.children ?? [])].filter((node) => node !== header);
    siblings.forEach((node) => node.setAttribute("inert", ""));
    document.body.style.overflow = "hidden";
    const panel = document.getElementById("site-menu");
    const focusable = panel?.querySelectorAll<HTMLElement>("a, button");
    focusable?.[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const items = [buttonRef.current, ...panel.querySelectorAll<HTMLElement>("a, button")].filter(
        (node): node is HTMLElement => Boolean(node),
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      siblings.forEach((node) => node.removeAttribute("inert"));
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function close() {
    setOpen(false);
  }

  return (
    <header
      ref={headerRef}
      className={styles.header}
      data-solid={article || solid ? "true" : "false"}
      data-open={open ? "true" : "false"}
    >
      <a className={styles.skip} href={article ? "#article" : "#home"}>
        მთავარ ეკრანზე გადასვლა
      </a>
      <div className={styles.bar}>
        <a className={styles.logo} href={`${home}#top`} aria-label="ფუტკარიტო, Phutkarito">
          <Image src="/images/logo3.png" alt="" width={1439} height={605} priority className={styles.logoImg} />
        </a>

        <nav className={styles.links} aria-label="მთავარი">
          {links.map((link) => (
            <a key={link.href} className={styles.link} href={`${home}${link.href}`}>
              {link.label}
            </a>
          ))}
          <a className={styles.order} href={`${home}#contact`} onPointerMove={pull} onPointerLeave={release}>
            <span className={styles.magnet} data-magnet="">
              შეკვეთა
            </span>
          </a>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className={styles.srOnly}>{open ? "მენიუს დახურვა" : "მენიუს გახსნა"}</span>
          {open ? (
            <svg className={styles.icon} width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              <path d="M5 5l12 12M17 5L5 17" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          ) : (
            <svg className={styles.icon} width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              <path d="M3 6h16M3 11h16M3 16h16" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          )}
        </button>
      </div>

      <nav id="site-menu" className={styles.panel} hidden={!open} aria-label="მობილური">
        {links.map((link) => (
          <a key={link.href} className={styles.panelLink} href={`${home}${link.href}`} onClick={close}>
            {link.label}
          </a>
        ))}
        <a className={styles.panelOrder} href={`${home}#contact`} onClick={close}>
          შეკვეთა
        </a>
      </nav>
    </header>
  );
}
