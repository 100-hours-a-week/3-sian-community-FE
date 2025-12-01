import Posts from "../pages/Posts/Posts.js";
import Login from "../pages/Login/Login.js";
import Signup from "../pages/Signup/Signup.js";
import EditProfile from "../pages/EditProfile/EditProfile.js";
import WritePost from "../pages/EditPost/WritePost.js";
import PostDetail from "../pages/PostDetail/PostDetail.js";
import EditPost from "../pages/EditPost/EditPost.js";
import EditPassword from "../pages/EditPassword/EditPassword.js";

export const routes = [
  { path: /^\/$/, component: Login },
  { path: /^\/login$/, component: Login },
  { path: /^\/signup$/, component: Signup },
  { path: /^\/posts$/, component: Posts },
  { path: /^\/edit-profile$/, component: EditProfile },
  { path: /^\/write-post$/, component: WritePost },
  { path: /^\/edit-password$/, component: EditPassword },
  { path: /^\/post\/\d+$/, component: PostDetail },
  { path: /^\/editPost\/\d+$/, component: EditPost },
];
