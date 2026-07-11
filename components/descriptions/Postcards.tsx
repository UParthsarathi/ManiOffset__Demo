"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Postcards",
  featuresEyebrow: "Types",
  tableEyebrow: "Sizes & specs",
  orderingEyebrow: "Pricing",
  introTitle: "A small card that still gets read",
  introParagraphs: [
    "In a world of unread emails, a postcard has a superpower: there's nothing to open. The message is already in the reader's hand. That's why schools, companies, and creative brands keep using them — for reminders, thank-you notes, campaign pieces, and announcements that deserve better than an inbox.",
    "Our postcard printing gives that small format its full due: smooth paper, clean edges, even colour, and every card checked before it ships."
  ],
  featuresTitle: "Postcard types we print",
  features: [
    { title: "Standard postcards", description: "Simple and practical for daily communication and announcements." },
    { title: "Photo postcards", description: "Vivid colour and fine detail for branding and creative work." },
    { title: "Rounded-corner postcards", description: "A sleek, finished edge that reads as considered rather than cut." },
    { title: "Custom postcards", description: "Personal or business designs, offset printed for clarity and batch-to-batch consistency." }
  ],
  tableTitle: "What size is a postcard?",
  tableParagraph: "The classic postcard is A6 — about the size of your palm. Larger and square formats give visuals more room:",
  tableRows: [
    { category: "Standard Postcard", size: "A6", dimensions: "4.1” × 5.8”", description: "Classic format for general use." },
    { category: "Large Postcard", rowSpan: 2, size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "More space for visuals and branding." },
    { size: "A5", dimensions: "5.8\" x 8.3\"" },
    { category: "Square Postcard", size: "Square", dimensions: "6” × 6”", description: "Distinct look, ideal for creative campaigns." },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Designed to fit your specific size of postcard needs." }
  ],
  orderingTitle: "What does postcard printing cost?",
  orderingParagraphs: [
    "The shortest price formula on the site: <strong>size, single- or double-sided, and quantity.</strong> Rounded corners add a small finishing cost. Orders start at 200 cards and ship 3–10 days after proof approval — small checks on ink, alignment, and finish included on every batch."
  ],
  ctaTitle: "Send something worth keeping",
  ctaParagraph: "Share your design — front and back — and we'll quote your postcards in plain numbers, no obligation."
};

export function Postcards({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
