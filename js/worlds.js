export const WORLDS = [
  {
    id:"glam",
    name:"Glam Quest",
    icon:"👗",
    category:"CORE WORLD",
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
    category:"THINKING WORLD",
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
    category:"THINKING WORLD",
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
    category:"CREATOR WORLD",
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
    category:"DISCOVERY WORLD",
    skill:"Predict • Test • Observe",
    description:"Run experiments and learn how scientists use evidence to understand the world.",
    path:"worlds/science/index.html",
    unlock:{type:"worldComplete",world:"detective",label:"Complete Detective Academy to unlock"},
    badge:"Young Scientist"
  },
  {
    id:"business",
    name:"Business Boulevard",
    icon:"💰",
    category:"LIFE-SKILLS WORLD",
    skill:"Money • Budgeting • Business",
    description:"Run a boutique, manage inventory, set prices, and make smart money decisions.",
    path:"worlds/business/index.html",
    unlock:{type:"worldComplete",world:"leadership",label:"Complete Leadership Academy to unlock"},
    badge:"Mini CEO"
  },
  {
    id:"inventor",
    name:"Inventor Lab",
    icon:"⚙️",
    category:"CREATOR WORLD",
    skill:"Design • Build • Test • Improve",
    description:"Solve engineering problems, test ideas, learn from failures, and redesign.",
    path:"worlds/inventor/index.html",
    unlock:{type:"worldComplete",world:"code",label:"Complete Code Quest to unlock"},
    badge:"Inventor"
  },
  {
    id:"grandpa",
    name:"Grandpa's Workshop",
    icon:"🛠️",
    category:"REAL-WORLD WORKSHOP",
    skill:"Build It • Fix It • Invent It",
    description:"Turn Academy skills into hands-on build, repair, and invention challenges with Grandpa.",
    path:"worlds/grandpa/index.html",
    unlock:{type:"anyBadge",count:3},
    badge:"Grandpa Builder"
  },
  {
    id:"grandma",
    name:"Grandma's Creative Workshop",
    icon:"🧶",
    category:"REAL-WORLD WORKSHOP",
    skill:"Craft It • Make It • Grow It • Give It",
    description:"Use creativity, planning, measurement, patterns, cooking, growing, and making with Grandma.",
    path:"worlds/grandma/index.html",
    unlock:{type:"anyBadge",count:3},
    badge:"Creative Maker"
  },
  {
    id:"family",
    name:"Family Super Challenges",
    icon:"🌟",
    category:"SPECIAL BOSS CHALLENGE",
    skill:"Build • Create • Research • Share",
    description:"Big real-world missions that combine skills from the Academy with Grandma and Grandpa together.",
    path:"worlds/family/index.html",
    unlock:{type:"worldsComplete",worlds:["grandpa","grandma"],label:"Complete both Grandma's and Grandpa's Workshops to unlock"},
    badge:"Family Super Builder"
  }
];
