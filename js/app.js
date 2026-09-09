import { WORLDS } from "./worlds.js";
import { loadProfile, saveProfile, resetProfileKeepSettings } from "./storage.js";
import { isWorldUnlocked, unlockText, academyProgress } from "./progress.js";
import { initCloud } from "./firebase.js";

let profile=loadProfile();
const $=id=>document.getElementById(id);
const PIN_KEY="adventureAcademyAdultPin_v041";
const DEFAULT_PIN="2468";
const getPin=()=>localStorage.getItem(PIN_KEY)||DEFAULT_PIN;

function render(){
 $("welcomeName").textContent=`Welcome, ${profile.name}!`;
 $("pointsValue").textContent=profile.points||0;$("curiosityValue").textContent=profile.curiosity||0;
 const p=academyProgress(WORLDS,profile);$("academyProgressText").textContent=`${p.complete} of ${p.total} worlds completed`;$("academyProgressBar").style.width=`${p.pct}%`;
 renderWorlds();renderBadges();
}
function renderWorlds(){
 const grid=$("worldGrid");grid.innerHTML="";
 WORLDS.forEach(world=>{
  const unlocked=isWorldUnlocked(world,profile),complete=(profile.completedWorlds||[]).includes(world.id);
  const card=document.createElement("article");card.className=`world-card${unlocked?"":" locked"}`;
  card.innerHTML=`<div><div class="world-icon">${world.icon}</div>${world.category?`<div class="eyebrow">${world.category}</div>`:""}<h3>${world.name}</h3><strong>${world.skill}</strong><p>${world.description}</p></div>
  <div><div class="status">${complete?"✅ World Complete":unlocked?"🔓 Open":"🔒 Locked"}</div><div class="unlock-note">${complete?`Badge earned: ${world.badge}`:unlockText(world)}</div><div style="margin-top:12px"><button class="${unlocked?"primary-btn":"ghost-btn"}" ${unlocked?"":"disabled"}>${complete?"Visit Again":unlocked?"Enter World":"Locked"}</button></div></div>`;
  if(unlocked) card.querySelector("button").onclick=()=>location.href=world.path;grid.appendChild(card);
 });
}
function renderBadges(){
 const grid=$("badgeGrid");grid.innerHTML="";
 WORLDS.forEach(w=>{const e=(profile.badges||[]).includes(w.id),d=document.createElement("div");d.className=`badge${e?"":" locked"}`;d.innerHTML=`<div class="badge-icon">${w.icon}</div><strong>${w.badge}</strong><div class="small">${e?"Earned":"Locked"}</div>`;grid.appendChild(d)});
}
function openSettings(){
 $("playerNameInput").value=profile.name||"";$("grandPrizeInput").value=profile.grandPrize||"";
 $("unlockAllBtn").textContent=profile.testingUnlockAll?"Turn Off Test Unlock":"Unlock All Worlds";
 $("newPinInput").value="";$("settingsDialog").showModal();
}
$("grownUpBtn").onclick=()=>{$("pinInput").value="";$("pinError").textContent="";$("pinDialog").showModal();setTimeout(()=>$("pinInput").focus(),50)};
$("pinSubmitBtn").onclick=()=>{
 if($("pinInput").value===getPin()){$("pinDialog").close();openSettings()}
 else{$("pinError").textContent="That PIN did not match.";$("pinInput").value=""}
};
$("pinInput").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();$("pinSubmitBtn").click()}});
$("refreshBtn").onclick=()=>{profile=loadProfile();render()};
$("saveSettingsBtn").onclick=()=>{profile.name=$("playerNameInput").value.trim()||"Fashion Star";profile.grandPrize=$("grandPrizeInput").value.trim()||"Grand Adventure Prize";saveProfile(profile);$("settingsDialog").close();render()};
$("prizeCenterBtn").onclick=()=>location.href="prize-center.html#adult";
$("unlockAllBtn").onclick=()=>{profile.testingUnlockAll=!profile.testingUnlockAll;$("unlockAllBtn").textContent=profile.testingUnlockAll?"Turn Off Test Unlock":"Unlock All Worlds";saveProfile(profile);render()};
$("changePinBtn").onclick=()=>{const p=$("newPinInput").value.trim();if(!/^\d{4}$/.test(p)){alert("PIN must be exactly 4 digits.");return}localStorage.setItem(PIN_KEY,p);$("newPinInput").value="";alert("Grown-up PIN changed.")};
$("resetBtn").onclick=()=>{
 if(!confirm("WARNING: This will erase ALL Academy progress, badges, points, completed worlds, and saved unlocks on this device. Continue?"))return;
 if(prompt("Type RESET to confirm a full game reset.")!=="RESET"){alert("Reset canceled. No progress was changed.");return}
 profile=resetProfileKeepSettings(profile);$("settingsDialog").close();render();alert("Academy progress has been reset.");
};
initCloud().then(s=>$("cloudStatus").textContent=s.message);render();