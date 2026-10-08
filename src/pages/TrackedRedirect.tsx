import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { trackedLinks } from '@/data';
import { trackEvent } from '@/lib/analytics';

// /r/rbc, /r/iwk ... one link per application. Only slugs listed in data/links.json are counted.
export default function TrackedRedirect() {
  const { slug = '' } = useParams();
  useEffect(() => {
    if (slug in trackedLinks) trackEvent(`r/${slug}`);
  }, [slug]);
  return <Navigate to="/" replace />;
}
