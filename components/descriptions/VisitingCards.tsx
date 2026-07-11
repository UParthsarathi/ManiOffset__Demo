"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Visiting Cards",
  featuresEyebrow: "Finishes",
  tableEyebrow: "Sizes & specs",
  orderingEyebrow: "Pricing",
  introTitle: "The smallest print job with the biggest job to do",
  introParagraphs: [
    "When someone meets you, the card you leave behind keeps making your impression after you've left the room. Our visiting card printing treats that seriously: offset precision for sharp type, colours that match your brand exactly, and card stock that feels confident between two fingers — because people absolutely do judge a card by its weight.",
    "And if you're wondering — <strong>visiting card and business card are the same thing</strong>; India says visiting card, most of the world says business card. Either way, it's your professional identity at 3.5 by 2 inches, and it deserves better than flimsy."
  ],
  featuresTitle: "Card finishes we print",
  features: [
    { title: "Classic matte", description: "Smooth, glare-free surface with a timeless corporate look — the safe choice that never looks like one." },
    { title: "Glossy", description: "Bright, reflective coating that makes colour and detail pop — suits visual brands." },
    { title: "Embossed & spot UV", description: "Raised texture and selective gloss for contrast you can feel — the finishes people run a thumb over." },
    { title: "Folded cards", description: "Double the space — QR codes, profiles, or mini product details on the inside." }
  ],
  tableTitle: "What size is a visiting card?",
  tableParagraph: "The standard visiting card is 3.5\" × 2\" — it fits every wallet, cardholder, and shirt pocket ever made. The alternatives exist to stand out on purpose:",
  tableRows: [
    { category: "Standard", size: "3.5” × 2”", dimensions: "3.5” × 2”", description: "The classic size, easy to store and share." },
    { category: "Square", size: "2.5” × 2.5”", dimensions: "2.5” × 2.5”", description: "Creative format that stands out for modern brands." },
    { category: "Folded (Tent Card)", size: "3.5” × 4”", dimensions: "3.5” × 4”", description: "Perfect when you need extra room for contact or service info." },
    { category: "Custom", size: "Flexible", dimensions: "Flexible", description: "Designed to your exact layout and branding needs." }
  ],
  orderingTitle: "What does visiting card printing cost?",
  orderingParagraphs: [
    "Cards price on <strong>finish and quantity</strong> — matte and glossy are the economical pair; embossing and spot UV add a per-card premium that's usually worth it for client-facing roles. Orders start at 200 cards (a working year's worth for most people) and ship 3–10 days after proof approval from our Chennai plant.",
    "Every batch is offset printed, so your reorder next year matches this year's cards exactly — same colour, same alignment, same weight."
  ],
  ctaTitle: "Your identity, perfectly in print",
  ctaParagraph: "Send us your design — or your logo and details for layout help — and we'll quote your visiting cards with every finish priced clearly."
};

export function VisitingCards({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
