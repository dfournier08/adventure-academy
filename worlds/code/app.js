import { CODE_SECTIONS, CODE_PUZZLES } from "./data.js";

const KEY="codeQuestV1";
const SHARED="adventureAcademyProfile_v01";
let state={
  points:0,completed:[false,false,false,false,false],best:Array(5).fill(0),
  currentSection:0,currentIndex:0,program:[],hints:0,solves:0,
  practiceNeeded:{},autoRead:false
};
try{state={...state,...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch(e){}
let currentPuzzle=null,solveTimer=null,solveUnlocked=false,usedSolveThisAttempt=false,practiceMode=false;
const $=id=>document.getElementById(id);

function save(){localStorage.setItem(KEY,JSON.stringify(state));renderStats()}
function renderStats(){$("points").textContent=state.points;$("sectionsDone").textContent=state.completed.filter(Boolean).length;$("hintsStat").textContent=state.hints;$("solvesStat").textContent=state.solves}
window.showScreen=id=>{document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));$(id).classList.add("active");window.scrollTo(0,0);if(state.autoRead)setTimeout(()=>speakPage(),250)}
window.showMap=()=>{renderMap();showScreen("map")}
function renderMap(){
 const g=$("sectionGrid");g.innerHTML="";
 CODE_SECTIONS.forEach((s,i)=>{
  const unlocked=i===0||state.completed[i-1]||state.completed[i];
  const c=document.createElement("div");c.className="card"+(unlocked?"":" locked");
  c.innerHTML=`<h3>${i+1}. ${s.title.replace(/^Section \d+: /,"")}</h3><p>${s.description}</p><p><strong>${state.completed[i]?"✅ Complete":unlocked?"🔓 Ready":"🔒 Locked"}</strong></p><button class="btn" ${unlocked?"":"disabled"}>${state.completed[i]?"Replay":"Start"}</button>`;
  if(unlocked)c.querySelector("button").onclick=()=>startSection(i);g.appendChild(c);
 });
}
function startSection(sec){state.currentSection=sec;state.currentIndex=0;loadPuzzle()}
function sectionPuzzles(sec){return CODE_PUZZLES.filter(p=>p.section===sec)}
function keyFor(p){return `${p.section}-${p.num}`}
function loadPuzzle(){
 const list=sectionPuzzles(state.currentSection);
 if(state.currentIndex>=list.length){finishSection();return}
 currentPuzzle=list[state.currentIndex];state.program=[];usedSolveThisAttempt=false;solveUnlocked=false;practiceMode=!!state.practiceNeeded[keyFor(currentPuzzle)];
 if(solveTimer)clearInterval(solveTimer);
 $("gameTitle").textContent=CODE_SECTIONS[state.currentSection].title+` — Challenge ${state.currentIndex+1}/10`;
 $("progressBar").style.width=`${state.currentIndex*10}%`;
 $("prompt").textContent=currentPuzzle.prompt;
 $("feedback").textContent="";$("hintBox").innerHTML="";$("solveBox").innerHTML="";
 $("solveBtn").disabled=true;$("solveBtn").textContent="🧩 Show Me How";
 $("practiceBanner").innerHTML=practiceMode?'<div class="practice">🔁 Practice Try — solve this one independently to earn the points.</div>':"";
 renderBoard();renderProgram();renderCommands();showScreen("game");
 if(state.autoRead)setTimeout(()=>speakQuestion(),300)
}
function renderBoard(){
 const b=$("board"),rows=currentPuzzle.rows,cols=Math.max(...rows.map(r=>r.length));b.style.gridTemplateColumns=`repeat(${cols},1fr)`;b.innerHTML="";
 let [sr,sc,dir]=currentPuzzle.start; const arrows=["⬆️","➡️","⬇️","⬅️"];
 rows.forEach((row,r)=>{for(let c=0;c<cols;c++){const ch=row[c]||"#",d=document.createElement("div");d.className="cell"+(ch==="#"?" wall":"")+(r===currentPuzzle.goal[0]&&c===currentPuzzle.goal[1]?" goal":"")+(ch==="G"?" gem":"");d.textContent=r===sr&&c===sc?arrows[dir]:ch==="#"?"":(r===currentPuzzle.goal[0]&&c===currentPuzzle.goal[1]?"⭐":ch==="G"?"💎":"");b.appendChild(d)}})
}
function label(cmd){return {MOVE:"⬆ MOVE",LEFT:"↩ LEFT",RIGHT:"↪ RIGHT",REPEAT2:"🔁 REPEAT 2",REPEAT3:"🔁 REPEAT 3",IF_GEM:"❓ IF GEM",COLLECT:"💎 COLLECT"}[cmd]||cmd}
function renderProgram(){const p=$("program");p.innerHTML="";state.program.forEach((c,i)=>{let x=document.createElement("button");x.className="chip";x.textContent=label(c);x.onclick=()=>{state.program.splice(i,1);renderProgram()};p.appendChild(x)})}
function renderCommands(){const c=$("commandBar");c.innerHTML="";currentPuzzle.allowed.forEach(cmd=>{let b=document.createElement("button");b.className="commandBtn";b.textContent=label(cmd);b.onclick=()=>{state.program.push(cmd);renderProgram()};c.appendChild(b)})}
window.undoCommand=()=>{state.program.pop();renderProgram()};window.clearProgram=()=>{state.program=[];renderProgram()}
function expand(program){
 let out=[];
 for(let i=0;i<program.length;i++){let c=program[i];if(c==="REPEAT2"||c==="REPEAT3"){let n=c==="REPEAT2"?2:3,next=program[++i];if(next)for(let k=0;k<n;k++)out.push(next)}else out.push(c)}
 return out;
}
function simulate(program){
 let [r,c,d]=currentPuzzle.start,gemCollected=false,lastIf=false,rows=currentPuzzle.rows;
 for(const cmd of expand(program)){
  if(cmd==="LEFT"){d=(d+3)%4;continue} if(cmd==="RIGHT"){d=(d+1)%4;continue}
  if(cmd==="IF_GEM"){lastIf=(rows[r]?.[c]==="G");continue}
  if(cmd==="COLLECT"){if(lastIf||rows[r]?.[c]==="G")gemCollected=true;continue}
  if(cmd==="MOVE"){let nr=r+[ -1,0,1,0][d],nc=c+[0,1,0,-1][d];if(nr<0||nc<0||nr>=rows.length||nc>=(rows[nr]?.length||0)||rows[nr][nc]==="#")return {ok:false,reason:"The explorer bumped into a wall or edge."};r=nr;c=nc}
 }
 let atGoal=r===currentPuzzle.goal[0]&&c===currentPuzzle.goal[1];
 let gemOk=!currentPuzzle.gem||gemCollected;
 return {ok:atGoal&&gemOk,reason:!atGoal?"The explorer did not reach the star.":!gemOk?"The gem was not collected.":"Success!"};
}
window.runProgram=()=>{
 const result=simulate(state.program);
 if(result.ok){
   const k=keyFor(currentPuzzle);
   if(usedSolveThisAttempt){
     state.practiceNeeded[k]=true;$("feedback").textContent="✅ You reached the goal. Because Show Me How was used, this challenge will return as a Practice Try so you can earn the points independently.";
   } else {
     let firstIndependent=!!state.practiceNeeded[k];
     if(firstIndependent) delete state.practiceNeeded[k];
     state.points+=10;
     $("feedback").textContent=practiceMode?"🌟 You solved the practice try independently! +10 points":"🌟 Program works! +10 points";
   }
   save();setTimeout(()=>{state.currentIndex++;loadPuzzle()},1200);
 }else{$("feedback").textContent="💡 "+result.reason+" Change your program and try again."}
}
window.useHint=()=>{
 state.hints++;save();$("hintBox").innerHTML=`<div class="helpBox"><strong>Hint:</strong> ${currentPuzzle.hint}<br><span id="countdown" class="tiny">Show Me How unlocks in 3:00.</span></div>`;
 let seconds=180;solveUnlocked=false;$("solveBtn").disabled=true;
 if(solveTimer)clearInterval(solveTimer);
 solveTimer=setInterval(()=>{seconds--;let m=Math.floor(seconds/60),s=seconds%60;const el=$("countdown");if(el)el.textContent=`Show Me How unlocks in ${m}:${String(s).padStart(2,"0")}.`;if(seconds<=0){clearInterval(solveTimer);solveUnlocked=true;$("solveBtn").disabled=false;$("solveBtn").textContent="🧩 Show Me How"}},1000);
}
window.showSolve=()=>{
 if(!solveUnlocked)return;usedSolveThisAttempt=true;state.solves++;state.practiceNeeded[keyFor(currentPuzzle)]=true;save();
 $("solveBox").innerHTML=`<div class="helpBox"><strong>How to solve it:</strong> ${currentPuzzle.explain}<br><br><strong>One working program:</strong><br>${currentPuzzle.solution.map(label).join(" → ")}<br><br>This problem will come back later as a Practice Try. Solve it independently then to earn the points.</div>`;
}
function finishSection(){
 state.completed[state.currentSection]=true;save();
 $("sectionSummary").textContent=`You completed ${CODE_SECTIONS[state.currentSection].title}.`;
 $("ticketText").textContent=`Section ${state.currentSection+1} complete. Hints used so far: ${state.hints}. Show Me How used so far: ${state.solves}.`;
 if(state.completed.every(Boolean)){finishWorld()}else showScreen("sectionComplete")
}
function finishWorld(){
 let shared={name:"Fashion Star",points:0,curiosity:0,completedWorlds:[],badges:[]};try{shared={...shared,...JSON.parse(localStorage.getItem(SHARED)||"{}")}}catch(e){}
 if(!shared.completedWorlds.includes("code"))shared.completedWorlds.push("code");if(!shared.badges.includes("code"))shared.badges.push("code");
 shared.points=(shared.points||0)+state.points;shared.curiosity=(shared.curiosity||0)+10;localStorage.setItem(SHARED,JSON.stringify(shared));
 let reward="World Prize";try{const p=JSON.parse(localStorage.getItem("academyPrizeCenter_v04")||"{}");reward=p.worldRewards?.["Code Quest"]||reward}catch(e){}
 $("worldPoints").textContent=state.points;$("worldPrize").textContent=reward;showScreen("worldComplete")
}
window.speakQuestion=()=>speak(currentPuzzle?`${CODE_SECTIONS[state.currentSection].title}. ${currentPuzzle.prompt} Build your program using the command buttons, then press run.`:"Code Quest")
window.speakPage=()=>{const active=document.querySelector(".screen.active");speak(active?active.innerText.replace(/\s+/g," ").slice(0,1400):"Code Quest")}
function speak(text){if(!("speechSynthesis"in window))return;window.speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(text);u.rate=.92;u.pitch=1.05;window.speechSynthesis.speak(u)}
window.openSettings=()=>{$("autoRead").checked=!!state.autoRead;$("settingsDlg").showModal()}
$("autoRead").onchange=e=>{state.autoRead=e.target.checked;save()}
renderStats();
