function calcHitrate(navi, other) {
	var map = {"C": 0, "B": 1, "A": 2, "S": 3};
	return 0.75*(1.0+0.085*(map[navi.accuracy] - map[other.dodging]));
}

func calcMoveSpeed(nav) {
	var threeMinuteRoundMap = {
		"E": 32,
		"D": 42,
		"B": 55,
		"C": 77,
		"A": 99,
		"S": 128
	};

	return threeMinuteRoundMap[navi.priority] * ROUND_SECONDS / (3 * 60);
}