import styled from "@emotion/styled";
import colors from "../../styles/colors";
import ModalButton from "./ModalButton";

export default function ConfirmModal({
  open,
  title = "",
  message = "",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <Overlay onClick={onCancel}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Title>{title}</Title>
        <Message>{message}</Message>

        <ButtonRow>
          <ModalButton color="default" onClick={onCancel}>
            취소
          </ModalButton>
          <ModalButton color="primary" onClick={onConfirm}>
            확인
          </ModalButton>
        </ButtonRow>
      </ModalBox>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;
`;

const ModalBox = styled.div`
  width: 400px;
  background: ${colors.white};
  padding: 36px 28px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
`;

const Title = styled.h2`
  font-family: "Galmuri11";
  font-size: 20px;
  font-weight: 700;
  color: ${colors.black};
  margin-bottom: 10px;
`;

const Message = styled.p`
  font-size: 15px;
  color: ${colors.gray700};
  margin-bottom: 32px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;
