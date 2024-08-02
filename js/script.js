let scale = 1;

// cambio de proporciones del lienso
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

const elementsView = $(".stat__text");

function checkElements() {
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
  }

checkElements();
