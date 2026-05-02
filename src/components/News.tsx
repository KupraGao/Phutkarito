import Image from "next/image";
import { news } from "../data/site";

export default function News() {
  return (
    <section id="news" className="bg-white/45 px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="font-bold text-yellow-700">ბლოგი / სიახლეები</p>
        <h2 className="section-title mt-2">
          შემეცნებითი და ბიზნეს სიახლეები
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {news.map((item) => (
            <article key={item.title} className="glass-card overflow-hidden">

              <Image
                src={item.image}
                alt={item.title}
                width={700}
                height={520}
                className="h-60 w-full object-cover"
              />

              <div className="p-6">
                <p className="text-sm font-bold text-green-700">
                  {item.date}
                </p>

                <h3 className="mt-2 text-2xl font-black">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-yellow-950/70">
                  {item.excerpt}
                </p>

                {/* 🔥 აქ არის მთავარი ცვლილება */}
                <a
                  href={`/news/${item.slug}`}
                  className="btn-ghost mt-6 inline-block px-4 py-2"
                >
                  წაიკითხე
                </a>
              </div>

            </article>
          ))}
        </div>
      </div>
    </section>
  );
}