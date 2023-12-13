import type { Metadata } from "next";
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import NextTopLoader from "nextjs-toploader";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SkeletonTheme
        baseColor="rgb(234, 214, 214)"
        highlightColor="rgba(146, 138, 138, 0.2)"
      >
        <body className={inter.className}>
          <NextTopLoader />
          {children}
        </body>
      </SkeletonTheme>
    </html>
  );
}
