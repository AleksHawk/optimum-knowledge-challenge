// ═══════════════════════════════════════════════════════
//  OPTIMUM KNOWLEDGE CHALLENGE — APP LOGIC (HARDCORE MODE)
// ═══════════════════════════════════════════════════════

const TIERS = [
  { min:0,  max:4,  name:"Newcomer",       emoji:"🌱", col:"var(--txt2)",  desc:"just getting started. the RLNC tech is genuinely fascinating once it clicks. dig into the docs." },
  { min:5,  max:7,  name:"Node Operator",  emoji:"⚡", col:"var(--azure)", desc:"solid foundation. you understand the core architecture of how optimum accelerates data movement. keep going." },
  { min:8,  max:9,  name:"Validator",      emoji:"🔐", col:"var(--peach)", desc:"deep knowledge of the protocol. you clearly spent time in the docs and grasp the technical nuance." },
  { min:10, max:10, name:"Flexnode Master",emoji:"🏆", col:"var(--lav)",   desc:"perfect score. protocol-level understanding. the network would be lucky to have you running a flexnode." }
];

let pool = [];        
let cur = 0, sc = 0, answered = false;
let t0 = 0, elapsed = 0;
let qTimer, timeLeft = 15;

const $ = id => document.getElementById(id);
const tierFor = s => TIERS.find(t => s >= t.min && s <= t.max);
const fmtTime = s => `${Math.floor(s/60)}:${(s%60).toString().padStart(2, '0')}`;

function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('on'));
  const el = $(id);
  if (el) el.classList.add('on');
}

// ─── QUIZ LOGIC & TIMER ───
function startQuiz() {
  if (typeof QUESTION_BANK === 'undefined' || QUESTION_BANK.length === 0) {
    console.error("Помилка: QUESTION_BANK не знайдено. Перевір файл questions.js");
    return;
  }
  pool = [...QUESTION_BANK].sort(() => 0.5 - Math.random()).slice(0, 10);
  cur = 0; sc = 0; elapsed = 0;
  t0 = Date.now();
  show('s-quiz');
  showQ();
}

function showQ() {
  answered = false;
  timeLeft = 15;
  const q = pool[cur];
  
  if ($('q-num')) $('q-num').textContent = `Question ${cur + 1} / 10`;
  if ($('q-text')) $('q-text').textContent = q.q;
  
  const opts = $('q-opts');
  if (opts) {
    opts.innerHTML = '';
    q.o.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'opt';
      btn.textContent = opt;
      btn.onclick = () => answer(i, btn);
      opts.appendChild(btn);
    });
  }

  // Запуск таймера
  if ($('q-timer')) $('q-timer').textContent = `⏳ ${timeLeft}s`;
  clearInterval(qTimer);
  qTimer = setInterval(() => {
    timeLeft--;
    if ($('q-timer')) $('q-timer').textContent = `⏳ ${timeLeft}s`;
    
    if (timeLeft <= 0) {
      clearInterval(qTimer);
      if (!answered) answer(-1, null); // -1 означає час вийшов
    }
  }, 1000);
}

function answer(idx, btnEl) {
  if (answered) return;
  answered = true;
  clearInterval(qTimer);

  const q = pool[cur];
  const isCorrect = (idx === q.a);
  if (isCorrect) sc++;

  // Візуалізація відповіді
  if (btnEl) {
    btnEl.style.backgroundColor = isCorrect ? '#00FF00' : '#FF0000';
    btnEl.style.color = '#000';
  }

  setTimeout(() => {
    cur++;
    if (cur >= pool.length) endQuiz();
    else showQ();
  }, 1200);
}

function endQuiz() {
  elapsed = Math.floor((Date.now() - t0) / 1000);
  const tier = tierFor(sc);
  
  if ($('s-res')) {
    if ($('s-score')) $('s-score').textContent = sc;
    if ($('s-tier-name')) $('s-tier-name').textContent = tier.name;
    if ($('s-t')) $('s-t').textContent = fmtTime(elapsed);
    show('s-res');
  }
}

function restart() {
  show('s-intro');
}

// ─── TWEET BUILDER ───
function buildTweet(score, tier, secs) {
  return `I just scored ${score}/10 on the Optimum Knowledge Challenge! 🚀\nRank: ${tier.name}\nTime: ${fmtTime(secs)}\n\nTest your knowledge: https://optimum-knowledge-challenge.vercel.app/`;
}

// ─── FALLBACK FUNCTIONS (To prevent crashes) ───
function initMagnetic() {
  // Тут була твоя логіка магнітного курсора. 
  // Залишаю пусту функцію, щоб код не крашився, якщо вона викликається.
}

// ─── BACKGROUND CANVAS (soft drifting orbs) ───
(function(){
  const cv = document.getElementById('bg-canvas');
  if (!cv) return;
  const cx = cv.getContext('2d');
  const rz = () => { cv.width = innerWidth; cv.height = innerHeight; }; 
  rz();
  addEventListener('resize', rz);
  const orbs = [
    {x:.16, y:.2,  r:340, c:[170,0,255], vx:.00006,  vy:.00004}, // #AA00FF accent
    {x:.8,  y:.62, r:280, c:[81,177,254],  vx:-.00007, vy:.00006},
    {x:.5,  y:.9,  r:220, c:[100,226,127], vx:.00008,  vy:-.00005},
    {x:.92, y:.12, r:180, c:[254,161,88],  vx:-.00005, vy:.00007},
  ];
  let t = 0;
  (function draw(){
    cx.clearRect(0,0,cv.width,cv.height);
    t++;
    orbs.forEach((o,i)=>{
      o.x += o.vx; o.y += o.vy;
      if(o.x<0 || o.x>1) o.vx *= -1;
      if(o.y<0 || o.y>1) o.vy *= -1;
      cx.beginPath();
      cx.arc(o.x*cv.width, o.y*cv.height, o.r, 0, Math.PI*2);
      cx.fillStyle = `rgba(${o.c[0]},${o.c[1]},${o.c[2]},0.15)`;
      cx.fill();
    });
    requestAnimationFrame(draw);
  })();
})();

// ─── INIT ───
window.addEventListener('load', () => {
  if ($('loader')) $('loader').style.display = 'none';
  if ($('cert-shell')) $('cert-shell').style.display = 'none';

  show('s-intro');
  console.log('%c✅ Optimum Knowledge Challenge готовий!', 'color:#AA00FF;font-size:16px');
  initMagnetic();
  
  // Додаємо обробник для кнопки старту
  const startBtn = document.querySelector('.btn-start');
  if (startBtn) startBtn.addEventListener('click', startQuiz);
});
