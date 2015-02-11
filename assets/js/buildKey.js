BuildWidget.prototype.buildKey = function() {
	var self = this;

	if ( !this.key ) {
		this.key = d3.select(this.params.keyTarget);
	}

	this.key.html("");

	if ( this.params.showCases ) {
		d3.select("#toggle-cases").classed("selected",true);
		d3.select("#toggle-vaccination").classed("selected",false);
	} else {
		d3.select("#toggle-cases").classed("selected",false);
		d3.select("#toggle-vaccination").classed("selected",true);
	}

	this.list = this.key.append("ul");

	if ( this.params.showCases ) { 
		this.list.selectAll("li")
				.data(this.params.key.keyRange)
				.enter()
			  .append("li")
				.text(function (d,i) {
					if (i === (self.params.key.keyRange.length - 1) ) {
						return "≥ " + self.params.format(d);
					} else if (i === 0) {
						return "≤ " + self.params.format(d);
					} else {
						return self.params.format(d);
					}
				})
				.style("border-top-color", function (d) {
					return self.params.color(d);
				});
	} else {
		this.list.selectAll("li")
				.data(this.params.key.vaccinationRange)
				.enter()
			  .append("li")
				.text(function (d,i) {
					if (i === (self.params.key.vaccinationRange.length - 1) ) {
						return "≥ " + self.params.format(d) + "%";
					} else if (i === 0) {
						return "≤ " + self.params.format(d) + "%";
					} else {
						return self.params.format(d) + "%";
					}
				})
				.style("border-top-color", function (d) {
					return self.params.vaccinationColor(d);
				});
	}

		  
	this.list.append("li")
		.text("No data")
		.style("border-top-color", self.params.uiColour.noData);


};
