import Navbar from "@/components/modules/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";

import Wrapper from "@/components/layout/wrapper";
import NotificationProvider from "@/providers/NotificationProvider";
import AuthProvider from "@/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LojiPer.com - Dijital İş Arkadaşınız",
  description:
    "LojiPer Yazılım olarak KOBİ'ler için özel olarak tasarlanmış, uygun maliyetli yazılım çözümleri sağlama konusunda uzmanız.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NotificationProvider />
          <Navbar />
          <Wrapper>{children}</Wrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
