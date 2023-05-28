'use client';

import './globals.css';
import Main from '@/components/Main';
import { Navbar } from '@/components/Navbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RaceSG'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex items-center flex-col p-8 space-y-10 min-h-screen">
          <Main children={ children }/>
        </div>
      </body>
    </html>
  );
}
