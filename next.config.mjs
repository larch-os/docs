import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Lets the dev server be opened from another device on the LAN (e.g. a
  // phone) for mobile testing. Next.js otherwise 403s the JS chunk requests
  // from any origin but localhost. Update this IP if your machine's LAN
  // address changes.
  allowedDevOrigins: ['192.168.29.46'],
  images: {
    remotePatterns: [
      // GitHub's user-attachments links (README/issue image uploads) 302 to a
      // presigned, short-lived S3 URL. Both hosts need to be allowed: the
      // first for the initial request, the second for the redirect the
      // image optimizer follows to actually fetch the bytes.
      { protocol: 'https', hostname: 'github.com', pathname: '/user-attachments/assets/**' },
      { protocol: 'https', hostname: '*.s3.amazonaws.com' },
      { protocol: 'https', hostname: 'storage.googleapis.com', pathname: '/larch-os/**' },
    ],
  },
};

export default withMDX(config);
