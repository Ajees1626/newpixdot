/** Official Pixdot brand assets (Cloudinary). */
export const PIXDOT_LOGOS = {
  /** Light mode navbar / light UI — navy + cyan accents */
  fullNavy: "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1761651795/1_eyzdsa.png",
  /** Dark mode navbar / dark UI — white wordmark */
  fullWhite: "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1761651796/3_p2wa6g.png",
  /** Cyan wordmark — accents / watermark */
  fullCyan: "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1761651795/2_e2r6xw.png",
  /** Icon mark only */
  mark: "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1761651795/logo_miyvfv.png",
} as const;

export type PixdotLogoVariant = keyof typeof PIXDOT_LOGOS;
