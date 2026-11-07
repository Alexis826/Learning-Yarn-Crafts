"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import YarnBall from "./YarnBall";

// Floats in the bottom corner of every page except Ask Loopy itself.
export default function AskLoopyButton() {
  const pathname = usePathname();
  if (pathname === "/ask-loopy") return null;

  return (
    <Link href="/ask-loopy" className="ask-loopy-button">
      <YarnBall size={26} clipId="yarn-ask-loopy" />
      Ask Loopy
    </Link>
  );
}
