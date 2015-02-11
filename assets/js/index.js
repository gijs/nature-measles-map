(function() {
	var init = function($) {
		var casesURL = "data/cases-by-who-region.csv";
		var vaccinationURL = "data/vaccination-by-who-region.csv";
		var countriesURL = "data/countries.json";
		var d3URL = "http://d3js.org/d3.v3.min.js";
		var topojsonURL = "data/topojson.v1.min.js";
		
		// var casesURL = "http://www.nature.com/widget_assets_polopoly/v518n7538/cases-by-who-region.csv";
		// var vaccinationURL = "http://www.nature.com/widget_assets_polopoly/v518n7538/vaccination-by-who-region.csv";
		// var countriesURL = "http://www.nature.com/widget_assets_polopoly/v518n7538/countries.json";
		// var d3URL = "http://www.nature.com/widget_assets_polopoly/v518n7538/d3.v3.min.js";
		// var topojsonURL = "http://www.nature.com/widget_assets_polopoly/v518n7538/topojson.v1.min.js";

		$.when( $.getScript(d3URL),
				$.getScript(topojsonURL)
		).then( function () {

			/*	Load the data in parallel */
			/*	https://groups.google.com/forum/#!msg/d3-js/3Y9VHkOOdCM/YnmOPopWUxQJ */
			var caseData;
			var vaccinationData;
			var worldData;
			var remaining = 3;
			var width = $(window).width();

			d3.csv(casesURL, function (error, d) {
				if (error) {
					$(".widget-error-message").css("display","block");
				} else {
					caseData = d;
					if (!--remaining) buildGraphic();
				}
			});

			d3.csv(vaccinationURL, function (error, d) {
				if (error) {
					$(".widget-error-message").css("display","block");
				} else {
					vaccinationData = d;
					if (!--remaining) buildGraphic();
				}
			});

			d3.json(countriesURL, function(error, world) {

				if (error) {
					$(".widget-error-message").css("display","block");
				} else {
					worldData = world;
					if (!--remaining) buildGraphic();
				}

			});

			function buildGraphic () {
				$(".outerwrapper").css("display","block");

				/* Convert the text numbers into real numbers */
				/* If the number is "" make it "noData" */
				caseData.forEach(function (element) {
					for (var i = 1980; i < 2014; i++) {
						element[i] = parseInt(element[i], 10) || "noData";
					}
				});

				vaccinationData.forEach(function (element) {
					for (var i = 1980; i < 2014; i++) {
						element[i] = parseInt(element[i], 10) || "noData";
					}
				});

				/*  Nest the data by country code */
				var nestedCaseData = d3.nest()
									.key( function (d) {
										return d.ISO_code;
									})
									.entries(caseData);

				var nestedVaccinationData = d3.nest()
									.key( function (d) {
										return d.ISO_code;
									})
									.entries(vaccinationData);

				var features = topojson.feature(worldData, worldData.objects.units).features;

				for (var i = 0; i < features.length; i++) {

					for (var k = 0; k < nestedCaseData.length; k++) {

						if ( nestedCaseData[k].key === features[i].id ) {
							features[i].caseData = nestedCaseData[k].values;
						}
					}

					for (var j = 0; j < nestedVaccinationData.length; j++) {

						if ( nestedVaccinationData[j].key === features[i].id ) {
							features[i].vaccineData = nestedVaccinationData[j].values;
						}
					}
				}

				var params = buildParams(202,"1980",true);

				var measlesMap = new BuildWidget(params, features, worldData);
				extendObject(measlesMap.pubsub);
				/*	Create subscriptions */
				measlesMap.pubsub.subscribe( "newYearChosen", measlesMap.yearChosen, measlesMap );
				measlesMap.pubsub.subscribe( "newCountryChosen", measlesMap.countryChosen, measlesMap );
				measlesMap.pubsub.subscribe( "newDataReady", measlesMap.dataReady, measlesMap );
				measlesMap.pubsub.subscribe( "newKeyChosen", measlesMap.keyChosen, measlesMap );

				/*	Call functions to bulid the map, brush, checkbox, data, linegraph and tooltip */
				measlesMap.buildMap();
				measlesMap.buildBrush();
				measlesMap.buildKey();
				measlesMap.buildData();
				measlesMap.buildTooltip();

				if ( jQuery("#content").width() >= 350 ) {
					measlesMap.buildZoom();
				}

				d3.select("#toggle-cases").on("click", function() {
					measlesMap.params.showCases = true;
					measlesMap.pubsub.publish("newKeyChosen");
				});

				d3.select("#toggle-vaccination").on("click", function() {
					measlesMap.params.showCases = false;
					measlesMap.pubsub.publish("newKeyChosen");
				});

				window.onresize = resize;

				function resize () {
					if($(window).width() != width){
						width = $(window).width();
						var myId = measlesMap.params.selectedFeature;
						var myYear = measlesMap.params.year;
						var showCases = measlesMap.params.showCases;
						console.log(showCases);
						params = buildParams(myId, myYear, showCases);
						measlesMap.params = params;
						measlesMap.updateMap();
						measlesMap.buildData();
						measlesMap.updateBrush();
					}
				}
			}
		}, function () {
			$(".widget-error-message").css("display","block");
		});

	/* End of active code */
	};

	setTimeout(function() {
		if (typeof jQuery !== 'undefined') {
			/*	jQuery ready test for svg */
			if ( document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image','1.1') ) {
				init(jQuery);
			} else {
				jQuery(".widget-status-message").css("display","block");
			}
		} else {
			setTimeout(arguments.callee, 60);
		}
	}, 60);
})();