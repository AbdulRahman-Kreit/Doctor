import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700', '800'], 
  variable: '--font-nunito', 
})


export const metadata: Metadata = {
  title: "Doctor",
  description: "A simple doctor appointment booking app built with Next.js 16 and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning={true} className={`min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
