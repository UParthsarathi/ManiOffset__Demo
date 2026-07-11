"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Flyers · Leaflets · Pamphlets",
  featuresEyebrow: "Which one do you need?",
  tableEyebrow: "Sizes & specs",
  materialsEyebrow: "Formats",
  orderingEyebrow: "Pricing",
  introTitle: "One sheet, delivered a thousand times",
  introParagraphs: [
    "The humblest print products are the hardest working: handed out at gates, slipped under doors, stacked at receptions. Our pamphlet printing — and its flat and folded cousins, flyers and leaflets — is built for that job: colour that stays vibrant across a ten-thousand-piece run, clean folds, and finishing that survives the hand-to-hand journey.",
    "Schools use them for event notices, institutions for awareness drives, businesses for promotions. Whatever the message, offset printing keeps piece number 9,999 as sharp as piece number one."
  ],
  featuresTitle: "Flyer, leaflet, or pamphlet — what's the difference?",
  featuresParagraph: "They're three versions of the same idea, and picking the right one is mostly about how much you need to say:",
  features: [
    { title: "Flyer", description: "A flat, single-sheet handout for quick communication — an event, an offer, a notice. Think of it as a text message in print." },
    { title: "Leaflet", description: "The folded version — bi-fold or tri-fold — for when the message needs sections and structure." },
    { title: "Pamphlet", description: "A compact informative piece, slightly longer, made for education, awareness campaigns, and student guides." }
  ],
  featuresClosing: "Need more room than a fold can give? A 4–48 page piece is a <a href=\"/product/14\" style=\"text-decoration:underline\">brochure or booklet</a>; a full product range belongs in a <a href=\"/product/15\" style=\"text-decoration:underline\">catalogue</a>. One page reaches fast; more pages sell deeper.",
  tableTitle: "Flyer, leaflet, and pamphlet sizes",
  tableRows: [
    { category: "Standard Flyer", rowSpan: 2, size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "Compact and easy to distribute." },
    { size: "A5", dimensions: "5.8\" x 8.3\"" },
    { category: "Large Pamphlet", rowSpan: 2, size: "1/4 Demy", dimensions: "8.5\" x 11\"", description: "Great for visuals and detailed content." },
    { size: "A4", dimensions: "8.3\" x 11.7\"" },
    { category: "Tri-Fold Leaflet", size: "9\" × 12\"", dimensions: "9\" × 12\"", description: "Fits multiple sections or topics." },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Sized and printed to match your layout and purpose." }
  ],
  materialsTitle: "What we print in this family",
  materialsList: [
    "<strong>Single flyers</strong> — one-page handouts for events, promotions, and public notices, in small or bulk quantities with consistent quality throughout.",
    "<strong>Folded leaflets</strong> — bi-fold and tri-fold layouts that organise visuals and information neatly; a favourite of schools and corporates.",
    "<strong>Informative pamphlets</strong> — lightweight and compact, ideal for awareness drives, student guides, and institutional updates.",
    "<strong>Custom designs</strong> — your brand identity carried through paper stock, finish, and coating choices."
  ],
  orderingTitle: "What does pamphlet printing cost?",
  orderingParagraphs: [
    "The formula is short: <strong>size, single or folded, and quantity.</strong> This is the product where offset economics shine brightest — unit cost falls steeply as the run grows, which is why campaigns print in thousands. Orders start at 200 pieces and ship 3–10 days after proof approval from our Chennai plant."
  ],
  ctaTitle: "Say it a thousand times, clearly",
  ctaParagraph: "Send us your artwork — or ask for layout help — and we'll quote your flyers, leaflets, or pamphlets in plain numbers."
};

export function FlyersLeafletsPamphlets({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
