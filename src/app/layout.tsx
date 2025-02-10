import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { getCurrentSession } from "@/actions/auth";
import { SanityLive } from "@/sanity/lib/live";
import HeaderCategorySelector from "@/components/layout/HeaderCategorySelector";
import Cart from "@/components/cart/Cart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getCurrentSession();

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header user={user} categorySelector={<HeaderCategorySelector />} />
        {children}

        <Cart />
        <SanityLive />
      </body>
    </html>
  );
}
