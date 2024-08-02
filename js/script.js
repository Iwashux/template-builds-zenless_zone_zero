let scale = 1;

// redimencion lienso
function fixWidth() { 
    let canvas = $("main");
    let canvasHeight = canvas.height();
    let canvasWidth = canvas.width();

    while ($(window).height() - 50 <= canvasHeight * scale || 
        $(window).width() - 50 <= canvasWidth * scale) {
        scale -= 0.01;
    }

    while ($(window).height() - 50 >= canvasHeight * scale &&
        $(window).width() - 50 >= canvasWidth * scale) {
        scale += 0.01;
    }

    canvas.css("transform", "scale(" + scale + ")");
    console.log(scale);
    
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


function putCharacter() {
    console.log(characters);

    const selectedCharacter = $(".selected__character__conteiner");

    characters.forEach(function(character, index) {
        let characterText = capitalizeEachWord(character.replaceAll("_"," "));

        selectedCharacter.append("<div>");
        selectedCharacter.find("div:last").attr("id_character-data", index).append("<img>")
            .find("img").attr("src", "img/char_avatar/"+character+".png");
            
    });
    
}putCharacter();

function capitalizeEachWord(string) {
    return string.split(" ").map(word => capitalize(word)).join(" ");
}

function capitalize(string) {
    if (!string) return ""; // Manejar el caso de una cadena vacía
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}