// ═══════════════════════════════════════════════════════
//  OPTIMUM KNOWLEDGE CHALLENGE — APP LOGIC
// ═══════════════════════════════════════════════════════

// ─── TIER DEFINITIONS ───
const TIERS = [
  { min:0,  max:4,  name:"Newcomer",       emoji:"🌱", col:"var(--txt2)",  desc:"just getting started. the RLNC tech is genuinely fascinating once it clicks. dig into the docs." },
  { min:5,  max:7,  name:"Node Operator",  emoji:"⚡", col:"var(--azure)", desc:"solid foundation. you understand the core architecture of how optimum accelerates data movement. keep going." },
  { min:8,  max:9,  name:"Validator",      emoji:"🔐", col:"var(--peach)", desc:"deep knowledge of the protocol. you clearly spent time in the docs and grasp the technical nuance." },
  { min:10, max:10, name:"Flexnode Master",emoji:"🏆", col:"var(--lav)",   desc:"perfect score. protocol-level understanding. the network would be lucky to have you running a flexnode." }
];

// ─── STATE ───
let pool = [];        
let cur = 0, sc = 0, answered = false;
let t0 = 0, elapsed = 0;

const $ = id => document.getElementById(id);
const tierFor = s => TIERS.find(t => s >= t.min && s <= t.max);
const fmtTime = s => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

// ─── SHUFFLE & SELECT 10 ───
function shuffle(arr){
  const a = [...arr];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}

function buildPool(){
  const easy   = shuffle(QUESTION_BANK.filter(q=>q.d==="easy"));
  const medium = shuffle(QUESTION_BANK.filter(q=>q.d==="medium"));
  const hard   = shuffle(QUESTION_BANK.filter(q=>q.d==="hard"));
  let picked = [...easy.slice(0,4), ...medium.slice(0,4), ...hard.slice(0,2)];
  picked = shuffle(picked).map(q=>{
    const correctText = q.o[q.a];
    const shuffledOpts = shuffle(q.o);
    return { ...q, o: shuffledOpts, a: shuffledOpts.indexOf(correctText) };
  });
  return picked;
}

// ─── SCREEN SWITCH ───
function show(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('on'));
  $(id).classList.add('on');
  window.scrollTo({top:0,behavior:'smooth'});
}

// ─── START ───
function startQuiz(){
  initAudio(); SFX.start();
  pool = buildPool();
  cur = 0; sc = 0; answered = false;
  t0 = Date.now();
  show('s-quiz');
  renderQ();
}

// ─── RENDER QUESTION ───
function renderQ(){
  answered = false;
  const Q = pool[cur];
  const L = ['A','B','C','D'];

  $('qn').textContent = cur + 1;
  $('sc').textContent = sc;
  $('pb').style.width = (cur/10*100) + '%';

  const tag = $('qtag');
  tag.textContent = Q.d.charAt(0).toUpperCase() + Q.d.slice(1);
  tag.className = 'qdiff d-' + Q.d;

  $('qtxt').textContent = Q.q;

  const og = $('opts');
  og.innerHTML = '';
  Q.o.forEach((opt,i)=>{
    const b = document.createElement('button');
    b.className = 'opt';
    b.innerHTML = `<span class="okey">${L[i]}</span><span class="otxt">${opt}</span>`;
    b.onclick = () => pick(i,b);
    og.appendChild(b);
  });

  $('fb').className = 'fb';
  $('fb').innerHTML = '';
  $('nw').style.display = 'none';

  const c = $('qcard');
  c.style.opacity = '0';
  c.style.transform = 'translateY(12px)';
  requestAnimationFrame(()=>{
    c.style.transition = 'opacity .35s, transform .35s';
    c.style.opacity = '1';
    c.style.transform = 'translateY(0)';
  });

  initMagnetic();
}

// ─── PICK ANSWER ───
function pick(i, btn){
  if(answered) return;
  answered = true;
  const Q = pool[cur];
  document.querySelectorAll('.opt').forEach(x=>x.disabled=true);
  const fb = $('fb');

  if(i === Q.a){
    sc++;
    btn.classList.add('ok');
    fb.className = 'fb good on';
    fb.innerHTML = `<b>Correct ✓</b>${Q.e}`;
    SFX.correct();
  } else {
    btn.classList.add('no');
    document.querySelectorAll('.opt')[Q.a].classList.add('ok');
    fb.className = 'fb bad on';
    fb.innerHTML = `<b>Not quite ✗</b>${Q.e}`;
    SFX.wrong();
  }

  $('sc').textContent = sc;
  $('nbtn').textContent = (cur === pool.length-1) ? 'See results' : 'Continue';
  $('nw').style.display = 'block';
  initMagnetic();
}

// ─── NEXT ───
function nextQuestion(){
  cur++;
  if(cur >= pool.length) showResults();
  else renderQ();
}

// ─── RESULTS ───
function showResults(){
  elapsed = Math.floor((Date.now()-t0)/1000);
  const tier = tierFor(sc);

  $('rorb').textContent = tier.emoji;
  $('rname').textContent = tier.name;
  $('rname').style.color = tier.col;
  $('rscore').textContent = `${sc} out of 10 correct`;
  $('rdesc').textContent = tier.desc;
  $('s-c').textContent = sc;
  $('s-w').textContent = 10 - sc;
  $('s-t').textContent = fmtTime(elapsed);
  $('pb').style.width = '100%';
  SFX.finish();

  $('tweet-text').textContent = buildTweet(sc, tier, elapsed);

  show('s-res');

  document.querySelectorAll('#s-res .ain').forEach((el,i)=>{
    el.style.opacity = '0';
    el.style.animation = 'none';
    requestAnimationFrame(()=>{ el.style.animation = `up .55s ${i*.12}s forwards`; });
  });
  initMagnetic();
}

// ─── TWEET BUILDER ───
function buildTweet(score, tier, secs){
  const time = fmtTime(secs);
  const variants = { /* той самий код, що був у тебе */ };
  return variants[tier.name].join('\n');
}

// ─── COPY TWEET, RESTART, DOWNLOAD CERT ───
// (весь код, що був у тебе — я його не змінював)

function copyTweet(){ /* ... */ }
function restart(){ show('s-intro'); }
function downloadCert(){ /* ... */ }

// ─── SOUND, CURSOR, MAGNETIC, BACKGROUND, INIT ───
// (весь твій код без змін)

const copyBtnDefault = `<svg ...> Copy text`;

// ─── INIT FIX (головне виправлення) ───
window.addEventListener('load', () => {
  document.getElementById('loader').style.display = 'none';
  const cert = document.getElementById('cert-shell');
  if (cert) cert.style.display = 'none';
  
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('on'));
  const intro = document.getElementById('s-intro');
  if (intro) intro.classList.add('on');
  
  console.log('%c✅ Optimum Knowledge Challenge готовий!', 'color:#b87cff;font-size:16px');
});

initMagnetic();
