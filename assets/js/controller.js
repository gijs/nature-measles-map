BuildWidget.prototype.yearChosen = function (topic, func, parent) {
	this.parent.updateMap();
};

BuildWidget.prototype.countryChosen = function(topic, func, parent) {
	this.parent.buildData();
};

BuildWidget.prototype.dataReady = function(topic, func, parent) {
	if ( this.parent.lifeCycleSvg ) {
		this.parent.updateLifeCycle();
	} else {
		this.parent.buildLifeCycle();
	}

	if ( this.parent.vaccinationSvg ) {
		this.parent.updateVaccinationChart();
	} else {
		this.parent.buildVaccinationChart();
	}
};

BuildWidget.prototype.keyChosen = function(topic, func, parent) {
	this.parent.buildKey();
	this.parent.updateMap();
};