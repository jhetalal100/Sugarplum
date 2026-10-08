import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ParticleCanvas } from "@/components/effects/ParticleCanvas";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { FilmNoise } from "@/components/effects/FilmNoise";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { Navbar } from "@/components/navigation/Navbar";
import { MusicProvider } from "@/context/MusicContext";
import { FloatingMusicControl } from "@/components/ui/FloatingMusicControl";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sugarplum",
  description: "An elegant, interactive birthday experience celebrating a truly special soul.",
  keywords: ["birthday", "interactive experience", "editorial design"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} ${cormorant.variable} scroll-smooth`}
    >
      <body className="bg-night-950 text-cream-100 antialiased min-h-screen relative selection:bg-rose-400/20 selection:text-rose-100">
        <MusicProvider>
          <SmoothScroll>
            {/* Film Grain Texture Layer */}
            <FilmNoise />

            {/* Ambient Particle Background Layer */}
            <ParticleCanvas />

            {/* Desktop-Only Soft Atmospheric Cursor Glow */}
            <CursorGlow />

            {/* Floating Navigation Header */}
            <Navbar />

            {/* Main Content */}
            <main className="relative z-10">{children}</main>

            {/* Floating Soundtrack Control Widget */}
            <FloatingMusicControl />

            {/* Customized Editorial Footer */}
            <footer className="relative z-10 py-16 px-4 text-center border-t border-white/5 text-xs text-rose-200/40 tracking-wider font-light">
              <p className="font-serif italic text-sm text-rose-200/60 mb-1">
                "To moments that feel like poetry."
              </p>
              <p>Crafted with infinite love🫶💕</p>
            </footer>
          </SmoothScroll>
        </MusicProvider>
      </body>
    </html>
  );
}
