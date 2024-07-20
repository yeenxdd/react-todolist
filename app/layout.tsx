import "./globals.css";

export const metadata = {
  title: "Simple TodoApp",
  description: "Simple todo app for learning Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
