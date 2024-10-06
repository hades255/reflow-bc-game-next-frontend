import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PrelineScript from "@/components/PrelineScript";
import MainLayout from "@/components/layouts/MainLayout";
import ReduxProvider from "@/providers/ReduxProvider";
import "@fontsource/quicksand";
import "@fontsource/quicksand/400.css";
import "./globals.css";
import { SiteSettingProvider } from "@/providers/SiteSettingProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reflow - Price prediction, Price duel, Event based prediction",
  description: "Betting Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SiteSettingProvider>
        <PrelineScript />
        <body className={inter.className}>
          <ReduxProvider>
            <MainLayout>{children}</MainLayout>
          </ReduxProvider>
        </body>
      </SiteSettingProvider>
    </html>
  );
}
