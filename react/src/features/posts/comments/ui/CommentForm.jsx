import styled from "@emotion/styled";

import Button from "../../../../shared/ui/Button";
import InputField from "../../../../shared/ui/InputField";

export default function CommentForm({
  value = "",
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <WriteCommentForm
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <InputField
        textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <ButtonWrapper>
        {onCancel && (
          <Button type="button" size="short" variant="white" onClick={onCancel}>
            취소
          </Button>
        )}
        <Button type="submit" size="short" variant="primary">
          등록
        </Button>
      </ButtonWrapper>
    </WriteCommentForm>
  );
}

const WriteCommentForm = styled.form`
  display: flex-box;
  gap: 8px;
  align-items: flex-end;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--gray-300);
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
  gap: 10px;
  display: flex;
  justify-content: flex-end;
`;
