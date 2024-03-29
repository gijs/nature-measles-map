BuildWidget.prototype.buildTooltip = function (selection) {
	var self = this;

	this.lifeCycleCircles.selectAll("circle")
		.on("mouseover", function (d) {
			var myCircle = d3.select(this);

			d3.select("#life-cycle-cases").text(d.date + ": " + self.params.format(d.cases) + " cases");

			var tooltipWidth = parseInt(d3.select("#widget-tooltip").style("padding-left"),10) + parseInt(d3.select("#widget-tooltip").style("width"),10) + parseInt(d3.select("#widget-tooltip").style("padding-right"),10);

			var top = (parseFloat(myCircle.attr("cy")) + self.params.lifeCycleMargin.top);
			var left = (parseFloat(myCircle.attr("cx")) + self.params.lifeCycleMargin.left);

			if ( parseFloat(myCircle.attr("cx")) > (self.params.lifeCycleWidth / 2) ) {
				left -= tooltipWidth;
			}

			d3.select("#widget-tooltip")
				.style("top",  top + "px")
				.style("left", left + "px")
				.classed("hidden", false);

		}).on("mouseout", function () {
			self.hideTooltip();
		});

	this.vaccinationCircles.selectAll("circle")
		.on("mouseover", function (d) {
			var myCircle = d3.select(this);

			d3.select("#vaccination-cases").text(d.date + ": " + self.params.format(d.rate) + " %");

			var tooltipWidth = parseInt(d3.select("#vaccination-tooltip").style("padding-left"),10) + parseInt(d3.select("#vaccination-tooltip").style("width"),10) + parseInt(d3.select("#vaccination-tooltip").style("padding-right"),10);

			var top = (parseFloat(myCircle.attr("cy")) + self.params.lifeCycleMargin.top);
			var left = (parseFloat(myCircle.attr("cx")) + self.params.lifeCycleMargin.left);

			if ( parseFloat(myCircle.attr("cx")) > (self.params.lifeCycleWidth / 2) ) {
				left -= tooltipWidth;
			}

			d3.select("#vaccination-tooltip")
				.style("top",  top + "px")
				.style("left", left + "px")
				.classed("hidden", false);

		}).on("mouseout", function () {
			self.hideVaccineTooltip();
		});
};

BuildWidget.prototype.hideTooltip = function () {
	d3.select("#widget-tooltip").classed("hidden", true);
};

BuildWidget.prototype.hideVaccineTooltip = function () {
	d3.select("#vaccination-tooltip").classed("hidden", true);
};
