import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/Toaster";

export const metadata: Metadata = {
  title: "SECFlow | AI-Powered DevSecOps",
  description: "Secure, Analyze, Architect, Deploy, Evolve. DevSecOps platform from code to cloud.",
  icons: {
    icon: "/brand/10_favicon_small_icon.png",
    shortcut: "/brand/10_favicon_small_icon.png",
    apple: "/brand/10_favicon_small_icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-[#0A0B14] text-slate-200 selection:bg-blue-500/30 font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
