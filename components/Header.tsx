"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Header = () => {
  return (
    <header>
      <div className="main-container inner">
        <Link href="/">
          <Image src="logo.svg" alt="coin-pulse-logo" width={132} height={40} />
        </Link>
        <nav>
          <Link
            href="/"
            className={cn("nav-link", {
              "is-active": usePathname() === "/",
              "is-home": true,
            })}
          >
            Home
          </Link>
          <p>Search Modal</p>
          <Link
            className={cn("nav-link", {
              "is-active": usePathname() === "/coins",
            })}
            href="/coins"
          >
            All Coins
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
