BuildWidget.prototype.buildKey = function() {
	var self = this;

	this.key = d3.select(this.params.keyTarget);

	this.key.append("h3").text(this.params.key.keyHead);

	this.list = this.key.append("ul");

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
		  
	this.list.append("li")
		.text("No data")
		.style("border-top-color", self.params.uiColour.noData);
};
