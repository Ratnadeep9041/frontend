import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SEO Audit Assistant',
  description: 'AI-powered SEO audit tool using Claude and Firecrawl',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}