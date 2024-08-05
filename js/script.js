// let scale = 1;

// // redimencion lienso
// function fixWidth() { 
//     let canvas = $("main");
//     let canvasHeight = canvas.outerHeight(true);
//     let canvasWidth = canvas.width();

//     while ($(window).height() <= canvasHeight * scale || 
//         $(window).width() <= canvasWidth * scale) {
//         scale -= 0.01;
//     }

//     while ($(window).height() >= canvasHeight * scale &&
//         $(window).width() >= canvasWidth * scale) {
//         scale += 0.01;
//     }

//     canvas.css("transform", "scale(" + scale + ")");
//     console.log(scale);
    
// }fixWidth();

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
    console.log(wEngeines);

    const selectedComponent = $(".selected__component__conteiner");

    wEngeines.forEach(function(wEngeine, index) {
        selectedComponent.append(
            `<div class="w-engine__conteiner" id_w-engine-data='${index}'>
                <img class="w-engine__rarity" src="img/ranks/item_rank_${wEngeine.rarity}.webp" alt="">
                <img class="w-engine__img" src="img/w-engine/${wEngeine.name}.webp" alt="">
            </div>`
        );
    });
    
}putWEngine();


function putCharacter() {
    console.log(characters);

    const selectedCharacter = $(".selected__character__conteiner");

    characters.forEach(function(character, index) {
        let characterText = capitalizeEachWord(character.name.replaceAll("_"," "));

        if (character.active) {
            selectedCharacter.append(
                `<div class='character__avatar' id_character-data='${index}'>
                    <div class="team__character__info">
                        <img src="img/ranks/char_rank_${character.rarity}_color.png" alt="">
                        <img src="img/attributes/${character.attribute}.png" alt="">
                    </div>
                    <img src="img/char_avatar/${character.name}.png" alt="">
                    <p class="team__characters__name">${characterText}</p>
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


$(document).on("click", ".character__avatar", function() {
    idCharacter = $(this).attr("id_character-data");
    character = characters[idCharacter];

    let characterText = capitalizeEachWord(character.name.replaceAll("_"," "));
    
    $("#character-name").text(characterText);
    $("#character-info-attributes").removeClass("default");
    $("#character-faction").attr("src", `img/factions/${character.faction}.png`);
    $("#character-attribute").attr("src", `img/attributes/${character.attribute}.png`).removeClass();
    $("#character-specialty").attr("src", `img/specialties/${character.specialty}.png`).removeClass();

    $("#character-rank").attr("src", `img/ranks/char_rank_${character.rarity}.png`);
});