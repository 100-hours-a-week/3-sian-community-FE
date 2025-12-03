import { css } from "@emotion/react";
import defaultProfile from "../assets/images/profile-image.png";
import colors from "../../styles/color";

export default function ProfileImage({ imageUrl, size = 36, rounded = true }) {
  const style = css`
    width: ${size}px;
    height: ${size}px;
    background-image: url(${imageUrl || defaultProfile});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: ${rounded ? "50%" : "8px"};
    overflow: hidden;
    cursor: pointer;
    background-color: ${colors.gray300};
  `;

  return <div css={style} />;
}
