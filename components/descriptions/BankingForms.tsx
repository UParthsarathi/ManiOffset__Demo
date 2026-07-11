"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Banking Forms",
  featuresEyebrow: "Types",
  tableEyebrow: "Sizes & specs",
  orderingEyebrow: "Pricing",
  introTitle: "Banking forms printing, consistent across every batch",
  introParagraphs: [
    "A bank form gets filled by hand, stamped, scanned, filed, and pulled out years later for an audit. Our banking forms printing is set up for that whole lifecycle — clear ruling for accurate data entry, ink that stays sharp through handling, and consistency that holds across bulk institutional volumes.",
    "We print for banks, NBFCs, and financial institutions from our Chennai facility — structured recurring supply, not walk-in copy work."
  ],
  featuresTitle: "Forms we print",
  features: [
    { title: "Application forms", description: "Account opening and service request forms, as single sheets or sets." },
    { title: "KYC forms", description: "Identity and compliance records ruled for clean data capture." },
    { title: "Declaration sheets", description: "Internal approvals and documentation formats." },
    { title: "Multi-part carbonless forms", description: "Account opening kits and document sets that copy through in one impression." }
  ],
  tableTitle: "Banking form sizes",
  tableRows: [
    { category: "Standard Forms", rowSpan: 2, size: "1/4 Demy", dimensions: "8.5\" x 11\"", description: "The most widely used banking format" },
    { size: "A4", dimensions: "8.3\" x 11.7\"" },
    { category: "Compact Forms", size: "1/4 Crown", dimensions: "7\" x 9.5\"", description: "Balanced layout for quick entries" },
    { category: "Extended Forms", size: "Legal", dimensions: "8.5\" x 14\"", description: "Detailed documentation and declarations" },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "As per your bank's format and layout" }
  ],
  orderingTitle: "Ordering and pricing",
  orderingParagraphs: [
    "Pricing follows <strong>size, parts per form, and quantity</strong>. Forms are filled, filed, and stored for audits, so we check ruling and ink flow through the run rather than only at the start. Orders start at 200 pieces, and repeat runs reprint from your approved format without new setup."
  ],
  ctaTitle: "Standardise your form supply",
  ctaParagraph: "Send your current forms or layouts and we'll quote printing across all your formats plainly."
};

export function BankingForms({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
