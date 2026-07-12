import React from 'react';
import { ProductContentTemplateV2, ProductContentDataV2 } from './ProductContentTemplateV2';

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Textbooks · Guides",
  featuresEyebrow: "What we print",
  tableEyebrow: "Sizes & specs",
  materialsEyebrow: "Paper & finish",
  orderingEyebrow: "Ordering",
  closingEyebrow: "Offset advantage",
  introTitle: "Educational books trusted by institutions since 1995",
  introParagraphs: [
    "For 30 years, FeelThePRINT has printed the textbooks, guides, and question banks that Indian schools and colleges depend on through a full academic year of daily handling. A textbook fails when the spine cracks by mid-term or the print fades under a highlighter — so we print for the life of the book, not just the first open.",
    "Our textbook printing services cover classroom texts, lab guides, college and school guides, exam question banks, and multi-volume reference sets end-to-end. You supply the manuscript and syllabus; we handle prepress, printing, binding, and delivery on your academic calendar. Every run stays consistent in clarity, binding strength, and page quality from the first copy to the last — critical when a set has to match across a 2,000-copy order."
  ],
  featuresTitle: "What we print",
  features: [
    {
      title: "Softcover textbooks & guides",
      description: "Lightweight and affordable, built for students to carry every day. Our most requested format for classroom sets."
    },
    {
      title: "Perfect-bound reference books",
      description: "Clean spine and strong adhesive binding that holds up to repeated shelving and reopening, ideal for teachers' manuals and research volumes."
    },
    {
      title: "Black book printing",
      description: "A professional finish for academic projects, reports, and dissertations, printed to institutional submission standards."
    },
    {
      title: "Custom educational series",
      description: "Coordinated multi-volume sets kept uniform in layout, paper grade, and finish across every title, for publishers and institutions running a full catalogue."
    }
  ],
  tableTitle: "Sizes we print for education",
  tableRows: [
    { category: "Student Textbooks", rowSpan: 2, size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "Compact and portable for class use." },
    { size: "A5", dimensions: "5.8\" x 8.3\"" },
    { category: "College and School Guides", rowSpan: 2, size: "1/4 Demy", dimensions: "8.5\" x 11\"", description: "Standard for detailed subjects." },
    { size: "A4", dimensions: "8.3\" x 11.7\"" },
    { category: "Lab Manuals", size: "1/4 Crown", dimensions: "7\" x 9.5\"", description: "Good size for diagrams and experiments." },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Designed to fit your syllabus needs." }
  ],
  materialsTitle: "Paper and finish, matched to the book",
  materialsParagraphs: [
    "Different books ask different things of their paper: heavier stock where lab manuals carry diagrams that can't show through; lighter, opaque stock where a high-page-count guide still has to fit in a school bag; matte or gloss cover lamination depending on how the book will be handled. Tell us the page count and how the book will be used, and we'll recommend the right combination."
  ],
  orderingTitle: "How ordering works",
  orderingSteps: [
    "Send your files and quantity — minimum order 200 copies.",
    "We share a proof for sign-off before any run begins.",
    "Printing and binding, ready in 3–10 working days.",
    "Delivery to your institution, on schedule for term."
  ],
  closingTitle: "Why institutions choose offset",
  closingParagraphs: [
    "Below a certain volume, digital printing is cheaper. Above it, offset wins on cost-per-copy and on the edition-to-edition consistency that institutional sets demand — sharper text, stronger binding, and every copy matching the last. For academic runs, that consistency is the whole point."
  ],
  ctaTitle: "Print for the whole syllabus",
  ctaDescription: "From single guides to multi-volume sets, send us your files for a free quote — and get educational books printed the way they should be.",
  ctaFooterText: "Made in India · Printing for education since 1995"
};

interface TextbookEducationalBookProps {
  productId: number;
  whatsappMessage: string;
}

export function TextbookEducationalBook({ productId, whatsappMessage }: TextbookEducationalBookProps) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
