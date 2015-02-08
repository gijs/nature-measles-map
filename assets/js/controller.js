BuildWidget.prototype.yearChosen = function (topic, func, parent) {
	this.parent.updateMap();
};

BuildWidget.prototype.countryChosen = function(topic, func, parent) {
	this.parent.buildData();
};

BuildWidget.prototype.dataReady = function(topic, func, parent) {
	if ( this.parent.lifeCycleSvg ) {
		console.log("We got an svg");
		this.parent.updateLifeCycle();
	} else {
		console.log("We ain't got an svg");
		this.parent.buildLifeCycle();
	}

};