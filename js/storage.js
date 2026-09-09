const KEY = "adventureAcademyProfile_v01";

export function defaultProfile(){
  return {
    name:"Fashion Star",
    points:0,
    curiosity:0,
    grandPrize:"Grand Adventure Prize",
    glamPieces:0,
    completedWorlds:[],
    badges:[],
    testingUnlockAll:false,
    createdAt:new Date().toISOString()
  };
}

export function loadProfile(){
  const fallback = defaultProfile();
  try{
    const raw = localStorage.getItem(KEY);
    if(!raw) return fallback;
    return {...fallback,...JSON.parse(raw)};
  }catch{
    return fallback;
  }
}

export function saveProfile(profile){
  localStorage.setItem(KEY, JSON.stringify(profile));
}

export function resetProfileKeepSettings(profile){
  const fresh = defaultProfile();
  fresh.name = profile.name || fresh.name;
  fresh.grandPrize = profile.grandPrize || fresh.grandPrize;
  saveProfile(fresh);
  return fresh;
}
