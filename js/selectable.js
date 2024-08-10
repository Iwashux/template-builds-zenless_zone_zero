let elementSelected;
let subElementSelected;
let activeElement;


// selecciona seccion de iteams
let activeTimeout;
$("#w-engine, #drive-disk, #team").on("click", function(event) {
    elementSelected = $(this);
    const target = $(event.target);
    subElementSelected = target.closest('.w-engine__container').find(".w-engine__component");
    $(".w-engine__component").css("filter","");

    if (subElementSelected.length) {
        subElementSelected.css("filter","drop-shadow(0px 0px 5px yellow)");
    }

    if (activeElement?.is(elementSelected)) {
        return; // Si es el mismo, salir sin hacer nada
    }
    
    $("#w-engine, #drive-disk, #team").removeClass("container__active"); // Detener la animación anterior si está en curso
    
    // Reinicia la animación si es necesario
    if (activeTimeout) {
        clearTimeout(activeTimeout);
    }
    
    elementSelected.addClass("container__active");
    activeElement = elementSelected;
    
    // Iniciar nueva animación
    activeTimeout = setTimeout(() => {
        elementSelected.removeClass("container__active");
    }, 1500);
});

function putWEngine() {
    console.log(wEngines);

    const selectedComponent = $(".selected__item__container");
    selectedComponent.empty();

    wEngines.forEach(function(wEngine, index) {
        if (wEngine.rarity) {
            selectedComponent.append(
                `<div class="w-engine__selectable component__selectable" id_w-engine-data='${index}'>
                    <div>
                        <img class="component__selectable__rank" src="img/ranks/item_rank_${wEngine.rarity}.webp" alt="">
                    </div>
                    <img class="component" src="img/w-engine/${wEngine.name}.webp" alt="">
                </div>`
            );
        }
    });

    selectedComponent.parent().find("h2").text("W-Engine")
    
}putWEngine();

function putDriveDisk() {
    console.log(driveDisks);

    const selectedComponent = $(".selected__item__container");
    selectedComponent.empty();

    driveDisks.forEach(function(driveDisk, index) {
        selectedComponent.append(
            `<div class="drive-disk__selectable component__selectable" id_w-engine-data='${index}'>
                <img class="component" src="img/drive-disks/${driveDisk}.webp" alt="">
            </div>`
        );
    });

    selectedComponent.parent().find("h2").text("Drive-Disks")
    
}//putDriveDisk();


function putCharacter() {
    console.log(characters);

    const selectedCharacter = $(".selected__character__container");
    // selectedCharacter.empty();

    characters.forEach(function(character, index) {
        let characterText = capitalizeEachWord(character.name.replaceAll("_"," "));

        if (character.active) {
            selectedCharacter.append(
                `<div class="character__selectable component__selectable" id_character-data='${index}'>
                    <div component__selectable__info>
                        <img class="component__selectable__rank" src="img/ranks/char_rank_${character.rarity}_color.png" alt="">
                        <img class="component__selectable__attribute" src="img/attributes/${character.attribute}.png" alt="">
                    </div>
                    <img class="component" src="img/char_avatar/${character.name}.png" alt="">
                    <p class="component__name">${characterText}</p>
                </div>`
            );
        }
    });
    
}putCharacter();

function capitalizeEachWord(string) {
    return string.split(" ").map(word => capitalize(word)).join(" ");
}

function capitalize(string) {
    if (!string) return ""; // Manejar el caso de una cadena vacía
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// cambio de personajes
$(".selected__character__container").on("click", ".character__selectable", function() {
    let idCharacter = $(this).attr("id_character-data");
    let character = characters[idCharacter];

    let characterText = capitalizeEachWord(character.name.replaceAll("_"," "));
    
    $("#character-name").text(characterText);
    $("#character-info-attributes").removeClass("default");
    $("#character-faction").attr("src", `img/factions/${character.faction}.png`);
    $("#character-attribute").attr("src", `img/attributes/${character.attribute}.png`);
    $("#character-specialty").attr("src", `img/specialties/${character.specialty}.png`);

    $("#character-rank").attr("src", `img/ranks/char_rank_${character.rarity}.png`);
    $("#character-img").attr("src", `img/character/${character.name}.png`);
    $("#skills").css("background", character.color)
});

$(".selected__item__container").on("click", ".w-engine__selectable", function() {
    let idWEngine = $(this).attr("id_w-engine-data");
    let wEngine = wEngines[idWEngine];
    let fontSize = 0.75;

    console.log(wEngine);

    let wEngineText = wEngine.name.replaceAll("_"," ");

    if (subElementSelected) {
        subElementSelected.closest(".w-engine__container").find(".w-engine__rarity").attr("src", `img/ranks/item_rank_${wEngine.rarity}.webp`);
        subElementSelected.attr("src", `img/w-engine/${wEngine.name}.webp`);

        console.log(subElementSelected.closest(".w-engine__best"));
        let subElementName = subElementSelected.closest('.w-engine__container').find(".w-engine__name").text(wEngineText);
        

        // if (subElementSelected.closest(".w-engine__best").length > 0) {
        //     let totalHeight = subElementName.height();
    
        //     subElementName.css("font-size", `${fontSize}rem`);
    
        //     while (totalHeight > 32) {
        //         fontSize -= 0.01;
        //         totalHeight = subElementName.height();
        //         subElementName.css("font-size", `${fontSize}rem`);
        //         console.log("entre");
        //     }
        // }
    }
})

// camvio de iconos en las habilidades (=, >)
$("#skills").on("click", "i", function() {
    let icon = $(this);
    if (icon.hasClass("fa-equals")) {
        icon.removeClass("fa-equals").addClass("fa-angle-right");
    } else {
        icon.removeClass("fa-angle-right").addClass("fa-equals");
    }
});