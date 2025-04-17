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
    });
  } catch (error) {
    console.error("Firebase 초기화 또는 백그라운드 메시지 처리 중 오류 발생:", error);
  }
}

// Firebase 초기화 함수 호출
initializeFirebase();
