import styled from "@emotion/react";

export default function Button({
  children,
  variant = "primary",
  size = "default",
  disabled = "false",
  fullWidth = false,
  ...props
}) {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #fff;

  ${({ fullWidth }) => fullWidth && `width: 100%;`}

  /* === SIZE === */
  ${({ size }) =>
    size === "default" &&
    `
      width: 355px;
      height: 38px;
      font-size: 14px;
    `}

  ${({ size }) =>
    size === "mini" &&
    `
      width: 138px;
      height: 30px;
      font-size: 16px;
      border-radius: 14px;
      padding: 0 14px;
    `}

  /* === VARIANT === */
  ${({ variant }) =>
    variant === "primary" &&
    `
      background: #ee6a6a;
      &:hover {
        background: #d65858;
      }
    `}

  ${({ variant }) =>
    variant === "secondary" &&
    `
      background: #eba0a0;
      &:hover {
        background: #ee6a6a;
      }
    `}

  &:disabled {
    background: #dadada;
    cursor: not-allowed;
  }
`;
