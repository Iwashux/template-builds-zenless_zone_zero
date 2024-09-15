// borrar el personaje principal
$(".selected").on("click", "#reset-character", function() {
    changeCharacter();
});

// delete para elementos con multiples items
function deleteMultipleItems(changeFuction, subContainerElement) {
    if ($subElementSelected && $subElementSelected.is(subContainerElement)) {
        changeFuction();
    } else {
        $elementSelected.find(subContainerElement).each(function() {
            $subElementSelected = $(this);
            changeFuction();
        });
        $subElementSelected = null;
    }
}

// borrar las habilidades
$(".selected").on("click", "#reset-skills", function() {
    if (!$subElementSelected) {
        $elementSelected.find("i").map((_,elem) => $(elem).removeClass("fa-equals").addClass("fa-angle-right")); //
    }
    deleteMultipleItems(changeSkills, ".skills__container");
});

// borrar los w-engine
$(".selected").on("click", "#reset-w-engines", function() {
    deleteMultipleItems(changeWEngine, ".w-engine__container");
})

// borrar los drive-disk
$(".selected").on("click", "#reset-drive-disks", function() {
    deleteMultipleItems(changeDriveDisk, ".drive-disk__container");
})

// borrar los stats de drive disk
$(".selected").on("click", "#reset-stats", function() {
    deleteMultipleItems(changeStats, ".drive-disk__stats__container");
});

// borrar los substats de drive disk
$(".selected").on("click", "#reset-substats", function() {
    changeSubstats();
});

// borrar los personajes en seccion team
$(".selected").on("click", "#reset-team-character", function() {
    deleteMultipleItems(() => changeTeam(true), ".team__character__container");
});

// borrar los bangboo en seccion team
$(".selected").on("click", "#reset-bangboos", function() {
    deleteMultipleItems(() => changeTeam(false), ".team__bangboo__container");
});

$(".selected").on("click", "#delete-all", function() {
    const deleteFunction = {
        "character": changeCharacter,
        "skills": () => deleteMultipleItems(changeSkills, ".skills__container"),
        "w-engines": () => deleteMultipleItems(changeWEngine, ".w-engine__container"),
        "drive-disks": [
            () => deleteMultipleItems(changeDriveDisk, ".drive-disk__container"),
            () => deleteMultipleItems(changeStats, ".drive-disk__stats__container"),
            changeSubstats
        ],
        "team": [
            () => deleteMultipleItems(() => changeTeam(true), ".team__character__container"),
            () => deleteMultipleItems(() => changeTeam(false), ".team__bangboo__container")
        ]
    };

    $containerEditable.each(function(_, element) {
        $elementSelected = $(element);
        const elementId = $elementSelected.prop("id");
        
        const funcs = deleteFunction[elementId];
        
        if (Array.isArray(funcs)) {
            funcs.forEach(func => func());
        } else if (typeof funcs === 'function') {
            funcs();
        }
    });

    resetCinema();
    localStorage.clear();
});

function resetCinema() {
    $elementCinema = $("#cinema");
    $elementCinema.find(".cinema__level").map((_,element) => $(element).val("00"));
    cinemaLevelCheck($elementCinema.find(".cinema__level"), $elementCinema.find(".cinema__info"));
    saveCinemaLevel();
}