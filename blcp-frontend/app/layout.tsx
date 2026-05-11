import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "BNR Portal - Bank Licensing & Compliance",
  description:
    "National Bank of Rwanda - Bank Licensing & Compliance Portal for financial institution licensing applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontMono.variable} bg-background`}
    >
      <body className="antialiased font-mono">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
