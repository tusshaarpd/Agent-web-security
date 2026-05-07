import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Sentinel AI — Enterprise AI Security & Governance Platform",
  description:
    "Continuous risk assessment, governance, and threat intelligence for AI agents, LLMs, RAG pipelines, MCP tools, and ML models.",
  keywords: [
    "AI security",
    "LLM security",
    "AI governance",
    "MCP security",
    "RAG security",
    "model risk",
    "responsible AI"
  ],
  authors: [{ name: "Sentinel AI" }],
  openGraph: {
    title: "Sentinel AI — Enterprise AI Security & Governance",
    description:
      "World-class AI risk intelligence, governance, and observability for the agentic enterprise.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative isolate min-h-screen overflow-hidden">
            {/* Ambient background */}
            <div
              aria-hidden
              className="pointer-events-none fixed inset-0 -z-10"
            >
              <div className="absolute inset-0 grid-bg opacity-40 mask-radial" />
              <div className="absolute -top-40 left-1/2 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-violet-500/20 blur-[140px]" />
              <div className="absolute bottom-0 right-0 h-[28rem] w-[40rem] rounded-full bg-cyan-500/10 blur-[120px]" />
              <div className="absolute -bottom-32 left-0 h-[24rem] w-[34rem] rounded-full bg-fuchsia-500/10 blur-[120px]" />
            </div>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
