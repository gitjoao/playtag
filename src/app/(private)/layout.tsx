import '@/app/globals.css';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`antialiased`}>
        <h1>private</h1>
        {children}
      </body>
    </html>
  );
}
