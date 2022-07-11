async function getMoves(moves){
    footerP("Fetching moves")
    const rawMoves = await fetch(`https://raw.githubusercontent.com/${repo1}/master/src/Tables/battle_moves.c`)
    const textMoves = await rawMoves.text()

    return regexMoves(textMoves, moves)
}

async function getMovesDescription(moves){
    footerP("Fetching moves descriptions")
    const rawMovesDescription = await fetch(`https://raw.githubusercontent.com/${repo1}/master/strings/attack_descriptions.string`)
    const textMovesDescription = await rawMovesDescription.text()

    return regexMovesDescription(textMovesDescription, moves)
}

async function getMovesIngameName(moves){
    footerP("Fetching moves ingame name")
    const rawMovesIngameName = await fetch(`https://raw.githubusercontent.com/${repo1}/master/strings/attack_name_table_long.string`)
    const textMovesIngameName = await rawMovesIngameName.text()

    return regexMovesIngameName(textMovesIngameName, moves)
}

async function getVanillaMovesDescription(moves){
    const rawVanillaMovesDescription = await fetch("https://raw.githubusercontent.com/ProfLeonDias/pokefirered/decapitalization/src/move_descriptions.c")
    const textVanillaMovesDescription = await rawVanillaMovesDescription.text()

    return regexVanillaMovesDescription(textVanillaMovesDescription, moves)
}



async function buildMovesObj(){
    let moves = {}
    moves = await getMoves(moves)
    moves = await getVanillaMovesDescription(moves)
    moves = await getMovesDescription(moves)
    moves = await getMovesIngameName(moves)
    delete moves["MOVE_NONE"]
    delete moves["MOVE_SMELLINGSALT"]

    Object.keys(moves).forEach(name => { // Delete Z moves
        if(moves[name]["PP"] == "1" && moves[name]["split"] !== "SPLIT_STATUS")
            delete moves[name]
    })

    await localStorage.setItem("moves", LZString.compressToUTF16(JSON.stringify(moves)))
    return moves
}


async function fetchMovesObj(){
    if(!localStorage.getItem("moves"))
        window.moves = await buildMovesObj()
    else
        window.moves = await JSON.parse(LZString.decompressFromUTF16(localStorage.getItem("moves")))
    
    await displayMoves()
}
