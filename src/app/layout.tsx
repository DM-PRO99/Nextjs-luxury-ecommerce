import Providers from "./Providers";
import "./globals.css";
import { Playfair_Display, Inter } from 'next/font/google';
import { ensureCronJobs } from "@/libs/cron";
import { AppHeader } from "@/components/app/app-header";

ensureCronJobs();

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: "Luxury Timepieces - Swiss Watch Collection",
  description: "Discover our curated collection of luxury Swiss timepieces, where heritage meets innovation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans bg-obsidian text-platinum">
        <Providers>
          <AppHeader />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
