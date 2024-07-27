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