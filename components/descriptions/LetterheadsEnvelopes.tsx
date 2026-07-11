"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Letterheads · Envelopes",
  featuresEyebrow: "The set",
  tableEyebrow: "Sizes & specs",
  materialsEyebrow: "Styles",
  orderingEyebrow: "Pricing",
  introTitle: "Official paper that sounds like your organisation",
  introParagraphs: [
    "Before a letter is read, its paper has already spoken. A letterhead carries your organisation's name, logo, and contact details — it's what turns a printed sheet into an official document. The envelope is the handshake before it: the first branded thing the recipient touches.",
    "Our letterhead printing and envelope work are built as matched sets — same artwork, same colour values, same tone — so everything that leaves your office looks like it came from one identity, not two vendors."
  ],
  featuresTitle: "Why print them as a set",
  features: [
    { title: "Letterhead", description: "A printed sheet carrying your name, logo, and details — what makes official papers unmistakably yours. Clean alignment and colour matched to your identity." },
    { title: "Envelope", description: "The folded cover that holds the document — with or without a window, addressed cleanly, and carrying the same artwork as the sheet inside." }
  ],
  featuresClosing: "Order them together and both pieces are proofed against each other — logo position, ink density, and paper tone checked as one job.",
  tableTitle: "Letterhead and envelope sizes",
  tableParagraph: "The pairing is practical: a DL envelope takes an A4 letterhead folded in three; a C4 envelope takes it flat.",
  tableRows: [
    { category: "Standard Letterhead", size: "A4", dimensions: "8.3” × 11.7”", description: "Ideal for corporate and institutional use" },
    { category: "Executive Letterhead", rowSpan: 2, size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "Compact size for personal or small-office communication" },
    { size: "A5", dimensions: "5.8\" x 8.3\"" },
    { category: "Standard Envelope", size: "DL", dimensions: "9” × 4”", description: "Designed for folded A4 sheets" },
    { category: "Large Envelope", size: "C4", dimensions: "9” × 12.8”", description: "Fits unfolded documents neatly" },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Tailored as per your required envelope size" }
  ],
  materialsTitle: "Styles we print",
  materialsList: [
    "<strong>Standard letterheads</strong> — clear, formal layouts for everyday correspondence.",
    "<strong>Custom letterpad printing</strong> — designed around your logo, colours, and type style.",
    "<strong>Standard envelopes</strong> — regular business envelopes, with or without window, set up for clean addressing.",
    "<strong>Branded envelope covers</strong> — artwork carried over from the letterhead so both pieces read as one set."
  ],
  orderingTitle: "What does letterhead printing cost?",
  orderingParagraphs: [
    "Priced by <strong>size, single or full colour, paper quality, and quantity</strong> — and ordering letterheads and envelopes together is cheaper than two separate jobs, since they share setup. Orders start at 200 pieces and ship 3–10 days after proof approval."
  ],
  ctaTitle: "Put your name on the paper",
  ctaParagraph: "Send your logo and details — we'll handle layout, proof both pieces as a set, and quote it plainly."
};

export function LetterheadsEnvelopes({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
