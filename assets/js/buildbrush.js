/* http://bl.ocks.org/mbostock/6452972 */
BuildWidget.prototype.buildBrush = function() {
	var self = this;

	this.brush = d3.svg.brush()
					.x(this.params.brushScale)
					.extent([0, 0])
					.on("brush", brushed);

	this.rangeSvg = d3.select(this.params.brushTarget).append("svg")
						.attr("width", this.params.brushWidth + this.params.brushMargin.left + this.params.brushMargin.right)
						.attr("height", this.params.brushHeight + this.params.brushMargin.top + this.params.brushMargin.bottom);
					  
	this.rangeSvgG = this.rangeSvg.append("g")
						.attr("transform", "translate(" + this.params.brushMargin.left + "," + this.params.brushMargin.top + ")");

	this.brushAxis = d3.svg.axis()
						.scale(self.params.brushScale)
						.orient("bottom")
						.tickFormat(function(d) { return d; })
						.tickSize(0)
						.ticks(this.params.ticks)
						.tickPadding(12);

	this.brushRangeG = this.rangeSvgG.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + this.params.brushHeight / 2 + ")");
	
	this.brushRangeG.call(this.brushAxis);

	this.slider = this.rangeSvgG.append("g")
    	.attr("class", "slider")
    	.call(self.brush);

	this.slider.selectAll(".extent,.resize")
    	.remove();

	this.handle = this.slider.append("circle")
	    .attr("class", "handle")
	    .attr("transform", "translate(0," + this.params.brushHeight  / 2 + ")")
	    .attr("r", 9);

	function brushed() {
		var value = self.brush.extent()[0];

		if (d3.event.sourceEvent) { /* not a programmatic event*/
			value = Math.floor(self.params.brushScale.invert(d3.mouse(this)[0]));
			self.brush.extent([value, value]);
		}

		self.handle.attr("cx", self.params.brushScale(value));

		self.params.year = Math.floor(value);
		self.pubsub.publish("newYearChosen");
	}
};

BuildWidget.prototype.updateBrush = function() {
	var self = this;

	this.rangeSvg.attr("width", this.params.brushWidth + this.params.brushMargin.left + this.params.brushMargin.right)
			.attr("height", this.params.brushHeight + this.params.brushMargin.top + this.params.brushMargin.bottom);

	this.brushAxis.scale(self.params.brushScale).ticks(this.params.ticks);

	this.brushRangeG.call(this.brushAxis);

	this.slider.call(self.brush);

	this.handle.attr("cx", this.params.brushScale(this.params.year));
};
