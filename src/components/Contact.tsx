import { sendEmail } from "../app/actions/sendEmail";
import { products } from "../data/site";

export default function Contact() {
  return (
    <section id="contact" className="site-section">
      <div className="site-split contact-layout gap-12">
        <div>
          <h2 className="site-heading">შეკვეთა და კონტაქტი</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed">
            მოგვწერე, რომელი პროდუქტი გაინტერესებს, და დაგიკავშირდებით.
          </p>
          <address className="mt-8 flex flex-col items-start gap-4 not-italic">
            <a className="inline-flex min-h-11 items-center gap-3 underline underline-offset-4" href="https://maps.app.goo.gl/e8VXNN6fuGLERcHB9" target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              გორი, საქართველო
            </a>
            <a className="inline-flex min-h-11 items-center gap-3 underline underline-offset-4" href="tel:+995595557447">
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round">
                <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a13 13 0 0 1-7-7l2-2-2-5Z" />
              </svg>
              595 557 447
            </a>
            <a className="site-action" href="https://m.me/61563146866732" target="_blank" rel="noopener noreferrer">მოგვწერე Messenger-ში</a>
          </address>
        </div>
        <form action={sendEmail} className="contact-form mt-10 grid min-w-0 gap-4 rounded-[var(--site-radius)] p-5 sm:p-8 min-[800px]:mt-0">
          <label className="grid gap-2 font-semibold">
            სახელი
            <input className="site-field font-normal" name="name" autoComplete="name" required />
          </label>
          <label className="grid gap-2 font-semibold">
            ტელეფონი
            <input className="site-field font-normal" name="phone" type="tel" autoComplete="tel" required />
          </label>
          <label className="grid gap-2 font-semibold">
            პროდუქტი
            <select className="site-field font-normal" name="product">
              {products.map(({ name }) => <option key={name}>{name}</option>)}
              <option>სხვა კითხვა</option>
            </select>
          </label>
          <label className="grid gap-2 font-semibold">
            შეტყობინება
            <textarea className="site-field min-h-28 font-normal" name="message" />
          </label>
          <button className="site-action" type="submit">შეტყობინების გაგზავნა</button>
        </form>
      </div>
    </section>
  );
}
