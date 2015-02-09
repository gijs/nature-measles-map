BuildWidget.prototype.buildMap = function() {
	var self = this;

	this.svg = d3.select(this.params.mapTarget).append("svg")
					.attr("width", this.params.mapWidth)
					.attr("height", this.params.mapHeight);
				  
	this.svg.append("defs").append("svg:clipPath")
					.attr("id", "clip")
				  .append("svg:rect")
					.attr("x", 0)
					.attr("y", 0)
					.attr("width", this.params.mapWidth)
					.attr("height", this.params.mapHeight);

	this.clipGroupSvg = this.svg.append("g").attr("clip-path", "url(#clip)");

	this.countriesSvg = this.clipGroupSvg.append("g").attr("class","country");
	this.bordersSvg = this.clipGroupSvg.append("g");

	this.svg.call(d3.behavior.zoom()
			.translate([0, 0])
			.scale(1)
			.scaleExtent([1, 8])
			.on("zoom", zoomed));

	this.countriesSvg.selectAll("path")
		.data(this.features)
		.enter().append("path")
		.attr("d", this.params.path)
		.attr("fill", function (d) {
			if ( d.caseData ) {
				if ( d.caseData[0][self.params.year] === "noData") {
					return self.params.uiColour.noData;
				} else {
					return self.params.color(d.caseData[0][self.params.year]);
				}

			} else {
				return self.params.uiColour.noData;
			}
		})
		.on("click", function (d,i) {
			self.params.selectedFeature = i;
			self.pubsub.publish("newCountryChosen");
		});

	this.bordersSvg.append("path")
		.datum(topojson.mesh(self.world, self.world.objects.units, function(a, b) { return a !== b; }))
		.attr("d", this.params.path)
		.attr("class", "subunit-boundary")
		.attr("fill", "none")
		.attr("stroke", "#666")
		.attr("stroke-width", "0.1px");

	this.yearLabel = d3.select(this.params.mapTarget).append("h3");

	this.yearLabel.text(this.params.year);
	
	function zoomed() {
		self.countriesSvg.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
		self.bordersSvg.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
	}
};
