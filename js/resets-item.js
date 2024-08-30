// borrar el personaje principal
$(".selected").on("click", "#reset-character", function() {
    const character = characters.find(char => char.id === 0);
    const characterText = "Empty";
    
    $("#character-name").text(characterText);
    $("#character-info-attributes").addClass("default");
    $("#character-faction").attr("src", `img/factions/${character.faction}.png`);

    $("#character-img").attr("data-id-character", "");
    $("#character-rank").attr("src", `img/ranks/char_rank_${character.rarity}.png`);
    $("#character-img").attr("src", `img/character/${character.name}.png`);
    $("#skills").css("background", character.color)

    if (character.fix) {
        $("#character-img").css("max-width", `${120 + character.fix.width}%`)
            .css("transform", `translateX(${-47 + character.fix.translate}%) scaleX(${character.fix.scale})`)
    }else{
        $("#character-img").css("max-width", "").css("transform", "")
    }

    putCinema(character.id)
})

// borrar las habilidades
$(".selected").on("click", "#reset-skills", function() {
    if ($subElementSelected && $subElementSelected.is(".skills__container")) {
        deleteSkills($subElementSelected);
    } else {
        $elementSelected.find(".skills__container").each(function() {
            deleteSkills($(this));
        });
        
        $elementSelected.find("i").each(function() {
            $(this).removeClass("fa-equals").addClass("fa-angle-right");
        });
    }
})
function deleteSkills($element) {
    const skillImg = "img/skills/default.webp";
    $element.attr("src", skillImg);
}

// borrar los w-engine
$(".selected").on("click", "#reset-w-engines", function() {
    if ($subElementSelected && $subElementSelected.is(".w-engine__container")) {
        deleteWEngine($subElementSelected)
    } else {
        $elementSelected.find(".w-engine__container").each(function() {
            deleteWEngine($(this))
        });
    }
})
function deleteWEngine($element) {
    const wEngine = wEngines.find(eng => eng.id === 0);
    const wEngineText = "EMPTY";

    $element.find(".w-engine__component").attr("src", `img/w-engine/${wEngine.name}.webp`);
    $element.find(".w-engine__rarity").addClass("default")

    $element.closest('.w-engine__container').find(".w-engine__name").text(wEngineText).css("font-size", "");
}

// borrar los drive-disk
$(".selected").on("click", "#reset-drive-disks", function() {
    if ($subElementSelected && $subElementSelected.is(".drive-disk__container")) {
        deleteDriveDisk($subElementSelected)
    } else {
        $elementSelected.find(".drive-disk__container").each(function() {
            deleteDriveDisk($(this))
        });
    }
})
function deleteDriveDisk($element) {
    const driveDiskText = "EMPTY!";
    const driveDisk = "default";

    $element.find(".drive-disk__component").attr("src", `img/drive-disks/${driveDisk}.webp`);
    $element.find(".drive-disk__name").text(driveDiskText);
}

// borrar los stats de drive disk
$(".selected").on("click", "#reset-stats", function() {
    if ($subElementSelected && $subElementSelected.is(".drive-disk__stats__container")) {
        deleteDiskStat($subElementSelected)
    } else {
        $elementSelected.find(".drive-disk__stats__container").each(function() {
            deleteDiskStat($(this))
        });
    }
});
function deleteDiskStat($element) {
    const diskStatText = "EMPT";

    $element.find(".stat__text").empty().append(`<span class="stats__default">${diskStatText}</span>`).css('font-size', '');
}

// borrar los substats de drive disk
$(".selected").on("click", "#reset-substats", function() {
    const substat = "EMPTY";

    if ($elementSelected.find(".drive-disk__substats")) {
        $elementSelected.find(".drive-disk__substats .substats__text").empty().append(`${substat}`).end().css("font-size", "");
    }
    contSubstats = 0;
});
// +===============================================================================================+
// borrar los personajes en seccion team FALTA ESTOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
// +===============================================================================================+
$(".selected").on("click", "#reset-team-characters", function() {
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

// borrar los personajes en seccion team
$(".selected").on("click", "#reset-bangboos", function() {
    const bangboo = bangboos.find(boo => boo.id === 0);
    const bangbooText = "EMPTY";

    console.log($subElementSelected.find(".team__bangboo__container"));
    
    
    if ($subElementSelected && $subElementSelected.parent(".team__characters")) {
        const $element = $subElementSelected.parent(".team__characters").find(".team__bangboo__container");

        $element.find(".team__character__rank").attr("src", `img/ranks/char_rank_${bangboo.name}_color.png`);
        $element.find(".team__character__img").attr("src", `img/bangboos_avatar/${bangboo.name}.png`);
        $element.find(".team__character__name").text(bangbooText);
    } else {
        $elementSelected.find(".team__bangboo__container").each(function() {
            console.log("aqui");
            
            $(this).find(".team__character__rank").attr("src", `img/ranks/char_rank_${bangboo.name}_color.png`);
            $(this).find(".team__character__img").attr("src", `img/bangboos_avatar/${bangboo.name}.png`);
            $(this).find(".team__character__name").text(bangbooText);
        });
    }
})