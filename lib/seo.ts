export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mani Offset',
    url: 'https://feeltheprint.com',
    logo: 'https://feeltheprint.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@feeltheprint.com',
      telephone: '+91-97911-83612',
      contactType: 'customer service',
      availableLanguage: ['English', 'Tamil'],
    },
    sameAs: [
      // Add social links here when available
    ],
  };
};

export const generateLocalBusinessSchema = () => {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'FeelThePRINT (A Unit of Mani Offset Press)',
      image: 'https://feeltheprint.com/logo.png',
      '@id': 'https://feeltheprint.com/#business',
      url: 'https://feeltheprint.com',
      email: 'contact@feeltheprint.com',
      telephone: '+91-97911-83612',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '115, 4A-1, Noombal Main Rd, Mahalakshmi Nagar, Vanagaram',
        addressLocality: 'Chennai',
        addressRegion: 'Tamil Nadu',
        postalCode: '600077',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 13.0554668,
        longitude: 80.1424155,
      },
      priceRange: '$$$',
    }
  ];
};

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

export const generateProductSchema = (product: {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.imageUrl,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: 'Mani Offset',
    },
  };
};
