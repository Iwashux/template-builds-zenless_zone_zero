// VIZUALIZACION DE LA SECCION DE SELECCION
let elementSelected;
let subElementSelected;
let activeElement;

// selecciona seccion de iteams
let activeTimeout;
$("#skills, #w-engine, #drive-disk, #team").on("click", function(event) {
    elementSelected = $(this);
    let section = elementSelected.prop('id');
    
    sectionAnimation(section);

    const target = $(event.target);
    subElementSelected = target.closest(`.component__container`);
    
    $(".component.filter").css("filter","");
    $(".component.border").css("border-color","")
    $(".component.background").css("background","")

    if(subElementSelected.hasClass("component")){
        viewSelect = subElementSelected;
    } else {
        viewSelect = subElementSelected.find(`.component`);
    }

    viewSelect.filter(".background").css("background", "linear-gradient(45deg, #484000, #f0d600)").end()
        .filter(".filter").css("filter", "drop-shadow(yellow 1px 1px) drop-shadow(yellow -1px -1px)").end()
        .filter(".border").css("border-color", "yellow"
    );
});

function sectionAnimation(section) {
    if (activeElement?.is(elementSelected)) {
        return; // Si es el mismo, salir sin hacer animacion
    }

    if (section == "w-engine") {
        putWEngine();
    } else if(section == "drive-disk") {
        putDriveDisk();
        putStats();
    } else if(section == "skills") {
        putSkills();
    } else {
        putCharacter($(".selected__items"));
        putBangboo()
    }
    
    // Detener la animación anterior si está en curso
    $("#skills, #w-engine, #drive-disk, #team").removeClass("container__active");
    
    // Reinicia la animación si es necesario
    if (activeTimeout) {
        clearTimeout(activeTimeout);
    }
    
    elementSelected.addClass("container__active");
    activeElement = elementSelected;
    
    // Iniciar nueva animación
    activeTimeout = setTimeout(() => {
        elementSelected.removeClass("container__active");
    }, 1500);
}

// ======== CAMBIO DE PERSONAJES =======
//vista de los personajes
function putCharacter(selectedCharacter = $(".selected__characters")) {
    console.log(characters);
    selectedCharacter.empty().append(
        `<section class="selected__item__container">
            <h2>CHARACTERS</h2>
            <ul class='selected__grid grid__c4'>`
    );

    characters.forEach(function(character, index) {
        let characterText = capitalizeEachWord(character.name.replaceAll("_"," "));

        if (character.active) {
            selectedCharacter.find(".selected__item__container ul").append(
                `<li class="character__selectable component__selectable" id_character-data='${index}'>
                    <div class="component__selectable__info">
                        <img class="component__selectable__rank" src="img/ranks/char_rank_${character.rarity}_color.png" alt="">
                        <img class="component__selectable__attribute" src="img/attributes/${character.attribute}.png" alt="">
                    </div>
                    <img class="block" src="img/char_avatar/${character.name}.png" alt="">
                    <p class="component__name">${characterText}</p>
                </li>`
            );
        }
    });

    if (selectedCharacter.hasClass("selected__characters")) {
        $.when(
            $.get('components/download.html'),
            $.get('components/credits.html')
        ).done(function(data1, data2) {
            selectedCharacter.append(data1[0] + data2[0]);
        });
    }
    
}putCharacter();

// cambio de personajes tarjeta
$(".selected__characters").on("click", ".character__selectable", function() {
    let idCharacter = $(this).attr("id_character-data");
    let character = characters[idCharacter];

    let characterText = capitalizeEachWord(character.name.replaceAll("_"," "));
    
    $("#character-name").text(characterText);
    $("#character-info-attributes").removeClass("default");
    $("#character-faction").attr("src", `img/factions/${character.faction}.png`);
    $("#character-attribute").attr("src", `img/attributes/${character.attribute}.png`);
    $("#character-specialty").attr("src", `img/specialties/${character.specialty}.png`);

    $("#character-rank").attr("src", `img/ranks/char_rank_${character.rarity}.png`);
    $("#character-img").attr("src", `img/character/${character.name}.png`);
    $("#skills").css("background", character.color)

    if (character.fix) {
        $("#character-img").css("max-width", `${120 + character.fix.width}%`)
            .css("transform", `translateX(${-47 + character.fix.translate}%) scaleX(${character.fix.scale})`)
    }else{
        $("#character-img").css("max-width", "").css("transform", "")
    }
});

// cambio de personajes en seccion team
$(".selected__items").on("click", ".character__selectable", function() {
    let idCharacter = $(this).attr("id_character-data");
    let character = characters[idCharacter];
    
    let characterText = capitalizeEachWord(character.name.replaceAll("_"," "));

    if (!subElementSelected.hasClass("team__bangboo__container")) {
        subElementSelected.find(".team__character__rank").attr("src", `img/ranks/char_rank_${character.rarity}_color.png`);
        subElementSelected.find(".team__character__attribute").attr("src", `img/attributes/${character.attribute}.png`).removeClass("default");
        subElementSelected.find(".team__character__img").attr("src", `img/char_avatar/${character.name}.png`);
        subElementSelected.find(".team__character__name").text(characterText);
    }
})

// ======== CAMBIO DE HABILIDADES =======
// vista de habilidades
function putSkills() {
    const selectedComponent = $(".selected__items");
    selectedComponent.empty().append(
        "<h2>Skills</h2>"
    );

    $.get('components/skills.html', function(data) {
        selectedComponent.append(data);
    });
}

// cambio de habilidades
$(document).on("click", ".selected__skills__container .skill__selectable", function() {
    let skillImg = $(this).attr("src");
    
    if (subElementSelected) {
        subElementSelected.attr("src", skillImg);
    }
})

// cambio de iconos en las habilidades (=, >)
$("#skills").on("click", "i", function() {
    let icon = $(this);
    if (icon.hasClass("fa-equals")) {
        icon.removeClass("fa-equals").addClass("fa-angle-right");
    } else {
        icon.removeClass("fa-angle-right").addClass("fa-equals");
    }
});


// ======== CAMBIO DE W-ENGINE =======
// vista de w-engine
function putWEngine() {
    console.log(wEngines);

    const selectedComponent = $(".selected__items");
    selectedComponent.empty().append(
        `<section class='selected__item__container'>
            <h2>W-Engine</h2>
            <ul class='selected__grid grid__c4'>`
    );

    wEngines.forEach(function(wEngine, index) {
        if (wEngine.rarity) {
            selectedComponent.find(".selected__item__container ul").append(
                `<li class="w-engine__selectable component__selectable" id_w-engine-data='${index}'>
                    <div>
                        <img class="component__selectable__rank" src="img/ranks/item_rank_${wEngine.rarity}.webp" alt="">
                    </div>
                    <img class="block" src="img/w-engine/${wEngine.name}.webp" alt="">
                </li>`
            );
        }
    });
}

// cambio de w-engine
$(".selected__items").on("click", ".w-engine__selectable", function() {
    let idWEngine = $(this).attr("id_w-engine-data");
    console.log(subElementSelected);
    
    let wEngine = wEngines[idWEngine];

    let wEngineText = wEngine.name.replaceAll("_"," ");
    let fontSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--font-size-text').trim());

    if (subElementSelected) {
        subElementSelected.find(".w-engine__rarity").attr("src", `img/ranks/item_rank_${wEngine.rarity}.webp`);
        subElementSelected.find(".w-engine__component").attr("src", `img/w-engine/${wEngine.name}.webp`);
        subElementSelected.find(".w-engine__rarity").removeClass("default")

        let subElementName = subElementSelected.closest('.w-engine__container').find(".w-engine__name").text(wEngineText);

        if (subElementSelected.closest(".w-engine__best").length) {
            subElementName.css("font-size", `${fontSize}rem`);
            let totalHeight = subElementName.height();
    
            while (totalHeight > 32) {
                fontSize -= 0.01;
                totalHeight = subElementName.height();
                subElementName.css("font-size", `${fontSize}rem`);
            }
        }
    }
})


// ======== CAMBIO DE DRIVE DISK =======
// vista de drive disk
function putDriveDisk() {
    console.log(driveDisks);

    const selectedComponent = $(".selected__items");
    selectedComponent.empty().append(
        `<section class="selected__item__container">
            <h2>Drive-Disks</h2>
            <ul class='selected__grid grid__c4'>`
    );

    driveDisks.forEach(function(driveDisk, index) {
        selectedComponent.find(".selected__item__container ul").append(
            `<li class="drive-disk__selectable component__selectable" id_drive-disk-data='${index}'>
                <img class="block" src="img/drive-disks/${driveDisk}.webp" alt="">
            </li>`
        );
    });
}

// cambio de drive-disk
$(".selected__items").on("click", ".drive-disk__selectable", function() {
    let idDriveDisk = $(this).attr("id_drive-disk-data");
    let driveDisk = driveDisks[idDriveDisk];
    
    let driveDiskText = capitalizeEachWord(driveDisk.replaceAll("_"," "));

    if (subElementSelected) {
        subElementSelected.find(".drive-disk__component").attr("src", `img/drive-disks/${driveDisk}.webp`);
        subElementSelected.find(".drive-disk__name").text(driveDiskText);
    }
})

// ======== CAMBIO DE STATS DE LOS DRIVE DISK =======
// vista de stats de drive disk
function putStats() {
    console.log(diskStats);

    const selectedComponent = $(".selected__items");
    selectedComponent.append(
        `<section class="selected__item__container">
        <h2>STATS X</h2>
        <ul class='selected__grid grid__c3'>`
    );

    diskStats.forEach(function(diskStat, index) {
        let statsHTML = diskStat.stats.map((stat, index) => 
            `<li class="drive-disk__stats__container disk-stat__selectable component__selectable" id_drive-disk-data='${index}'>${stat}</li>`
        ).join('');
        statsHTML += "<li class='space'></li>"
        
        selectedComponent.find(".selected__item__container:last ul").append(statsHTML);
    });
}

// ======== CAMBIO DE BANGBOOS =======
// vista de bangboos
function putBangboo() {
    console.log(bangboos);

    const selectedComponent = $(".selected__items");
    selectedComponent.append(`
        <hr>
        <section class="selected__item__container">
            <h2>Bangboo</h2>
            <ul class='selected__grid grid__c4'>`
    );

    bangboos.forEach(function(bangboo, index) {
        selectedComponent.find(".selected__item__container:last ul").append(
            `<li class="bangboo__selectable component__selectable" id_bangboo-data='${index}'>
                <div class="component__selectable__info">
                    <img class="component__selectable__rank" src="img/ranks/char_rank_${bangboo.rarity}_color.png" alt="">
                </div>
                <img class="block" src="img/bangboos_avatar/${bangboo.name}.png" alt="">
            </li>`
        );
    });
}

// cambio de personajes en seccion team
$(".selected__items").on("click", ".bangboo__selectable", function() {
    let idBangboo = $(this).attr("id_bangboo-data");
    let bangboo = bangboos[idBangboo];
    
    let bangbooText = capitalizeEachWord(bangboo.name.replaceAll("_"," "));

    if (subElementSelected.hasClass("team__bangboo__container")) {
        subElementSelected.find(".team__character__rank").attr("src", `img/ranks/char_rank_${bangboo.rarity}_color.png`);
        subElementSelected.find(".team__character__img").attr("src", `img/bangboos_avatar/${bangboo.name}.png`);
        subElementSelected.find(".team__character__name").text(bangbooText);
    }
})


// ====== EXTRAS FUNCTIONS ======
function capitalizeEachWord(string) {
    return string.split(" ").map(word => capitalize(word)).join(" ");
}

function capitalize(string) {
    if (!string) return ""; // Manejar el caso de una cadena vacía
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}