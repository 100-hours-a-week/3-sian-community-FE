import styled from "@emotion/styled";
import colors from "../../styles/color";

export default function Button({
  children,
  variant = "primary",
  size = "default",
  disabled = false,
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
  color: ${colors.white};

  ${({ fullWidth }) => fullWidth === true && `width: 100%;`}

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
      background: ${colors.primary};
    `}

  ${({ variant }) =>
    variant === "secondary" &&
    `
      background: ${colors.primary}CC;
    `}

  &:disabled {
    background: ${colors.gray200} !important;
    cursor: not-allowed;
  }
`;
