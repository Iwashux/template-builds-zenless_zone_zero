// borrar el personaje principal
$(".selected").on("click", "#reset-characters", function() {
    const character = characters.find(char => char.id === 0);
    const characterText = "Empty";
    
    $("#character-name").text(characterText);
    $("#character-info-attributes").addClass("default");
    $("#character-faction").attr("src", `img/factions/${character.faction}.png`);

    $("#character-rank").attr("src", `img/ranks/char_rank_${character.rarity}.png`);
    $("#character-img").attr("src", `img/character/${character.name}.png`);
    $("#skills").css("background", character.color)

    if (character.fix) {
        $("#character-img").css("max-width", `${120 + character.fix.width}%`)
            .css("transform", `translateX(${-47 + character.fix.translate}%) scaleX(${character.fix.scale})`)
    }else{
        $("#character-img").css("max-width", "").css("transform", "")
    }
})

// borrar las habilidades
$(".selected").on("click", "#reset-skills", function() {
    const skillImg = "img/skills/default.webp";

    if ($subElementSelected.is(".skills__container")) {
        $subElementSelected.attr("src", skillImg);
    } else {
        $elementSelected.find(".skills__container").each(function() {
            $(this).attr("src", skillImg);
        });
        $elementSelected.find("i").each(function() {
            $(this).removeClass("fa-equals").addClass("fa-angle-right");
        });
    }
})

// borrar los w-engine
$(".selected").on("click", "#reset-w-engines", function() {
    if ($subElementSelected.is(".w-engine__container")) {
        deleteWEngine($subElementSelected)
    } else {
        $elementSelected.find(".w-engine__container").each(function() {
            deleteWEngine($(this))
        });
    }
})
function deleteWEngine($element) {
    const wEngine = wEngines.find(eng => eng.id === 0);
    const wEngineText = "Empty";

    $element.find(".w-engine__component").attr("src", `img/w-engine/${wEngine.name}.webp`);
    $element.find(".w-engine__rarity").addClass("default")

    $element.closest('.w-engine__container').find(".w-engine__name").text(wEngineText).css("font-size", "");
}

// borrar los drive-disk
$(".selected").on("click", "#reset-drive-disks", function() {
    if ($subElementSelected.is(".drive-disk__container")) {
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
    if ($subElementSelected.is(".drive-disk__stats__container")) {
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
    const substat = "EMPTY"; // al ser siempre los mismo y ser un array simple no utilizo find id

    if ($elementSelected.find(".drive-disk__substats")) {
        $elementSelected.find(".drive-disk__substats .substats__text").empty().append(`${substat}`).end().css("font-size", "");
    }
    contSubstats = 0;
});