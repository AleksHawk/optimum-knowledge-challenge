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
let pool = [];        // the 10 selected questions for this run
let cur = 0, sc = 0, answered = false;
let t0 = 0, elapsed = 0;

const $ = id => document.getElementById(id);
const tierFor = s => TIERS.find(t => s >= t.min && s <= t.max);
const fmtTime = s => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

// ─── SHUFFLE & SELECT 10 (balanced: ~4 easy, ~4 medium, ~2 hard) ───
function shuffle(arr){
  const a = [...arr];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}

function buildPool(){
  const easy   = shuffle(QUESTION_BANK.filter(q=>q.d==="easy"));
  const medium = shuffle(QUESTION_BANK.filter(q=>q.d==="medium"));
  const hard   = shuffle(QUESTION_BANK.filter(q=>q.d==="hard"));
  // pick 4 easy, 4 medium, 2 hard
  let picked = [...easy.slice(0,4), ...medium.slice(0,4), ...hard.slice(0,2)];
  // shuffle order, then also shuffle answer options within each question
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

  // card fade-in
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
  } else {
    btn.classList.add('no');
    document.querySelectorAll('.opt')[Q.a].classList.add('ok');
    fb.className = 'fb bad on';
    fb.innerHTML = `<b>Not quite ✗</b>${Q.e}`;
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

  // generate tweet text in Hawk's style
  $('tweet-text').textContent = buildTweet(sc, tier, elapsed);

  show('s-res');

  document.querySelectorAll('#s-res .ain').forEach((el,i)=>{
    el.style.opacity = '0';
    el.style.animation = 'none';
    requestAnimationFrame(()=>{ el.style.animation = `up .55s ${i*.12}s forwards`; });
  });
  initMagnetic();
}

// ─── TWEET BUILDER (Hawk's voice: lowercase, no hashtags, no em-dashes, ➤ ●) ───
function buildTweet(score, tier, secs){
  const time = fmtTime(secs);
  const variants = {
    "Flexnode Master": [
      `just scored a perfect 10/10 on the optimum knowledge challenge`,
      ``,
      `➤ rank: flexnode master`,
      `➤ time: ${time}`,
      ``,
      `RLNC, mump2p, flexnodes, deRAM. i know the protocol cold.`,
      ``,
      `think you can match it? give it a shot:`
    ],
    "Validator": [
      `${score}/10 on the optimum knowledge challenge. earned validator rank.`,
      ``,
      `➤ time: ${time}`,
      ``,
      `still a couple gaps in my deRAM knowledge but i know how optimum moves data faster than gossipsub.`,
      ``,
      `your turn:`
    ],
    "Node Operator": [
      `ran the optimum knowledge challenge. ${score}/10, node operator rank.`,
      ``,
      `➤ time: ${time}`,
      ``,
      `solid grasp of the basics. RLNC and mump2p make sense now. back to the docs for the deeper stuff.`,
      ``,
      `can you beat me?`
    ],
    "Newcomer": [
      `just took the optimum knowledge challenge. ${score}/10.`,
      ``,
      `clearly need to spend more time in the docs lol. the RLNC tech is wild once it clicks.`,
      ``,
      `see how you do:`
    ]
  };
  return variants[tier.name].join('\n');
}

// ─── COPY TWEET ───
function copyTweet(){
  const txt = $('tweet-text').textContent;
  navigator.clipboard.writeText(txt).then(()=>{
    const btn = $('copy-btn');
    btn.classList.add('done');
    btn.innerHTML = '✓ Copied';
    setTimeout(()=>{ btn.classList.remove('done'); btn.innerHTML = copyBtnDefault; }, 2000);
  });
}
const copyBtnDefault = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M2 8V2.5A1.5 1.5 0 0 1 3.5 1H8" stroke="currentColor" stroke-width="1.2"/></svg> Copy text`;

// ─── RESTART ───
function restart(){ show('s-intro'); }

// ─── CERTIFICATE DOWNLOAD ───
function downloadCert(){
  const nm = ($('cinput').value.trim() || 'Anonymous');
  const tier = tierFor(sc);
  const pct = Math.round(sc/10*100);
  const now = new Date();
  const ds = now.toLocaleDateString('en-US',{month:'long',year:'numeric'});

  $('cn-name').textContent = nm;
  const te = $('cn-tier');
  te.textContent = tier.name.toUpperCase();
  te.style.color = tier.col;
  $('cn-score').textContent = `${sc}/10`;
  $('cn-pct').textContent = `${pct}%`;
  $('cn-time').textContent = fmtTime(elapsed);
  $('cn-sn').textContent = sc;
  $('cn-date').textContent = ds;

  const ld = $('loader'); ld.classList.add('on');
  setTimeout(()=>{
    html2canvas($('cert'),{width:1600,height:900,scale:1,useCORS:true,allowTaint:true,backgroundColor:'#08090c',logging:false})
    .then(cv=>{
      ld.classList.remove('on');
      const a = document.createElement('a');
      a.download = `optimum-cert-${nm.replace(/[^a-z0-9]/gi,'_').toLowerCase()}.png`;
      a.href = cv.toDataURL('image/png');
      a.click();
    }).catch(()=>ld.classList.remove('on'));
  },250);
}

// ═══════════════════════════════════════════════════════
//  VISUAL EFFECTS
// ═══════════════════════════════════════════════════════

// ─── CURSOR ───
(function(){
  if(window.innerWidth < 600) return;
  const dot=$('cur-dot'), ring=$('cur-ring'), glow=$('cur-glow');
  let mx=0,my=0,rx=0,ry=0,gx=0,gy=0;
  document.addEventListener('mousemove',e=>{
    mx=e.clientX; my=e.clientY;
    dot.style.left=mx+'px'; dot.style.top=my+'px';
  });
  (function loop(){
    rx+=(mx-rx)*.14; ry+=(my-ry)*.14;
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    gx+=(mx-gx)*.06; gy+=(my-gy)*.06;
    glow.style.left=gx+'px'; glow.style.top=gy+'px';
    requestAnimationFrame(loop);
  })();
  document.addEventListener('mouseover',e=>{
    document.body.classList.toggle('cur-active', !!e.target.closest('button,a,input,.tp,.opt'));
  });
})();

// ─── MAGNETIC BUTTONS ───
function initMagnetic(){
  if(window.innerWidth < 600) return;
  document.querySelectorAll('.mag').forEach(el=>{
    el.onmousemove = e=>{
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width/2) * .2;
      const dy = (e.clientY - r.top - r.height/2) * .2;
      el.style.transform = `translate(${dx}px,${dy}px)`;
    };
    el.onmouseleave = () => el.style.transform = '';
  });
}

// ─── BACKGROUND CANVAS (soft drifting orbs) ───
(function(){
  const cv=$('bg-canvas'), cx=cv.getContext('2d');
  const rz=()=>{cv.width=innerWidth;cv.height=innerHeight}; rz();
  addEventListener('resize',rz);
  const orbs=[
    {x:.16,y:.2, r:340,c:[184,124,255],vx:.00006,vy:.00004},
    {x:.8, y:.62,r:280,c:[81,177,254], vx:-.00007,vy:.00006},
    {x:.5, y:.9, r:220,c:[100,226,127],vx:.00008,vy:-.00005},
    {x:.92,y:.12,r:180,c:[254,161,88], vx:-.00005,vy:.00007},
  ];
  let t=0;
  (function draw(){
    cx.clearRect(0,0,cv.width,cv.height);
    t++;
    orbs.forEach((o,i)=>{
      o.x+=o.vx; o.y+=o.vy;
      if(o.x<0||o.x>1)o.vx*=-1;
      if(o.y<0||o.y>1)o.vy*=-1;
      const px=o.x*cv.width, py=o.y*cv.height;
      const pulse=1+.06*Math.sin(t*.009+i*2.1);
      const R=o.r*pulse;
      const g=cx.createRadialGradient(px,py,0,px,py,R);
      g.addColorStop(0,`rgba(${o.c},0.09)`);
      g.addColorStop(.5,`rgba(${o.c},0.035)`);
      g.addColorStop(1,`rgba(${o.c},0)`);
      cx.beginPath(); cx.arc(px,py,R,0,Math.PI*2);
      cx.fillStyle=g; cx.fill();
    });
    requestAnimationFrame(draw);
  })();
})();

// ─── INIT ───
initMagnetic();
