"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar() {

  const [open, setOpen] = useState(false);

  return (
    <header
      className="
        fixed left-0 top-0 z-[999]
        w-full bg-white/90
        shadow backdrop-blur
      "
    >

      {/* ========================================= */}
      {/* CONTAINER */}
      {/* ========================================= */}

      <div
        className="
          mx-auto flex max-w-7xl
          items-center justify-between
           py-2
        "
      >

        {/* ========================================= */}
        {/* LOGO */}
        {/* ========================================= */}

        <a
          href="#top"
          className="flex items-center shadow-lg rounded-[10px] bg-white/80"
        >

          <Image
            src="/images/logo3.png" alt="Hutkarito Logo" width={240} height={80} priority className=" rounded-[10px] h-auto   w-[170px]   md:w-[240px] "
          />

        </a>

        {/* ========================================= */}
        {/* DESKTOP MENU */}
        {/* ========================================= */}

        <nav
          className="
            hidden items-center
            gap-6 font-semibold
            md:flex
          "
        >

          <a
            href="#products"
            className="
              transition
              hover:text-yellow-600
            "
          >
            პროდუქცია
          </a>

          <a
            href="#about"
            className="
              transition
              hover:text-yellow-600
            "
          >
            ჩვენ შესახებ
          </a>

          <a
            href="#news"
            className="
              transition
              hover:text-yellow-600
            "
          >
            სიახლეები
          </a>

          <a
            href="#contact"
            className="
              transition
              hover:text-yellow-600
            "
          >
            კონტაქტი
          </a>

          <a
            href="#contact"
            className="
              ml-4 rounded-[10px]
              bg-yellow-500
              px-5 py-2
              font-bold text-white
              transition
              hover:bg-yellow-600
            "
          >
            შეკვეთა
          </a>

        </nav>

        {/* ========================================= */}
        {/* MOBILE BURGER */}
        {/* ========================================= */}

        <button
          className="
            z-[1000]
            text-2xl
            md:hidden
          "
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>

      </div>

      {/* ========================================= */}
      {/* OVERLAY */}
      {/* ========================================= */}

      {open && (
        <div
          className="
            fixed inset-0
            z-[998]
            bg-black/30
          "
          onClick={() => setOpen(false)}
        />
      )}

      {/* ========================================= */}
      {/* MOBILE MENU */}
      {/* ========================================= */}

      <div
        className={`
          fixed left-0 top-[76px]
          z-[999]
          flex w-full flex-col
          gap-4 bg-white
          px-5 py-6
          font-semibold shadow-lg
          transition-all duration-300
          md:hidden

          ${
            open
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-5 opacity-0"
          }
        `}
      >

        <a
          href="#products"
          onClick={() => setOpen(false)}
        >
          პროდუქცია
        </a>

        <a
          href="#about"
          onClick={() => setOpen(false)}
        >
          ჩვენ შესახებ
        </a>

        <a
          href="#news"
          onClick={() => setOpen(false)}
        >
          სიახლეები
        </a>

        <a
          href="#contact"
          onClick={() => setOpen(false)}
        >
          კონტაქტი
        </a>

        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="
            mt-3 rounded-[10px]
            bg-yellow-500
            px-5 py-3
            text-center
            font-bold text-white
          "
        >
          შეკვეთა
        </a>

      </div>

    </header>
  );
}