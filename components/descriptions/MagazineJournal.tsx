"use client";

import React from "react";
import { ProductContentTemplate, ProductContentData } from "./ProductContentTemplate";

const CONTENT: ProductContentData = {
  theme: 'amber',
  introTitle: "Made to inform, inspire, and last",
  introParagraphs: [
    "Every magazine and journal begins with an idea — stories, research, and visuals that deserve a professional finish. At FeelThePRINT, we bring those pages to life with true offset craftsmanship: precise colour balance, accurate registration, and on-time dispatch on every single print run.",
    "You focus on the design. We'll handle the printing from the first proof to the final delivered copy — built for the publishers, institutions, and creative studios who can't afford a missed deadline or a colour that drifts halfway through the run."
  ],
  featuresTitle: "What is a magazine? What is a journal?",
  featuresParagraph: "Different purposes, same requirement: clean text, true colour, and consistency across every copy.",
  features: [
    { title: "Magazine", description: "A periodical filled with articles, stories, and visuals, made to inform or entertain." },
    { title: "Journal", description: "A printed publication that records research, updates, or opinions, usually within academic or professional circles. In short, a structured record of thought, study, and insight." }
  ],
  tableTitle: "Magazine and journal sizes",
  tableRows: [
    { category: "Compact Editions", size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "Handy size for academic journals or reports." },
    { category: "Compact Editions", size: "A5", dimensions: "5.8\" x 8.3\"", description: "Standard A5 compact size." },
    { category: "Standard Magazines", size: "1/4 Demy", dimensions: "8.5\" x 11\"", description: "Common format for monthly or quarterly issues." },
    { category: "Standard Magazines", size: "A4", dimensions: "8.3\" x 11.7\"", description: "Standard A4 magazine size." },
    { category: "Medium Digest", size: "1/4 Crown", dimensions: "7\" x 9.5\"", description: "Balanced trim for text-heavy issues with visuals." },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Sized and formatted to match your layout." }
  ],
  materialsTitle: "Journal types and magazine styles",
  materialsParagraphs: [
    "Whether it's a single academic issue or a bulk magazine run, we hold precision and consistency across the entire order."
  ],
  materialsList: [
    "Academic journals — printed for universities and research bodies that need sharp, highly readable text.",
    "Corporate journals — internal newsletters and company updates, presented with clarity and brand tone.",
    "Glossy magazines — vibrant pages for lifestyle, fashion, or design features.",
    "Trade magazines — smooth matte prints for industrial or business readerships.",
    "Custom editions — tailored designs built around your layout, brand, and print schedule."
  ],
  orderingTitle: "Binding and finish, your way",
  orderingParagraphs: [
    "From glossy to matte, saddle-stitched to perfect bound, we handle every specification with care. We know what publishers expect — clarity, colour accuracy, and deadlines met without compromise — because that's what keeps a publication on schedule and on shelves."
  ],
  ctaTitle: "Request a custom quote",
  ctaParagraph: "Request a custom quote for your magazine or journal, and see how professional offset printing can lift the whole publication."
};

export function MagazineJournal({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplate
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
