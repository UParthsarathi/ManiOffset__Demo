"use client";

import React from "react";
import { ProductContentTemplate, ProductContentData } from "./ProductContentTemplate";

export function DefaultDescription({ product, whatsappMessage }: { product: any, whatsappMessage: string }) {
  const CONTENT: ProductContentData = {
    theme: 'amber',
    introTitle: "Got a Project That Needs Printing?",
    introParagraphs: [
      `Our ${product.title.toLowerCase()} printing services turn your draft into a real, tangible product.`,
      "If you’ve been searching for a printing shop that delivers on time, you’ve found it. At FeelThePRINT, the process is simple:"
    ],
    introList: [
      "Send your File",
      "Choose your Size",
      "Let us handle the rest"
    ],
    featuresTitle: `What is a ${product.title}?`,
    featuresParagraph: product.description,
    features: [
      { title: "Strong", description: "Holds up through extensive usage and handling." },
      { title: "Light", description: "Easy to carry, display, and distribute." },
      { title: "Affordable", description: "Budget-friendly for every requirement." }
    ],
    tableTitle: "Standard Sizes & Dimensions",
    tableRows: [
      { category: "Standard Edition", size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "The most popular format used by publishers worldwide." },
      { category: "Standard Edition", size: "A5", dimensions: "5.8\" x 8.3\"", description: "Standard A5 size." },
      { category: "Study & Reference", size: "1/4 Demy", dimensions: "8.5\" x 11\"", description: "Suitable for guides, handbooks, and academic material." },
      { category: "Study & Reference", size: "A4", dimensions: "8.3\" x 11.7\"", description: "Standard A4 size." },
      { category: "Visual & Manual", size: "1/4 Crown", dimensions: "7\" x 9.5\"", description: "Gives extra room for images, diagrams, or notes." },
      { category: "Compact", size: "1/8 Crown", dimensions: "4.75\" x 7\"", description: "Small, travel-friendly size — perfect for compact layouts." },
      { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Designed to fit your specific layout preferences perfectly." }
    ],
    materialsTitle: "Finishes & Variations",
    materialsParagraphs: [
      "Every product has its own personality — and the finish sets the tone. At FeelThePRINT, we offer styles that balance function and aesthetics:"
    ],
    materialsList: [
      "Standard Finish — a simple, flexible presentation that keeps the product clean and professional; ideal for general distribution and daily use.",
      "Premium / Heavyweight Finish — made from thicker stock with extended durability, giving a refined edge often chosen for premium or limited editions."
    ],
    materialsClosing: "Each type is printed on our industrial offset plant for consistent texture, strong colour accuracy, and clean folds that make the product feel just right in hand.",
    orderingTitle: "More Than Just a Printing Press",
    orderingParagraphs: [
      "When people search for a printing press or online print services, they want more than just an offset printer — they want dependability. That’s what we provide.",
      "With offset in printing, every page is consistent, maintaining the same sharpness and clarity throughout. Price of Print is Straightforward — based on page count, order volume, and printing size. No hidden costs, just the best printing quality every time."
    ],
    ctaTitle: "Bring Your Pages to Life",
    ctaParagraph: "Get started today with a free quote from FeelThePRINT. Discover how simple and professional printing can be."
  };

  return (
    <ProductContentTemplate
      data={CONTENT}
      productId={product.id}
      whatsappMessage={whatsappMessage}
    />
  );
}
