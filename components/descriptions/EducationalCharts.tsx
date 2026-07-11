"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Charts · Classroom & Kids",
  featuresEyebrow: "Who they're for",
  tableEyebrow: "Sizes & specs",
  closingEyebrow: "Colour that teaches",
  introTitle: "A classroom wall that teaches",
  introParagraphs: [
    "A well-designed chart can explain in one glance what pages of text can't. Our educational chart printing serves the classrooms that run on visuals — from science diagrams above the blackboard to the alphabet chart a five-year-old learns to read from.",
    "Charts live a rough life: pinned, taped, rolled, moved between rooms, and stared at through entire school years. So we print them on sturdy paper with colour that stays vivid — made to survive classroom use, not just decorate it."
  ],
  featuresTitle: "Charts for every age group",
  features: [
    { title: "Wall charts for schools", description: "Subject charts for lessons, labs, and notice boards — the visual backbone of an interactive classroom." },
    { title: "Bulk classroom supply", description: "Full institutional orders delivered quickly, before exams or the start of an academic session." },
    { title: "Kids learning charts", description: "Bright, engaging visuals that make early learning stick for kindergartens and young learners." },
    { title: "Alphabet charts for classrooms", description: "Letters, animals, fruits, and everyday objects on strong stock with vivid colour — a complete early-reading set." }
  ],
  tableTitle: "Educational and kids chart sizes",
  tableRows: [
    { category: "Activity Chart", size: "A4", dimensions: "8.3\" × 11.7\"", description: "Perfect for kids' drawings or subjects." },
    { category: "Standard Educational Chart", size: "Half Demy", dimensions: "11\" × 17.5\"", description: "Best for everyday classroom use." },
    { category: "Large Wall Chart", rowSpan: 2, size: "Crown", dimensions: "15\" x 20\"", description: "Ideal for subject displays, science or geography charts." },
    { size: "Demy", dimensions: "17.5\" x 22.5\"" },
    { category: "Extra Large Chart", rowSpan: 2, size: "Double Crown", dimensions: "20\" x 30\"", description: "Used for big, illustrated kids charts." },
    { size: "Double Demy", dimensions: "22\" x 28\"" },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Sized and finished to suit your syllabus." }
  ],
  closingTitle: "What does chart printing cost?",
  closingParagraphs: [
    "Chart pricing is the simplest on this site: <strong>the sheet size and the quantity</strong> decide it. Bigger sheets cost more per piece; bigger quantities cost less. Orders start at 200 copies and ship 3–10 days after proof approval — in time for the new session.",
    "Colour work on charts isn't decoration — it's legibility. A chart the back row can't read teaches nobody. Our offset colour printing keeps lines sharp and shades true at every size on this page, from an A4 activity sheet to a Double Crown wall display, whether it's one classroom's order or an institution-wide supply."
  ],
  ctaTitle: "Fill the walls with something worth reading",
  ctaParagraph: "Tell us your chart sizes and quantities — classroom, kindergarten, or whole institution — and we'll send a clear quote."
};

export function EducationalCharts({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
