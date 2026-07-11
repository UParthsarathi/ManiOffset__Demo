"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Challans · Deposit Slips",
  featuresEyebrow: "Formats",
  orderingEyebrow: "Pricing",
  introTitle: "Deposit slip printing that keeps counters moving",
  introParagraphs: [
    "A deposit slip is filled in seconds, stamped, torn, and filed — and it has to stay legible through all of it. Our deposit slip printing is built for that daily grind: ruling that is easy to write on, paper that takes a rubber stamp without smudging, and alignment that holds across every pad in the batch.",
    "We supply banks and financial institutions from our Chennai plant — recurring runs matched exactly to your branch formats."
  ],
  featuresTitle: "Formats we print",
  features: [
    { title: "Cash deposit slips", description: "Counter slips for teller transactions, ruled for denominations and totals." },
    { title: "Cheque deposit slips", description: "Slips filed with instruments, with space for cheque numbers and account details." },
    { title: "Combined challan formats", description: "Multi-purpose challans for branch accounting records." }
  ],
  featuresClosing: "Most formats run as carbonless multi-part sets — bank copy, customer copy, and accounts copy in one impression, no carbon paper.",
  orderingTitle: "Ordering and pricing",
  orderingParagraphs: [
    "Pricing follows <strong>format, parts per set, and quantity</strong>. There is no standard size table here — challans and slips are made to match your bank's existing format, so send a sample and we replicate it exactly. For bank challan printing and slip supply we quote recurring runs, with orders from 200 sets."
  ],
  ctaTitle: "Keep your branches stocked",
  ctaParagraph: "Send a sample slip or your format specs and we'll quote your challans and deposit slips plainly."
};

export function ChallansDepositSlips({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
