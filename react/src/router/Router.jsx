import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostsPage from "../pages/PostsPage";
import PostDetailPage from "../pages/PostDetailPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import EditProfilePage from "../pages/EditProfilePage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<PostsPage />} />
      <Route path="/posts/:id" element={<PostDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile/edit" element={<EditProfilePage />} />
    </Routes>
  );
}

export default Router;
