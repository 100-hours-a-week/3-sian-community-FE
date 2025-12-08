import { useNavigate } from "react-router-dom";
import { useState } from "react";

import PostForm from "../features/posts/ui/PostForm";
import Toast from "../shared/ui/Toast";

import createPost from "../features/posts/api/createPost";

export default function WritePostPage() {
  const navigate = useNavigate();

  const [toast, setToast] = useState(false);

  const showToast = (message, type) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const handleCreate = async (formData) => {
    try {
      await createPost(formData);
      showToast("게시글 작성 완료!", "success");
      navigate("/posts");
    } catch (err) {
      showToast("게시글 작성 실패", "error");
      console.error("게시글 작성 실패:", err);
    }
  };

  return (
    <>
      <PostForm mode="write" onSubmit={handleCreate} />
      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
}
