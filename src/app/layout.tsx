import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PrelineScript from "@/components/PrelineScript";
import MainLayout from "@/components/layouts/MainLayout";
import ReduxProvider from "@/providers/ReduxProvider";
import "@fontsource/quicksand";
import "@fontsource/quicksand/400.css";
import "@fontsource/quicksand/400-italic.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reflow",
  description: "Betting Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PrelineScript />
      <body className={inter.className}>
        <ReduxProvider>
          <MainLayout>{children}</MainLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
