BuildWidget.prototype.updateMap = function() {
	var self = this;

	var year = self.params.year.toString();

	this.countriesSvg.selectAll("path")
		.attr("fill", function (d) {
			if ( d.values ) {
				if ( d.values[0][year] === "noData") {
					return self.params.uiColour.noData;
				} else {
					return self.params.color(d.values[0][year]);
				}

			} else {
				return self.params.uiColour.noData;
			}
		});

	this.yearLabel.text(year);
};
