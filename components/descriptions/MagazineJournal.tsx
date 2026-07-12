"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Magazines · Journals",
  featuresEyebrow: "Definitions",
  tableEyebrow: "Sizes & specs",
  materialsEyebrow: "Styles",
  orderingEyebrow: "Binding & finish",
  introTitle: "Made to inform, inspire, and last",
  introParagraphs: [
    "Every magazine and journal begins with an idea — stories, research, and visuals that deserve a professional finish. At FeelThePRINT, we bring those pages to life with true offset craftsmanship: precise colour balance, accurate registration, and on-time dispatch on every single print run.",
    "You focus on the design; our magazine and journal printing covers everything from the first proof to the final delivered copy — built for the publishers, institutions, and creative studios who can't afford a missed deadline or a colour that drifts halfway through the run."
  ],
  featuresTitle: "What is a magazine? What is a journal?",
  featuresParagraph: "Different purposes, same requirement: clean text, true colour, and consistency across every copy.",
  features: [
    { title: "Magazine", description: "A periodical filled with articles, stories, and visuals, made to inform or entertain." },
    { title: "Journal", description: "A printed publication that records research, updates, or opinions, usually within academic or professional circles. In short, a structured record of thought, study, and insight." }
  ],
  tableTitle: "Magazine and journal sizes",
  tableRows: [
    { category: "Compact Editions", rowSpan: 2, size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "Handy size for academic journals or reports." },
    { size: "A5", dimensions: "5.8\" x 8.3\"" },
    { category: "Standard Magazines", rowSpan: 2, size: "1/4 Demy", dimensions: "8.5\" x 11\"", description: "Common format for monthly or quarterly issues." },
    { size: "A4", dimensions: "8.3\" x 11.7\"" },
    { category: "Medium Digest", size: "1/4 Crown", dimensions: "7\" x 9.5\"", description: "Balanced trim for text-heavy issues with visuals." },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Sized and formatted to match your layout." }
  ],
  materialsTitle: "Journal types and magazine styles",
  materialsParagraphs: [
    "Whether it's a single academic issue or a bulk magazine run, we hold precision and consistency across the entire order."
  ],
  materialsList: [
    "<strong>Academic journals</strong> — printed for universities and research bodies that need sharp, highly readable text.",
    "<strong>Corporate journals</strong> — internal newsletters and company updates, presented with clarity and brand tone.",
    "<strong>Glossy magazines</strong> — vibrant pages for lifestyle, fashion, or design features.",
    "<strong>Trade magazines</strong> — smooth matte prints for industrial or business readerships.",
    "<strong>Custom editions</strong> — tailored designs built around your layout, brand, and print schedule."
  ],
  orderingTitle: "Binding and finish, your way",
  orderingParagraphs: [
    "From glossy to matte stock, saddle-stitched to perfect bound, we handle every specification with care. We know what publishers expect — clarity, colour accuracy, and deadlines met without compromise — because that's what keeps a publication on schedule and on shelves."
  ],
  ctaTitle: "Put your publication on press",
  ctaParagraph: "Request a custom quote for your magazine or journal, and see how professional offset printing can lift the whole publication."
};

export function MagazineJournal({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
