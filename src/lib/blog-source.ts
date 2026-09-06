import { defineCollections } from 'fumadocs-mdx/macro';
import { z } from 'zod';

const blog = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
  }),
});

type BlogEntry = (typeof blog.entries)[number];
export interface BlogPost extends BlogEntry {
  slug: string;
}

function toSlug(entry: BlogEntry): string {
  return entry.info.path.replace(/\.mdx?$/, '');
}

export function getBlogPosts(): BlogPost[] {
  return blog.entries
    .map((entry) => ({ ...entry, slug: toSlug(entry) }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((post) => post.slug === slug);
}
