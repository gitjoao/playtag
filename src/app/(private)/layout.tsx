import '@/app/globals.css';
import Head from 'next/head';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
