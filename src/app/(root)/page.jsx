import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="z-20 flex flex-col items-center justify-center min-h-screen py-12 px-4">

      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center max-w-5xl mx-auto text-center space-y-8">

        {/* Logo/Icon */}
        <div className="w-32 h-32 flex items-center justify-center">
          <Image
            src={"/hero.svg"}
            alt="Axeon Code Playground"
            height={128}
            width={128}
            className="opacity-90"
          />
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.1]">
          Code & build with
          <br />
          <span className="text-foreground/80">intelligence</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          A powerful online code playground with WebContainer technology.
          Write, run, and share your code instantly in the browser.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
          <Link href={"/dashboard"}>
            <Button
              size="lg"
              className="bg-foreground text-background border-2 border-border hover:bg-foreground/90 font-medium px-8 h-12 rounded-lg cursor-pointer hover:scale-x-105 transition duration-300"
            >
              Get Started
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <Link href={"/playground/demo"}>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-border hover:bg-accent font-medium px-8 h-12 rounded-lg cursor-pointer  hover:scale-x-105 transition duration-300"
            >
              View Demo
            </Button>
          </Link>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-3 items-center justify-center pt-8 text-sm text-muted-foreground">
          <div className="px-4 py-2 rounded-full border border-border bg-card">
            ⚡ Instant Preview
          </div>
          <div className="px-4 py-2 rounded-full border border-border bg-card">
            🔒 Secure Sandbox
          </div>
          <div className="px-4 py-2 rounded-full border border-border bg-card">
            🚀 WebContainer Powered
          </div>
        </div>
      </div>
    </div>
  );
}
