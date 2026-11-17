import type { Metadata } from "next";
import "./site.css";
import "../styles/base.scss";        // SCSS
import "../styles/tokens.scss";

export const metadata: Metadata = {
  title: "Phutkarito — ფუტკარიტო",
  description: "შიდა ქართლის ნატურალური თაფლი და საფუტკრე პროდუქცია",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
