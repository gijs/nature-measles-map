BuildWidget.prototype.updateVaccinationChart = function() {
	var self = this;

	this.vaccinationSvg.attr("width", this.params.lifeCycleWidth + this.params.lifeCycleMargin.left + this.params.lifeCycleMargin.right)
					.attr("height", this.params.lifeCycleHeight + this.params.lifeCycleMargin.top + this.params.lifeCycleMargin.bottom);

	this.vaccineWhiteBox.attr("width", this.params.lifeCycleWidth)
							.attr("height", this.params.lifeCycleHeight);

	this.yAxisVaccination.tickSize(-this.params.lifeCycleWidth, 0);

	this.xScaleVaccination.range([0, this.params.lifeCycleWidth]);

	this.vaccinationSvgG.select(".x").call(this.xAxisVaccination);

	this.vaccinationLine.x(function(d) { return self.xScaleVaccination(d.date); })
		.y(function(d) { return self.yScaleVaccination(d.rate); });

	if ( this.features[this.params.selectedFeature].vaccineData ) {

		this.vaccinationSvgG.select(".y")
			.transition()
			.duration(this.params.duration)
			.call(this.yAxisVaccination);
			
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