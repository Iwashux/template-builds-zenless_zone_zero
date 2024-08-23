// VIZUALIZACION DE LA SECCION DE SELECCION
const $containerEditable = $("#character, #skills, #w-engine, #drive-disk, #team");
let $elementSelected, // seccion editable seleccionada
$subElementSelected, // subseccion editable (elemento cambiante)
$elementActive, // validador de elemento activo 
section = "character"; // id del $elementSelected (sirve para la vista lateral)

// selecciona seccion de items
$containerEditable.on("click", function(event) {
    event.stopPropagation();
    $elementSelected = $(this);
    section = $elementSelected.prop('id');

    const target = $(event.target);
    $subElementSelected = target.closest(`.component__container`);

    lateralView(section); // cambio visual al lateral (cambio de los componentes)
    // selectores visuales desactivados
    $(".identifier.filter").css("filter",""); 
    $(".identifier.border").css("border-color","")
    $(".identifier.background").css("background","")
    // valida selector
    if($subElementSelected.hasClass("identifier")){
        viewSelect = $subElementSelected;
    } else {
        viewSelect = $subElementSelected.find(`.identifier`);
    }
    // selector visual activado (es el que el usuario selecciona se visualiza)
    viewSelect.filter(".background").css("background", "var(--gradient-diagonal-yellow)").end()
        .filter(".filter").css("filter", "drop-shadow(yellow 1px 1px) drop-shadow(yellow -1px -1px)").end()
        .filter(".border").css("border-color", "yellow"
    );
});

function lateralView(section) {
    if ($elementActive?.is($elementSelected)) {
        return; // Si es el mismo, salir sin hacer cambios
    }
    // $elementActive = $elementSelected

    if (section == "character") {
        putCharacter();
    } else if (section == "w-engine") {
        putWEngine();
    } else if(section == "drive-disk") {
        putDriveDisk();
        putStats();
        putSubstats();
        // entrar primera vez con seleccion en un stat (puede que cambie en futuro)
        if($subElementSelected.hasClass("drive-disk__stats__container")){
            statsDriveNumber($subElementSelected); 
        }
    } else if(section == "skills") {
        putSkills();
    } else {
        putCharacter("_team_");
        putBangboo()
    }
}

// ======== VISTAS =======
//genera las vistas
function itemView(empty, name, cantGrid, data) {
    const $selectedComponent = $(".selected__items");

    empty && $selectedComponent.empty(); //simplificacion de if / borra contenido lateral
    $selectedComponent.append(
        `<section class="selected__title"><h2>${name}</h2> <i id="reset-${name}" class="fa-solid fa-arrows-rotate"></i></section>
        <ul class='selected__item__container selected__grid grid__c${cantGrid}'>`
    );

    $selectedComponent.find(`.selected__item__container${!empty ? ':last' : ''}`).append(data)
}

//vista de los personajes
function putCharacter(group = '') {
    // console.log(characters);
    const characterFilter = characters.filter(character => character.active)
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

    itemView(true, 'characters', 4, data);
}putCharacter();

// vista de habilidades
function putSkills() {
    $.get('components/skills.html', function(data) {
        itemView(true, "skills", 4, data);
    });
}

// vista de w-engine
function putWEngine() {
    // console.log(wEngines);
    const wEngineFilter = wEngines.filter(wEngine => wEngine.rarity )
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

// ++++++++++++++++++   BALIDAR SI SACAR ESTO ES PRUDENTE   +++++++++++++++
// vistas de los distintos stats dependiendo del numero de disk
// $(".drive-disk__stats__container").on("click", function(){
//     statsDriveNumber($(this))
// });
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// funcion en caso de seleccionar primero un stats (para que aparescan en la seleccion de items)
function statsDriveNumber(element) {
    const idStats = element.attr('data-id_stat');
    const diskStat = diskStats[idStats]; // al ser siempre los mismo no utilizo find id
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
    const data = bangboos.map((bangboo) =>
        `<li class="bangboo__selectable component__selectable" id_bangboo-data='${bangboo.id}'>
                <div class="component__selectable__info">
                    <img class="component__selectable__rank" src="img/ranks/char_rank_${bangboo.rarity}_color.png" alt="">
                </div>
                <img class="block" src="img/bangboos_avatar/${bangboo.name}.png" alt="">
            </li>`
    ).join('');

    itemView(false, "bangboos", 4, data);
}


// ======== CAMBIO INTERACTIVO =======
// cambio de personajes tarjeta
$(".selected").on("click", ".character__selectable", function() {
    const idCharacter = $(this).attr("id_character-data");
    const character = characters.find(char => char.id == idCharacter);

    const characterText = capitalizeEachWord(character.name.replaceAll("_"," "));
    
    $("#character-name").text(characterText);
    $("#character-info-attributes").removeClass("default");
    $("#character-faction").attr("src", `img/factions/${character.faction}.png`);
    $("#character-attribute").attr("src", `img/attributes/${character.attribute}.png`);
    $("#character-specialty").attr("src", `img/specialties/${character.specialty}.png`);

    $("#character-rank").attr("src", `img/ranks/char_rank_${character.rarity}.png`);
    $("#character-img").attr("src", `img/character/${character.name}.png`);
    $("#skills").css("background", character.color)

    if (character.fix) {
        $("#character-img").css("max-width", `${120 + character.fix.width}%`)
            .css("transform", `translateX(${-47 + character.fix.translate}%) scaleX(${character.fix.scale})`)
    }else{
        $("#character-img").css("max-width", "").css("transform", "")
    }
});

// cambio de personajes en seccion team
$(".selected").on("click", ".character__team__selectable", function() {
    const idCharacter = $(this).attr("id_character-data");
    const character = characters.find(char => char.id == idCharacter);
    
    const characterText = capitalizeEachWord(character.name.replaceAll("_"," "));

    if ($subElementSelected && !$subElementSelected.hasClass("team__bangboo__container")) {
        $subElementSelected.find(".team__character__rank").attr("src", `img/ranks/char_rank_${character.rarity}_color.png`);
        $subElementSelected.find(".team__character__attribute").attr("src", `img/attributes/${character.attribute}.png`).removeClass("default");
        $subElementSelected.find(".team__character__img").attr("src", `img/char_avatar/${character.name}.png`);
        $subElementSelected.find(".team__character__name").text(characterText);
    }
})

// cambio de habilidades
$(".selected").on("click", ".skill__selectable", function() {
    const skillImg = $(this).attr("src");
    
    if ($subElementSelected) {
        $subElementSelected.attr("src", skillImg);
    }
})

// cambio de iconos en las habilidades (=, >)
$("#skills").on("click", "i", function() {
    const icon = $(this);
    if (icon.is(".fa-equals")) {
        icon.removeClass("fa-equals").addClass("fa-angle-right");
    } else {
        icon.removeClass("fa-angle-right").addClass("fa-equals");
    }
});

// cambio de w-engine
$(".selected").on("click", ".w-engine__selectable", function() {
    // console.log($subElementSelected);
    const idWEngine = $(this).attr("id_w-engine-data");
    const wEngine = wEngines.find(eng => eng.id == idWEngine);

    const wEngineText = wEngine.name.replaceAll("_"," ");
    let fontSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--font-size-text').trim());

    if ($subElementSelected) {
        $subElementSelected.find(".w-engine__rarity").attr("src", `img/ranks/item_rank_${wEngine.rarity}.webp`);
        $subElementSelected.find(".w-engine__component").attr("src", `img/w-engine/${wEngine.name}.webp`);
        $subElementSelected.find(".w-engine__rarity").removeClass("default")

        const $subElementName = $subElementSelected.closest('.w-engine__container').find(".w-engine__name").text(wEngineText);

        if ($subElementSelected.closest(".w-engine__best").length) {
            $subElementName.css("font-size", `${fontSize}rem`);
            let totalHeight = $subElementName.height();
    
            while (totalHeight > 32) {
                fontSize -= 0.01;
                totalHeight = $subElementName.height();
                $subElementName.css("font-size", `${fontSize}rem`);
            }
        }
    }
})

// cambio de drive-disk
$(".selected").on("click", ".drive-disk__selectable", function() {
    const idDriveDisk = $(this).attr("id_drive-disk-data");
    const driveDisk = driveDisks[idDriveDisk]; // al ser siempre los mismo y ser un array simple no utilizo find id
    
    const driveDiskText = capitalizeEachWord(driveDisk.replaceAll("_"," "));

    if ($subElementSelected) {
        $subElementSelected.find(".drive-disk__component").attr("src", `img/drive-disks/${driveDisk}.webp`);
        $subElementSelected.find(".drive-disk__name").text(driveDiskText);
    }
})

//cambio de stats de drive disk
$(".selected").on("click", ".disk-stat__selectable", function() {
    const diskStatID = $(this).attr("id_disk-stat-data");
    
    if ($subElementSelected.hasClass("drive-disk__stats__container")) {
        const diskStatsNumber = $subElementSelected.attr("data-id_stat");
        const diskStatText = diskStats[diskStatsNumber].short_stat[diskStatID];

        if ($subElementSelected.find("span").hasClass("stats__default")) {
            $subElementSelected.find(".stat__text").empty();
        }
        
        if($subElementSelected.find("span").length <= 1) {
            $subElementSelected.find(".stat__text").append(`<span>${diskStatText}</span>`);
        }
    
        checkElements();
    }
});

//cambio de substats de drive disk
let contSubstats = 0;
$(".selected").on("click", ".disk-substat__selectable", function() {
    if ($subElementSelected.hasClass("drive-disk__substats")) {
        const substatID = $(this).attr("id_drive-substat-data");
        const substat = substats[substatID]; // al ser siempre los mismo y ser un array simple no utilizo find id
        const elementHeight = $subElementSelected.height();
        let fontSize = 0.65;
        
        contSubstats++;
        if(contSubstats <= 4) {
            if ($subElementSelected.find(".substats__text").text() == "EMPTY") {
                $subElementSelected.find(".substats__text").empty();
            } else {
                $subElementSelected.find(".substats__text").append(" <i class='fa-solid fa-angle-right'></i>");
            }

            $subElementSelected.find(".substats__text").append(` ${substat}`);
        }

        while($subElementSelected.height() > elementHeight) {
            fontSize -= 0.01;
            $subElementSelected.css("font-size", `${fontSize}rem`)
        }
    }
});

// cambio de personajes en seccion team
$(".selected").on("click", ".bangboo__selectable", function() {
    const idBangboo = $(this).attr("id_bangboo-data");
    const bangboo = bangboos.find(boo => boo.id == idBangboo);
    
    const bangbooText = capitalizeEachWord(bangboo.name.replaceAll("_"," "));

    if ($subElementSelected.hasClass("team__bangboo__container")) {
        $subElementSelected.find(".team__character__rank").attr("src", `img/ranks/char_rank_${bangboo.rarity}_color.png`);
        $subElementSelected.find(".team__character__img").attr("src", `img/bangboos_avatar/${bangboo.name}.png`);
        $subElementSelected.find(".team__character__name").text(bangbooText);
    }
})


// ====== EXTRAS FUNCTIONS ======
function capitalizeEachWord(string) {
    return string.split(" ").map(word => capitalize(word)).join(" ");
}

function capitalize(string) {
    if (!string) return ""; // Manejar el caso de una cadena vacía
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}