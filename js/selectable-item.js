// VIZUALIZACION DE LA SECCION DE SELECCION
const $containerEditable = $("#character, #skills, #w-engines, #drive-disks, #team");
let $elementSelected, // seccion editable seleccionada
$subElementSelected, // subseccion editable (elemento cambiante)
$elementActive, // validador de elemento activo 
section = "character"; // id del $elementSelected (sirve para la vista lateral)

// selecciona seccion de items
$("main, #menu-options li").on("click", function(event) {
    event.stopPropagation();
    // selectores visuales desactivados
    $(".identifier.filter").css("filter",""); 
    $(".identifier.border").css("border-color","");
    $(".identifier.background").css("background","");

    if ($(event.target).is($containerEditable) || $(event.target).closest($containerEditable).length) {
        $elementSelected = $(event.target).closest($containerEditable);
        section = $elementSelected.prop('id');
        $subElementSelected = $(event.target).closest(`.component__container`);

        lateralView(section); // cambio visual al lateral (cambio de los componentes)
        // valida selector
        if($subElementSelected.is(".identifier")){
            viewSelect = $subElementSelected;
        } else {
            viewSelect = $subElementSelected.find(`.identifier`);
        }
        // selector visual activado (es el que el usuario selecciona se visualiza)
        viewSelect.filter(".background").css("background", "var(--gradient-diagonal-yellow)").end()
            .filter(".filter").css("filter", "drop-shadow(yellow 1px 1px) drop-shadow(yellow -1px -1px)").end()
            .filter(".border").css("border-color", "yellow"
        );

        if (!$subElementSelected.length) {
            $subElementSelected = null;
        }
    } else {
        $subElementSelected = null;
    }
});

// seleccion menu
$("#menu-options li").on("click", function() {
    section = $(this).prop("id").replace("icon-", "");
    $elementSelected = $(`#card #${section}`);
    
    lateralView(section);
});

function lateralView(section) {
    // if ($elementActive?.is($elementSelected)) {
    //     return; // Si es el mismo, salir sin hacer cambios
    // }
    // $elementActive = $elementSelected

    if (section == "character") {
        putCharacter();
    } else if(section == "skills") {
        putSkills();
    } else if (section == "w-engines") {
        putWEngine();
    } else if(section == "drive-disks") {
        putDriveDisk();
        putStats();
        putSubstats();
        // entrar primera vez con seleccion en un stat (puede que cambie en futuro)
        if($subElementSelected && $subElementSelected.is(".drive-disk__stats__container")){
            statsDriveNumber($subElementSelected); 
        }
    } else if(section == "credits") {
        $.get('components/credits.html', function(data) {
            $(".selected__items").html(data);
        });
    } else if(section == "download") {
        $.get('components/download.html', function(data) {
            $(".selected__items").html(data);
        });
    } else if(section == "reset") {
        $.get('components/delete-alert.html', function(data) {
            $(".selected__items").html(data);
        });
    } else {
        putCharacter("_team_");
        putBangboo()
        section = "team-character"; // ayuda a la activacion en el menu
    }

    $("#menu-options").find("li").removeClass("active").end()
        .find(`li#icon-${section}`).addClass("active");
}

// ======== VISTAS =======
//genera las vistas
function itemView(empty, title, cantGrid, data, resetName = title) {
    const $selectedComponent = $(".selected__items");

    empty && $selectedComponent.empty();

    $selectedComponent.append(
        `<section class="selected__title"><h2>${title}</h2> <i id="reset-${resetName}" class="fa-solid fa-arrows-rotate spin-icon" title="reset"></i></section>
        <ul class='selected__item__container selected__grid grid__c${cantGrid}'>`
    );

    $selectedComponent.find(`.selected__item__container${!empty ? ':last' : ''}`).append(data);
}

//vista de los personajes
function putCharacter(group = '') {
    // console.log(characters);
    const characterFilter = characters.filter(character => character.active);
    const data = characterFilter.map((character) => {
        const characterText = capitalizeEachWord(character.name.replaceAll("_"," "));

        return `<li class="character_${group}_selectable component__selectable" id_character-data='${character.id}'>
                <div class="component__selectable__info">
                    <img class="component__selectable__rank" src="img/ranks/char_rank_${character.rarity}_color.png" alt="">
                    <img class="component__selectable__attribute" src="img/attributes/${character.attribute}.png" alt="">
                </div>
                <img class="block" src="img/char_avatar/${character.name}.png" alt="">
                <p class="component__name">${characterText}</p>
            </li>`;
    }).join('');

    let resetName;
    if(group == ''){
        resetName = 'character';
    } else {
        resetName = 'team-character';
    }

    itemView(true, 'characters', 4, data, resetName);
}putCharacter();

// vista de habilidades
function putSkills() {
    const data = skills.map((skill, index) => 
        `<li><img class="skill__selectable component__selectable" src="img/skills/${skill}.webp" alt="" data-skill="${index}"></li>`
    ).join('');

    itemView(true, "skills", 4, data);
}

// vista nombre cinema
function putCinema(idCharacter) {
    const character = characters.find(char => char.id == idCharacter);
    const $cinemaElement = $("#cinema");
    
    $cinemaElement.find(".cinema__best").each(function() {
        const level = $(this).find(".cinema__level").val();
        if (character.cinema && character.cinema[level]) {
            const levelInfo = character.cinema[level];
            $(this).find(".cinema__info").empty().text(levelInfo)
        } else {
            $(this).find(".cinema__info").empty().text("EMPTY")
        }
    });
}

// vista de w-engine
function putWEngine() {
    // console.log(wEngines);
    const wEngineFilter = wEngines.filter(wEngine => wEngine.rarity != 'default' )
    const data = wEngineFilter.map((wEngine) =>
            `<li class="w-engine__selectable component__selectable" id_w-engine-data='${wEngine.id}'>
                <div>
                    <img class="component__selectable__rank" src="img/ranks/item_rank_${wEngine.rarity}.webp" alt="">
                </div>
                <img class="block" src="img/w-engine/${wEngine.name}.webp" alt="">
            </li>`
    ).join('');

    itemView(true, "w-engines", 4, data);
}

// vista de drive disk
function putDriveDisk() {
    // console.log(driveDisks);
    const data = driveDisks.map((driveDisk, index) =>
        `<li class="drive-disk__selectable component__selectable" id_drive-disk-data='${index}'>
            <img class="block" src="img/drive-disks/${driveDisk}.webp" alt="">
        </li>`
    ).join('');

    itemView(true, "drive-disks", 4, data);
}

// vista de stats de drive disk
function putStats() {
    // console.log(diskStats);
    const data = "<li class='space'>Selecciona un stats</li>";

    itemView(false, "stats", 2, data);

    $(".selected__items").find(".selected__title:last h2").prop("id", "stats-title").end()
        .find("ul:last").prop("id", "selected-stats");
}

// ++++++++++++++++++   VALIDAR SI SACAR ESTO ES PRUDENTE   +++++++++++++++
// vistas de los distintos stats dependiendo del numero de disk
// $(".drive-disk__stats__container").on("click", function(){
//     statsDriveNumber($(this))
// });
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// funcion en caso de seleccionar primero un stats (para que aparescan en la seleccion de items)
function statsDriveNumber(element) {
    const numStats = element.attr('data-num_stat');
    const diskStat = diskStats.find(stat => stat.number == numStats);
    const data = diskStat.stats.map((stat, index) => 
        `<li class="disk-stat__selectable component__selectable" id_disk-stat-data='${index}'>${stat}</li>`
    ).join('');

    $("#stats-title").text(`STATS ${diskStat.number}`);
    $("#selected-stats").empty().append(data);
}

// vista de substats de drive disk
function putSubstats() {
    // console.log(substats);
    const data = substats.map((substat, index) =>
        `<li class="drive-disk__substats__container disk-substat__selectable component__selectable" id_drive-substat-data='${index}'>${substat}</li>`
    ).join('');

    itemView(false, "substats", 2, data);
}

// vista de bangboos
function putBangboo() {
    // console.log(bangboos);
    const bangboosFilter = bangboos.filter(boo => boo.rarity != 'default' )
    const data = bangboosFilter.map((bangboo) =>
        `<li class="bangboo__selectable component__selectable" id_bangboo-data='${bangboo.id}'>
                <div class="component__selectable__info">
                    <img class="component__selectable__rank" src="img/ranks/char_rank_${bangboo.rarity}_color.png" alt="">
                </div>
                <img class="block" src="img/bangboos_avatar/${bangboo.name}.png" alt="">
            </li>`
    ).join('');

    itemView(false, "bangboos", 4, data);
}