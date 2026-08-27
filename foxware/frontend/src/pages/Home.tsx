import { Helmet } from 'react-helmet-async'
import { Hero } from '../sections/Hero'
import { Marquee } from '../sections/Marquee'
import { Features } from '../sections/Features'
import { Stats } from '../sections/Stats'
import { Founder } from '../sections/Founder'
import { FAQ } from '../sections/FAQ'
import { SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, SITE_URL, OG_IMAGE_URL } from '../lib/seo'

export default function Home() {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{`${SITE_NAME} — ${SITE_TAGLINE}`}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={`${SITE_NAME} — ${SITE_TAGLINE}`} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${SITE_NAME} — ${SITE_TAGLINE}`} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
      </Helmet>
      <Hero />
      <Marquee />
      <Features />
      <Stats />
      <Founder />
      <FAQ />
    </>
  )
}