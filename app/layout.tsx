import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/client-providers";

const inter = Inter({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: '--font-jakarta'
});

export const metadata: Metadata = {
  title: "Biota",
  description: "Invest in a sustainable future",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${jakarta.variable}`} suppressHydrationWarning>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
