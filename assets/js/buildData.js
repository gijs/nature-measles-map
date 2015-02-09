BuildWidget.prototype.buildData = function() {
	this.params.selectedID = this.features[this.params.selectedFeature].id;

	/*	Remove all the old objects from the arrays */
	while ( this.params.selectedData.length > 0 ) {
		this.params.selectedData.pop();
	}

	while ( this.params.selectedMaxArray.length > 0 ) {
		this.params.selectedMaxArray.pop();
	}

	if ( this.features[this.params.selectedFeature].values ) {
		this.params.selectedCountry = this.features[this.params.selectedFeature].values[0].Cname;
		
		for (var i = 1980; i < 2014; i++) {
			if ( this.features[this.params.selectedFeature].values[0][i] !== "noData" ) {
				var myObject = {};
				myObject.date = i; 
				myObject.cases = this.features[this.params.selectedFeature].values[0][i];
				this.params.selectedData.push(myObject);
			}
		}

		this.pubsub.publish("newDataReady");
	}
};
