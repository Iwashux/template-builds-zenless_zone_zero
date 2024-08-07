let canvasScaler = 1;

// $(window).resize(function() {
//     fixWidth();
// });

// redimencion lienso
function fixWidth() { 
    let canvas = $("main");
    let canvasHeight = canvas.outerHeight(true) + 4;
    let canvasWidth = canvas.outerWidth(true) + 4;

    while ($(window).height() <= canvasHeight * canvasScaler || 
        ($(window).width() - 560) <= canvasWidth * canvasScaler && canvasScaler >= 0.5) {
        canvasScaler -= 0.01;
    }

    while ($(window).height() >= canvasHeight * canvasScaler &&
        ($(window).width() - 560) >= canvasWidth * canvasScaler) {
        canvasScaler += 0.01;
    }

    let newCanvasWidht = (canvasWidth * canvasScaler) - canvasWidth;
    let newCanvasHeight = (canvasHeight * canvasScaler) - canvasHeight;
    canvas.css("transform", `scale(${canvasScaler})`);
    canvas.css("margin", `${newCanvasHeight / 2 + 20}px ${newCanvasWidht / 2}px`);
    console.log(canvasScaler);
    
}fixWidth();

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

$(".cinema__level").on("click", function(event) {
    if (!$(this).prop("readonly")) {
        event.stopPropagation();
    }
});




// PRUEBAS
function checkElements() {
    const elementsView = $(".stat__text");

    elementsView.each(function() {
        let elementCount = $(this).children().length;
        if (elementCount == 1) {
            $(this).css('font-size', '');
        } else if(elementCount == 2) {
            $(this).css('font-size', '.4rem');
        } else {
            $(this).css('font-size', '.3rem');
        }
    });
}checkElements();

var activeTimeout;

$("#w-engine, #drive-disk, #team").on("click", function() {
    var element = $(this);
    $("#w-engine, #drive-disk, #team").removeClass("conteiner__active");

    // Detener la animación anterior si está en curso
    if (activeTimeout) {
        clearTimeout(activeTimeout);
    }

    element.addClass("conteiner__active");

    // Iniciar nueva animación
    activeTimeout = setTimeout(function() {
        element.removeClass("conteiner__active");
    }, 1500);
});

function putWEngine() {
    console.log(wEngines);

    const selectedComponent = $(".selected__item__conteiner");
    selectedComponent.empty();

    wEngines.forEach(function(wEngine, index) {
        selectedComponent.append(
            `<div class="w-engine__selectable component__selectable" id_w-engine-data='${index}'>
                <div>
                    <img class="component__selectable__rank" src="img/ranks/item_rank_${wEngine.rarity}.webp" alt="">
                </div>
                <img class="component" src="img/w-engine/${wEngine.name}.webp" alt="">
            </div>`
        );
    });

    selectedComponent.parent().find("h2").text("W-Engine")
    
}putWEngine();

function putDriveDisk() {
    console.log(driveDisks);

    const selectedComponent = $(".selected__item__conteiner");
    selectedComponent.empty();

    driveDisks.forEach(function(driveDisk, index) {
        selectedComponent.append(
            `<div class="drive-disk__selectable component__selectable" id_w-engine-data='${index}'>
                <img class="component" src="img/drive-disks/${driveDisk}.webp" alt="">
            </div>`
        );
    });

    selectedComponent.parent().find("h2").text("Drive-Disks")
    
}putDriveDisk();


function putCharacter() {
    console.log(characters);

    const selectedCharacter = $(".selected__character__conteiner");
    selectedCharacter.empty();

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


$(".selected__character__conteiner").on("click", ".character__selectable", function() {
    idCharacter = $(this).attr("id_character-data");
    character = characters[idCharacter];

    let characterText = capitalizeEachWord(character.name.replaceAll("_"," "));
    
    $("#character-name").text(characterText);
    $("#character-info-attributes").removeClass("default");
    $("#character-faction").attr("src", `img/factions/${character.faction}.png`);
    $("#character-attribute").attr("src", `img/attributes/${character.attribute}.png`).removeClass();
    $("#character-specialty").attr("src", `img/specialties/${character.specialty}.png`).removeClass();

    $("#character-rank").attr("src", `img/ranks/char_rank_${character.rarity}.png`);
    $("#character-img").attr("src", `img/character/${character.name}.png`);
    $("#skills").css("background", character.color)
});

$("#skills").on("click", "i", function() {
    var icon = $(this);
    if (icon.hasClass("fa-equals")) {
        icon.removeClass("fa-equals").addClass("fa-angle-right");
    } else {
        icon.removeClass("fa-angle-right").addClass("fa-equals");
    }
});