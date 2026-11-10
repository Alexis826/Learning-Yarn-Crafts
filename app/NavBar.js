"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth/client";
import { bethEllen } from "./fonts";
import YarnBall from "./YarnBall";

const tabs = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/ask-loopy", label: "Ask Loopy" },
  { href: "/projects", label: "Projects" },
];

// True while the reader is scrolling down the page, false when they scroll
// up or are near the top. Small jitters are ignored.
function useHideOnScrollDown() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    function update() {
      const y = window.scrollY;
      if (y < 80) setHidden(false);
      else if (y - lastY > 8) setHidden(true);
      else if (lastY - y > 8) setHidden(false);
      if (Math.abs(y - lastY) > 8 || y < 80) lastY = y;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return hidden;
}

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const hidden = useHideOnScrollDown();

  async function signOut() {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className={`navbar${hidden ? " navbar-hidden" : ""}`}>
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
        {!isPending && !user && (
          <>
            <Link
              href="/get-started"
              aria-current={pathname === "/get-started" ? "page" : undefined}
            >
              Get Started
            </Link>
            <Link
              href="/sign-in"
              aria-current={pathname === "/sign-in" ? "page" : undefined}
            >
              Sign in
            </Link>
          </>
        )}
        {user && (
          <span className="nav-account">
            <span className="nav-user">Hi, {user.name || user.email}</span>
            <button type="button" className="nav-signout" onClick={signOut}>
              Sign out
            </button>
          </span>
        )}
      </nav>
    </header>
  );
}
