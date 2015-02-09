BuildWidget.prototype.updateLifeCycle = function() {
	var self = this;

	this.selectedCountryLabel.text(this.params.selectedCountry);

	if ( this.features[this.params.selectedFeature].caseData ) {
		if ( this.params.scaleYAxis ) {
			this.yScaleLifeCycle.domain([0, (d3.max(self.params.selectedData, function(d) { return d.cases; }) * 1.1) ]);
		} else {
			this.yScaleLifeCycle.domain([0, 1235000]);
		}

		this.lifeCycleSvg.select(".y")
			.transition()
			.duration(this.params.duration)
			.call(this.yAxisLifeCycle);
			
		this.lifeCycleLine
			.data([this.params.selectedData, function (d) {
				return d.date;
			}])
			.attr("d", this.line);

		this.lifeCycleCircles.selectAll("circle")
			.data(this.params.selectedData, function (d) {
				return d.date;
			})
			.attr("cx", function(d) {
				return self.xScaleLifeCycle(d.date);
			})
			.attr("cy", function(d) {
				return self.yScaleLifeCycle(d.cases);
			});

		this.lifeCycleCircles.selectAll("circle")
			.data(this.params.selectedData, function (d) {
				return d.date;
			})
			.exit()
			.remove();

		this.lifeCycleCircles.selectAll("circle")
			.data(this.params.selectedData, function (d) {
				return d.date;
			})
			.enter().append("circle")
			.attr("cx", function(d) {
				return self.xScaleLifeCycle(d.date);
			})
			.attr("cy", function(d) {
				return self.yScaleLifeCycle(d.cases);
			})
			.attr("r", self.params.lifeCycleRadius)
			.attr("fill", this.params.uiColour.veryLightGrey)
			.attr("stroke-width",'2px')
			.attr("stroke",this.params.uiColour.lineColour);

		this.buildTooltip();
	}
};
 