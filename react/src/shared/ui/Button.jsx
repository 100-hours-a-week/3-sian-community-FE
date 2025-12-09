import styled from "@emotion/styled";
import colors from "../../shared/styles/colors";

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
    size === "short" &&
    `
      width: 138px;
      height: 30px;
      font-size: 16px;
      border-radius: 14px;
      padding: 0 14px;
    `}

  ${({ size }) =>
    size === "mini" &&
    `
    border: 1px solid ${colors.gray700};
    color: ${colors.gray700};
    width: 60px;
    height: 25px;
    font-size: 13px;
    border-radius: 5px;
    padding: 0 8px;
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

  ${({ variant }) =>
    variant === "white" &&
    `background: ${colors.white};
      color: ${colors.black};
      border: solid 1px ${colors.black};`}

  ${({ variant }) =>
    variant === "black" &&
    `background: ${colors.black};
      color: ${colors.white};
      border: none`}
`;
