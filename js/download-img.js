$(document).ready( function() {
    const characterBuild = $("#character-name").text().replaceAll(" ","-").toLowerCase();

    $(document).on('click', '#download-one', function() {
        // Selecciona el card completo
        let element = document.querySelectorAll('#card');

        generateImage(element, false, $(this));
    });

    $(document).on('click', '#download-all', function() {
        // Selecciona todos los elementos
        let elements = document.querySelectorAll('.screen__item');

        generateImage(elements, true, $(this));
    });

    function generateImage(elements, multiple, loading) {
        // validar existencia de elementos
        if (!elements.length) {
            console.error('Elementos no encontrados');
            return;
        }
        const $loadingElement = loading;
        const loadingText = $loadingElement.text();
        $loadingElement.empty().append("<i class='fa-solid fa-circle-notch loading'></i>");
        // Configurar escala y opciones de renderizado
        const scaler = 4;
    
        if (multiple) {
            // Crear una nueva instancia de JSZip
            let zip = new JSZip();
            let promises = [];
    
            elements.forEach((element) => {
                // opciones de reescalado para la resolucion de imagen
                options = optionScaleImage(element.offsetHeight, element.offsetWidth, scaler)
    
                // Generar imagen para cada elemento
                let promise = domtoimage.toPng(element, options).then(function(dataUrl) {
                    let imgData = dataUrl.split(',')[1]; // Extraer datos de la imagen
                    zip.file(`${characterBuild}_${element.id}.png`, imgData, {base64: true}); // Añadir al ZIP
                }).catch(function(error) {
                    console.error('Error al generar la imagen:', error);
                });
    
                promises.push(promise); // Añadir la promesa a la lista
            });
    
            // Una vez todas las imágenes estén procesadas, generar y descargar el ZIP
            Promise.all(promises).then(function() {
                zip.generateAsync({type: 'blob'}).then(function(content) {
                    saveAs(content, `build_${characterBuild}_zzz.zip`); // Usar FileSaver.js para guardar el archivo
                });
                $loadingElement.empty().text(loadingText);
            });
        } else {
            // Asumir que sólo hay un elemento en `elements` cuando `multiple` es false
            let element = elements[0];

            // opciones de reescalado para la resolucion de imagen
            options = optionScaleImage(element.offsetHeight, element.offsetWidth, scaler)
    
            // Generar y descargar una sola imagen
            domtoimage.toPng(element, options).then(function(dataUrl) {
                // Descargar la imagen
                downloadImage(dataUrl, `build_${characterBuild}_zzz.png`);
                $loadingElement.empty().text(loadingText);
            }).catch(function(error) {
                console.error('Error al generar la imagen:', error);
            });
        }
    }

    function optionScaleImage(height, width, scaler) {
        let margin = 2; // Margen adicional en px
        let options = {
            width: (width + 2 * margin) * scaler,
            height: (height + 2 * margin) * scaler,
            style: {
                bgcolor: null, // Configura el fondo como transparente si es necesario
                transform: 'scale(' + scaler + ')',
                transformOrigin: 'top left',
                width: (width + 2 * margin) + 'px',
                height: (height + 2 * margin) + 'px',
                margin: `-${margin}px 0 0 -${margin}px` // Ajuste para incluir el margen en el contenedor
            }
        };

        return options;
    }
    
    // Función para descargar una imagen
    function downloadImage(dataUrl, filename) {
        let link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        link.click();
    }
})