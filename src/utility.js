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
    history.pushState(null, null, location.href)
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
    await displayParams(urlParams)

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








async function refreshURLParams(){
    const url = document.location.href.split("?")[0] + "?"
    let params = ""

    if(!speciesPanelMainContainer.classList.contains("hide")){
        params += `species=${panelSpecies}&`
    }
    if(document.getElementsByClassName("activeTable").length > 0){
        params += `table=${document.getElementsByClassName("activeTable")[0].id}&`
    }
    if(document.getElementsByClassName("activeFilter")[0].getElementsByClassName("filter").length > 0){
        params += "filter="
        const filters = document.getElementsByClassName("activeFilter")[0].getElementsByClassName("filter")
        for(let i = 0, j = filters.length; i < j; i++){
            if(!/>|<|=/.test(filters[i].innerText)){
                let param = filters[i].innerText.split(":")
                params += `${param[0]}:${param[1].trim()}`
                if(i !== j - 1){
                    params += ","
                }
            }
        }
        params += "&"
    }
    if(document.getElementsByClassName("activeInput")[0].value !== ""){
        params += `input=${document.getElementsByClassName("activeInput")[0].value}&`
    }
    
    await getHistoryState()
    window.history.replaceState(`${url}${params}`, null, `${url}${params}`)
    return `${url}${params}`, null, `${url}${params}`
}






async function displayParams(urlParams){
    if(urlParams.get("species")){
        scrollToSpecies = urlParams.get("species")
        createSpeciesPanel(scrollToSpecies)
    }
    else{
        speciesPanel("hide")
    }
    if(urlParams.get("table")){
        await tableButtonClick(document.getElementById(urlParams.get("table")).id.replace("Table", ""))
    }
    if(urlParams.get("filter")){
        urlParams.get("filter").split(",").forEach(filter => {
            createFilter(filter.split(":")[1], filter.split(":")[0])
        })
    }
    if(urlParams.get("input")){
        document.getElementsByClassName("activeInput")[0].value = urlParams.get("input")
        document.getElementsByClassName("activeInput")[0].dispatchEvent(new Event("input"))
    }
    
    await refreshURLParams()
}







async function getHistoryState(){
    let historyStateObj = {}
    if(!speciesPanelMainContainer.classList.contains("hide")){
        historyStateObj["species"] = panelSpecies
    }
    if(document.getElementsByClassName("activeTable").length > 0){
        historyStateObj["table"] = document.getElementsByClassName("activeTable")[0].id
    }
    if(document.getElementsByClassName("filter").length > 0){
        historyStateObj["filter"] = {}
        const filters = document.getElementsByClassName("filter")
        for(let i = 0, j = filters.length; i < j; i++){
            const table = filters[i].parentElement.id.replace("FilterContainer", "")
            if(!(table in historyStateObj["filter"])){
                historyStateObj["filter"][table] = []
            }
            historyStateObj["filter"][table].push(filters[i].innerText)
        }
    }

    if(JSON.stringify(historyObj.slice(-1)[0]) !== JSON.stringify(historyStateObj)){
        historyObj.push(historyStateObj)
    }
}







async function displayHistoryObj(historyStateObj){
    deleteFiltersFromTable()
    if(historyStateObj){
        if("species" in historyStateObj){
            scrollToSpecies = historyStateObj["species"]
            await createSpeciesPanel(scrollToSpecies)
            window.scrollTo(0, 0)
        }
        else{
            speciesPanel("hide")
        }
        if("table" in historyStateObj){
            await tableButtonClick(historyStateObj["table"].replace("Table", ""))

            deleteFiltersFromTable()
            if("filter" in historyStateObj){
                Object.keys(historyStateObj["filter"]).forEach(key => {
                    if(key === historyStateObj["table"].replace("Table", "")){
                        for(filter of historyStateObj["filter"][key]){
                            if(!/>|<|=/.test(filter)){
                                createFilter(filter.split(":")[1].trim(), filter.split(":")[0])
                            }
                        }
                    }
                })
            }
        }
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
"ABILITY_DROUGHT",
"ABILITY_DESOLATELAND",
"ABILITY_SANDSTREAM",
"ABILITY_SANDSPIT",
"ABILITY_DRIZZLE",
"ABILITY_PRIMORDIALSEA",
"ABILITY_DEFIANT",
"ABILITY_COMPETITIVE",
"ABILITY_MISTYSURGE",
"ABILITY_ELECTRICSURGE",
"ABILITY_MOXIE",
"ABILITY_CHILLINGNEIGH",
"ABILITY_GRIMNEIGH",
"ABILITY_SOULHEART",
"ABILITY_BEASTBOOST",
"ABILITY_SPEEDBOOST",
"ABILITY_IMPOSTER",
"ABILITY_MAGICBOUNCE",
"ABILITY_STORMDRAIN",
"ABILITY_FLAMINGSOUL",
"ABILITY_TRIAGE",
"ABILITY_TRACE",
"ABILITY_STAMINA",
"ABILITY_CONTRARY",
"ABILITY_GRASSYSURGE",
"ABILITY_PSYCHICSURGE",
"MOVE_FELLSTINGER",
"MOVE_SKULLBASH",
"MOVE_SCALESHOT",
"MOVE_POWERUPPUNCH",
"MOVE_FLAMECHARGE",
"MOVE_SPITUP",
"MOVE_METEORBEAM",
"MOVE_CHARGEBEAM",
"MOVE_FIERYDANCE",
"MOVE_SHELLSMASH",
"MOVE_BELLYDRUM",
"MOVE_STOCKPILE",
"MOVE_SWALLOW",
"MOVE_SWORDSDANCE",
"MOVE_GROWTH",
"MOVE_WORKUP",
"MOVE_HOWL",
"MOVE_DEFENSECURL",
"MOVE_HARDEN",
"MOVE_DRAGONDANCE",
"MOVE_CLANGOROUSSOUL",
"MOVE_CALMMIND",
"MOVE_AMNESIA",
"MOVE_COSMICPOWER",
"MOVE_AGILITY",
"MOVE_MEDITATE",
"MOVE_BARRIER",
"MOVE_BULKUP",
"MOVE_NORETREAT",
"MOVE_COACHING",
"MOVE_VICTORYDANCE",
"MOVE_SHIFTGEAR",
"MOVE_IRONDEFENSE",
"MOVE_AUTOTOMIZE",
"MOVE_NASTYPLOT",
"MOVE_CURSE",
"MOVE_COIL",
"MOVE_ACIDARMOR",
"MOVE_QUIVERDANCE",
"MOVE_TAILGLOW",
"MOVE_COTTONGUARD",
"MOVE_TAILWIND",
"MOVE_GEOMANCY",
"MOVE_ROCKPOLISH",
"MOVE_WITHDRAW",
"MOVE_RAINDANCE",
"MOVE_SANDSTORM",
"MOVE_HAIL",
"MOVE_SUNNYDAY",
"MOVE_ELECTRICTERRAIN",
"MOVE_MISTYTERRAIN",
"MOVE_GRASSYTERRAIN",
"MOVE_PSYCHICTERRAIN",
"MOVE_TRICKROOM",
"MOVE_COURTCHANGE",
"MOVE_TOXICSPIKES",
"MOVE_STICKYWEB",
"MOVE_STEALTHROCK",
"MOVE_SPIKES",
"MOVE_PERISHSONG",
"MOVE_PROTECT",
"MOVE_PSYCHUP",
"MOVE_SUBSTITUTE",
"MOVE_STRENGTHSAP",
"MOVE_POWDER",
"MOVE_WIDEGUARD",
"MOVE_MAGICCOAT",
"MOVE_DESTINYBOND",
"MOVE_SNATCH",
"MOVE_TAUNT",
"MOVE_CHARM",
"MOVE_DECORATE"
]