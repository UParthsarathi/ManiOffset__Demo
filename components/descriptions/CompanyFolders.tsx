"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Company Folders",
  featuresEyebrow: "Types",
  tableEyebrow: "Sizes & specs",
  orderingEyebrow: "Pricing",
  introTitle: "The folder is the first page they see",
  introParagraphs: [
    "Reports, certificates, medical files, HR kits — whatever the documents are, the folder around them speaks first. Our company folder printing gives paperwork a professional face: clean colour, strong creasing that folds flat and stays folded, and stock sturdy enough to be handed across a desk more than once.",
    "One honest note before you order: <strong>we print paper file covers only, not plastic folders.</strong> Paper takes your branding beautifully and files neatly — that's our lane."
  ],
  featuresTitle: "Folder types we print",
  features: [
    { title: "Standard paper file covers", description: "Light, neat, and used daily in institutions — the workhorse of document handling." },
    { title: "Premium company folders", description: "Stronger board-style folders for branded kits and client-facing material." },
    { title: "Corporate folder designs", description: "Custom layouts with your colours, branding, and logo carried across the batch." },
    { title: "Custom file covers", description: "Fully designed formats suited to your workflow — from patient files to student records." }
  ],
  featuresClosing: "Where they go: hospitals, schools, corporates, banks, and coaching institutes — anywhere paperwork needs to travel looking organised.",
  tableTitle: "Company folder sizes",
  tableRows: [
    { category: "Compact Folder", rowSpan: 2, size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "Handy format for small document sets" },
    { size: "A5", dimensions: "5.8\" x 8.3\"" },
    { category: "Standard File Cover", rowSpan: 2, size: "1/4 Demy", dimensions: "8.5\" x 11\"", description: "Most used in hospitals and institutions" },
    { size: "A4", dimensions: "8.3\" x 11.7\"" },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Any company folder size you require" }
  ],
  orderingTitle: "What does folder printing cost?",
  orderingParagraphs: [
    "Priced by <strong>size, stock weight, and quantity</strong> — a standard file cover costs a fraction of a board-style branded folder, and both drop steeply per piece in volume. Orders start at 200 folders and ship 3–10 days after proof approval, creased and ready to use."
  ],
  ctaTitle: "Keep the paperwork presentable",
  ctaParagraph: "Tell us the size, stock, and branding — we'll quote your folders clearly, from plain file covers to full corporate kits."
};

export function CompanyFolders({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
