import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-5 py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-yellow-700/20 bg-white/60 px-4 py-2 text-sm font-bold text-yellow-900">
            Georgia, Gori · ბუნებრივი საფუტკრე
          </p>
          <h1 className="text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            ნატურალური თაფლი <span className="text-yellow-600">შიდა ქართლიდან</span>
          </h1>
          <p className="section-text mt-6 max-w-2xl">
            Phutkarito არის ადგილობრივი საფუტკრე, რომელიც აერთიანებს ბუნებრივ პროდუქტს, სანდო წარმოებას და ფუტკრების მოვლის სიყვარულს.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a className="btn-primary" href="#products">პროდუქციის ნახვა</a>
            <a className="btn-ghost" href="#news">სიახლეების წაკითხვა</a>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 text-center">
            <div className="glass-card p-4"><b className="text-2xl">100%</b><p className="text-sm text-yellow-900/70">ნატურალური</p></div>
            <div className="glass-card p-4"><b className="text-2xl">Gori</b><p className="text-sm text-yellow-900/70">რეგიონი</p></div>
            <div className="glass-card p-4"><b className="text-2xl">🐝</b><p className="text-sm text-yellow-900/70">საფუტკრე</p></div>
          </div>
        </div>
        <div className="glass-card relative p-3">
          <Image src="/images/453735991_1021261196285136_589212362345177722_n.jpg" alt="Phutkarito საფუტკრე" width={900} height={900} className="h-[520px] rounded-[24px] object-cover" priority />
        </div>
      </div>
    </section>
  );
}
