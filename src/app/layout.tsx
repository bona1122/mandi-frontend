import localFont from "next/font/local";

import type { Metadata } from "next";

import "@/styles/globals.scss";

const Pretendard = localFont({
  src: "../styles/fonts/PretendardVariable.woff2",
});

export const metadata: Metadata = {
  title: "Mandi",
  description: "Mandi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Pretendard.className}>{children}</body>
    </html>
  );
}
