

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
	{ name: 'MetalMan.EXE' },
	{ name: 'AirMan.EXE' },
	{ name: 'BubbleMan.EXE' },
	{ name: 'QuickMan.EXE' },
	{ name: 'CrashMan.EXE' },
	{ name: 'FlashMan.EXE' },
	{ name: 'HeatMan.EXE' },
	{ name: 'WoodMan.EXE' }
];

var ball = { space: MAX_SPACE / 2, navi: null };

// todo: make this a class or something
// sentanceStruct{ who: "", didWhat: "", how: "", how_much: "", when: ""}

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

	return Math.round(spaces * world.roundSeconds / (3 * 60), 0);
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
	var threeMinuteRoundSpaces = Math.max(Math.min(65, 35 + (navi.baseMB - 110) / 2), 5);
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

function setupUniqueNaviTraits() {
	metal = findNaviByName('metal');
	air = findNaviByName('air');
	bubble = findNaviByName('bubble');
	quick = findNaviByName('quick');
	crash = findNaviByName('crash');
	flash = findNaviByName('flash');
	heat = findNaviByName('heat');
	wood = findNaviByName('wood');

	wood.teamIdx = WOOD_TEAM_IDX;
	air.teamIdx = WOOD_TEAM_IDX;
	bubble.teamIdx = WOOD_TEAM_IDX;
	quick.teamIdx = WOOD_TEAM_IDX;

	quick.priority = "S";
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
}

main();