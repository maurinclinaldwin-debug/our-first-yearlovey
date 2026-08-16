/**
 * Helper to convert Google Drive file IDs or view URLs to fast, high-performance image CDN links.
 */

export function extractDriveId(urlOrId: string): string {
  if (!urlOrId) return '';
  if (/^[a-zA-Z0-9_-]{20,}$/.test(urlOrId.trim())) {
    return urlOrId.trim();
  }
  const match = urlOrId.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || urlOrId.match(/id=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : urlOrId.trim();
}

/**
 * Returns the direct Google User Content CDN link (fastest, optimized, no redirects).
 */
export function getDriveDirectUrl(driveIdOrUrl: string): string {
  const id = extractDriveId(driveIdOrUrl);
  if (!id) return '';
  return `https://lh3.googleusercontent.com/d/${id}`;
}

/**
 * Returns the Google Drive high-resolution thumbnail CDN endpoint.
 */
export function getDriveThumbnailUrl(driveIdOrUrl: string, size = 1200): string {
  const id = extractDriveId(driveIdOrUrl);
  if (!id) return '';
  return `https://drive.google.com/thumbnail?id=${id}&sz=w${size}`;
}
