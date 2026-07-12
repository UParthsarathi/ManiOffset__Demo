"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Wall Calendars",
  featuresEyebrow: "Formats",
  tableEyebrow: "Sizes & specs",
  orderingEyebrow: "Pricing",
  introTitle: "Twelve months of brand visibility, one print job",
  introParagraphs: [
    "No other print product earns wall space for a full year. A calendar hangs where people look every day — which is why institutions, corporates, and publishers treat calendar printing as a branding decision, not a stationery order.",
    "We print wall calendars at our Chennai plant on offset presses: smooth colour tones, crisp images, and paper stock that still looks fresh in December. A calendar that fades by March advertises the wrong thing about your brand."
  ],
  featuresTitle: "Wall calendar formats we print",
  features: [
    { title: "Single-sheet calendars", description: "All twelve months on one sheet — simple, space-saving, always visible." },
    { title: "Monthly tear-off calendars", description: "The traditional favourite: one clean sheet per month, easy to flip in offices and classrooms." },
    { title: "Corporate image calendars", description: "Each month carries a product photo or message that quietly reinforces the brand, all year." },
    { title: "Custom designs", description: "Coated paper, lamination, and layouts matched to your institution's visual identity." }
  ],
  tableTitle: "Wall calendar sizes",
  tableRows: [
    { category: "Standard Calendar", size: "Half Demy", dimensions: "11\" × 17.5\"", description: "Most common format for offices and institutions." },
    { category: "Large Calendar", rowSpan: 2, size: "Crown", dimensions: "15\" x 20\"", description: "Ideal for corporate visibility and brand display." },
    { size: "Demy", dimensions: "17.5\" x 22.5\"" },
    { category: "Extra Large Calendar", rowSpan: 2, size: "Double Crown", dimensions: "20\" x 30\"", description: "Premium showcase for high-impact visuals." },
    { size: "Double Demy", dimensions: "22\" x 28\"" },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Sized and finished according to your layout." }
  ],
  orderingTitle: "What does calendar printing cost?",
  orderingParagraphs: [
    "Price follows <strong>sheet size, single-sheet versus monthly tear-off, and quantity</strong> — a 12-sheet monthly calendar is effectively twelve print runs bound together, and is priced accordingly. Orders start at 200 copies and ship 3–10 days after proof approval.",
    "One planning note from experience: calendar season is a queue. Orders placed by November hang on walls in January; orders placed in January advertise for eleven months instead of twelve."
  ],
  ctaTitle: "Get on the wall for the whole year",
  ctaParagraph: "Send us your design — or your photos and dates — and we'll quote your wall calendars, clearly and quickly."
};

export function WallCalendars({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
