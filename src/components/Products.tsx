import Image from "next/image";
import { products } from "../data/site";

export default function Products() {
  return (
    <section id="products" className="px-5 py-20">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">

          <div>
            <p className="font-bold text-yellow-700">
              პროდუქცია
            </p>

            <h2 className="section-title">
              რას გთავაზობთ
            </h2>
          </div>

          {/*
          <p className="section-text max-w-xl">
            აქ ფასები და ზუსტი რაოდენობები მარტივად შეიცვლება მონაცემებიდან.
            მომავალში დაემატება კალათა და გადახდის ღილაკი.
          </p>
          */}

        </div>

        {/* Products Grid */}
        <div className="grid gap-6 md:grid-cols-3">

          {products.map((product) => (
            <article
              key={product.name}
              className="glass-card overflow-hidden"
            >

              {/* Product Image */}
              <Image
                src={product.image}
                alt={product.name}
                width={700}
                height={520}
                className="h-64 w-full object-cover"
              />

              {/* Product Content */}
              <div className="p-6">

                {/* Volume */}
                <p className="mb-2 text-sm font-bold text-green-700">
                  {product.volume}
                </p>

                {/* Product Name */}
                <h3 className="text-2xl font-black">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="mt-3 leading-7 text-yellow-950/70">
                  {product.description}
                </p>

                {/* Price + Button */}
                <div
                  className="
                    mt-6 flex items-center justify-between gap-3
                    max-[1224px]:flex-col
                    max-[1224px]:items-start
                  "
                >

                  <b className="text-lg">
                    {product.price}
                  </b>

                  <a
                    href="#contact"
                    className="
                      btn-primary px-4 py-2 text-center
                      max-[1224px]:w-full
                    "
                  >
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