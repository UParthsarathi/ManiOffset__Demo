"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Brochures · Booklets",
  featuresEyebrow: "Definitions",
  tableEyebrow: "Sizes & specs",
  materialsEyebrow: "Folds & bindings",
  orderingEyebrow: "Pricing",
  introTitle: "When your story needs more than one page",
  introParagraphs: [
    "Some messages fit on a sheet; others need room to unfold — literally. Our brochure printing covers everything from a tri-fold menu to a gate-fold launch piece, and our booklet work runs from stapled training guides to perfect-bound company profiles.",
    "Offset press work is what separates a brochure that gets kept from one that gets binned: crisp detail, rich colour, and binding that doesn't give up at the spine. That's the standard every piece leaves here with."
  ],
  featuresTitle: "Brochure or booklet — which is which?",
  features: [
    { title: "Brochure", description: "A folded print piece giving readers a quick overview — events, promotions, company introductions. Built to catch attention and share key points at a glance." },
    { title: "Booklet", description: "A small bound document with multiple pages, for when you need more room — detailed guides, manuals, and short catalogues people keep for reference." }
  ],
  featuresClosing: "For a single unfolded sheet, see <a href=\"/product/13\" style=\"text-decoration:underline\">flyers and pamphlets</a>; for 100+ page product ranges, a <a href=\"/product/15\" style=\"text-decoration:underline\">catalogue</a> is the right vehicle. This page covers the 4–48 page territory in between — where brand storytelling lives.",
  tableTitle: "Brochure and booklet sizes",
  tableRows: [
    { category: "Compact Brochure", rowSpan: 2, size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "Handy format for marketing or distribution." },
    { size: "A5", dimensions: "5.8\" x 8.3\"" },
    { category: "Standard Booklet", rowSpan: 2, size: "1/4 Demy", dimensions: "8.5\" x 11\"", description: "Widely used for reports." },
    { size: "A4", dimensions: "8.3\" x 11.7\"" },
    { category: "Crown Booklet", size: "1/4 Crown", dimensions: "7\" x 9.5\"", description: "Balanced size for handbooks and visual layouts." },
    { category: "Compact Booklet", size: "1/8 Crown", dimensions: "4.75\" x 7\"", description: "Small, portable format for quick references." },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Printed and bound as per your layout and design." }
  ],
  materialsTitle: "Folds and bindings we produce",
  materialsParagraphs: [
    "The fold or the spine is the piece's personality — choose by how it will be read:"
  ],
  materialsList: [
    "<strong>Tri-fold, Z-fold, and half-fold brochures</strong> — the everyday workhorses for menus, events, and simple marketing pieces.",
    "<strong>Gate-fold and accordion brochures</strong> — for designs that need to open wide and land a strong visual moment.",
    "<strong>Saddle-stitched booklets</strong> — light and practical, bound with staples through the fold; the favourite for school reports, training guides, and quick-reference manuals.",
    "<strong>Perfect-bound booklets</strong> — a flat, glued spine that looks professional and sturdy; chosen for catalogues, magazines, and company profiles.",
    "<strong>Institutional bill booklets</strong> — bill book printing with serial numbering, built for daily use at school, office, and banking counters."
  ],
  orderingTitle: "What does brochure printing cost?",
  orderingParagraphs: [
    "Four inputs: <strong>size, page count, fold or binding type, and quantity.</strong> A tri-fold costs less per piece than a gate-fold; saddle stitching costs less than perfect binding — we'll tell you plainly where your money goes. Orders start at 200 pieces and ship 3–10 days after proof approval."
  ],
  ctaTitle: "Give your brand its proper pages",
  ctaParagraph: "Send your layout — or the rough idea of it — and we'll quote your brochures or booklets with every option priced clearly."
};

export function BrochuresBooklets({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
