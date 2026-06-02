// ═══════════════════════════════════════════════════════════════
//  OPTIMUM KNOWLEDGE CHALLENGE — QUESTION BANK (40 questions)
//  Each quiz pulls 10 random questions from this bank.
//  Fields:  q = question | o = options | a = correct index (0-based)
//           d = difficulty (easy|medium|hard) | e = explanation
// ═══════════════════════════════════════════════════════════════

const QUESTION_BANK = [

  // ───────────── CORE / GENERAL (easy) ─────────────
  {
    q: "What is Optimum?",
    o: ["A Layer 1 blockchain", "A Universal Data Acceleration Network", "An Ethereum L2 rollup", "A decentralized exchange"],
    a: 1, d: "easy",
    e: "Optimum is the Universal Data Acceleration Network. It makes blockchains faster and more bandwidth-efficient by optimizing how data moves across the network."
  },
  {
    q: "What does RLNC stand for?",
    o: ["Random Latency Network Coding", "Random Linear Network Coding", "Recursive Layer Network Consensus", "Rapid Linear Node Communication"],
    a: 1, d: "easy",
    e: "RLNC — Random Linear Network Coding — is the core encoding technique behind Optimum. It reduces redundancy and improves loss tolerance during data propagation."
  },
  {
    q: "Which part of the blockchain stack does Optimum primarily improve?",
    o: ["Consensus", "Execution", "Data movement / propagation", "Settlement"],
    a: 2, d: "easy",
    e: "Optimum fixes data movement at the foundation. Most networks waste bandwidth on redundant transmission; Optimum makes propagation faster and leaner."
  },
  {
    q: "Optimum's research foundation comes from which institution?",
    o: ["Stanford", "ETH Zurich", "MIT", "Carnegie Mellon"],
    a: 2, d: "easy",
    e: "Optimum is built on award-winning MIT research. RLNC was co-invented at MIT by Prof. Muriel Médard."
  },
  {
    q: "Does Optimum require changing a blockchain's consensus rules?",
    o: ["Yes, always a hard fork", "No, chains keep their existing rules", "Only for Ethereum", "Yes, a soft fork"],
    a: 1, d: "easy",
    e: "Chains keep their existing consensus rules. Optimum improves propagation as a complement to the current stack, with no consensus changes."
  },
  {
    q: "Optimum is best described as:",
    o: ["Consensus-changing", "Chain-specific", "Chain-agnostic", "Execution-layer only"],
    a: 2, d: "easy",
    e: "Optimum is chain-agnostic by design. It integrates with any blockchain without requiring protocol rewrites."
  },
  {
    q: "Roughly how much bandwidth reduction does Optimum achieve vs gossipsub?",
    o: ["10–20%", "40–50%", "90–95%", "Exactly 99%"],
    a: 2, d: "easy",
    e: "Optimum delivers ~90–95% bandwidth reduction vs gossipsub by removing redundant transmission through RLNC-coded gossip."
  },
  {
    q: "How much faster can Optimum deliver blocks and blobs vs gossipsub?",
    o: ["About the same", "2–3x", "6–20x", "100x"],
    a: 2, d: "easy",
    e: "Optimum achieves 6–20x faster block and blob delivery vs gossipsub — fewer missed slots and better MEV capture for validators."
  },
  {
    q: "Who benefits most directly from Optimum?",
    o: ["Only retail traders", "Validators, node operators, L1/L2 teams", "Only NFT collectors", "Centralized exchanges"],
    a: 1, d: "easy",
    e: "Optimum's intended users are L1/L2 teams, validators, node operators, builders, and dApp developers — anyone who depends on fast, reliable propagation."
  },
  {
    q: "What kind of network does Optimum run as?",
    o: ["A permissioned consortium", "A permissionless network of nodes", "A single centralized server", "A private validator set"],
    a: 1, d: "easy",
    e: "Optimum runs as a permissionless network that anyone can operate alongside existing clients and P2P stacks."
  },

  // ───────────── PRODUCTS (medium) ─────────────
  {
    q: "What is mump2p?",
    o: ["A monitoring dashboard", "RLNC-accelerated, gossipsub-compatible pub/sub", "A staking contract", "A wallet SDK"],
    a: 1, d: "medium",
    e: "mump2p is Optimum's first production product — RLNC-accelerated pub/sub that is libp2p/gossipsub-compatible for fast propagation of blocks, blobs, and transactions."
  },
  {
    q: "DeRAM stands for:",
    o: ["Decentralized Relay and Messaging", "Decentralized Random Access Memory", "Distributed Resource Allocation Model", "Dynamic Realtime Access Mesh"],
    a: 1, d: "medium",
    e: "DeRAM — Decentralized Random Access Memory — exposes low-latency read-write shared-state semantics across nodes."
  },
  {
    q: "DeROM stands for:",
    o: ["Decentralized Read-Only Memory", "Decentralized Routing Optimization Module", "Distributed Rollup Output Manager", "Dynamic Read Object Mapping"],
    a: 0, d: "medium",
    e: "DeROM — Decentralized Read-Only Memory — is optimized for broadcast and caching with read-only / append-oriented access."
  },
  {
    q: "What is a flexnode?",
    o: ["A governance token", "An operator-run node that handles RLNC-coded gossip and serves memory requests", "A type of smart contract", "A validator client fork"],
    a: 1, d: "medium",
    e: "A flexnode encodes, decodes, and forwards RLNC-coded gossip frames, maintains coded buffers, and serves DeRAM/DeROM requests."
  },
  {
    q: "Which product should builders adopt now for measurable latency gains?",
    o: ["DeROM", "DeRAM", "mump2p", "None are live yet"],
    a: 2, d: "medium",
    e: "mump2p is available today for measurable latency gains. DeRAM and DeROM come next to unlock low-latency reads/writes."
  },
  {
    q: "mump2p is compatible with which existing P2P stack?",
    o: ["IPFS only", "libp2p / gossipsub", "BitTorrent", "None — it replaces everything"],
    a: 1, d: "medium",
    e: "mump2p is libp2p/gossipsub-compatible, so it slots into existing infrastructure rather than forcing a full rewrite."
  },
  {
    q: "What do flexnodes maintain to recover loss and smooth tail latency?",
    o: ["Mempools", "Bounded coded buffers", "Merkle trees", "State channels"],
    a: 1, d: "medium",
    e: "Flexnodes maintain bounded coded buffers, which let them recover lost data and smooth out tail latency."
  },
  {
    q: "Optimum is described as complementary to what?",
    o: ["Consensus replacement", "Execution and scaling", "Token issuance", "KYC compliance"],
    a: 1, d: "medium",
    e: "Optimum works alongside execution and scaling, enabling networks to scale while improving performance."
  },
  {
    q: "What is the main problem RLNC solves in data propagation?",
    o: ["High gas fees", "Redundant transmission and loss", "Smart contract bugs", "Private key management"],
    a: 1, d: "medium",
    e: "RLNC reduces redundant transmission and improves loss tolerance, making propagation provably efficient under loss and contention."
  },
  {
    q: "For validators, faster propagation can improve which of the following?",
    o: ["Token price", "Attestations, MEV capture, fewer missed proposals", "Gas limits", "Block rewards halving schedule"],
    a: 1, d: "medium",
    e: "Better propagation means more successful attestations, better MEV capture, and fewer missed proposals — measurable revenue gains."
  },

  // ───────────── TEAM / BACKGROUND (medium) ─────────────
  {
    q: "Who is the co-inventor of RLNC and CEO of Optimum?",
    o: ["Vitalik Buterin", "Prof. Muriel Médard", "Kent Lin", "Satoshi Nakamoto"],
    a: 1, d: "medium",
    e: "Prof. Muriel Médard, the NEC Chair at MIT EECS, is co-inventor of RLNC and serves as Optimum's CEO."
  },
  {
    q: "Prof. Muriel Médard holds the NEC Chair at which department?",
    o: ["Harvard Business School", "MIT EECS", "Stanford CS", "Oxford Maths"],
    a: 1, d: "medium",
    e: "She is the NEC Chair at MIT EECS and is ranked #1 globally in Network Coding."
  },
  {
    q: "Which co-founder oversees business development, tokenomics, and fundraising?",
    o: ["Muriel Médard", "Kent Lin", "Anuj Shankar", "Allen Ding"],
    a: 1, d: "medium",
    e: "Kent Lin drives adoption and ecosystem growth — business development, tokenomics, and fundraising. He's a former GSR Partner and Harvard MBA dropout."
  },
  {
    q: "Kent Lin was formerly a Partner at which firm?",
    o: ["a16z", "GSR", "Paradigm", "Sequoia"],
    a: 1, d: "medium",
    e: "Kent Lin was a former Partner at GSR, a multi-billion-dollar firm, and served as President of the Harvard Blockchain Club."
  },
  {
    q: "Prof. Médard is a member of which prestigious body (elected 2020)?",
    o: ["US National Academy of Engineering", "British Royal Society", "Nobel Committee", "IEEE Board only"],
    a: 0, d: "hard",
    e: "She was elected to the US National Academy of Engineering in 2020, and the National Academy of Inventors in 2018."
  },

  // ───────────── TECHNICAL (hard) ─────────────
  {
    q: "Under standard RLNC models, the dissemination strategy is described as:",
    o: ["Heuristically decent", "Provably optimal for throughput/latency under loss", "Slower but cheaper", "Only good on testnets"],
    a: 1, d: "hard",
    e: "Under standard RLNC models, the dissemination strategy is provably optimal for throughput/latency under loss and contention."
  },
  {
    q: "Why does redundant transmission hurt traditional gossip networks?",
    o: ["It improves security", "It wastes bandwidth and slows propagation under load", "It lowers gas fees", "It has no effect"],
    a: 1, d: "hard",
    e: "Redundant transmission wastes bandwidth and slows propagation under load. Optimizing data movement lets networks transmit less and deliver more."
  },
  {
    q: "What does 'transmit less, deliver more' refer to in Optimum's design?",
    o: ["Fewer transactions per block", "Coded data reduces redundant sends while improving delivery", "Smaller block size limits", "Reduced validator count"],
    a: 1, d: "hard",
    e: "By applying RLNC coding, nodes send and receive far less data while delivery improves — the core efficiency gain of the network."
  },
  {
    q: "Optimum's approach is often called optimization of which 'layer'?",
    o: ["The settlement layer", "The memory / data movement layer", "The governance layer", "The application layer"],
    a: 1, d: "hard",
    e: "Optimum optimizes the memory and data-movement layer — accelerating propagation and real-time access across the network."
  },
  {
    q: "Which property makes RLNC resilient when packets are lost?",
    o: ["It retransmits every packet twice", "Coded fragments let nodes decode from any sufficient subset", "It ignores lost packets entirely", "It uses a central relay"],
    a: 1, d: "hard",
    e: "RLNC encodes data into linear combinations; a node can reconstruct the original from any sufficient subset of coded fragments, making it loss-tolerant."
  },
  {
    q: "Integrating Optimum is described as requiring:",
    o: ["New hardware and consensus changes", "No infrastructure changes, permissionless, zero-setup", "A full validator migration", "A custom L1 fork"],
    a: 1, d: "hard",
    e: "Integration is permissionless and zero-setup: no infrastructure changes, no additional hardware, no consensus modifications."
  },
  {
    q: "mump2p reduces redundant traffic, which leads to:",
    o: ["Higher latency", "Faster inclusion and lower bandwidth costs", "More missed blocks", "Larger state size"],
    a: 1, d: "hard",
    e: "By reducing redundant traffic and accelerating transmission, mump2p enables faster inclusion, lower bandwidth costs, and improved MEV capture potential."
  },
  {
    q: "Which best captures Optimum's thesis on scaling?",
    o: ["Only execution matters", "Data movement sets the ceiling for performance", "Consensus is the only bottleneck", "Storage is the only bottleneck"],
    a: 1, d: "hard",
    e: "Optimum's thesis: data movement sets the ceiling. Fix the foundation and everything above it improves."
  },

  // ───────────── ECOSYSTEM / POSITIONING (mixed) ─────────────
  {
    q: "Optimum positions itself as memory infrastructure for:",
    o: ["A single chain", "Any blockchain", "Only private chains", "Only Bitcoin"],
    a: 1, d: "medium",
    e: "Optimum is high-performance memory infrastructure for any blockchain — the first of its kind."
  },
  {
    q: "Which is NOT one of Optimum's products?",
    o: ["mump2p", "DeRAM", "DeROM", "DeFi-Swap"],
    a: 3, d: "medium",
    e: "Optimum's products are mump2p, DeRAM, and DeROM. 'DeFi-Swap' is not part of the protocol."
  },
  {
    q: "What kind of dApps benefit most from Optimum's low-latency gossip?",
    o: ["Slow batch-settlement apps", "Latency-sensitive dApps", "Offline-only apps", "Paper-wallet generators"],
    a: 1, d: "medium",
    e: "Optimum accelerates low-latency gossip to scale data access for latency-sensitive dApps and reduce network congestion."
  },
  {
    q: "For end users, what does Optimum ultimately improve?",
    o: ["Wallet color themes", "Snappier UX through faster inclusion", "Private key length", "Token ticker symbols"],
    a: 1, d: "medium",
    e: "End users get a snappier UX because faster propagation means faster transaction inclusion."
  },
  {
    q: "Optimum's networking improvement is compared against which baseline?",
    o: ["TCP/IP", "gossipsub", "HTTP/2", "WebRTC"],
    a: 1, d: "medium",
    e: "Optimum's performance gains — 6–20x faster delivery, ~90–95% less bandwidth — are measured against gossipsub."
  },
  {
    q: "What is the relationship between Optimum and existing validator clients?",
    o: ["It replaces them entirely", "It interoperates alongside them", "It is incompatible with them", "It only works on new clients"],
    a: 1, d: "medium",
    e: "Optimum interoperates with existing clients and libp2p/gossipsub stacks rather than replacing them."
  },
  {
    q: "A core promise of Optimum for node operators is:",
    o: ["Higher hardware costs", "Lower tail latency", "Mandatory restaking", "Forced KYC"],
    a: 1, d: "medium",
    e: "Optimum lowers tail latency for node operators and builders, improving reliability under load."
  },
  {
    q: "Which phrase best summarizes Optimum's tagline philosophy?",
    o: ["Move fast and break things", "Fix the foundation, everything above improves", "Code is law", "Number go up"],
    a: 1, d: "easy",
    e: "Optimum's philosophy: fix the foundation (data movement), and everything built above it improves."
  }

];

// Export for browser
if (typeof window !== 'undefined') window.QUESTION_BANK = QUESTION_BANK;
