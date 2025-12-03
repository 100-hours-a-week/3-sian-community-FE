import { css } from "@emotion/react";
import { useRef, useEffect } from "react";

export default function Dropdown({ open, onClose, children, top, right = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    // 모달 바깥 클릭시 닫기
    function handleClick(e) {
      if (open && ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div ref={ref} css={dropdownStyle(top, right)}>
      {children}
    </div>
  );
}

const dropdownStyle = (top, right) => css`
  position: absolute;
  top: ${top}px;
  right: ${right}px;
  width: 140px;
  background: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  z-index: 20;
`;
