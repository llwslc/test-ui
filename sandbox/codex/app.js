const themes = [
  { id: "nova", group: "built", name: "NOVA", direction: "科幻霓虹 HUD / Sci-fi neon", tags: ["HUD", "NEON", "TACTICAL"], colors: ["#07131E", "#DFFBFF", "#13E7E0"], radius: "0" },
  { id: "abyss", group: "built", name: "ABYSS", direction: "克苏鲁深渊魔典 / Eldritch grimoire", tags: ["GRIMOIRE", "ELDRITCH", "INK"], colors: ["#07110E", "#E8D6AB", "#2AD1B1"], radius: "2px" },
  { id: "brass", group: "built", name: "BRASS", direction: "蒸汽朋克 / Steampunk", tags: ["BRASS", "STEAM", "GAUGE"], colors: ["#1E1A17", "#E4CE9D", "#B97735"], radius: "9px" },
  { id: "prism", group: "built", name: "PRISM", direction: "包豪斯构成 / Bauhaus", tags: ["BAUHAUS", "PRIMARY", "GRID"], colors: ["#F2EEDC", "#111111", "#E2362D"], radius: "0" },
  { id: "riot", group: "built", name: "RIOT", direction: "朋克剪报 / Punk zine", tags: ["ZINE", "COLLAGE", "NOISE"], colors: ["#DEDCD6", "#090909", "#FF4D00"], radius: "0" },
  { id: "hanabi", group: "built", name: "HANABI", direction: "二次元赛璐璐 / Anime cel", tags: ["ANIME", "CEL", "SPARK"], colors: ["#DDF3FF", "#1D2E5B", "#FF5B9D"], radius: "16px" },
  { id: "sumi", group: "candidate", name: "SUMI", direction: "水墨禅 / Zen ink", tags: ["INK", "PAPER", "ZEN"], colors: ["#EFEADE", "#171613", "#A33A2B"], radius: "0" },
  { id: "ormolu", group: "candidate", name: "ORMOLU", direction: "洛可可宫廷 / Rococo", tags: ["ROCOCO", "GILT", "SILK"], colors: ["#EEE8DC", "#3A2C2E", "#9A7731"], radius: "22px" },
  { id: "nocturne", group: "candidate", name: "NOCTURNE", direction: "暗夜花园 / Dark botanical", tags: ["BOTANICAL", "VELVET", "NIGHT"], colors: ["#160F18", "#F0E5D5", "#B38A4F"], radius: "4px" },
  { id: "pulp", group: "candidate", name: "PULP", direction: "复古廉价小说 / Pulp paperback", tags: ["PAPERBACK", "STAMP", "HALFTONE"], colors: ["#E3CC98", "#172C2B", "#AA372B"], radius: "0" },
  { id: "totem", group: "candidate", name: "TOTEM", direction: "民艺图腾 / Folk craft", tags: ["FOLK", "WEAVE", "WOODCUT"], colors: ["#D9C39E", "#1D3F50", "#A94431"], radius: "2px" },
  { id: "kiln", group: "candidate", name: "KILN", direction: "陶土侘寂 / Wabi-sabi", tags: ["CLAY", "KILN", "WABI-SABI"], colors: ["#D8CCB6", "#2E2A25", "#B65D3F"], radius: "14px" },
  { id: "chrome", group: "candidate", name: "CHROME", direction: "千禧液态铬 / Y2K aero", tags: ["Y2K", "LIQUID", "AERO"], colors: ["#B7D5E8", "#26324B", "#2B78D4"], radius: "24px" },
  { id: "arcade", group: "candidate", name: "ARCADE", direction: "8-bit 街机 / Retro arcade", tags: ["8-BIT", "CRT", "PLAYABLE"], colors: ["#080812", "#F4F5DF", "#12E0D0"], radius: "0" },
  { id: "bitmap", group: "candidate", name: "BITMAP", direction: "1-bit 位图 / One-bit dither", tags: ["1-BIT", "DITHER", "DESKTOP"], colors: ["#FFFFFF", "#000000", "#000000"], radius: "0" },
  { id: "mochi", group: "candidate", name: "MOCHI", direction: "软陶泡芙 / Claymorphic squish", tags: ["CLAY", "SQUISH", "SWEET"], colors: ["#FFF2E5", "#523B34", "#EE7F9E"], radius: "24px" },
  { id: "scribble", group: "candidate", name: "SCRIBBLE", direction: "手账涂鸦 / Notebook doodle", tags: ["NOTEBOOK", "DOODLE", "STICKER"], colors: ["#F9F6E8", "#153F7D", "#EE598D"], radius: "5px" },
  { id: "axon", group: "candidate", name: "AXON", direction: "轴测蓝图 / Isometric blueprint", tags: ["BLUEPRINT", "ISOMETRIC", "MEASURE"], colors: ["#204B5A", "#EBF4EF", "#F28B47"], radius: "0" },
  { id: "corona", group: "candidate", name: "CORONA", direction: "日蚀玻璃 / Eclipse glass", tags: ["ECLIPSE", "GLASS", "ORBIT"], colors: ["#080D12", "#EDF2F4", "#E6A543"], radius: "18px" },
  { id: "reliquary", group: "candidate", name: "RELIQUARY", direction: "未来圣骸 / Future reliquary", tags: ["BIORELIC", "LIVING", "ARCHIVE"], colors: ["#050807", "#E9E2CF", "#A8FF57"], radius: "0" },
  { id: "gazette", group: "candidate", name: "GAZETTE", direction: "报章排印 / Broadsheet", tags: ["NEWS", "TYPE", "EDITORIAL"], colors: ["#E9E4D7", "#171717", "#234B74"], radius: "0" },
];

const directory = document.querySelector("#themeDirectory");
const search = document.querySelector("#themeSearch");
const preview = document.querySelector("#themePreview");
const loading = document.querySelector("#previewLoading");
const sidebar = document.querySelector("#sidebar");
const backdrop = document.querySelector("#sidebarBackdrop");
let activeIndex = 0;

function pad(index) {
  return String(index + 1).padStart(2, "0");
}

function createThemeButton(theme, index) {
  const button = document.createElement("button");
  button.className = "theme-link";
  button.type = "button";
  button.dataset.themeId = theme.id;
  button.setAttribute("aria-current", String(index === activeIndex));
  button.style.setProperty("--canvas", theme.colors[0]);
  button.style.setProperty("--ink", theme.colors[1]);
  button.style.setProperty("--swatch", theme.colors[2]);
  button.style.setProperty("--radius", theme.radius);
  button.innerHTML = `<span>${pad(index)}</span><i aria-hidden="true"></i><span><strong>${theme.name}</strong><small>${theme.direction.split(" / ")[0]}</small></span>`;
  button.addEventListener("click", () => selectTheme(index));
  return button;
}

function renderDirectory(query = "") {
  const normalized = query.trim().toLowerCase();
  directory.replaceChildren();
  const matches = themes
    .map((theme, index) => ({ theme, index }))
    .filter(({ theme }) => `${theme.name} ${theme.direction} ${theme.tags.join(" ")}`.toLowerCase().includes(normalized));

  const section = document.createElement("section");
  section.className = "directory-group";
  const label = document.createElement("span");
  label.textContent = `ALL DIRECTIONS / ${String(matches.length).padStart(2, "0")}`;
  section.append(label);
  matches.forEach(({ theme, index }) => section.append(createThemeButton(theme, index)));
  directory.append(section);

  if (!matches.length) {
    section.remove();
    const empty = document.createElement("p");
    empty.className = "theme-empty";
    empty.textContent = "No matching world";
    directory.append(empty);
  }
}

function selectTheme(index, preserveHash = false) {
  activeIndex = (index + themes.length) % themes.length;
  const theme = themes[activeIndex];
  loading.classList.add("is-visible");
  preview.src = `${theme.id}/`;
  preview.title = `${theme.name} / ${theme.direction}`;
  document.querySelector("#activeIndex").textContent = pad(activeIndex);
  document.querySelector("#activeName").textContent = theme.name;
  document.querySelector("#activeDirection").textContent = theme.direction;
  document.querySelector("#atlasCount").textContent = `${pad(activeIndex)} / ${themes.length}`;
  document.querySelector("#openStandalone").href = `${theme.id}/`;
  document.querySelector("#directionTags").replaceChildren(...theme.tags.map((tag) => {
    const span = document.createElement("span");
    span.textContent = tag;
    return span;
  }));
  document.title = `${theme.name} / KIT Theme Atlas`;

  document.querySelectorAll(".theme-link").forEach((item) => {
    item.setAttribute("aria-current", String(item.dataset.themeId === theme.id));
  });
  directory.querySelector(`[data-theme-id="${theme.id}"]`)?.scrollIntoView({ block: "nearest" });

  if (!preserveHash) history.replaceState(null, "", `#${theme.id}`);
  localStorage.setItem("kit-atlas-theme", theme.id);
  closeSidebar();
}

function openSidebar() {
  sidebar.classList.add("is-open");
  backdrop.classList.add("is-open");
}

function closeSidebar() {
  sidebar.classList.remove("is-open");
  backdrop.classList.remove("is-open");
}

search.addEventListener("input", () => renderDirectory(search.value));
preview.addEventListener("load", () => loading.classList.remove("is-visible"));
document.querySelector("#previousTheme").addEventListener("click", () => selectTheme(activeIndex - 1));
document.querySelector("#nextTheme").addEventListener("click", () => selectTheme(activeIndex + 1));
document.querySelector("#openSidebar").addEventListener("click", openSidebar);
document.querySelector("#closeSidebar").addEventListener("click", closeSidebar);
backdrop.addEventListener("click", closeSidebar);

document.addEventListener("keydown", (event) => {
  const typing = document.activeElement instanceof HTMLInputElement;
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openSidebar();
    search.focus();
    search.select();
    return;
  }
  if (event.key === "Escape") {
    closeSidebar();
    return;
  }
  if (!typing && ["ArrowLeft", "ArrowRight"].includes(event.key)) {
    event.preventDefault();
    selectTheme(activeIndex + (event.key === "ArrowRight" ? 1 : -1));
  }
});

window.addEventListener("hashchange", () => {
  const index = themes.findIndex((theme) => theme.id === location.hash.slice(1).toLowerCase());
  if (index >= 0) selectTheme(index, true);
});

renderDirectory();
const requested = location.hash.slice(1).toLowerCase() || localStorage.getItem("kit-atlas-theme") || "nova";
const initialIndex = themes.findIndex((theme) => theme.id === requested);
selectTheme(initialIndex >= 0 ? initialIndex : 0, initialIndex >= 0);
