import { sendEmail } from "../app/actions/sendEmail";

export default function Contact() {
  return (
    <section id="contact" className="px-5 py-20">
      <div className="glass-card mx-auto grid max-w-7xl gap-8 p-6 md:grid-cols-2 md:p-10">
        
        {/* 🧾 მარცხენა */}
        <div>
          <p className="font-bold text-yellow-700">კონტაქტი</p>

          <h2 className="section-title mt-2">
            შეკვეთა და დეტალები
          </h2>

          <p className="section-text mt-6">
            შეავსე ფორმა და ჩვენ დაგიკავშირდებით მალე 📩
          </p>

          <div className="mt-8 space-y-4 font-bold">
            
            <a
              href="https://maps.app.goo.gl/e8VXNN6fuGLERcHB9"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-green-600 transition"
            >
              📍 Georgia, Gori
            </a>

            <a
              href="tel:+995595557447"
              className="block hover:text-yellow-600 transition"
            >
              📞 595 557 447
            </a>

            <a
              href="https://m.me/61563146866732"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-5 py-3 rounded-full font-bold hover:bg-blue-700 transition"
            >
              💬 Messenger
            </a>
          </div>
        </div>

        {/* 📩 ფორმა */}
        <form
          action={sendEmail}
          className="space-y-4 rounded-[24px] bg-white/70 p-6 backdrop-blur"
        >
          <input
            name="name"
            placeholder="სახელი"
            required
            className="w-full rounded-2xl border border-yellow-900/10 bg-white px-5 py-4 outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            name="phone"
            placeholder="ტელეფონი"
            required
            className="w-full rounded-2xl border border-yellow-900/10 bg-white px-5 py-4 outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <select
            name="product"
            className="w-full rounded-2xl border border-yellow-900/10 bg-white px-5 py-4 outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option>ნატურალური თაფლი</option>
            <option>ფუტკრის ოჯახები</option>
            <option>სხვა კითხვა</option>
          </select>

          <textarea
            name="message"
            placeholder="შეტყობინება"
            className="min-h-32 w-full rounded-2xl border border-yellow-900/10 bg-white px-5 py-4 outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-4 rounded-full font-bold hover:bg-yellow-600 transition"
          >
            გაგზავნა
          </button>
        </form>
      </div>
    </section>
  );
}