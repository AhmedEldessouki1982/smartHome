import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_NAME } from '../lib/seo';

export default function QuoteConfirmation() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Helmet>
        <title>{`Quote Request Submitted — ${SITE_NAME}`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-[var(--accent-muted)] flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-[var(--accent)]" />
        </div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-3" style={{ fontFamily: 'var(--heading)' }}>
          Quote Request Submitted
        </h1>
        <p className="text-[var(--text-muted)] mb-8">
          We&apos;ve received your request. Ahmed will contact you shortly with pricing details.
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/shop">
            <Button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[#1A1A1A]">Continue Browsing</Button>
          </Link>
          <Link to="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
