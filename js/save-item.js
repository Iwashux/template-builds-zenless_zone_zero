function saveCharacter(idCharacter) {
    localStorage.setItem('character', idCharacter);
}

function saveSkills(imgSkill) {
    localStorage.setItem('skills', imgSkill);
}

function saveCinemaLevel(cinemaLevel) {
    localStorage.setItem('cinemaLevel', cinemaLevel);
}

function saveCinemaText(cinemaText) {
    localStorage.setItem('cinemaText', cinemaText);
}

function saveWEngine(idWEngine) {
    localStorage.setItem('wEngines', idWEngine);
}

function saveDriveDisk(driveDisk) {
    localStorage.setItem('driveDisks', driveDisk);
}

function saveStats(stats) {
    localStorage.setItem('stats', stats);
}

function saveSubstats(substats) {
    localStorage.setItem('substats', substats);
}

function saveTeam(idTeam) {
    localStorage.setItem('team', idTeam);
}

// ===========  ESTRUCTURA =============
// saved = {
//     character: id,
//     skills: [0, 0, 0, 0, 0, 0],
//     wengine: [0, 0, 0, 0],
//     drive_disk: [0, 0, 0, 0],
//     stats: {
//         statIV: [],
//         statV: [],
//         statVI: [],
//     },
//     substats: [],
//     team1: [id, id, id],
//     team2: [id, id, id],
// }