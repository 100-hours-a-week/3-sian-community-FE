import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import Dropdown from "../../shared/ui/Dropdown";
import HeaderDropdown from "./HeaderDropdown";
import ProfileImage from "../../shared/ui/ProfileImage";
import backIcon from "../../shared/assets/images/back-icon.png";

export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // 드롭다운 열림 여부

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <HeaderWrapper>
      <ItemsContainer>
        {/* 뒤로가기 버튼 */}
        <BackButton onClick={() => navigate(-1)}>
          <img src={backIcon} alt="뒤로가기" />
        </BackButton>

        {/* Title */}
        <Title onClick={() => navigate("/")}>Bremen</Title>

        {/* Profile */}
        <ProfileArea
          onClick={(e) => {
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
        >
          <ProfileImage />
        </ProfileArea>

        {/* 드롭다운 */}
        <Dropdown open={open} onClose={() => setOpen(false)} top={48} right={0}>
          <HeaderDropdown
            onNavigate={(path) => {
              setOpen(false);
              navigate(path);
            }}
            onLogout={() => {
              setOpen(false);
              handleLogout();
            }}
          ></HeaderDropdown>
        </Dropdown>
      </ItemsContainer>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  position: relative;
  width: 100%;
  height: 104px;
  background: #fdfdfd;
  border-bottom: 1px solid #e2e2e2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemsContainer = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Title = styled.div`
  position: relative;
  font-family: "Cafe24ProUp";
  font-size: 32px;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 4px;
    width: 100%;
    height: 6px;
    background: #ff4040;
    z-index: -1;
  }
`;

const BackButton = styled.div`
  position: absolute;
  left: 0;
  cursor: pointer;

  img {
    width: 24px;
    opacity: 0.9;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.6;
    }
  }
`;

const ProfileArea = styled.div`
  position: absolute;
  right: 0;
  cursor: pointer;
`;
