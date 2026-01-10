import Link from "next/link";
import { Github as LucideGithub } from "lucide-react";

export function Footer() {
  const socialLinks = [
    {
      href: "#",
      icon: (
        <LucideGithub className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
      ),
    },
  ];

  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col items-center space-y-6 text-center">
        {/* Social Links */}
        <div className="flex gap-4">
          {socialLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.icon}
            </Link>
          ))}
        </div>

        {/* Copyright Notice */}
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Axeon. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
