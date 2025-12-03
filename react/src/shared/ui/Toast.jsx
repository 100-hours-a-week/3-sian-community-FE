import styled from "@emotion/react";
import colors from "../../styles/color";

export default function Toast({ message, type = "success" }) {
  return <ToastBox type={type}>{message}</ToastBox>;
}

const ToastBox = styled.div`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  color: ${colors.white};
  opacity: 0;
  animation: showToast 2.5s forwards;
  z-index: 2000;

  background-color: ${({ type }) =>
    type === "error"
      ? colors.error
      : type === "success"
        ? colors.primary
        : colors.gray300};

  @keyframes showToast {
    0% {
      opacity: 0;
      bottom: 40px;
    }
    20% {
      opacity: 1;
      bottom: 60px;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      bottom: 40px;
    }
  }
`;
