"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Notebooks · School & College",
  featuresEyebrow: "Rulings",
  tableEyebrow: "Sizes & specs",
  materialsEyebrow: "Custom branding",
  orderingEyebrow: "Pricing",
  introTitle: "Notebooks built for a full year of classes",
  introParagraphs: [
    "A notebook has a hard life: stuffed into bags, opened flat a hundred times, written in every single day. Our notebook printing for schools, colleges, and institutions is built around that reality — smooth pages that take ink and pencil cleanly, rulings that stay straight from margin to margin, and binding that holds through both terms.",
    "We print in institutional quantities on offset presses, so the thousandth copy has the same page shade and line weight as the first. That consistency is the difference between a supplier and a printing partner — and it's what a school correspondent ordering five thousand notebooks actually needs."
  ],
  featuresTitle: "Rulings and formats we print",
  featuresParagraph: "Different classrooms need different pages. These are the formats institutions order most:",
  features: [
    { title: "Single line", description: "The everyday classroom standard — clean, evenly spaced rules for regular subject work." },
    { title: "Four line", description: "For early learners still shaping their handwriting, with guide lines that keep letters in proportion." },
    { title: "Graph and maths", description: "Precise square grids for science, maths, and engineering course work, printed without drift across the page." },
    { title: "Drawing and sketch", description: "Thicker sheets that hold up to sketching, erasing, and pasted charts — ordinary paper tears; this doesn't." }
  ],
  tableTitle: "What sizes do notebooks come in?",
  tableParagraph: "The standard school sizes are 1/8 Demy and A5; colleges mostly use 1/4 Demy and A4 for subject notebooks. The full range we print:",
  tableRows: [
    { category: "Standard Student Use", rowSpan: 2, size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "Compact, easy to carry in bags." },
    { size: "A5", dimensions: "5.8\" x 8.3\"" },
    { category: "College Notebooks", rowSpan: 2, size: "1/4 Demy", dimensions: "8.5\" x 11\"", description: "Widely used for subject notebooks." },
    { size: "A4", dimensions: "8.3\" x 11.7\"" },
    { category: "Long Notebooks", size: "Legal", dimensions: "8.5\" x 13.5\"", description: "Ideal for long-form writing." },
    { category: "Drawing & Sketchbooks", size: "1/4 Crown", dimensions: "7\" x 9.5\"", description: "Balanced size for art and practical work." },
    { category: "Handy Reference", size: "1/8 Crown", dimensions: "4.75\" x 7\"", description: "For quick notes and reminders." },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Your notebook, your style." }
  ],
  materialsTitle: "Custom notebook printing, from the cover in",
  materialsParagraphs: [
    "Most institutional orders aren't plain notebooks — they carry the school's identity. We print custom covers with your institution's name, crest, and colours, subject names on the cover, and keep the design on file so every reorder matches the last batch exactly. One approval, repeatable forever."
  ],
  orderingTitle: "What does a notebook order cost?",
  orderingParagraphs: [
    "Three things set the price: <strong>pages per notebook, number of copies, and the ruling and cover finish.</strong> Runs start at 200 copies, and per-copy cost drops as quantity climbs — which is why bulk school-supply runs are where offset makes real sense. Orders ship within 3–10 days of proof approval, from our Chennai plant to anywhere in India."
  ],
  orderingSteps: [
    "Send your ruling, size, and quantity — cover art if you have it",
    "We send a proof and an itemised quote",
    "Approve, and printing begins"
  ],
  ctaTitle: "Ready to stock the shelves?",
  ctaParagraph: "Send us your specs — ruling, size, quantity, and any cover branding — and we'll send back a clear quote for your notebook order, no obligation attached."
};

export function SchoolCollegeNotebooks({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
