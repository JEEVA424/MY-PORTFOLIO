// ===== Loader =====
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('loaded'), 400);
});

// ===== Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Custom cursor =====
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
window.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px'; dot.style.top = my + 'px';
});
function animateCursor(){
  rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();
document.querySelectorAll('a, button, .magnetic').forEach(el => {
  el.addEventListener('mouseenter', () => ring.style.transform = 'translate(-50%,-50%) scale(1.6)');
  el.addEventListener('mouseleave', () => ring.style.transform = 'translate(-50%,-50%) scale(1)');
});

// ===== Magnetic buttons =====
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  });
  el.addEventListener('mouseleave', () => el.style.transform = '');
});

// ===== Scroll progress + nav bg =====
const progress = document.getElementById('scrollProgress');
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = pct + '%';
  nav.classList.toggle('scrolled', h.scrollTop > 40);
}, { passive: true });

// ===== Mobile nav =====
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');
navToggle.addEventListener('click', () => navMobile.classList.toggle('open'));
navMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMobile.classList.remove('open')));

// ===== Typing effect =====
const roles = ['Full Stack Java Developer','Software Developer','Java Enthusiast','Spring Boot Developer','React Developer','Python Developer','Backend Engineer','Problem Solver','Tech Explorer'];
const typedEl = document.getElementById('typedRole');
let ri = 0, ci = 0, deleting = false;
function typeLoop(){
  const word = roles[ri];
  if (!deleting){
    ci++;
    typedEl.textContent = word.slice(0, ci);
    if (ci === word.length){ deleting = true; setTimeout(typeLoop, 1400); return; }
  } else {
    ci--;
    typedEl.textContent = word.slice(0, ci);
    if (ci === 0){ deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(typeLoop, deleting ? 35 : 65);
}
typeLoop();

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ===== Skill bars fill on scroll =====
const bars = document.querySelectorAll('.bar i');
const barIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){ entry.target.classList.add('filled'); barIO.unobserve(entry.target); }
  });
}, { threshold: 0.4 });
bars.forEach(b => barIO.observe(b));

// ===== Animated counters =====
const counters = document.querySelectorAll('.stat-num');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    let cur = 0;
    const step = Math.max(1, Math.round(target / 60));
    const timer = setInterval(() => {
      cur += step;
      if (cur >= target){ cur = target; clearInterval(timer); }
      el.textContent = cur + suffix;
    }, 24);
    counterIO.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => counterIO.observe(c));

// ===== Particles canvas (hero) =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas(){
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;
}
function initParticles(){
  const count = Math.min(60, Math.floor(canvas.width / 22));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.6 + 0.4,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    o: Math.random() * 0.5 + 0.15
  }));
}
function drawParticles(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(148,163,184,${p.o})`;
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}
resizeCanvas(); initParticles(); drawParticles();
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

// ===== Contact form (static site — friendly confirmation) =====
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  note.textContent = 'Thanks — your message is ready. Please email it to jeeva424435@gmail.com to reach me directly.';
  const name = form.name.value, email = form.email.value, message = form.message.value;
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:jeeva424435@gmail.com?subject=${subject}&body=${body}`;
});
