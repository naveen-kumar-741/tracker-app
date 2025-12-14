import type React from 'react';
import { typographyVariants, type TypographyProps } from './typo.interface';
import type { JSX } from 'react';

const Typography: React.FC<TypographyProps> = ({
  label,
  variant,
  className = '',
  title = '',
}) => {
  const keys = Object.keys(typographyVariants) as Array<
    keyof typeof typographyVariants
  >;

  const key = keys.find((k) => typographyVariants[k] === variant) ?? '';
  const tagMap: Record<string, keyof JSX.IntrinsicElements> = {
    heading_36: 'h1',
    heading_30: 'h2',
    heading_24: 'h3',
    body_: 'p',
  };

  const Tag =
    Object.entries(tagMap).find(([prefix]) => key.startsWith(prefix))?.[1] ||
    'span';

  return (
    <Tag
      className={`${variant} ${className} leading-none text-(--dark)`}
      title={title}
    >
      {label}
    </Tag>
  );
};

export default Typography;
