"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bethEllen } from "./fonts";
import YarnBall from "./YarnBall";

const tabs = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/ask-loopy", label: "Ask Loopy" },
  { href: "/projects", label: "Projects" },
  { href: "/get-started", label: "Get Started" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="navbar">
      <Link href="/" className={`brand ${bethEllen.className}`}>
        <YarnBall size={32} clipId="yarn-nav" />
        Cozy Loops
      </Link>
      <nav>
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={pathname === tab.href ? "page" : undefined}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
