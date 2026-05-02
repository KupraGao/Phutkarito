import { news } from "../../../data/site";
import Navbar from "../../../components/Navbar";
import Link from "next/link";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = news.find((item) => item.slug === slug);

  if (!article) {
    return (
      <>
        <Navbar />
        <h1 className="text-center py-20 text-2xl font-bold">
          სტატია ვერ მოიძებნა
        </h1>
      </>
    );
  }

  return (
    <>
      {/* 🔝 HEADER */}
      <Navbar />

      <div className="max-w-3xl mx-auto px-5 pt-28 pb-20">
        
        {/* 🔙 BACK BUTTON (გასწორებული) */}
        <Link
          href="/#news"
          className="mb-6 inline-block text-sm font-bold text-yellow-700 hover:underline"
        >
          ← უკან დაბრუნება
        </Link>

        {/* 🖼 IMAGE */}
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-80 object-cover rounded-3xl"
        />

        {/* 📅 DATE */}
        <p className="mt-6 text-green-700 font-bold">
          {article.date}
        </p>

        {/* 🧾 TITLE */}
        <h1 className="text-4xl font-black mt-2">
          {article.title}
        </h1>

        {/* 📖 CONTENT */}
        <p className="mt-6 whitespace-pre-line leading-8 text-gray-700 text-lg">
          {article.content}
        </p>

      </div>
    </>
  );
}