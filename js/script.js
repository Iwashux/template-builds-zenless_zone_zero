let canvasScaler = 1;

// $(window).resize(function() {
//     fixWidth();
// });

// redimencion lienso
function fixWidth() { 
    let card = $("#card");
    let canvasHeight = card.outerHeight(true) + 4;
    let canvasWidth = card.outerWidth(true) + 4;

    while ($(window).height() <= canvasHeight * canvasScaler || 
        ($(window).width() - 325) <= canvasWidth * canvasScaler && canvasScaler >= 0.5) {
        canvasScaler -= 0.1;
    }

    while ($(window).height() >= canvasHeight * canvasScaler &&
        ($(window).width() - 325) >= canvasWidth * canvasScaler) {
        canvasScaler += 0.1;
    }

    while ($(window).height() <= canvasHeight * canvasScaler || 
        ($(window).width() - 325) <= canvasWidth * canvasScaler && canvasScaler >= 0.5) {
        canvasScaler -= 0.01;
    }

    let newCanvasWidht = (canvasWidth * canvasScaler) - canvasWidth;
    let newCanvasHeight = (canvasHeight * canvasScaler) - canvasHeight;
    card.css("transform", `scale(${canvasScaler})`);
    card.css("margin", `${newCanvasHeight / 2 + 20}px ${newCanvasWidht / 2}px`);
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

$(".cinema__level").on("focusout", function() {
    let value = $(this).val();

    if (value.length == 1) {
        $(this).val("01");
    }
});

$(".cinema__info").on("click", function() {
    cinemaText = $(this);
    
    if(cinemaText.prop("contenteditable") == "true" && cinemaText.text() == "EMPTY"){
        var range = document.createRange();
        range.selectNodeContents(this); // Selecciona todo el contenido del elemento
        var selection = window.getSelection();
        selection.removeAllRanges(); // Elimina cualquier selección previa
        selection.addRange(range); // Añade el nuevo rango seleccionado
    }
    
});

// ====== EXTRAS FUNCTIONS ======
function capitalizeEachWord(string) {
    return string.split(" ").map(word => capitalize(word)).join(" ");
}

function capitalize(string) {
    if (!string) return ""; // Manejar el caso de una cadena vacía
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// Cambio de tamanio stact de los drive diks
function checkElements() {
    const $elementsView = $(".stat__text");

    $elementsView.each(function() {
        const elementWidth = $(this).width();
        let sumComponent = 0;

        const $elementHeight = $(this).find("span");
        $elementHeight.each(function() {
            sumComponent += $(this).height();
        });
                
        if (elementWidth >= 36 && sumComponent >= 20) {
            $(this).css('font-size', '.5rem'); // Prioridad si ambos se cumplen
        } else if (elementWidth >= 36) {
            $(this).css('font-size', '.6rem');
        } else if (sumComponent >= 20) {
            $(this).css('font-size', '.5rem');
        } else {
            $(this).css('font-size', '');
        }

    });
}

// Quita la correccies / para la generacion de la imagen
$('[contenteditable]').attr({
    spellcheck: 'false',
    autocorrect: 'off',
    autocapitalize: 'off'
});

// animacion de reset
$('.selected__items').on('mouseenter', '.spin-icon', function () {
    let $this = $(this);

    // Si el elemento ya tiene la clase 'animating', no hacer nada
    if (!$this.hasClass('animating')) {
        // Añadir la clase para iniciar la animación
        $this.addClass('animating');

        // Usar un timeout para quitar la clase después de que la animación termine
        setTimeout(function() {
            $this.removeClass('animating');
        }, 1500); // Tiempo que dura la animación (1.5s)
    }
});