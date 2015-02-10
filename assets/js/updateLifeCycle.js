BuildWidget.prototype.updateLifeCycle = function() {
	var self = this;

	this.selectedCountryLabel.text(this.params.selectedCountry);

	this.lifeCycleSvg.attr("width", this.params.lifeCycleWidth + this.params.lifeCycleMargin.left + this.params.lifeCycleMargin.right)
					.attr("height", this.params.lifeCycleHeight + this.params.lifeCycleMargin.top + this.params.lifeCycleMargin.bottom);

	this.lifeCycleWhiteBox.attr("width", this.params.lifeCycleWidth)
							.attr("height", this.params.lifeCycleHeight);

	this.yAxisLifeCycle.tickSize(-this.params.lifeCycleWidth, 0);

	this.xScaleLifeCycle.range([0, this.params.lifeCycleWidth]);

	this.lifeCycleSvgG.select(".x").call(this.xAxisLifeCycle);

	this.line.x(function(d) { return self.xScaleLifeCycle(d.date); })
		.y(function(d) { return self.yScaleLifeCycle(d.cases); });
	
	if ( this.features[this.params.selectedFeature].caseData ) {
		if ( this.params.scaleYAxis ) {
			this.yScaleLifeCycle.domain([0, (d3.max(self.params.selectedData, function(d) { return d.cases; }) * 1.1) ]);
		} else {
			this.yScaleLifeCycle.domain([0, 1235000]);
		}
		
		this.lifeCycleSvgG.select(".y")
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
 