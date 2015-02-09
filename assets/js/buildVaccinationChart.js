BuildWidget.prototype.buildVaccinationChart = function() {
	var self = this;

	this.vaccinationSvg = d3.select(this.params.vaccinationChartTarget).append("svg")
		.attr("width", this.params.lifeCycleWidth + this.params.lifeCycleMargin.left + this.params.lifeCycleMargin.right)
		.attr("height", this.params.lifeCycleHeight + this.params.lifeCycleMargin.top + this.params.lifeCycleMargin.bottom)
	  .append("g")
		.attr("transform", "translate(" + this.params.lifeCycleMargin.left + "," + this.params.lifeCycleMargin.top + ")");

	this.vaccinationSvg.append("g")
		.attr("class","white-box")
	  .append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", this.params.lifeCycleWidth)
		.attr("height", this.params.lifeCycleHeight)
		.attr("fill","#FFF");

	this.xScaleVaccination = d3.scale.linear()
		.range([0, this.params.lifeCycleWidth])
		.domain([1980, 2013]);

	this.yScaleVaccination = d3.scale.linear()
		.range([this.params.lifeCycleHeight, 0])
		.domain([0, 100]);

	this.xAxisVaccination = d3.svg.axis()
		.scale(this.xScaleVaccination)
		.tickFormat(function(d) { return d; })
		.ticks(this.params.ticks)
		.orient("bottom");

	this.yAxisVaccination = d3.svg.axis()
		.scale(this.yScaleVaccination)
		.ticks(5)
		.tickSize(-this.params.lifeCycleWidth, 0)
		.orient("left");

	this.vaccinationLine = d3.svg.line()
		.x(function(d) { return self.xScaleVaccination(d.date); })
		.y(function(d) { return self.yScaleVaccination(d.rate); });

	this.vaccinationSvg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + this.params.lifeCycleHeight + ")")
	    .call(this.xAxisVaccination);

	this.vaccinationSvg.append("g")
	    .attr("class", "y axis")
	    .call(this.yAxisVaccination)
	  .append("text")
	    .attr("transform", "translate(" + -(this.params.lifeCycleMargin.left * 0.5) + "," + (this.params.lifeCycleHeight/2) + "), rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".5em")
	    .style("text-anchor", "middle")
	    .text(this.params.key.keyHeadVaccination);

	this.vaccinationPath = this.vaccinationSvg.append("path")
		.data([this.params.selectedVaccinationData, function (d) {
			return d.date;
		}])
		.attr("class","line")
		.attr("fill", "none")
		.attr("stroke", this.params.uiColour.vaccinationLineColour)
		.attr("stroke-width", self.params.lifeCycleRadius)
		.attr("d", this.vaccinationLine);

	this.vaccinationCircles = this.vaccinationSvg.append("g");

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

};
