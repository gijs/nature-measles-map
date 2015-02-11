BuildWidget.prototype.updateMap = function() {
	var self = this;

	this.svg.attr("width", this.params.mapWidth)
			.attr("height", this.params.mapHeight);

	this.defs.attr("width", this.params.mapWidth)
			.attr("height", this.params.mapHeight);

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
				} else if ( d.vaccineData !== undefined ) {
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

	/* Very ugly fix to get around problem with Montenegro */
	if (this.countriesSvg.select("path#MKD").attr("fill") === null) {
		this.countriesSvg.select("path#MKD").attr("fill", self.params.uiColour.noData);
	}



	this.yearLabel.text(year);
};
