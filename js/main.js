/* -------------------------------------------------------------
   Shiheb Amri Portfolio — Client-Side Logic & Systems Engine
   Aesthetic: Fast, Tactile, Evidence-Based, Zero AI Slop
   ------------------------------------------------------------- */

// Project Architecture Specs Cache
const PROJECT_SPECS = {
  vessel: {
    title: "vessel",
    tagline: "Local-first, agentless VPS control plane over secure SSH with zero server overhead.",
    problem: "Existing server management control planes require installing heavy memory-hungry agent daemons, opening proprietary ports, and trusting external centralized SaaS intermediaries with server credentials.",
    solution: "Engineered a local desktop control plane using Rust and Tauri v2 that executes all Docker, systemd, and reverse-proxy operations over direct, cryptographic SSH tunnels. The remote VPS experiences 0% resident memory overhead.",
    specs: [
      { label: "Core Runtime", value: "Rust 1.78+ (Tauri v2 IPC)" },
      { label: "Interface Layer", value: "SolidJS with fine-grained reactivity & TypeScript" },
      { label: "Transport Security", value: "Pure Ed25519/RSA SSH key-pair tunnel; no background listener" },
      { label: "Docker Integration", value: "Direct socket streaming over SSH piping" }
    ],
    github: "https://github.com/shihebamrii/vessel"
  },
  honeypot: {
    title: "distributed-honeypot",
    tagline: "Multi-container threat intelligence network with low-interaction SSH & HTTP honeypots.",
    problem: "Real-world network perimeters are constantly bombarded with credential-stuffing scanners and web crawlers looking for exposed credentials, making threat source identification difficult.",
    solution: "Built a containerized multi-honeypot architecture. The SSH honeypot traps credentials using Paramiko sockets while the HTTP node simulates vulnerable WordPress, phpMyAdmin, and .env files. Telemetry is collected via Flask API and surfaced in a live CLI dashboard.",
    specs: [
      { label: "Architecture", value: "Docker Compose multi-node isolated virtual network" },
      { label: "SSH Interception", value: "Paramiko socket hook capturing client version, source IP, credentials" },
      { label: "HTTP Deception", value: "Flask catch-all handlers mimicking vulnerable CMS & configuration leaks" },
      { label: "Telemetry Pipeline", value: "Central REST collector API persisting to SQLite with tabulate CLI" }
    ],
    github: "https://github.com/shihebamrii/distributed-honeypot"
  },
  securdns: {
    title: "securdns-resolver",
    tagline: "High-performance DNS firewall resolver sinkholing malware domains to 0.0.0.0.",
    problem: "Phishing, malware command & control, and web telemetry tracking rely on DNS resolution to establish communication with infected local devices.",
    solution: "Developed a recursive DNS interception resolver that parses raw UDP/TCP DNS packets, queries local blocklists with wildcard parent-domain matching in sub-millisecond time, sinkholes malicious domains to 0.0.0.0, and forwards legitimate traffic to Cloudflare 1.1.1.1.",
    specs: [
      { label: "Packet Engine", value: "dnslib socket parsing on UDP/TCP port 5353" },
      { label: "Domain Matching", value: "Wildcard recursive parent-domain hierarchy matching" },
      { label: "Synchronization", value: "Automated remote blocklist feed ingestor with SQL bulk insert" },
      { label: "Management", value: "Interactive CLI dashboard for whitelist/blacklist overriding and logs" }
    ],
    github: "https://github.com/shihebamrii/securdns-resolver"
  },
  cybersafe: {
    title: "CyberSafe",
    tagline: "Local cybersecurity posture checker and threat analysis suite.",
    problem: "Developers and workstation users frequently leave insecure environment variables, unencrypted keys, and dangerous permission vectors exposed on their systems.",
    solution: "An automated security scanner inspecting system environment variables, local file permissions, active listening ports, and exposed sensitive token patterns.",
    specs: [
      { label: "Inspection Engine", value: "Python system inspection modules" },
      { label: "Scope", value: "Local network ports, credential exposure, file permission auditing" },
      { label: "Output", value: "Categorized vulnerability reporting with remediation guidance" }
    ],
    github: "https://github.com/shihebamrii/CyberSafe"
  },
  streambert: {
    title: "streambert",
    tagline: "Cross-platform Electron desktop media platform with zero tracking or telemetry.",
    problem: "Streaming websites and standard media utilities deploy intrusive ad scripts, tracker pixels, and invasive fingerprinting scripts.",
    solution: "Engineered a hardened desktop streaming player leveraging Electron that sandboxes media streams, strips advertising headers, and prevents user tracking completely.",
    specs: [
      { label: "Runtime", value: "Electron & Node.js" },
      { label: "Security", value: "Context isolation enabled, web security sandbox, zero tracker telemetry" },
      { label: "Platform", value: "Windows, Linux, macOS cross-compilation" }
    ],
    github: "https://github.com/shihebamrii/streambert"
  },
  fileserver: {
    title: "local-file-server",
    tagline: "Lightweight LAN-secured file browsing server with session encryption and auth.",
    problem: "Sharing files across local networks typically relies on cloud storage uploads or complex SMB shares with cumbersome access control.",
    solution: "A self-contained Flask application enabling zero-configuration file sharing across local LAN subnets, secured via authenticated sessions and rate limiting.",
    specs: [
      { label: "Framework", value: "Python Flask with Werkzeug session security" },
      { label: "Network Scope", value: "Local subnet binding with configurable port" },
      { label: "Security", value: "Password-hash authentication and path-traversal prevention" }
    ],
    github: "https://github.com/shihebamrii/local-file-server"
  },
  canary: {
    title: "canary-tokens",
    tagline: "Deception tokens and intrusion tripwires for breach detection alerting.",
    problem: "Intruders who breach a perimeter often spend days quietly exploring internal file shares and systems before being detected.",
    solution: "Generates decoy credentials, files, and webhooks planted in honeypot locations. Any unauthorized access triggers instant out-of-band notification.",
    specs: [
      { label: "Deception Vector", value: "Synthetic API tokens, database connection strings, file beacons" },
      { label: "Alert Pipeline", value: "Webhook callbacks triggering instantaneous notifications" }
    ],
    github: "https://github.com/shihebamrii/canary-tokens"
  },
  zkclipboard: {
    title: "zk-clipboard",
    tagline: "Zero-knowledge end-to-end encrypted temporary clipboard utility.",
    problem: "Copying sensitive secrets or passwords across devices usually leaks cleartext data to server logs or clipboard aggregators.",
    solution: "Uses client-side WebCrypto AES-GCM to encrypt snippets before leaving the browser. The server only stores opaque ciphertext blobs with expiring TTLs.",
    specs: [
      { label: "Cryptography", value: "Web Crypto API: AES-GCM 256-bit client-side derivation" },
      { label: "Zero-Knowledge", value: "Server holds no decryption keys; decryption happens strictly in client DOM" }
    ],
    github: "https://github.com/shihebamrii/zk-clipboard"
  }
};

/* -------------------------------------------------------------
   Web Audio Synthesizer (Zero External Audio Files)
   ------------------------------------------------------------- */
class CyberAudioEngine {
  constructor() {
    this.enabled = false;
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playKey() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(580 + Math.random() * 80, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }

  playBeep(success = true) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(success ? 880 : 320, this.ctx.currentTime);
      if (success) {
        osc.frequency.exponentialRampToValueAtTime(1320, this.ctx.currentTime + 0.1);
      }
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }
}

const audio = new CyberAudioEngine();

/* -------------------------------------------------------------
   Application Bootstrap
   ------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initAmbientCanvas();
  initTelemetrySimulator();
  initAudioToggle();
  initThemePicker();
  initDaemonStream();
  initSpotlightTracking();
  initInteractiveLab();
  initClipboardButtons();
  initProjectFilters();
  initTerminal();
  initSpecModal();
  initPgpModal();
});

/* -------------------------------------------------------------
   Ambient Interactive Canvas Background
   ------------------------------------------------------------- */
function initAmbientCanvas() {
  const canvas = document.getElementById("ambient-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const nodes = [];
  const nodeCount = Math.min(Math.floor(width / 35), 45);

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5
    });
  }

  let mouse = { x: -1000, y: -1000 };
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 229, 255, 0.4)";
      ctx.fill();

      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = `rgba(0, 229, 255, ${0.15 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      const mouseDist = Math.hypot(n.x - mouse.x, n.y - mouse.y);
      if (mouseDist < 120) {
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(16, 185, 129, ${0.25 * (1 - mouseDist / 120)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* -------------------------------------------------------------
   Audio Feedback Toggle
   ------------------------------------------------------------- */
function initAudioToggle() {
  const btn = document.getElementById("audio-toggle-btn");
  const icon = document.getElementById("audio-icon");
  const label = document.getElementById("audio-label");
  if (!btn) return;

  btn.addEventListener("click", () => {
    audio.init();
    audio.enabled = !audio.enabled;

    if (audio.enabled) {
      btn.classList.add("active");
      icon.textContent = "🔊";
      label.textContent = "FX: ON";
      audio.playBeep(true);
      showToast("Tactile audio feedback enabled");
    } else {
      btn.classList.remove("active");
      icon.textContent = "🔇";
      label.textContent = "FX: OFF";
    }
  });
}

/* -------------------------------------------------------------
   Theme Accent Switcher
   ------------------------------------------------------------- */
function initThemePicker() {
  const dots = document.querySelectorAll(".theme-dot");
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      dots.forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");
      const theme = dot.getAttribute("data-theme") || "cyan";
      document.documentElement.setAttribute("data-accent", theme);
      audio.playKey();
    });
  });
}

/* -------------------------------------------------------------
   Spotlight Card Mouse Physics
   ------------------------------------------------------------- */
function initSpotlightTracking() {
  const cards = document.querySelectorAll(".spotlight-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--spotlight-x", `${x}px`);
      card.style.setProperty("--spotlight-y", `${y}px`);
    });
  });
}

/* -------------------------------------------------------------
   Hero Live Daemon Stream Simulator
   ------------------------------------------------------------- */
function initDaemonStream() {
  const stream = document.getElementById("daemon-stream");
  if (!stream) return;

  const mockLogs = [
    { tag: "sys", prefix: "[SEC-AUDIT]", text: "Checking /etc/shadow permissions: 0640 [OK]" },
    { tag: "dns", prefix: "[DNS-FILTER]", text: "Intercepted adservice.google.com -> SINKHOLED 0.0.0.0 (0.4ms)" },
    { tag: "sec", prefix: "[DECEPTION]", text: "Canary token planted: /var/backup/.aws_credentials.bak" },
    { tag: "app", prefix: "[VESSEL-RPC]", text: "Streamed docker ps stats over SSH socket (24 containers)" },
    { tag: "honeypot", prefix: "[INTRUSION]", text: "Blocked scanner from 185.220.101.4 trying 'admin:admin' on :2222" },
    { tag: "dns", prefix: "[DNS-FILTER]", text: "Query 'api.github.com' -> UPSTREAM 1.1.1.1 -> 140.82.121.6" }
  ];

  let index = 0;
  setInterval(() => {
    const item = mockLogs[index % mockLogs.length];
    index++;

    const now = new Date();
    const timeStr = `[${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}]`;

    const row = document.createElement("div");
    row.className = "d-row";
    row.innerHTML = `<span class="d-time">${timeStr}</span> <span class="d-tag-${item.tag}">${item.prefix}</span> <span class="d-msg">${item.text}</span>`;

    stream.appendChild(row);
    if (stream.children.length > 25) {
      stream.removeChild(stream.children[0]);
    }
    stream.scrollTop = stream.scrollHeight;
  }, 4500);
}

/* -------------------------------------------------------------
   Interactive Security Lab Simulator
   ------------------------------------------------------------- */
function initInteractiveLab() {
  // Tabs
  const tabs = document.querySelectorAll(".lab-tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const target = tab.getAttribute("data-tab");

      document.getElementById("lab-tab-dns").classList.toggle("active", target === "dns");
      document.getElementById("lab-tab-honeypot").classList.toggle("active", target === "honeypot");
      audio.playKey();
    });
  });

  // Presets
  const presets = document.querySelectorAll(".preset-btn");
  const dnsInput = document.getElementById("dns-input");
  presets.forEach((btn) => {
    btn.addEventListener("click", () => {
      dnsInput.value = btn.getAttribute("data-dns") || "";
      audio.playKey();
    });
  });

  // DNS Simulation Trigger
  const dnsSimBtn = document.getElementById("dns-sim-btn");
  const dnsLog = document.getElementById("dns-log-body");
  const dnsBadge = document.getElementById("dns-verdict-badge");

  if (dnsSimBtn) {
    dnsSimBtn.addEventListener("click", () => {
      audio.playKey();
      const domain = (dnsInput.value || "").trim().toLowerCase();
      if (!domain) return;

      dnsLog.textContent = `[+] Inspecting incoming UDP packet for: "${domain}"...
[+] Parsing Question Section via dnslib (Type: A, Class: IN)...`;

      setTimeout(() => {
        const isMalicious = domain.includes("malware") || domain.includes("phish") || domain.includes("track") || domain.includes("ad-");

        if (isMalicious) {
          dnsBadge.textContent = "VERDICT: SINKHOLED (0.0.0.0)";
          dnsBadge.style.color = "#ef4444";
          dnsBadge.style.borderColor = "#ef4444";
          audio.playBeep(false);

          dnsLog.textContent = `[+] Query: "${domain}"
[+] Match found in local blocklist database (Parent domain wildcard: *.${domain.split('.').slice(-2).join('.')})
[!] THREAT DETECTED: Phishing / Malware / Tracker Feed Rule
[✓] ACTION: Sinkholed to 0.0.0.0
[✓] Logged to SQLite threat database in 0.72ms
[✓] Client packet reply: IP 0.0.0.0 (TTL: 300)`;
        } else {
          dnsBadge.textContent = "VERDICT: ALLOWED (UPSTREAM)";
          dnsBadge.style.color = "#10b981";
          dnsBadge.style.borderColor = "#10b981";
          audio.playBeep(true);

          dnsLog.textContent = `[+] Query: "${domain}"
[+] No malicious signatures found in 184,200 local blocklist records.
[+] Forwarded UDP packet to Upstream DNS (Cloudflare 1.1.1.1:53)
[✓] Upstream Response: 140.82.121.4 (Latency: 14ms)
[✓] Cached in SQLite query_logs with status: ALLOWED`;
        }
      }, 350);
    });
  }

  // Honeypot Simulation Trigger
  const honeyBtn = document.getElementById("honeypot-sim-btn");
  const honeyLog = document.getElementById("honeypot-log-body");
  const honeyBadge = document.getElementById("honeypot-verdict-badge");
  const honeySelect = document.getElementById("honeypot-vector");

  if (honeyBtn) {
    honeyBtn.addEventListener("click", () => {
      audio.playKey();
      const vector = honeySelect.value;
      honeyLog.textContent = `[+] Firing intrusion simulation payload [vector: ${vector}]...`;

      setTimeout(() => {
        honeyBadge.textContent = "TRAP TRIGGERED (CAPTURED)";
        honeyBadge.style.color = "#10b981";
        honeyBadge.style.borderColor = "#10b981";
        audio.playBeep(true);

        if (vector === "ssh") {
          honeyLog.textContent = `[+] Target: ssh-honeypot-node:2222
[+] Handshake: Client SSH-2.0-OpenSSH_8.9p1
[+] Intercepted credentials: Username="root", Password="password123"
[!] TRAP: Paramiko hook captured attacker session and source IP
[✓] Telemetry payload POSTed to Flask collector API (/api/report/ssh)
[✓] Written to threat_intel.db (ID: 4192). Live CLI dashboard updated.`;
        } else if (vector === "env") {
          honeyLog.textContent = `[+] Target: http-honeypot-node:8080/GET /.env
[+] Mock Template: Returned synthetic DB credentials (DB_PASS=decoy_token_9918)
[!] CANARY TRIGGERED: Reconnaissance probe detected!
[✓] Captured attacker User-Agent: "sqlmap/1.6.4#stable"
[✓] Telemetry payload POSTed to Flask collector API (/api/report/http)`;
        } else {
          honeyLog.textContent = `[+] Target: http-honeypot-node:8080 (Web Exploit / Injection)
[+] Intercepted URI: /search.php?id=UNION SELECT passwords FROM users
[!] Payload identified: SQL Injection signature (OWASP A03:2021)
[✓] Honeypot returned decoy 200 OK template with synthetic hashes
[✓] Attacker source fingerprint permanently registered in threat intelligence log.`;
        }
      }, 400);
    });
  }
}

/* -------------------------------------------------------------
   Telemetry Simulator
   ------------------------------------------------------------- */
function initTelemetrySimulator() {
  const pingEl = document.getElementById("telemetry-ping");
  if (!pingEl) return;

  setInterval(() => {
    const rtt = Math.floor(Math.random() * 8) + 16;
    pingEl.textContent = `RTT: ${rtt}ms`;
  }, 4000);
}

/* -------------------------------------------------------------
   Clipboard Helper & Toast Feedback
   ------------------------------------------------------------- */
function showToast(message) {
  const toast = document.getElementById("toast");
  const msgEl = document.getElementById("toast-message");
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.add("show");

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function initClipboardButtons() {
  const copyButtons = document.querySelectorAll("[data-email]");
  copyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      audio.playKey();
      const email = btn.getAttribute("data-email") || "shihebamrii@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied ${email} to clipboard!`);
        audio.playBeep(true);
        const label = btn.querySelector("#copy-email-text");
        if (label) {
          const oldText = label.textContent;
          label.textContent = "Copied!";
          setTimeout(() => {
            label.textContent = oldText;
          }, 2000);
        }
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  });
}

/* -------------------------------------------------------------
   Project Filtering Logic
   ------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".system-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      audio.playKey();
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const cardCat = card.getAttribute("data-category");
        if (category === "all" || cardCat === category) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* -------------------------------------------------------------
   Interactive Terminal Shell Console
   ------------------------------------------------------------- */
function initTerminal() {
  const modal = document.getElementById("terminal-modal");
  const openBtn = document.getElementById("open-terminal-btn");
  const heroBtn = document.getElementById("hero-terminal-btn");
  const closeBtn = document.getElementById("close-terminal-btn");
  const exitBtn = document.getElementById("term-exit-btn");
  const clearBtn = document.getElementById("term-clear-btn");
  const input = document.getElementById("terminal-input");
  const output = document.getElementById("terminal-output");

  function openTerminal() {
    audio.playKey();
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    input.focus();
  }

  function closeTerminal() {
    audio.playKey();
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  if (openBtn) openBtn.addEventListener("click", openTerminal);
  if (heroBtn) heroBtn.addEventListener("click", openTerminal);
  if (closeBtn) closeBtn.addEventListener("click", closeTerminal);
  if (exitBtn) exitBtn.addEventListener("click", closeTerminal);

  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (modal.classList.contains("open")) {
        closeTerminal();
      } else {
        openTerminal();
      }
    } else if (e.key === "Escape" && modal.classList.contains("open")) {
      closeTerminal();
    }
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeTerminal();
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      audio.playKey();
      output.innerHTML = "";
    });
  }

  function printLine(html) {
    const line = document.createElement("div");
    line.className = "term-line";
    line.innerHTML = html;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  input.addEventListener("keydown", (e) => {
    audio.playKey();
    if (e.key === "Enter") {
      const rawCmd = input.value.trim();
      input.value = "";
      if (!rawCmd) return;

      printLine(`<span class="term-prompt">shiheb@amri:~$</span> <span>${escapeHtml(rawCmd)}</span>`);

      const parts = rawCmd.split(" ");
      const cmd = parts[0].toLowerCase();
      const arg = parts.slice(1).join(" ").toLowerCase();

      switch (cmd) {
        case "help":
          printLine(`
            <span class="term-cyan">Available Commands:</span><br>
            &nbsp;&nbsp;<span class="term-green">about</span>          - Who I am and engineering philosophy<br>
            &nbsp;&nbsp;<span class="term-green">projects</span>       - List of public security &amp; systems projects<br>
            &nbsp;&nbsp;<span class="term-green">skills</span>         - Technical capabilities breakdown<br>
            &nbsp;&nbsp;<span class="term-green">inspect &lt;id&gt;</span>   - Deep dive (e.g. inspect vessel, inspect honeypot)<br>
            &nbsp;&nbsp;<span class="term-green">pgp</span>            - Dumps PGP cryptographic identity<br>
            &nbsp;&nbsp;<span class="term-green">theme</span>          - Cycle accent color theme<br>
            &nbsp;&nbsp;<span class="term-green">whoami</span>         - Active security role context<br>
            &nbsp;&nbsp;<span class="term-green">contact</span>        - Reach out via verified channels<br>
            &nbsp;&nbsp;<span class="term-green">ping</span>           - Network latency check<br>
            &nbsp;&nbsp;<span class="term-green">clear</span>          - Clear terminal output<br>
            &nbsp;&nbsp;<span class="term-green">exit</span>           - Close interactive terminal window
          `);
          break;

        case "about":
        case "whoami":
          printLine(`
            <span class="term-cyan">Shiheb Amri</span> (Aka: <span class="term-green">Chiheb Amri</span> / <span class="term-amber">شهاب عامري</span> / <span class="term-cyan">shihebamrii</span>) — Full-Stack Engineer &amp; Cybersecurity Specialist.<br>
            • Focused on local-first computing, zero-trust architectures, and network defense.<br>
            • Primary systems stack: Rust, Tauri, SolidJS, Python, Docker, Linux.<br>
            • Verified GitHub profile: <span class="term-green">https://github.com/shihebamrii</span>
          `);
          break;

        case "projects":
          printLine(`
            <span class="term-cyan">Verified Systems Artifacts:</span><br>
            • <span class="term-green">vessel</span> — Local-first, agentless VPS control plane (Rust/Tauri/SolidJS)<br>
            • <span class="term-green">distributed-honeypot</span> — Multi-container threat intel network (Python/Docker)<br>
            • <span class="term-green">securdns-resolver</span> — DNS firewall sinkholing malware to 0.0.0.0<br>
            • <span class="term-green">CyberSafe</span> — Workstation threat scanner &amp; security audit tool<br>
            • <span class="term-green">streambert</span> — Electron desktop streaming player with zero tracking<br>
            • <span class="term-green">local-file-server</span> — LAN-secured authenticated file server<br>
            • <span class="term-green">canary-tokens</span> — Deception alert tokens &amp; intrusion tripwires<br>
            • <span class="term-green">zk-clipboard</span> — Zero-knowledge client-side encrypted clipboard<br>
            <span class="term-muted">Tip: Type </span><span class="term-cyan">inspect vessel</span><span class="term-muted"> to view architecture specs.</span>
          `);
          break;

        case "skills":
          printLine(`
            <span class="term-cyan">Technical Arsenal:</span><br>
            • <span class="term-green">Systems:</span> Rust, Tauri v2, Linux Kernel/CLI, Docker, Bash<br>
            • <span class="term-green">Security:</span> DNS Firewalls, Honeypots, Threat Modeling, Wireshark, OWASP<br>
            • <span class="term-green">Backend:</span> Python (Flask, FastAPI), Node.js, SQLite, PostgreSQL, Nginx<br>
            • <span class="term-green">Frontend:</span> SolidJS, TypeScript, React, Next.js, Electron, Modern CSS
          `);
          break;

        case "inspect":
          if (!arg) {
            printLine(`<span class="term-yellow">Usage: inspect [vessel | honeypot | securdns | streambert]</span>`);
          } else {
            const key = arg.replace("-", "");
            const spec = PROJECT_SPECS[key] || Object.values(PROJECT_SPECS).find(s => s.title.toLowerCase().includes(arg));
            if (spec) {
              printLine(`
                <span class="term-cyan">=== [SYSTEM SPEC] ${spec.title} ===</span><br>
                <span class="term-muted">${spec.tagline}</span><br><br>
                <span class="term-green">Architecture Solution:</span><br>
                ${spec.solution}<br><br>
                <span class="term-green">Key Specifications:</span><br>
                ${spec.specs.map(s => `• <span class="term-cyan">${s.label}:</span> ${s.value}`).join("<br>")}<br><br>
                <span class="term-muted">Repository:</span> <a href="${spec.github}" target="_blank" style="color:var(--accent-primary);">${spec.github}</a>
              `);
            } else {
              printLine(`<span class="term-red">Unknown system artifact '${escapeHtml(arg)}'. Type 'projects' to see list.</span>`);
            }
          }
          break;

        case "pgp":
          printLine(`
            <span class="term-cyan">PGP Fingerprint:</span> B73F 88A1 99C2 4DF1 289E 61B0 5410 D6AE 7E20 4421<br>
            User ID: Shiheb Amri &lt;shihebamrii@gmail.com&gt;<br>
            <span class="term-muted">Use button in Contact section to view full armored block.</span>
          `);
          break;

        case "theme":
          const themes = ["cyan", "emerald", "violet", "amber"];
          const current = document.documentElement.getAttribute("data-accent") || "cyan";
          const next = themes[(themes.indexOf(current) + 1) % themes.length];
          document.documentElement.setAttribute("data-accent", next);
          document.querySelectorAll(".theme-dot").forEach(d => {
            d.classList.toggle("active", d.getAttribute("data-theme") === next);
          });
          printLine(`<span class="term-green">Accent theme switched to: ${next.toUpperCase()}</span>`);
          break;

        case "contact":
          printLine(`
            <span class="term-cyan">Direct Communication Gateway:</span><br>
            • Email: <span class="term-green">shihebamrii@gmail.com</span><br>
            • GitHub: <a href="https://github.com/shihebamrii" target="_blank" style="color:var(--accent-primary);">github.com/shihebamrii</a><br>
            • LinkedIn: <a href="https://linkedin.com/in/shihebamri" target="_blank" style="color:var(--accent-primary);">linkedin.com/in/shihebamri</a>
          `);
          break;

        case "ping":
          const latency = Math.floor(Math.random() * 8) + 16;
          printLine(`64 bytes from shihebamrii.github.io: icmp_seq=1 ttl=58 time=${latency}.4 ms`);
          break;

        case "clear":
          output.innerHTML = "";
          break;

        case "exit":
          closeTerminal();
          break;

        case "sudo":
          printLine(`<span class="term-red">Incident will be reported to /dev/null. Permission denied.</span>`);
          break;

        default:
          printLine(`<span class="term-red">Command not recognized: '${escapeHtml(cmd)}'. Type 'help' for available commands.</span>`);
          break;
      }
    }
  });
}

/* -------------------------------------------------------------
   Project Architecture Specification Modal
   ------------------------------------------------------------- */
function initSpecModal() {
  const modal = document.getElementById("spec-modal");
  const closeBtn = document.getElementById("spec-close-btn");
  const dismissBtn = document.getElementById("spec-dismiss-btn");
  const titleEl = document.getElementById("spec-title");
  const contentEl = document.getElementById("spec-content");
  const githubLink = document.getElementById("spec-github-link");
  const triggers = document.querySelectorAll(".spec-trigger-btn");

  function openSpec(projectKey) {
    audio.playKey();
    const data = PROJECT_SPECS[projectKey];
    if (!data) return;

    titleEl.textContent = data.title;
    githubLink.href = data.github;

    contentEl.innerHTML = `
      <div class="spec-section">
        <div class="spec-section-title">Overview</div>
        <p>${data.tagline}</p>
      </div>

      <div class="spec-section">
        <div class="spec-section-title">The Challenge / Problem</div>
        <p>${data.problem}</p>
      </div>

      <div class="spec-section">
        <div class="spec-section-title">Technical Solution</div>
        <p>${data.solution}</p>
      </div>

      <div class="spec-section">
        <div class="spec-section-title">Technical Specifications</div>
        <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; margin-top:8px;">
          ${data.specs.map(s => `<li><strong style="color:var(--text-main); font-family:var(--font-mono); font-size:12px;">${s.label}:</strong> <span style="font-size:13px;">${s.value}</span></li>`).join("")}
        </ul>
      </div>
    `;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeSpec() {
    audio.playKey();
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  triggers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-project");
      openSpec(key);
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeSpec);
  if (dismissBtn) dismissBtn.addEventListener("click", closeSpec);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeSpec();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeSpec();
    }
  });
}

/* -------------------------------------------------------------
   PGP Key Modal
   ------------------------------------------------------------- */
function initPgpModal() {
  const modal = document.getElementById("pgp-modal");
  const openBtn = document.getElementById("pgp-modal-btn");
  const closeBtn = document.getElementById("pgp-close-btn");
  const dismissBtn = document.getElementById("pgp-dismiss-btn");
  const copyBtn = document.getElementById("copy-pgp-btn");

  if (!modal) return;

  function openPgp() {
    audio.playKey();
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closePgp() {
    audio.playKey();
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  if (openBtn) openBtn.addEventListener("click", openPgp);
  if (closeBtn) closeBtn.addEventListener("click", closePgp);
  if (dismissBtn) dismissBtn.addEventListener("click", closePgp);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closePgp();
  });

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText("B73F 88A1 99C2 4DF1 289E 61B0 5410 D6AE 7E20 4421").then(() => {
        showToast("PGP Fingerprint copied!");
        audio.playBeep(true);
      });
    });
  }
}

// Security Escape Helper
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
