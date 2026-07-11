"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Product Catalogues",
  featuresEyebrow: "Why print one",
  tableEyebrow: "Sizes & specs",
  orderingEyebrow: "Pricing",
  introTitle: "Your whole range, in your customer's hands",
  introParagraphs: [
    "A good product catalogue doesn't just list what you sell — it makes the buying decision easier. Clean layouts, accurate colour, and pages arranged so a customer finds what they need in seconds: that's the brief every catalogue leaves here having met.",
    "Our catalogue printing serves businesses that put their range on paper — from a compact reference guide to a hundred-plus-page master catalogue — with the colour accuracy that makes a printed product look like the real one. When your customer chooses from the page, the page has to tell the truth."
  ],
  featuresTitle: "Why brands still print catalogues",
  features: [
    { title: "It sells without a salesperson", description: "A catalogue is a visual presentation of everything you offer, arranged for easy understanding and quick decisions — working on the customer's desk long after the meeting ends." },
    { title: "Colour builds confidence", description: "Accurate tones and clean layouts show products the way they actually look — the difference between a browse and an order." },
    { title: "Print signals seriousness", description: "A well-produced catalogue tells customers you pay attention to detail — a polished, professional image for the whole brand." }
  ],
  featuresClosing: "For shorter pieces — a company overview or an event handout — a <a href=\"/product/14\" style=\"text-decoration:underline\">brochure or booklet</a> does the job at lower cost. Catalogues earn their keep from about 8 pages up to 100+.",
  tableTitle: "Product catalogue sizes",
  tableRows: [
    { category: "Compact", rowSpan: 2, size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "Ideal for quick reference guides." },
    { size: "A5", dimensions: "5.8\" x 8.3\"" },
    { category: "Standard", rowSpan: 2, size: "1/4 Demy", dimensions: "8.5\" x 11\"", description: "Best for detailed product ranges." },
    { size: "A4", dimensions: "8.3\" x 11.7\"" },
    { category: "Crown Catalogue", size: "1/4 Crown", dimensions: "7\" x 9.5\"", description: "Balanced size often used for illustrated or technical catalogues." },
    { category: "Large Format", size: "9″ × 12″", dimensions: "9″ × 12″", description: "Suited for image-heavy layouts and premium designs." },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Adjusted to your design or branding needs." }
  ],
  orderingTitle: "What does catalogue printing cost?",
  orderingParagraphs: [
    "The three usual levers — <strong>size, page count, and quantity</strong> — plus one that matters more here than anywhere: <strong>paper and finish</strong>, because a catalogue's stock is part of the sales pitch. Runs start at 200 copies and ship 3–10 days after you approve the proof.",
    "Every catalogue goes through a hands-on process, from layout checks to final binding — pages aligned, colours held true, every copy ready to represent the brand with confidence."
  ],
  ctaTitle: "Put the whole range on paper",
  ctaParagraph: "Send us your product range and layout, and we'll quote your catalogue — size, stock, and binding options priced clearly."
};

export function ProductCatalogues({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
