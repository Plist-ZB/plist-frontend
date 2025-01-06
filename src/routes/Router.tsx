import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("@/pages/home/HomePage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RedirectPage = lazy(() => import("@/pages/auth/RedirectPage"));
const WelcomePage = lazy(() => import("@/pages/auth/WelcomePage"));
const CategoryPage = lazy(() => import("@/pages/category/CategoryPage"));
const SearchPage = lazy(() => import("@/pages/search/SearchPage"));
const ChannelPage = lazy(() => import("@/pages/channel/ChannelPage"));
const MyPage = lazy(() => import("@/pages/mypage/MyPage"));
const ProfilePage = lazy(() => import("@/pages/mypage/ProfilePage"));
const PlaylistPage = lazy(() => import("@/pages/mypage/PlaylistPage"));
const PlaylistDetailPage = lazy(() => import("@/pages/mypage/PlaylistDetailPage"));
const HostHistoryPage = lazy(() => import("@/pages/mypage/HostHistoryPage"));
const HostHistoryDetailPage = lazy(() => import("@/pages/mypage/HostHistoryDetailPage"));

const Router = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="*" element={<div>404</div>} />

        <Route path="/" element={<HomePage />} />

        <Route path="/auth">
          <Route path="login" element={<LoginPage />} />
          <Route path="redirect" element={<RedirectPage />} />
          <Route path="welcome" element={<WelcomePage />} />
        </Route>

        <Route path="/category/:name" element={<CategoryPage />} />

        <Route path="/search" element={<SearchPage />} />

        <Route path="/channel/:channelId" element={<ChannelPage />} />

        <Route path="/mypage">
          <Route index element={<MyPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="playlist">
            <Route index element={<PlaylistPage />} />
            <Route path=":playlistId" element={<PlaylistDetailPage />} />
          </Route>
          <Route path="host-history">
            <Route index element={<HostHistoryPage />} />
            <Route path=":hostId" element={<HostHistoryDetailPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
