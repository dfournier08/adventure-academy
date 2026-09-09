export const WORLDS = [
  {
    id:"glam",
    name:"Glam Quest",
    icon:"👗",
    skill:"Math • Reading • Logic",
    description:"Earn five glam pieces, build your final look, and collect prize tickets.",
    path:"worlds/glam/index.html",
    unlock:{type:"always"},
    badge:"Style Star"
  },
  {
    id:"leadership",
    name:"Leadership Academy",
    icon:"👑",
    skill:"Decisions • Teamwork • Responsibility",
    description:"Story-based choices that teach leadership, listening, ownership, and judgment.",
    path:"worlds/leadership/index.html",
    unlock:{type:"glamPieces",count:1},
    badge:"Team Leader"
  },
  {
    id:"detective",
    name:"Detective Academy",
    icon:"🕵️",
    skill:"Evidence • Clues • Critical Thinking",
    description:"Solve mysteries, sort useful clues from distractions, and explain your reasoning.",
    path:"worlds/detective/index.html",
    unlock:{type:"glamPieces",count:2},
    badge:"Sharp Detective"
  },
  {
    id:"code",
    name:"Code Quest",
    icon:"💻",
    skill:"Sequences • Loops • Debugging",
    description:"Program a character with visual commands, then grow toward real Roblox coding.",
    path:"worlds/code/index.html",
    unlock:{type:"glamPieces",count:3},
    badge:"Code Explorer"
  },
  {
    id:"science",
    name:"Science Lab",
    icon:"🔬",
    skill:"Predict • Test • Observe",
    description:"Run experiments and learn how scientists use evidence to understand the world.",
    path:"worlds/science/index.html",
    unlock:{type:"worldComplete",world:"detective"},
    badge:"Young Scientist"
  },
  {
    id:"business",
    name:"Business Boulevard",
    icon:"💰",
    skill:"Money • Budgeting • Business",
    description:"Run a boutique, manage inventory, set prices, and make smart money decisions.",
    path:"worlds/business/index.html",
    unlock:{type:"worldComplete",world:"leadership"},
    badge:"Mini CEO"
  },
  {
    id:"inventor",
    name:"Inventor Lab",
    icon:"⚙️",
    skill:"Design • Build • Test • Improve",
    description:"Solve engineering problems, test ideas, learn from failures, and redesign.",
    path:"worlds/inventor/index.html",
    unlock:{type:"worldComplete",world:"code"},
    badge:"Inventor"
  },
  {
    id:"grandpa",
    name:"Grandpa's Workshop",
    icon:"🛠️",
    skill:"Build It • Fix It • Invent It",
    description:"Unlock real projects to build together after planning and solving the challenge.",
    path:"worlds/grandpa/index.html",
    unlock:{type:"anyBadge",count:3},
    badge:"Grandpa Builder"
  }
];
