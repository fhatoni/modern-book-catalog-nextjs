import type { AppProps } from "next/app";
import Header from "@/components/Header";
import Head from "next/head";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <Head>
        <title>ModernBook - Katalog Buku Online</title>
        <meta name="description" content="Temukan buku favorit Anda di katalog modern kami." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>

      <div className={`${inter.variable} font-sans min-h-screen bg-background text-foreground`}>
        <Header />
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
