"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Manuals · Guides",
  featuresEyebrow: "Formats",
  tableEyebrow: "Sizes & specs",
  orderingEyebrow: "Pricing",
  introTitle: "Instruction manuals your customers can actually follow",
  introParagraphs: [
    "A manual is the one piece of print your customer reads while holding your product in the other hand. Our instruction manual printing keeps that moment working: crisp text at small sizes, diagrams that stay sharp, and stitching that lets the booklet open flat next to the product it explains.",
    "We print user guides and manuals in bulk for manufacturers and brands from our Chennai plant — matched to your packaging line quantities and reprinted identically batch after batch."
  ],
  featuresTitle: "Manuals and guides we print",
  features: [
    { title: "User manuals", description: "Multi-page operation guides, saddle-stitched or perfect bound to match page count." },
    { title: "Assembly instructions", description: "Step-by-step sheets and booklets where diagram clarity does the explaining." },
    { title: "Quick-start guides", description: "Single sheets or short folds that get the product working in the first minute." },
    { title: "Multilingual editions", description: "One layout carried across language versions with consistent pagination." }
  ],
  tableTitle: "Manual and guide sizes",
  tableParagraph: "Manuals usually follow the box they ship in. These are our standard sizes — most manuals are custom-sized to the packaging:",
  tableRows: [
    { category: "Pocket Manual", rowSpan: 2, size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "Compact booklet that fits small product boxes." },
    { size: "A5", dimensions: "5.8\" x 8.3\"" },
    { category: "Full-Page Guide", rowSpan: 2, size: "1/4 Demy", dimensions: "8.5\" x 11\"", description: "Room for large diagrams and detailed steps." },
    { size: "A4", dimensions: "8.3\" x 11.7\"" },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Sized to your product and packaging." }
  ],
  orderingTitle: "Ordering and pricing",
  orderingParagraphs: [
    "Price follows <strong>size, page count, and quantity</strong> — manual runs ride alongside your production schedule, so we quote recurring supply as readily as one-off runs. Orders start at 200 copies and reprints match your approved edition exactly."
  ],
  ctaTitle: "Put clear instructions in every box",
  ctaParagraph: "Send your manual file — or the current printed version — and we'll quote your instruction manuals and guides plainly."
};

export function InstructionManualsGuides({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
