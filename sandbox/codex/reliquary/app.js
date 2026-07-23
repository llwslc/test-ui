const app = document.querySelector("#app");
const canvas = document.querySelector("#particleField");
const context = canvas.getContext("2d");
const relicStage = document.querySelector("#relicStage");
const awakenButton = document.querySelector("#awakenRelic");
const artifactState = document.querySelector("#artifactState");
const soundToggle = document.querySelector("#soundToggle");
const archiveIndex = document.querySelector("#archiveIndex");
const archiveBackdrop = document.querySelector("#archiveBackdrop");
const containmentDialog = document.querySelector("#containmentDialog");
const toast = document.querySelector("#toast");
const toastMessage = document.querySelector("#toastMessage");
const scrollProgress = document.querySelector("#scrollProgress");
const sectionCode = document.querySelector("#sectionCode");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let canvasWidth = 0;
let canvasHeight = 0;
let pixelRatio = 1;
let particles = [];
let animationFrame;
let relicAwake = false;
let soundEnabled = false;
let audioContext;
let toastTimer;

const pointer = {
  x: 0,
  y: 0,
  active: false,
};

const layerDetails = {
  shell: {
    number: "LAYER 01 / 04",
    title: "CARAPACE",
    description: "深色甲壳定义产品边界和信息层级。骨瓷切面负责可读性，氧化金缝线标记可以安全触碰的位置。",
    role: "Surface / Container",
    material: "Obsidian + Bone",
    behavior: "Shield / Reveal",
    colors: ["#171F1B", "#E9E2CF", "#B68A48"],
  },
  skeleton: {
    number: "LAYER 02 / 04",
    title: "SKELETON",
    description: "骨架是一套看得见的布局系统。肋骨控制间距，关节定义断点，中轴保证复杂页面仍然拥有清晰重心。",
    role: "Grid / Hierarchy",
    material: "Bone China",
    behavior: "Support / Align",
    colors: ["#756E60", "#E9E2CF", "#090D0C"],
  },
  nerve: {
    number: "LAYER 03 / 04",
    title: "NERVE",
    description: "毒液绿只用于正在发生的事情：焦点、成功、进度和实时信号。动效沿神经通路传播，而不是无目的漂浮。",
    role: "Feedback / Motion",
    material: "Bioluminescence",
    behavior: "Pulse / Transmit",
    colors: ["#A8FF57", "#5B9139", "#101613"],
  },
  core: {
    number: "LAYER 04 / 04",
    title: "CORE",
    description: "核心代表页面唯一的主要意图。它不会同时出现两次；所有视觉压力最终都指向这个可以被用户明确理解的动作。",
    role: "Intent / Decision",
    material: "Unknown Energy",
    behavior: "Awaken / Commit",
    colors: ["#ECFFD0", "#A8FF57", "#284923"],
  },
};

const tabDetails = {
  overview: {
    index: "01",
    title: "ARTIFACT OVERVIEW",
    description: "Structural summary, containment history and active biological readings.",
  },
  signals: {
    index: "02",
    title: "NEURAL SIGNALS",
    description: "Live pulse paths, signal strength and semantic feedback channel integrity.",
  },
  lineage: {
    index: "03",
    title: "RECOVERED LINEAGE",
    description: "Known material ancestry, mutation record and relationships between specimens.",
  },
};

function resizeCanvas() {
  pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.width = Math.round(canvasWidth * pixelRatio);
  canvas.height = Math.round(canvasHeight * pixelRatio);
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  const desiredCount = Math.min(82, Math.max(34, Math.round((canvasWidth * canvasHeight) / 21000)));
  particles = Array.from({ length: desiredCount }, (_, index) => ({
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    vx: (Math.random() - 0.5) * 0.13,
    vy: (Math.random() - 0.5) * 0.13,
    radius: index % 11 === 0 ? 1.5 : Math.random() * 0.8 + 0.3,
    gold: index % 7 === 0,
    phase: Math.random() * Math.PI * 2,
  }));
}

function drawParticles(time = 0) {
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  particles.forEach((particle, index) => {
    if (!reducedMotion) {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < -20) particle.x = canvasWidth + 20;
      if (particle.x > canvasWidth + 20) particle.x = -20;
      if (particle.y < -20) particle.y = canvasHeight + 20;
      if (particle.y > canvasHeight + 20) particle.y = -20;

      if (pointer.active) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distanceSquared = dx * dx + dy * dy;
        if (distanceSquared < 22000 && distanceSquared > 1) {
          const force = (22000 - distanceSquared) / 22000;
          const distance = Math.sqrt(distanceSquared);
          particle.x += (dx / distance) * force * 0.55;
          particle.y += (dy / distance) * force * 0.55;
        }
      }
    }

    const pulse = 0.5 + Math.sin(time * 0.0007 + particle.phase) * 0.28;
    context.beginPath();
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    context.fillStyle = particle.gold
      ? `rgba(182, 138, 72, ${0.22 + pulse * 0.26})`
      : `rgba(168, 255, 87, ${0.08 + pulse * 0.14})`;
    context.fill();

    for (let otherIndex = index + 1; otherIndex < particles.length; otherIndex += 1) {
      const other = particles[otherIndex];
      const dx = particle.x - other.x;
      const dy = particle.y - other.y;
      const distanceSquared = dx * dx + dy * dy;
      if (distanceSquared < 10500) {
        const alpha = (1 - distanceSquared / 10500) * 0.07;
        context.beginPath();
        context.moveTo(particle.x, particle.y);
        context.lineTo(other.x, other.y);
        context.strokeStyle = particle.gold
          ? `rgba(182, 138, 72, ${alpha})`
          : `rgba(168, 255, 87, ${alpha})`;
        context.lineWidth = 0.55;
        context.stroke();
      }
    }
  });

  if (!reducedMotion) {
    animationFrame = window.requestAnimationFrame(drawParticles);
  }
}

function createAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
}

function playTone(frequency = 180, duration = 0.09, type = "sine", gain = 0.025, delay = 0) {
  if (!soundEnabled) return;
  createAudioContext();
  const start = audioContext.currentTime + delay;
  const oscillator = audioContext.createOscillator();
  const volume = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(40, frequency * 0.72), start + duration);
  volume.gain.setValueAtTime(0.0001, start);
  volume.gain.exponentialRampToValueAtTime(gain, start + 0.012);
  volume.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(volume);
  volume.connect(audioContext.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

function playAwakenSound() {
  if (!soundEnabled) return;
  playTone(82, 0.45, "sine", 0.04);
  playTone(164, 0.34, "triangle", 0.028, 0.12);
  playTone(328, 0.28, "sine", 0.02, 0.26);
  playTone(492, 0.22, "sine", 0.014, 0.4);
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toastMessage.textContent = message;
  toast.classList.remove("is-visible");
  void toast.offsetWidth;
  toast.classList.add("is-visible");
  playTone(330, 0.12, "triangle", 0.02);
  playTone(495, 0.15, "sine", 0.015, 0.08);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3800);
}

function setRelicState(nextState) {
  relicAwake = nextState;
  relicStage.classList.toggle("is-awake", relicAwake);
  artifactState.textContent = relicAwake ? "AWAKENED" : "DORMANT";
  artifactState.style.color = relicAwake ? "var(--venom)" : "";
  awakenButton.querySelector("b").textContent = relicAwake ? "重新封存" : "解除封存";
  awakenButton.querySelector("small").textContent = relicAwake ? "RESTORE CONTAINMENT" : "BREAK THE SEAL";

  if (relicAwake) {
    playAwakenSound();
    showToast("Living core awakened · Signal strength rising");
  } else {
    playTone(145, 0.28, "triangle", 0.025);
    playTone(72, 0.38, "sine", 0.03, 0.12);
    showToast("Containment restored · Artifact dormant");
  }
}

function openArchive() {
  archiveIndex.classList.add("is-open");
  archiveBackdrop.classList.add("is-open");
  archiveIndex.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  playTone(220, 0.1, "triangle", 0.018);
}

function closeArchive() {
  archiveIndex.classList.remove("is-open");
  archiveBackdrop.classList.remove("is-open");
  archiveIndex.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function updateLayerDetail(layerKey) {
  const detail = layerDetails[layerKey];
  const panel = document.querySelector("#layerDetail");
  const swatches = panel.querySelectorAll(".detail-swatch i");
  panel.querySelector(".detail-number").textContent = detail.number;
  panel.querySelector("h3").textContent = detail.title;
  panel.querySelector(":scope > p").textContent = detail.description;
  const values = panel.querySelectorAll("dd");
  values[0].textContent = detail.role;
  values[1].textContent = detail.material;
  values[2].textContent = detail.behavior;
  swatches.forEach((swatch, index) => {
    swatch.style.background = detail.colors[index];
  });
  document.querySelector("#explodedView").dataset.focus = layerKey;
  playTone(160 + Object.keys(layerDetails).indexOf(layerKey) * 45, 0.08, "triangle", 0.016);
}

function updateScrollState() {
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = documentHeight > 0 ? window.scrollY / documentHeight : 0;
  scrollProgress.style.height = `${Math.min(100, Math.max(0, progress * 100))}%`;

  const sections = [...document.querySelectorAll("[data-section]")];
  let current = "00";
  sections.forEach((section) => {
    const bounds = section.getBoundingClientRect();
    if (bounds.top <= window.innerHeight * 0.45) {
      current = section.dataset.section;
    }
  });
  sectionCode.textContent = current;
}

function setupRevealObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.13 },
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("pointermove", (event) => {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  pointer.active = true;
});
window.addEventListener("pointerleave", () => {
  pointer.active = false;
});

relicStage.addEventListener("pointermove", (event) => {
  if (reducedMotion) return;
  const bounds = relicStage.getBoundingClientRect();
  const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
  const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;
  relicStage.querySelectorAll(".parallax-layer").forEach((layer) => {
    const depth = Number(layer.dataset.depth || 0.05);
    layer.style.translate = `${normalizedX * depth * 130}px ${normalizedY * depth * 130}px`;
  });
});

relicStage.addEventListener("pointerleave", () => {
  relicStage.querySelectorAll(".parallax-layer").forEach((layer) => {
    layer.style.translate = "0 0";
  });
});

awakenButton.addEventListener("click", () => setRelicState(!relicAwake));

soundToggle.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  soundToggle.setAttribute("aria-pressed", String(soundEnabled));
  soundToggle.querySelector("span").textContent = soundEnabled ? "SOUND ON" : "SOUND OFF";
  if (soundEnabled) {
    createAudioContext();
    playTone(260, 0.08, "triangle", 0.02);
    playTone(390, 0.12, "sine", 0.016, 0.06);
  }
});

document.querySelector("#openIndex").addEventListener("click", openArchive);
document.querySelector("#closeIndex").addEventListener("click", closeArchive);
archiveBackdrop.addEventListener("click", closeArchive);
archiveIndex.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeArchive));

document.querySelectorAll(".layer-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".layer-button").forEach((item) => item.classList.toggle("is-active", item === button));
    updateLayerDetail(button.dataset.layer);
  });
});

document.querySelectorAll("[data-tab]").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll("[data-tab]").forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
    const content = tabDetails[tab.dataset.tab];
    const panel = document.querySelector("#orbitalPanel");
    panel.querySelector(".panel-index").textContent = content.index;
    panel.querySelector("strong").textContent = content.title;
    panel.querySelector("p").textContent = content.description;
    playTone(180 + Number(content.index) * 42, 0.08, "triangle", 0.014);
  });
});

document.querySelectorAll(".segmented-control button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".segmented-control button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    playTone(210, 0.06, "square", 0.008);
  });
});

document.querySelectorAll(".bone-icon, .specimen-chip").forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("is-active");
    playTone(button.classList.contains("is-active") ? 280 : 160, 0.06, "triangle", 0.012);
  });
});

document.querySelectorAll(".relic-alert > button").forEach((button) => {
  button.addEventListener("click", () => {
    const alert = button.closest(".relic-alert");
    alert.classList.add("is-dismissed");
    playTone(120, 0.08, "sine", 0.01);
    window.setTimeout(() => alert.remove(), 220);
  });
});

document.querySelectorAll("[data-toast]").forEach((button) => {
  button.addEventListener("click", () => showToast(button.dataset.toast));
});

toast.querySelector("button").addEventListener("click", () => {
  window.clearTimeout(toastTimer);
  toast.classList.remove("is-visible");
});

document.querySelector("#openDialog").addEventListener("click", () => {
  containmentDialog.showModal();
  playTone(115, 0.25, "sine", 0.025);
  playTone(170, 0.22, "triangle", 0.015, 0.08);
});

containmentDialog.addEventListener("click", (event) => {
  if (event.target === containmentDialog) {
    containmentDialog.close("cancel");
  }
});

document.querySelectorAll(".vertebra-switch input").forEach((input) => {
  input.addEventListener("change", () => {
    playTone(input.checked ? 300 : 145, 0.07, "square", 0.008);
  });
});

const expressionRange = document.querySelector("#expressionRange");
const expressionOutput = document.querySelector("#expressionOutput");
expressionRange.addEventListener("input", () => {
  const value = Number(expressionRange.value);
  expressionOutput.value = `${value}%`;
  expressionOutput.textContent = `${value}%`;
  document.querySelector(".geometry-ring.one").style.scale = `${0.82 + value / 400}`;
  document.querySelector(".geometry-ring.two").style.scale = `${1.18 - value / 500}`;
});

document.querySelector("#finalAwaken").addEventListener("click", () => {
  document.querySelector("#artifact").scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  window.setTimeout(() => setRelicState(true), reducedMotion ? 0 : 650);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && archiveIndex.classList.contains("is-open")) {
    closeArchive();
    document.querySelector("#openIndex").focus();
  }
});

window.addEventListener("scroll", updateScrollState, { passive: true });

resizeCanvas();
drawParticles();
setupRevealObserver();
updateScrollState();
updateLayerDetail("shell");
document.querySelector(".hero-copy").classList.add("is-visible");
