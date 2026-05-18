import Image from "next/image";
import { products } from "../data/site";

export default function Products() {
  return (
    <section id="products" className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-bold text-yellow-700">პროდუქცია</p>
            <h2 className="section-title">რას გთავაზობთ</h2>
          </div>
          {/* <p className="section-text max-w-xl">
            აქ ფასები და ზუსტი რაოდენობები მარტივად შეიცვლება მონაცემებიდან.
            მომავალში დაემატება კალათა და გადახდის ღილაკი.
          </p> */}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <article key={product.name} className="glass-card overflow-hidden">
              
              <Image
                src={product.image}
                alt={product.name}
                width={700}
                height={520}
                className="h-64 w-full object-cover"
              />

              <div className="p-6">
                <p className="mb-2 text-sm font-bold text-green-700">
                  {product.volume}
                </p>

                <h3 className="text-2xl font-black">
                  {product.name}
                </h3>

                <p className="mt-3 leading-7 text-yellow-950/70">
                  {product.description}
                </p>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <b>{product.price}</b>

                  <a href="#contact" className="btn-primary px-4 py-2">
                    შეკვეთა
                  </a>
                </div>
              </div>

            </article>
          ))}
        </div>
      </div>
    </section>
  );
}