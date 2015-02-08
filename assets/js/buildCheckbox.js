BuildWidget.prototype.buildCheckbox = function() {
	var self = this;
	this.checkbox = d3.select(this.params.checkboxTarget);

	this.checkbox.on("change", function() {
		self.params.scaleYAxis = d3.select(this).property("checked");
		self.pubsub.publish("newDataReady");
	});
};
