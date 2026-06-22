import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "North Star Support Bot",
  description: "Friendly outdoor gear support for North Star customers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
