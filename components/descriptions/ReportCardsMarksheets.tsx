"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Report Cards · Marksheets",
  tableEyebrow: "Sizes & specs",
  materialsEyebrow: "What we print",
  introTitle: "Documents that make achievement official",
  introParagraphs: [
    "A marksheet is read twice: once by the student on results day, and then by every institution and employer that asks for it afterwards. Our marksheet printing gives these documents what they need to do that job for years — precise layouts, durable stock, and detail-checking that treats every number as the record it is.",
    "Schools and universities also come to us for report card printing in institutional volumes: clear layouts on strong paper, produced through offset for sharp colour and balanced ink across every copy in the batch."
  ],
  tableTitle: "Report card, certificate, and marksheet sizes",
  tableRows: [
    { category: "Report Card", rowSpan: 2, size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "Compact for class-level evaluations." },
    { size: "A5", dimensions: "5.8\" x 8.3\"" },
    { category: "Certificate", rowSpan: 2, size: "1/4 Demy", dimensions: "8.5\" x 11\"", description: "Standard for schools and universities." },
    { size: "A4", dimensions: "8.3\" x 11.7\"" },
    { category: "Marksheet", size: "Legal", dimensions: "8.5\" x 14\"", description: "Ideal for detailed, multi-term results." },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Created to match your layout or design." }
  ],
  materialsTitle: "The academic records we produce",
  materialsParagraphs: [
    "Each document type gets its own handling:"
  ],
  materialsList: [
    "<strong>Report cards</strong> — clear layouts on strong stock, for term-wise or annual evaluations, with accurate and secure formatting.",
    "<strong>School and university certificates</strong> — available with foiling, embossing, or watermarking for authenticity; bulk academic orders handled with ease.",
    "<strong>Marksheets</strong> — every copy reviewed manually, from numbering to alignment, for a clean and professional result."
  ],
  materialsClosing: "For corporate award certificates and recognition cards, see our <a href=\"/product/23\" style=\"text-decoration:underline\">Certificates &amp; Award Cards</a> page — this one is dedicated to academic records.",
  orderingEyebrow: "Pricing",
  orderingTitle: "What does marksheet or report card printing cost?",
  orderingParagraphs: [
    "Three inputs decide it: <strong>the document size, the number of copies, and the security finishes</strong> — foiling, embossing, or watermarking add per-copy cost but are what make a certificate verifiable. Orders start at 200 copies and ship 3–10 days after proof approval, with every marksheet batch checked manually before dispatch."
  ],
  ctaTitle: "Built for achievement, meant to last",
  ctaParagraph: "Share your layout — or ask us to help design one — and we'll quote your report cards, marksheets, or school certificates precisely."
};

export function ReportCardsMarksheets({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
