import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../shared/ui/ProfileImage";
import styled from "@emotion/styled";
export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <HeaderWrapper>
      <ItemsContainer>
        {/* 뒤로가기 버튼 */}
        <BackButton onClick={() => navigate(-1)}>
          <img src="/src/assets/back-icon.png" alt="뒤로가기" />
        </BackButton>

        {/* Title */}
        <Title onClick={() => navigate("/")}>Bremen</Title>

        {/* Profile */}
        <ProfileArea onClick={() => setOpen((prev) => !prev)}>
          <ProfileImage imageUrl={null} size={36} />
        </ProfileArea>

        {/* 드롭다운 */}
        {open && (
          <Dropdown>
            <ul>
              <li onClick={() => navigate("/profile/edit")}>회원정보수정</li>
              <li>비밀번호수정</li>
              <li>로그아웃</li>
            </ul>
          </Dropdown>
        )}
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
  width: 600px;
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

const Dropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  width: 140px;
  background: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  z-index: 10;

  ul {
    list-style: none;
    padding: 8px 0;
    margin: 0;
  }

  li {
    padding: 10px 14px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #eaeaea;
    }
  }
`;
