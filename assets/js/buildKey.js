BuildWidget.prototype.buildKey = function() {
	var self = this;

	var quantiles = self.params.color.quantiles();

	var extraQuantiles = [0];

	quantiles.forEach(function(element) { extraQuantiles.push(element); } );

	this.key = d3.select(this.params.keyTarget);

	this.key.append("h3").text(this.params.key.keyHead);

	this.list = this.key.append("ul");

	this.list.selectAll("li")
			.data(extraQuantiles)
			.enter()
		  .append("li")
			.text(function (d,i) {
				var thisValue = self.params.format(d);
				var nextValue = self.params.format( extraQuantiles[i+1] -1 );

				if (i === (extraQuantiles.length - 1) ) {
					return "≥ " + thisValue;
				} else {
					return thisValue + " - " + nextValue;
				}

			})
			.style("border-left-color", function (d) {
				return self.params.color(d);
			});
		  
	this.list.append("li")
		.text("No data")
		.style("border-left-color", self.params.uiColour.noData);
};


