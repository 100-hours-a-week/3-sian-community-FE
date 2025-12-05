import styled from "@emotion/styled";
import defaultProfile from "../../shared/assets/images/default-profile.png";

export default function ProfilePreview({
  imageUrl,
  size = 149,
  onChange,
  fileInputRef,
}) {
  const src = imageUrl || defaultProfile;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange && onChange(file);
    e.target.value = "";
  };

  return (
    <Wrapper>
      <Preview size={size} src={src} />
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
  background-image: url(${(p) => p.src});
  background-size: cover;
  background-position: center;
  background-color: #ddd;
`;

const HiddenInput = styled.input`
  display: none;
`;
