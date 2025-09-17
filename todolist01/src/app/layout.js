import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Todo App",
  description: "Next.js + json-server Todo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="min-h-screen antialiased">
        <Header />
        <main className="mx-auto max-w-5xl px-5 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}