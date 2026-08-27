export const SITE_NAME = 'AL-Mashareq';
export const SITE_TAGLINE = 'Smart Home & Office Automation Solutions';
export const SITE_DESCRIPTION =
  'Smart home setup, office security (CCTV, access control), network infrastructure, and self-hosted server solutions in Egypt — installed and configured on-site.';

export const SITE_URL = 'https://almashareq.com';
// The production name/domain is NOT finalized yet ("the real production name still not freezed").
// When it is locked in, update SITE_URL here plus the hardcoded domain in public/robots.txt and public/sitemap.xml.

export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

export function productUrl(id: string) {
  return `${SITE_URL}/product/${id}`;
}

export function shareTextPreview(title: string, url: string) {
  return `${title} — ${SITE_NAME}\n${url}`;
}

export function buildWhatsAppShare(text: string) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function buildFacebookShare(url: string) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}

export function buildTwitterShare(text: string, url: string) {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
}