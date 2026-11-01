import "./globals.css";

export const metadata = {
  title: "Learning Yarn Crafts",
  description: "A friendly place to learn knitting and crochet.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
