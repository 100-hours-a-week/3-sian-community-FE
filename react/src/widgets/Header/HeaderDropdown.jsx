import { css } from "@emotion/react";
import colors from "../../shared/styles/colors";

export default function HeaderDropdown({ onNavigate, onLogout }) {
  // onNavigate: 페이지 이동
  // onLogout : 로그아웃
  return (
    <ul css={menuStyle}>
      <li onClick={() => onNavigate("/profile/edit")}>회원정보 수정</li>
      <li onClick={() => onNavigate("/profile/password")}>비밀번호 수정</li>
      <li onClick={() => onLogout}>로그아웃</li>
    </ul>
  );
}

const menuStyle = css`
  list-style: none;
  padding: 8px 0;
  margin: 0;

  li {
    padding: 10px 14px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: ${colors.gray200};
    }
  }
`;
