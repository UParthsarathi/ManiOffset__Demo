"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Inserts · Packaging",
  featuresEyebrow: "Types",
  tableEyebrow: "Sizes & specs",
  orderingEyebrow: "Pricing",
  introTitle: "The small sheet inside the box that speaks for the brand",
  introParagraphs: [
    "A product insert is the quietest marketing you print — it waits inside the packaging and greets the customer at the exact moment they're most interested. Our product insert printing keeps that first impression clean: even colour, precise trimming, and folds that sit flat inside the box.",
    "We print inserts and leaflets in packaging-line volumes from our Chennai plant, trimmed and packed to drop straight into your fulfilment process."
  ],
  featuresTitle: "Inserts we print",
  features: [
    { title: "Informational inserts", description: "Usage notes, care instructions, and product details in a compact sheet." },
    { title: "Thank-you and brand cards", description: "A short printed word from the brand that makes an unboxing feel considered." },
    { title: "Safety and compliance leaflets", description: "Required information printed legibly at small sizes, exactly as your compliance copy specifies." },
    { title: "Offer and reorder inserts", description: "Discount codes and cross-sell leaflets that turn one purchase into the next." }
  ],
  tableTitle: "Insert and leaflet sizes",
  tableParagraph: "Inserts are cut to the packaging they travel in. Common starting points from our standard range:",
  tableRows: [
    { category: "Compact Insert", rowSpan: 2, size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "Fits most retail cartons flat or with one fold." },
    { size: "A5", dimensions: "5.8\" x 8.3\"" },
    { category: "Folded Leaflet", size: "1/4 Demy", dimensions: "8.5\" x 11\"", description: "Folds to pocket size with room for detail." },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Cut and folded to your packaging." }
  ],
  orderingTitle: "Ordering and pricing",
  orderingParagraphs: [
    "Priced by <strong>size, folds, and quantity</strong> — inserts are a volume product, and offset economics make large runs the cheap way to do them. Orders start at 200 pieces, with recurring supply quoted to match your production calendar."
  ],
  ctaTitle: "Make the inside of the box count",
  ctaParagraph: "Send your artwork or current insert and we'll quote printing, folding, and packing in plain numbers."
};

export function ProductInsertsLeaflets({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
