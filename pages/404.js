//SEO
import { NextSeo } from 'next-seo';
import NotFound from '../components/NotFound';

export default function Index() {
  return (
    <>
      <NextSeo title="Not Found" />
      <NotFound />
    </>
  );
}
