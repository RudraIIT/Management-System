import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import "./index.css";
import { ThemeProvider } from "@/theme-provider";
import { Navbar } from "@/navbar";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>CodeForge</title>
        <meta name="description" content="A competitive programming platform" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        />
      </Helmet>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <Navbar />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </ThemeProvider>
    </HelmetProvider>
  );
}
