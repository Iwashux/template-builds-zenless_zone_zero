userHeight = 1329;
userWitdh = 1023;

canvas = $("main");


console.log("alto: " + $(window).height() + " ancho: " + $(window).width());

// fixWidth(userWitdh, userHeight); 

// // cambiar tamaño de pantalla
// $(window).resize(function(){
//     fixWidth(userWitdh, userHeight)
// })

// // cambio de proporciones del lienso
// function fixWidth(userWitdh, userHeight) { 
//     heightCanvas = canvas.height();

//     canvas.width(heightCanvas * userWitdh / userHeight);
//     console.log(heightCanvas * userWitdh / userHeight);
// }

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





$(document).ready( function() {
    $('#download').on('click', function() {
        // Selecciona el canvas y los elementos que quieres capturar
        let canvas = document.getElementById('canvas');
        let elementos = canvas.querySelectorAll('#team .team__conteiner');
    
        if (!elementos.length) {
            console.error('Elementos no encontrados');
            return;
        }
    
        // Configurar escala y opciones de renderizado
        const scaler = 4;
    
        elementos.forEach((elemento, index) => {
            let width = elemento.offsetWidth;
            let height = elemento.offsetHeight;
    
            let options = {
                width: width * scaler,
                height: height * scaler,
                style: {
                    bgcolor: null, // Configura el fondo como transparente si es necesario
                    transform: 'scale(' + scaler + ')',
                    transformOrigin: 'top left',
                    width: width + 'px',
                    height: height + 'px'
                }
            };
    
            // Generar imagen para cada elemento
            domtoimage.toPng(elemento, options).then(function(dataUrl) {
                // Crear imagen
                let img = new Image();
                img.src = dataUrl;
    
                // Descargar la imagen
                downloadImage(dataUrl, `imagen_${index + 1}.png`);
    
            }).catch(function(error) {
                console.error('Error al generar la imagen:', error);
            });
        });
    });
    
    // Función para descargar una imagen
    function downloadImage(dataUrl, filename) {
        let link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        link.click();
    }
})
