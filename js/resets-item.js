// borrar el personaje principal
$(".selected").on("click", "#reset-character", function() {
    deleteCharacter();
});
function deleteCharacter() {
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
}

// borrar las habilidades
$(".selected").on("click", "#reset-skills", function() {
    deleteSkills();
})
function deleteSkills() {
    if ($subElementSelected && $subElementSelected.is(".skills__container")) {
        resetSkillsComponent($subElementSelected);
    } else {
        $elementSelected.find(".skills__container").each(function() {
            resetSkillsComponent($(this));
        });
        
        $elementSelected.find("i").each(function() {
            $(this).removeClass("fa-equals").addClass("fa-angle-right");
        });
    }
}
function resetSkillsComponent($element) {
    const skillImg = "img/skills/default.webp";
    $element.attr("src", skillImg);
}

// borrar los w-engine
$(".selected").on("click", "#reset-w-engines", function() {
    deleteWEngine();
})
function deleteWEngine() {
    if ($subElementSelected && $subElementSelected.is(".w-engine__container")) {
        resetWEngineComponent($subElementSelected)
    } else {
        $elementSelected.find(".w-engine__container").each(function() {
            resetWEngineComponent($(this))
        });
    }
}
function resetWEngineComponent($element) {
    const wEngine = wEngines.find(eng => eng.id === 0);
    const wEngineText = "EMPTY";

    $element.find(".w-engine__component").attr("src", `img/w-engine/${wEngine.name}.webp`);
    $element.find(".w-engine__rarity").addClass("default")

    $element.closest('.w-engine__container').find(".w-engine__name").text(wEngineText).css("font-size", "");
}

// borrar los drive-disk
$(".selected").on("click", "#reset-drive-disks", function() {
    deleteDriveDisk();
})
function deleteDriveDisk() {
    if ($subElementSelected && $subElementSelected.is(".drive-disk__container")) {
        resetDriveDiskComponent($subElementSelected)
    } else {
        $elementSelected.find(".drive-disk__container").each(function() {
            resetDriveDiskComponent($(this))
        });
    }
}
function resetDriveDiskComponent($element) {
    const driveDiskText = "EMPTY!";
    const driveDisk = "default";

    $element.find(".drive-disk__component").attr("src", `img/drive-disks/${driveDisk}.webp`);
    $element.find(".drive-disk__name").text(driveDiskText);
}

// borrar los stats de drive disk
$(".selected").on("click", "#reset-stats", function() {
    deleteStats();
});
function deleteStats() {
    if ($subElementSelected && $subElementSelected.is(".drive-disk__stats__container")) {
        resetStatsComponent($subElementSelected)
    } else {
        $elementSelected.find(".drive-disk__stats__container").each(function() {
            resetStatsComponent($(this))
        });
    }
}
function resetStatsComponent($element) {
    const diskStatText = "EMPT";

    $element.find(".stat__text").empty().append(`<span class="stats__default">${diskStatText}</span>`).css('font-size', '');
}

// borrar los substats de drive disk
$(".selected").on("click", "#reset-substats", function() {
    deleteSubstats();
});
function deleteSubstats() {
    const substat = "EMPTY";

    if ($elementSelected.find(".drive-disk__substats")) {
        $elementSelected.find(".drive-disk__substats .substats__text").empty().append(`${substat}`).end().css("font-size", "");
    }
    contSubstats = 0;
}

// borrar los personajes en seccion team
$(".selected").on("click", "#reset-team-character", function() {
    deleteTeamCharacter();
});
function deleteTeamCharacter() {
    const character = characters.find(char => char.id === 0);
    const file = "char_avatar";

    if ($subElementSelected && $subElementSelected.is(".team__character__container")) {
        $subElementSelected.find(".team__character__attribute").addClass("default");
        deleteTeam($subElementSelected, file, character);
    } else {
        $elementSelected.find(".team__character__container").each(function() {
            $(this).find(".team__character__attribute").addClass("default");
            deleteTeam($(this), file, character);
        });
    }
}

// borrar los bangboo en seccion team
$(".selected").on("click", "#reset-bangboos", function() {
    deleteTeamBangboo();
});
function deleteTeamBangboo() {
    const bangboo = bangboos.find(boo => boo.id === 0);
    const file = "bangboos_avatar";

    if ($subElementSelected && $subElementSelected.parent(".team__characters")) {
        const $element = $subElementSelected.parent(".team__characters").find(".team__bangboo__container");
        deleteTeam($element, file, bangboo)
    } else {
        $elementSelected.find(".team__bangboo__container").each(function() {
            deleteTeam($(this), file, bangboo)
        });
    }
}
function deleteTeam($element, file, char) {
    const charText = "EMPTY";

    $element.find(".team__character__rank").attr("src", `img/ranks/char_rank_${char.name}_color.png`);
    $element.find(".team__character__img").attr("src", `img/${file}/${char.name}.png`);
    $element.find(".team__character__name").text(charText);
}

$("#menu-options #icon-reset").on("click", function() {
    const deleteFunction = {
        "character": deleteCharacter,
        "skills": deleteSkills,
        "w-engines": deleteWEngine,
        "drive-disks": [
            deleteDriveDisk,
            deleteStats,
            deleteSubstats
        ],
        "team": [
            deleteTeamCharacter,
            deleteTeamBangboo
        ]
    };

    $containerEditable.each(function(_, element) {
        $elementSelected = $(element);
        const elementId = $elementSelected.prop("id");
        
        if (Array.isArray(deleteFunction[elementId])) {
            deleteFunction[elementId].forEach(func => func());
        } else {
            deleteFunction[elementId]();
        }
    });
});