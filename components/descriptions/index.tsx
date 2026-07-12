"use client";

import React from "react";
import { SoftcoverBook } from "./SoftcoverBook";
import { HardcoverBook } from "./HardcoverBook";
import { MagazineJournal } from "./MagazineJournal";
import { ComicGraphicNovel } from "./ComicGraphicNovel";
import { ReligiousSpiritualBook } from "./ReligiousSpiritualBook";
import { TextbookEducationalBook } from "./TextbookEducationalBook";
import { SchoolCollegeNotebooks } from "./SchoolCollegeNotebooks";
import { AcademicDiariesPlanners } from "./AcademicDiariesPlanners";
import { RecordBooksLabManuals } from "./RecordBooksLabManuals";
import { ExamMaterials } from "./ExamMaterials";
import { ReportCardsMarksheets } from "./ReportCardsMarksheets";
import { EducationalCharts } from "./EducationalCharts";
import { FlyersLeafletsPamphlets } from "./FlyersLeafletsPamphlets";
import { BrochuresBooklets } from "./BrochuresBooklets";
import { ProductCatalogues } from "./ProductCatalogues";
import { WallCalendars } from "./WallCalendars";
import { InvitationCards } from "./InvitationCards";
import { Postcards } from "./Postcards";
import { VisitingCards } from "./VisitingCards";
import { LetterheadsEnvelopes } from "./LetterheadsEnvelopes";
import { BusinessDiariesPlanners } from "./BusinessDiariesPlanners";
import { CompanyFolders } from "./CompanyFolders";
import { CertificatesAwardCards } from "./CertificatesAwardCards";
import { Passbooks } from "./Passbooks";
import { ChallansDepositSlips } from "./ChallansDepositSlips";
import { BankingForms } from "./BankingForms";
import { InstructionManualsGuides } from "./InstructionManualsGuides";
import { ProductInsertsLeaflets } from "./ProductInsertsLeaflets";
import { WarrantyServiceCards } from "./WarrantyServiceCards";
import { DefaultDescription } from "./DefaultDescription";

interface ProductDescriptionRendererProps {
  product: any;
  whatsappMessage: string;
}

export function ProductDescriptionRenderer({ product, whatsappMessage }: ProductDescriptionRendererProps) {
  switch (product.id) {
    case 1:
      return <SoftcoverBook productId={product.id} whatsappMessage={whatsappMessage} />;
    case 2:
      return <HardcoverBook productId={product.id} whatsappMessage={whatsappMessage} />;
    case 3:
      return <MagazineJournal productId={product.id} whatsappMessage={whatsappMessage} />;
    case 4:
      return <ComicGraphicNovel productId={product.id} whatsappMessage={whatsappMessage} />;
    case 5:
      return <ReligiousSpiritualBook productId={product.id} whatsappMessage={whatsappMessage} />;
    case 6:
      return <TextbookEducationalBook productId={product.id} whatsappMessage={whatsappMessage} />;
    case 7:
      return <SchoolCollegeNotebooks productId={product.id} whatsappMessage={whatsappMessage} />;
    case 8:
      return <AcademicDiariesPlanners productId={product.id} whatsappMessage={whatsappMessage} />;
    case 9:
      return <RecordBooksLabManuals productId={product.id} whatsappMessage={whatsappMessage} />;
    case 10:
      return <ExamMaterials productId={product.id} whatsappMessage={whatsappMessage} />;
    case 11:
      return <ReportCardsMarksheets productId={product.id} whatsappMessage={whatsappMessage} />;
    case 12:
      return <EducationalCharts productId={product.id} whatsappMessage={whatsappMessage} />;
    case 13:
      return <FlyersLeafletsPamphlets productId={product.id} whatsappMessage={whatsappMessage} />;
    case 14:
      return <BrochuresBooklets productId={product.id} whatsappMessage={whatsappMessage} />;
    case 15:
      return <ProductCatalogues productId={product.id} whatsappMessage={whatsappMessage} />;
    case 16:
      return <WallCalendars productId={product.id} whatsappMessage={whatsappMessage} />;
    case 17:
      return <InvitationCards productId={product.id} whatsappMessage={whatsappMessage} />;
    case 18:
      return <Postcards productId={product.id} whatsappMessage={whatsappMessage} />;
    case 19:
      return <VisitingCards productId={product.id} whatsappMessage={whatsappMessage} />;
    case 20:
      return <LetterheadsEnvelopes productId={product.id} whatsappMessage={whatsappMessage} />;
    case 21:
      return <BusinessDiariesPlanners productId={product.id} whatsappMessage={whatsappMessage} />;
    case 22:
      return <CompanyFolders productId={product.id} whatsappMessage={whatsappMessage} />;
    case 23:
      return <CertificatesAwardCards productId={product.id} whatsappMessage={whatsappMessage} />;
    case 24:
      return <Passbooks productId={product.id} whatsappMessage={whatsappMessage} />;
    case 25:
      return <ChallansDepositSlips productId={product.id} whatsappMessage={whatsappMessage} />;
    case 26:
      return <BankingForms productId={product.id} whatsappMessage={whatsappMessage} />;
    case 27:
      return <InstructionManualsGuides productId={product.id} whatsappMessage={whatsappMessage} />;
    case 28:
      return <ProductInsertsLeaflets productId={product.id} whatsappMessage={whatsappMessage} />;
    case 29:
      return <WarrantyServiceCards productId={product.id} whatsappMessage={whatsappMessage} />;
    default:
      return <DefaultDescription product={product} whatsappMessage={whatsappMessage} />;
  }
}

