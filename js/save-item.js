// obtener main character
function mainCharacter() {
    return $("#character-img").attr("data-id-character")
}

// guarda personaje
function saveCharacter() {
    const idCharacter = mainCharacter();
    localStorage.setItem('character', idCharacter);
}
// guarda habilidades
function saveSkills() {
    let elementSkills = $("#skills .component__container");
    let idSkills = elementSkills.map((_,skill) => {
        if ($(skill).attr("data-skill")) {
            return $(skill).attr("data-skill");
        } 
        return 'none';
    }).get();

    localStorage.setItem('skills', JSON.stringify(idSkills));
}

function saveCinemaLevel() {
    let cinemasLevels = $(".cinema__level");
    let numberCinema = cinemasLevels.map((_,cinema) => $(cinema).val()).get();

    localStorage.setItem('cinema', JSON.stringify(numberCinema));
}saveCinemaLevel()

function saveWEngine() {
    let elementWEngine = $("#w-engines .component__container");
    let idWEngine = elementWEngine.map((_,engine) => {
        if ($(engine).attr("data-w-engine")) {
            return $(engine).attr("data-w-engine");
        } 
        return 'none';
    }).get();
    localStorage.setItem('wEngines', JSON.stringify(idWEngine));
}

function saveDriveDisk() {
    let elementDriveDisk = $("#drive-disks .drive-disk__component");
    let idDriveDisk = elementDriveDisk.map((_,engine) => {
        if ($(engine).attr("data-drive-disk")) {
            return $(engine).attr("data-drive-disk");
        } 
        return 'none';
    }).get();
    localStorage.setItem('driveDisk', JSON.stringify(idDriveDisk));
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
//     skills: [-1, -1, -1, -1, -1, -1],
//     cinema: [01, 02],
//     wengine: [0, 0, 0, 0],
//     drive_disk: [-1, -1, -1, -1],
//     stats: {
//         statIV: [],
//         statV: [],
//         statVI: [],
//     },
//     substats: [],
//     team1: [id, id, id],
//     team2: [id, id, id],
// }