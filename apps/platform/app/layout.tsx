import type { Metadata } from "next";
import { Baloo_Paaji_2 } from "next/font/google";

import "./globals.css";
import "@repo/shadcn/globals.css";
import NextAuthSessionProvider from "@/components/providers/nextauth-session-provider";
import ToastProvider from "@/components/providers/toast-provider";
import GlobalTooltipProvider from "@/components/providers/tooltip-provider";

const balooPaaji2 = Baloo_Paaji_2({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-brand dark">
      <body className={balooPaaji2.className}>
        <NextAuthSessionProvider>
          <ToastProvider />
          <GlobalTooltipProvider>{children}</GlobalTooltipProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
