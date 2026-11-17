import Image from "next/image";
import { gallery } from "../data/site";

export default function About() {
  return (
    <section id="about" className="site-section site-section--dark">
      <div className="site-split gap-12">
        <div>
          <h2 className="site-heading">ჩვენი საფუტკრე შიდა ქართლში</h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed">
            ფუტკარიტო დაფუძნებულია ადგილობრივ წარმოებაზე, ხარისხიან მოვლაზე და მომხმარებელთან პირდაპირ კომუნიკაციაზე.
          </p>
          <a href="#contact" className="site-action site-action--gold mt-7">დაგვიკავშირდი</a>
        </div>
        <div className="apiary-gallery mt-10 min-[800px]:mt-0">
          {gallery.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`საფუტკრის ფოტო ${index + 1}`}
              width={640}
              height={480}
              sizes="(min-width: 800px) 40vw, 75vw"
              className="rounded-[var(--site-radius)] object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
