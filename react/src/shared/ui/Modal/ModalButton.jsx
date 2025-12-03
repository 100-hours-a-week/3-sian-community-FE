import styled from "@emotion/styled";
import colors from "../../../styles/color";

export default function ModalButton({ children, color = "primary", ...props }) {
  return (
    <Button color={color} {...props}>
      {children}
    </Button>
  );
}

const Button = styled.button`
  width: 127px;
  height: 44px;
  font-size: 20px;
  font-weight: 400;
  font-family: "Galmuri11";

  background-color: ${colors.white};
  border: none;
  border-top: 1px solid ${colors.gray300};
  border-bottom: 1px solid ${colors.gray300};
  cursor: pointer;

  ${({ color }) =>
    color === "primary" &&
    `
      color: ${colors.primary};
      border-top: 1px solid ${colors.primary};
      border-bottom: 1px solid ${colors.primary};
    `}

  ${({ color }) =>
    color === "default" &&
    `
      color: #111;
    `}
`;
