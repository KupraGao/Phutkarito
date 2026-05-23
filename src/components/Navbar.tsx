"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-[999] bg-white/90 backdrop-blur shadow">
      
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4">
        
        {/* 🔥 ლოგო */}
       <a
  href="#top"
  className="font-black text-xl text-yellow-500 hover:text-yellow-600 transition"
>
  Phutkarito
</a>

        {/* 🖥 desktop menu */}
        <nav className="hidden md:flex items-center gap-6 font-semibold">
          <a href="#products">პროდუქცია</a>
          <a href="#about">ჩვენ შესახებ</a>
          <a href="#news">სიახლეები</a>
          <a href="#contact">კონტაქტი</a>

          <a
            href="#contact"
            className="ml-4 bg-yellow-500 text-white px-5 py-2 rounded-[10px] font-bold hover:bg-yellow-600 transition"
          >
            შეკვეთა
          </a>
        </nav>

        {/* 📱 burger */}
        <button
          className="md:hidden text-2xl z-[1000]"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* 🔥 overlay (background) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-[998]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 📱 mobile menu */}
      <div
        className={`fixed top-[70px] left-0 w-full bg-white shadow-lg px-5 py-6 flex flex-col gap-4 font-semibold md:hidden z-[999] transition-all duration-300 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <a href="#products" onClick={() => setOpen(false)}>პროდუქცია</a>
        <a href="#about" onClick={() => setOpen(false)}>ჩვენ შესახებ</a>
        <a href="#news" onClick={() => setOpen(false)}>სიახლეები</a>
        <a href="#contact" onClick={() => setOpen(false)}>კონტაქტი</a>

        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="mt-3 bg-yellow-500 text-white px-5 py-3 rounded-[10px] text-center font-bold"
        >
          შეკვეთა
        </a>
      </div>
    </header>
  );
}