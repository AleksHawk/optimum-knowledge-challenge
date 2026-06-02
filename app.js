// ─── QUESTIONS (40 шт) ───
const QUESTIONS = [
  // EASY
  {d:"easy",q:"What does RLNC stand for?",o:["Random Latency Network Coding","Random Linear Network Coding","Recursive Layer Network Consensus","Rapid Linear Node Communication"],a:1,e:"RLNC — Random Linear Network Coding. The math behind Optimum's efficiency."},
  {d:"easy",q:"What is Optimum's primary role?",o:["Layer 1 consensus","L2 rollup","Universal Data Acceleration Network","DEX"],a:2,e:"Universal Data Acceleration Network for faster data movement."},
];

// ─── TIERS ───
const TIERS = [
  {min:0,  max:4,  name:"Newcomer",       emoji:"🌱", col:"#9aa1b2", desc:"just getting started. the RLNC tech is fascinating once it clicks — dig into the docs."},
  {min:5,  max:7,  name:"Node Operator",  emoji:"⚡", col:"#51b1fe", desc:"solid foundation. you understand the core architecture of optimum. keep going."},
  {min:8,  max:9,  name:"Validator",      emoji:"🔐", col:"#fea158", desc:"deep knowledge of the protocol. you clearly spent time in the docs."},
  {min:10, max:10, name:"Flexnode Master",emoji:"🏆", col:"#b87cff", desc:"perfect score. protocol-level understanding. the network would be lucky to have you running a flexnode."},
];

// ─── HELPERS ───
const $ = id => document.getElementById(id);
const tierFor = s => TIERS.find(t => s >= t.min && s <= t.max);
const fmtTime = s => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

function shuffle(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}

// ─── STATE ───
let pool=[], cur=0, sc=0, answered=false, t0=0, elapsed=0;

// ─── BUILD POOL ───
function buildPool(){
  const easy=shuffle(QUESTIONS.filter(q=>q.d==="easy")).slice(0,4);
  const med =shuffle(QUESTIONS.filter(q=>q.d==="medium")).slice(0,4);
  const hard=shuffle(QUESTIONS.filter(q=>q.d==="hard")).slice(0,2);
  return shuffle([...easy,...med,...hard]).map(q=>{
    const correct=q.o[q.a];
    const opts=shuffle(q.o);
    return {...q, o:opts, a:opts.indexOf(correct)};
  });
}

// ─── SCREENS ───
function show(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('on'));
  $(id).classList.add('on');
  window.scrollTo({top:0,behavior:'smooth'});
}

// ─── START ───
function startQuiz(){
  pool=buildPool(); cur=0; sc=0; answered=false; t0=Date.now();
  show('s-quiz');
  renderQ();
}

// ─── RENDER QUESTION ───
function renderQ(){
  answered=false;
  const Q=pool[cur];
  const L=['A','B','C','D'];

  $('qnum').textContent=cur+1;
  $('qlive').textContent=sc;
  $('qprog').style.width=(cur/10*100)+'%';

  const tag=$('qdiff');
  tag.textContent=Q.d.charAt(0).toUpperCase()+Q.d.slice(1);
  tag.className='tag tag-'+Q.d;
  $('qtext').textContent=Q.q;

  const og=$('opts');
  og.innerHTML='';
  Q.o.forEach((o,i)=>{
    const b=document.createElement('button');
    b.className='opt';
    b.innerHTML=`<span class="okey">${L[i]}</span><span class="otxt">${o}</span>`;
    b.onclick=()=>pick(i,b);
    og.appendChild(b);
  });

  $('feedback').className='fb';
  $('feedback').innerHTML='';
  $('nextwrap').style.display='none';

  const card=$('qcard');
  card.style.opacity='0';
  card.style.transform='translateY(16px)';
  requestAnimationFrame(()=>{
    card.style.transition='opacity .4s ease, transform .4s ease';
    card.style.opacity='1';
    card.style.transform='translateY(0)';
  });
}

// ─── PICK ANSWER ───
function pick(i,btn){
  if(answered)return;
  answered=true;
  const Q=pool[cur];
  document.querySelectorAll('.opt').forEach(x=>x.disabled=true);
  const fb=$('feedback');
  if(i===Q.a){
    sc++;
    btn.classList.add('ok');
    fb.className='fb fb-ok';
    fb.innerHTML=`<b>Correct ✓</b>${Q.e}`;
  } else {
    btn.classList.add('no');
    document.querySelectorAll('.opt')[Q.a].classList.add('ok');
    fb.className='fb fb-no';
    fb.innerHTML=`<b>Not quite ✗</b>${Q.e}`;
  }
  $('qlive').textContent=sc;
  $('nextwrap').style.display='block';
  $('nextbtn').textContent=cur===pool.length-1?'See results →':'Continue →';
}

function nextQuestion(){
  cur++;
  if(cur>=pool.length) showResults();
  else renderQ();
}

// ─── RESULTS ───
function showResults(){
  elapsed=Math.floor((Date.now()-t0)/1000);
  const tier=tierFor(sc);
  $('qprog').style.width='100%';

  $('rorb').textContent=tier.emoji;
  $('rname').textContent=tier.name;
  $('rname').style.color=tier.col;
  $('rdesc').textContent=tier.desc;
  $('rscore').textContent=sc+' out of 10 correct';
  $('r-correct').textContent=sc;
  $('r-wrong').textContent=10-sc;
  $('r-time').textContent=fmtTime(elapsed);

  $('tweet-text').textContent=buildTweet(sc,tier);
  show('s-res');
}

function restart(){ show('s-intro'); }

// ─── TWEET ───
function buildTweet(score,tier){
  const v={
    "Flexnode Master":[`just scored 10/10 on the optimum knowledge challenge`,``,`➤ rank: flexnode master`,`➤ time: ${fmtTime(elapsed)}`,``,`RLNC. mump2p. flexnodes. deRAM. know the protocol.`,``,`how well do you know optimum?`],
    "Validator":[`${score}/10 on the optimum knowledge challenge. earned validator rank.`,``,`➤ time: ${fmtTime(elapsed)}`,``,`solid grasp on how optimum moves data faster than gossipsub.`,``,`test yourself:`],
    "Node Operator":[`ran the optimum knowledge challenge. ${score}/10, node operator rank.`,``,`➤ time: ${fmtTime(elapsed)}`,``,`RLNC and mump2p make sense now. back to the docs for the rest.`,``,`how well do you know optimum?`],
    "Newcomer":[`just took the optimum knowledge challenge. ${score}/10.`,``,`clearly need more time in the docs lol. the RLNC tech is wild once it clicks.`,``,`see how you do:`],
  };
  return v[tier.name].join('\n');
}

function copyTweet(){
  navigator.clipboard.writeText($('tweet-text').textContent).then(()=>{
    const b=$('copybtn');
    const orig=b.innerHTML;
    b.textContent='Copied ✓';
    b.style.background='#64e27f';b.style.color='#0a0a0c';
    setTimeout(()=>{b.innerHTML=orig;b.style.background='';b.style.color='';},2200);
  });
}

function shareOnX(){
  const url='https://twitter.com/intent/tweet?text='+encodeURIComponent($('tweet-text').textContent);
  window.open(url,'_blank','width=600,height=500');
}

// ─── CERTIFICATE ───
function downloadCert(){
  const name=$('certname').value.trim()||'Anonymous';
  const tier=tierFor(sc);
  const pct=Math.round(sc/10*100);
  const ds=new Date().toLocaleDateString('en-US',{month:'long',year:'numeric'});

  $('cn-name').textContent=name;
  $('cn-tier').textContent=tier.name.toUpperCase();
  $('cn-tier').style.color=tier.col;
  $('cn-score').textContent=sc+'/10';
  $('cn-pct').textContent=pct+'%';
  $('cn-time').textContent=fmtTime(elapsed);
  $('cn-sn').textContent=sc;
  $('cn-date').textContent=ds;

  $('loader').style.display='flex';
  setTimeout(()=>{
    html2canvas($('cert'),{width:1600,height:900,scale:1,useCORS:true,allowTaint:true,backgroundColor:'#0a0a0c',logging:false})
    .then(cv=>{
      $('loader').style.display='none';
      const a=document.createElement('a');
      a.download='optimum-cert-'+name.replace(/[^a-z0-9]/gi,'_').toLowerCase()+'.png';
      a.href=cv.toDataURL('image/png');
      a.click();
    }).catch(()=>$('loader').style.display='none');
  },200);
}

// ─── BACKGROUND ANIMATION ───
(function(){
  const cv=document.getElementById('bgc');
  if(!cv)return;
  const cx=cv.getContext('2d');
  function rz(){cv.width=innerWidth;cv.height=innerHeight;}
  rz(); addEventListener('resize',rz);
  const orbs=[
    {x:.15,y:.2,r:340,c:[184,124,255],vx:.00007,vy:.00005},
    {x:.8, y:.65,r:260,c:[81,177,254], vx:-.00008,vy:.00006},
    {x:.5, y:.9, r:200,c:[100,226,127],vx:.00009,vy:-.00005},
  ];
  let t=0;
  (function draw(){
    cx.clearRect(0,0,cv.width,cv.height);t++;
    orbs.forEach((o,i)=>{
      o.x+=o.vx;o.y+=o.vy;
      if(o.x<0||o.x>1)o.vx*=-1;
      if(o.y<0||o.y>1)o.vy*=-1;
      const px=o.x*cv.width,py=o.y*cv.height;
      const R=o.r*(1+.06*Math.sin(t*.009+i*2));
      const g=cx.createRadialGradient(px,py,0,px,py,R);
      g.addColorStop(0,`rgba(${o.c},0.09)`);
      g.addColorStop(.5,`rgba(${o.c},0.03)`);
      g.addColorStop(1,`rgba(${o.c},0)`);
      cx.beginPath();cx.arc(px,py,R,0,Math.PI*2);
      cx.fillStyle=g;cx.fill();
    });
    requestAnimationFrame(draw);
  })();
})();

// ─── CURSOR ───
(function(){
  if(innerWidth<600)return;
  const dot=document.getElementById('cur-dot');
  const ring=document.getElementById('cur-ring');
  if(!dot||!ring)return;
  let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
  document.addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;
    dot.style.transform=`translate(${mx}px,${my}px)translate(-50%,-50%)`;
  },{passive:true});
  (function loop(){
    rx+=(mx-rx)*.18;ry+=(my-ry)*.18;
    ring.style.transform=`translate(${rx}px,${ry}px)translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();
  document.addEventListener('mouseover',e=>{
    const hot=!!e.target.closest('button,a,input,.opt,.tp');
    dot.style.width=hot?'10px':'5px';
    dot.style.height=hot?'10px':'5px';
    ring.style.width=hot?'48px':'30px';
    ring.style.height=hot?'48px':'30px';
    ring.style.borderColor=hot?'rgba(184,124,255,.9)':'rgba(184,124,255,.45)';
  },{passive:true});
})();
