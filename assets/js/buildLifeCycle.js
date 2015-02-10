BuildWidget.prototype.buildLifeCycle = function() {
	var self = this;

	this.selectedCountryLabel = d3.select(this.params.selectedCountryTarget).text(this.params.selectedCountry);

	this.lifeCycleSvg = d3.select(this.params.lifeCycleChartTarget).append("svg")
		.attr("width", this.params.lifeCycleWidth + this.params.lifeCycleMargin.left + this.params.lifeCycleMargin.right)
		.attr("height", this.params.lifeCycleHeight + this.params.lifeCycleMargin.top + this.params.lifeCycleMargin.bottom);
	
	this.lifeCycleSvgG = this.lifeCycleSvg.append("g")
							.attr("transform", "translate(" + this.params.lifeCycleMargin.left + "," + this.params.lifeCycleMargin.top + ")");

	this.lifeCycleWhiteBox = this.lifeCycleSvgG.append("g")
		.attr("class","white-box")
	  .append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", this.params.lifeCycleWidth)
		.attr("height", this.params.lifeCycleHeight)
		.attr("fill","#FFF");

	this.xScaleLifeCycle = d3.scale.linear()
		.range([0, this.params.lifeCycleWidth])
		.domain([1980, 2013]);

	this.yScaleLifeCycle = d3.scale.linear()
		.range([this.params.lifeCycleHeight, 0]);

	if ( this.params.scaleYAxis ) {
		this.yScaleLifeCycle.domain([0, (d3.max(self.params.selectedData, function(d) { return d.cases; }) * 1.1) ]);
	} else {
		this.yScaleLifeCycle.domain([0, 1235000 ]);
	}

	this.xAxisLifeCycle = d3.svg.axis()
		.scale(this.xScaleLifeCycle)
		.tickFormat(function(d) { return d; })
		.ticks(this.params.ticks)
		.orient("bottom");

	this.yAxisLifeCycle = d3.svg.axis()
		.scale(this.yScaleLifeCycle)
		.ticks(5)
		.tickSize(-this.params.lifeCycleWidth, 0)
		.orient("left");

	this.line = d3.svg.line()
		.x(function(d) { return self.xScaleLifeCycle(d.date); })
		.y(function(d) { return self.yScaleLifeCycle(d.cases); });

	this.lifeCycleSvgG.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + this.params.lifeCycleHeight + ")")
	    .call(this.xAxisLifeCycle);

	this.lifeCycleSvgG.append("g")
	    .attr("class", "y axis")
	    .call(this.yAxisLifeCycle)
	  .append("text")
	    .attr("transform", "translate(" + -(this.params.lifeCycleMargin.left * 0.9) + "," + (this.params.lifeCycleHeight/2) + "), rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".5em")
	    .style("text-anchor", "middle")
	    .text(this.params.key.keyHead);

	this.lifeCycleLine = this.lifeCycleSvgG.append("path")
		.data([this.params.selectedData, function (d) {
			return d.date;
		}])
		.attr("class","line")
		.attr("fill", "none")
		.attr("stroke", this.params.uiColour.lineColour)
		.attr("stroke-width", self.params.lifeCycleRadius)
		.attr("d", this.line);

	this.lifeCycleCircles = this.lifeCycleSvgG.append("g");

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

};
