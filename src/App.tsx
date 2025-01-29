import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./routes/Router";
import JotaiProvider from "./provider/JotaiProvider";
import "./styles/App.css";
import { OverlayProvider } from "overlay-kit";

const App = (): JSX.Element => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // 창 포커스 시 재요청 비활성화
        staleTime: 5 * 60 * 1000, // 데이터 유효 시간을 5분으로 설정, 최초 실행 5분 후 서버에 데이터 재요청
        retry: 1, // 쿼리함수가 error를 throw 시 한번만 재요청
      },
    },
  });

  //useEffect(() => {
  //   async function initMockWorker() {
  //     if (import.meta.env.MODE === "development") {
  //       const { worker } = await import("@/mocks/browser");
  //       worker.start();
  //     }
  //   }

  //   initMockWorker();
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <JotaiProvider>
          <OverlayProvider>
            <Router />
          </OverlayProvider>
        </JotaiProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
