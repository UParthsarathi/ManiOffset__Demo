"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Diaries · Planners · Academic",
  featuresEyebrow: "Formats",
  tableEyebrow: "Sizes & specs",
  materialsEyebrow: "Planner or diary?",
  closingEyebrow: "On schedule",
  introTitle: "An academic year, organized page by page",
  introParagraphs: [
    "Schools, colleges, and universities come to us for school diary printing with structure built right into the page — timetable grids, subject slots, term calendars, and space for the notes that hold a year together. Some institutions want a compact daily format for students; others need a fuller faculty diary with event planning spreads. Both come off the same press with the same care.",
    "Every copy is printed offset for smooth pages, neat margins, and binding that genuinely lasts the academic year — because a diary that falls apart in January wasn't much of a plan."
  ],
  featuresTitle: "Formats we print for institutions",
  features: [
    { title: "Student planners", description: "Timetable-based layouts with subject slots and daily note space, matched to your term structure." },
    { title: "Faculty and management diaries", description: "Yearly calendars, event spaces, and meeting layouts for the people running the academic year." },
    { title: "Dated or undated", description: "Print for a specific academic year, or choose undated layouts you can issue any time." },
    { title: "Your institution's identity", description: "Logo, crest, colours, and custom cover in hard or soft binding — paperback or perfect bound." }
  ],
  tableTitle: "Diary and planner sizes",
  tableRows: [
    { category: "Standard Planner", rowSpan: 2, size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "Portable size for daily use." },
    { size: "A5", dimensions: "5.8\" x 8.3\"" },
    { category: "Executive Diary", rowSpan: 2, size: "1/4 Demy", dimensions: "8.5\" x 11\"", description: "Ideal for faculty and management use." },
    { size: "A4", dimensions: "8.3\" x 11.7\"" },
    { category: "Desk Diary", size: "1/4 Crown", dimensions: "7\" x 9.5\"", description: "Spacious layout for notes and schedules." },
    { category: "Handy Planner", size: "1/8 Crown", dimensions: "4.75\" x 7\"", description: "Compact format for on-the-go reminders." },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Designed to suit your institution's format." }
  ],
  materialsTitle: "Planner or diary — what's the difference?",
  materialsParagraphs: [
    "The two words get used interchangeably, but they solve different problems, and knowing which you need makes the layout decision easy:"
  ],
  materialsList: [
    "A <strong>planner</strong> looks forward. It's structured around time — days, weeks, terms — so students can lay out timetables, deadlines, and study goals before they happen.",
    "A <strong>diary</strong> looks around. It records what's happening — classes taught, homework assigned, remarks, progress — which is why schools issue them as the daily link between teachers and parents."
  ],
  materialsClosing: "Most institutions actually want a bit of both, and that's fine: we regularly print hybrid layouts with a term planner up front and dated daily pages behind it.",
  closingTitle: "What does a diary order cost, and when does it arrive?",
  closingParagraphs: [
    "Pricing follows the same plain logic as everything we print: <strong>pages per diary, number of copies, and the cover choice</strong> — dated formats print in the same run as undated. Orders start at 200 copies and ship 3–10 days after you approve the proof.",
    "Whether it's a few hundred student planners for one batch or a full institutional run for every enrolled student, each order gets the same treatment: a layout proof before we print, steady colour through the run, and delivery scheduled so the books are in hand before the term starts — not after."
  ],
  ctaTitle: "Plan next year on paper",
  ctaParagraph: "Tell us your format — dated or undated, student or faculty — and we'll send a free quote with a layout proof for your academic diaries."
};

export function AcademicDiariesPlanners({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
