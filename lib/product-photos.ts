import { products } from './data';

/**
 * Section photos for product pages. Every product gets the shared photos below
 * (the intro photo is picked by category). To use a product's own photo, put the
 * file in public/products/<id>/ and add an override to `productPhotos`, e.g.
 *   1: { intro: { src: '/products/1/intro.jpg', alt: 'Stack of printed paperbacks' } },
 * Slots: intro (the finished product), features (a close-up detail),
 * materials (materials and finishes), ordering (a job on the press). 4:3 crops fit best.
 */
export type SectionPhoto = { src: string; alt: string; caption?: string };
type Slot = 'intro' | 'features' | 'materials' | 'ordering';

// ponytail: Unsplash stand-ins shared across products; replace with the press's own photos via productPhotos.
const unsplash = (id: string, alt: string): SectionPhoto => ({
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`,
  alt,
});

const shared: Partial<Record<Slot, SectionPhoto>> = {
  features: unsplash('photo-1715154470884-1c2be0b0129f', 'Checking colour and sharpness with a loupe on a test chart'),
  materials: unsplash('photo-1581079289196-67865ea83118', 'Fan of ink colour swatches'),
  ordering: unsplash('photo-1503694978374-8a2fa686963a', 'Printed sheets running through the press'),
};

const introByCategory: Record<string, SectionPhoto> = {
  'Books and Publications': unsplash('photo-1610116306796-6fea9f4fae38', 'Open printed books'),
  'Academic and Educational': unsplash('photo-1787640619073-3dcb10c316c4', 'Open notebooks with grid ruling and plain covers'),
  'Marketing and Promotional Materials': unsplash('photo-1769893715447-8f12c382e49c', 'Folded brochures and leaflets'),
  'Business and Corporate': unsplash('photo-1718670013921-2f144aba173a', 'Business cards on a marble counter'),
  'Banking and Financial': unsplash('photo-1772588627474-ae6acc69ac42', 'Printed forms with a calculator'),
  'Product Support Materials': unsplash('photo-1519764340700-3db40311f21e', 'Plain white printed booklet'),
};

export const productPhotos: Record<number, Partial<Record<Slot, SectionPhoto>>> = {};

export function sectionPhotos(productId: number): Partial<Record<Slot, SectionPhoto>> {
  const category = products.find((p) => p.id === productId)?.category;
  return { ...shared, intro: category ? introByCategory[category] : undefined, ...productPhotos[productId] };
}
