// ===== 모바일 메뉴 토글 =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// 네비게이션 링크 클릭 시 모바일 메뉴 닫기
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileMenuBtn.textContent = '☰';
  });
});

// ===== 스크롤 시 네비게이션 스타일 변경 =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== 숫자 카운트업 애니메이션 =====
function animateCountUp() {
  const statNumbers = document.querySelectorAll('.stat-number');

  statNumbers.forEach(el => {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  });
}

// IntersectionObserver로 히어로 통계가 보일 때 카운트업 시작
const statsSection = document.querySelector('.hero-stats');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      animateCountUp();
    }
  });
}, { threshold: 0.5 });

if (statsSection) {
  statsObserver.observe(statsSection);
}

// ===== 스크롤 페이드인 애니메이션 =====
const fadeElements = document.querySelectorAll(
  '.feature-card, .curriculum-item, .review-card, .faq-item'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeElements.forEach(el => fadeObserver.observe(el));

// ===== FAQ 아코디언 =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isActive = item.classList.contains('active');

    // 다른 모든 FAQ 닫기
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

    // 클릭한 항목 토글
    if (!isActive) {
      item.classList.add('active');
    }
  });
});
