// ======== CAMBIO INTERACTIVO =======
// cambio de personajes tarjeta
$(".selected").on("click", ".character__selectable", function() {
    const idCharacter = $(this).attr("id_character-data");
    const character = characters.find(char => char.id == idCharacter);

    const characterText = capitalizeEachWord(character.name.replaceAll("_"," "));
    
    $("#character-name").text(characterText);
    $("#character-info-attributes").removeClass("default");
    $("#character-faction").attr("src", `img/factions/${character.faction}.png`);
    $("#character-attribute").attr("src", `img/attributes/${character.attribute}.png`);
    $("#character-specialty").attr("src", `img/specialties/${character.specialty}.png`);
    
    $("#character-img").attr("data-id-character", character.id);
    $("#character-rank").attr("src", `img/ranks/char_rank_${character.rarity}.png`);
    $("#character-img").attr("src", `img/character/${character.name}.png`);
    $("#skills").css("background", character.color)

    if (character.fix) {
        $("#character-img").css("max-width", `${120 + character.fix.width}%`)
            .css("transform", `translateX(${-47 + character.fix.translate}%)`)
    }else{
        $("#character-img").css("max-width", "").css("transform", "")
    }

    putCinema(character.id)
});

// cambio de Nivel de cinema
$(".cinema__level").on("input", function() {
    let value = $(this).val();

    // Eliminar caracteres no permitidos y asegurar que el primer dígito sea 0
    value = value.replace(/[^1-6]/g, ''); 
    // Si hay mas de dos dígitos, actualizar el segundo dígito con el último ingresado
    if (value.length = 1) {
        lastChar = value.slice(-1);
        value = value.slice(0, 0) + lastChar;
    }
    
    // Asegurarse de que siempre comience con un 0
    if (value.length > 0 && value[0] !== '0') {
        value = '0' + value;
    } else if (value.length === 0) {
        value = '0';
    }

    $(this).val(value);

    const idCharacter = $("#character-img").attr("data-id-character")
    putCinema(idCharacter)
});

// cambio de personajes en seccion team
$(".selected").on("click", ".character__team__selectable", function() {
    const idCharacter = $(this).attr("id_character-data");
    const character = characters.find(char => char.id == idCharacter);
    
    const characterText = capitalizeEachWord(character.name.replaceAll("_"," "));

    if ($subElementSelected && !$subElementSelected.hasClass("team__bangboo__container")) {
        $subElementSelected.find(".team__character__rank").attr("src", `img/ranks/char_rank_${character.rarity}_color.png`);
        $subElementSelected.find(".team__character__attribute").attr("src", `img/attributes/${character.attribute}.png`).removeClass("default");
        $subElementSelected.find(".team__character__img").attr("src", `img/char_avatar/${character.name}.png`);
        $subElementSelected.find(".team__character__name").text(characterText);
    }
})

// cambio de habilidades
$(".selected").on("click", ".skill__selectable", function() {
    const skillImg = $(this).attr("src");
    
    if ($subElementSelected) {
        $subElementSelected.attr("src", skillImg);
    }
})

// cambio de iconos en las habilidades (=, >)
$("#skills").on("click", "i", function() {
    const icon = $(this);
    if (icon.is(".fa-equals")) {
        icon.removeClass("fa-equals").addClass("fa-angle-right");
    } else {
        icon.removeClass("fa-angle-right").addClass("fa-equals");
    }
});

// cambio de w-engine
$(".selected").on("click", ".w-engine__selectable", function() {
    // console.log($subElementSelected);
    const idWEngine = $(this).attr("id_w-engine-data");
    const wEngine = wEngines.find(eng => eng.id == idWEngine);

    const wEngineText = wEngine.name.replaceAll("_"," ");
    let fontSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--font-size-text').trim());

    if ($subElementSelected) {
        $subElementSelected.find(".w-engine__rarity").attr("src", `img/ranks/item_rank_${wEngine.rarity}.webp`);
        $subElementSelected.find(".w-engine__component").attr("src", `img/w-engine/${wEngine.name}.webp`);
        $subElementSelected.find(".w-engine__rarity").removeClass("default")

        const $subElementName = $subElementSelected.closest('.w-engine__container').find(".w-engine__name").text(wEngineText);

        if ($subElementSelected.closest(".w-engine__best").length) {
            $subElementName.css("font-size", `${fontSize}rem`);
            let totalHeight = $subElementName.height();
    
            while (totalHeight > 32) {
                fontSize -= 0.01;
                totalHeight = $subElementName.height();
                $subElementName.css("font-size", `${fontSize}rem`);
            }
        }
    }
})

// cambio de drive-disk
$(".selected").on("click", ".drive-disk__selectable", function() {
    const idDriveDisk = $(this).attr("id_drive-disk-data");
    const driveDisk = driveDisks[idDriveDisk]; // al ser siempre los mismo y ser un array simple no utilizo find id
    
    const driveDiskText = capitalizeEachWord(driveDisk.replaceAll("_"," "));

    if ($subElementSelected) {
        $subElementSelected.find(".drive-disk__component").attr("src", `img/drive-disks/${driveDisk}.webp`);
        $subElementSelected.find(".drive-disk__name").text(driveDiskText);
    }
})

//cambio de stats de drive disk
$(".selected").on("click", ".disk-stat__selectable", function() {
    const diskStatID = $(this).attr("id_disk-stat-data");
    
    if ($subElementSelected.hasClass("drive-disk__stats__container")) {
        const diskStatsNumber = $subElementSelected.attr("data-id_stat");
        const diskStatText = diskStats[diskStatsNumber].short_stat[diskStatID];

        if ($subElementSelected.find("span").hasClass("stats__default")) {
            $subElementSelected.find(".stat__text").empty();
        }
        
        if($subElementSelected.find("span").length <= 1) {
            $subElementSelected.find(".stat__text").append(`<span>${diskStatText}</span>`);
        }
    
        checkElements();
    }
});

//cambio de substats de drive disk
let contSubstats = 0;
$(".selected").on("click", ".disk-substat__selectable", function() {
    if ($subElementSelected.hasClass("drive-disk__substats")) {
        const substatID = $(this).attr("id_drive-substat-data");
        const substat = substats[substatID]; // al ser siempre los mismo y ser un array simple no utilizo find id
        const elementHeight = $subElementSelected.height();
        let fontSize = 0.65;
        
        contSubstats++;
        if(contSubstats <= 4) {
            if ($subElementSelected.find(".substats__text").text() == "EMPTY") {
                $subElementSelected.find(".substats__text").empty();
            } else {
                $subElementSelected.find(".substats__text").append(" <i class='fa-solid fa-angle-right'></i>");
            }

            $subElementSelected.find(".substats__text").append(` ${substat}`);
        }

        while($subElementSelected.height() > elementHeight) {
            fontSize -= 0.01;
            $subElementSelected.css("font-size", `${fontSize}rem`)
        }
    }
});

// cambio de bangboos en seccion team
$(".selected").on("click", ".bangboo__selectable", function() {
    const idBangboo = $(this).attr("id_bangboo-data");
    const bangboo = bangboos.find(boo => boo.id == idBangboo);
    
    const bangbooText = capitalizeEachWord(bangboo.name.replaceAll("_"," "));

    if ($subElementSelected.hasClass("team__bangboo__container")) {
        $subElementSelected.find(".team__character__rank").attr("src", `img/ranks/char_rank_${bangboo.rarity}_color.png`);
        $subElementSelected.find(".team__character__img").attr("src", `img/bangboos_avatar/${bangboo.name}.png`);
        $subElementSelected.find(".team__character__name").text(bangbooText);
    }
})