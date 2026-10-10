/* -------------------------------------------------------------
   Shiheb Amri Portfolio — Client-Side Logic & CLI Engine
   Aesthetic: Fast, Tactile, No Bloat, Evidence-Based
   ------------------------------------------------------------- */

// Project Architecture Data Cache
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

document.addEventListener("DOMContentLoaded", () => {
  initAmbientCanvas();
  initTelemetrySimulator();
  initClipboardButtons();
  initProjectFilters();
  initTerminal();
  initSpecModal();
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

      // Connect nearby nodes
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

      // Connect to mouse
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
   Telemetry Simulator
   ------------------------------------------------------------- */
function initTelemetrySimulator() {
  const pingEl = document.getElementById("telemetry-ping");
  if (!pingEl) return;

  setInterval(() => {
    const rtt = Math.floor(Math.random() * 8) + 16; // 16 - 24ms
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
      const email = btn.getAttribute("data-email") || "shihebamrii@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied ${email} to clipboard!`);
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
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    input.focus();
  }

  function closeTerminal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  if (openBtn) openBtn.addEventListener("click", openTerminal);
  if (heroBtn) heroBtn.addEventListener("click", openTerminal);
  if (closeBtn) closeBtn.addEventListener("click", closeTerminal);
  if (exitBtn) exitBtn.addEventListener("click", closeTerminal);

  // Keyboard shortcut Ctrl+K / Cmd+K / ESC
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

  // Modal backdrop click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeTerminal();
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
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

  // Shell Command Execution
  input.addEventListener("keydown", (e) => {
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
            &nbsp;&nbsp;<span class="term-green">projects</span>       - List of public security & systems projects<br>
            &nbsp;&nbsp;<span class="term-green">skills</span>         - Technical capabilities breakdown<br>
            &nbsp;&nbsp;<span class="term-green">inspect &lt;id&gt;</span>   - Deep dive (e.g. inspect vessel, inspect honeypot)<br>
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
            <span class="term-cyan">Shiheb Amri</span> — Full-Stack Engineer &amp; Cybersecurity Specialist.<br>
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
            • <span class="term-green">CyberSafe</span> — Workstation threat scanner & security audit tool<br>
            • <span class="term-green">streambert</span> — Electron desktop streaming player with zero tracking<br>
            • <span class="term-green">local-file-server</span> — LAN-secured authenticated file server<br>
            • <span class="term-green">canary-tokens</span> — Deception alert tokens & intrusion tripwires<br>
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
                <span class="term-muted">Repository:</span> <a href="${spec.github}" target="_blank" style="color:var(--accent-cyan);">${spec.github}</a>
              `);
            } else {
              printLine(`<span class="term-red">Unknown system artifact '${escapeHtml(arg)}'. Type 'projects' to see list.</span>`);
            }
          }
          break;

        case "contact":
          printLine(`
            <span class="term-cyan">Direct Communication Gateway:</span><br>
            • Email: <span class="term-green">shihebamrii@gmail.com</span><br>
            • GitHub: <a href="https://github.com/shihebamrii" target="_blank" style="color:var(--accent-cyan);">github.com/shihebamrii</a><br>
            • LinkedIn: <a href="https://linkedin.com/in/shihebamri" target="_blank" style="color:var(--accent-cyan);">linkedin.com/in/shihebamri</a>
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

// Security Escape Helper
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
