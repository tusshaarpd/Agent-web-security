"use client";

import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowRight } from "lucide-react";

export function LandingNav() {
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-4">
        <div className="flex h-14 items-center justify-between rounded-full border border-border/50 bg-background/60 px-4 sm:px-5 backdrop-blur-2xl shadow-sm">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">
              Platform
            </a>
            <a href="#governance" className="hover:text-foreground transition">
              Governance
            </a>
            <a href="#preview" className="hover:text-foreground transition">
              Product
            </a>
            <a href="#trust" className="hover:text-foreground transition">
              Trust
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
              <Link href="/dashboard">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/dashboard">
                Launch console
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
