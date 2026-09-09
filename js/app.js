import { WORLDS } from "./worlds.js";
import { loadProfile, saveProfile, resetProfileKeepSettings } from "./storage.js";
import { isWorldUnlocked, unlockText, academyProgress } from "./progress.js";
import { initCloud } from "./firebase.js";

let profile = loadProfile();

const $ = (id)=>document.getElementById(id);

function render(){
  $("welcomeName").textContent = `Welcome, ${profile.name}!`;
  $("pointsValue").textContent = profile.points || 0;
  $("curiosityValue").textContent = profile.curiosity || 0;

  const progress = academyProgress(WORLDS, profile);
  $("academyProgressText").textContent = `${progress.complete} of ${progress.total} worlds completed`;
  $("academyProgressBar").style.width = `${progress.pct}%`;

  renderWorlds();
  renderBadges();
}

function renderWorlds(){
  const grid = $("worldGrid");
  grid.innerHTML = "";

  WORLDS.forEach(world=>{
    const unlocked = isWorldUnlocked(world, profile);
    const complete = (profile.completedWorlds || []).includes(world.id);
    const card = document.createElement("article");
    card.className = `world-card${unlocked ? "" : " locked"}`;

    card.innerHTML = `
      <div>
        <div class="world-icon">${world.icon}</div>
        <div class="world-tag">${world.category || "ADVENTURE WORLD"}</div>
        <h3>${world.name}</h3>
        <strong>${world.skill}</strong>
        <p>${world.description}</p>
      </div>
      <div>
        <div class="status">${complete ? "✅ World Complete" : unlocked ? "🔓 Open" : "🔒 Locked"}</div>
        <div class="unlock-note">${complete ? `Badge earned: ${world.badge}` : unlockText(world)}</div>
        <div style="margin-top:12px">
          <button class="${unlocked ? "primary-btn" : "ghost-btn"}" ${unlocked ? "" : "disabled"}>
            ${complete ? "Visit Again" : unlocked ? "Enter World" : "Locked"}
          </button>
        </div>
      </div>
    `;

    const btn = card.querySelector("button");
    if(unlocked){
      btn.addEventListener("click", ()=>window.location.href = world.path);
    }
    grid.appendChild(card);
  });
}

function renderBadges(){
  const grid = $("badgeGrid");
  grid.innerHTML = "";
  WORLDS.forEach(world=>{
    const earned = (profile.badges || []).includes(world.id);
    const item = document.createElement("div");
    item.className = `badge${earned ? "" : " locked"}`;
    item.innerHTML = `<div class="badge-icon">${world.icon}</div><strong>${world.badge}</strong><div class="small">${earned ? "Earned" : "Locked"}</div>`;
    grid.appendChild(item);
  });
}

function openSettings(){
  $("playerNameInput").value = profile.name || "";
  $("grandPrizeInput").value = profile.grandPrize || "";
  $("settingsDialog").showModal();
}

$("settingsBtn").addEventListener("click", openSettings);
$("refreshBtn").addEventListener("click", ()=>{ profile = loadProfile(); render(); });

$("saveSettingsBtn").addEventListener("click", ()=>{
  profile.name = $("playerNameInput").value.trim() || "Fashion Star";
  profile.grandPrize = $("grandPrizeInput").value.trim() || "Grand Adventure Prize";
  saveProfile(profile);
  $("settingsDialog").close();
  render();
});

$("unlockAllBtn").addEventListener("click", ()=>{
  profile.testingUnlockAll = !profile.testingUnlockAll;
  $("unlockAllBtn").textContent = profile.testingUnlockAll ? "Turn Off Test Unlock" : "Unlock All Worlds";
  saveProfile(profile);
  render();
});

$("resetBtn").addEventListener("click", ()=>{
  if(confirm("Reset Academy progress? Player name and grand prize will be kept.")){
    profile = resetProfileKeepSettings(profile);
    $("settingsDialog").close();
    render();
  }
});

initCloud().then(status=>{
  $("cloudStatus").textContent = status.message;
});

render();
