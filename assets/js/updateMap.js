BuildWidget.prototype.updateMap = function() {
	var self = this;

	var year = self.params.year.toString();

	this.countriesSVG.selectAll("path")
		.attr("fill", function (d) {
			if ( d.values ) {
				if ( d.values[0][year] === "noData") {
					return "#ccc";
				} else {
					return self.params.color(d.values[0][year]);
				}

			} else {
				return "#ccc";
			}
		});
};
