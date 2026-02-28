/**
 * Image optimization utilities.
 *
 * For external images served from a CDN (Cloudinary, Imgix, etc.) you can
 * swap the `optimizedUrl` function to generate transformation URLs.
 * For self-hosted images the `imgProps` helper adds the correct HTML
 * attributes for lazy loading and modern decoding.
 */

interface ImgProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export function imgProps({ src, alt, width, height, priority = false, className }: ImgProps) {
  return {
    src,
    alt,
    width,
    height,
    loading: (priority ? 'eager' : 'lazy') as 'eager' | 'lazy',
    decoding: 'async' as const,
    fetchPriority: (priority ? 'high' : 'auto') as 'high' | 'auto',
    className,
  };
}

/**
 * Placeholder: generates an optimized URL via a CDN transformation.
 * Replace this with your actual CDN logic when available.
 */
export function optimizedUrl(src: string, opts?: { width?: number; quality?: number; format?: string }): string {
  if (!opts) return src;

  // Example Cloudinary transform (uncomment when using Cloudinary):
  // const { width = 800, quality = 80, format = 'auto' } = opts;
  // return src.replace('/upload/', `/upload/w_${width},q_${quality},f_${format}/`);

  return src;
}
