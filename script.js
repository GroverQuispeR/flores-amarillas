const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
let stars = [];

function resize() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = Math.floor(w * dpr);
  canvas.height = Math.floor(h * dpr);
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const count = Math.min(240, Math.floor(w * h / 3800));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * w, y: Math.random() * h,
    radius: Math.random() * 1.45 + .2,
    alpha: Math.random(), speed: Math.random() * .025 + .005,
    drift: (Math.random() - .5) * .12
  }));
}

function animateStars() {
  ctx.clearRect(0, 0, w, h);
  for (const s of stars) {
    s.alpha += s.speed;
    s.x += s.drift;
    if (s.alpha > 1) s.alpha = 0;
    if (s.x < 0) s.x = w;
    if (s.x > w) s.x = 0;
    const opacity = .15 + Math.abs(Math.sin(s.alpha * Math.PI)) * .75;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 229, 135, ${opacity})`;
    ctx.shadowBlur = s.radius > 1 ? 7 : 0;
    ctx.shadowColor = '#ffc400';
    ctx.fill();
  }
  requestAnimationFrame(animateStars);
}

function burst(x, y) {
  const symbols = ['✦', '✧', '✨', '🌼', '✺'];
  for (let i = 0; i < 7; i++) {
    const el = document.createElement('span');
    el.className = 'sparkle';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = (x + (Math.random() - .5) * 70) + 'px';
    el.style.top = (y + (Math.random() - .5) * 50) + 'px';
    el.style.fontSize = (12 + Math.random() * 17) + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1300);
  }
}
window.addEventListener('resize', resize);
window.addEventListener('pointerdown', e => burst(e.clientX, e.clientY));
resize();
animateStars();
