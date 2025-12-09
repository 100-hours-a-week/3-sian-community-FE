import { useState, useRef } from "react";
import styled from "@emotion/styled";

import ProfilePreview from "./ProfilePreview";
import Dropdown from "./Dropdown";
import ProfileDropdown from "../../features/signup/ui/ProfileDropdown";
import defaultProfile from "../assets/images/default-profile.png";

export default function ProfileUploader({ initialImageUrl, onChange }) {
  const fileInputRef = useRef(null);

  const [preview, setPreview] = useState(initialImageUrl ?? null);
  const [open, setOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  // 이미지 업로드
  const handleProfileImage = (uploaded) => {
    setPreview(URL.createObjectURL(uploaded));
    setIsDeleted(false);

    onChange?.({
      file: uploaded,
      isDeleted: false,
    });
  };

  // 이미지 삭제
  const handleDeleteProfileImage = () => {
    setPreview(null);
    setIsDeleted(true);

    onChange?.({
      file: null,
      isDeleted: true,
    });
  };

  return (
    <UploadWrapper
      onClick={(e) => {
        e.stopPropagation();
        setOpen((prev) => !prev);
      }}
    >
      <ProfilePreview
        imageUrl={isDeleted ? null : preview || defaultProfile}
        fileInputRef={fileInputRef}
        onChange={handleProfileImage}
      />

      <Dropdown
        open={open}
        onClose={() => setOpen(false)}
        top={100}
        right={-80}
      >
        <ProfileDropdown
          onChange={() => {
            setOpen(false);
            fileInputRef.current?.click();
          }}
          onDelete={() => {
            setOpen(false);
            handleDeleteProfileImage();
          }}
        />
      </Dropdown>
    </UploadWrapper>
  );
}

const UploadWrapper = styled.div`
  cursor: pointer;
  margin-bottom: 12px;
  position: relative;
`;
