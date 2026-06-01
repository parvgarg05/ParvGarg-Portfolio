import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Parv Garg — AI/ML & Backend Infrastructure',
  description: 'Parv Garg is a Full-Stack Developer building scalable agentic workflows and robust architectures.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrains.variable} bg-zinc-950 text-zinc-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
