// obtener main character
function mainCharacter() {
    return $("#character-img").attr("data-id-character") || "0";
}

function getIdElement(elements, data) {
    return elements.map((_, element) => $(element).attr(data) || 'none').get();
}

// guarda personaje
function saveCharacter() {
    const idCharacter = mainCharacter();
    localStorage.setItem('character', idCharacter);
}
// guarda habilidades
function saveSkills() {
    const elementSkills = $("#skills .component__container");
    const idSkills = getIdElement(elementSkills, "data-skill");

    localStorage.setItem('skills', JSON.stringify(idSkills));
}

function saveCinemaLevel() {
    const cinemasLevels = $(".cinema__level");
    const numberCinema = cinemasLevels.map((_,cinema) => $(cinema).val()).get();

    localStorage.setItem('cinemas', JSON.stringify(numberCinema));
}

function saveWEngine() {
    const elementWEngine = $("#w-engines .component__container");
    const idWEngine = getIdElement(elementWEngine, "data-w-engine");

    localStorage.setItem('wEngines', JSON.stringify(idWEngine));
}

function saveDriveDisk() {
    const elementDriveDisk = $("#drive-disks .drive-disk__container");
    const idDriveDisk = getIdElement(elementDriveDisk, "data-drive-disk");

    localStorage.setItem('driveDisks', JSON.stringify(idDriveDisk));
}

function saveStats() {
    const elementStats = $(".drive-disk__stats .stat__text");
    const htmlStats = elementStats.map((_,element) => $(element).html()).get();
    
    localStorage.setItem('stats', JSON.stringify(htmlStats));
}

function saveSubstats() {
    const textSubstats = $("#drive-disks .substats__text").text();
    const substats = textSubstats.split("  ");

    localStorage.setItem('substats', JSON.stringify(substats));
}

function saveTeam() {
    const elementTeam = $("#team .component__container");
    const idTeam = getIdElement(elementTeam, "data-id-team");

    localStorage.setItem('team', JSON.stringify(idTeam));
}

function getSaveItems() {
    // Crear un objeto vacío
    let data = { ...getDefaultData() };

    // Recorrer el localStorage y agregar los datos al objeto, parseando los valores JSON
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        let value = localStorage.getItem(key);
        
        // Intentar parsear el valor si es JSON
        try {
            value = JSON.parse(value);
        } catch (e) {
            // Si no es JSON, se deja el valor como está (probablemente una cadena)
        }

        data[key] = value;
    }
    // console.log(data);

    changeCharacter(data.character)

    setItemsElement(data.skills, $("#skills .component__container"), changeSkills);
    setItemsElement(data.wEngines, $("#w-engines .component__container"), changeWEngine);
    setItemsElement(data.driveDisks, $("#drive-disks .drive-disk__container"), changeDriveDisk);
    setItemsElement(data.team, $("#team .component__container"), changeTeam, true);
    
    $("#cinema .cinema__level").each((index,cinema) => {
        const level = data.cinemas[index];
        const $elementSwitch = $(cinema).parent();
        if (parseInt(level) > 0) {
            $elementSwitch.addClass('active')
        }
        $(cinema).val(level);
        
        cinemaLevelCheck($(cinema), $elementSwitch.parent().siblings('.cinema__info'));
        putCinema(data.character);
    });

    $("#drive-disks .stat__text").each((index,stat) => {
        $(stat).html(data.stats[index]);
        $subElementSelected = $(stat).closest('.component__container');
        fixSizeStats();
    });

    $("#drive-disks .substats__text").html(data.substats.join(" <i class='fa-solid fa-angle-right'></i> "));
    contSubstats = data.substats[0] !== "EMPTY" ? data.substats.length : 0;
    fixSizeSubstats();

    viewUnselecter();
}getSaveItems();

// Función que devuelve los datos predeterminados
function getDefaultData() {
    return {
        character: "0",
        skills: ["none", "none", "none", "none", "none", "none"],
        cinemas: ["00", "00"],
        wEngines: ["none", "none", "none", "none"],
        driveDisks: ["none", "none", "none", "none"],
        stats: [
            "<span class=\"stats__empty\">EMPTY</span>",
            "<span class=\"stats__empty\">EMPTY</span>",
            "<span class=\"stats__empty\">EMPTY</span>"
        ],
        substats: ["EMPTY"],
        team: ["none", "none", "none", "none", "none", "none"],
    };
}

function setItemsElement(data, $element, changeFunction, optionalData) {
    $element.each((index, elem) => { // index ya que corresponde al orden de como se guardan
        $subElementSelected = $(elem);
        if (data && data[index] !== 'none') {
            if (optionalData) {
                const isTeamCharacter = optionalData && $subElementSelected.is(".team__character__container");
                changeFunction(isTeamCharacter, data[index]);
            } else {
                changeFunction(data[index]);
            }
        }
    })
}
