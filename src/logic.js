var addShow = function(showName, numSeasons, numEpisodes) {
	var show = {};
	show.showName = showName;
	show.seasons = numSeasons;
	show.episodes = numEpisodes;
	return show;
}

exports.addShow = addShow;