import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import RootLayout from "@/layout/RootLayout";

const HomePage = lazy(() => import("@/pages/home/HomePage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RedirectPage = lazy(() => import("@/pages/auth/RedirectPage"));
const WelcomePage = lazy(() => import("@/pages/auth/WelcomePage"));
const CategoryPage = lazy(() => import("@/pages/category/CategoryPage"));
const CategoryDetailPage = lazy(() => import("@/pages/category/CategoryDetailPage"));
const SearchPage = lazy(() => import("@/pages/search/SearchPage"));
const ChannelPage = lazy(() => import("@/pages/channel/ChannelPage"));
const MyPage = lazy(() => import("@/pages/mypage/MyPage"));
const ProfilePage = lazy(() => import("@/pages/mypage/ProfilePage"));
const PlaylistPage = lazy(() => import("@/pages/mypage/PlaylistPage"));
const PlaylistDetailPage = lazy(() => import("@/pages/mypage/PlaylistDetailPage"));
const HostHistoryPage = lazy(() => import("@/pages/mypage/HostHistoryPage"));
const HostHistoryDetailPage = lazy(() => import("@/pages/mypage/HostHistoryDetailPage"));
const PageNotFound = lazy(() => import("@/pages/error/PageNotFound"));
const NotificationPage = lazy(() => import("@/pages/notify/NotificationPage"));
const UserPage = lazy(() => import("@/pages/user/UserPage"));
const UserPastStreamDetailPage = lazy(() => import("@/pages/user/UserPastStreamDetailPage"));
const FollowIngListPage = lazy(() => import("@/pages/mypage/FollowIngListPage"));

const Router = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="*" element={<PageNotFound />} />

        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>

        <Route path="/auth">
          <Route path="login" element={<LoginPage />} />
          <Route path="redirect" element={<RedirectPage />} />
          <Route path="welcome" element={<WelcomePage />} />
        </Route>

        <Route path="/notify" element={<NotificationPage />} />

        <Route path="user">
          <Route index element={<Navigate to="/" replace />} />
          <Route path=":userId" element={<UserPage />} />
          <Route path="past-stream/:id" element={<UserPastStreamDetailPage />} />
        </Route>

        <Route path="/category/:id" element={<CategoryDetailPage />} />

        <Route path="/channel/:channelId" element={<ChannelPage />} />

        <Route path="/mypage">
          <Route path="profile" element={<ProfilePage />} />
          <Route path="playlist">
            <Route index element={<PlaylistPage />} />
            <Route path=":playlistId" element={<PlaylistDetailPage />} />
          </Route>
          <Route path="host-history">
            <Route index element={<HostHistoryPage />} />
            <Route path=":channelId" element={<HostHistoryDetailPage />} />
          </Route>
          <Route path="following" element={<FollowIngListPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
