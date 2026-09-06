import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/lib/blog-source';
import { getMDXComponents } from '@/components/mdx';
import { DocsBody } from 'fumadocs-ui/layouts/docs/page';
import type { Metadata } from 'next';

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default async function BlogPostPage(props: PageProps<'/blog/[slug]'>) {
  const params = await props.params;
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const MDX = post.body;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-2 font-[family-name:var(--font-display)] text-3xl font-bold text-fd-foreground">
        {post.title}
      </h1>
      <p className="mb-10 text-sm text-fd-muted-foreground">{formatDate(post.date)}</p>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </main>
  );
}

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const params = await props.params;
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  return {
    title: post.title,
    description: post.description,
  };
}
