let jwowIsFiltering = false
let jwowFilterDisplay = null

let jwowItemBlocks = []
let jwowEncounterBlocks = []
let jwowIsHardcore = true
let jwowOnlyNew = true
let jwowOnlyFullyEvolved = true
let jwowDarkRockTunnel = true
let jwowMovesObeyCap = false

let jwowIncludeStarters = false
let jwowStarterPokemon = ["SPECIES_SQUIRTLE", "SPECIES_TOTODILE", "SPECIES_MUDKIP", "SPECIES_PIPLUP", "SPECIES_OSHAWOTT", "SPECIES_FROAKIE", "SPECIES_POPPLIO", "SPECIES_SOBBLE", "SPECIES_QUAXLY", "SPECIES_BULBASAUR", "SPECIES_CHIKORITA", "SPECIES_TREECKO", "SPECIES_TURTWIG", "SPECIES_SNIVY", "SPECIES_CHESPIN", "SPECIES_ROWLET", "SPECIES_GROOKEY", "SPECIES_SPRIGATITO", "SPECIES_CHARMANDER", "SPECIES_CYNDAQUIL", "SPECIES_TORCHIC", "SPECIES_CHIMCHAR", "SPECIES_TEPIG", "SPECIES_FENNEKIN", "SPECIES_LITTEN", "SPECIES_SCORBUNNY", "SPECIES_FUECOCO"]

let jwowLevelCapIndex = 0
let jwowLevelCap = 16
let jwowLevelCaps = [
	["Pre-Brock",      			15, 16],
	["Pre-Archer 1",   			22, 23],
	["Pre-Misty",      			27, 28],
	["Pre-Lt Surge",      		34, 36],
	["Pre-Erika",      			44, 44],
	["Pre-Giovanni 1", 			47, 47],
	["Pre-Archer & Ariana 1", 	56, 56],
	["Pre-Giovanni 2", 			57, 57],
	["Pre-Sabrina",    			59, 59],
	["Pre-Koga",       			68, 68],
	["Pre-May",        			73, 73],
	["Pre-Blaine",     			76, 76],
	["Pre-Archer & Ariana 2",   79, 79],
	["Pre-Giovanni 3", 			80, 80],
	["Pre-Clair",      			81, 81],
	["Pre-Brendan",    			82, 82],
	["Pre-Elite 4",    			85, 85],
	["Post Game",  				100, 100]
]

jwowInject()

function jwowInject() {

	const myChild = document.createElement("div")
	myChild.innerHTML = `
<div id="jwowInput">
<style>
    #locationsButton {
        width: 100px;
    }
    #jwowInput {
        position:relative;
        margin-top: 4px;
    }
    #jwowFilterDisplay {
        width: 198px;
		height: 19px;
        padding: 6px 2px;
        margin: 1px 1px 1px 1px;
        display: inline-block;
        border-radius: 3px;
        border: 1px solid gray;
        background: rgba(215, 212, 231, 0.2);
        cursor: default;
    }

    #jwowCycleLeft, #jwowCycleRight {
        width: 27px;
	    height: 33px;
        padding: 8px;
        cursor: pointer;
        position: relative;
        top: -2px;
    }
    
	#jwowFilterDisplayText {
		font-size: 13.3333px;
		position: relative;
		top: -1px;
	}
	
    #jwowFilterCheckBox {
        position: relative;
		top: 1px;
		left: 4px;
    }

</style>
<div>
    <button type="button" id="jwowCycleLeft">&lt;</button>
    <div id="jwowFilterDisplay"><label id="jwowFilterDisplayText">Pre-Archer &amp; Ariana 2 (79)</label><input type="checkbox" id="jwowFilterCheckBox"></div>
    <button type="button" id="jwowCycleRight">&gt;</button>
</div>
<div id="jwowCheckBoxes">
    <div>
        <label>Hardcore</label><input type="checkbox" id="jwowHardcoreCheckBox">
        <label>Only New Pokemon</label><input type="checkbox" id="jwowOnlyNewCheckBox">
    </div>
	<div><label>Only show fully evolved Pokemon</label><input type="checkbox" id="jwowOnlyFullyEvolved"></div>
	<div><label>Include Gift Starters from Oak's Lab</label><input type="checkbox" id="jwowIncludeStartersCheckBox"></div>
    <div><label>Move filters obey level cap</label><input type="checkbox" id="jwowMovesObeyCapCheckBox"></div>
</div>

</div>`
	
	document.querySelector("#tableButton").appendChild(myChild)
	
	document.querySelector("#jwowHardcoreCheckBox").checked = true
	document.querySelector("#jwowOnlyNewCheckBox").checked = true
	document.querySelector("#jwowOnlyFullyEvolved").checked = true
	
	document.querySelector("#jwowCycleLeft").addEventListener("click", function() {
		if (jwowIsFiltering) {
			_jwowClearFilter()
		}
		
		jwowLevelCapIndex -= 1
		if (jwowLevelCapIndex < 0)
			jwowLevelCapIndex = 17
		
		_jwowRecalculateLevelCap()
		
		jwowFilterDisplayText.innerText = `${jwowLevelCaps[jwowLevelCapIndex][0]} (${jwowLevelCap})`
		
		if (jwowIsFiltering) {
			_jwowShowFilter()
		}
	})
	
	document.querySelector("#jwowCycleRight").addEventListener("click", function() {
		if (jwowIsFiltering) {
			_jwowClearFilter()
		}
		
		jwowLevelCapIndex += 1
		if (jwowLevelCapIndex > 17)
			jwowLevelCapIndex = 0
		
		_jwowRecalculateLevelCap()
		
		jwowFilterDisplayText.innerText = `${jwowLevelCaps[jwowLevelCapIndex][0]} (${jwowLevelCap})`
		
		if (jwowIsFiltering) {
			_jwowShowFilter()
		}
	})
	
	document.querySelector("#jwowFilterCheckBox").addEventListener("change", function() {
		jwowIsFiltering = this.checked
		if (jwowIsFiltering) {
			_jwowClearFilter()
			_jwowShowFilter()
		}
		else
			_jwowClearFilter()
	})
	
	document.querySelector("#jwowHardcoreCheckBox").addEventListener("change", function() {
		jwowIsHardcore = this.checked
		
		_jwowRecalculateLevelCap()
		
		jwowFilterDisplayText.innerText = `${jwowLevelCaps[jwowLevelCapIndex][0]} (${jwowLevelCap})`
		
		if (jwowIsFiltering) {
			_jwowClearFilter()
			_jwowShowFilter()
		}
	})
	
	document.querySelector("#jwowOnlyNewCheckBox").addEventListener("change", function() {
		jwowOnlyNew = this.checked
		if (jwowIsFiltering) {
			_jwowClearFilter()
			_jwowShowFilter()
		}
	})
	
	document.querySelector("#jwowOnlyFullyEvolved").addEventListener("change", function() {
		jwowOnlyFullyEvolved = this.checked
		if (jwowIsFiltering) {
			_jwowClearFilter()
			_jwowShowFilter()
		}
	})
	
	document.querySelector("#jwowIncludeStartersCheckBox").addEventListener("change", function() {
		jwowIncludeStarters = this.checked
		if (jwowIsFiltering) {
			_jwowClearFilter()
			_jwowShowFilter()
		}
	})
	
	document.querySelector("#jwowMovesObeyCapCheckBox").addEventListener("change", function() {
		jwowMovesObeyCap = this.checked
		
		_jwowRecalculateMoveFilters()
	})
	
	jwowLevelCapIndex = 0
	jwowLevelCap = jwowLevelCaps[jwowLevelCapIndex][2]
	jwowFilterDisplayText = document.querySelector("#jwowFilterDisplayText")
	jwowFilterDisplayText.innerText = `${jwowLevelCaps[jwowLevelCapIndex][0]} (${jwowLevelCap})`
	
	_jwowGenerateBlocks()

}

function _jwowRecalculateLevelCap() {
	prevLevelCap = jwowLevelCap
	if (jwowIsHardcore)
		jwowLevelCap = jwowLevelCaps[jwowLevelCapIndex][2]
	else
		jwowLevelCap = jwowLevelCaps[jwowLevelCapIndex][1]
		
	if (prevLevelCap != jwowLevelCap)
		_jwowRecalculateMoveFilters()
}

function _jwowRecalculateMoveFilters() {
	myMoves = []
		myMoveList = document.querySelectorAll("#speciesFilterContainer > div")
		for (let i = 0; i < myMoveList.length; i++) {
			myMoveText = myMoveList[i].innerText.split(": ")
			if (myMoveText[0] === "Move") {
				myMoves.push(myMoveText[1])
				myMoveList[i].click()
			}
		}
		
		for (let i = 0; i < myMoves.length; i++) {
			createFilter(myMoves[i], "Move")
		}
}

function _jwowGenerateBlocks() {
	
	jwowEncounterBlocks = []
	for (let i = 0; i < 18; i++)
		jwowEncounterBlocks.push(_jwowEncounterBlock(i))
	
	jwowItemBlocks = []
	for (let i = 0; i < 18; i++)
		jwowItemBlocks.push([_jwowItemBlock(i, false), _jwowItemBlock(i, true)])
}

function _jwowFilterByLevelUp (value, label) {
	let moveName = null
    Object.keys(moves).forEach(move => {
        if(moves[move]["ingameName"] === value){
            moveName = move
        }
    })
    if(moveName){
        for(let i = 0, j = tracker.length; i < j; i++){
            let name = tracker[i]["key"]
            if(tracker === locationsTracker){
                name = tracker[i]["key"].split("\\")[2]
            }
            if(!_jwowSpeciesCanLearnMove(species[name], moveName, "levelUpLearnsets")){
                tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
            }
        }
    }
}

function _jwowSpeciesCanLearnMove(speciesObj, moveName, index) {

    for(let j = 0; j < speciesObj[index].length; j++){
        if(typeof(speciesObj[index][j]) == "object"){
            if(speciesObj[index][j][0] == moveName && speciesObj[index][j][1] <= jwowLevelCap){
                return true
            }
        }
        else if(typeof(speciesObj[index][j] == "string")){
            if(speciesObj[index][j] == moveName){
                return true
            }
        }
    }

    return false
}

function selectFilter(value, label){
    if(label === "Item"){
        filterSpeciesItem(value, label)
    }
    else if(label === "Move"){
		if (jwowMovesObeyCap)
			_jwowFilterByLevelUp(value, label)
		else
			filterSpeciesMove(value, label)
    }
    else if(label === "Type"){
        filterType(value, label)
    }
    else if(label === "Ability"){
        filterSpeciesAbility(value, label)   
    }
    else if(label === "Egg Group"){
        filterSpeciesEggGroup(value, label)   
    }
    else if(label === "Form"){
        filterSpeciesForm(value, label)   
    }
    else if(label === "Split"){
        filterMovesSplit(value, label)
    }
    else if(label === "Base Stats"){
        filterBaseStats(value, label)
    }
    else if(label === "Flag"){
        filterMovesFlags(value, label)
    }
}

function _jwowClearFilter() {
	for(let i = 0, j = tracker.length; i < j; i++){
        for(let k = 0; k < tracker[i]["filter"].length; k++){
            if(tracker[i]["filter"][k] == `filter${jwowLevelCaps[jwowLevelCapIndex][0]}`.replaceAll(" ", "")){
                tracker[i]["filter"].splice(k, 1)
            }
        }
    }
    lazyLoading(true)
}

function _jwowShowFilter() {
    
    _jwowFilterByLevelCap()

    filterList()
    lazyLoading(true)
}

function _jwowFilterByLevelCap() {
	
	myEncounters = []
	myEvolutionItems = []
	prevEncounters = []
	prevEvolutionItems = []

	let difficulty = 0
	if (jwowIsHardcore)
		difficulty = 1

	for (let i = jwowLevelCapIndex; i > -1; i--) {
		if (jwowOnlyNew && i !== jwowLevelCapIndex) {
			prevEncounters = prevEncounters.concat(jwowEncounterBlocks[i])
			prevEvolutionItems = prevEvolutionItems.concat(jwowItemBlocks[i][difficulty])
		}
		else {
			myEncounters = myEncounters.concat(jwowEncounterBlocks[i])
		}
		myEvolutionItems = myEvolutionItems.concat(jwowItemBlocks[i][difficulty])
	}
	
	if (jwowIncludeStarters && jwowLevelCapIndex < 3) {
		if (jwowOnlyNew && jwowLevelCapIndex > 0)
			prevEncounters = prevEncounters.concat(jwowStarterPokemon)
		else
			myEncounters = myEncounters.concat(jwowStarterPokemon)
	}
	
	if (jwowOnlyNew && jwowLevelCapIndex > 0) {
		//list of all old encounters -> evolve[old cap] = old pokemon and old evolutions
		let oldEncountersAndOldEvolutions = prevEncounters.concat(_jwowCheckEvolutions(prevEncounters, prevEvolutionItems, jwowLevelCaps[jwowLevelCapIndex - 1][difficulty + 1]))
		
		//list of all old encounters and evolutions -> evolve[new cap] = old pokemon new evolutions
		let oldEncountersAllEvolutions = oldEncountersAndOldEvolutions.concat(_jwowCheckEvolutions(prevEncounters, myEvolutionItems, jwowLevelCap))

		//list of old encounters all evolutions - old encounters old evolutions = just new evolutions
		let oldEncountersNewEvolutions = oldEncountersAllEvolutions.filter(x => !oldEncountersAndOldEvolutions.includes(x));

		//current encounters - old encounters and evolutions = list of all new encounters
		let jwowOnlyNewEncounters = myEncounters.filter(x => !oldEncountersAllEvolutions.includes(x));

		//list of all new encounters -> evolve[new cap] = new evolutions of new pokemon
		let jwowOnlyNewEvolutions = _jwowCheckEvolutions(jwowOnlyNewEncounters, myEvolutionItems, jwowLevelCap)

		myEncounters = jwowOnlyNewEncounters.concat(jwowOnlyNewEvolutions, oldEncountersNewEvolutions)

	}
	else
		myEncounters = myEncounters.concat(_jwowCheckEvolutions(myEncounters, myEvolutionItems, jwowLevelCap))
	
	if (jwowOnlyFullyEvolved)
		myEncounters = _jwowOnlyMaxEvolutions(myEncounters, myEvolutionItems, jwowLevelCap)
	
	for(let i = 0, j = tracker.length; i < j; i++){
        let name = tracker[i]["key"]
        if(tracker === locationsTracker){
            name = tracker[i]["key"].split("\\")[2]
        }
        if(myEncounters.indexOf(name) == -1){
            tracker[i]["filter"].push(`filter${jwowLevelCaps[jwowLevelCapIndex][0]}`.replaceAll(" ", ""))
        }
    }
}

function _jwowCheckEvolutions(myEncounters, myEvolutionItems, myLevelCap) {
	
	let outputList = []
	let encountersToCheck = []

	for (encounter of myEncounters) {
		encountersToCheck.push(encounter)
		
		while (encountersToCheck.length > 0) {
			currentEncounter = encountersToCheck.shift()
			
			for (const [evoCategory, evoCriteria, evoTarget] of species[currentEncounter]["evolution"]) {
				if (_jwowIsEvolutionPossible(species[currentEncounter], evoCategory, evoCriteria, evoTarget, myEvolutionItems, myLevelCap) <= myLevelCap) {
					outputList.push(evoTarget)
					if (species[evoTarget]["evolution"].length > 0) {
						encountersToCheck = encountersToCheck.concat(evoTarget)
					}
				}
			}
		}
	}
	
	return [...new Set(outputList)]
}

function _jwowOnlyMaxEvolutions(myEncounters, myEvolutionItems, myLevelCap) {
	
	let outputList = []
	let encountersToCheck = []
	let canEvolve = false

	for (encounter of myEncounters) {
		canEvolve = false
		for (const [evoCategory, evoCriteria, evoTarget] of species[encounter]["evolution"]) {
			if (_jwowIsEvolutionPossible(species[encounter], evoCategory, evoCriteria, evoTarget, myEvolutionItems, myLevelCap) <= myLevelCap) {
				canEvolve = true
			}
		}
		if (!canEvolve)
			outputList.push(encounter)
	}
	
	return [...new Set(outputList)]
}

function _jwowIsEvolutionPossible(baseSpecies, evoCategory, evoCriteria, evoTarget, myEvolutionItems,  myLevelCap) {
	
	
	//only method that doesnt require a level up
	if (evoCategory === "EVO_ITEM" || evoCategory === "EVO_MEGA") {
		if (myEvolutionItems.indexOf(evoCriteria) == -1)
			return 101
		return 1
	}
	
	//can baseSpecies only be obtained exactly at the level cap?
	const evoLineIndex = baseSpecies["evolutionLine"].indexOf(baseSpecies["name"])
	if (evoLineIndex > 0) {
		const preSpecies = species[baseSpecies["evolutionLine"][evoLineIndex - 1]]
		for (const [preCategory, preCriteria, preTarget] of preSpecies["evolution"]) {
			if (preTarget === baseSpecies["name"]) {
				if (_jwowIsEvolutionPossible(preSpecies, preCategory, preCriteria, preTarget, myEvolutionItems, myLevelCap - 1) >= myLevelCap)
					return 101
			}
			break
		}
	}
	
	if (evoCategory === "EVO_FRIENDSHIP" || evoCategory === "EVO_FRIENDSHIP_DAY" || evoCategory === "EVO_FRIENDSHIP_NIGHT") {
		return 1
	}

	let evoLevelCategories = ["EVO_LEVEL", "EVO_LEVEL_DAY", "EVO_LEVEL_NIGHT", "EVO_MALE_LEVEL", "EVO_FEMALE_LEVEL", "EVO_LEVEL_ATK_GT_DEF", "EVO_LEVEL_ATK_LT_DEF", "EVO_LEVEL_ATK_EQ_DEF", "EVO_LEVEL_SILCOON", "EVO_LEVEL_CASCOON", "EVO_LEVEL_NINJASK", "EVO_LEVEL_SPECIFIC_TIME_RANGE", "EVO_NATURE_TOXTRICITY", "EVO_NATURE_LOWKEY", "EVO_TYPE_IN_PARTY", "EVO_RAINY_FOGGY_OW"]
	
	if (!jwowIsHardcore)
		evoLevelCategories.push("EVO_LEVEL_SHEDINJA")

	if (evoLevelCategories.indexOf(evoCategory) > -1) {
		if (evoCriteria > myLevelCap)
			return 101
		return evoCriteria
	}
	
	if (evoCategory === "EVO_MOVE") {
		for (const [move, level] of baseSpecies['levelUpLearnsets']) {
			if (level > myLevelCap)
				return 101
			if (move === evoCriteria && level <= myLevelCap) {
				return level
			}
		}
		return 101
	}
	
	if (evoCategory === "EVO_MOVE_TYPE") {
		for (const [move, level] of baseSpecies['levelUpLearnsets']) {
			if (level > myLevelCap)
				return 101
			if (moves[move]["type"] === evoCriteria) {
				return level
			}
		}
		return 101
	}
}


function _jwowEncounterBlock(index) {
	
	let outputList = []
	
	if (index === 0) {
		
		//***************************************//
		//               Pre-Brock
		//***************************************//
		
		//Standard
		outputList = outputList.concat(Object.keys(locations['Pallet Town']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 1']['Day']))
		outputList = outputList.concat(Object.keys(locations['Route 1']['Night']))
		outputList = outputList.concat(Object.keys(locations['Viridian City']['Day']))
		outputList = outputList.concat(Object.keys(locations['Viridian City']['Night']))
		outputList = outputList.concat(Object.keys(locations['Route 22']['Day']))
		outputList = outputList.concat(Object.keys(locations['Route 22']['Night']))
		outputList = outputList.concat(Object.keys(locations['Route 22']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 21 A']['Day']))
		outputList = outputList.concat(Object.keys(locations['Route 21 A']['Night']))
		outputList = outputList.concat(Object.keys(locations['Route 21 A']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 2']['Day']))
		outputList = outputList.concat(Object.keys(locations['Route 2']['Night']))
		outputList = outputList.concat(Object.keys(locations['Viridian Forest']['Day']))
		outputList = outputList.concat(Object.keys(locations['Viridian Forest']['Night']))
		outputList = outputList.concat(Object.keys(locations['Viridian Forest 2']['Day']))
		outputList = outputList.concat(Object.keys(locations['Viridian Forest 2']['Night']))
		outputList = outputList.concat(Object.keys(locations['Digletts Cave North Entrance']['Day']))
		outputList = outputList.concat(Object.keys(locations['Digletts Cave North Entrance']['Night']))
		outputList = outputList.concat(Object.keys(locations['Pewter City']['Day']))
		outputList = outputList.concat(Object.keys(locations['Pewter City']['Night']))
	}
	
	if (index === 1) {
		
		//***************************************//
		//          Pre-Mt Moon Archer
		//***************************************//
		
		//Raids
		outputList = outputList.concat(Object.keys(locations['Route 3']['Raid 1 Star']))
		outputList = outputList.concat(Object.keys(locations['Mt Moon']['Raid 1 Star']))
		
		//Standard
		outputList = outputList.concat(Object.keys(locations['Route 3']['Day']))
		outputList = outputList.concat(Object.keys(locations['Route 3']['Night']))
		outputList = outputList.concat(Object.keys(locations['Route 4']['Day']))
		outputList = outputList.concat(Object.keys(locations['Route 4']['Night']))
		outputList = outputList.concat(Object.keys(locations['Mt Moon 1 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Mt Moon 1 F']['Night']))
		outputList = outputList.concat(Object.keys(locations['Mt Moon B 1 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Mt Moon B 1 F']['Night']))
		outputList = outputList.concat(Object.keys(locations['Mt Moon B 2 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Mt Moon B 2 F']['Night']))
	}
	
	if (index === 2) {
		
		//***************************************//
		//               Pre-Misty
		//***************************************//
		
		//Special
		outputList = outputList.concat(['SPECIES_CARNIVINE']) //Cerulean City trade
		outputList = outputList.concat(['SPECIES_EEVEE']) //Route 5 gift
		outputList = outputList.concat(['SPECIES_CRANIDOS', 'SPECIES_TYRUNT', 'SPECIES_LILEEP', 'SPECIES_ARCHEN', 'SPECIES_OMANYTE', 'SPECIES_KABUTO', 'SPECIES_TIRTOUGA', 'SPECIES_ANORITH', 'SPECIES_SHIELDON', 'SPECIES_AMAURA', 'SPECIES_AERODACTYL']) //from fossil trader, couldnt find data in locations[]
		outputList = outputList.concat(['SPECIES_FARFETCHD_G']) //Vermilion City trade
		outputList = outputList.concat(['SPECIES_FLOETTE_ETERNAL']) //Route 11 trade, use the shiny stone from Brendan
		outputList = outputList.concat(['SPECIES_MR_MIME_G']) //Route 2 trade
		
		//Alt Forms
		outputList = outputList.concat(['SPECIES_UNFEZANT_F'])
		outputList = outputList.concat(['SPECIES_PYROAR_FEMALE'])
		outputList = outputList.concat(['SPECIES_DARMANITANZEN']) //battle form with different stats
		outputList = outputList.concat(['SPECIES_CHERRIM_SUN']) //battle form with different stats
		outputList = outputList.concat(['SPECIES_WISHIWASHI_S']) //battle form with different stats
		outputList = outputList.concat(['SPECIES_FRILLISH_F']) //gender difference thats not in the encounter table explicitly
		outputList = outputList.concat(['SPECIES_HIPPOPOTAS_F']) //gender difference thats not in the encounter table explicitly
		
		//Raids
		outputList = outputList.concat(Object.keys(locations['Route 4']['Raid 1 Star']))
		outputList = outputList.concat(Object.keys(locations['Route 24']['Raid 1 Star']))
		outputList = outputList.concat(Object.keys(locations['Route 25']['Raid 1 Star']))
		outputList = outputList.concat(Object.keys(locations['Route 5']['Raid 2 Star']))
		outputList = outputList.concat(Object.keys(locations['Route 6']['Raid 2 Star']))
		outputList = outputList.concat(Object.keys(locations['Route 11']['Raid 2 Star']))
		outputList = outputList.concat(Object.keys(locations['Digletts Cave']['Raid 2 Star']))
		
		//Standard
		outputList = outputList.concat(Object.keys(locations['Cerulean City']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 24']['Day']))
		outputList = outputList.concat(Object.keys(locations['Route 24']['Night']))
		outputList = outputList.concat(Object.keys(locations['Route 24']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 25']['Day']))
		outputList = outputList.concat(Object.keys(locations['Route 25']['Night']))
		outputList = outputList.concat(Object.keys(locations['Route 25']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 5']['Day']))
		outputList = outputList.concat(Object.keys(locations['Route 5']['Night']))
		outputList = outputList.concat(Object.keys(locations['Route 6']['Day']))
		outputList = outputList.concat(Object.keys(locations['Route 6']['Night']))
		outputList = outputList.concat(Object.keys(locations['Route 6']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Vermilion City']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Vermilion City']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Pallet Town']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Viridian City']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 22']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 21 A']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Cerulean City']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 24']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 25']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 6']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 11']['Day']))
		outputList = outputList.concat(Object.keys(locations['Route 11']['Night']))
		outputList = outputList.concat(Object.keys(locations['Route 11']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 11']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Digletts Cave B 1 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Digletts Cave B 1 F']['Night']))
		outputList = outputList.concat(Object.keys(locations['S S Anne']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['S S Anne']['Good Rod']))
	}
	
	if (index === 3) {
			
		//***************************************//
		//              Pre-Lt Surge
		//***************************************//
		
		//Special
		outputList = outputList.concat(['SPECIES_EISCUE']) //Route 5 trade
		outputList = outputList.concat(['SPECIES_CHATOT']) //Celadon City trade
		outputList = outputList.concat(['SPECIES_TAUROS_P_FIRE', 'SPECIES_TAUROS_P_WATER']) //Saffron City Dojo gift
		outputList = outputList.concat(['SPECIES_PIKACHU_POP_STAR']) //Missing from the yellow shard egg
		
		//Alt Forms
		outputList = outputList.concat(['SPECIES_ORICORIO_Y']) //nectar in saffron city
		outputList = outputList.concat(['SPECIES_ORICORIO_P']) //nectar in saffron city
		outputList = outputList.concat(['SPECIES_ORICORIO_S']) //nectar in saffron city
		outputList = outputList.concat(['SPECIES_MINIOR_RED']) //battle form with different stats (same as other colors)
		outputList = outputList.concat(['SPECIES_EISCUE_NOICE']) //battle form with different stats
		outputList = outputList.concat(['SPECIES_ASHGRENINJA']) //requires hidden ability, this is earliest even if froakie was starter
		
		//Raids
		outputList = outputList.concat(Object.keys(locations['Route 2']['Raid 2 Star']))
		outputList = outputList.concat(Object.keys(locations['Route 9']['Raid 2 Star']))
		outputList = outputList.concat(Object.keys(locations['Route 10']['Raid 2 Star']))
		outputList = outputList.concat(Object.keys(locations['Rock Tunnel']['Raid 2 Star']))
		outputList = outputList.concat(Object.keys(locations['Route 12']['Raid 2 Star']))
		outputList = outputList.concat(Object.keys(locations['Route 8']['Raid 2 Star']))
		outputList = outputList.concat(Object.keys(locations['Route 16']['Raid 2 Star']))
		
		//Standard
		outputList = outputList.concat(Object.keys(locations['Route 9']['Day']))
		outputList = outputList.concat(Object.keys(locations['Route 9']['Night']))
		outputList = outputList.concat(Object.keys(locations['Route 10']['Day']))
		outputList = outputList.concat(Object.keys(locations['Route 10']['Night']))
		outputList = outputList.concat(Object.keys(locations['Route 10']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 10']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Rock Tunnel 1 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Rock Tunnel 1 F']['Night']))
		outputList = outputList.concat(Object.keys(locations['Rock Tunnel B 1 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Rock Tunnel B 1 F']['Night']))
		outputList = outputList.concat(Object.keys(locations['Route 12']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 12']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 8']['Day']))
		outputList = outputList.concat(Object.keys(locations['Route 8']['Night']))
		outputList = outputList.concat(Object.keys(locations['Route 7']['Day']))
		outputList = outputList.concat(Object.keys(locations['Route 7']['Night']))
		outputList = outputList.concat(Object.keys(locations['Celadon City']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Celadon City']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Celadon City']['Red Shard']))
		outputList = outputList.concat(Object.keys(locations['Celadon City']['Green Shard']))
		outputList = outputList.concat(Object.keys(locations['Celadon City']['Blue Shard']))
		outputList = outputList.concat(Object.keys(locations['Celadon City']['Yellow Shard']))
		outputList = outputList.concat(Object.keys(locations['Route 16']['Day']))
		outputList = outputList.concat(Object.keys(locations['Route 16']['Night']))
	}

	if (index === 4) {
		
		//***************************************//
		//               Pre-Erika
		//***************************************//
		
		//nothing goes here! dark rock tunnel is poggers!
	}
	
	if (index === 5) {
		
		//***************************************//
		//        Pre-Game Corner Giovanni    
		//***************************************//
		
		//Alt Forms
		outputList = outputList.concat(['SPECIES_AEGISLASH_BLADE']) //battle form with different stats
		outputList = outputList.concat(['SPECIES_ROTOM_HEAT']) //available with base pokemon
		outputList = outputList.concat(['SPECIES_ROTOM_WASH']) //available with base pokemon
		outputList = outputList.concat(['SPECIES_ROTOM_FROST']) //available with base pokemon
		outputList = outputList.concat(['SPECIES_ROTOM_FAN']) //available with base pokemon
		outputList = outputList.concat(['SPECIES_ROTOM_MOW']) //available with base pokemon
		
		//Raids
		outputList = outputList.concat(Object.keys(locations['Mt Moon']['Raid 3 Star']))
		
		//Standard
		outputList = outputList.concat(Object.keys(locations['Celadon City']['Game Corner']))
	}
	
	if (index === 6) {
		//***************************************//
		//     Pre-Silph Co Archer & Ariana
		//***************************************//
		
		//Special
		outputList = outputList.concat(['SPECIES_SNORLAX']) //Route 12 or Route 16 static encounter
		outputList = outputList.concat(['SPECIES_LAPRAS']) //Silph Co gift
		
		//Standard
		outputList = outputList.concat(Object.keys(locations['Pokemon Tower 3 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Pokemon Tower 3 F']['Night']))
		outputList = outputList.concat(Object.keys(locations['Pokemon Tower 4 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Pokemon Tower 4 F']['Night']))
		outputList = outputList.concat(Object.keys(locations['Pokemon Tower 5 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Pokemon Tower 5 F']['Night']))
		outputList = outputList.concat(Object.keys(locations['Pokemon Tower 6 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Pokemon Tower 6 F']['Night']))
		outputList = outputList.concat(Object.keys(locations['Pokemon Tower 7 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Pokemon Tower 7 F']['Night']))
	}
	
	if (index === 7) {
		
		//***************************************//
		//          Pre-Giovanni Silph Co   
		//***************************************//
		
		//nothing goes here!
	}
	
	if (index === 8) {

		//***************************************//
		//              Pre-Sabrina
		//***************************************//
		
		//Special
		outputList = outputList.concat(['SPECIES_FINIZEN']) //Misty 2 gift
		
		//Alt Forms
		outputList = outputList.concat(['SPECIES_PALAFIN_HERO']) //battle form with different stats
	}
	
	if (index === 9) {
		
		//***************************************//
		//               Pre-Koga
		//***************************************//
		
		//Special
		outputList = outputList.concat(['SPECIES_MORPEKO']) //Route 18 trade
		outputList = outputList.concat(['SPECIES_COBALION']) //Mt Moon B2F static encounter
		outputList = outputList.concat(['SPECIES_TERRAKION']) //Rock Tunnel B1F static encounter
		outputList = outputList.concat(['SPECIES_VIRIZION']) //Forest Expansion static encounter
		
		//Raids
		outputList = outputList.concat(Object.keys(locations['Route 13']['Raid 3 Star']))
		outputList = outputList.concat(Object.keys(locations['Route 14']['Raid 3 Star']))
		outputList = outputList.concat(Object.keys(locations['Route 15']['Raid 3 Star']))
		outputList = outputList.concat(Object.keys(locations['Viridian Forest']['Raid 3 Star'])) //requires rock smash, theoretically unlocked right after Erika
		
		//Standard
		outputList = outputList.concat(Object.keys(locations['Route 12']['Day']))
		outputList = outputList.concat(Object.keys(locations['Route 12']['Night']))
		outputList = outputList.concat(Object.keys(locations['Route 13']['Day']))
		outputList = outputList.concat(Object.keys(locations['Route 13']['Night']))
		outputList = outputList.concat(Object.keys(locations['Route 13']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 13']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 14']['Day']))
		outputList = outputList.concat(Object.keys(locations['Route 14']['Night']))
		outputList = outputList.concat(Object.keys(locations['Route 15']['Day']))
		outputList = outputList.concat(Object.keys(locations['Route 15']['Night']))
		outputList = outputList.concat(Object.keys(locations['Route 16']['Day']))
		outputList = outputList.concat(Object.keys(locations['Route 16']['Night']))
		outputList = outputList.concat(Object.keys(locations['Route 17']['Day']))
		outputList = outputList.concat(Object.keys(locations['Route 17']['Night']))
		outputList = outputList.concat(Object.keys(locations['Route 18']['Day']))
		outputList = outputList.concat(Object.keys(locations['Route 18']['Night']))
		outputList = outputList.concat(Object.keys(locations['Pallet Town']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Viridian City']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 22']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 21 A']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Cerulean City']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 24']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 25']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 6']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Vermilion City']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 11']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 10']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 12']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Celadon City']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 13']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Safari Zone Center']['Day']))
		outputList = outputList.concat(Object.keys(locations['Safari Zone Center']['Night']))
		outputList = outputList.concat(Object.keys(locations['Safari Zone Center']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Safari Zone Center']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Safari Zone Center']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Safari Zone East']['Day']))
		outputList = outputList.concat(Object.keys(locations['Safari Zone East']['Night']))
		outputList = outputList.concat(Object.keys(locations['Safari Zone East']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Safari Zone East']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Safari Zone East']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Safari Zone North']['Day']))
		outputList = outputList.concat(Object.keys(locations['Safari Zone North']['Night']))
		outputList = outputList.concat(Object.keys(locations['Safari Zone North']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Safari Zone North']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Safari Zone North']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Safari Zone West']['Day']))
		outputList = outputList.concat(Object.keys(locations['Safari Zone West']['Night']))
		outputList = outputList.concat(Object.keys(locations['Safari Zone West']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Safari Zone West']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Safari Zone West']['Super Rod']))
	}
	
	if (index === 10) {
		
		//***************************************//
		//                Pre-May
		//***************************************//
		
		//Special
		outputList = outputList.concat(['SPECIES_KELDEO']) //Seafoam Islands B1F static encounter
		outputList = outputList.concat(['SPECIES_ARTICUNO', 'SPECIES_ARTICUNO_G']) //Seafoam Islands B4F static encounters
		outputList = outputList.concat(['SPECIES_ZAPDOS', 'SPECIES_ZAPDOS_G']) //Power Plant static encounters
		outputList = outputList.concat(['SPECIES_MIMIKYU']) //Cinnabar Island trade
		
		//Alt Forms 
		outputList = outputList.concat(['SPECIES_DARMANITAN_G_ZEN']) //battle form with different stats
		
		//Raids
		outputList = outputList.concat(Object.keys(locations['Route 25']['Raid 4 Star']))
		outputList = outputList.concat(Object.keys(locations['Route 2']['Raid 4 Star']))
		outputList = outputList.concat(Object.keys(locations['Route 10']['Raid 4 Star']))
		outputList = outputList.concat(Object.keys(locations['Route 16']['Raid 4 Star']))
		outputList = outputList.concat(Object.keys(locations['Seafoam']['Raid 4 Star']))
		outputList = outputList.concat(Object.keys(locations['Power Plant']['Raid 4 Star']))
		
		//Standard
		outputList = outputList.concat(Object.keys(locations['Pallet Town']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Viridian City']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Route 22']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Route 21 A']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Cerulean City']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Route 24']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Route 25']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Route 6']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Vermilion City']['Surfing']))
		//outputList = outputList.concat(Object.keys(locations['Route 11']['Surfing']))  //This doesnt exists? who doesnt like tentacools?
		outputList = outputList.concat(Object.keys(locations['Route 10']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Route 12']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Celadon City']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Route 13']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Safari Zone Center']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Safari Zone East']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Safari Zone North']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Safari Zone West']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Route 19']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 19']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 19']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 19']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Route 20']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 20']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 20']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 20']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Route 21 B']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 21 B']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 21 B']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 21 B']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Seafoam Islands 1 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Seafoam Islands 1 F']['Night']))
		outputList = outputList.concat(Object.keys(locations['Seafoam Islands B 1 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Seafoam Islands B 1 F']['Night']))
		outputList = outputList.concat(Object.keys(locations['Seafoam Islands B 2 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Seafoam Islands B 2 F']['Night']))
		outputList = outputList.concat(Object.keys(locations['Seafoam Islands B 2 F']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Seafoam Islands B 2 F']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Seafoam Islands B 2 F']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Seafoam Islands B 2 F']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Seafoam Islands B 3 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Seafoam Islands B 3 F']['Night']))
		outputList = outputList.concat(Object.keys(locations['Seafoam Islands B 3 F']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Seafoam Islands B 3 F']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Seafoam Islands B 3 F']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Seafoam Islands B 3 F']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Power Plant']['Day']))
		outputList = outputList.concat(Object.keys(locations['Power Plant']['Night']))
	}
	
	if (index === 11) {
		
		//***************************************//
		//              Pre-Blaine
		//***************************************//
		
		//Raids
		outputList = outputList.concat(Object.keys(locations['Pokemon Mansion']['Raid 3 Star'])) //i dont believe this raid is possible to encounter
		
		//Standard
		outputList = outputList.concat(Object.keys(locations['Pokemon Mansion 1 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Pokemon Mansion 1 F']['Night']))
		outputList = outputList.concat(Object.keys(locations['Pokemon Mansion 2 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Pokemon Mansion 2 F']['Night']))
		outputList = outputList.concat(Object.keys(locations['Pokemon Mansion 3 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Pokemon Mansion 3 F']['Night']))
		outputList = outputList.concat(Object.keys(locations['Pokemon Mansion B 1 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Pokemon Mansion B 1 F']['Night']))
	}
	
	if (index === 12) {
		
		//***************************************//
		//   Pre-Cerulean Cave Archer & Ariana
		//***************************************//
		
		//Alt Forms
		outputList = outputList.concat(['SPECIES_HOOPA_UNBOUND']) //available with base pokemon
		
		//Raids
		outputList = outputList.concat(Object.keys(locations['Viridian Forest']['Raid 5 Star']))
		outputList = outputList.concat(Object.keys(locations['Route 13']['Raid 5 Star']))
		outputList = outputList.concat(Object.keys(locations['Seafoam']['Raid 5 Star']))
		outputList = outputList.concat(Object.keys(locations['Power Plant']['Raid 5 Star']))
		outputList = outputList.concat(Object.keys(locations['Pokemon Mansion']['Raid 5 Star']))
		outputList = outputList.concat(Object.keys(locations['Cerulean Cave']['Raid 4 Star']))
		outputList = outputList.concat(Object.keys(locations['Cerulean Cave']['Raid 5 Star']))
		
		//Standard
		outputList = outputList.concat(Object.keys(locations['Route 23']['Day']))
		outputList = outputList.concat(Object.keys(locations['Route 23']['Night']))
		outputList = outputList.concat(Object.keys(locations['Route 23']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 23']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 23']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Route 23']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Cerulean Cave 1 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Cerulean Cave 1 F']['Night']))
		outputList = outputList.concat(Object.keys(locations['Cerulean Cave 1 F']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Cerulean Cave 1 F']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Cerulean Cave 1 F']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Cerulean Cave 1 F']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Cerulean Cave 2 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Cerulean Cave 2 F']['Night']))
		outputList = outputList.concat(Object.keys(locations['Cerulean Cave B 1 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Cerulean Cave B 1 F']['Night']))
		outputList = outputList.concat(Object.keys(locations['Cerulean Cave B 1 F']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Cerulean Cave B 1 F']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Cerulean Cave B 1 F']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Cerulean Cave B 1 F']['Surfing']))
	}
	
	if (index === 13) {
		
		//***************************************//
		//      Pre-Cerulean Cave Giovanni
		//***************************************//
		
		//nothing goes here!
	}
	
	if (index === 14) {
		
		//***************************************//
		//              Pre-Clair 
		//***************************************//
	
		//Special
		outputList = outputList.concat(['SPECIES_KUBFU']) //Ketchup gift
	}
	
	if (index === 15) {
		
		//***************************************//
		//             Pre-Brendan 
		//***************************************//
		
		//Special
		outputList = outputList.concat(['SPECIES_LATIAS', 'SPECIES_LATIOS', 'SPECIES_TORNADUS', 'SPECIES_THUNDURUS', 'SPECIES_LANDORUS', 'SPECIES_WALKINGWAKE', 'SPECIES_TING_LU', 'SPECIES_CHIEN_PAO', 'SPECIES_WO_CHIEN', 'SPECIES_CHI_YU']) //Route 22 roamers
		
		//Alt Forms
		outputList = outputList.concat(['SPECIES_TORNADUS_THERIAN']) //Available with base pokemon
		outputList = outputList.concat(['SPECIES_THUNDURUS_THERIAN']) //Available with base pokemon
		outputList = outputList.concat(['SPECIES_LANDORUS_THERIAN']) //Available with base pokemon
	}
	
	if (index === 16) {
		
		//***************************************//
		//             Pre-Elite 4
		//***************************************//
		
		//Special
		outputList = outputList.concat(['SPECIES_MOLTRES', 'SPECIES_MOLTRES_G']) //Victory Road 2F static encounters
		
		//Alt Forms
		outputList = outputList.concat(['SPECIES_MELOETTA_PIROUETTE']) //battle form with different stats
		
		//Raids
		outputList = outputList.concat(Object.keys(locations['Victory Road']['Raid 5 Star']))
		
		//Standard
		outputList = outputList.concat(Object.keys(locations['Victory Road 1 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Victory Road 1 F']['Night']))
		outputList = outputList.concat(Object.keys(locations['Victory Road 2 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Victory Road 2 F']['Night']))
		outputList = outputList.concat(Object.keys(locations['Victory Road 3 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Victory Road 3 F']['Night']))
	}
	
	if (index === 17) {
		
		//***************************************//
		//               Post Game
		//***************************************//
		
		//Special
		outputList = outputList.concat(['SPECIES_COSMOG']) //Bought from One Island Battle Simulator, or Dumbass Mudkip Kid 2 gift
		outputList = outputList.concat(['SPECIES_ENAMORUS']) //Begins roaming after win streak on One Island Battle Simulator
		outputList = outputList.concat(['SPECIES_MAGEARNA']) //Rock Tunnel Secret Room static encounter
		outputList = outputList.concat(['SPECIES_MARSHADOW']) //Pokemon Tower Top static encounter (i think)
		outputList = outputList.concat(['SPECIES_MEWTWO']) //Cerulean Cave B1F static encounter, but doesnt spawn until post game
		outputList = outputList.concat(['SPECIES_KYOGRE']) //Seafoam Islands Secret Room static encounter
		outputList = outputList.concat(['SPECIES_HEATRAN']) //Mt Ember static encounter
		outputList = outputList.concat(['SPECIES_MEW']) //Berry Forest gift
		
		//Alt Forms
		outputList = outputList.concat(['SPECIES_WISHIWASHI_SEVI_S']) //battle form with different stats
		outputList = outputList.concat(['SPECIES_ZYGARDE_COMPLETE']) //battle form with different stats
		outputList = outputList.concat(['SPECIES_SHAYMIN_SKY']) //requires z-ring
		outputList = outputList.concat(['SPECIES_ENAMORUS_THERIAN']) //available with base pokemon
		outputList = outputList.concat(['SPECIES_NECROZMA_DUSK_MANE']) //available with base pokemon
		outputList = outputList.concat(['SPECIES_NECROZMA_DAWN_WINGS']) //available with base pokemon
		outputList = outputList.concat(['SPECIES_NECROZMA_ULTRA']) //requires z crystal, included here so the necrozma forms arent lost when filtering by only fully evolved
		
		//Raids
		outputList = outputList.concat(Object.keys(locations['Viridian Forest']['Raid 6 Star']))
		outputList = outputList.concat(Object.keys(locations['Seafoam']['Raid 6 Star']))
		outputList = outputList.concat(Object.keys(locations['Power Plant']['Raid 6 Star']))
		outputList = outputList.concat(Object.keys(locations['Pokemon Mansion']['Raid 6 Star']))
		outputList = outputList.concat(Object.keys(locations['Cerulean Cave']['Raid 6 Star']))
		outputList = outputList.concat(Object.keys(locations['Victory Road']['Raid 6 Star']))
		
		//Standard
		outputList = outputList.concat(Object.keys(locations['Kindle Road']['Day']))
		outputList = outputList.concat(Object.keys(locations['Kindle Road']['Night']))
		outputList = outputList.concat(Object.keys(locations['Kindle Road']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Kindle Road']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Kindle Road']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Kindle Road']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Mt Ember Exterior']['Day']))
		outputList = outputList.concat(Object.keys(locations['Mt Ember Exterior']['Night']))
		outputList = outputList.concat(Object.keys(locations['Mt Ember 1 F']['Night']))
		outputList = outputList.concat(Object.keys(locations['Treasure Beach']['Day']))
		outputList = outputList.concat(Object.keys(locations['Treasure Beach']['Night']))
		outputList = outputList.concat(Object.keys(locations['Treasure Beach']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Treasure Beach']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Treasure Beach']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Treasure Beach']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Rock Tunnel']['Day']))
		outputList = outputList.concat(Object.keys(locations['Rock Tunnel']['Night']))
		outputList = outputList.concat(Object.keys(locations['Cape Brink']['Day']))
		outputList = outputList.concat(Object.keys(locations['Cape Brink']['Night']))
		outputList = outputList.concat(Object.keys(locations['Cape Brink']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Cape Brink']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Cape Brink']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Cape Brink']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Bond Bridge']['Day']))
		outputList = outputList.concat(Object.keys(locations['Bond Bridge']['Night']))
		outputList = outputList.concat(Object.keys(locations['Bond Bridge']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Bond Bridge']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Bond Bridge']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Bond Bridge']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Berry Forest']['Day']))
		outputList = outputList.concat(Object.keys(locations['Berry Forest']['Night']))
		outputList = outputList.concat(Object.keys(locations['Berry Forest']['Old Rod']))
		outputList = outputList.concat(Object.keys(locations['Berry Forest']['Good Rod']))
		outputList = outputList.concat(Object.keys(locations['Berry Forest']['Super Rod']))
		outputList = outputList.concat(Object.keys(locations['Berry Forest']['Surfing']))
		outputList = outputList.concat(Object.keys(locations['Pokemon Tower 1 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Pokemon Tower 2 F']['Day']))
		outputList = outputList.concat(Object.keys(locations['Three Island Port']['Day']))
	}
	
	return [...new Set(outputList)]
}

function _jwowItemBlock(index, isHardcore) {
	
	let outputList = []
	
	if (index === 0) {
		
		//***************************************//
		//               Pre-Brock
		//***************************************//
		
		//nothing goes here!
	}
	
	if (index === 1) {
		
		//***************************************//
		//          Pre-Mt Moon Archer
		//***************************************//
		
		//Items
		outputList = outputList.concat(["ITEM_THUNDER_STONE"])
		outputList = outputList.concat(["ITEM_WATER_STONE"])
		outputList = outputList.concat(["ITEM_MOON_STONE"])
	}
	
	if (index === 2) {
		
		//***************************************//
		//               Pre-Misty
		//***************************************//
		
		//Items
		outputList = outputList.concat(["ITEM_SUN_STONE"])
		outputList = outputList.concat(["ITEM_LEAF_STONE"])
		outputList = outputList.concat(["ITEM_FIRE_STONE"])
		outputList = outputList.concat(["ITEM_SHINY_STONE"])
	}
	
	if (index === 3) {
			
		//***************************************//
		//              Pre-Lt Surge
		//***************************************//
		
		//Items
		outputList.push("ITEM_FIRE_STONE")
		outputList.push("ITEM_THUNDER_STONE")
		outputList.push("ITEM_LEAF_STONE")
		outputList.push("ITEM_WATER_STONE")
		outputList.push("ITEM_SUN_STONE")
		outputList.push("ITEM_MOON_STONE")
		outputList.push("ITEM_PRISM_SCALE")
		outputList.push("ITEM_ICE_STONE")
		outputList.push("ITEM_LINK_CABLE")
		outputList.push("ITEM_DUSK_STONE")
		outputList.push("ITEM_DAWN_STONE")
		outputList.push("ITEM_SHINY_STONE")
		outputList.push("ITEM_KINGS_ROCK")
		outputList.push("ITEM_METAL_COAT")
		outputList.push("ITEM_UP_GRADE")
		
	}

	if (index === 4) {
		
		//***************************************//
		//               Pre-Erika
		//***************************************//
		
		//nothing goes here!
		
	}
	
	if (index === 5) {
		
		//***************************************//
		//        Pre-Game Corner Giovanni    
		//***************************************//
		
		//nothing goes here!
	}
	
	if (index === 6) {
		//***************************************//
		//     Pre-Silph Co Archer & Ariana
		//***************************************//
		
		//nothing goes here!
	}
	
	if (index === 7) {
		
		//***************************************//
		//          Pre-Giovanni Silph Co   
		//***************************************//
		
		//nothing goes here!
	}
	
	if (index === 8) {

		//***************************************//
		//              Pre-Sabrina
		//***************************************//

		//Items
		outputList.push("ITEM_SABLENITE")
		outputList.push("ITEM_GENGARITE")
		outputList.push("ITEM_ALAKAZITE")
		outputList.push("ITEM_VENUSAURITE")
		outputList.push("ITEM_BLASTOISINITE")
		outputList.push("ITEM_SWAMPERTITE")
		outputList.push("ITEM_GALLADITE")
		outputList.push("ITEM_ALCREMITE")
		outputList.push("ITEM_KANGASKHANITE")
		outputList.push("ITEM_AUDINITE")
		outputList.push("ITEM_GARBODORITE")
		outputList.push("ITEM_AERODACTYLITE")
		outputList.push("ITEM_GYARADOSITE")
		outputList.push("ITEM_MANECTITE")
		outputList.push("ITEM_CENTISKITE")
		outputList.push("ITEM_APPLITE")
		if (isHardcore)
			outputList.push("ITEM_CHARIZARDITE_Y")
		else
			outputList.push("ITEM_CHARIZARDITE_X")
	}
	
	if (index === 9) {
		
		//***************************************//
		//               Pre-Koga
		//***************************************//
		
		//Items
		outputList.push("ITEM_SHARPEDONITE")
		outputList.push("ITEM_ABSOLITE")
		outputList.push("ITEM_ALTARIANITE")
		outputList.push("ITEM_COALOSSITE")
		outputList.push("ITEM_BUTTERFRITE")
		outputList.push("ITEM_ORBEETLITE")
		outputList.push("ITEM_HERACRONITE")
		outputList.push("ITEM_LOPUNNITE")
		outputList.push("ITEM_PIDGEOTITE")
		outputList.push("ITEM_BEEDRILLITE")
		outputList.push("ITEM_SANDACONDITE")
		if (isHardcore)
			outputList.push("ITEM_CAMERUPTITE")
		else
			outputList.push("ITEM_GARDEVOIRITE")
	}
	
	if (index === 10) {
		
		//***************************************//
		//                Pre-May
		//***************************************//
		
		//Items
		outputList.push("ITEM_TOXTRICITITE")
		outputList.push("ITEM_LUCARIONITE")
		outputList.push("ITEM_DREDNAWITE")
		outputList.push("ITEM_TYRANITARITE")
		outputList.push("ITEM_PINSIRITE")
		outputList.push("ITEM_SLOWBRONITE")
		outputList.push("ITEM_SCIZORITE")
		outputList.push("ITEM_COPPERAJITE")
		outputList.push("ITEM_GLALITITE")
		outputList.push("ITEM_KINGLERITE")
		outputList.push("ITEM_ABOMASITE")
		outputList.push("ITEM_LAPRASITE")
		outputList.push("ITEM_AMPHAROSITE")
		outputList.push("ITEM_MACHAMPITE")
		outputList.push("ITEM_MEDICHAMITE")
		outputList.push("ITEM_AGGRONITE")
		outputList.push("ITEM_STEELIXITE")
	}
	
	if (index === 11) {
		
		//***************************************//
		//              Pre-Blaine
		//***************************************//
		
		//Items
		outputList.push("ITEM_BLAZIKENITE")
		outputList.push("ITEM_BANETTITE")
		if (isHardcore)
			outputList.push("ITEM_GARDEVOIRITE")
		else
			outputList.push("ITEM_CAMERUPTITE")
	}
	
	if (index === 12) {
		
		//***************************************//
		//   Pre-Cerulean Cave Archer & Ariana
		//***************************************//
		
		//Items
		outputList.push("ITEM_SNORLAXITE")
		outputList.push("ITEM_DIANCITE")
		outputList.push("ITEM_GARCHOMPITE")
			if (isHardcore)
			outputList.push("ITEM_CHARIZARDITE_X")
		else
			outputList.push("ITEM_CHARIZARDITE_Y")
	}
	
	if (index === 13) {
		
		//***************************************//
		//      Pre-Cerulean Cave Giovanni
		//***************************************//
		
		//Items
		outputList.push("ITEM_MAWILITE")
		outputList.push("ITEM_HOUNDOOMINITE")
	}
	
	if (index === 14) {
		
		//***************************************//
		//              Pre-Clair 
		//***************************************//

		//Items
		outputList.push("ITEM_SALAMENCITE")
	}
	
	if (index === 15) {
		
		//***************************************//
		//             Pre-Brendan 
		//***************************************//

		//Items
		outputList.push("ITEM_DURALUDONITE")
		outputList.push("ITEM_LATIOSITE")
		outputList.push("ITEM_LATIASITE")
	}
	
	if (index === 16) {
		
		//***************************************//
		//             Pre-Elite 4
		//***************************************//
		
		//Items
		outputList.push("ITEM_SCEPTILITE")
		outputList.push("ITEM_METAGROSSITE")

	}
	
	if (index === 17) {
		
		//***************************************//
		//               Post Game
		//***************************************//
		
		//Items
		outputList.push("ITEM_MEWTWONITE_Y")
		outputList.push("ITEM_MEWTWONITE_X")
		outputList.push("ITEM_BLUE_ORB")
		//outputList.push("ITEM_ULTRANECROZIUM_Z") //in alt forms instead so the other necrozma forms arent filtered out when filtering by only fully evolved
		
	}
	
	return outputList
}