import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // GitHub's user-attachments links (README/issue image uploads) 302 to a
      // presigned, short-lived S3 URL. Both hosts need to be allowed: the
      // first for the initial request, the second for the redirect the
      // image optimizer follows to actually fetch the bytes.
      { protocol: 'https', hostname: 'github.com', pathname: '/user-attachments/assets/**' },
      { protocol: 'https', hostname: '*.s3.amazonaws.com' },
    ],
  },
};

export default withMDX(config);
