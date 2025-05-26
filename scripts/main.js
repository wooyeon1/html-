"use strict";

/* 인트로 타이핑 효과 */
const introText = document.querySelector(".home__introtext");
const content = "안녕하세요.\n세상의 모든 데이터를 공부할 박우연입니다. :)";
let index = 0;
let putWord = "";

const typingInterval = setInterval(() => {
  putWord += content[index++];
  introText.innerText = putWord;
  // 타이핑이 끝나면 인터벌 중지
  if (index === content.length) {
      clearInterval(typingInterval);
      // 커서 깜빡임 효과를 유지하려면 아래 코드를 주석 해제하세요.
      // introText.classList.add("typing-finished"); // CSS에서 .typing-finished::after 정의 필요
  }
}, 150); // 타이핑 속도를 조금 빠르게 조절 (기존 320ms -> 150ms)

const navbarMenu = document.querySelector(".navbar__menu");
const navToggle = document.querySelector(".navbar__toggle-btn");

// 네비게이션 메뉴 클릭 시 (스크롤 및 메뉴 닫기)
navbarMenu.addEventListener("click", (event) => {
  const link = event.target.dataset.link;
  if (link == null) return; // 링크가 없는 곳을 클릭하면 무시

  scrollinto(link);
  // 모바일에서 메뉴 클릭 시 메뉴 닫기 (토글 버튼이 있을 경우)
  navbarMenu.classList.remove("visible");
});

/* 토글 버튼 클릭 시 메뉴 보이기/숨기기 (이 코드가 없으면 추가해주세요) */
navToggle.addEventListener("click", () => {
    navbarMenu.classList.toggle("visible");
});


/* 로고 클릭 시 메뉴 닫기 */
const logo = document.querySelector(".navbar__logo");
logo.addEventListener("click", () => {
  navbarMenu.classList.remove("visible");
  scrollinto("#home"); // 로고 클릭 시 홈으로 이동 (선택 사항)
});

/* ✅ 프로필 사진 클릭 시 팝업 띄우기 */
const navbarImg = document.querySelector(".home__avatar");
navbarImg.addEventListener("click", () => {
  showCutePopup("짱구 귀엽죵 ? "); // 기존 scrollinto("#footer") 대신 팝업 함수 호출
});

/* 스크롤 시 인트로 섹션 투명도 조절 */
const intro = document.querySelector(".home__container");
const introHeight = intro.offsetHeight;
document.addEventListener("scroll", () => {
  intro.style.opacity = 1 - window.scrollY / introHeight;
});

/* 스크롤 시 top 버튼 표시/비표시 */
const topBtn = document.querySelector(".top-btn");
document.addEventListener("scroll", () => {
  if (window.scrollY > introHeight / 2) {
    topBtn.classList.add("visible");
  } else {
    topBtn.classList.remove("visible");
  }
});
topBtn.addEventListener("click", () => {
  scrollinto("#home");
});

/* 부드러운 스크롤 함수 */
function scrollinto(selector) {
  const destination = document.querySelector(selector);
  if (destination) { // 대상이 존재하는지 확인
      destination.scrollIntoView({ behavior: "smooth" });
  } else {
      console.warn(`'${selector}'에 해당하는 요소를 찾을 수 없습니다.`);
  }
}

/* ✅ 귀여운 팝업 생성 및 표시 함수 */
function showCutePopup(message) {
  // Remove any existing popup first
  const existingPopup = document.querySelector(".cute-popup-overlay");
  if (existingPopup) {
    existingPopup.remove();
  }

  // Create overlay (배경)
  const overlay = document.createElement("div");
  overlay.className = "cute-popup-overlay";

  // Create popup container (팝업창)
  const popup = document.createElement("div");
  popup.className = "cute-popup";

  // Create message element (메시지)
  const msgElement = document.createElement("p");
  msgElement.textContent = message;

  // Create close button (닫기 버튼)
  const closeButton = document.createElement("button");
  closeButton.textContent = "닫기";

  // Add elements to popup
  popup.appendChild(msgElement);
  popup.appendChild(closeButton);

  // Add popup to overlay
  overlay.appendChild(popup);

  // Add overlay to body
  document.body.appendChild(overlay);

  // Add event listeners to close
  closeButton.addEventListener("click", () => {
    overlay.remove();
  });
  overlay.addEventListener("click", (event) => {
    // 팝업 창 바깥(오버레이)을 클릭했을 때만 닫기
    if (event.target === overlay) {
      overlay.remove();
    }
  });
}