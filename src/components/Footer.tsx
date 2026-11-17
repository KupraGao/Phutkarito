import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer bg-[var(--forest)] px-5 py-9 text-[var(--paper)]">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-6">
        <Link href="/" aria-label="ფუტკარიტოს მთავარი გვერდი">
          <Image src="/images/logo3.png" alt="" width={1439} height={605} className="h-auto w-36 rounded-[5px]" />
        </Link>
        <p className="text-sm">© 2026 ფუტკარიტო. ყველა უფლება დაცულია.</p>
      </div>
    </footer>
  );
}
