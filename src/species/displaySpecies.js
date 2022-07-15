function displaySpecies(){
    let tBody = speciesTableTbody
    const speciesArray = Object.keys(species)
    tBody.innerText = ""
    for (let i = 0; i < speciesArray.length; i++){
        const speciesName = speciesArray[i]
        let row = document.createElement("tr")
        row.setAttribute("id", `${speciesName}`)
        tBody.append(row)

        if(i >= 75)
            row.className = "hideTemp"


        let IDcontainer = document.createElement("td")
        let ID = document.createElement("div")
        IDcontainer.className = "ID"
        ID.innerText = species[speciesName]["ID"]
        IDcontainer.append(ID)
        row.append(IDcontainer)


        let spriteContainer = document.createElement("td")
        spriteContainer.className = "sprite"
        if(localStorage.getItem("sprites")){
            let sprite = document.createElement("img")
            sprite.src = spritesObj[speciesName]
            sprite.className = "src"
            spriteContainer.append(sprite)
        }
        else{
            let canvas = renderSprite(speciesName)
            canvas.className = "src"
            spriteContainer.append(canvas)
        }
        row.append(spriteContainer)
        


        let nameContainer = document.createElement("td")
        let name = document.createElement("div")
        let ingameName = document.createElement("div")
        nameContainer.className = "nameContainer"
        name.className = "key hide"
        name.innerText = species[speciesName]["name"]
        ingameName.className = "species"
        ingameName.innerText = sanitizeString(species[speciesName]["name"])
        nameContainer.append(ingameName)
        nameContainer.append(name)
        row.append(nameContainer)


        let typesContainer = document.createElement("td")
        let types = document.createElement("div")
        let type1 = document.createElement("div")
        let type2 = document.createElement("div")
        typesContainer.className = "types"
        type1.innerText = `${sanitizeString(species[speciesName]["type1"])} `
        type2.innerText = sanitizeString(species[speciesName]["type2"])
        type1.className = `${species[speciesName]["type1"]} background`
        type2.className = `${species[speciesName]["type2"]} background`
        types.append(type1)
        if(species[speciesName]["type1"] !== species[speciesName]["type2"])
            types.append(type2)
        typesContainer.append(types)
        row.append(typesContainer)


        let abilitiesContainer = document.createElement("td")
        abilitiesContainer.className = "abilities"
        let abilitiesArray = []
        for (let j = 0; j < species[speciesName]["abilities"].length; j++){
            if(abilities[species[speciesName]["abilities"][j]] !== undefined)
                abilitiesArray.push(abilities[species[speciesName]["abilities"][j]]["ingameName"])
        }

        abilitiesArray = Array.from(new Set(abilitiesArray))
        for (let j = 0; j < abilitiesArray.length; j++){
            let ability = document.createElement("div")
            ability.innerText = `${abilitiesArray[j]} `
            if(j >= 1 && j === abilitiesArray.length - 1){
                ability.style.fontWeight = "bold"
            }
            abilitiesContainer.append(ability)
        }
        row.append(abilitiesContainer)

        let speciesObj = species[speciesName]

        row.append(createBaseStatsContainer("HP", "baseHP", speciesObj))

        row.append(createBaseStatsContainer("Atk", "baseAttack", speciesObj))

        row.append(createBaseStatsContainer("Def", "baseDefense", speciesObj))

        row.append(createBaseStatsContainer("SpA", "baseSpAttack", speciesObj))

        row.append(createBaseStatsContainer("SpD", "baseSpDefense", speciesObj))

        row.append(createBaseStatsContainer("Spe", "baseSpeed", speciesObj))

        row.append(createBaseStatsContainer("BST", "BST", speciesObj))

        row.addEventListener("click", () => {
            createSpeciesPanel(speciesName)
            window.scrollTo(0, 0);
        })
    }
}


function createBaseStatsContainer(headerText, stats, speciesObj){
    let baseStatsContainer = document.createElement("td")
    let baseStats = document.createElement("div")
    let baseStatsHeader = document.createElement("div") //only used for mobile view


    baseStatsHeader.innerText = headerText //only used for mobile view
    baseStatsHeader.style.display = "none" //only used for mobile view
    baseStatsHeader.className = "baseStatsHeader" //only used for mobile view

    baseStats.className = `baseStatsBold ${stats}` //only used for mobile view

    baseStats.innerText = speciesObj[stats]

    baseStatsContainer.append(baseStatsHeader)
    baseStatsContainer.append(baseStats)
    baseStatsContainer.className = `${stats}Container`

    return baseStatsContainer
}



function renderSprite(speciesName){
    let sprite = new Image()
    let canvas = document.createElement("canvas")
    canvas.width = 64
    canvas.height = 64
    sprite.crossOrigin = 'anonymous'
    sprite.src = species[speciesName]["sprite"]

    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)

    sprite.onload = () => {
        context.drawImage(sprite, 0, 0)
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
        const backgroundColor = []
        for (let i = 0; i < 4; i++) {
          backgroundColor.push(imageData.data[i])
        }
        for (let i = 0; i < imageData.data.length; i += 4) {
          if (
            imageData.data[i] === backgroundColor[0] &&
            imageData.data[i + 1] === backgroundColor[1] &&
            imageData.data[i + 2] === backgroundColor[2]
          ) imageData.data[i + 3] = 0
        }
        context.putImageData(imageData, 0, 0) 

        spritesObj[speciesName] = LZString.compressToUTF16(canvas.toDataURL())

        if(Object.keys(spritesObj).length == Object.keys(species).length){
            setItemSprites(spritesObj)
        }
    }
    return canvas
}


async function setItemSprites(spritesObj){
    await localStorage.setItem("sprites", JSON.stringify(spritesObj))
}