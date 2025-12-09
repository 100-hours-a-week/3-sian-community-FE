import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "@emotion/styled";

import Dropdown from "../../shared/ui/Dropdown";
import HeaderDropdown from "./HeaderDropdown";
import ProfileImage from "../../shared/ui/ProfileImage";
import backIcon from "../../shared/assets/images/back-icon.png";
import colors from "../../shared/styles/colors";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false); // 드롭다운 열림 여부
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    const handleUserUpdated = () => {
      const raw = localStorage.getItem("user");
      setUser(raw ? JSON.parse(raw) : null);
    };

    window.addEventListener("user-updated", handleUserUpdated);
    return () => window.removeEventListener("user-updated", handleUserUpdated);
  }, []);

  const hideProfile =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleTitleClick = () => {
    const isLoggedIn = !!localStorage.getItem("accessToken");

    if (isLoggedIn) {
      navigate("/posts");
    } else {
      navigate("/");
    }
  };

  return (
    <HeaderWrapper>
      <ItemsContainer>
        {/* 뒤로가기 버튼 */}
        <BackButton onClick={() => navigate(-1)}>
          <img src={backIcon} alt="뒤로가기" />
        </BackButton>

        {/* Title */}
        <Title onClick={handleTitleClick}>Bremen</Title>

        {/* 프로필 (특정 페이지에서는 숨김) */}
        {!hideProfile && (
          <>
            <ProfileArea
              onClick={(e) => {
                e.stopPropagation();
                setOpen((prev) => !prev);
              }}
            >
              <ProfileImage imageUrl={user?.profileImageUrl} />
            </ProfileArea>

            <Dropdown
              open={open}
              onClose={() => setOpen(false)}
              top={48}
              right={0}
            >
              <HeaderDropdown
                onNavigate={(path) => {
                  setOpen(false);
                  navigate(path);
                }}
                onLogout={() => {
                  setOpen(false);
                  handleLogout();
                }}
              />
            </Dropdown>
          </>
        )}
      </ItemsContainer>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  position: relative;
  width: 100%;
  height: 104px;
  background: ${colors.white};
  border-bottom: 1px solid ${colors.gray200};
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
    background: ${colors.primary};
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
