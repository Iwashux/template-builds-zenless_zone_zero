const wEngines = [
    {name: "default", rarity: "default"},

    {name: "Ice-Jade_Teapot", rarity:"s"},
    {name: "Riot_Suppressor_Mark_VI", rarity: "s"},
    {name: "Deep_Sea_Visitor", rarity: "s"},
    {name: "Fusion_Compiler", rarity: "s"},
    {name: "Hellfire_Gears", rarity: "s"},
    {name: "Steel_Cushion", rarity: "s"},
    {name: "The_Brimstone", rarity: "s"},
    {name: "The_Restrained", rarity: "s"},
    {name: "Weeping_Cradle", rarity: "s"},
    
    {name: "Gilded_Blossom", rarity: "a"},
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
].map((item, index) => ({ id: index, ...item }));


const bangboos = [
    {name: "default", rarity: "default"},

    {name: "officer_cui", rarity: "s"},
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
].map((item, index) => ({ id: index, ...item }));

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
        short_stat: ["ATK %", "HP %", "DEF %", "PEN", "PHYS DMG", "FIRE DMG", "ICE DMG", "ELEC DMG", "ETH DMG"]
    },
    {
        number: "VI",
        stats: ["ATK %", "HP %", "DEF %", "ANOMALY", "IMPACT","ENERGY REGEN"],
        short_stat: ["ATK %", "HP %", "DEF %", "ANOMAL", "IMPACT","ENERGY"]
    }
];

const substats = ["ATK","HP","DEF","ATK %","HP %","DEF %","CRIT Rate%","CRIT DMG%","PEN","ANOMALY"];

const skills = ["core", "basic", "dodge", "assist", "special", "ulti"]

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
        active: true,
        cinema: {
            "01": "Crime Counsel",
            "02": "Adapt to the Environment",
            "03": "Anonymity",
            "04": "Adapt and Thrive",
            "05": "Compulsive Hoarder",
            "06": "\"Shady\" Technique"
        }
    },{
        name: "qinqyi",
        rarity: "s",
        attribute: "electric",
        specialty: "stun",
        faction: "investigation_srt",
        color: "#005eff80",
        active: true,
        cinema: {
            "01": "Insulation Breakdown",
            "02": "Minimal Effort, Maximum Impact",
            "03": "Drink Hot Water",
            "04": "Stable Arc Barrier",
            "05": "Youthful Spirit",
            "06": "Eight Meridians"
        }
    },{   
        name: "zhu_yuan",
        rarity: "s",
        attribute: "ether",
        specialty: "attack",
        faction: "investigation_srt",
        color: "#ff48e580",
        active: true,
        cinema: {
            "01": "Quick Reload",
            "02": "Ether Ember",
            "03": "Public Security Special Training",
            "04": "Ether Perforation",
            "05": "Special Ops Experience",
            "06": "Expanded Energy Pack III"
        }
    },{
        name: "nekomata",
        rarity: "s",
        attribute: "physical",
        specialty: "attack",
        faction: "cunning_hares",
        color: "#ffa50080",
        active: true,
        cinema: {
            "01": "Bird Hunter",
            "02": "Cat & Mouse",
            "03": "Curious Left Tail",
            "04": "Sharpen Claws",
            "05": "Lucky Right Tail",
            "06": "Predator Lineage"
        }
    },{
        name: "lycaon",
        rarity: "s",
        attribute: "ice",
        specialty: "stun",
        faction: "victoria",
        color: "#00feff80",
        active: true,
        cinema: {
            "01": "Full Moon Momentum",
            "02": "Energy Feedback",
            "03": "Attendant Training",
            "04": "Graceful Demeanor",
            "05": "Alpha Nature",
            "06": "Ruthless Hunter"
        }
    },{
        name: "soldier_11",
        rarity: "s",
        attribute: "fire",
        specialty: "attack",
        faction: "obol_squad",
        color: "#ff7c0080",
        active: true,
        cinema: {
            "01": "Rapid Heat",
            "02": "Scorching Convergence",
            "03": "Elite Soldier",
            "04": "Indulgent Blaze",
            "05": "Perfect Soldier",
            "06": "Scorching Flower"
        }
    },{
        name: "koleda",
        rarity: "s",
        attribute: "fire",
        specialty: "stun",
        faction: "belobog",
        color: "#ff7c0080",
        active: true,
        cinema: {
            "01": "Beat of the Hammer",
            "02": "Kinetic Recovery",
            "03": "“Mind Your Own!”",
            "04": "Furnace’s Glow",
            "05": "“You Dare Underestimate Me?”",
            "06": "Saturated Blast"
        }
    },{
        name: "grace",
        rarity: "s",
        attribute: "electric",
        specialty: "anomaly",
        faction: "belobog",
        color: "#005eff80",
        active: true,
        cinema: {
            "01": "Recharge Chamber",
            "02": "Lightning Piercer",
            "03": "Chief Mechanic",
            "04": "Burst Capacitor",
            "05": "“Frosty Cold Iron Witch”",
            "06": "Detonation Trigger"
        }
    },{
        name: "ellen_joe",
        rarity: "s",
        attribute: "ice",
        specialty: "attack",
        faction: "victoria",
        color: "#00feff80",
        active: true,
        cinema: {
            "01": "Glacial Omen",
            "02": "Arctic Ocean Predator",
            "03": "Overtime-Intolerant",
            "04": "Endless Hoarfrost",
            "05": "Adequate Sleep",
            "06": "The Feast Begins"
        }
    },{
        name: "rina",
        rarity: "s",
        attribute: "electric",
        specialty: "support",
        faction: "victoria",
        color: "#005eff80",
        active: true,
        cinema: {
            "01":   "Dance Duet",
            "02":	"Master’s Paragon",
            "03":	"Head Maid’s Specialty",
            "04":	"Needle and Hammer",
            "05":	"Head Maid Perfectionist",
            "06":	"Stormy Night’s Fright"
        },
        fix: {
            width: -25,
            translate: 0
        }
    },{
        name: "hoshimi_miyabi",
        rarity: "s",
        attribute: "ice",
        specialty: "attack",
        faction: "section_6",
        color: "#00feff80",
        active: false
    },
    
    {
        name: "seth",
        rarity: "a",
        attribute: "electric",
        specialty: "defense",
        faction: "investigation_srt",
        active: true,
        cinema: {
            "01": "Heroism",
            "02": "Recklessness of Youth",
            "03": "Slow Reflexes",
            "04": "Core Aspiration",
            "05": "Distant Admiration",
            "06": "Idealist"
        },
        fix: {
            width: 0,
            translate: 3
        }
    },{
        name: "anby",
        rarity: "a",
        attribute: "electric",
        specialty: "stun",
        faction: "cunning_hares",
        color: "#00ff3f80",
        active: true,
        cinema: {
            "01": "Rapid Charge Mode",
            "02": "Precision Discharge",
            "03": "Well-Disciplined",
            "04": "Conducting Charge",
            "05": "Street Experience",
            "06": "Charging Field"
        }
    },{
        name: "billy",
        rarity: "a",
        attribute: "physical",
        specialty: "attack",
        faction: "cunning_hares",
        color: "#ff000080",
        active: true,
        cinema: {
            "01": "Dazzling Entrance",
            "02": "Roaming Gunslinger",
            "03": "Teachings of the Starlight Knights",
            "04": "Starlight Ballistics",
            "05": "Lost Technological Construct",
            "06": "Starlight Hero"
        }
    },{
        name: "nicole",
        rarity: "a",
        attribute: "ether",
        specialty: "support",
        faction: "cunning_hares",
        color: "#ff48e580",
        active: true,
        cinema: {
            "01": "Supercharged Bomb",
            "02": "Charging Device",
            "03": "A Hare’s Cunning",
            "04": "Field Expansion",
            "05": "Industry Star",
            "06": "Corrupting Energy Field"
        },
        fix: {
            width: 0,
            translate: -4
        }
    },{
        name: "anton",
        rarity: "a",
        attribute: "electric",
        specialty: "attack",
        faction: "belobog",
        color: "#005eff80",
        active: true,
        cinema: {
            "01": "Warm-Up Exercises",
            "02": "State of Flow",
            "03": "Rotational Training",
            "04": "Everyone Get Fired Up!",
            "05": "Jack of All Trades",
            "06": "Break the Limit"
        },
        fix: {
            width: -20,
            translate: -3
        }
    },{
        name: "corin",
        rarity: "a",
        attribute: "physical",
        specialty: "attack",
        faction: "victoria",
        color: "#ffa50080",
        active: true,
        cinema: {
            "01": "Open Trauma",
            "02": "Atomic Smash",
            "03": "Amateur Maid",
            "04": "Battlefield Retainer",
            "05": "Special Ops Maid",
            "06": "Accumulated Release"
        }
    },{
        name: "ben",
        rarity: "a",
        attribute: "fire",
        specialty: "defense",
        faction: "cunning_hares",
        color: "#ff7c0080",
        active: true,
        cinema: {
            "01": "Reacting Force",
            "02": "Offense Through Defense",
            "03": "Careful Accounting",
            "04": "Agile Adaptation",
            "05": "Meticulous Detail",
            "06": "Wild Spirit"
        },
        fix: {
            width: -8,
            translate: 0
        }
    },{
        name: "soukaku",
        rarity: "a",
        attribute: "ice",
        color: "#00feff80",
        specialty: "support",
        faction: "section_6",
        active: true,
        cinema: {
            "01": "Uplifting Current",
            "02": "Experimental Charging Module",
            "03": "Attendance Meal Allowance",
            "04": "Hypothermia",
            "05": "Late-Night Snacks",
            "06": "Northern Wind"
        }
    },{
        name: "lucy",
        rarity: "a",
        attribute: "fire",
        specialty: "support",
        faction: "calydon",
        color: "#ff7c0080",
        active: true,
        cinema: {
            "01": "Drill Formations",
            "02": "Little Bear Captain",
            "03": "Ironfist Overseer",
            "04": "Chaos Ball Game",
            "05": "Wildland Princess",
            "06": "Fierce Fangs of Fire"
        }
    },{
        name: "piper",
        rarity: "a",
        attribute: "physical",
        specialty: "anomaly",
        faction: "calydon",
        color: "#ffa50080",
        active: true,
        cinema: {
            "01": "Leisure Moment",
            "02": "Motivation",
            "03": "Truck Expert",
            "04": "Refined Techniques",
            "05": "Personal Hobbies",
            "06": "Mild Excitement"
        }
    }
].map((item, index) => ({ id: index, ...item }));
