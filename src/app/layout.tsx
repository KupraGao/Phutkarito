import type { Metadata } from "next";
import "./globals.css";              // Tailwind
import "../styles/base.scss";        // SCSS
import "../styles/components.scss";
import "../styles/tokens.scss";

export const metadata: Metadata = {
  title: "Phutkarito — ფუტკარიტო",
  description: "შიდა ქართლის ნატურალური თაფლი და საფუტკრე პროდუქცია",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka">
      <body>{children}</body>
    </html>
  );
}