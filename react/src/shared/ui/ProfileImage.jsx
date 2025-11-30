import { css } from "@emotion/react";

export default function ProfileImage({ imageUrl, size = 36, rounded = true }) {
  const defaultProfile = "/src/assets/profile-image.png";

  const style = css`
    width: ${size}px;
    height: ${size}px;
    background-image: url("${imageUrl || defaultProfile}");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: ${rounded ? "50%" : "8px"};
    overflow: hidden;
    cursor: pointer;
    background-color: rgb(157, 157, 157);
  `;

  return <div css={style} />;
}
