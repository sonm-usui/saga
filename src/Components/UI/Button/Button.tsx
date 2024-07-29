import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';
import {
  ButtonBackgrounds,
  ButtonColors,
  ButtonSizes,
  ButtonTypes,
  ButtonBorderRadius,
  ButtonSpinnerColors
} from './enums';
import { Spin } from 'antd';

export * from './enums';

export interface ButtonProps extends React.PropsWithChildren {
  size?: ButtonSizes;
  type?: ButtonTypes;
  color?: ButtonColors;
  background?: ButtonBackgrounds;
  borderRadius?: string;
  disabled?: boolean;
  className?: string;
  submit?: boolean;
  loading?: boolean;
  spinnerColor?: ButtonSpinnerColors;
  onClick?: () => void;
}

// eslint-disable-next-line react/display-name
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = ButtonSizes.medium,
      color = ButtonColors.white,
      type = ButtonTypes.filled,
      background = ButtonBackgrounds.white,
      borderRadius = ButtonBorderRadius.br5,
      className,
      disabled,
      children,
      submit,
      loading,
      spinnerColor = ButtonSpinnerColors.white,
      onClick
    },
    ref
  ) => {
    const classes = classNames(
      styles.button,
      styles[size],
      styles[color],
      styles[background],
      styles[borderRadius],
      styles[type],
      className
    );

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled}
        type={submit ? 'submit' : 'button'}
        onClick={onClick}>
        {loading ? <Spin className={spinnerColor} /> : children}
      </button>
    );
  }
);

export default Button;
