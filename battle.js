function calcHitrate(navi, other) {
	var map = {"C": 0, "B": 1, "A": 2, "S": 3};
	return 0.75*(1.0+0.085*(map[navi.accuracy] - map[other.dodging]));
}