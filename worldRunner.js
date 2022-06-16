var world = { seconds: 0, roundSeconds: 60 };

var METAL_TEAM_IDX = 0;
var WOOD_TEAM_IDX = 1;

var TEAM_ATTACK_DIRECTION = [-1, 1];

var MAX_SPACE = 256;

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
]

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
	console.log(navi.name + " says, \"" + quote + '"');
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

function calcMaxMoveSpaces(navi) {
	// TODO: fix movement so that:
	//		all but the very slowest navis can cross the whole field in a reasonable amount of time (target 20 minutes)
	// 		all but the very slowest navis can easily get into combat range of each other and somewhat faster navis
	return 1 + ((navi.vel || -2) + 5);
}

function move(navi, towards = -99, slower = 0) {
	if (navi.rooted) return 0;

	// todo: this method reads navi.space but really shoud be navi.m.space

	var maxMoveSpaces = calcMaxMoveSpaces(navi);

	var direction = towards;
	if (direction == -99) { direction = TEAM_ATTACK_DIRECTION[navi.team_idx]; }
	
	var targetSpace = navi.space + maxMoveSpaces * direction;

	// execMove() does this bounds checking also,
	// but navis are smart enough not to slam themselves into walls
	if (targetSpace < 1) targetSpace = 1;
	if (targetSpace > MAX_SPACE) targetSpace = MAX_SPACE;

	execMove(navi, targetSpace - navi.space);
}

function execMove(navi, vector) {
	var originalSpace = navi.space;
	var newSpace = navi.space + vector;

	if (newSpace < 1) newSpace = 1;
	if (newSpace > MAX_SPACE) newSpace = MAX_SPACE;

	navi.space = navi.space + vector;

	return navi.space - originalSpace;
}



var ball = {
	place: MAX_SPACE / 2
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
	} else if (doISee(navi, ball) && canIMove(navi)) {
		// functions with 'I' report the state of mind
		// functions with verb only then *attempt* to execute. They call functions
		// with exec, which decide if the navi can truly do the thing,
		// and then make it happen.
		// Imagine this distinction:
		// The true state of the world, e.g. hitpoints or places,
		// is always determined and set by another machine,
		// we need to generate as text the command we will send to that machine
		// which is the exec version of the function.
		move(navi, ball);
	} else {
		;
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
}

function setupStarterPhrases(navi) {
	navi.m.phrases = {
		selfAnnouncements: ["Word", "Here", "I'm here", "I am here", "Present", "I'm present", "I am present", "%N is here", "%N is present", "%N has arrived", "I have arrived"],
		greetings: ["Hi", "Hello", "Greetings", "Salutations", "Yo", "Hey", "Heya", "Good day", "Good morning", "Good afternoon", "Good evening", "OBEY"],
		random: [
			"What's next",
			"Why are we here",
			"Why am I here",
			"I'm bored",
			"When does the match start",
			"When do we start",
			"Is it my turn now",
			"Am I winning",
			"Am I winning yet",
			"Are you winning",
			"Are you winning yet",
			"Can I go home",
			"Can I go home now",
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
		navi.maxhp = 900;
		navi.hp = 900;
		navi.space = MAX_SPACE / 2;
		navi.team_idx = 0;
		navi.vel = 0;
		navi.pow = 0;
		navi.end = 0;
		navi.agi = 0;
		navi.dex = 0;
		navi.m = {
			people: {},
			scene: {
				people: {}
			}
		}
		navi.m.people[navi] = makeMPerson();
		navi.m.scene.people[navi] = makeMPerson();

		setupStarterPhrases(navi);
	});
}

initializeAllNavis();

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

startWorld();