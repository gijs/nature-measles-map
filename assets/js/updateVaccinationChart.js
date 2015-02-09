BuildWidget.prototype.updateVaccinationChart = function() {
	var self = this;

	if ( this.features[this.params.selectedFeature].vaccineData ) {
			
		this.vaccinationPath
			.data([this.params.selectedVaccinationData, function (d) {
				return d.date;
			}])
			.attr("d", this.vaccinationLine);

		this.vaccinationCircles.selectAll("circle")
			.data(this.params.selectedVaccinationData, function (d) {
				return d.date;
			})
			.attr("cx", function(d) {
				return self.xScaleVaccination(d.date);
			})
			.attr("cy", function(d) {
				return self.yScaleVaccination(d.rate);
			});

		this.vaccinationCircles.selectAll("circle")
			.data(this.params.selectedVaccinationData, function (d) {
				return d.date;
			})
			.exit()
			.remove();

		this.vaccinationCircles.selectAll("circle")
			.data(this.params.selectedVaccinationData, function (d) {
				return d.date;
			})
			.enter().append("circle")
			.attr("cx", function(d) {
				return self.xScaleVaccination(d.date);
			})
			.attr("cy", function(d) {
				return self.yScaleVaccination(d.rate);
			})
			.attr("r", self.params.lifeCycleRadius)
			.attr("fill", this.params.uiColour.veryLightGrey)
			.attr("stroke-width",'2px')
			.attr("stroke",this.params.uiColour.vaccinationLineColour);

		this.buildTooltip();
	} else {
		this.vaccinationPath.attr("d", "M0,0 L0,0");

		this.vaccinationCircles.selectAll("circle").remove();
	}
};