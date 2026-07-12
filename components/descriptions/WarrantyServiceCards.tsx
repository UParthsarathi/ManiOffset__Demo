"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Warranty · Registration · Service",
  featuresEyebrow: "Types",
  tableEyebrow: "Sizes & specs",
  orderingEyebrow: "Pricing",
  introTitle: "Guarantee documents built to outlast the guarantee",
  introParagraphs: [
    "A warranty card gets filled in at purchase, filed away, and produced years later when it matters most — so it has to survive storage and still read clearly. Our warranty card printing uses sturdy stock, sharp ruling for handwritten fields, and ink that stays legible for the life of the promise.",
    "We print warranty, registration, and service documentation in bulk for manufacturers and dealers from our Chennai facility, with layouts kept on file so every production batch ships with identical cards."
  ],
  featuresTitle: "Cards and booklets we print",
  features: [
    { title: "Warranty cards", description: "Single cards or counterfoil formats with fields for date, dealer stamp, and serial number." },
    { title: "Registration cards", description: "Customer detail cards, ready for mail-back or in-store collection." },
    { title: "Service record booklets", description: "Multi-visit service logs, stitched to survive years of workshop handling." },
    { title: "Serial-numbered formats", description: "Sequential numbering printed in-line for tracking and authenticity." }
  ],
  tableTitle: "Warranty and service card sizes",
  tableParagraph: "Most warranty cards travel inside the product box, so sizing follows the packaging. Standard starting points:",
  tableRows: [
    { category: "Standard Card", size: "A6", dimensions: "4.1\" × 5.8\"", description: "The common warranty card size, fits every box and file." },
    { category: "Large Card / Booklet", rowSpan: 2, size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "Room for terms, service entries, and dealer details." },
    { size: "A5", dimensions: "5.8\" x 8.3\"" },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Matched to your product and packaging." }
  ],
  orderingTitle: "Ordering and pricing",
  orderingParagraphs: [
    "Price follows <strong>size, single card versus booklet, numbering, and quantity</strong>. These are recurring documents — we hold your approved format and reprint it identically with each production run. Orders start at 200 pieces."
  ],
  ctaTitle: "Back your product on paper",
  ctaParagraph: "Send your current warranty card or the fields you need, and we'll quote cards, registration forms, and service booklets clearly."
};

export function WarrantyServiceCards({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
