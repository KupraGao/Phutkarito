import Image from "next/image";
import Link from "next/link";
import { news } from "../data/site";

export default function News() {
  return (
    <section id="news" className="site-section site-section--cream">
      <h2 className="site-heading">სიახლეები საფუტკრიდან</h2>
      <div className="site-grid journal-grid">
        {news.map((item) => (
          <article key={item.slug} className="site-card">
            <Image src={item.image} alt="" width={700} height={520}
              sizes="(min-width: 900px) 50vw, 100vw"
              className="journal-photo w-full object-cover" />
            <div className="flex flex-1 flex-col gap-3 p-6">
              <p className="text-sm font-semibold text-[#435a43]">{item.date}</p>
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="mb-3 leading-relaxed">{item.excerpt}</p>
              <Link href={`/news/${item.slug}`} className="journal-link mt-auto" aria-label={`წაიკითხე: ${item.title}`}>
                წაიკითხე სტატია <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
