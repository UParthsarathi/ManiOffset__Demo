import React from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { ProductContentData } from './ProductContentTemplate';
import { isBookProduct } from '@/lib/offset-pricing';

/**
 * V2 "specimen sheet" treatment — editorial serif headings, mono spec labels,
 * rhythm through spacing and one warm paper band instead of repeated hairlines.
 * Data-compatible with ProductContentData; eyebrows and the pricing formula
 * are additive so existing content objects keep working unchanged.
 */
export interface ProductContentDataV2 extends ProductContentData {
  introEyebrow?: string;
  featuresEyebrow?: string;
  tableEyebrow?: string;
  materialsEyebrow?: string;
  orderingEyebrow?: string;
  closingEyebrow?: string;
  /** e.g. ["Pages", "Copies", "Size"] — rendered as a formula strip in the pricing section */
  orderingFormula?: string[];
}

const serif = { fontFamily: 'var(--font-serif), Georgia, serif' } as const;
const mono = { fontFamily: 'var(--font-mono), ui-monospace, monospace' } as const;

const INK = '#20283c';
const AMBER = '#f29a1b';

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <span style={mono} className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {children}
      </span>
      <div className="mt-2.5 h-[2px] w-8" style={{ backgroundColor: AMBER }} />
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={serif}
      className="text-[23px] md:text-[30px] font-semibold leading-[1.2] tracking-[-0.01em] [text-wrap:balance] mb-4"
    >
      <span style={{ color: INK }}>{children}</span>
    </h2>
  );
}

interface ProductContentTemplateV2Props {
  data: ProductContentDataV2;
  productId: number;
  whatsappMessage: string;
}

export function ProductContentTemplateV2({ data: content, productId, whatsappMessage }: ProductContentTemplateV2Props) {
  return (
    <div className="w-full flex flex-col">

      {/* Intro */}
      <section>
        {content.introEyebrow && <Eyebrow>{content.introEyebrow}</Eyebrow>}
        <SectionHeading>{content.introTitle}</SectionHeading>
        <div className="space-y-3.5">
          {content.introParagraphs.map((p, i) => (
            <p
              key={i}
              className="text-[17px] leading-[1.65] text-slate-600"
              dangerouslySetInnerHTML={{ __html: p }}
            ></p>
          ))}
          {content.introList && content.introList.length > 0 && (
            <ol className="space-y-3 pt-2">
              {content.introList.map((item, i) => (
                <li key={i} className="flex items-baseline gap-4">
                  <span style={mono} className="text-[12px] font-bold" aria-hidden="true">
                    <span style={{ color: AMBER }}>{String(i + 1).padStart(2, '0')}</span>
                  </span>
                  <span className="text-[16px] font-medium" style={{ color: INK }} dangerouslySetInnerHTML={{ __html: item }}></span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      {/* Features — editorial trio, rules instead of boxes */}
      {content.featuresTitle && (
        <section className="mt-12 md:mt-14">
          {content.featuresEyebrow && <Eyebrow>{content.featuresEyebrow}</Eyebrow>}
          <SectionHeading>{content.featuresTitle}</SectionHeading>
          {content.featuresParagraph && (
            <p className="text-[17px] leading-[1.65] text-slate-600" dangerouslySetInnerHTML={{ __html: content.featuresParagraph }}></p>
          )}
          {content.features && content.features.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6 mt-7">
              {content.features.map((feature, i) => (
                <div key={i} className="border-t border-slate-200 pt-4">
                  <h3 style={serif} className="text-[18px] font-semibold mb-2">
                    <span style={{ color: INK }}>{feature.title}</span>
                  </h3>
                  <p className="text-[17px] leading-[1.65] text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          )}
          {content.featuresClosing && (
            <div className="mt-8 pl-6 md:pl-8 border-l-2" style={{ borderColor: AMBER }}>
              <p className="text-[17px] leading-[1.65] text-slate-700" dangerouslySetInnerHTML={{ __html: content.featuresClosing }}></p>
            </div>
          )}
        </section>
      )}

      {/* Size table — data untouched */}
      {content.tableRows && content.tableRows.length > 0 && (
        <section className="mt-12 md:mt-14">
          {content.tableEyebrow && <Eyebrow>{content.tableEyebrow}</Eyebrow>}
          <SectionHeading>{content.tableTitle || 'Sizes we print'}</SectionHeading>
          {content.tableParagraph && (
            <p className="text-[17px] leading-[1.65] text-slate-600" dangerouslySetInnerHTML={{ __html: content.tableParagraph }}></p>
          )}
          <div className="overflow-x-auto mt-5 rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left border-collapse">
                <colgroup>
                  <col className="w-[22%]" />
                  <col className="w-[16%]" />
                  <col className="w-[18%]" />
                  <col />
                </colgroup>
                <thead className="bg-slate-50">
                  <tr style={{ borderBottom: `2px solid ${INK}` }}>
                    <th style={mono} className="py-3 px-3 md:px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 whitespace-nowrap border-r border-slate-200">Category</th>
                    <th style={mono} className="py-3 px-3 md:px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 whitespace-nowrap border-r border-slate-200">Printing Size</th>
                    <th style={mono} className="py-3 px-3 md:px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 whitespace-nowrap border-r border-slate-200">Dimensions (Inches)</th>
                    <th style={mono} className="py-3 px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {content.tableRows.map((row, i) => (
                    <tr key={i}>
                      {row.category && (
                        <td className="py-2.5 px-3 md:px-5 text-[15px] font-medium align-middle border-r border-slate-200" style={{ color: INK }} rowSpan={row.rowSpan || 1}>
                          {row.category}
                        </td>
                      )}
                      <td className="py-2.5 px-3 md:px-5 text-[15px] font-semibold whitespace-nowrap align-middle border-r border-slate-200" style={{ color: INK }}>
                        {row.size}
                      </td>
                      <td style={mono} className="py-2.5 px-3 md:px-5 text-[13.5px] text-slate-600 whitespace-nowrap align-middle tabular-nums border-r border-slate-200">
                        {row.dimensions}
                      </td>
                      {row.description && (
                        <td className="py-2.5 px-3 md:px-5 text-[15px] leading-[1.6] text-slate-600 align-middle" rowSpan={row.rowSpan || 1}>
                          {row.description}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
          {content.tableClosing && (
            <p className="text-[17px] leading-[1.65] text-slate-600 mt-6" dangerouslySetInnerHTML={{ __html: content.tableClosing }}></p>
          )}
        </section>
      )}

      {/* Materials / options */}
      {content.materialsTitle && (
        <section className="mt-12 md:mt-14">
          {content.materialsEyebrow && <Eyebrow>{content.materialsEyebrow}</Eyebrow>}
          <SectionHeading>{content.materialsTitle}</SectionHeading>
          <div className="space-y-3.5">
            {content.materialsParagraphs?.map((p, i) => (
              <p key={i} className="text-[17px] leading-[1.65] text-slate-600" dangerouslySetInnerHTML={{ __html: p }}></p>
            ))}
            {content.materialsList && content.materialsList.length > 0 && (
              <ul className="space-y-2.5 pt-1">
                {content.materialsList.map((item, i) => (
                  <li key={i} className="relative pl-6 text-[17px] leading-[1.65] text-slate-600">
                    <span className="absolute left-0 top-[0.72em] h-[6px] w-[6px] rounded-full" style={{ backgroundColor: AMBER }} aria-hidden="true"></span>
                    <span dangerouslySetInnerHTML={{ __html: item }}></span>
                  </li>
                ))}
              </ul>
            )}
            {content.materialsClosing && (
              <p className="text-[17px] leading-[1.65] text-slate-600" dangerouslySetInnerHTML={{ __html: content.materialsClosing }}></p>
            )}
          </div>
        </section>
      )}

      {/* Pricing / ordering */}
      {content.orderingTitle && (
        <section className="mt-12 md:mt-14">
          {content.orderingEyebrow && <Eyebrow>{content.orderingEyebrow}</Eyebrow>}
          <SectionHeading>{content.orderingTitle}</SectionHeading>

          {content.orderingFormula && content.orderingFormula.length > 0 && (
            <div className="flex items-center gap-3 flex-wrap mt-4 mb-6">
              {content.orderingFormula.map((part, i) => (
                <React.Fragment key={part}>
                  {i > 0 && (
                    <span className="text-[18px] font-light select-none" style={{ color: AMBER }} aria-hidden="true">×</span>
                  )}
                  <span
                    style={mono}
                    className="text-[12px] font-semibold uppercase tracking-[0.14em] rounded-full border border-slate-200 bg-white px-4 py-2"
                  >
                    <span style={{ color: INK }}>{part}</span>
                  </span>
                </React.Fragment>
              ))}
            </div>
          )}

          <div className="space-y-3.5">
            {content.orderingParagraphs?.map((p, i) => (
              <p key={i} className="text-[17px] leading-[1.65] text-slate-600" dangerouslySetInnerHTML={{ __html: p }}></p>
            ))}
          </div>

          {content.orderingSteps && content.orderingSteps.length > 0 && (
            <ol className="space-y-2 mt-5">
              {content.orderingSteps.map((step, i) => (
                <li key={i} className="flex items-baseline gap-4">
                  <span style={mono} className="text-[12px] font-bold" aria-hidden="true">
                    <span style={{ color: AMBER }}>{String(i + 1).padStart(2, '0')}</span>
                  </span>
                  <span className="text-[16px] font-medium" style={{ color: INK }} dangerouslySetInnerHTML={{ __html: step }}></span>
                </li>
              ))}
            </ol>
          )}
        </section>
      )}

      {/* Closing */}
      {content.closingTitle && (
        <section className="mt-12 md:mt-14">
          {content.closingEyebrow && <Eyebrow>{content.closingEyebrow}</Eyebrow>}
          <SectionHeading>{content.closingTitle}</SectionHeading>
          <div className="space-y-3.5">
            {content.closingParagraphs?.map((p, i) => (
              <p key={i} className="text-[17px] leading-[1.65] text-slate-600" dangerouslySetInnerHTML={{ __html: p }}></p>
            ))}
          </div>
        </section>
      )}

      {/* CTA — warm amber wash, matching the rest of the app */}
      <section className="mt-12 md:mt-16">
        <div className="rounded-2xl px-5 py-8 md:px-14 md:py-12 text-center bg-[#fffbeb] border border-amber-200">
          <h3 style={serif} className="text-[26px] md:text-[30px] font-semibold leading-[1.2] [text-wrap:balance] mb-4">
            <span style={{ color: INK }}>{content.ctaTitle || 'Request a custom quote'}</span>
          </h3>
          <p className="text-[16px] leading-[1.65] text-slate-700 mb-7 max-w-[52ch] mx-auto">
            {content.ctaParagraph || content.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href={`https://wa.me/919444409824?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-[15px] rounded-lg transition-all w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              Order via WhatsApp
            </a>
            <Link
              href={isBookProduct(productId) ? `/calculator?product=${productId}` : '/calculator/coming-soon'}
              className="inline-flex items-center justify-center px-6 py-3.5 bg-[#005fb3] hover:bg-[#004c8f] text-white font-bold text-[15px] rounded-lg transition-all w-full sm:w-auto"
            >
              Get an Instant Quote
            </Link>
          </div>
          <div className="mt-8 pt-5 border-t border-amber-200/60">
            <p style={mono} className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-800/60">
              {content.ctaFooterText || 'Made in India · Printing since 1995'}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
