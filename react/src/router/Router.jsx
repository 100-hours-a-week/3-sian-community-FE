import { Routes, Route } from "react-router-dom";
import PostsPage from "../pages/PostsPage";
import PostDetailPage from "../pages/PostDetailPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import EditProfilePage from "../pages/EditProfilePage";
import NotFoundPage from "../pages/NotFoundPage";
import UpdatePasswordPage from "../pages/UpdatePasswordPage";
import WritePostPage from "../pages/WritePostPage";
import EditPostPage from "../pages/EditPostPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/posts" element={<PostsPage />} />
      <Route path="/posts/:id" element={<PostDetailPage />} />
      <Route path="/posts/new" element={<WritePostPage />} />
      <Route path="/posts/:id/edit" element={<EditPostPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile/edit" element={<EditProfilePage />} />
      <Route path="/profile/password" element={<UpdatePasswordPage />} />
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
}

export default Router;
