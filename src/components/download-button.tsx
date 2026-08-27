import Link from 'next/link';
import { downloadUrl } from '@/lib/shared';

export function DownloadButton() {
  return (
    <Link
      href={downloadUrl}
      className="not-prose inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white no-underline transition-colors hover:bg-blue-500"
    >
      Download ISO
    </Link>
  );
}
