BuildWidget.prototype.buildData = function() {
	/*	Remove all the old objects from the arrays */
	while ( this.params.selectedData.length > 0 ) {
		this.params.selectedData.pop();
	}

	while ( this.params.selectedVaccinationData.length > 0 ) {
		this.params.selectedVaccinationData.pop();
	}

	while ( this.params.selectedMaxArray.length > 0 ) {
		this.params.selectedMaxArray.pop();
	}

	this.params.selectedID = this.features[this.params.selectedFeature].id;

	if ( this.features[this.params.selectedFeature].vaccineData ) {
		
		for (var j = 1980; j < 2014; j++) {
			if ( this.features[this.params.selectedFeature].vaccineData[0][j] !== "noData" ) {
				var myVaccineObject = {};
				myVaccineObject.date = j; 
				myVaccineObject.rate = this.features[this.params.selectedFeature].vaccineData[0][j];
				this.params.selectedVaccinationData.push(myVaccineObject);
			}
		}
	}

	if ( this.features[this.params.selectedFeature].caseData ) {
		this.params.selectedCountry = this.features[this.params.selectedFeature].caseData[0].Cname;
		
		for (var i = 1980; i < 2014; i++) {
			if ( this.features[this.params.selectedFeature].caseData[0][i] !== "noData" ) {
				var myCaseObject = {};
				myCaseObject.date = i; 
				myCaseObject.cases = this.features[this.params.selectedFeature].caseData[0][i];
				this.params.selectedData.push(myCaseObject);
			}
		}

		
		/* Only redraw the graph is the country has some case data */
		this.pubsub.publish("newDataReady");
	}
};
