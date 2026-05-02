import Image from "next/image";
import { gallery } from "../data/site";

export default function About() {
  return (
    <section id="about" className="px-5 py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr]">
        
        <div className="glass-card p-8 md:p-10">
          <p className="font-bold text-yellow-700">ჩვენ შესახებ</p>
          <h2 className="section-title mt-2">
            საფუტკრე, რომელსაც თავისი ხასიათი აქვს
          </h2>

          <p className="section-text mt-6">
            ფუტკარიტო დაფუძნებულია ადგილობრივ წარმოებაზე, ხარისხიან მოვლაზე და მომხმარებელთან პირდაპირ კომუნიკაციაზე.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-yellow-100 p-5">
              <b>ბუნებრივი გარემო</b>
              <p className="mt-2 text-sm text-yellow-950/70">
                შიდა ქართლის მდიდარი ბუნება და ყვავილოვანი გარემო.
              </p>
            </div>

            <div className="rounded-3xl bg-green-100 p-5">
              <b>სანდო კომუნიკაცია</b>
              <p className="mt-2 text-sm text-yellow-950/70">
                შეკვეთა სწრაფად კონტაქტით.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {gallery.map((img, index) => (
            <Image
              key={img}
              src={img}
              alt={`საფუტკრის ფოტო ${index + 1}`}
              width={420}
              height={420}
              className="h-48 w-full rounded-[26px] object-cover shadow-xl md:h-56"
            />
          ))}
        </div>

      </div>
    </section>
  );
}