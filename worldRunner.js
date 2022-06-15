var world = { seconds: 0, roundSeconds: 60 };

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
	return sample([
		"What's next",
		"Why are we here",
		"I'm bored",
		"When does the match start",
		"Is it my turn now",
		"Am I winning",
		"Are you winning yet",
		"Can I go home now",
		"Let's get started",
		"Let's go",
		"Let's go already",
		"Kill all humans",
		"OBEY"
	])
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

var UnknownSpeaker = { name: "Unknown" };

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

function runNaviRound(navi) {
	navi.nextRoundSecond += world.roundSeconds;
	speak(navi);
}

function setupStarterPhrases(navi) {
	navi.m.phrases = {
		selfAnnouncements: ["Word", "Here", "I'm here", "I am here", "Present", "I'm present", "I am present", "%N is here", "%N is present", "%N has arrived", "I have arrived"],
		greetings: ["Hi", "Hello", "Greetings", "Salutations", "Yo", "Hey", "Heya", "Good day", "Good morning", "Good afternoon", "Good evening", "OBEY"]
	}
}

function initializeAllNavis() {
	allNavis.forEach((navi, i) => {
		navi.nextRoundSecond = world.roundSeconds * (i+1.0)/allNavis.length;
		// console.log("set " + navi.name + " round seconds to " + navi.nextRoundSecond)
		navi.maxhp = 900;
		navi.hp = 900;
		navi.space = 128;
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