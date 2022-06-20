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

var battleChips = {};

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
	battleChips[name] = {
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

	var maxChipCount = maxOfArr(battleChips.map(x => x.inWorldCodes.length));
	var rarityMap = {"*": 1.0, "**": 0.5, "***": 0.3, "****": 0.15, "*****", 0.05}
	var rarityDeficit = function(chip) { return maxChipCount * rarityMap[chip.rarity] - chip.inWorldCodes; }
	var maxRarityDeficit = maxOfArr(battleChips.map(x => rarityDeficit(x));
	var eligibleChips = battleChips.filter(x => rarityDeficit(x) === maxRarityDeficit);
	var chip = sample(eligibleChips);
	var code = sample(chip.codes);
	destination.push({ name: chip.name, code: code });
	console.log("Gave " + chip.name + " " + chip.code + " to " + giveToNavi.name);
}

// how many battle chips are needed for now: 20 per navi
// target_count = 20
// start with creating one of everything
// thereafter, always create new chips from among the chips tied for most behind their rarity target
// * = max (initially 1, increases by 1 whenever no chip is behind its rarity target)
// ** = 50% max
// *** = 30% max
// **** = 15% max
// ***** = 5% max


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