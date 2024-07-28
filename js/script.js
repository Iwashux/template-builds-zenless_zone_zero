userHeight = 1329;
userWitdh = 1023;

canvas = $("main");

fixWidth(userWitdh, userHeight); 

// cambiar tamaño de pantalla
$(window).resize(function(){
    fixWidth(userWitdh, userHeight)
})

// cambio de proporciones del lienso
function fixWidth(userWitdh, userHeight) { 
    heightCanvas = canvas.height();

    canvas.width(heightCanvas * userWitdh / userHeight);
}

$(".cinema__switch__button").on("click", function() {
    $(this).toggleClass("active");

    if ($(this).hasClass("active")) {
        $(this).find("input").val("01").prop("readonly", false).css("opacity", "1");
    } else {
        $(this).find("input").val("00").prop("readonly", true).css("opacity", ".5");
    }
});

$(".cinema__level").on("click", function(event) {
    if (!$(this).prop("readonly")) {
        event.stopPropagation();
    }
});