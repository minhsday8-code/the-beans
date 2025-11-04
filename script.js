// Hiệu ứng hiện khi cuộn
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.2 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Parallax nhẹ cho hero và ảnh
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const hero = document.querySelector('.hero');
  const heroContent = document.getElementById('hero-content');
  if (heroContent) heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
  hero.style.backgroundPositionY = `${scrollY * 0.4}px`;
});

// Auto theme theo giờ + lưu lựa chọn thủ công
function setTheme(mode) {
  const body = document.body;
  if (mode === 'dark') {
    body.classList.add('theme-dark');
    body.classList.remove('theme-light');
    localStorage.setItem('theme', 'dark');
    document.getElementById('theme-toggle').textContent = '🌙';
  } else {
    body.classList.add('theme-light');
    body.classList.remove('theme-dark');
    localStorage.setItem('theme', 'light');
    document.getElementById('theme-toggle').textContent = '☀️';
  }
}

function autoThemeByTime() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 18) setTheme('light');
  else setTheme('dark');
}

// Kiểm tra lưu trữ
const savedTheme = localStorage.getItem('theme');
if (savedTheme) setTheme(savedTheme);
else autoThemeByTime();

// Nút toggle theme thủ công
document.getElementById('theme-toggle').addEventListener('click', () => {
  const current = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
  setTheme(current === 'dark' ? 'light' : 'dark');
});
