import React from 'react';
import classNames from 'classnames';
import styles from './Typography.module.scss';
import { TypographyColors, TypographySizes, TypographyWeights, TypographyFonts } from './enums';

export * from './enums';

export interface TypographyProps extends React.PropsWithChildren {
  className?: string;
  font: TypographyFonts;
  size?: TypographySizes;
  color?: TypographyColors;
  weight?: TypographyWeights;
  onClick?: () => void;
}

// eslint-disable-next-line react/display-name
const Typography = React.forwardRef<HTMLDivElement, TypographyProps>(
  (
    {
      children,
      className,
      font = TypographyFonts.dmSans,
      size = TypographySizes.s,
      color = TypographyColors.white,
      weight = TypographyWeights.regular,
      onClick
    },
    ref
  ) => {
    const classes = classNames(
      styles.typography,
      styles[size],
      styles[color],
      styles[weight],
      styles[font],
      className
    );
    return (
      <div ref={ref} className={classes} onClick={onClick}>
        {children}
      </div>
    );
  }
);

export default Typography;
