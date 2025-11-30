// === INCLUDE HEADER + FOOTER ===
fetch("index.html")
  .then(r => r.text())
  .then(html => {
    const headerMatch = html.match(/<header[\s\S]*?<\/header>/);
    const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/);

    const header = headerMatch ? headerMatch[0] : "";
    const footer = footerMatch ? footerMatch[0] : "";

    document.querySelectorAll(".include-header").forEach(e => (e.innerHTML = header));
    document.querySelectorAll(".include-footer").forEach(e => (e.innerHTML = footer));
  });

// === HEADER STICKY ===
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (header) {
    if (window.scrollY > 80) header.classList.add("sticky");
    else header.classList.remove("sticky");
  }
});

// === SLIDER TRANG CHỦ ===
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let current = 0;
let autoSlide;

if (slides.length > 0 && nextBtn && prevBtn) {
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  nextBtn.addEventListener("click", () => {
    current = (current + 1) % slides.length;
    showSlide(current);
    resetAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
    resetAutoSlide();
  });

  function startAutoSlide() {
    autoSlide = setInterval(() => {
      current = (current + 1) % slides.length;
      showSlide(current);
    }, 3500);
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  startAutoSlide();
}

// === SLIDER TIỆC CƯỚI ===
const weddingSlides = document.querySelectorAll(".wedding-slider .slide");
let currentWedding = 0;

if (weddingSlides.length > 0) {
  setInterval(() => {
    weddingSlides[currentWedding].classList.remove("active");
    currentWedding = (currentWedding + 1) % weddingSlides.length;
    weddingSlides[currentWedding].classList.add("active");
  }, 4000);
}

// === SLIDER GIỚI THIỆU (CHỈ CHẠY NẾU TỒN TẠI CÁC PHẦN TỬ) ===
const introSlides = document.querySelectorAll(".intro-slider .slide");
const introThumbs = document.querySelectorAll(".intro-slider .thumb");
let introCurrent = 0;

if (introSlides.length > 0 && introThumbs.length > 0) {
  function showIntroSlide(index) {
    introSlides.forEach((s, i) => {
      s.classList.toggle("active", i === index);
      if (introThumbs[i])
        introThumbs[i].classList.toggle("active-thumb", i === index);
    });
  }

  const nextIntro = document.querySelector(".intro-slider .next");
  const prevIntro = document.querySelector(".intro-slider .prev");

  if (nextIntro && prevIntro) {
    nextIntro.addEventListener("click", () => {
      introCurrent = (introCurrent + 1) % introSlides.length;
      showIntroSlide(introCurrent);
    });

    prevIntro.addEventListener("click", () => {
      introCurrent = (introCurrent - 1 + introSlides.length) % introSlides.length;
      showIntroSlide(introCurrent);
    });
  }

  introThumbs.forEach((thumb, i) => {
    thumb.addEventListener("click", () => {
      introCurrent = i;
      showIntroSlide(introCurrent);
    });
  });

  setInterval(() => {
    introCurrent = (introCurrent + 1) % introSlides.length;
    showIntroSlide(introCurrent);
  }, 4000);
}

// === MENU MOBILE (nếu chưa có) ===
function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  if (menu) menu.classList.toggle("active");
}

// ===== SLIDER NHÀ HÀNG =====
let currentRestaurant_res = 0;
const restaurantSlides_res = document.querySelectorAll('.restaurant-slider .restaurant-slide');
const restaurantCounter_res = document.querySelector('.restaurant-slider .controls-small .counter');
const nextBtn_res = document.querySelector('.restaurant-slider .controls-small .next');
const prevBtn_res = document.querySelector('.restaurant-slider .controls-small .prev');
const pauseBtn_res = document.querySelector('.restaurant-slider .controls-small .pause');

let autoPlay_res = true; // trạng thái đang tự chạy
let slideInterval_res;   // lưu interval để dừng

function showRestaurantSlide_res(index) {
  restaurantSlides_res.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  restaurantCounter_res.textContent = `${index + 1} / ${restaurantSlides_res.length}`;
}

function nextSlide_res() {
  currentRestaurant_res = (currentRestaurant_res + 1) % restaurantSlides_res.length;
  showRestaurantSlide_res(currentRestaurant_res);
}

function prevSlide_res() {
  currentRestaurant_res = (currentRestaurant_res - 1 + restaurantSlides_res.length) % restaurantSlides_res.length;
  showRestaurantSlide_res(currentRestaurant_res);
}

function startAutoPlay_res() {
  slideInterval_res = setInterval(nextSlide_res, 6000);
}

function stopAutoPlay_res() {
  clearInterval(slideInterval_res);
}

// Sự kiện click
nextBtn_res.addEventListener('click', nextSlide_res);
prevBtn_res.addEventListener('click', prevSlide_res);

// Nút tạm dừng / phát
pauseBtn_res.addEventListener('click', () => {
  if (autoPlay_res) {
    stopAutoPlay_res();
    pauseBtn_res.innerHTML = '&#9658;'; // ▶
  } else {
    startAutoPlay_res();
    pauseBtn_res.innerHTML = '&#10073;&#10073;'; // ❚❚
  }
  autoPlay_res = !autoPlay_res;
});

// Khởi động
showRestaurantSlide_res(currentRestaurant_res);
startAutoPlay_res();
