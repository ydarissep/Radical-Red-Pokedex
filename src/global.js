window.repo = "BuffelSaft/pokeemerald"
window.repo1 = "Greenphx9/Complete-Fire-Red-Upgrade"
window.repo2 = "Greenphx9/Dynamic-Pokemon-Expansion"

window.panelSpecies = ""

window.filterCount = 0
const tableFilter = document.getElementById("tableFilter")
const speciesFilterCheckbox = document.getElementById("speciesFilterCheckbox")
const movesFilterCheckbox = document.getElementById("movesFilterCheckbox")



const openCredits = document.getElementById("openCredits")
const closeCredits = document.getElementById("closeCredits")
const modal = document.getElementById("modal")
const update = document.getElementById("update")



const speciesFilterHP = document.getElementById("speciesFilterHP")
const speciesFilterAtk = document.getElementById("speciesFilterAtk")
const speciesFilterDef = document.getElementById("speciesFilterDef")
const speciesFilterSpA = document.getElementById("speciesFilterSpA")
const speciesFilterSpD = document.getElementById("speciesFilterSpD")
const speciesFilterSpe = document.getElementById("speciesFilterSpe")
const speciesFilterBST = document.getElementById("speciesFilterBST")
const speciesFilterLearnset = document.getElementById("speciesFilterLearnset")
const speciesFilterEggGroup = document.getElementById("speciesFilterEggGroup")
const speciesFilterHeldItem = document.getElementById("speciesFilterHeldItem")


const movesFilterMaxPower = document.getElementById("movesFilterMaxPower")
const movesFilterFlag = document.getElementById("movesFilterFlag")
const movesFilterPriority = document.getElementById("movesFilterPriority")
const movesFilterEffect = document.getElementById("movesFilterEffect")
const movesFilterTarget = document.getElementById("movesFilterTarget")
const movesFilterPower = document.getElementById("movesFilterPower")







const speciesInput = document.getElementById("speciesInput")
const speciesButton = document.getElementById("speciesButton")
const speciesTable = document.getElementById("speciesTable")
const speciesTableThead = document.getElementById("speciesTableThead")
const speciesTableTbody = document.getElementById("speciesTableTbody")


const abilitiesInput = document.getElementById("abilitiesInput")
const abilitiesButton = document.getElementById("abilitiesButton")
const abilitiesTable = document.getElementById("abilitiesTable")
const abilitiesTableThead = document.getElementById("abilitiesTableThead")
const abilitiesTableTbody = document.getElementById("abilitiesTableTbody")


const movesInput = document.getElementById("movesInput")
const movesButton = document.getElementById("movesButton")
const movesTable = document.getElementById("movesTable")
const movesTableThead = document.getElementById("movesTableThead")
const movesTableTbody = document.getElementById("movesTableTbody")






const table = document.querySelector("#table")

const headerAbilitiesName = document.querySelector("#abilitiesTableThead th.ability")
const headerAbilitiesDescription = document.querySelector("#abilitiesTableThead th.description")

const headerMovesMove = document.querySelector("#movesTableThead th.move")
const headerMovesType = document.querySelector("#movesTableThead th.type")
const headerMovesSplit = document.querySelector("#movesTableThead th.split")
const headerMovesPower = document.querySelector("#movesTableThead th.power")
const headerMovesAccuracy = document.querySelector("#movesTableThead th.accuracy")
const headerMovesPP = document.querySelector("#movesTableThead th.PP")
const headerMovesEffect = document.querySelector("#movesTableThead th.effect")

const headerSpeciesID = document.querySelector("#speciesTableThead th.ID")
const headerSpeciesSprite = document.querySelector("#speciesTableThead th.sprite")
const headerSpeciesName = document.querySelector("#speciesTableThead th.species")
const headerSpeciesTypes = document.querySelector("#speciesTableThead th.types")
const headerSpeciesAbilities = document.querySelector("#speciesTableThead th.abilities")
const headerSpeciesHP = document.querySelector("#speciesTableThead th.baseHP")
const headerSpeciesAtk = document.querySelector("#speciesTableThead th.baseAttack")
const headerSpeciesDef = document.querySelector("#speciesTableThead th.baseDefense")
const headerSpeciesSpA = document.querySelector("#speciesTableThead th.baseSpAttack")
const headerSpeciesSpD = document.querySelector("#speciesTableThead th.baseSpDefense")
const headerSpeciesSpe = document.querySelector("#speciesTableThead th.baseSpeed")
const headerSpeciesBST = document.querySelector("#speciesTableThead th.BST")
const utilityButton = document.querySelector('.utilityButton')



headerAbilitiesName.addEventListener("click", () => {
    if(headerAbilitiesName.classList.contains("th-sort-desc"))
        sortTableByClassName(abilitiesTable, "ability", asc = true)
    else
        sortTableByClassName(abilitiesTable, "ability", asc = false)
})
headerAbilitiesDescription.addEventListener("click", () => {
    if(headerAbilitiesDescription.classList.contains("th-sort-desc"))
        sortTableByClassName(abilitiesTable, "description", asc = true)
    else
        sortTableByClassName(abilitiesTable, "description", asc = false)
})






headerMovesMove.addEventListener("click", () => {
    if(headerMovesMove.classList.contains("th-sort-desc"))
        sortTableByClassName(movesTable, "move", asc = true)
    else
        sortTableByClassName(movesTable, "move", asc = false)
})
headerMovesType.addEventListener("click", () => {
    if(headerMovesType.classList.contains("th-sort-desc"))
        sortTableByClassName(movesTable, "type", asc = true)
    else
        sortTableByClassName(movesTable, "type", asc = false)
})
headerMovesSplit.addEventListener("click", () => {
    if(headerMovesSplit.classList.contains("th-sort-desc"))
        sortTableByClassName(movesTable, "split", asc = true)
    else
        sortTableByClassName(movesTable, "split", asc = false)
})
headerMovesPower.addEventListener("click", () => {
    if(headerMovesPower.classList.contains("th-sort-desc"))
        sortTableByClassName(movesTable, "power", asc = true, parseINT = true)
    else
        sortTableByClassName(movesTable, "power", asc = false, parseINT = true)
})
headerMovesAccuracy.addEventListener("click", () => {
    if(headerMovesAccuracy.classList.contains("th-sort-desc"))
        sortTableByClassName(movesTable, "accuracy", asc = true, parseINT = true)
    else
        sortTableByClassName(movesTable, "accuracy", asc = false, parseINT = true)
})
headerMovesPP.addEventListener("click", () => {
    if(headerMovesPP.classList.contains("th-sort-desc"))
        sortTableByClassName(movesTable, "PP", asc = true, parseINT = true)
    else
        sortTableByClassName(movesTable, "PP", asc = false, parseINT = true)
})
headerMovesEffect.addEventListener("click", () => {
    if(headerMovesEffect.classList.contains("th-sort-desc"))
        sortTableByClassName(movesTable, "effect", asc = true)
    else
        sortTableByClassName(movesTable, "effect", asc = false)
})







headerSpeciesID.addEventListener("click", () => {
    if(headerSpeciesID.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, "ID", asc = true, parseINT = true)
    else
        sortTableByClassName(speciesTable, "ID", asc = false, parseINT = true)
})
headerSpeciesSprite.addEventListener("click", () => {
    if(headerSpeciesID.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, "ID", asc = true, parseINT = true)
    else
        sortTableByClassName(speciesTable, "ID", asc = false, parseINT = true)
})
headerSpeciesName.addEventListener("click", () => {
    if(headerSpeciesName.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, "species", asc = true)
    else
        sortTableByClassName(speciesTable, "species", asc = false)
})
headerSpeciesTypes.addEventListener("click", () => {
    if(headerSpeciesTypes.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, "types", asc = true)
    else
        sortTableByClassName(speciesTable, "types", asc = false)
})
headerSpeciesAbilities.addEventListener("click", () => {
    if(headerSpeciesAbilities.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, "abilities", asc = true)
    else
        sortTableByClassName(speciesTable, "abilities", asc = false)
})
headerSpeciesHP.addEventListener("click", () => {
    if(headerSpeciesHP.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, "baseHP", asc = true, parseINT = true)
    else
        sortTableByClassName(speciesTable, "baseHP", asc = false, parseINT = true)
})
headerSpeciesAtk.addEventListener("click", () => {
    if(headerSpeciesAtk.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, "baseAttack", asc = true, parseINT = true)
    else
        sortTableByClassName(speciesTable, "baseAttack", asc = false, parseINT = true)
})
headerSpeciesDef.addEventListener("click", () => {
    if(headerSpeciesDef.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, "baseDefense", asc = true, parseINT = true)
    else
        sortTableByClassName(speciesTable, "baseDefense", asc = false, parseINT = true)
})
headerSpeciesSpA.addEventListener("click", () => {
    if(headerSpeciesSpA.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, "baseSpAttack", asc = true, parseINT = true)
    else
        sortTableByClassName(speciesTable, "baseSpAttack", asc = false, parseINT = true)
})
headerSpeciesSpD.addEventListener("click", () => {
    if(headerSpeciesSpD.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, "baseSpDefense", asc = true, parseINT = true)
    else
        sortTableByClassName(speciesTable, "baseSpDefense", asc = false, parseINT = true)
})
headerSpeciesSpe.addEventListener("click", () => {
    if(headerSpeciesSpe.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, "baseSpeed", asc = true, parseINT = true)
    else
        sortTableByClassName(speciesTable, "baseSpeed", asc = false, parseINT = true)
})
headerSpeciesBST.addEventListener("click", () => {
    if(headerSpeciesBST.classList.contains("th-sort-desc"))
        sortTableByClassName(speciesTable, "BST", asc = true, parseINT = true)
    else
        sortTableByClassName(speciesTable, "BST", asc = false, parseINT = true)
})







speciesInput.addEventListener("input", e => {
    const value = e.target.value
    filterTableInput(value, [2, 3, 4], speciesTableTbody)
})
abilitiesInput.addEventListener("input", e => {
    const value = e.target.value
    filterTableInput(value, [0, 1], abilitiesTableTbody)
})
movesInput.addEventListener("input", e => {
    const value = e.target.value
    filterTableInput(value, [0, 1, 6], movesTableTbody)
})


speciesButton.addEventListener("click", () => {
    if(!speciesButton.classList.contains("activeButton"))
        tableButtonClick("species")
})
abilitiesButton.addEventListener("click", () => {
    if(!abilitiesButton.classList.contains("activeButton"))
        tableButtonClick("abilities")
})
movesButton.addEventListener("click", () => {
    if(!movesButton.classList.contains("activeButton"))
        tableButtonClick("moves")
})




speciesFilterCheckbox.addEventListener("change", e => {
    if(e.target.checked)
        document.querySelector("#speciesFilterButton").classList.remove("hide")
    else
        document.querySelector("#speciesFilterButton").classList.add("hide")
})
movesFilterCheckbox.addEventListener("change", e => {
    if(e.target.checked)
        document.querySelector("#movesFilterButton").classList.remove("hide")
    else
        document.querySelector("#movesFilterButton").classList.add("hide")
})














speciesFilterHP.addEventListener("click", () => {
    const list = [">=", "<=", ">", "<", "="]
    createFilter(list, species, ["baseHP"], filterCount++, speciesFilterButton, "HP", isInt = true, isOperator = true)
})
speciesFilterAtk.addEventListener("click", () => {
    const list = [">=", "<=", ">", "<", "="]
    createFilter(list, species, ["baseAttack"], filterCount++, speciesFilterButton, "Atk", isInt = true, isOperator = true)
})
speciesFilterDef.addEventListener("click", () => {
    const list = [">=", "<=", ">", "<", "="]
    createFilter(list, species, ["baseDefense"], filterCount++, speciesFilterButton, "Def", isInt = true, isOperator = true)
})
speciesFilterSpA.addEventListener("click", () => {
    const list = [">=", "<=", ">", "<", "="]
    createFilter(list, species, ["baseSpAttack"], filterCount++, speciesFilterButton, "SpA", isInt = true, isOperator = true)
})
speciesFilterSpD.addEventListener("click", () => {
    const list = [">=", "<=", ">", "<", "="]
    createFilter(list, species, ["baseSpDefense"], filterCount++, speciesFilterButton, "SpD", isInt = true, isOperator = true)
})
speciesFilterSpe.addEventListener("click", () => {
    const list = [">=", "<=", ">", "<", "="]
    createFilter(list, species, ["baseSpeed"], filterCount++, speciesFilterButton, "Spe", isInt = true, isOperator = true)
})
speciesFilterBST.addEventListener("click", () => {
    const list = [">=", "<=", ">", "<", "="]
    createFilter(list, species, ["BST"], filterCount++, speciesFilterButton, "BST", isInt = true, isOperator = true)
})
speciesFilterLearnset.addEventListener("click", () => {
    const list = createOptionArray(["name"], moves)
    createFilter(list, species, ["levelUpLearnsets", "TMHMLearnsets", "tutorLearnsets", "eggMovesLearnsets"], filterCount++, speciesFilterButton, "Learnset")
})
speciesFilterEggGroup.addEventListener("click", () => {
    const list = createOptionArray(["eggGroup1", "eggGroup2"], species)
    createFilter(list, species, ["eggGroup1", "eggGroup2"], filterCount++, speciesFilterButton, "Egg Group")
})
speciesFilterHeldItem.addEventListener("click", () => {
    const list = createOptionArray(["item1", "item2"], species)
    createFilter(list, species, ["item1", "item2"], filterCount++, speciesFilterButton, "Held Item")
})















movesFilterMaxPower.addEventListener("click", () => {
    const list = [">=", "<=", ">", "<", "="]
    createFilter(list, moves, ["maxPower"], filterCount++, movesFilterButton, "maxPower", isInt = true, isOperator = true)
})
movesFilterFlag.addEventListener("click", () => {
    let list = []
    for (const name of Object.keys(moves)){
        for (let i = 0; i < moves[name]["flags"].length; i++){
            const value = sanitizeString(moves[name]["flags"][i])
            if(!list.includes(value))
                list.push(value)
        }
    }
    createFilter(list, moves, ["flags"], filterCount++, movesFilterButton, "Flag")
})
movesFilterPriority.addEventListener("click", () => {
    const list = createOptionArray(["priority"], moves, isInt = true).sort()
    createFilter(list, moves, ["priority"], filterCount++, movesFilterButton, "Priority", isInt = true)
})
movesFilterEffect.addEventListener("click", () => {
    const list = createOptionArray(["effect"], moves)
    createFilter(list, moves, ["effect"], filterCount++, movesFilterButton, "Effect")
})
movesFilterTarget.addEventListener("click", () => {
    const list = createOptionArray(["target"], moves)
    createFilter(list, moves, ["target"], filterCount++, movesFilterButton, "Target")
})
movesFilterPower.addEventListener("click", () => {
    const list = [">=", "<=", ">", "<", "="]
    createFilter(list, moves, ["power"], filterCount++, movesFilterButton, "Power", isInt = true, isOperator = true)
})











openCredits.addEventListener("click", () => {
    modal.classList.remove("hide")
    if(typeof document.createElement('dialog').showModal === 'function'){
        modal.showModal()
    }
    else if(typeof document.createElement('dialog').show === 'function'){
        modal.show()
    }

})
closeCredits.addEventListener("click", () => {
    modal.classList.add("hide")
    if(typeof document.createElement('dialog').close === 'function'){
        modal.close()
    }
})














const options = {
        root: null,
        rootMargins: "0px",
        threshold: 0
}

function footerIsTouching(entries){
    if(entries[0].isIntersecting){
        lazyLoading(false)
        openCredits.classList.remove("hide")
        update.classList.remove("hide")
    }
    else{
        openCredits.classList.add("hide")   
        update.classList.add("hide")
    }
}


function speciesPanelIsTouching(entries){
    if(entries[0].isIntersecting){
        utilityButton.innerText = "↓"
    }
    else{

        speciesPanelMainContainer.classList.add("hide")

        if(table.getBoundingClientRect().top < 0){
            utilityButton.innerText = "↑"
        }
        else if(tableInput.getBoundingClientRect().top < 0){
            utilityButton.innerText = "☰"
        }
    }
}
function tableIsTouching(entries){
    if(entries[0].isIntersecting && tableInput.getBoundingClientRect().top <= 0){
        utilityButton.innerText = "☰"
    }
    else{
        if(table.getBoundingClientRect().top < 0){
            utilityButton.innerText = "↑"
        }
        else if(tableInput.getBoundingClientRect().top < 0){
            utilityButton.innerText = "☰"
        }
    }
}


const observerFooter = new IntersectionObserver(footerIsTouching, options)
observerFooter.observe(document.getElementById("footer"))

const observeTable = new IntersectionObserver(tableIsTouching, options)
observeTable.observe(document.getElementById("observerCheck"))

const observeSpeciesPanel = new IntersectionObserver(speciesPanelIsTouching, options)
observeSpeciesPanel.observe(speciesPanelMainContainer)


utilityButton.onclick = () => {
    if(utilityButton.innerText === "↓"){
        speciesPanelMainContainer.classList.add("hide")
        document.getElementById(`${panelSpecies}`).scrollIntoView({ block: "center" })
    }
    else if(utilityButton.innerText === "☰" && panelSpecies !== ""){
        speciesPanelMainContainer.classList.remove("hide")
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    else{
        window.scrollTo({top: 0})
    }
}


update.addEventListener("click", () => {
    localStorage.clear()
    window.location.reload()
})


window.onbeforeunload = () => {  
    window.scrollTo(0, 0);
}


fetchData()



