BuildWidget.prototype.updateMap = function() {
	var self = this;

	var year = self.params.year.toString();

	this.countriesSvg.selectAll("path")
		.attr("fill", function (d) {
			if ( d.caseData ) {
				if ( self.params.showCases ) {
					if ( d.caseData[0][self.params.year] === "noData") {
						return self.params.uiColour.noData;
					} else {
						return self.params.color(d.caseData[0][self.params.year]);
					}
				} else if ( d.vaccineData ) {
					if ( d.vaccineData[0][self.params.year] === "noData") {
						return self.params.uiColour.noData;
					} else {
						return self.params.vaccinationColor(d.vaccineData[0][self.params.year]);
					}					
				}
			} else {
				return self.params.uiColour.noData;
			}
		});

	this.yearLabel.text(year);
};
