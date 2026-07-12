import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { products } from "@/lib/data";
import { productMeta } from "@/lib/product-meta";
import StructuredData from "@/components/StructuredData";
import { generateProductSchema } from "@/lib/seo";
import { Metadata } from "next";
import { BackButton } from "@/components/BackButton";
import { DesktopProductView } from "@/components/product/DesktopProductView";
import { MobileProductView } from "@/components/product/MobileProductView";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = products.find((p) => p.id.toString() === resolvedParams.id);
  
  if (!product) {
    return { title: 'Product Not Found' };
  }

  const meta = productMeta[product.id];
  return {
    title: meta ? { absolute: meta.title } : `${product.title} Printing Services | FeelThePRINT`,
    description: meta?.description ?? product.description,
    alternates: { canonical: `/product/${product.id}` },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = products.find((p) => p.id.toString() === resolvedParams.id);

  if (!product) {
    notFound();
  }

  const structuredData = generateProductSchema(product);
  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in printing: ${product.title}. I'd like to share my design and get support to place an order.`);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      <StructuredData data={structuredData} />
      <Navbar />

      {/* Navigation — back + breadcrumb on one line */}
      <div className="pt-7 pb-5 px-4 sm:px-6 lg:px-8 max-w-[1536px] mx-auto w-full flex flex-wrap items-center gap-x-3 gap-y-1">
        <BackButton href={`/products?category=${encodeURIComponent(product.category)}`} className="mb-0" />
        <span className="h-4 w-px bg-slate-200 hidden sm:block" aria-hidden="true"></span>
        <div className="flex flex-wrap items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/products" className="hover:text-gray-900">Products</Link>
          <span className="mx-2">›</span>
          <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-gray-900">{product.category}</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900 font-medium">{product.title}</span>
        </div>
      </div>

      <main className="flex-1 max-w-[1536px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-20">
        <DesktopProductView product={product} whatsappMessage={whatsappMessage} />
        <MobileProductView product={product} whatsappMessage={whatsappMessage} />
      </main>

      <Footer />
    </div>
  );
}
