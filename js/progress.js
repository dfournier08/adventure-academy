export function isWorldUnlocked(world, profile){
  if(profile.testingUnlockAll) return true;
  const u = world.unlock || {type:"always"};
  const completed = profile.completedWorlds || [];

  if(u.type === "always") return true;
  if(u.type === "glamPieces") return (profile.glamPieces || 0) >= u.count;
  if(u.type === "worldComplete") return completed.includes(u.world);
  if(u.type === "worldsComplete") return (u.worlds || []).every(id => completed.includes(id));
  if(u.type === "anyBadge") return (profile.badges || []).length >= u.count;
  return false;
}

export function unlockText(world){
  const u = world.unlock || {type:"always"};
  if(u.label) return u.label;
  if(u.type === "always") return "Open now";
  if(u.type === "glamPieces") return `Earn ${u.count} Glam Quest piece${u.count===1?"":"s"} to unlock`;
  if(u.type === "worldComplete") return `Complete ${u.world} world to unlock`;
  if(u.type === "worldsComplete") return "Complete the required worlds to unlock";
  if(u.type === "anyBadge") return `Earn ${u.count} badges anywhere in the Academy`;
  return "Complete the required challenge";
}

export function academyProgress(worlds, profile){
  const total = worlds.length;
  const complete = new Set(profile.completedWorlds || []).size;
  return {total,complete,pct:Math.round((complete/total)*100)};
}
