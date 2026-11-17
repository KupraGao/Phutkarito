import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import { news } from "../../../data/site";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = news.find((item) => item.slug === slug);

  if (!article) notFound();

  return (
    <>
      <Navbar article />
      <main id="article" className="article-page bg-[var(--paper)] px-5 pb-20 pt-32 text-[var(--ink)]">
        <article className="mx-auto max-w-[960px]">
          <Link href="/#news" className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4">
            ← ყველა სიახლე
          </Link>
          <p className="mt-7 text-sm font-semibold text-[#435a43]">{article.date}</p>
          <h1 className="site-heading mt-3">{article.title}</h1>
          <Image
            src={article.image}
            alt=""
            width={960}
            height={540}
            sizes="(min-width: 1000px) 960px, calc(100vw - 40px)"
            className="mt-8 aspect-video w-full rounded-[var(--site-radius)] object-cover"
            priority
          />
          <div className="mx-auto mt-9 grid max-w-[66ch] gap-5 text-lg leading-relaxed">
            {article.content.trim().split(/\r?\n\s*\r?\n/).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
