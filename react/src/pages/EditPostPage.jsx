import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import PostForm from "../features/posts/ui/PostForm";
import Toast from "../shared/ui/Toast";

import updatePost from "../features/posts/api/updatePost";
import getPostDetail from "../features/posts/api/getPostDetail";

export default function EditPostPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [toast, setToast] = useState(null);
  const [defaultValues, setDefaultValues] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostDetail(postId);

        setDefaultValues({
          title: post.title,
          content: post.content,
        });
        if (post.postImageUrl) {
          setExistingImageUrl(post.postImageUrl);
        }
      } catch {
        alert("게시글 불러오기 실패");
      }
    };
    fetchPost();
  }, [postId]);

  const showToast = (message, type) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const handleSubmit = async (formData) => {
    try {
      await updatePost(postId, formData);
      showToast("게시글 수정 완료!", "success");
      navigate("/posts");
    } catch (err) {
      showToast("게시글 수정 실패", "error");
      console.error("게시글 수정 실패:", err);
    }
  };

  if (!defaultValues) return null;

  return (
    <>
      <PostForm
        mode="edit"
        defaultValues={defaultValues}
        existingImageUrl={existingImageUrl}
        onSubmit={handleSubmit}
      />
      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
}
