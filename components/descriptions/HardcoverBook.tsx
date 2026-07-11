"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Hardcover · Hardbound",
  featuresEyebrow: "The format",
  tableEyebrow: "Sizes & specs",
  materialsEyebrow: "Binding",
  orderingEyebrow: "How it works",
  introTitle: "Some books are meant to be objects",
  introParagraphs: [
    "A hardcover isn't just another title on a shelf — it has presence. Weight in the hand. That quiet solidity that tells you, before you've read a word, that this is a book built to last. And that soft creak when you first open it? That's the sound of something made properly.",
    "At FeelThePRINT, hardcover book printing is done the way people who love books would want it done. The press work matters, of course — but it's the binding that gives a hardcover its character, and that's the part we've spent decades getting right. Whether it's a novel, a university reference volume, or a commemorative edition meant to outlive everyone who reads it, we build each one to feel like it should."
  ],
  featuresTitle: "What is a hardcover book?",
  featuresParagraph: "A hardcover — also called a hardback — is built around a rigid board cover, wrapped in paper or cloth. It's the format people choose when a book deserves something more substantial:",
  features: [
    { title: "Durable", description: "The rigid cover protects the pages for years, even decades." },
    { title: "Solid", description: "It holds its shape and weight, standing firm on any shelf." },
    { title: "Elegant", description: "There's simply nothing that looks as considered as a well-made hardback." }
  ],
  featuresClosing: "It's the format for the books people keep. It's also why a hardcover costs more per copy than a paperback — rigid board, cloth or paper wrapping, and the extra binding work are real materials and real labour. What that buys is decades of shelf life.",
  tableTitle: "Finding your size",
  tableParagraph: "The right trim size sets the character of the finished book. Here's the full range we print:",
  tableRows: [
    { category: "Standard Hardback", rowSpan: 2, size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "Common format for novels, biographies, and general titles." },
    { size: "A5", dimensions: "5.8\" x 8.3\"" },
    { category: "Institutional Volume", rowSpan: 2, size: "1/4 Demy", dimensions: "8.5\" x 11\"", description: "Preferred by universities and companies for reference books." },
    { size: "A4", dimensions: "8.3\" x 11.7\"" },
    { category: "Visual Showcase", size: "1/4 Crown", dimensions: "7\" x 9.5\"", description: "Extra space for illustrated, photo-heavy, or art publications." },
    { category: "Personal Edition", size: "1/8 Crown", dimensions: "4.75\" x 7\"", description: "Compact and durable, often used for portable hardbacks." },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Built to your specifications — from trim size to binding style." }
  ],
  tableClosing: "Not sure what suits your book? Tell us what it is, and we'll guide you to the right size and spine.",
  materialsTitle: "Choosing your binding",
  materialsParagraphs: [
    "The spine shapes both how a hardcover looks and how it opens. We offer two:"
  ],
  materialsList: [
    "<strong>Rounded spine</strong> — a heritage look with a gentle, classic curve. It's the traditional choice for novels and academic titles, the shape most people picture when they imagine a proper hardbound book.",
    "<strong>Square back</strong> — a flat spine with clean, sharp edges and a crisp modern finish. It suits business reports, textbooks, and any project that calls for a solid, contemporary feel."
  ],
  orderingTitle: "Printing your hardcover with us",
  orderingParagraphs: [
    "Most online book printing feels impersonal — a file goes into a void and copies come out the other end. We do it differently. Upload your file, get a clear price, and talk to real people whenever you need to. From paper choice to binding style, we walk through it with you.",
    "And every copy runs on our offset presses — richer colour, sharper detail, and the same quality from the first book to the last. This isn't rushed digital work; it's proper craftsmanship, the kind a hardcover deserves."
  ],
  ctaTitle: "Built to last, printed to impress",
  ctaParagraph: "Send us your file for a free, no-obligation quote — and see how a properly made hardcover stands apart."
};

export function HardcoverBook({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
