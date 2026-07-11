"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Forms · Answer Sheets · Booklets",
  featuresEyebrow: "Formats",
  tableEyebrow: "Sizes & specs",
  orderingEyebrow: "Institutional supply",
  introTitle: "Exam materials institutions can rely on",
  introParagraphs: [
    "Exams don't wait, and neither can their materials. Answer sheet printing is a volume-and-deadline business: thousands of identical sheets, every rule and margin in the same place, delivered before the exam calendar says they're needed. That's precisely the kind of job an offset plant is built for.",
    "We supply schools, colleges, and universities with the full examination set — loose sheets, stitched booklets, OMR sheets, and admission or registration forms — produced with factory-scale accuracy and institutional consistency."
  ],
  featuresTitle: "What we print for exams",
  features: [
    { title: "Loose answer sheets", description: "Ruled or unruled, with or without margin, customisable with your school or college logo." },
    { title: "Stitched exam booklets", description: "4 to 40 pages, secured for smooth handling in exam conditions." },
    { title: "OMR sheets", description: "Precisely aligned for objective exams and compatible with scanning systems — alignment here isn't cosmetic, it's the whole product." },
    { title: "Application forms", description: "Admission, exam registration, and internal institutional forms with clear fields and consistent layout." }
  ],
  featuresClosing: "Covers and institutional logos can be printed in colour where needed — highlighted covers help exam staff sort sets at a glance.",
  tableTitle: "Forms, booklets, and answer sheet sizes",
  tableRows: [
    { category: "Half Sheets", rowSpan: 2, size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "Compact option for short exams." },
    { size: "A5", dimensions: "5.8\" x 8.3\"" },
    { category: "Standard Application Forms and Answer Sheets", rowSpan: 2, size: "1/4 Demy", dimensions: "8.5\" x 11\"", description: "Widely used format for exams." },
    { size: "A4", dimensions: "8.3\" x 11.7\"" },
    { category: "Exam Booklets", size: "1/4 Crown", dimensions: "7\" x 9.5\"", description: "Popular stitched booklet size." },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Design and size as per your institution's exam needs." }
  ],
  orderingTitle: "What does exam material cost, and how fast does it arrive?",
  orderingParagraphs: [
    "Price is set by <strong>the format (loose sheet, booklet, or OMR), pages per piece, and quantity</strong> — and exam material is where volume pricing works hardest in your favour, since runs are large and layouts repeat. Orders start at 200 copies and ship 3–10 days after proof approval.",
    "From a single department's answer sheets to full-scale institutional supply of forms and booklets, we run exam material with the capacity of a printing factory and the punctuality the academic calendar demands — for exam season, admission season, and everything between."
  ],
  ctaTitle: "Stock up before the exam calendar does",
  ctaParagraph: "Send us your formats and quantities, and we'll quote your complete exam material supply — clearly and quickly."
};

export function ExamMaterials({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
