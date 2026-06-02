// ─── QUESTIONS (40 шт) ───
const QUESTIONS = [
  // EASY
  {d:"easy",q:"What does RLNC stand for?",o:["Random Latency Network Coding","Random Linear Network Coding","Recursive Layer Network Consensus","Rapid Linear Node Communication"],a:1,e:"RLNC — Random Linear Network Coding — is Optimum's core data encoding technique from MIT. It eliminates redundancy and improves loss tolerance."},
  {d:"easy",q:"What is Optimum's primary role in the blockchain ecosystem?",o:["A new Layer 1 consensus mechanism","An Ethereum L2 rollup","A Universal Data Acceleration Network","A decentralized exchange"],a:2,e:"Optimum is the Universal Data Acceleration Network. It speeds up data movement between nodes without changing consensus."},
  {d:"easy",q:"Compared to gossipsub, Optimum achieves approximately how much bandwidth reduction?",o:["20–30%","50–60%","90–95%","99%+"],a:2,e:"~90–95% bandwidth reduction vs gossipsub by eliminating redundant transmission via RLNC-coded frames."},
  {d:"easy",q:"Which institution's research is the scientific foundation of Optimum?",o:["Stanford","ETH Zurich","MIT","Carnegie Mellon"],a:2,e:"Built on award-winning MIT research. Prof. Muriel Médard from MIT EECS is co-inventor of RLNC and Optimum's CEO."},
  {d:"easy",q:"Who is the co-inventor of RLNC and a key figure behind Optimum?",o:["Vitalik Buterin","Prof. Muriel Médard","Satoshi Nakamoto","Anatoly Yakovenko"],a:1,e:"Prof. Muriel Médard, NEC Chair at MIT EECS, ranked #1 globally in Network Coding, co-invented RLNC and is Optimum's CEO."},
  {d:"easy",q:"What is mump2p?",o:["A multi-user messaging protocol","Optimum's RLNC-accelerated gossipsub-compatible pub/sub","A memory pooling mechanism","A node uptime monitor"],a:1,e:"mump2p is Optimum's first production product — RLNC-accelerated pub/sub, fully libp2p/gossipsub compatible."},
  {d:"easy",q:"Does Optimum require consensus rule changes to integrate?",o:["Yes, hard fork required","No — works at propagation layer, zero consensus changes","Only with validator vote","Only for PoW chains"],a:1,e:"Chain-agnostic by design, zero consensus modifications. Complements the existing stack."},
  {d:"easy",q:"Optimum is designed to be:",o:["Compatible only with Ethereum","Compatible only with Solana","Chain-agnostic, works with any blockchain","Bitcoin only"],a:2,e:"Chain-agnostic — integrates with any blockchain without requiring protocol rewrites."},
  {d:"easy",q:"What does Optimum primarily optimize?",o:["Smart contract execution","Data movement and propagation between nodes","Token fees","Wallet UX"],a:1,e:"Data movement sets the ceiling. Optimum optimizes how data propagates across the network."},
  {d:"easy",q:"mump2p is compatible with which existing P2P stack?",o:["BitTorrent","libp2p / gossipsub","IPFS only","Fully proprietary"],a:1,e:"mump2p is libp2p/gossipsub-compatible, slots into existing infrastructure with no changes."},
  {d:"easy",q:"What is the 'ceiling' that Optimum claims to raise?",o:["Gas fees","Token price","Data movement performance","Validator count"],a:2,e:"\"Data movement sets the ceiling. Optimum raises it.\" — the core tagline."},
  {d:"easy",q:"What problem does most blockchain networking waste resources on?",o:["Mining difficulty","Redundant data transmission","Token swaps","Wallet signatures"],a:1,e:"Most networks burn bandwidth on redundant transmission. Optimum transmits less, delivers more."},
  {d:"easy",q:"What kind of network does Optimum operate as?",o:["Closed permissioned consortium","Permissionless network anyone can run nodes on","Single centralized server","Private validator club"],a:1,e:"Permissionless network of flexnodes that anyone can operate alongside existing clients."},
  {d:"easy",q:"Faster block and blob delivery with Optimum primarily benefits:",o:["NFT artists","Validators (fewer missed slots, better MEV)","CEX traders","Stablecoin issuers"],a:1,e:"More successful attestations, better MEV capture, fewer missed proposals — measurable revenue for validators."},
  {d:"easy",q:"Optimum works alongside scaling solutions by:",o:["Replacing all execution layers","Complementing execution while improving network performance","Forcing chain mergers","Removing validators"],a:1,e:"Complementary to scaling — works alongside execution without touching protocol rules."},
  // MEDIUM
  {d:"medium",q:"What is a 'flexnode' in the Optimum network?",o:["Validator with MEV boost","Operator-run node that encodes/decodes RLNC-coded gossip frames","Smart contract on Ethereum","Governance token holder"],a:1,e:"Flexnodes encode/decode RLNC frames, maintain coded buffers, and serve DeRAM/DeROM requests."},
  {d:"medium",q:"Optimum's DeRAM stands for:",o:["Decentralized Relay and Messaging","Distributed RAM for smart contracts","Decentralized Random Access Memory","Dynamic Resource Allocation Module"],a:2,e:"DeRAM — Decentralized Random Access Memory — shared-state memory layer with low-latency read-write semantics."},
  {d:"medium",q:"How much faster can Optimum deliver blocks and blobs vs gossipsub?",o:["2–3x","6–20x","50x","About the same"],a:1,e:"6–20x faster block and blob delivery vs gossipsub."},
  {d:"medium",q:"What is the relationship between DeRAM and DeROM?",o:["Competing protocols","DeRAM is read-write; DeROM is read-only/append-oriented","DeROM replaces DeRAM","They are the same"],a:1,e:"DeRAM = read-write shared-state. DeROM = read-only/append, optimized for broadcast and caching."},
  {d:"medium",q:"What does a flexnode maintain to recover loss and smooth tail latency?",o:["A mempool","Bounded coded buffers","Full archive of chain history","List of validators"],a:1,e:"Flexnodes maintain bounded coded buffers to recover loss and smooth tail latency."},
  {d:"medium",q:"Why does RLNC improve loss tolerance?",o:["Retransmits every packet twice","Coded fragments allow reconstruction from any sufficient subset","Faster connection","Zip compression"],a:1,e:"RLNC encodes data so any sufficient set of coded fragments reconstructs the original — no specific packets needed."},
  {d:"medium",q:"Which product should builders adopt NOW for measurable latency gains?",o:["DeROM","DeRAM","mump2p","Native token"],a:2,e:"Adopt mump2p now; DeRAM and DeROM unlock low-latency reads/writes next."},
  {d:"medium",q:"What types of data does mump2p propagate?",o:["NFT metadata only","Blocks, blobs, and transactions","Validator signatures only","Smart contract bytecode"],a:1,e:"mump2p provides fast, resilient propagation of blocks, blobs, and transactions."},
  {d:"medium",q:"DeROM is optimized for:",o:["High-frequency trading","Broadcast and caching (read-only/append)","Private key storage","Token bridging"],a:1,e:"DeROM — Decentralized Read-Only Memory — read-only/append-oriented, optimized for broadcast and caching."},
  {d:"medium",q:"What makes Optimum integration 'zero-setup' for operators?",o:["Requires special hardware","No infrastructure changes, no extra hardware, no consensus mods","Needs 6-month migration","Requires client rewrite"],a:1,e:"Permissionless, zero-setup — no infrastructure changes, no extra hardware, no consensus modifications."},
  {d:"medium",q:"How do flexnodes interact with existing clients?",o:["Replace all clients","Interoperate with existing clients and libp2p/gossipsub","Require clients to shut down","Work in isolation only"],a:1,e:"Flexnodes interoperate with existing clients and libp2p/gossipsub where applicable."},
  {d:"medium",q:"For validators, faster propagation primarily reduces risk of:",o:["Wallet hacks","Missed slots / missed proposals","Token inflation","Smart contract bugs"],a:1,e:"Lower latency → lower missed-slot risk → APY/MEV uplift for validators."},
  {d:"medium",q:"Under standard RLNC models, the dissemination strategy is:",o:["Experimental","Provably optimal for throughput/latency under loss and contention","Slower but more secure","Testnet-only"],a:1,e:"Under standard RLNC models, strategy is provably optimal for throughput/latency under loss and contention."},
  {d:"medium",q:"Optimum's approach to the memory layer:",o:["Ignores memory","Optimizes memory layer for accelerated data propagation and real-time access","Stores data on-chain only","Deletes old memory"],a:1,e:"Optimum's RLNC-based memory layer optimization accelerates data propagation and improves real-time access."},
  {d:"medium",q:"mump2p accelerates:",o:["Token minting","Low-latency gossip across geographically distributed nodes","Database backups","Front-end rendering"],a:1,e:"Optimum accelerates low-latency gossip across geographically distributed nodes, reducing congestion."},
  // HARD
  {d:"hard",q:"Which user type does NOT directly benefit from Optimum per its docs?",o:["L1/L2 teams needing faster blob propagation","Validators seeking lower missed-slot risk","dApp developers wanting faster tx inclusion","Fiat currency traders on CEXes"],a:3,e:"Documented users: L1/L2 teams, validators, node operators, builders, dApp devs. CEX traders are outside scope."},
  {d:"hard",q:"Optimum is described in its docs as the fastest decentralized internet protocol for:",o:["Gaming","Web3","Video streaming","Email"],a:1,e:"\"Optimum is the fastest decentralized internet protocol for web3.\""},
  {d:"hard",q:"Which testnet/partner metric does Optimum highlight?",o:["1 million TPS","40+ testnet partners and counting","500 validators max","10-second block times"],a:1,e:"Optimum highlights 40+ testnet partners & counting, and $24b ETH stake connected."},
  {d:"hard",q:"What is 'DeROM' short for?",o:["Decentralized Routing Module","Decentralized Read-Only Memory","Distributed Relay Output Mesh","Dynamic Read Operation Manager"],a:1,e:"DeROM — Decentralized Read-Only Memory — read-only/append memory for broadcast and caching."},
  {d:"hard",q:"In RLNC, what must a node collect to decode the original data?",o:["Exact original packets in order","Enough linearly independent coded fragments","A password from sender","Full blockchain history"],a:1,e:"A node needs enough linearly independent coded fragments to reconstruct original data — not specific packets."},
  {d:"hard",q:"Optimum's DeRAM exposes what kind of semantics across nodes?",o:["Write-once read-never","Low-latency shared-state read-write semantics","Encrypted-only storage","Single-node local cache"],a:1,e:"DeRAM exposes low-latency shared-state read-write semantics across nodes."},
  {d:"hard",q:"What does Optimum claim about MEV for validators?",o:["Eliminates MEV entirely","Faster propagation can improve MEV capture potential","Bans MEV","MEV is irrelevant"],a:1,e:"Faster inclusion and improved MEV capture potential — a meaningful upgrade for validator operations."},
  {d:"hard",q:"Why is reducing redundant transmission important under network load?",o:["Makes tokens cheaper","Redundant transmission wastes bandwidth and slows propagation under load","Increases mining rewards","No real effect"],a:1,e:"Most networks rely on redundant transmission that wastes bandwidth and slows propagation under load."},
  {d:"hard",q:"What is the broad category Optimum positions itself in?",o:["A meme coin","High-performance memory/data infrastructure for any blockchain","A centralized cloud provider","A hardware wallet"],a:1,e:"\"The world's first high-performance memory infrastructure for any blockchain.\""},
  {d:"hard",q:"What technique does Optimum apply to gossip to reduce redundancy?",o:["Sharding","Random Linear Network Coding (RLNC)","Merkle proofs","Zero-knowledge rollups"],a:1,e:"By applying RLNC to gossip, Optimum reduces redundancy and improves loss tolerance."},
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

// ─── BUILD POOL: 4 easy + 4 medium + 2 hard, shuffled answers ───
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

  // entrance animation
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
    "Flexnode Master":[`just scored 10/10 on the optimum knowledge challenge`,``,`➤ rank: flexnode master`,`➤ time: ${fmtTime(elapsed)}`,``,`RLNC. mump2p. flexnodes. deRAM. know the protocol cold.`,``,`think you can match it?`],
    "Validator":[`${score}/10 on the optimum knowledge challenge. earned validator rank.`,``,`➤ time: ${fmtTime(elapsed)}`,``,`solid grasp on how optimum moves data faster than gossipsub. still gaps on the deeper stuff.`,``,`your turn:`],
    "Node Operator":[`ran the optimum knowledge challenge. ${score}/10, node operator rank.`,``,`➤ time: ${fmtTime(elapsed)}`,``,`RLNC and mump2p make sense now. back to the docs for the rest.`,``,`can you beat me?`],
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
