import type { Metadata } from "next";
import { Kantumruy_Pro } from "next/font/google";
import "./globals.css";

const kantumruy = Kantumruy_Pro({
  variable: "--font-kantumruy",
  subsets: ["khmer", "latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "vPost · ប្រព័ន្ធគ្រប់គ្រងហាង",
  description: "ប្រព័ន្ធលក់ទំនិញ និងគ្រប់គ្រងហាង vPost",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="km" className={kantumruy.variable}><body>{children}</body></html>
  );
}
