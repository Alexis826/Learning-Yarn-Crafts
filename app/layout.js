import "./globals.css";

export const metadata = {
  title: "Learning Yarn Crafts",
  description: "A friendly place to learn knitting, crochet, and other yarn crafts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
