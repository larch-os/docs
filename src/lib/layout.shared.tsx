import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2 font-[family-name:var(--font-display)] font-semibold">
          <Image src="/images/logo.png" alt="" width={22} height={22} className="size-[22px]" />
          {appName}
        </span>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [{ type: 'main', text: 'Blog', url: '/blog' }],
  };
}
