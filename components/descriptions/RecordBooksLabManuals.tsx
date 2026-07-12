"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Record Books · Lab Manuals",
  tableEyebrow: "Sizes & specs",
  materialsEyebrow: "Binding & layouts",
  introTitle: "Made for the lab, bound for the long term",
  introParagraphs: [
    "In every lab, students rely on one thing apart from their instruments — a well-made record book. Lab documentation gets handled hard: carried between benches, opened flat, written in with wet hands and worked through an entire semester. Our record book printing is built around that reality — clear pages, strong paper, and binding that doesn't give up before the course does.",
    "Institutions choose us for lab manual printing because consistency matters when three hundred students need identical books: same rulings, same page counts, same quality from the first copy to the last, delivered before practicals begin."
  ],
  tableTitle: "Record book and lab manual sizes",
  tableRows: [
    { category: "Compact Record Book/Manual", rowSpan: 2, size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "Handy format for field work." },
    { size: "A5", dimensions: "5.8\" x 8.3\"" },
    { category: "Hardbound Record Book", rowSpan: 2, size: "1/4 Demy", dimensions: "8.5\" x 11\"", description: "Strong cover for professional and engineering records." },
    { size: "A4", dimensions: "8.3\" x 11.7\"" },
    { category: "Technical Record Manual", size: "1/4 Crown", dimensions: "7\" x 9.5\"", description: "Perfect size for data and diagrams." },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Printed and bound to match your syllabus or course code." }
  ],
  materialsTitle: "Smart binding, reliable layouts",
  materialsParagraphs: [
    "The right construction depends on how the book will be used:"
  ],
  materialsList: [
    "<strong>Softcover manuals</strong> — ideal for daily lab work and quick note-taking, easy to handle during sessions.",
    "<strong>Hardbound record books</strong> — best for long-term records; the rigid cover keeps pages firm and secure through heavy use.",
    "<strong>Custom page layouts</strong> — ruled sheets for written notes, graph pages for charts, or blank space for sketches and results — all printed with precision.",
    "<strong>Complete manual sets</strong> — full runs prepared for exams or final submissions: printed, bound, and packed under one roof."
  ],
  orderingEyebrow: "Pricing",
  orderingTitle: "What does a record book order cost?",
  orderingParagraphs: [
    "The price comes down to <strong>pages per book, number of copies, and the binding</strong> — softcover manuals cost less per copy; hardbound record books buy years of durability. Orders start at 200 copies and are ready 3–10 days after proof approval, timed so books reach the department before practicals begin."
  ],
  ctaTitle: "Built to record, bound with precision",
  ctaParagraph: "Tell us your course requirements — layout, size, and quantity — and we'll send back a clear quote for your record books or lab manuals."
};

export function RecordBooksLabManuals({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
