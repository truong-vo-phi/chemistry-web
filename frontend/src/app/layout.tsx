import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'ChemLab 3D - Website Thong Nhat',
  description: 'Cong thong tin tong hop cac chuc nang hoc tap va quan tri cua ChemLab 3D.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@600;700&family=Quicksand:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-surface font-body-md text-body-md text-on-surface antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
