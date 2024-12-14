import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { getNews } from "@/services/news";
import { NewsEntity } from "@/entities/news.entity";
import { getCategories } from "@/services/category";
import { CategoryEntity } from "@/entities/category.entity";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Bé cao khỏe",
  description: "Bé cao khỏe",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: news_data } = await getNews({ page: 1, page_size: 5 }) as unknown as { data: NewsEntity[] }
    const { data: category_data } = await getCategories() as unknown as { data: CategoryEntity[] }
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer news_data={news_data} category_data={category_data} />
      </body>
    </html>
  );
}
