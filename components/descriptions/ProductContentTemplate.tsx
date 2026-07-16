import React from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export interface ProductFeature {
  title: string;
  description: string;
}

export interface ProductSizeTableRow {
  category?: string;
  size: string;
  dimensions: string;
  description?: string;
  rowSpan?: number;
}

export interface ProductContentData {
  theme?: 'amber' | 'blue' | 'gray';
  introTitle: string;
  introParagraphs: string[];
  introList?: string[];
  featuresTitle?: string;
  featuresParagraph?: string;
  features?: ProductFeature[];
  featuresClosing?: string;
  tableTitle?: string;
  tableParagraph?: string;
  tableRows?: ProductSizeTableRow[];
  tableClosing?: string;
  materialsTitle?: string;
  materialsParagraphs?: string[];
  materialsList?: string[];
  materialsClosing?: string;
  orderingTitle?: string;
  orderingParagraphs?: string[];
  orderingSteps?: string[];
  closingTitle?: string;
  closingParagraphs?: string[];
  ctaTitle?: string;
  ctaParagraph?: string;
  ctaDescription?: string;
  ctaFooterText?: string;
}

interface ProductContentTemplateProps {
  data: ProductContentData;
  productId: number;
  whatsappMessage: string;
}

export function ProductContentTemplate({ data: content, productId, whatsappMessage }: ProductContentTemplateProps) {
  
  const themeStyles = {
    amber: {
      bg: 'bg-[#fffbeb]',
      border: 'border-amber-200',
      borderSubtle: 'border-amber-200/50',
      text: 'text-amber-800/60',
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      borderSubtle: 'border-blue-200/50',
      text: 'text-blue-800/60',
    },
    gray: {
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      borderSubtle: 'border-gray-200/50',
      text: 'text-gray-800/60',
    }
  };

  const activeTheme = themeStyles[content.theme || 'amber'];

  return (
    <div className="w-full flex flex-col pt-10">
      
      {/* Intro section */}
      <div className="mb-16 w-full">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
          {content.introTitle}
        </h2>
        <div className="text-gray-600 leading-relaxed text-lg space-y-6">
          {content.introParagraphs.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p }}></p>
          ))}
          {content.introList && content.introList.length > 0 && (
            <ul className="list-none pl-0 space-y-3 mb-8 text-lg mt-6">
              {content.introList.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">{i + 1}</span>
                  <strong dangerouslySetInnerHTML={{ __html: item }}></strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Grid Features */}
      {content.featuresTitle && (
        <div className="mt-8 pt-16 border-t border-gray-200 w-full">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">
            {content.featuresTitle || 'What We Print'}
          </h2>
          {content.featuresParagraph && (
            <p className="text-gray-600 text-lg mb-10" dangerouslySetInnerHTML={{ __html: content.featuresParagraph }}></p>
          )}
          {content.features && content.features.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {content.features.map((feature, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-base">{feature.description}</p>
                </div>
              ))}
            </div>
          )}
          {content.featuresClosing && (
            <p className="text-gray-600 text-lg mt-8" dangerouslySetInnerHTML={{ __html: content.featuresClosing }}></p>
          )}
        </div>
      )}

      {/* Size Table */}
      {content.tableRows && content.tableRows.length > 0 && (
        <div className="mt-16 pt-16 border-t border-gray-200 w-full">
          <div className="mb-10 w-full">
             <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
               {content.tableTitle || 'Sizes We Print'}
             </h2>
             {content.tableParagraph && (
               <p className="text-gray-600 text-lg mt-3" dangerouslySetInnerHTML={{ __html: content.tableParagraph }}></p>
             )}
          </div>
          <div className="overflow-x-auto w-full mb-16 border border-gray-200 rounded-xl shadow-sm">
             <table className="w-full text-left border-collapse bg-white">
                <thead className="bg-gray-50/80">
                   <tr className="border-b border-gray-200 text-gray-900">
                      <th className="py-4 px-6 text-sm font-semibold tracking-wide uppercase whitespace-nowrap border-r border-gray-200">Category</th>
                      <th className="py-4 px-6 text-sm font-semibold tracking-wide uppercase whitespace-nowrap border-r border-gray-200">Printing Size</th>
                      <th className="py-4 px-6 text-sm font-semibold tracking-wide uppercase whitespace-nowrap border-r border-gray-200">Dimensions (Inches)</th>
                      <th className="py-4 px-6 text-sm font-semibold tracking-wide uppercase">Description</th>
                   </tr>
                </thead>
                <tbody className="text-base text-gray-700 divide-y divide-gray-100">
                   {content.tableRows.map((row, i) => (
                     <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                        {row.category && (
                          <td className="py-4 px-6 font-medium text-gray-900 border-r border-gray-200" rowSpan={row.rowSpan || 1}>
                            {row.category}
                          </td>
                        )}
                        <td className="py-4 px-6 font-semibold text-gray-900 border-b border-r border-gray-200">
                          {row.size}
                        </td>
                        <td className="py-4 px-6 text-gray-600 border-b border-r border-gray-200">
                          {row.dimensions}
                        </td>
                        {row.description && (
                          <td className="py-4 px-6" rowSpan={row.rowSpan || 1}>
                            {row.description}
                          </td>
                        )}
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
          {content.tableClosing && (
            <p className="text-gray-600 text-lg mt-4" dangerouslySetInnerHTML={{ __html: content.tableClosing }}></p>
          )}
        </div>
      )}

      {/* Materials & Specs */}
      {content.materialsTitle && (
        <div className="w-full mt-16 pt-16 border-t border-gray-200">
          <div className="w-full text-gray-600 leading-relaxed">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">{content.materialsTitle}</h2>
            <div className="text-lg space-y-4">
              {content.materialsParagraphs?.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }}></p>
              ))}
              {content.materialsList && content.materialsList.length > 0 && (
                <ul className="pl-5 list-disc marker:text-amber-500 space-y-2 mt-6">
                  {content.materialsList.map((item, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>
                  ))}
                </ul>
              )}
              {content.materialsClosing && (
                <p className="mt-6" dangerouslySetInnerHTML={{ __html: content.materialsClosing }}></p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Ordering Steps */}
      {content.orderingTitle && (
        <div className="mt-16 pt-16 border-t border-gray-200 w-full">
          <div className="w-full text-gray-600 leading-relaxed text-lg">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">{content.orderingTitle}</h2>
            
            {content.orderingParagraphs && content.orderingParagraphs.length > 0 && (
              <div className="space-y-4 mb-6">
                {content.orderingParagraphs.map((p, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: p }}></p>
                ))}
              </div>
            )}
            
            {content.orderingSteps && content.orderingSteps.length > 0 && (
              <ul className="mb-10 pl-5 list-decimal space-y-3 font-medium text-gray-800">
                {content.orderingSteps.map((step, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: step }}></li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Closing / Why Choose Us */}
      {content.closingTitle && (
        <div className="mt-8 pt-16 border-t border-gray-200 w-full">
          <div className="w-full text-gray-600 leading-relaxed">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">{content.closingTitle}</h2>
            <div className="text-lg space-y-4">
              {content.closingParagraphs?.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }}></p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Transparent Pricing & CTA */}
      <div className="mt-16 pt-16 border-t border-gray-200 text-center w-full">
        <div className={`${activeTheme.bg} border ${activeTheme.border} rounded-2xl p-10 md:p-14 shadow-sm flex flex-col items-center`}>
          <h3 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {content.ctaTitle || 'Request a custom quote'}
          </h3>
          <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto">
            {content.ctaParagraph || content.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
            <Link 
              href={`/calculator?product=${productId}`}
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Get an Instant Quote
            </Link>
            <a 
              href={`https://wa.me/919444409824?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <MessageCircle className="w-5 h-5 mr-2 fill-current" />
              Chat on WhatsApp
            </a>
          </div>
          <div className={`mt-10 pt-6 border-t ${activeTheme.borderSubtle} w-full`}>
            <p className={`text-xs font-bold ${activeTheme.text} uppercase tracking-widest`}>
              {content.ctaFooterText || '📍 Made in India · Printing since 1995.'}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
