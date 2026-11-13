import { ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';

export default function NotFoundPage() {
  return (
    <PageHeader
      eyebrow="404"
      title="This page doesn’t exist"
      footer={
        <a className="btn btn-primary page-header__cta" href="/">
          Back to home <ArrowRight size={16} aria-hidden="true" />
        </a>
      }
    >
      The link may be old or mistyped. Everything on this site is reachable from the home page.
    </PageHeader>
  );
}
