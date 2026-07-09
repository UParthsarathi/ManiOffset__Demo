import React from 'react';
import { ProductContentTemplate, ProductContentData } from './ProductContentTemplate';

// ---------------------------------------------------------
// EDIT YOUR CONTENT HERE
// This object controls all the text on the page. 
// No need to touch the HTML/JSX below!
// ---------------------------------------------------------
const CONTENT: ProductContentData = {
  theme: 'blue',
  introTitle: "Textbook & Educational Book Printing — Trusted by Institutions Since 1995",
  introParagraphs: [
    "For 30 years, FeelThePRINT has printed the textbooks, guides, and question banks that Indian schools and colleges depend on through a full academic year of daily handling. A textbook fails when the spine cracks by mid-term or the print fades under a highlighter — so we print for the life of the book, not just the first open.",
    "We manage classroom texts, lab manuals, college and school guides, exam question banks, and multi-volume reference sets end-to-end. You supply the manuscript and syllabus; we handle prepress, printing, binding, and delivery on your academic calendar. Every run stays consistent in clarity, binding strength, and page quality from the first copy to the last — critical when a set has to match across a 2,000-copy order."
  ],
  featuresTitle: "What We Print",
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
  tableTitle: "Sizes We Print",
  tableRows: [
    {
      category: "Student Textbooks",
      size: "1/8 Demy",
      dimensions: "5.5\" x 8.5\"",
      description: "Compact and portable for class use.",
      rowSpan: 2
    },
    {
      size: "A5",
      dimensions: "5.8\" x 8.3\""
    },
    {
      category: "College and School Guides",
      size: "1/4 Demy",
      dimensions: "8.5\" x 11\"",
      description: "Standard for detailed subjects.",
      rowSpan: 2
    },
    {
      size: "A4",
      dimensions: "8.3\" x 11.7\""
    },
    {
      category: "Lab Manuals",
      size: "1/4 Crown",
      dimensions: "7\" x 9.5\"",
      description: "Good size for diagrams and experiments."
    },
    {
      category: "Custom",
      size: "Variable",
      dimensions: "Flexible",
      description: "Designed to fit your syllabus needs."
    }
  ],
  materialsTitle: "Paper & Finish Options",
  materialsParagraphs: [
    "We print on <strong>70–100 GSM</strong> text stock for interiors and <strong>220–300 GSM</strong> cover board, in matte or gloss lamination. Heavier stock for lab manuals with diagrams; lighter, opaque stock for high-page-count guides to keep them portable. Not sure what your syllabus needs? We'll recommend based on page count and use."
  ],
  orderingTitle: "How Ordering Works",
  orderingSteps: [
    "Send your files and quantity — minimum order 200 copies.",
    "We share a proof for sign-off before any run begins.",
    "Printing and binding, ready in 3-10 working days.",
    "Delivery to your institution, on schedule for term."
  ],
  closingTitle: "Why Institutions Choose Offset",
  closingParagraphs: [
    "Below a certain volume, digital printing is cheaper. Above it, offset wins on cost-per-copy and on the edition-to-edition consistency that institutional sets demand — sharper text, stronger binding, and every copy matching the last. For academic runs, that consistency is the whole point."
  ],
  ctaTitle: "Request a custom quote",
  ctaDescription: "From single guides to multi-volume sets, we treat every project with the care and responsibility it deserves — sharper fonts, richer inks, and dependable results, every run. Send us your files for a free quote, and let us print your educational materials the way they should be.",
  ctaFooterText: "📍 Made in India · Printing for education since 1995."
};
// ---------------------------------------------------------

interface TextbookEducationalBookProps {
  productId: number;
  whatsappMessage: string;
}

export function TextbookEducationalBook({ productId, whatsappMessage }: TextbookEducationalBookProps) {
  return (
    <ProductContentTemplate 
      data={CONTENT} 
      productId={productId} 
      whatsappMessage={whatsappMessage} 
    />
  );
}
