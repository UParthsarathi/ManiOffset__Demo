"use client";

import React from "react";
import { ProductContentTemplateV2, ProductContentDataV2 } from "./ProductContentTemplateV2";

const CONTENT: ProductContentDataV2 = {
  theme: 'amber',
  introEyebrow: "Invitation Cards",
  featuresEyebrow: "Occasions",
  tableEyebrow: "Sizes & specs",
  orderingEyebrow: "Pricing",
  introTitle: "The event starts when the card arrives",
  introParagraphs: [
    "Before anyone sees the venue, they see the invitation — it sets the tone for everything that follows. Our invitation card printing serves the occasions where that first impression matters: school celebrations, cultural fests, corporate conferences, launches, and farewells.",
    "Offset presswork is what makes an invitation feel deliberate: balanced colour, sharp type, and stock with the right weight in the hand. A flimsy card whispers that the event might be too."
  ],
  featuresTitle: "Invitations we specialise in",
  features: [
    { title: "Corporate event invitations", description: "For conferences, product launches, and annual meetings — clean, branded, and on schedule." },
    { title: "Academic and cultural invitations", description: "For schools, colleges, and institutions hosting fests, ceremonies, and annual days." },
    { title: "Retirement event invitations", description: "Thoughtful designs that carry appreciation and warmth for a career's send-off." },
    { title: "Launch and business event invitations", description: "Printed on high-quality stock for inaugurations, sports events, and new beginnings." }
  ],
  tableTitle: "What size should an event invitation be?",
  tableParagraph: "Most formal and academic invites use the compact sizes; ceremonies that want presence go larger. The full range:",
  tableRows: [
    { category: "Standard Invite", rowSpan: 2, size: "1/8 Demy", dimensions: "5.5\" x 8.5\"", description: "Compact and neat for formal and academic events." },
    { size: "A5", dimensions: "5.8\" x 8.3\"" },
    { category: "Large Event Invite", rowSpan: 2, size: "1/4 Demy", dimensions: "8.5\" x 11\"", description: "Spacious and elegant, ideal for special ceremonies." },
    { size: "A4", dimensions: "8.3\" x 11.7\"" },
    { category: "Folded Invitation", size: "1/4 Crown", dimensions: "7\" x 9.5\"", description: "Great for folded or multi-panel layouts." },
    { category: "Custom", size: "Variable", dimensions: "Flexible", description: "Sized and styled to match your event's theme." }
  ],
  orderingTitle: "What does invitation printing cost?",
  orderingParagraphs: [
    "The price turns on <strong>size, flat versus folded, stock, and quantity.</strong> Invitations are usually smaller runs than other print, so the paper choice carries more of the cost — and more of the impression. Orders start at 200 cards and ship 3–10 days after proof approval; every piece is checked for colour balance, alignment, and finish before it leaves.",
    "One timing rule we hold to: invitations are worthless late. Tell us the event date and we work the schedule backwards from it."
  ],
  ctaTitle: "Set the tone before the day arrives",
  ctaParagraph: "Share your event details and design — or ask for layout help — and we'll quote your invitation cards with the date guaranteed in writing."
};

export function InvitationCards({ productId, whatsappMessage }: { productId: number, whatsappMessage: string }) {
  return (
    <ProductContentTemplateV2
      data={CONTENT}
      productId={productId}
      whatsappMessage={whatsappMessage}
    />
  );
}
