import { css } from "@emotion/react";
import colors from "../../../shared/styles/colors";

export default function EditProfileDropdown({ onChange, onDelete }) {
  return (
    <ul css={menuStyle}>
      <li onClick={() => onChange}>프로필 변경</li>
      <li onClick={() => onDelete}>프로필 삭제</li>
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
