"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Comics · Graphic Novels",
  featuresEyebrow: "Definitions",
  tableEyebrow: "Sizes & specs",
  materialsEyebrow: "Styles",
  orderingEyebrow: "Production",
  introTitle: "Where your art becomes real",
  introParagraphs: [
    "That moment when you finally hold your finished comic — the cover in your hands, the pages you drew now solid and real? That's the moment we print for. At FeelThePRINT, we work with creators who care about how their art lands on the page, and we treat every project like it matters, because to the person who made it, it does.",
    "Comic book printing has tricky parts — file setup, colour accuracy, and binding — and we handle them all, so what you get back is steady, true to your artwork, and consistent from the first page to the last. Your vision, printed exactly as you intended it."
  ],
  featuresTitle: "What is a comic? What is a graphic novel?",
  featuresParagraph: "Both live or die on the printing: colour that holds true, art that stays sharp, and binding that survives being read again and again.",
  features: [
    { title: "Comic", description: "A sequence of art and text, often released as issues or short books." },
    { title: "Graphic novel", description: "A longer, complete story told through the same blend of visuals and words." }
  ],
  tableTitle: "Comic and graphic novel sizes",
  tableRows: [
    { category: "Mid-Sized Collections", rowSpan: 2, size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "Popular size for collected runs." },
    { size: "A5", dimensions: "5.8\" x 8.3\"" },
    { category: "Showcase Graphic Books", rowSpan: 2, size: "1/4 Demy", dimensions: "8.5\" x 11\"", description: "Larger size ideal for full-page artwork and long stories." },
    { size: "A4", dimensions: "8.3\" x 11.7\"" },
    { category: "Anthology Collections", size: "1/4 Crown", dimensions: "7\" x 9.5\"", description: "A versatile size, great for multi-creator projects." },
    { category: "Manga Editions", size: "1/8 Crown", dimensions: "4.75\" x 7\"", description: "Compact and highly portable, perfect for manga readers." },
    { category: "Custom Creations", size: "Variable", dimensions: "Flexible", description: "Tailored to match your storyline, artwork, or publisher needs." }
  ],
  materialsTitle: "Styles we specialise in",
  materialsParagraphs: [
    "Every project gets the detail it deserves: colour that stands out, the right stock for the job — from glossy to classic newsprint — and binding that holds, whether stapled or perfect bound."
  ],
  materialsList: [
    "<strong>Classic comic issues</strong> — slim, stapled editions that capture the traditional comic-book feel.",
    "<strong>Collected volumes (TPBs)</strong> — multiple issues gathered into one book, made for the shelf.",
    "<strong>Full-length graphic novels</strong> — original stories published as complete books.",
    "<strong>Pocket manga</strong> — compact, black-and-white formats loved by manga readers."
  ],
  orderingTitle: "Colour, feel, and binding that lasts",
  orderingParagraphs: [
    "From file setup to final copies, our offset presses deliver richer colour, sharper detail, and consistency across the entire run."
  ],
  ctaTitle: "Bring your story to print",
  ctaParagraph: "Send us your files for a free quote, and let's turn your artwork into a book you're proud to hold."
};

export function ComicGraphicNovel({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
