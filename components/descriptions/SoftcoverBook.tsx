"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Softcover · Paperback",
  featuresEyebrow: "The format",
  tableEyebrow: "Sizes & specs",
  materialsEyebrow: "Covers",
  orderingEyebrow: "Pricing",
  orderingFormula: ["Pages", "Copies", "Size"],
  introTitle: "Got a story ready for the press?",
  introParagraphs: [
    "Every book begins the same way: a finished file on a screen and a person wondering what it would feel like as a real, printed thing. Softcover book printing is where that question gets answered. You send the manuscript; we take care of the press, the paper, and the hundred small decisions — ink density, spine glue, trim accuracy — that separate a book that feels right in the hand from one that merely holds together.",
    "We print paperbacks for first-time authors doing a short run, publishers reprinting a title for the fifth time, and institutions producing course material by the thousand. The quantity changes; the standard doesn't. Offset printing means the last copy off the press matches the first — same clean type, same even ink, page after page."
  ],
  featuresTitle: "What exactly is a paperback?",
  featuresParagraph: "A paperback — also called a softcover — is a book with a flexible card cover glued directly to the spine. It's the format most of the world reads in, for three plain reasons:",
  features: [
    { title: "It travels well", description: "Light enough to live in a bag, sturdy enough to survive the commute." },
    { title: "It lasts", description: "A properly bound paperback keeps its shape and its spine through dozens of reads." },
    { title: "It's affordable", description: "The most budget-friendly way to print a real book — ten copies or ten thousand." }
  ],
  featuresClosing: "<strong>Paperback or hardcover?</strong> Choose paperback when the book is meant to be <em>read</em> — carried, lent, re-read, replaced. Choose hardcover when it's meant to be <em>kept</em> — displayed, gifted, referenced for years. Paperback costs noticeably less per copy; hardcover buys permanence. Many publishers do both: a hardcover first edition, then paperback for the wide run. <a href=\"/product/2\" style=\"text-decoration:underline\">See hardcover printing →</a>",
  tableTitle: "Sizes we print",
  tableParagraph: "Not sure which size fits your manuscript? Tell us the page count and how the book will be used — we'll recommend one in a single reply.",
  tableRows: [
    { category: "Standard Edition", rowSpan: 2, size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "The most popular paperback format used by publishers worldwide." },
    { size: "A5", dimensions: "5.8\" x 8.3\"" },
    { category: "Study & Reference", rowSpan: 2, size: "1/4 Demy", dimensions: "8.5\" x 11\"", description: "Suitable for guides, handbooks, and academic material." },
    { size: "A4", dimensions: "8.3\" x 11.7\"" },
    { category: "Visual & Manual", size: "1/4 Crown", dimensions: "7\" x 9.5\"", description: "Gives extra room for images, diagrams, or notes." },
    { category: "Compact Reads", size: "1/8 Crown", dimensions: "4.75\" x 7\"", description: "Small, travel-friendly size — perfect for novellas." },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Designed to fit your manuscript or layout preferences." }
  ],
  materialsTitle: "A cover that sets the tone",
  materialsParagraphs: [
    "The cover is the first thing a reader touches, and it quietly tells them what kind of book they're holding. We print two styles:"
  ],
  materialsList: [
    "<strong>Standard cover</strong> — a clean, flexible wrapper that keeps the book light and easy in the hand. The natural choice for novels, reports, study copies, and any book meant to be read often and carried everywhere.",
    "<strong>French fold cover</strong> — cut from heavier stock with extended flaps folded inside, giving the edges a firmer, more finished feel — closer to a hardcover's presence at a paperback's weight. For premium runs and limited editions: the books that deserve a little ceremony."
  ],
  materialsClosing: "Either way, covers come off the same offset presses as the pages — deep, even colour, true texture, and fold lines clean enough that the book feels right the moment it's picked up.",
  orderingTitle: "What your price depends on",
  orderingParagraphs: [
    "Three things, and only three: <strong>how many pages, how many copies, and which size.</strong> Runs start at 200 copies — that's where offset starts saving you real money — and scale to whatever your release needs. Most orders ship within 3–10 days of proof approval. Your quote arrives itemised, with nothing tucked into fine print."
  ],
  orderingSteps: [
    "Send your file",
    "Choose your size",
    "Leave the rest to us"
  ],
  ctaTitle: "Let's bring your pages to life",
  ctaParagraph: "Send us your manuscript and we'll send back a free, no-obligation quote — and show you how straightforward printing a proper paperback can be."
};

export function SoftcoverBook({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
