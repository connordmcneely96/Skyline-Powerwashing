/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Cloudflare Pages doesn't run Next's default image optimizer. Disabling it
    // keeps every <Image> edge-compatible (plain <img> with width/height to
    // prevent layout shift). Swap in Cloudflare Images / a custom loader later.
    unoptimized: true,
  },
};

export default nextConfig;
