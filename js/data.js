const wEngines = [
    {name: "default"},

    {name: "Ice-Jade_Teapot", rarity:"s"},
    {name: "Riot_Suppressor_Mark_VI", rarity: "s"},
    {name: "Deep_Sea_Visitor", rarity: "s"},
    {name: "Fusion_Compiler", rarity: "s"},
    {name: "Hellfire_Gears", rarity: "s"},
    {name: "Steel_Cushion", rarity: "s"},
    {name: "The_Brimstone", rarity: "s"},
    {name: "The_Restrained", rarity: "s"},
    {name: "Weeping_Cradle", rarity: "s"},
    
    {name: "Bashful_Demon", rarity: "a"},
    {name: "Big_Cylinder", rarity: "a"},
    {name: "Bunny_Band", rarity: "a"},
    {name: "Cannon_Rotor", rarity: "a"},
    {name: "Demara_Battery_Mark_II", rarity: "a"},
    {name: "Drill_Rig_-_Red_Axis", rarity: "a"},
    {name: "Electro-Lip_Gloss", rarity: "a"},
    {name: "Housekeeper", rarity: "a"},
    {name: "Kaboom_the_Cannon", rarity: "a"},
    {name: "Original_Transmorpher", rarity: "a"},
    {name: "Precious_Fossilized_Core", rarity: "a"},
    {name: "Rainforest_Gourmet", rarity: "a"},
    {name: "Roaring_Ride", rarity: "a"},
    {name: "Six_Shooter", rarity: "a"},
    {name: "Slice_of_Time", rarity: "a"},
    {name: "Spring_Embrace", rarity: "a"},
    {name: "Starlight_Engine", rarity: "a"},
    {name: "Starlight_Engine_Replica", rarity: "a"},
    {name: "Steam_Oven", rarity: "a"},
    {name: "Street_Superstar", rarity: "a"},
    {name: "The_Vault", rarity: "a"},
    {name: "Unfettered_Game_Ball", rarity: "a"},
    {name: "Weeping_Gemini", rarity: "a"},

    {name: "[Identity]_Base", rarity: "b"},
    {name: "[Identity]_Inflection", rarity: "b"},
    {name: "[Lunar]_Decrescent", rarity: "b"},
    {name: "[Lunar]_Noviluna", rarity: "b"},
    {name: "[Lunar]_Pleniluna", rarity: "b"},
    {name: "[Magnetic_Storm]_Alpha", rarity: "b"},
    {name: "[Magnetic_Storm]_Bravo", rarity: "b"},
    {name: "[Magnetic_Storm]_Charlie", rarity: "b"},
    {name: "[Reverb]_Mark_I", rarity: "b"},
    {name: "[Reverb]_Mark_II", rarity: "b"},
    {name: "[Reverb]_Mark_III", rarity: "b"},
    {name: "[Vortex]_Arrow", rarity: "b"},
    {name: "[Vortex]_Hatchet", rarity: "b"},
    {name: "[Vortex]_Revolver", rarity: "b"}
];


const bangboos = [
    {name: "amillion", rarity: "s"},
    {name: "bangvolver", rarity: "s"},
    {name: "butler", rarity: "s"},
    {name: "plugboo", rarity: "s"},
    {name: "rocketboo", rarity: "s"},
    {name: "safety", rarity: "s"},
    {name: "sharkboo", rarity: "s"},

    {name: "avocaboo", rarity: "a"},
    {name: "bagboo", rarity: "a"},
    {name: "boollseye", rarity: "a"},
    {name: "booressure", rarity: "a"},
    {name: "cryboo", rarity: "a"},
    {name: "devilboo", rarity: "a"},
    {name: "electroboo", rarity: "a"},
    {name: "exploreboo", rarity: "a"},
    {name: "luckyboo", rarity: "a"},
    {name: "magnetiboo", rarity: "a"},
    {name: "paperboo", rarity: "a"},
    {name: "penguinboo", rarity: "a"},
    {name: "resonaboo", rarity: "a"},
    {name: "sumoboo", rarity: "a"}
];

const driveDisks = ["chaotic_metal", "fanged_metal", "freedom_blues", "hormone_punk",
    "inferno_metal", "polar_metal", "puffer_electro", "shockstar_disco", "soul_rock",
    "swin_jazz", "thunder_metal", "woodpecker_electro"
];

const diskStats = [
    {
        number: "IV",
        stats: ["ATK %", "HP %", "DEF %", "CRIT Rate", "CRIT DMG%","ANOMALY"],
        short_stat: ["ATK %", "HP %", "DEF %", "C Rate", "C DMG","ANOMAL"]
    },
    {
        number: "V",
        stats: ["ATK %", "HP %", "DEF %", "PEN RATIO", "PHYSICAL DMG", "FIRE DMG", "ICE DMG", "ELECTRIC DMG", "ETHER DMG"],
        short_stat: ["ATK %", "HP %", "DEF %", "PEN", "PHYSICAL DMG", "FIRE DMG", "ICE DMG", "ELECTRIC DMG", "ETHER DMG"]
    },
    {
        number: "VI",
        stats: ["ATK %", "HP %", "DEF %", "ANOMALY", "IMPACT","ENERGY REGEN"],
        short_stat: ["ATK %", "HP %", "DEF %", "ANOMAL", "IMPACT","ENERGY"]
    }
];

const substats = ["ATK","HP","DEF","ATK %","HP %","DEF %","CRIT Rate%","CRIT DMG%","PEN","ANOMALY"];

const characters = [
    {
        name: "default",
        rarity: "default",
        attribute: "default",
        specialty: "default",
        faction: "default",
        color: "#50505080",
        active: false,
    },{
         name: "jane_doe",
        rarity: "s",
        attribute: "physical",
        specialty: "anomaly",
        faction: "investigation_srt",
        color: "#ffa50080",
        active: true
    },{
        name: "qinqyi",
        rarity: "s",
        attribute: "electric",
        specialty: "stun",
        faction: "investigation_srt",
        color: "#005eff80",
        active: true
    },{   
        name: "zhu_yuan",
        rarity: "s",
        attribute: "ether",
        specialty: "attack",
        faction: "investigation_srt",
        color: "#ff48e580",
        active: true
    },{
        name: "nekomata",
        rarity: "s",
        attribute: "physical",
        specialty: "attack",
        faction: "cunning_hares",
        color: "#ffa50080",
        active: true
    },{
        name: "lycaon",
        rarity: "s",
        attribute: "ice",
        specialty: "stun",
        faction: "victoria",
        color: "#00feff80",
        active: true
    },{
        name: "soldier_11",
        rarity: "s",
        attribute: "fire",
        specialty: "attack",
        faction: "obol_squad",
        color: "#ff7c0080",
        active: true
    },{
        name: "koleda",
        rarity: "s",
        attribute: "fire",
        specialty: "stun",
        faction: "belobog",
        color: "#ff7c0080",
        active: true
    },{
        name: "grace",
        rarity: "s",
        attribute: "electric",
        specialty: "anomaly",
        faction: "belobog",
        color: "#005eff80",
        active: true
    },{
        name: "ellen_joe",
        rarity: "s",
        attribute: "ice",
        specialty: "attack",
        faction: "victoria",
        color: "#00feff80",
        active: true
    },{
        name: "rina",
        rarity: "s",
        attribute: "electric",
        specialty: "support",
        faction: "victoria",
        color: "#005eff80",
        active: true,
        fix: {
            width: -25,
            translate: 0,
            scale: 1
        }
    },{
        name: "hoshimi_miyabi",
        rarity: "s",
        attribute: "ice",
        specialty: "attack",
        faction: "section_6",
        color: "#00feff80",
        active: false,
        fix: {
            width: 0,
            translate: 0,
            scale: -1
        }
    },
    
    {
        name: "seth",
        rarity: "a",
        attribute: "electric",
        specialty: "defense",
        faction: "investigation_srt",
        active: true,
        fix: {
            width: 0,
            translate: 3,
            scale: -1
        }
    },{
        name: "anby",
        rarity: "a",
        attribute: "electric",
        specialty: "stun",
        faction: "cunning_hares",
        color: "#00ff3f80",
        active: true
    },{
        name: "billy",
        rarity: "a",
        attribute: "physical",
        specialty: "attack",
        faction: "cunning_hares",
        color: "#ff000080",
        active: true
    },{
        name: "nicole",
        rarity: "a",
        attribute: "ether",
        specialty: "support",
        faction: "cunning_hares",
        color: "#ff48e580",
        active: true,
        fix: {
            width: 0,
            translate: -4,
            scale: 1
        }
    },{
        name: "anton",
        rarity: "a",
        attribute: "electric",
        specialty: "attack",
        faction: "belobog",
        color: "#005eff80",
        active: true,
        fix: {
            width: -20,
            translate: -3,
            scale: 1
        }
    },{
        name: "corin",
        rarity: "a",
        attribute: "physical",
        specialty: "attack",
        faction: "victoria",
        color: "#ffa50080",
        active: true
    },{
        name: "ben",
        rarity: "a",
        attribute: "fire",
        specialty: "defense",
        faction: "cunning_hares",
        color: "#ff7c0080",
        active: true,
        fix: {
            width: -8,
            translate: 0,
            scale: 1
        }
    },{
        name: "soukaku",
        rarity: "a",
        attribute: "ice",
        color: "#00feff80",
        specialty: "support",
        faction: "section_6",
        active: true,
        fix: {
            width: 0,
            translate: 0,
            scale: -1
        }
    },{
        name: "lucy",
        rarity: "a",
        attribute: "fire",
        specialty: "support",
        faction: "calydon",
        color: "#ff7c0080",
        active: true
    },{
        name: "piper",
        rarity: "a",
        attribute: "physical",
        specialty: "anomaly",
        faction: "calydon",
        color: "#ffa50080",
        active: true
    }
];
