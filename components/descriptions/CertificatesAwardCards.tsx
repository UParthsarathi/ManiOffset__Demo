"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Certificates · Award Cards",
  featuresEyebrow: "Types",
  tableEyebrow: "Sizes & specs",
  orderingEyebrow: "Pricing",
  introTitle: "Print that makes recognition feel real",
  introParagraphs: [
    "A certificate is proof someone can hold: of an award earned, a training completed, a partnership valued. Our certificate printing gives corporate recognition the finish it deserves — refined layouts, accurate colour, and consistency that holds across a batch of five hundred as surely as across five.",
    "We print for employee award programs, partner recognition, customer appreciation, training completions, and seminar participation — for teams in Chennai and across India."
  ],
  featuresTitle: "Certificate formats we print",
  features: [
    { title: "Standard certificates", description: "Clean, formal layouts used across most office award programs." },
    { title: "Award cards", description: "Small, handy cards for staff appreciation and customer rewards." },
    { title: "Certificate shells", description: "Pre-printed sheets with your design and blank name fields — kept in stock so recognition never waits on a print run." }
  ],
  featuresClosing: "For school marksheets, report cards, and academic certificates, see our <a href=\"/product/11\" style=\"text-decoration:underline\">academic records page</a> — this page is dedicated to corporate recognition.",
  tableTitle: "Corporate certificate sizes",
  tableRows: [
    { category: "Compact Award Card", rowSpan: 2, size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "Handy size for loyalty or achievement cards" },
    { size: "A5", dimensions: "5.8\" x 8.3\"" },
    { category: "Standard Corporate Certificate", rowSpan: 2, size: "1/4 Demy", dimensions: "8.5\" x 11\"", description: "Most used for office recognition and formal awards" },
    { size: "A4", dimensions: "8.3\" x 11.7\"" },
    { category: "Premium Certificate Format", size: "1/4 Crown", dimensions: "7\" x 9.5\"", description: "Balanced layout for awards and appreciation" },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Built for your preferred certificate print format" }
  ],
  orderingTitle: "What does certificate printing cost?",
  orderingParagraphs: [
    "Three inputs: <strong>size, paper quality, and quantity</strong> — with certificate shells as the budget-smart option for ongoing programs, since one print run covers months of awards. Orders start at 200 pieces and ship 3–10 days after proof approval, with ink flow and edges checked through the run."
  ],
  ctaTitle: "Make the moment official",
  ctaParagraph: "Send your design — or your logo and award text for layout help — and we'll quote your certificates and award cards plainly."
};

export function CertificatesAwardCards({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
