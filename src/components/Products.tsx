import Image from "next/image";
import { products } from "../data/site";

export default function Products() {
  return (
    <section id="products" className="site-section">
      <h2 className="site-heading">საფუტკრის პროდუქცია</h2>
      <div className="site-grid catalog-grid">
        {products.map((product) => (
          <article key={product.name} className="site-card">
            <Image
              src={product.image}
              alt={product.imageAlt}
              width={700}
              height={520}
              sizes="(min-width: 1000px) 50vw, (min-width: 640px) 50vw, 100vw"
              className="site-card-photo catalog-photo w-full object-contain"
            />
            <div className="flex flex-1 flex-col gap-3 p-6">
              <h3 className="text-2xl font-bold">{product.name}</h3>
              <p className="text-sm font-semibold">{product.volume}</p>
              <p className="mb-4 leading-relaxed">{product.description}</p>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-current/15 pt-4">
                <span className="text-sm font-semibold">{product.price}</span>
                <a href="#contact" className="site-action">შეკვეთა</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
