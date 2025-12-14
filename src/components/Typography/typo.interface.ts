export const typographyVariants = {
  // === 36px Headings ===
  heading_36_400: 'text-4xl font-normal',
  heading_36_500: 'text-4xl font-medium',
  heading_36_600: 'text-4xl font-semibold',
  heading_36_700: 'text-4xl font-bold',

  // === 30px Headings ===
  heading_30_400: 'text-3xl font-normal',
  heading_30_500: 'text-3xl font-medium',
  heading_30_600: 'text-3xl font-semibold',
  heading_30_700: 'text-3xl font-bold',

  // === 24px Headings ===
  heading_24_400: 'text-2xl font-normal',
  heading_24_500: 'text-2xl font-medium',
  heading_24_600: 'text-2xl font-semibold',
  heading_24_700: 'text-2xl font-bold',

  // === 16px Body ===
  body_16_400: 'text-base font-normal',
  body_16_500: 'text-base font-medium',
  body_16_600: 'text-base font-semibold',
  body_16_700: 'text-base font-bold',

  // === 14px Body ===
  body_14_400: 'text-sm font-normal',
  body_14_500: 'text-sm font-medium',
  body_14_600: 'text-sm font-semibold',
  body_14_700: 'text-sm font-bold',

  // === 12px Caption ===
  caption_12_400: 'text-xs font-normal text-gray-500',
  caption_12_500: 'text-xs font-medium text-gray-500',
  caption_12_600: 'text-xs font-semibold text-gray-500',
  caption_12_700: 'text-xs font-bold text-gray-500',
} as const;

export type TypoEnumType =
  (typeof typographyVariants)[keyof typeof typographyVariants];

export interface TypographyProps {
  label: string;
  variant: TypoEnumType;
  className?: string;
  title?: string;
}
