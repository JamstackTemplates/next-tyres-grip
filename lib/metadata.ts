import type { Metadata } from 'next';
import { business } from '../content/business';
import { absoluteUrl } from './paths';
import { site } from './site';

export function pageMetadata(path: string, title: string, description: string): Metadata {
  const url = absoluteUrl(path);
  const image = site.url ? `${site.url}/og.png` : undefined;

  return {
    title: path === '/' ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: business.name,
      title: path === '/' ? title : `${title} — ${business.name}`,
      description,
      url,
      images: image ? [{ url: image, width: 1200, height: 630, alt: business.name }] : undefined,
    },
    twitter: { card: image ? 'summary_large_image' : 'summary', images: image ? [image] : undefined },
  };
}
