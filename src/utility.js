function sanitizeString(string){
    const regex = /^SPECIES_|^TYPE_|^ABILITY_|^MOVE_|^SPLIT_|FLAG_|^EFFECT_|^Z_EFFECT_|^ITEM_|^EGG_GROUP_|^EVO_/ig

    const unsanitizedString = string.toString().replace(regex, "")
    let matchArray = unsanitizedString.match(/\w+/g)
    if(matchArray){
        for (i = 0; i < matchArray.length; i++){
            matchArray[i] = matchArray[i].split('_')
            for (j = 0; j < matchArray[i].length; j++){
                matchArray[i][j] = matchArray[i][j][0].toUpperCase() + matchArray[i][j].slice(1).toLowerCase()
            }
            matchArray[i] = matchArray[i].join(" ")
        }
        return matchArray.join(" ")
    }
    else
        return unsanitizedString
}








async function fetchData(){
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)

    await forceUpdate()

    await fetchMovesObj()
    await fetchAbilitiesObj()
    await fetchSpeciesObj()
    await fetchLocationsObj()
    
    await fetchTypeChart()

    await setDataList()
    await setFilters()
    await displaySetup()
    displayParams(urlParams)

    await window.scrollTo(0, 0)
}


async function fetchTypeChart(){
    const rawTypeChart = await fetch("https://raw.githubusercontent.com/ydarissep/inclement-emerald-pokedex/main/src/typeChart.json")
    window.typeChart = await rawTypeChart.json()
}



async function forceUpdate(){
    const update = 23
    if(localStorage.getItem("update") != `${update} RR`){
        await localStorage.clear()
        await localStorage.setItem("update", `${update} RR`)
        await footerP("Fetching data please wait... this is only run once")
    }
}





function footerP(input){
    if(input === "")
        document.querySelectorAll("#footer > p").forEach(paragraph => paragraph.remove())

    const paragraph = document.createElement("p")
    const footer = document.getElementById("footer")
    paragraph.innerText = input
    footer.append(paragraph)
}





function setDataList(){
    window.speciesIngameNameArray = []
    for(const speciesName in species){
        if(species[speciesName]["baseSpeed"] <= 0){
            continue
        }
        const option = document.createElement("option")
        option.innerText = sanitizeString(speciesName)
        speciesIngameNameArray.push(option.innerText)
        speciesPanelInputSpeciesDataList.append(option)
    }

    window.abilitiesIngameNameArray = []
    for(const abilityName in abilities){
        if(!abilities[abilityName]["description"] || !/[1-9aA-zZ]/.test(abilities[abilityName]["ingameName"])){
            continue
        }
        const option = document.createElement("option")
        option.innerText = abilities[abilityName]["ingameName"]
        abilitiesIngameNameArray.push(option.innerText)
        abilitiesInputDataList.append(option)
    }
}





function getSpeciesSpriteSrc(speciesName){
    if(sprites[speciesName]){
        if(sprites[speciesName].length < 500){
            localStorage.removeItem(speciesName)
            spriteRemoveBgReturnBase64(speciesName, species)
            return species[speciesName]["sprite"]
        }
        else{
            return sprites[speciesName]
        }
    }
    else{
        spriteRemoveBgReturnBase64(speciesName, species)
        return species[speciesName]["sprite"]
    }
}








function refreshURLParams(){
    const url = `${window.location.protocol}${window.location.host}${window.location.pathname}?`
    let params = ""
    if(!speciesPanelMainContainer.classList.contains("hide")){
        params += `species=${panelSpecies}`
    }
    window.history.pushState(null, null, `${url}${params}`)
}









function displayParams(urlParams){
    if(urlParams.get("species")){
        createSpeciesPanel(urlParams.get("species"))
        scrollToSpecies = urlParams.get("species")
    }
}









function speciesCanLearnMove(speciesObj, moveName){
    if("levelUpLearnsets" in speciesObj){
        for(let i = 0; i < speciesObj["levelUpLearnsets"].length; i++){
            if(typeof(speciesObj["levelUpLearnsets"][i]) == "object"){
                if(speciesObj["levelUpLearnsets"][i][0] == moveName){
                    return true
                }
            }
            else if(typeof(speciesObj["levelUpLearnsets"][i] == "string")){
                if(speciesObj["levelUpLearnsets"][i] == moveName){
                    return true
                }
            }
        }
    }
    if("TMHMLearnsets" in speciesObj){
        for(let i = 0; i < speciesObj["TMHMLearnsets"].length; i++){
            if(typeof(speciesObj["TMHMLearnsets"][i]) == "object"){
                if(speciesObj["TMHMLearnsets"][i][0] == moveName){
                    return true
                }
            }
            else if(typeof(speciesObj["TMHMLearnsets"][i] == "string")){
                if(speciesObj["TMHMLearnsets"][i] == moveName){
                    return true
                }
            }
        }
    }
    if("eggMovesLearnsets" in speciesObj){
        for(let i = 0; i < speciesObj["eggMovesLearnsets"].length; i++){
            if(typeof(speciesObj["eggMovesLearnsets"][i]) == "object"){
                if(speciesObj["eggMovesLearnsets"][i][0] == moveName){
                    return true
                }
            }
            else if(typeof(speciesObj["eggMovesLearnsets"][i] == "string")){
                if(speciesObj["eggMovesLearnsets"][i] == moveName){
                    return true
                }
            }
        }
    }
    if("tutorLearnsets" in speciesObj){
        for(let i = 0; i < speciesObj["tutorLearnsets"].length; i++){
            if(typeof(speciesObj["tutorLearnsets"][i]) == "object"){
                if(speciesObj["tutorLearnsets"][i][0] == moveName){
                    return true
                }
            }
            else if(typeof(speciesObj["tutorLearnsets"][i] == "string")){
                if(speciesObj["tutorLearnsets"][i] == moveName){
                    return true
                }
            }
        }
    }
    return false
}














window.hardcoreRestricted = ["MOVE_SHELLSMASH",
"MOVE_QUIVERDANCE",
"MOVE_DRAGONDANCE",
"MOVE_CALMMIND",
"MOVE_BULKUP",
"MOVE_CURSE",
"MOVE_RAINDANCE",
"MOVE_SANDSTORM",
"MOVE_HAIL",
"MOVE_SUNNYDAY",
"MOVE_TAILWIND",
"MOVE_ELECTRICTERRAIN",
"MOVE_MISTYTERRAIN",
"MOVE_GRASSYTERRAIN",
"MOVE_PSYCHICTERRAIN",
"MOVE_TOXICSPIKES",
"MOVE_STICKYWEB",
"MOVE_SHIFTGEAR",
"MOVE_TAILGLOW",
"MOVE_COIL",
"MOVE_BELLYDRUM",
"MOVE_COTTONGUARD",
"MOVE_NORETREAT",
"MOVE_AMNESIA",
"MOVE_ACIDARMOR",
"MOVE_IRONDEFENSE",
"MOVE_COSMICPOWER",
"MOVE_STOCKPILE",
"MOVE_SWALLOW",
"MOVE_SPITUP",
"MOVE_GEOMANCY",
"MOVE_CLANGOROUSSOUL",
"MOVE_FELLSTINGER",
"MOVE_TRICKROOM",
"MOVE_STRENGTHSAP",
"MOVE_SKULLBASH",
"MOVE_METEORBEAM",
"MOVE_TAUNT",
"MOVE_PSYCHUP",
"MOVE_SNATCH",
"MOVE_MAGICCOAT",
"MOVE_PROTECT",
"MOVE_WIDEGUARD",
"MOVE_STEALTHROCK",
"MOVE_SPIKES",
"MOVE_PERISHSONG",
"MOVE_SUBSTITUTE",
"MOVE_NASTYPLOT",
"MOVE_SWORDSDANCE",
"MOVE_AGILITY",
"MOVE_AUTOTOMIZE",
"MOVE_ROCKPOLISH",
"MOVE_CHARM",
"MOVE_SCALESHOT",
"MOVE_POWERUPPUNCH",
"MOVE_CHARGEBEAM",
"MOVE_FLAMECHARGE",
"MOVE_GROWTH",
"MOVE_WORKUP",
"MOVE_HONECLAWS",
"MOVE_MEDITATE",
"MOVE_HOWL",
"MOVE_FIERYDANCE",
"MOVE_DESTINYBOND",
"MOVE_HARDEN",
"MOVE_WITHDRAW",
"MOVE_DEFENSECURL",
"MOVE_VICTORYDANCE",
"MOVE_POWDER",
"MOVE_LEECHSEED",
"MOVE_TOXIC",
"MOVE_DEFOG",
"ABILITY_DROUGHT",
"ABILITY_DESOLATELAND",
"ABILITY_DRIZZLE",
"ABILITY_PRIMORDIALSEA",
"ABILITY_SANDSPIT",
"ABILITY_SANDSTREAM",
"ABILITY_SNOWWARNING",
"ABILITY_SPEEDBOOST",
"ABILITY_CONTRARY",
"ABILITY_COMPETITIVE",
"ABILITY_DEFIANT",
"ABILITY_MISTYSURGE",
"ABILITY_ELECTRICSURGE",
"ABILITY_PSYCHICSURGE",
"ABILITY_BEASTBOOST",
"ABILITY_SOULHEART",
"ABILITY_GRIMNEIGH",
"ABILITY_MOXIE",
"ABILITY_IMPOSTER",
"ABILITY_MAGICBOUNCE",
"ABILITY_STORMDRAIN",
"ABILITY_MOTORDRIVE",
"ABILITY_LIGHTNINGROD",
"ABILITY_FLAMINGSOUL",
"ABILITY_TRIAGE",
"ABILITY_TRACE",
"ABILITY_STAMINA",
"ABILITY_GRASSYSURGE"
]