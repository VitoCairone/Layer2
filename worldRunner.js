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

function speak(navi) {
	execSay(navi, "Hi.")
}

function iHear(navi, quote, speaker, isDirect) {
	// speakerName = navi == speaker ? "himself" : speaker.name
	// console.log(navi.name + " heard " + speakerName + " say " + quote); // debug
	
	// set heard to general
	if (!navi.m.people[speaker]) {
		navi.m.people[speaker] = {
			did: {
				speak_to: {},
				speak_directly_to: {}
			},
			said: {}
		};
	}
	
	navi.m.people[speaker].did.speak = true;
	navi.m.people[speaker].said[quote] = true;

	// set heard to scene
	if (!navi.m.scene.people[speaker]) {
		navi.m.scene.people[speaker] = {
			did: {
				speak_to: {},
				speak_directly_to: {}
			},
			said: {}
		};
	}
	navi.m.scene.people[speaker].did.speak = true;
	navi.m.scene.people[speaker].did.speak_to[navi] = true;
	if (isDirect) navi.m.scene.people[speaker].did.speak_directly_to[navi] = true; 
	navi.m.scene.people[speaker].said[quote] = true;
}

function runNaviRound(navi) {
	navi.nextRoundSecond += world.roundSeconds;
	speak(navi);
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