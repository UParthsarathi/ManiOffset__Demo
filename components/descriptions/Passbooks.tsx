"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Passbooks · Banking",
  featuresEyebrow: "Types",
  tableEyebrow: "Sizes & specs",
  materialsEyebrow: "Press & binding",
  orderingEyebrow: "Pricing",
  introTitle: "Passbook printing built for years of entries",
  introParagraphs: [
    "A passbook is a bank's physical record of an account — transactions, balances, and holder details, written and updated over years. That is what makes passbook printing different from ordinary book work: every ruled line must sit exactly where tellers and printer machines expect it, on paper that takes ink without bleeding, in a binding that survives thousands of counter visits.",
    "We print passbooks at our Chennai facility for banks, co-operative societies, and financial institutions that need the same alignment on copy ten thousand as on copy one."
  ],
  featuresTitle: "Types of passbooks we print",
  features: [
    { title: "Savings account passbooks", description: "The standard counter passbook, ruled for date, particulars, withdrawals, deposits, and balance." },
    { title: "Current account passbooks", description: "Wider columns and higher page counts for business transaction records." },
    { title: "Institution-specific formats", description: "Co-operative societies, chit funds, and NBFCs — page count and ruling style matched to your workflow." }
  ],
  tableTitle: "Passbook sizes",
  tableRows: [
    { category: "Standard Bank Passbook", size: "4\" x 7.5\"", dimensions: "4\" x 7.5\"", description: "The most widely used bank passbook format" },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Made to match your banking format" }
  ],
  materialsTitle: "Ruling, ink, and passbook binding",
  materialsParagraphs: [
    "A passbook fails in one of three ways — misaligned ruling, faded ink, or a broken spine — so our offset process is set up around all three:"
  ],
  materialsList: [
    "Stable ruling that supports both manual entries and passbook printer machines, page after page",
    "Ink consistency held across large institutional batches",
    "Sewn binding with spines that stay flat and intact through frequent handling"
  ],
  orderingTitle: "Ordering passbooks for your institution",
  orderingParagraphs: [
    "Pricing follows <strong>size, page count, ruling, and quantity</strong>. Passbooks are an institutional product — we quote for recurring supply rather than one-off retail runs, and repeat orders reprint from your approved format without new setup. Orders start at 200 copies and ship after proof approval."
  ],
  ctaTitle: "Set up your passbook supply",
  ctaParagraph: "Share a current passbook or your format specs and we'll quote printing and binding for your institution plainly."
};

export function Passbooks({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
