// ======== CAMBIO INTERACTIVO =======
// cambio de personajes tarjeta
$(".selected").on("click", ".character__selectable", function() {
    const idCharacter = $(this).attr("id_character-data");
    changeCharacter(idCharacter)
});
function changeCharacter(idCharacter) {
    const character = characters.find(char => char.id == idCharacter) || characters.find(char => char.id == 0);
    const characterText = capitalizeEachWord(character.name.replaceAll("_"," "));
    
    $("#character-name").text(characterText);
    $("#character-faction").attr("src", `img/factions/${character.faction}.webp`);
    
    $("#character-img").attr("data-id-character", character.id);
    $("#character-rank").attr("src", `img/ranks/char_rank_${character.rarity}.webp`);
    $("#character-img").attr("src", `img/character/${character.name}.webp`);
    $("#skills").css("background", character.color)
    
    if (character.id !== 0) {
        $("#character-attribute").attr("src", `img/attributes/${character.attribute}.webp`);
        $("#character-specialty").attr("src", `img/specialties/${character.specialty}.webp`);
        $("#character-info-attributes").removeClass("empty");
    } else {
        $("#character-info-attributes").addClass("empty");
    }
    
    if (character.fix) {
        $("#character-img").css("max-width", `${120 + character.fix.width}%`)
            .css("transform", `translateX(${-47 + character.fix.translate}%)`)
    }else{
        $("#character-img").css("max-width", "").css("transform", "")
    }
    
    putCinema(character.id);
    saveCharacter();
}

// cambio de habilidades
$(".selected").on("click", ".skill__selectable", function() {
    const idSkill = $(this).attr("data-skill");
    changeSkills(idSkill)
});
function changeSkills(idSkill = '') {
    const skill = skills[idSkill] || generalFileDefault;
    // Si no hay un subelemento seleccionado válido, selecciona el primero
    if (!$subElementSelected || !$subElementSelected.is(".skills__container")) {
        $subElementSelected = $("#skills .skills__container").first();
    }
    // Actualizamos siempre el `data-skill` y `src`
    $subElementSelected.attr("data-skill", idSkill);
    $subElementSelected.attr("src", `img/skills/${skill}.webp`);
    // Si la habilidad no es la predeterminada, avanzamos al siguiente contenedor
    if (skill !== generalFileDefault) {
        $subElementSelected = $subElementSelected.nextAll(".skills__container").first();
        viewSelecter(); // Solo se ejecuta cuando cambiamos de habilidad
    }
    saveSkills(); // Guardamos siempre
}
// cambio de iconos en las habilidades (=, >)
$("#skills").on("click", "i", function() {
    const icon = $(this);
    if (icon.is(".fa-equals")) {
        icon.removeClass("fa-equals").addClass("fa-angle-right");
    } else {
        icon.removeClass("fa-angle-right").addClass("fa-equals");
    }
});

// cambio de Nivel de cinema
$(".cinema__level").on("input", function() {
    let value = $(this).val();

    // Eliminar caracteres no permitidos y asegurar que el primer dígito sea 0
    value = value.replace(/[^1-6]/g, ''); 
    // Si hay mas de dos dígitos, actualizar el segundo dígito con el último ingresado
    if (value.length = 1) {
        lastChar = value.slice(-1);
        value = value.slice(0, 0) + lastChar;
    }
    
    // Asegurarse de que siempre comience con un 0
    if (value.length > 0 && value[0] !== '0') {
        value = '0' + value;
    } else if (value.length === 0) {
        value = '0';
    }

    $(this).val(value);

    const idCharacter = mainCharacter();
    putCinema(idCharacter);
    saveCinemaLevel();
});
// cinema switch click
$(".cinema__switch__button").on("click", function() {
    let element = $(this);
    let thisInput = element.find("input");
    let thisInfo = element.closest(".cinema__best").find(".cinema__info");

    element.toggleClass("active");

    if (element.hasClass("active")) {
        thisInput.val("01")
    } else {
        thisInput.val("00")
    }

    cinemaLevelCheck(thisInput, thisInfo);
    putCinema(mainCharacter());
    saveCinemaLevel();
});
function cinemaLevelCheck(thisInput, thisInfo) {
    const isActive = parseInt(thisInput.val()) !== 0;
    thisInput.parent().toggleClass("active", isActive);

    thisInput.prop("readonly", !isActive).add(thisInfo).css("opacity", isActive ? "1" : ".5");
    thisInfo.prop("contenteditable", isActive).text(isActive ? "" : generalTextDefault);
}
// cinema level select
$(".cinema__level").on("click", function(event) {
    if (!$(this).prop("readonly")) {
        event.stopPropagation();
    }
});
// cinema level en caso de dejar vacio
$(".cinema__level").on("focusout", function() {
    let value = $(this).val();

    if (value.length == 1) {
        $(this).val("01");

        const idCharacter = mainCharacter();
        putCinema(idCharacter)
    }
    saveCinemaLevel();
});

// cambio de w-engine
$(".selected").on("click", ".w-engine__selectable", function() {
    // console.log($subElementSelected);
    const idWEngine = $(this).attr("id_w-engine-data");
    changeWEngine(idWEngine);
})
function changeWEngine(idWEngine) {
    const wEngine = wEngines.find(eng => eng.id == idWEngine) || wEngines.find(eng => eng.id === 0);
    const wEngineText = wEngine.name.replaceAll("_"," ");
    
    if (!$subElementSelected || !$subElementSelected.is(".w-engine__container")) {
        $subElementSelected = $("#w-engines .w-engine__container").first();
        viewSelecter();
    }

    $subElementSelected.find(".w-engine__component").attr("src", `img/w-engine/${wEngine.name}.webp`);
    if (wEngine.id !== 0) {
        $subElementSelected.attr("data-w-engine", wEngine.id)
        $subElementSelected.find(".w-engine__rarity").attr("src", `img/ranks/item_rank_${wEngine.rarity}.webp`);
        $subElementSelected.find(".w-engine__rarity").removeClass("empty");
    } else {
        $subElementSelected.attr("data-w-engine", '')
        $subElementSelected.find(".w-engine__rarity").addClass("empty");
    }
    
    const $subElementName = $subElementSelected.find(".w-engine__name")
        .text(wEngine.id !== 0 ? wEngineText : wEngineText.toUpperCase());
    
    if ($subElementSelected.parent().is(".w-engine__best")) {
        wEngineFixText($subElementName)
    }

    saveWEngine()
}
function wEngineFixText($subElementName) {
    let fontSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--font-size-text').trim());
    let totalHeight = $subElementName.height();
    $subElementName.css("font-size", `${fontSize}rem`);

    while (totalHeight > 32) {
        fontSize -= 0.01;
        totalHeight = $subElementName.height();
        $subElementName.css("font-size", `${fontSize}rem`);
    }
}

// cambio de drive-disk
$(".selected").on("click", ".drive-disk__selectable", function() {
    const idDriveDisk = $(this).attr("id_drive-disk-data");
    changeDriveDisk(idDriveDisk);
})
function changeDriveDisk(idDriveDisk = '') {
    const driveDisk = driveDisks[idDriveDisk] || generalFileDefault; // al ser siempre los mismo y ser un array simple no utilizo find id
    const driveDiskText = capitalizeEachWord(driveDisk.replaceAll("_"," "));
    
    if (!$subElementSelected) {
        $subElementSelected = $("#drive-disks .drive-disk__container").first();
        viewSelecter();
    }

    $subElementSelected.attr("data-drive-disk", idDriveDisk)
    $subElementSelected.find(".drive-disk__component").attr("src", `img/drive-disks/${driveDisk}.webp`);
    $subElementSelected.find(".drive-disk__name").text(driveDisk !== generalFileDefault ? driveDiskText : generalTextDefault);
    
    saveDriveDisk();
}

//cambio de stats de drive disk
$(".selected").on("click", ".disk-stat__selectable", function() {
    const diskStatID = $(this).attr("id_disk-stat-data");
    changeStats(diskStatID);
});
function changeStats(diskStatID = '') {
    if (!$subElementSelected || !$subElementSelected.is("#drive-disks .drive-disk__stats__container")) {
        const getNumberStat = $("#stats-title").text().replace("STATS ","");
        $subElementSelected = $(`#drive-disks .drive-disk__stats__container[data-num_stat='${getNumberStat}']`);
        viewSelecter();
    }

    const diskStatsNumber = $subElementSelected.attr("data-num_stat");
    const diskStat = diskStats.find(stat => stat.number == diskStatsNumber);
    const diskStatText = diskStat.short_stat[diskStatID] || generalTextDefault;
    
    if(diskStatText !== generalTextDefault) {
        if ($subElementSelected.find("span").hasClass("stats__empty")) {
            $subElementSelected.find(".stat__text").empty();
        }
        
        if($subElementSelected.find("span").length <= 1) {
            $subElementSelected.find(".stat__text").append(`<span>${diskStatText}</span>`);
        }
    } else {
        $subElementSelected.find(".stat__text").empty().append(`<span class="stats__empty">${diskStatText}</span>`).css('font-size', '');
    }

    fixSizeStats();
    saveStats();
}
// Cambio de tamanio stact de los drive diks
function fixSizeStats() {
    const $element = $subElementSelected.find('.stat__text').css('font-size', '');
    const elementWidth = $element.width();
    const cantElement = $element.find("span").length;
    
    if (elementWidth > 41 || cantElement == 2) {
        $element.css('font-size', '.49rem');
    } else if (elementWidth >= 36) {
        $element.css('font-size', '.6rem');
    } 
}

//cambio de substats de drive disk
let contSubstats = 0;
$(".selected").on("click", ".disk-substat__selectable", function() {
    const substatID = $(this).attr("id_drive-substat-data");
    changeSubstats(substatID);
});
function changeSubstats(substatID = '') {
    const substat = substats[substatID] || 'EMPTY'; // al ser siempre los mismo y ser un array simple no utilizo find id
    if (!$subElementSelected || !$subElementSelected.is(".drive-disk__substats")) {
        $subElementSelected = $("#drive-disks .drive-disk__substats");
        viewSelecter();
    }

    if (substat !== 'EMPTY') {
        contSubstats++;
        if(contSubstats <= 4) {
            if ($subElementSelected.find(".substats__text").text() == generalTextDefault) {
                $subElementSelected.find(".substats__text").empty();
            } else {
                $subElementSelected.find(".substats__text").append(" <i class='fa-solid fa-angle-right'></i>");
            }
            
            $subElementSelected.find(".substats__text").append(` ${substat}`);
        }
    } else {
        $elementSelected.find(".drive-disk__substats .substats__text").empty().append(`${substat}`).end()
            .find(".drive-disk__substats").css("font-size", "");
        contSubstats = 0;
    }

    fixSizeSubstats();
    saveSubstats();
}
function fixSizeSubstats() {
    $subElementSelected = $("#drive-disks .drive-disk__substats");

    const elementWidth = 12;
    let fontSize = 0.65;

    while($subElementSelected.height() > elementWidth) {
        fontSize -= 0.01;
        $subElementSelected.css("font-size", `${fontSize}rem`);
    }
}

// Función generalizada para cambiar personajes o bangboos
$(".selected").on("click", ".character__team__selectable, .bangboo__selectable", function() {
    const isCharacter = $(this).hasClass("character__team__selectable");
    const idData = isCharacter ? $(this).attr("id_character-data") : $(this).attr("id_bangboo-data");
    changeTeam(isCharacter, idData);
});
function changeTeam(isCharacter, idData) {
    const data = isCharacter 
        ? characters.find(char => char.id == idData) || characters.find(char => char.id === 0)
        : bangboos.find(boo => boo.id == idData) || bangboos.find(boo => boo.id == 0);
        
    const dataText = capitalizeEachWord(data.name.replaceAll("_"," "));
    const file = isCharacter ? "char_avatar" : "bangboos_avatar";
    
    if (!$subElementSelected || !$subElementSelected.hasClass(isCharacter ? "team__character__container" : "team__bangboo__container")) {
        $subElementSelected = $(`#team ${isCharacter ? ".team__character__container" : ".team__bangboo__container"}`).first();
        viewSelecter();
    }

    if(data.id !== 0) {
        $subElementSelected.attr("data-id-team", idData);
        if (isCharacter) {
            $subElementSelected.find(".team__character__attribute").attr("src", `img/attributes/${data.attribute}.webp`).removeClass("default");
        }
    } else {
        $subElementSelected.attr("data-id-team", '');
        $subElementSelected.find(".team__character__attribute").addClass("empty");
    }
    $subElementSelected.find(".team__character__rank").attr("src", `img/ranks/char_rank_${data.rarity}_color.webp`);
    $subElementSelected.find(".team__character__img").attr("src", `img/${file}/${data.name}.webp`);
    $subElementSelected.find(".team__character__name").text(data.id !== 0 ? dataText : generalTextDefault);

    saveTeam();
}