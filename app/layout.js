import "./globals.css";
import NavBar from "./NavBar";

export const metadata = {
  title: "Cozy Loops",
  description: "A friendly place to learn knitting and crochet.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="page">
          <NavBar />
          {children}
          <footer>Alexis Michalski</footer>
        </div>
      </body>
    </html>
  );
}
