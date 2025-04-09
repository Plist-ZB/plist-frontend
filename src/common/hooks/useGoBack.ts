import { useNavigate } from "react-router-dom";

/**
 * @description `useNavigate`를 사용하는 뒤로가기 훅, 뒤로가기 스택이 없을 경우 fallbackRoute로 이동하며 기본 값은 "/"
 */
export const useGoBack = (fallbackRoute?: string) => {
  const navigate = useNavigate();

  const hasBrowserStacks = window.history.length > 1;

  if (hasBrowserStacks) return () => navigate(-1);
  else if (fallbackRoute) return () => navigate(fallbackRoute ?? "/");
};
