/* eslint-disable react/jsx-props-no-spreading */
import { HTMLProps, PropsWithChildren, ReactElement } from 'react';

import Link from 'next/link';

import styled, { css } from 'styled-components';
import lightTheme from 'styles/theme';

export type ColorType = 'success' | 'outlined' | 'primary' | 'warning' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface Props extends Omit<HTMLProps<HTMLButtonElement | HTMLAnchorElement>, 'size'> {
  color?: ColorType;
  size?: ButtonSize;
  isLoading?: boolean;
}

interface StyledButtonProps {
  color: ColorType;
  size: ButtonSize;
  theme: typeof lightTheme;
}

function Button({
  color = 'outlined', size = 'medium', href, children, type = 'button', isLoading = false, disabled, ...rest
}: PropsWithChildren<Props>): ReactElement {
  const htmlProps = rest as any;

  if (href) {
    return (
      <StyledLink
        href={href}
        color={color}
        size={size}
        {...htmlProps}
      >
        {children}
      </StyledLink>
    );
  }

  return (
    <StyledButton
      color={color}
      size={size}
      type={type}
      disabled={disabled || isLoading}
      {...htmlProps}
    >
      {children}
    </StyledButton>
  );
}

export default Button;

const ButtonWrapper = ({ theme }: StyledButtonProps) => css`
  position: relative;
  transform: translateZ(0);
  user-select: none;
  transition:
    color .1s ease-in-out,
    background-color .1s ease-in-out,
    border-color .1s ease-in-out,
    opacity .1s ease-in-out;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${theme.black};

  /* TODO - 추후 디자인 정의 후 반영 */
  padding: 4px 20px;
  width: 277px;
  height: 56px;
  font-weight: 600;
  font-size: 32px;
  line-height: 48px;
  background: ${theme.purple300};
  border: 2px solid ${theme.black};
  border-radius: 28px;

  @media(hover: hover) and (pointer: fine) {
    &:not(:disabled):after {
      content: " ";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: ${theme.black};
      opacity: 0;
      transition: opacity .1s ease-in-out;
    }

    &:not(:disabled):not(.disabled):hover:after {
      opacity: 0.15;
    }
  }
`;

const StyledLink = styled(Link)<StyledButtonProps>`
  ${ButtonWrapper}
`;

const StyledButton = styled.button<StyledButtonProps>`
  ${ButtonWrapper}
`;
