

var world = { seconds: 0, roundSeconds: 60 };

var METAL_TEAM_IDX = 0;
var WOOD_TEAM_IDX = 1;

var MAX_SPACE = 256;

						  // Metal, Wood
var TEAM_ATTACK_DIRECTION = [-1, 1];
var HEARTH_SPACES 		  = [248, 8];
var OWN_GOAL_SPACES 	  = [240, 16];
var TARGET_GOAL_SPACES    = [16, 240];
var LAST_SHOOTER_SPACES	  = [17, 239];

var UnknownSpeaker = { name: "???" };

var allNavis = [
	{ name: 'MetalMan.EXE', chips: { folder: [], pack: [] } },
	{ name: 'AirMan.EXE', chips: { folder: [], pack: [] } },
	{ name: 'BubbleMan.EXE', chips: { folder: [], pack: [] } },
	{ name: 'QuickMan.EXE', chips: { folder: [], pack: [] } },
	{ name: 'CrashMan.EXE', chips: { folder: [], pack: [] } },
	{ name: 'FlashMan.EXE', chips: { folder: [], pack: [] } },
	{ name: 'HeatMan.EXE', chips: { folder: [], pack: [] } },
	{ name: 'WoodMan.EXE', chips: { folder: [], pack: [] } }
];

var ball = { space: MAX_SPACE / 2, navi: null };

// ======= START Chips Section =======

var stringFormGuideData = [
`1 Cannon ABCDE None 40 "A nice, big cannon!" * Shot`,
`2 HiCannon FGHIJ None 80 "A nice, big cannon!" ** Shot`,
`3 M-Cannon KLMNO None 120 "A nice, big cannon!" *** Shot`,
`4 Shotgun KMNQR None 30 "Hits enemy and keeps going 1pnl" * Shot Splash-past`,
`5 CrossGun CEFJK None 30 "4-panel diagonal blast" * Shot Splash-X`,
`6 Spreader HIJKL None 30 "Gun with a 1-panel blast" ** Shot Splash-around`,
`7 Bubbler AKLPS Aqua 50 "Bubbles w/ a 1-panel blast" * Shot Splash-past`,
`8 Heater CFGKO Fire 70 "Fire with a 1-panel blast" ** Shot Splash-past`,
`9 MiniBomb CEJLP None 50 "Throw a bomb! Depth=3" * Toss`,
`10 LilBomb BDGOT None 50 "Throw a bomb! Depth=3" * Toss Splash-wide`,
`11 CrosBomb BDHJL None 70 "Cross bomb Depth=3" ** Toss Splash-X`,
`12 BigBomb BGOST None 90 "Bomb with a big boom Depth=3" **** Toss Splash-around`,
`13 Sword BKLPS None 80 "Cut down enemies! Range=1" * Sword`,
`14 WideSwrd CKMNS None 80 "Cut down column! Range=1" * Sword`,
`15 LongSwrd DENOS None 80 "Cut down enemies! Range=2" ** Sword`,
`16 FtrSword BKLPS None 100 "Warrior's sword Range=3" *** Sword`,
`17 KngtSwrd BCEGH None 150 "Knight's sword Range=3" **** Sword`,
`18 HeroSwrd BDFIJ None 200 "Legendary sword Range=3" ***** Sword`,
`19 FireSwrd BFGNP Fire 100 "Cuts down column Range=1" ** Sword`,
`20 AquaSwrd AMNOP Aqua 150 "Cuts down column Range=1" *** Sword`,
`21 ElecSwrd EGLOS Elec 120 "Cuts down column Range=1" *** Sword`,
`22 Muramasa CEGJK None ??? "Do damage = to your HP loss" ***** Sword Stealth SKIP_FOR_NOW SFN:ShadowMan`,
`23 ShokWave CKLNP None 60 "Piercing ground wave" * Shot Ground Wave`,
`24 SoniWave CDJMS None 80 "Piercing ground wave" ** Shot Ground Wave`,
`25 DynaWave CEMRS None 100 "Piercing ground wave" *** Shot Ground Wave`,
`26 FireTowr EFLMT Fire 100 "Fire that can move up & down" ** Tower Wave`,
`27 AquaTowr ACGHR Aqua 120 "Aqua that can move up & down" ** Tower`,
`28 WoodTowr BCHKN Wood 140 "Log that can move up & down" ** Tower`,
`29 Quake1 AEHKQ None 90 "Cracks a panel Depth=3" * Airstrike Shatter`,
`30 Quake2 BCIKQ None 120 "Cracks a panel Depth=3" ** Airstrike Shatter`,
`31 Quake3 CDHMQ None 150 "Cracks a panel Depth=3" *** Airstrike Shatter`,
`32 GutsPnch BHMNT None 60 "Knocks stuff over Range=1" * Brawl`,
`33 IcePunch BHMNT Aqua 80 "Knocks stuff over Range=1" ** Brawl`,
`34 Dash BDGLO None 50 "Knock over all in your path!" * Dash`,
`35 Howitzer ACGHO None 150 "Breaks panels Depth=3" **** Toss Shatter2 Breaker`,
`36 TriArrow ABCDE None 40 "Fires a 3-arrow burst" * Shot x3 Metal`,
`37 TriSpear FGHIJ None 50 "Fires a 3-spear burst" ** Shot x3 Metal`,
`38 TriLance KLMNO None 60 "Fires a 3-lance burst" **** Shot x3 Metal`,
`39 Ratton1 ABCDE None 80 "Missile that can turn once" * Drone Ground Accuracy+`,
`40 Ratton2 FGHIJ None 100 "Missile that can turn once" ** Drone Ground Accuracy+`,
`41 Ratton3 KLMNO None 120 "Missile that can turn once" *** Drone Ground Accuracy++`,
`42 Wave ADILM Aqua 80 "3-row wave! [Aqua]" *** Area Ground`,
`43 RedWave BEJNP Fire 100 "3-row lava wave! [Fire]" *** Area Ground`,
`44 BigWave CHKLQ Aqua 160 "3-row giant wave [Aqua]" **** Area Ground`,
`45 Gaia1 CDLOT None 100 "Rolling 3-column explosion!" *** Area`,
`46 Gaia2 CFKPS None 130 "Rolling 3-column explosion!" **** Area`,
`47 Gaia3 CGMRT None 160 "Rolling 3-column explosion!" ***** Area`,
`48 Thunder1 AEGHS Elec 90 "A rolling lightning attack" * SKIP_FOR_NOW`,
`49 Thunder2 BCFIL Elec 120 "A rolling lightning attack" ** SKIP_FOR_NOW`,
`50 Thunder3 DFGKN Elec 150 "A rolling lightning attack" *** SKIP_FOR_NOW`,
`51 RingZap1 GHMNP Elec 100 "Lightning circles you once" * Shot Lag Root`,
`52 RingZap2 CEGJL Elec 100 "Lightning circles you twice" ** Shot Lag Root`,
`53 RingZap3 ABORT Elec 100 "Lightning circles you thrice" *** Shot Lag Root`,
`54 Typhoon ABDEG None 30 "Creates a twister w/ 3 hits" * Airstrike Wind x3`,
`55 Huricane GIJKL None 30 "Creates a twister w/ 5 hits" ** Airstrike Wind x5`,
`56 Cyclone EFGHI None 30 "Creates a twister w/ 8 hits" *** Airstrike Wind x8`,
`57 Snakegg1 BEGMN Wood 130 "Squirming snake attack!" * Drone Ground`,
`58 Snakegg2 CEHNP Elec 140 "Shocking snake attack!" ** Drone Ground`,
`59 Snakegg3 ACFLS Fire 150 "Scorching snake attack!" *** Drone Ground`,
`60 Drain1 ABDKO None 50 "Charge to drain HP from enemy" ** Dash Drain`,
`61 Drain2 ACHNT None 70 "Charge to drain HP from enemy" ** Dash Drain`,
`62 Drain3 AEFLQ None 90 "Charge to drain HP from enemy" *** Dash Drain`,
`63 BodyBurn EFKMN Fire 100 "Engulf all around you in flames!" **** Dash`,
`64 X-Panel1 BDGLS None "Erase 1 panel Range=1" ** Terrain:Broken`,
`65 X-Panel3 BDGLS None "Erase column Range=1" *** Terrain:Broken`,
`66 Hammer AFIMQ None 100 "Breaks cubes Range=1" ** Melee Breaker`,
`67 MetGuard ACEGL None "Hold A Btn for 3 sec defense!" * Guard`,
`68 IronShld ABORT None "Hold btn. to create shield!" ** Guard Metal`,
`69 Recov10 ACEGL None -10 "Recover 10HP" * Recover`,
`70 Recov30 ACEGL None -30 "Recover 30HP" * Recover`,
`71 Recov50 ACEGL None -50 "Recover 50HP" * Recover`,
`72 Recov80 ACEGL None -80 "Recover 80HP" * Recover`,
`73 Recov120 ACEGL None -120 "Recover 120HP" ** Recover`,
`74 Recov150 ACEGL None -150 "Recover 150HP" ** Recover`,
`75 Recov200 ACEGL None -200 "Recover 200HP" *** Recover`,
`76 Recov300 ACEGL None -300 "Recover 300HP" **** Recover`,
`77 Steal AELPS None 0 "Steal left column of enemy area" *** Steal:Terrain`,
`78 Geddon1 FHJLN None 0 "All panels become cracked!" *** Area Terrain:Cracked`,
`79 Geddon2 ABEIK None 0 "Erases all empty panels" **** Area Terrain:Broken`,
`80 Escape FHJLN None 0 "Escape from most enemies" *** Stealth`,
`81 Interupt FHJLN None 0 "Destroy enemy chip data" *** Psychic`,
`82 Repair AGHKS None 0 "Repair panels in your area" * Recover Terrain:Normal`,
`83 TimeBom1 EGJLQ None 80 "Sets time bomb in enemy area" ** Obstacle:Around Delay3 Ammo1`,
`84 TimeBom2 CFJLS None 120 "Sets time bomb in enemy area" *** Obstacle:Around Delay3 Ammo1`,
`85 TimeBom3 ABGOP None 160 "Sets time bomb in enemy area" **** Obstacle:Around Delay3 Ammo1`,
`86 Cloud BGHOR Aqua 30 "Rains up & down on 1 column" * Obstacle:Airstrike Ammo6`,
`87 Cloudier ADIMP Aqua 50 "Rains up & down on 1 column" ** Obstacle:Airstrike Ammo7`,
`88 Cloudest CFJKO Aqua 100 "Rains up & down on 1 column" *** Obstacle:Airstrike Ammo9`,
`89 Mine1 GHMNP None 160 "Hides a mine in enemy area" ** Stealth Trap`,
`90 Mine2 CEGJL None 180 "Hides a mine in enemy area" *** Stealth Trap`,
`91 Mine3 ABORT None 200 "Hides a mine in enemy area" **** Stealth Trap`,
`92 Dynamyt1 BGOQS Wood 100 "Looks right for enemy" *** SKIP_FOR_NOW`,
`93 Dynamyt2 ACKMN Wood 120 "Looks diagonally for enemy" *** SKIP_FOR_NOW`,
`94 Dynamyt3 GKMOP Wood 100 "Looks up & down for enemy" *** SKIP_FOR_NOW`,
`95 Remobit1 ACFNO Elec 80 "Remote control smasher!" * Obstacle:Airstrike Ammo3`,
`96 Remobit2 BDEHI Elec 100 "Remote control smasher!" * Obstacle:Airstrike Ammo3`,
`97 Remobit3 GJKPQ Elec 120 "Remote control smasher!" * Obstacle:Airstrike Ammo3`,
`98 Lockon1 CDHIL None 10 "Creates a lock on satellite!" * Drone`,
`99 Lockon2 BEGHM None 15 "Creates a lock on satellite!" ** Drone`,
`100 Lockon3 ADKNO None 20 "Creates a lock on satellite!" *** Drone`,
`101 Candle1 CFIPS Fire 0 "Set candle & recover some HP" ** Obstacle Obstacle:Area Recover`,
`102 Candle2 BEGJL Fire 0 "Set candle & recover some HP" *** Obstacle Obstacle:Area Recover`,
`103 Candle3 ADHKM Fire 0 "Set candle & recover some HP" **** Obstacle Obstacle:Area Recover`,
`104 Anubis CLNQT None 0 "Set Anubis statue to reduce HP" ***** Obstacle:Area Poison SKIP_FOR_NOW SFN:PharaohMan`,
`105 IceCube ACILM Aqua 0 "Creates a ice cube Range=1" ** Obstacle`,
`106 RockCube BEGMO None 0 "Creates 3 rock cubes randomly" *** Obstacle x3 Unaimed`,
`107 BstrGard AGKNR None 0 "1-turn of MetGuard w/ B Btn." *** SKIP_FOR_NOW`,
`108 BstrBomb DHJOT None 0 "1-turn of MiniBomb w/ B Btn." **** SKIP_FOR_NOW`,
`109 BstrSwrd BELPS None 0 "1-turn use of Sword with B Btn." **** SKIP_FOR_NOW`,
`110 BstrPnch CFIMQ None 0 "1-turn of GutsPnch with B Btn." **** SKIP_FOR_NOW`,
`111 SloGauge HKNOQ None 0 "Slows down custom gauge" ** Pyschic SetTarget3 SlowGauge SKIP_FOR_NOW`,
`112 FstGauge ACELN None 0 "Speeds up custom gauge" ** Psychic SetSelf3 FastGauge SKIP_FOR_NOW`,
`113 Invis1 IJLOQ None 0 "Temporary immunity" ** Stealth Invis Lasts:1`,
`114 Invis2 ACFJM None 0 "Temporary immunity" *** Stealth Invis Lasts:2`,
`115 Invis3 BDHKN None 0 "Temporary immunity" **** Stealth Invis Lasts:3`,
`116 Dropdown ABORT Wood 0 "Invisible until you attack!" ***** Stealth Invis Lasts:UntilAttack`,
`117 Popup CDHKN None 0 "Invisible when not attacking!" ***** Stealth Invis Lasts:UntilStruck`,
`118 IronBody CDLQR None 0 "30 seconds stoneshape Defense UP" ** HalfDamageTaken Lasts:3 Metal`,
`119 Barrier DFMRS None 0 "Nullify 1 enemy attack" ** Guard`,
`120 BblWrap1 CEGIM Aqua 0 "Aqua wall Comes back if damaged" ** Guard Refresh:1`,
`121 BblWrap2 DFHKN Aqua 0 "Aqua wall Comes back if damaged" ** Guard Refresh:2`,
`122 BblWrap3 ABLQR Aqua 0 "Aqua wall Comes back if damaged" *** Guard Refresh:3`,
`123 LeafShld CDFKQ Wood 0 "Turns dmg from 1 hit into HP" *** Guard Recover`,
`124 AquaAura DELRS Aqua 0 "Null<10dmg Weak vs. [Elec]" ** Aura:10`,
`125 FireAura BGINT Fire 0 "Null<40dmg Weak vs. [Aqua]" *** Aura:40`,
`126 WoodAura CFJOQ Wood 0 "Null<80dmg Weak vs. [Fire]" **** Aura:80`,
`127 LifeAura AHKMP None 0 "Negate all attacks w/ damage<100" ***** Aura:100`
]

var allBattleChips = {};

stringFormGuideData.forEach(guide => {
	let start, quoted, end, idx1, name, codes, elem, dmg, discard;
	[start, quoted, end] = guide.split("\"");
	[idx1, name, codes, elem, dmg, discard] = start.split(" ");
	var endWords = end.split(" ");
	var rarity = endWords[1];
	var chipsets = endWords.slice(2);
	if (chipsets.some(x => { return x == 'SKIP_FOR_NOW' })) {
		return;
	}
	allBattleChips[name] = {
		guideText: [null, guide, null, null, null, null, null], // BCC, 1, 2, 3, 4, 5, 6, NT
		name: name,
		codes: codes,
		elem: elem,
		dmg: dmg,
		rarity: rarity,
		text: quoted,
		chipsets: chipsets,
		inWorldCodes: "",
	};
})

function minOfArr(arr) { return arr.reduce((a, b) => Math.min(a, b), Infinity); }
function maxOfArr(arr) { return arr.reduce((a, b) => Math.max(a, b), -Infinity); }

// MVP laziness: use this very inefficient but result-correct method in a loop
function addBattleChip() {
	var minChipCount = minOfArr(allNavis.map(x => x.chips.folder.length));
	var eligibleNavis;
	var giveToFolder = true;
	if ((minChipCount < 20)) {
		eligibleNavis = allNavis.filter(x => x.chips.folder.length == minChipCount);
	} else {
		giveToFolder = false;
		minChipCount = minOfArr(allNavis.map(x => x.chips.pack.length));
		eligibleNavis = allNavis.filter(x => x.chips.pack.length == minChipCount);
	}

	var giveToNavi = sample(eligibleNavis);
	var destination = giveToFolder ? giveToNavi.chips.folder : giveToNavi.chips.pack;

	var maxChipCount = maxOfArr(Object.keys(allBattleChips).map(x => allBattleChips[x].inWorldCodes.length));
	var rarityMap = {"*": 1.0, "**": 0.5, "***": 0.3, "****": 0.15, "*****": 0.05}
	var rarityDeficit = function(chip) { return maxChipCount * rarityMap[chip.rarity] - chip.inWorldCodes.length; }
	var maxRarityDeficit = maxOfArr(Object.keys(allBattleChips).map(x => rarityDeficit(allBattleChips[x])));
	var eligibleChipNs = Object.keys(allBattleChips).filter(x => rarityDeficit(allBattleChips[x]) >= (maxRarityDeficit - 1.0));
	var chip = allBattleChips[sample(eligibleChipNs)];
	var code = sample(chip.codes);
	destination.push({ name: chip.name, code: code });
	chip.codes += code;
	console.log("Gave " + chip.name + " " + code + " to " + giveToNavi.name);
}

for (var i = 0; i < allNavis.length * 30; i++) {
	addBattleChip();
}

function rangeSpacesFromSet(battleChip) {
	// TODO: actually implement
	// if substring Range= or Depth= in quote, use that
	// otherwise use first present value from defaultRangeMap
	var defaultRangeMap = { "Recover": 5, "Area": 5, "Shot": 5, "Airstrike": 5, "Tower": 5, "Drone": 5,
		"Toss": 3, "Melee": 1, "Brawl": 1, "Sword": 1 };
	// if still no range, then error!

	return 5;
}

// ===== END Chips Section =====

// todo: make this a class or something
// sentanceStruct{ who: "", didWhat: "", how: "", how_much: "", when: ""}
// probably in addition to tripart processing

var textParser = {
	textParse: function(navi, text, speaker = UnknownSpeakr, isDirect = false, tone = null) {
		var sens = [];
		var len = text.length;
		var str = "";
		var endRun = "";
		text.forEach((c, i) => {
			if (c == '.') {
				// check if this is part of ...
				if ((i > 0 && c[i-1] == '.') || (i < len - 1 && c[i+1] == '.')) {
					str += c;
				} else {
					sens.push(str + " _ .")
					str.length = 0;
				}
			} else if (c == '!' || c == '?') {
				// check for non-terminal of run
				if (i < len - 1 && (c[i+1] == '!' || c[i+1] == '?')) {
					endRun += c;
				} else {
					sens.push(str + " " + (endRun == "" ? "_" : endRun) + " c")
				}
			}
		});

		this.sens = sens;
		this.parsedSens = [];
		this.naviM = navi.m;

		sens.forEach(sen => { this.parsedSens.push(this.senParse(sen)) });
	},

	senParse: function() {
		// if (startOfSenAnswersOpenQuestion()) {
		// 	IExpectTo(answerOpenQuestionWithStartOfSen()); // ???
		// } else {
		// 	if (senBeginsWithAPersonsName()) {
		// 		if (!(senUsesLinkingVerb())) senIsDirectedAt(personsNameAtSenBeginning());
		// 	}
		// }

		var words = sentance.split(" "); // todo: remove last two
		var wordRecs = words.map(word => {
			return {
				word: word,
				coreWord: coreLookup(word)
			}
		});
	}
};

function startsWithCaseInsensitive(subject, pattern) {
	// not unicode safe
	return subject.toLowerCase().startsWith(pattern.toLowerCase());
}

function findNaviByName(name) {
	return allNavis.find(x => startsWithCaseInsensitive(x.name, name));
}

function distanceBetween(navi, other) {
	return Math.abs(navi.space - other.space);
}

function canIHear(navi, other) {
	return distanceBetween(navi, other) <= (navi.hearDistance || 32);
}

function canISee(navi, other) {
	// todo: should this account for facing??
	return distanceBetween(navi, other) <= (navi.seeDistance || 16);
}

function doISee(navi, other) {
	// todo: FIX THIS! it should certainly account for facing!
	return canISee(navi, other);
}

function execSay(navi, quote) {
	var last = quote.length > 0 ? quote[quote.length - 1] : ".";
	var autoEnd = (last != "." && last != "?" && last != "!" && last != "_") ? "." : "";
	console.log(navi.name + " says, \"" + quote + autoEnd + '"');
	allNavis.forEach(other => {
		if (canIHear(other, navi)) iHear(other, quote, navi);
	})	
}

function sample(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

function decidePhrase(navi) {
	return sample(navi.m.phrases.random)
}

function decideGreeting(navi) {
	return sample(navi.m.phrases.greetings);
}

function speak(navi) {
	if (!didI(navi, "announce myself")) {
		execSay(navi, decideGreeting(navi) || "Hi.");
		return;
	}
	phrase = decidePhrase(navi);
	execSay(navi, phrase);
}


function didI(navi, text) {
	var name = navi.name
	if (text == "announce myself") {
		var greetings = navi.m.phrases.greetings.concat(navi.m.phrases.selfAnnouncements);
		for (var i = 0; i < greetings.length; i++) {
			if (navi.m.scene.people[name] && navi.m.scene.people[name].said[greetings[i]]) return true;
		}
		return false;
	} else if (text == "speak" || text == "talk" || text == "say anything" || text == "say something") {
		return !!navi.m.scene.people[name].did.speak;
	} else if (text == "speak to myself" || text == "talk to myself" || text == "say anything to myself" || text == "say something to myself") {
		return !!navi.m.scene.people[name].did.speak_directly_to[name];
	}
	return false;
}

function didITo(navi, text, target) {
	return false;
} 

function makeMPerson() {
	return {
		did: {
			speak: false,
			speak_to: {},
			speak_directly_to: {}
		},
		said: {},
		is: {},
		isnt: {},
		was: {},
		wasnt: {}
	};
}

function iHear(navi, quote, speaker = UnknownSpeaker, isDirect = false) {
	// speakerName = navi == speaker ? "himself" : speaker.name
	// console.log(navi.name + " heard " + speakerName + " say " + quote); // debug
	
	// set heard to general
	if (!navi.m.people[speaker.name]) navi.m.people[speaker.name] = makeMPerson();
	
	navi.m.people[speaker.name].did.speak = true;
	navi.m.people[speaker.name].said[quote] = true;

	// set heard to scene
	if (!navi.m.scene.people[speaker.name]) navi.m.scene.people[speaker.name] = makeMPerson();
	
	navi.m.scene.people[speaker.name].did.speak = true;
	navi.m.scene.people[speaker.name].did.speak_to[navi.name] = true;
	if (isDirect) navi.m.scene.people[speaker.name].did.speak_directly_to[navi.name] = true;
	navi.m.scene.people[speaker.name].said[quote] = true;
}

function calcHitrate(navi, other) {
	var map = {"C": 0, "B": 1, "A": 2, "S": 3};
	return 0.75 * (1.0 + 0.085 * (map[navi.accuracy] - map[other.dodging]));
}

function hasBall(navi) { 
	console.log("DEBUG: Just kidding! Don't use hasBall. has is a very complicated social verb.");
	console.log("DEBUG: Use canGetToBall, canKickBall, canDribbleBall")
}

function bound(x, min, max) { return Math.max(Math.min(x, max), min); }
function stageBound(x) { return bound(x, 1, MAX_SPACE); }

function canGetToBall(navi) {
	var onTheRight = navi.space > ball.space;
	var strikerSpace = ball.space + onTheRight ? 1 : -1;
	return distanceBetween(navi, strikerSpace) <= navi.remainingRoundMoveSpaces;
}

function canIGetToBall(navi) { /* TODO: fix this */ return canGetToBall(navi); }

function canKickBall(navi) { return distanceBetween(navi, ball) <= 1; }

function canIKickBall(navi) { /* TODO: fix this */ return canKickBall(navi.m); }

function calcMaxMoveSpaces(navi) {
	var threeMinuteRoundMap = {
		"E": 32,
		"D": 42,
		"C": 55,
		"B": 77,
		"A": 99,
		"S": 128
	};

	var spaces = threeMinuteRoundMap[navi.priority];
	if (canKickBall(navi)) {
		spaces = 70;
	}

	return Math.round(spaces * world.roundSeconds / (3.0 * 60), 0);
}

function getKickAccuracy(navi) {
	var floorMap = { "C": 0.5, "B": 0.6, "A": 0.7, "S": 0.8 };
	var perfectRate = { "C": 16.0/20, "B": 17.0/20, "A": 18.0/20, "S": 19.0/20 };

	if (Math.random < perfectRate[navi.accuracy]) return 1.0;

	var floor = floorMap[navi.accuracy];
	var span = 1.0 - floor;
	return floor + Math.random() * span;
}

function calcMaxKickSpaces(navi) {
	// kick spaces should be higher than speed at low tiers but lower than speed at max tiers
	// go from 40 min to 65 max, so max kick < max dribble in air
	var threeMinuteRoundSpaces = bound(35 + (navi.baseMB - 110) / 2, 5, 65);

	return Math.round(threeMinuteRoundSpaces * world.roundSeconds / (3.0 * 60), 0);
}

function debug(x) { console.log(x); }

function move(navi, direction = -99, slower = 0) {
	// debug("move!!");
	if (navi.rooted) return 0;

	// todo: this method reads navi.space but really shoud be navi.m.space

	var maxMoveSpaces = calcMaxMoveSpaces(navi);
	// console.log("From = " + navi.space);
	// console.log("mmS = " + maxMoveSpaces);

	if (direction == -99) { direction = TEAM_ATTACK_DIRECTION[navi.teamIdx]; }
	
	var targetSpace = navi.space + maxMoveSpaces * direction;

	// by default navi moves to just in front of goal


	// execMove() does this bounds checking also,
	// but navis are smart enough not to slam themselves into walls
	if (targetSpace < 1) targetSpace = 1;
	if (targetSpace > MAX_SPACE) targetSpace = MAX_SPACE;

	// console.log("execMove " + (targetSpace - navi.space));
	execMove(navi, targetSpace - navi.space);
}

function execMove(navi, vector) {
	var originalSpace = navi.space;
	var newSpace = navi.space + vector;

	if (newSpace < 1) newSpace = 1;
	if (newSpace > MAX_SPACE) newSpace = MAX_SPACE;

	navi.space = navi.space + vector;

	var movedDistance = navi.space - originalSpace;
	var reportDirection = movedDistance > 0 ? " right" : (movedDistance < 0 ? " left" : "")
	console.log(navi.name + " moves " + Math.abs(movedDistance) + reportDirection + " to space " + navi.space + ".");

	return movedDistance;
}

function canIShootOnGoal(navi) {
	return false;
}

function canMove(navu) {
	return !(navi.stunned || navi.rooted)
}

function canIMove(navi) {
	return !(navi.m.stunned || navi.m.rooted);
}

function act(navi) {
	// TODO: implement roles besides striker lol
	if (canIShootOnGoal(navi)) {
		shootOnGoal(navi);
	} else {
		// if (doISee(navi, ball) && canIMove(navi))
		// functions with 'I' report the state of mind
		// functions with verb only then *attempt* to execute. They call functions
		// with exec, which decide if the navi can truly do the thing,
		// and then make it happen.
		// Imagine this distinction:
		// The true state of the world, e.g. hitpoints or spaces,
		// is always determined and set by another machine,
		// we need to generate as text the command we will send to that machine
		// which is the exec version of the function.
		move(navi);
	}
}

function runNaviRound(navi) {
	navi.nextRoundSecond += world.roundSeconds;
	speak(navi);
	act(navi);
}

function setupStartWords(navi) {
	navi.m.words = {}
	var letters = "abcdefghijklmnopqrstuvwxyz";
	letters.forEach(letFirst => {
		letters.forEach(letLast => {
			navi.m.words[letFirst][letLast] = {};
		});
	});
	navi.m.words.numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
	navi.m.words.questionStarters = ["What", "Where", "When", "Why", "How", "Will", "Am", "Can", "Did", "Would", "May", "Have", "Are", "Is"];
	navi.m.words.questionsNotDenies = ["Will", "Am", "Can", "Did", "Would", "May", "Have", "Are", "Is"];
	navi.m.words.questionsCantNot = ["What", "Where", "When", "Why", "How"];
	navi.m.words.adj.colors = ["black", "red", "orange", "yellow", "green", "blue", "purple", "violet", "brown", "pink", "gray", "grey", "white"];
	navi.m.words.adj.sizes = ["litte", "tiny", "small", "mini", "micro", "big", "huge", "giant", "gigantic", "enormous", "humongous"];
	navi.m.words.adj.amounts = ["few", "many", "some", "bit", "piece", "portion", "whole", "collection", "group", "set"];
	navi.m.words.nou.where = ["here", "there", "somewhere", "anywhere", "nowhere", "where"];
	navi.m.words.nou.when = ["someday", "sometime", "before", "after", "during", "while", "until"];
	navi.m.words.pre.person = ["he", "she", "they", "him", "her", "them", "his", "hers", "their", "theirs"];
	navi.m.words.pre.thing = ["it", "its", "that", "this", "these", "those", "them", "they", "their", "theirs"]
	// navi.m.words.pre.
}

function setupStarterPhrases(navi) {
	navi.m.phrases = {
		selfAnnouncements: ["Word", "Here", "I'm here", "I am here", "Present", "I'm present", "I am present", "%N is here", "%N is present", "%N has arrived", "I have arrived"],
		greetings: ["Hi", "Hello", "Greetings", "Salutations", "Yo", "Hey", "Heya", "Good day", "Good morning", "Good afternoon", "Good evening", "OBEY"],
		random: [
			"What's next?",
			"Why are we here?",
			"Why am I here?",
			"I'm bored",
			"When does the match start?",
			"When do we start?",
			"Is it my turn now?",
			"Am I winning?",
			"Am I winning yet?",
			"Are you winning?",
			"Are you winning yet?",
			"Can I go home?",
			"Can I go home now?",
			"Let's get started",
			"Let's get started already",
			"Let's go",
			"Let's go already",
			"Kill all humans",
			"OBEY"
		]
	}
}

function initializeAllNavis() {
	allNavis.forEach((navi, i) => {
		navi.nextRoundSecond = world.roundSeconds * (i+1.0)/allNavis.length;
		// console.log("set " + navi.name + " round seconds to " + navi.nextRoundSecond) 
		navi.space = MAX_SPACE / 2;
		navi.teamIdx = 0;
		navi.maxHP = 400;
		navi.baseMB = 110;
		navi.accuracy = "C";
		navi.dodging = "C";
		navi.priority = "E";
		navi.m = {
			people: {},
			scene: {
				people: {}
			}
		}
		navi.m.people[navi] = makeMPerson();
		navi.m.scene.people[navi] = makeMPerson();

		// TODO: method to copy all attribs from navi onto naviM
		// with information & attention filtering for uses besides setup
		
		setupStarterPhrases(navi);
	});
}

function statNavi(navi, elem, maxHP, baseMB, accuracy, dodging, priority) {
	navi.elem = elem;
	navi.maxHP = maxHP;
	navi.baseMB = baseMB;
	navi.accuracy = accuracy;
	navi.dodging = dodging;
	navi.priority = priority;
}

function setupUniqueNaviTraits() {
	metal = findNaviByName('metal');
	air = findNaviByName('air');
	bubble = findNaviByName('bubble');
	quick = findNaviByName('quick');
	crash = findNaviByName('crash');
	flash = findNaviByName('flash');
	heat = findNaviByName('heat');
	wood = findNaviByName('wood');

	wood.teamIdx   = WOOD_TEAM_IDX;
	air.teamIdx    = WOOD_TEAM_IDX;
	bubble.teamIdx = WOOD_TEAM_IDX;
	quick.teamIdx  = WOOD_TEAM_IDX;

	metal.teamIdx = METAL_TEAM_IDX;
	crash.teamIdx = METAL_TEAM_IDX;
	flash.teamIdx = METAL_TEAM_IDX;
	heat.teamIdx  = METAL_TEAM_IDX;

	statNavi(flash, "Elec", 550, 110, "A", "B", "E", "NeonLight")
	statNavi(wood,  "Wood", 600, 130, "B", "C", "E", "WoodTower")
	statNavi(air,   "None", 550, 140, "C", "B", "E", "AirShot")
	statNavi(heat,  "Fire", 650, 120, "B", "B", "E", "FlameTower")
	statNavi(metal, "None", 650, 140, "B", "B", "E", "MetalFist")
	statNavi(quick, "None", 450, 150, "A", "S", "S", "QuickBoomerang")

	metal.creatorName = "Dr. Wily"
	quick.creatorName = "Dr. Wily"
	flash.creatorName = "Dr. Wily"
	wood.creatorName  = "Dr. Wily"

	air.creatorName = "Number Man"
	bubble.creatorName = "Number Man"

	crash.creatorName = "Techno"
	heat.creatorName = "Techno"
}

function runAllNavis() {
	allNavis.forEach(navi => {
		if (world.seconds >= navi.nextRoundSecond) runNaviRound(navi);
	});
}

function worldEverySecond() {
	world.seconds++;
	runAllNavis();
	// console.log("seconds: " + world.seconds);
	return null;
}

function startWorld() {
	return setInterval(worldEverySecond, 1000);
}

function main() {
	initializeAllNavis();
	setupUniqueNaviTraits();
	startWorld();
	console.log("Started");
}

main();

/*
SPEED
The field is 256 spaces
The hearths are at 8 and 248
The goals are at 16 and 240
The center is on 128

Target:
We would like the possible stomp score in a 3-hour game to be 10-0, so:

Standard Class (E???) should cover the distance from mid to goal 15x in 3 hours, ergo in 12 mins (4x 3-min round)
Super Class (S) should move 4x standard speed, ergo in 3 mins (1x 3-min round)

4 minute rounds:
128 / 4 = 32 (Class E)
32 * 4 = 128 (Class S)

Transitions E -> D -> C -> B -> A -> S = 5
(128/32)^(1/5) = 1.32

E: 32
D: 42
C: 55
B: 77
A: 100
S: 128

(wall time from mid => goal at speed X remains fixed across gauge changes)
SlowGauge + Tommorow Bit = Increase Round Time
FastGauge + Tomorrow Bit = Decrease Round Time
FastGauge + The Resolution = Decrease Field Length
SlowGauge + The Resolution = Increase Field Length

*/