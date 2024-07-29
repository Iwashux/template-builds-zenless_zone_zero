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