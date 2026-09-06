import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog-source';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: "Larch's build log, in public.",
};

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function BlogIndexPage() {
  const posts = getBlogPosts();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-2 font-[family-name:var(--font-display)] text-3xl font-bold text-fd-foreground">
        Blog
      </h1>
      <p className="mb-10 text-fd-muted-foreground">Larch&apos;s build log, in public.</p>
      <ul className="flex flex-col gap-8">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-fd-border pb-8 last:border-none">
            <Link href={`/blog/${post.slug}`} className="group">
              <h2 className="text-xl font-semibold text-fd-foreground group-hover:text-fd-primary">
                {post.title}
              </h2>
              <p className="mt-1 text-sm text-fd-muted-foreground">{formatDate(post.date)}</p>
              <p className="mt-2 text-fd-muted-foreground">{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
