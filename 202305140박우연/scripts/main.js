"use strict";

/* 인트로 타이핑 효과 */
const introText = document.querySelector(".home__introtext");
const content = "안녕하세요.\n저는 박우연입니다 :)";
let index = 0;
let putWord = "";

const typingInterval = setInterval(() => {
  putWord += content[index++];
  introText.innerText = putWord;
}, 320);
setTimeout(() => {
  clearInterval(typingInterval);
}, 320 * content.length + 30);

/* 네비게이션 메뉴 클릭 시 해당 섹션으로 스크롤 이동 */
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const link = event.target.dataset.link;
  if (link == null) return;
  scrollinto(link);
});

/* 모바일용 메뉴 토글 */
const navToggle = document.querySelector(".navbar__toggle-btn");
navToggle.addEventListener("click", () => {
  navbarMenu.classList.toggle("visible");
  navbarMenu.addEventListener("click", () => {
    navbarMenu.classList.remove("visible");
  });
});

/* 로고 클릭 시 메뉴 닫기 */
const logo = document.querySelector(".navbar__logo");
logo.addEventListener("click", () => {
  navbarMenu.classList.remove("visible");
});

/* 프로필 사진 클릭 시 footer로 스크롤 이동 */
const navbarImg = document.querySelector(".home__avatar");
navbarImg.addEventListener("click", () => {
  scrollinto("#footer");
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
  destination.scrollIntoView({ behavior: "smooth" });
}
