function sanitizeString(string){
    const regex = /^SPECIES_|^TYPE_|ABILITY_NONE|ABILITY_|^SPECIES_NONE|^MOVE_|^SPLIT_|FLAG_|^EFFECT_|^Z_EFFECT_|^ITEM_|^EGG_GROUP_|^EVO_/ig
    const unsanitizedString = string.toString().replace(regex, "")
    let matchArray = unsanitizedString.match(/\w+/g)
    if(matchArray !== null){
        for (i = 0; i < matchArray.length; i++){
            matchArray[i] = matchArray[i].split('_')
            for (j = 0; j < matchArray[i].length; j++){
                matchArray[i][j] = matchArray[i][j][0].toUpperCase() + matchArray[i][j].slice(1).toLowerCase()
            }
            matchArray[i] = matchArray[i].join(" ")
        }
        return matchArray.join("\n")
    }
    else
        return unsanitizedString
}








async function fetchData(){
    await forceUpdate()

    await fetchMovesObj()
    await fetchAbilitiesObj()
    await fetchSpeciesObj()


    await displaySetup()
}






async function forceUpdate(){
    const update = 8
    if(localStorage.getItem("update") != `${update} IR`){
        await localStorage.clear()
        await localStorage.setItem("update", `${update} IR`)
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