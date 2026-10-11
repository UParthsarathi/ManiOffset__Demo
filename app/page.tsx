"use client";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { ProductsSection } from "../components/ProductsSection";
import { Clients } from "../components/Clients";
import { PromoCallouts } from "../components/PromoCallouts";
import { Footer } from "../components/Footer";
import { BookExperience } from "../components/BookExperience";

export default function Home() {
  const [isBookletActive, setIsBookletActive] = useState(false);

  return (
    <main className="w-full flex flex-col min-h-screen bg-slate-50 relative">
      {/* 3D flipbook showroom — takes over the page while open */}
      {isBookletActive && (
        <BookExperience
          onClose={() => setIsBookletActive(false)}
        />
      )}

      {!isBookletActive && <Navbar />}

      <Hero
        onLaunchBooklet={() => setIsBookletActive(true)}
      />

      {/* Client logos straight after the hero — strongest trust signal */}
      <Clients />

      <PromoCallouts />

      <ProductsSection />

      {/* Reviews hidden until real client quotes are available (components/Reviews.tsx kept) */}

      <Footer />
    </main>
  );
}
