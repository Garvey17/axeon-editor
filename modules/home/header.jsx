import Link from "next/link";
import Image from "next/image";

import UserButton from "../auth/components/user-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-50">
        <div className="bg-background/80 backdrop-blur-md border-b border-border w-full">
          <div className="flex items-center justify-center w-full">
            <div className="flex items-center justify-between w-full max-w-7xl px-4 sm:px-6 py-3">

              {/* Logo Section with Navigation Links */}
              <div className="flex items-center gap-8">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                >
                 
                  <span className="hidden sm:block font-bold text-base">
                    Axeon
                  </span>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-6">
                  <Link
                    href="/docs"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Docs
                  </Link>
                  <Link
                    href="/api"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    API
                  </Link>
                  <Link
                    href="/playground"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Playground
                  </Link>
                </div>
              </div>

              {/* Right side items */}
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <UserButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
