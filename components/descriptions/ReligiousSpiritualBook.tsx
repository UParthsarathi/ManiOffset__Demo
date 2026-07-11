"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Religious · Spiritual",
  featuresEyebrow: "Formats",
  tableEyebrow: "Sizes & specs",
  materialsEyebrow: "Why it matters",
  introTitle: "Sacred words, printed with care",
  introParagraphs: [
    "Sacred texts deserve a printer who treats them as more than a job. At FeelThePRINT, we specialise in religious and spiritual book printing, handling every page with the care and respect these works are owed.",
    "Whether it's Hindu scriptures, Jain texts, the Quran, Jewish religious books, the Bible, or sacred works from any faith, our offset printing brings every page to life with clarity and dignity. From pocket editions carried in a bag to large-print volumes read aloud in temples and homes, every detail is handled with precision — so the finished book is durable, readable, and beautiful."
  ],
  featuresTitle: "Printing styles and binding options",
  features: [
    { title: "Hardbound editions", description: "Strong and long-lasting. The choice many publishers make for scriptures read daily in temples and homes." },
    { title: "Softcover editions", description: "Light and portable for daily devotion, easy to slip into a bag or hold during prayer, without giving up durability." },
    { title: "Large-print editions", description: "Set in clear, generous fonts so every reader, young or old, can follow with ease." },
    { title: "Custom multi-volume sets", description: "Flexible in size and binding, for when an entire collection of texts needs to be preserved in order." }
  ],
  tableTitle: "Religious and spiritual book sizes",
  tableRows: [
    { category: "Devotional Editions", rowSpan: 2, size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "Common size for spiritual reading." },
    { size: "A5", dimensions: "5.8\" x 8.3\"" },
    { category: "Scholarly Commentaries", rowSpan: 2, size: "1/4 Demy", dimensions: "8.5\" x 11\"", description: "Suitable for detailed study volumes." },
    { size: "A4", dimensions: "8.3\" x 11.7\"" },
    { category: "Illustrated Guides", size: "1/4 Crown", dimensions: "7\" x 9.5\"", description: "Perfect for books with images or multi-language texts." },
    { category: "Travel Prayer Books", size: "1/8 Crown", dimensions: "4.75\" x 7\"", description: "Small, perfect for daily recitations and travel." },
    { category: "Custom Collections", size: "Variable", dimensions: "Flexible", description: "Designed to preserve sacred works in unique formats." }
  ],
  materialsTitle: "Why printing matters for sacred texts",
  materialsParagraphs: [
    "A religious book is not just pages — it carries tradition, history, and guidance. Printing it well means three things:"
  ],
  materialsList: [
    "<strong>Clarity</strong> — sharp fonts and clean layouts, especially important for scripture meant to be read closely.",
    "<strong>Consistency</strong> — every page uniform, whether a single text or a complete multi-volume set.",
    "<strong>Longevity</strong> — quality paper and binding that withstand years of daily reading."
  ],
  materialsClosing: "For us, printing sacred works is more than machinery — it's respect in action, preserving meaning page by page.",
  ctaTitle: "Built on trust, printed with care",
  ctaParagraph: "From books meant for personal devotion to complete collections printed for libraries and institutions, we treat every project with the responsibility it deserves. Send us your files for a free quote."
};

export function ReligiousSpiritualBook({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
