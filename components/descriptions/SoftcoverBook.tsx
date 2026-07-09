"use client";

import React from "react";
import { ProductContentTemplate, ProductContentData } from "./ProductContentTemplate";

const CONTENT: ProductContentData = {
  theme: 'amber',
  introTitle: "Got a story ready for the press?",
  introParagraphs: [
    "Every book begins as a file on a screen — and ends as something you can hold, flip through, and hand to a reader. FeelThePRINT's softcover book printing is where that change happens. You bring the manuscript; we bring the press, the paper, and forty years of knowing exactly how a page should sit in someone's hands.",
    "Whether it's a first novel, a print run for your institution, or a limited edition you've been planning for months, every copy comes off our offset presses sharp, even, and consistent — the same clean ink and crisp type from the opening page to the very last."
  ],
  features: [
    { title: "It travels well", description: "Light enough to slip into a bag, sturdy enough to survive the journey." },
    { title: "It lasts", description: "A good paperback holds its shape through dozens of reads, spine intact." },
    { title: "It's affordable", description: "The most budget-friendly way to put a real book into a reader's hands — whether that's ten copies or ten thousand." }
  ],
  tableRows: [
    { category: "Standard Edition", size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "The most popular paperback format used by publishers worldwide." },
    { category: "Standard Edition", size: "A5", dimensions: "5.8\" x 8.3\"", description: "Standard A5 paperback." },
    { category: "Study & Reference", size: "1/4 Demy", dimensions: "8.5\" x 11\"", description: "Suitable for guides, handbooks, and academic material." },
    { category: "Study & Reference", size: "A4", dimensions: "8.3\" x 11.7\"", description: "Standard A4 reference size." },
    { category: "Visual & Manual", size: "1/4 Crown", dimensions: "7\" x 9.5\"", description: "Gives extra room for images, diagrams, or notes." },
    { category: "Compact Reads", size: "1/8 Crown", dimensions: "4.75\" x 7\"", description: "Small, travel-friendly size — perfect for novellas." },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Designed to fit your manuscript or layout preferences." }
  ],
  materialsTitle: "A cover that sets the tone",
  materialsParagraphs: [
    "A cover is the first thing anyone touches, and it quietly tells them what kind of book they're holding. We print two styles, each with its own character:"
  ],
  materialsList: [
    "Standard cover — a clean, flexible wrapper that keeps the book light and easy in the hand. It's the natural choice for novels, reports, study copies, and anything meant to be read often and carried everywhere.",
    "French fold cover — cut from a heavier stock with extended flaps folded neatly inside, giving the edges a firmer, more refined feel. It's the cover people choose when a book deserves a little ceremony: premium runs, limited editions, the ones meant to be kept."
  ],
  materialsClosing: "Whichever you pick, it's printed on our offset presses for deep, even colour, true texture, and fold lines so clean the book simply feels right the moment it's picked up.",
  orderingTitle: "Honest, simple pricing",
  orderingParagraphs: [
    "There's no mystery to what softcover book printing costs. It comes down to three things: how many pages, how many copies, and which size. That's it. You'll get a clear, itemised quote with nothing buried in the fine print — just a straight answer you can plan around."
  ],
  orderingSteps: [
    "Send your file",
    "Choose your size",
    "Leave the rest to us"
  ],
  ctaTitle: "Let's bring your pages to life",
  ctaParagraph: "Send us your file and we'll send back a free, no-obligation quote — and show you how straightforward printing a proper paperback can be."
};

export function SoftcoverBook({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplate
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
