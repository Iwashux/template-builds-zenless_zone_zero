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