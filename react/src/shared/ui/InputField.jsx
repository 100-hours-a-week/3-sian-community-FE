import { styled } from "@emotion/styled";

export default function InputField({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  textarea = false,
  error = "",
  ...props
}) {
  return (
    <Container>
      {label && <Label>{label}</Label>}

      {textarea ? (
        <StyledTextarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          hasError={!!error}
          {...props}
        />
      ) : (
        <StyledInputField
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          type={type}
          hasError={!!error}
        ></StyledInputField>
      )}
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid ${({ hasError }) => (hasError ? "#ff6b6b" : "#ddd")};
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border 0.2s;

  &:focus {
    border-color: ${({ hasError }) => (hasError ? "#ff4d4d" : "#888")};
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 12px 14px;
  border: 1px solid ${({ hasError }) => (hasError ? "#ff6b6b" : "#ddd")};
  border-radius: 6px;
  font-size: 14px;
  resize: none;
  outline: none;
  transition: border 0.2s;

  &:focus {
    border-color: ${({ hasError }) => (hasError ? "#ff4d4d" : "#888")};
  }
`;

const ErrorText = styled.p`
  margin: 0;
  font-size: 12px;
  color: #ff4d4d;
`;
