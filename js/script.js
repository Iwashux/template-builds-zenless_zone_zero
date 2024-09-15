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

// ====== EXTRAS FUNCTIONS ======
function capitalizeEachWord(string) {
    return string.split(" ").map(word => capitalize(word)).join(" ");
}

function capitalize(string) {
    if (!string) return ""; // Manejar el caso de una cadena vacía
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
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