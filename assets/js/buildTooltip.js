BuildWidget.prototype.buildTooltip = function() {
	this.tooltip = d3.select(this.params.mapTarget).append("h3");

	this.tooltip.text(this.params.year);
};
