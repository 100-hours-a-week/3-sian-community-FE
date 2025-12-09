import { useState } from "react";
import styled from "@emotion/styled";

import Button from "../../../shared/ui/Button";
import InputField from "../../../shared/ui/InputField";

import { validateTitle, validateContent } from "../../../shared/lib/validators";

export default function PostForm({
  mode = "write",
  defaultValues,
  existingImageUrl,
  onSubmit,
}) {
  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [content, setContent] = useState(defaultValues?.content ?? "");
  const [file, setFile] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    content: "",
  });

  const validate = () => {
    const titleResult = validateTitle(title.trim());
    const contentResult = validateContent(content.trim());

    const nextErrors = {
      title: titleResult.ok ? "" : titleResult.message,
      content: contentResult.ok ? "" : contentResult.message,
    };

    setErrors(nextErrors);
    return !Object.values(nextErrors).some(Boolean);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("content", content.trim());

    if (file) formData.append("image", file);

    if (removeImage) {
      formData.append("removeImage", "true");
    }

    onSubmit(formData);
  };

  return (
    <WritePostPage>
      <WritePostTitle>
        {mode === "edit" ? "모집글 수정" : "모집글 작성"}
      </WritePostTitle>

      <WritePostForm onSubmit={handleSubmit}>
        <FormGroup>
          <InputField
            label="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요. (최대 26글자)"
            maxLength={26}
            error={errors.title}
          />
        </FormGroup>

        <FormGroup>
          <InputField
            label="내용"
            textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해주세요."
            error={errors.content}
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>이미지</FormLabel>
          {/* 수정모드 & 이미지 파일 있는 경우 */}
          {mode === "edit" && existingImageUrl && !file && !removeImage && (
            <>
              <CurrentFileName>
                현재 이미지: {existingImageUrl.split("/").pop()}
              </CurrentFileName>
              <img
                src={existingImageUrl}
                alt="기존 이미지"
                style={{ width: 120, borderRadius: 8 }}
              />
              <label style={{ marginTop: 6 }}>
                <input
                  type="checkbox"
                  checked={removeImage}
                  onChange={(e) => setRemoveImage(e.target.checked)}
                />
                기존 이미지 삭제
              </label>
            </>
          )}

          <FileInputRow>
            <input
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setRemoveImage(false);
              }}
            />
          </FileInputRow>
        </FormGroup>

        <FormSubmit>
          <Button
            type="submit"
            variant="primary"
            disabled={
              !title.trim() ||
              !content.trim() ||
              !!errors.title ||
              !!errors.content
            }
          >
            완료
          </Button>
        </FormSubmit>
      </WritePostForm>
    </WritePostPage>
  );
}

export const WritePostPage = styled.main`
  margin: 0 auto;
  padding: 50px 0;
`;
export const WritePostTitle = styled.h1`
  font-size: 24px;
  font-family: Galmuri11;
  text-align: center;
  margin-bottom: 30px;
`;

export const WritePostForm = styled.form`
  width: 570px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .form-group {
    margin-bottom: 20px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FormLabel = styled.label`
  font-size: 16px;
  font-weight: 700;
  color: #000;
`;

export const Required = styled.span`
  color: #ed4956;
  margin-left: 4px;
`;

export const FormInput = styled.input`
  border: 1px solid #ccc;
  border-left: none;
  border-right: none;
  background-color: transparent;
  padding: 12px;
  font-size: 15px;
  font-family: "Pretendard", sans-serif;
  resize: none;
  box-sizing: border-box;
  color: #838486;

  &:focus {
    outline: none;
    border-color: #ff4040;
  }
`;

export const FormTextarea = styled.textarea`
  border: 1px solid #ccc;
  border-left: none;
  border-right: none;
  background-color: transparent;
  padding: 12px;
  font-size: 15px;
  font-family: "Pretendard", sans-serif;
  resize: none;
  box-sizing: border-box;
  color: #838486;

  &:focus {
    outline: none;
    border-color: #ff4040;
  }
`;

export const FileInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const FilePlaceholder = styled.p`
  color: #777;
  font-size: 14px;
`;

export const FormSubmit = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const CurrentFileName = styled.p`
  font-size: 13px;
  color: #666;
  margin-bottom: 6px;
`;
