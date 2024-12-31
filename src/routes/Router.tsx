import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="*" element={<div>404</div>} />

      <Route path="/" element={<div>Home</div>} />

      <Route path="/auth">
        <Route path="login" element={<div>Login</div>} />
        <Route path="redirect" element={<div>Redirect</div>} />
        <Route path="welcome" element={<div>Welcome</div>} />
      </Route>

      <Route path="/category/:categoryName" />

      <Route path="/search" element={<div>search</div>} />

      <Route path="/room/:roomId" element={<div>Pli Room</div>} />

      <Route path="/mypage">
        <Route index element={<div>mypage</div>} />
        <Route path="profile" element={<div>profile</div>} />
        <Route path="playlist">
          <Route index element={<div>playlist</div>} />
          <Route path=":playlistId" element={<div>playlist-detail</div>} />
        </Route>
        <Route path="host-history">
          <Route index element={<div>host-history</div>} />
          <Route path=":hostId" element={<div>host-history-detail</div>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
