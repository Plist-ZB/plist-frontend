importScripts("https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js");

async function initializeFirebase() {
  try {
    const response = await fetch("./firebase-config.json");

    if (!response.ok) {
      throw new Error(`Firebase config fetch failed: ${response.statusText}`);
    }

    const config = await response.json();

    // 설정 값을 가져온 후에 Firebase 앱 초기화
    firebase.initializeApp(config);

    const messaging = firebase.messaging();

    // 백그라운드 메시지 처리
    messaging.onBackgroundMessage((payload) => {
      console.log("[firebase-messaging-sw.js] 백그라운드 메시지", payload);
      const { title, body, link } = payload.data;

      // 알림 표시 사용자 정의
      const notificationTitle = "플리스트 알림";
      const notificationOptions = {
        title,
        body,
        icon: "./plist-logo.png",
      };

      self.registration.showNotification(notificationTitle, notificationOptions);

      // 알림 클릭 이벤트
      self.addEventListener("notificationclick", function (event) {
        // 원하는 링크 URL
        const targetUrl = link || "https://plist.shop";

        event.notification.close();

        event.waitUntil(
          clients
            .matchAll({ type: "window", includeUncontrolled: true })
            .then(function (clientList) {
              // 이미 열려있는 탭이 있으면 해당 탭으로 포커스 이동
              for (const client of clientList) {
                if (client.url === targetUrl && "focus" in client) {
                  return client.focus();
                }
              }

              // 없으면 새 창을 열기
              if (clients.openWindow) {
                return clients.openWindow(targetUrl);
              }
            })
        );
      });
    });
  } catch (error) {
    console.error("Firebase 초기화 또는 백그라운드 메시지 처리 중 오류 발생:", error);
  }
}

// Firebase 초기화 함수 호출
initializeFirebase();
