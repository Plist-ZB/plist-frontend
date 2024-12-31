import { Navigate, Outlet } from "react-router-dom";

// TODO: Router 파일에 적용해야함
const ProtectedRoute = () => {
  // 임시 조건: 토큰이 없거나 만료되었다고 가정
  const tempCondition = false;

  if (tempCondition) {
    return <Navigate to="/auth/login" replace />;
  }
  // 토큰이 있거나 아직 유효하다면 자식 라우트를 렌더링
  return <Outlet />;
};

export default ProtectedRoute;
