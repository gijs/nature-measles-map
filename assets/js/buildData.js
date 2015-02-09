BuildWidget.prototype.buildData = function() {
	this.params.selectedID = this.features[this.params.selectedFeature].id;

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

	}

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

	this.pubsub.publish("newDataReady");
	console.log(this.features[this.params.selectedFeature]);
};
