// ======== CAMBIO INTERACTIVO =======
// cambio de personajes tarjeta
$(".selected").on("click", ".character__selectable", function() {
    const idCharacter = $(this).attr("id_character-data");
    changeCharacter(idCharacter)
});
function changeCharacter(idCharacter) {
    const character = characters.find(char => char.id == idCharacter) || characters.find(char => char.name == 'default');
    const characterText = capitalizeEachWord(character.name.replaceAll("_"," "));
    
    $("#character-name").text(characterText);
    $("#character-faction").attr("src", `img/factions/${character.faction}.png`);
    
    $("#character-img").attr("data-id-character", character.id);
    $("#character-rank").attr("src", `img/ranks/char_rank_${character.rarity}.png`);
    $("#character-img").attr("src", `img/character/${character.name}.png`);
    $("#skills").css("background", character.color)
    
    if (character.id !== 0) {
        $("#character-attribute").attr("src", `img/attributes/${character.attribute}.png`);
        $("#character-specialty").attr("src", `img/specialties/${character.specialty}.png`);
        $("#character-info-attributes").removeClass("default");
    } else {
        $("#character-info-attributes").addClass("default");
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
    const skill = skills[idSkill] || 'default';
    
    if ($subElementSelected) {
        $subElementSelected.attr("data-skill", idSkill);
        $subElementSelected.attr("src", `img/skills/${skill}.webp`);
    }
    
    saveSkills();
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
    putCinema(idCharacter)
});
function changeCinema(numberCinema) {

}
// cinema switch click
$(".cinema__switch__button").on("click", function() {
    let element = $(this);
    let thisInput = element.find("input");
    let thisInfo = element.closest(".cinema__best").find(".cinema__info");

    element.toggleClass("active");

    if (element.hasClass("active")) {
        thisInput.val("01").prop("readonly", false).add(thisInfo).css("opacity", "1");
        thisInfo.prop("contenteditable", true)
    } else {
        thisInput.val("00").prop("readonly", true).add(thisInfo).css("opacity", ".5");
        thisInfo.prop("contenteditable", false).text("EMPTY")
    }
});
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
});

// cambio de w-engine
$(".selected").on("click", ".w-engine__selectable", function() {
    // console.log($subElementSelected);
    const idWEngine = $(this).attr("id_w-engine-data");
    changeWEngine(idWEngine);
})
function changeWEngine(idWEngine) {
    const wEngine = wEngines.find(eng => eng.id == idWEngine) || wEngines.find(eng => eng.name == 'default');
    const wEngineText = wEngine.name.replaceAll("_"," ");
    
    if ($subElementSelected) {
        $subElementSelected.find(".w-engine__component").attr("src", `img/w-engine/${wEngine.name}.webp`);
        if (wEngine.name !== 'default') {
            $subElementSelected.attr("data-w-engine", wEngine.id)
            $subElementSelected.find(".w-engine__rarity").attr("src", `img/ranks/item_rank_${wEngine.rarity}.webp`);
            $subElementSelected.find(".w-engine__rarity").removeClass("default");
        } else {
            $subElementSelected.attr("data-w-engine", '')
            $subElementSelected.find(".w-engine__rarity").addClass("default");
        }
        
        const $subElementName = $subElementSelected.closest('.w-engine__container').find(".w-engine__name").text(wEngineText);
        
        if ($subElementSelected.closest(".w-engine__best").length) {
            wEngineFixText($subElementName)
        }
        
        saveWEngine()
    }
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
    const driveDisk = driveDisks[idDriveDisk] || 'default'; // al ser siempre los mismo y ser un array simple no utilizo find id
    
    const driveDiskText = capitalizeEachWord(driveDisk.replaceAll("_"," "));
    
    if ($subElementSelected) {
        $subElementSelected.attr("data-drive-disk", idDriveDisk)
        $subElementSelected.find(".drive-disk__component").attr("src", `img/drive-disks/${driveDisk}.webp`);
        $subElementSelected.find(".drive-disk__name").text(driveDiskText);
    
        saveDriveDisk();
    }
}

//cambio de stats de drive disk
$(".selected").on("click", ".disk-stat__selectable", function() {
    const diskStatID = $(this).attr("id_disk-stat-data");
    changeStats(diskStatID);
});
function changeStats(diskStatID = '') {
    if ($subElementSelected && $subElementSelected.hasClass("drive-disk__stats__container")) { 
        const diskStatsNumber = $subElementSelected.attr("data-num_stat");
        const diskStat = diskStats.find(stat => stat.number == diskStatsNumber);
        const diskStatText = diskStat.short_stat[diskStatID] || 'EMPT';
        
        if(diskStatText !== 'EMPT') {
            if ($subElementSelected.find("span").hasClass("stats__default")) {
                $subElementSelected.find(".stat__text").empty();
            }
            
            if($subElementSelected.find("span").length <= 1) {
                $subElementSelected.find(".stat__text").append(`<span>${diskStatText}</span>`);
            }
        } else {
            $subElementSelected.find(".stat__text").empty().append(`<span class="stats__default">${diskStatText}</span>`).css('font-size', '');
        }
    
        fixSizeStats();
        saveStats();
    }
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

    if (substat !== 'EMPTY') {
        if ($subElementSelected && $subElementSelected.hasClass("drive-disk__substats")) {
            contSubstats++;
            if(contSubstats <= 4) {
                if ($subElementSelected.find(".substats__text").text() == "EMPTY") {
                    $subElementSelected.find(".substats__text").empty();
                } else {
                    $subElementSelected.find(".substats__text").append(" <i class='fa-solid fa-angle-right'></i>");
                }
                
                $subElementSelected.find(".substats__text").append(` ${substat}`);
            }
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
        ? characters.find(char => char.id == idData) || characters.find(char => char.name == 'default')
        : bangboos.find(boo => boo.id == idData) || bangboos.find(boo => boo.name == 'default');
        
    const dataText = capitalizeEachWord(data.name.replaceAll("_"," "));
    const file = isCharacter ? "char_avatar" : "bangboos_avatar";
    
    if ($subElementSelected && $subElementSelected.hasClass(isCharacter ? "team__character__container" : "team__bangboo__container")) {
        if(data.name !== 'default') {
            $subElementSelected.attr("data-id-team", idData);
            if (isCharacter) {
                $subElementSelected.find(".team__character__attribute").attr("src", `img/attributes/${data.attribute}.png`).removeClass("default");
            }
        } else {
            $subElementSelected.attr("data-id-team", '');
            $subElementSelected.find(".team__character__attribute").addClass("default");
        }
        $subElementSelected.find(".team__character__rank").attr("src", `img/ranks/char_rank_${data.rarity}_color.png`);
        $subElementSelected.find(".team__character__img").attr("src", `img/${file}/${data.name}.png`);
        $subElementSelected.find(".team__character__name").text(dataText);
    
        saveTeam();
    }
}