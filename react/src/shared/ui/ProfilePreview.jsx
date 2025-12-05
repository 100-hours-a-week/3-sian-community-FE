import styled from "@emotion/styled";
import { useRef } from "react";

export default function ProfilePreview({ image, size = 149, onChange }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange && onChange(file);
  };

  return (
    <Wrapper onClick={handleClick}>
      <Preview size={size} style={{ backgroundImage: `url(${image})` }} />
      <HiddenInput
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  cursor: pointer;
  display: inline-block;
`;

const Preview = styled.div`
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-color: #ddd;
`;

const HiddenInput = styled.input`
  display: none;
`;
