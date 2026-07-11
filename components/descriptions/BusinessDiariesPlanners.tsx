"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Diaries · Planners · Corporate",
  featuresEyebrow: "Layouts",
  tableEyebrow: "Sizes & specs",
  materialsEyebrow: "The collection",
  orderingEyebrow: "Pricing",
  introTitle: "The diary on every desk that matters",
  introParagraphs: [
    "A corporate diary is the one piece of branding your clients and staff open every working day of the year. Our diary printing gives that daily touchpoint the build it deserves: smooth paper that takes every pen, firm binding that survives 250 working days, and covers — laminated, case-bound, or leather-finish — that still look boardroom-ready in November.",
    "Companies order them branded: logo on the cover, yearly calendar inside, brand colours throughout. One design approval covers the whole batch, and next year's reorder matches it exactly."
  ],
  featuresTitle: "Planner layouts to match how you work",
  features: [
    { title: "Week, month, or year planners", description: "Choose the rhythm your teams actually plan in — one spread per week, per month, or the full year at a glance." },
    { title: "Calendar diaries", description: "Planning and date-tracking combined, for everyday desk use." },
    { title: "Unruled diaries", description: "Open pages for notes, sketches, and free-form planning." },
    { title: "5-year planners", description: "Built for long-term tracking across departments and organisations." }
  ],
  featuresClosing: "Looking for student planners or school diaries with timetables? Those live on our <a href=\"/product/8\" style=\"text-decoration:underline\">academic diaries page</a> — this one is for the corporate desk.",
  tableTitle: "Business diary and planner sizes",
  tableRows: [
    { category: "Standard Planner", rowSpan: 2, size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "Easy to carry for daily use." },
    { size: "A5", dimensions: "5.8\" x 8.3\"" },
    { category: "Executive Diary", rowSpan: 2, size: "1/4 Demy", dimensions: "8.5\" x 11\"", description: "Spacious design for professionals." },
    { size: "A4", dimensions: "8.3\" x 11.7\"" },
    { category: "Desk Diary", size: "1/4 Crown", dimensions: "7\" x 9.5\"", description: "Ideal for scheduling and notes." },
    { category: "Handy Planner", size: "1/8 Crown", dimensions: "4.75\" x 7\"", description: "Compact for travel or meetings." },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Tailored to your preferred format." }
  ],
  materialsTitle: "The FeelThePRINT collection",
  materialsList: [
    "<strong>Corporate planner editions</strong> — custom business planner layouts with your logo, yearly calendar, and brand theme for a consistent professional look.",
    "<strong>Executive diary options</strong> — compact or spacious formats for daily meetings, planning, and notes.",
    "<strong>Cover choices</strong> — soft laminated, case-bound, or leather-finish covers, all printed with offset precision.",
    "<strong>Online diary orders</strong> — upload your design and details; setup, proofing, and delivery handled with care."
  ],
  orderingTitle: "What does corporate diary printing cost?",
  orderingParagraphs: [
    "Four levers: <strong>size, page count, cover finish, and quantity</strong> — the cover is where the range lies, from economical laminated to leather-finish executive editions. Orders start at 200 diaries and ship 3–10 days after proof approval.",
    "New-year diaries are a season: orders confirmed by early December are on desks in the first week of January. Every diary is checked for ruling, paper alignment, and finish before dispatch."
  ],
  ctaTitle: "Put your brand on the desk, all year",
  ctaParagraph: "Tell us the layout, cover, and quantity — we'll send a proof and a clear quote for your corporate diaries."
};

export function BusinessDiariesPlanners({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
