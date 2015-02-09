(function() {
	var init = function($) {

		$.when( $.getScript("http://www.nature.com/polopoly_static/js/d3.v3.min.js"),
				$.getScript("data/topojson.v1.min.js")
		).then( function () {

			d3.csv("data/cases-by-who-region-edit.csv", function (error, d) {
				if (error) {
					$(".widget-status-message").css("display","none");
					$(".widget-error-message").css("display","block");
				} else {
					$(".widget-status-message").css("display","none");
					$(".outerwrapper").css("display","block");

					/* Convert the text numbers into real numbers */
					/* If the number is "" make it "noData" */
					d.forEach(function (element) {
						for (var i = 1980; i < 2014; i++) {
							element[i] = parseInt(element[i], 10) || "noData";
						}
					});

					/*  Nest the data by country code */
					var nestedData = d3.nest()
										.key( function (d) {
											return d.ISO_code;
										})
										.entries(d);

					d3.json("data/countries.json", function(error, world) {

						var features = topojson.feature(world, world.objects.units).features;

						for (var i = 0; i < features.length; i++) {

							for (var k = 0; k < nestedData.length; k++) {

								if ( nestedData[k].key === features[i].id ) {
									features[i].values = nestedData[k].values;
								}
							}
						}

						var params = buildParams();

						var measlesMap = new BuildWidget(params, features, world);
						extendObject(measlesMap.pubsub);
						/*	Create subscriptions */
						measlesMap.pubsub.subscribe( "newYearChosen", measlesMap.yearChosen, measlesMap );
						measlesMap.pubsub.subscribe( "newCountryChosen", measlesMap.countryChosen, measlesMap );
						measlesMap.pubsub.subscribe( "newDataReady", measlesMap.dataReady, measlesMap );

						/*	Call functions to bulid the map, brush, checkbox, data, linegraph and tooltip */
						measlesMap.buildMap();
						measlesMap.buildBrush();
						measlesMap.buildKey();
						measlesMap.buildCheckbox();
						measlesMap.buildData(features[measlesMap.params.selectedFeature]);
						measlesMap.buildTooltip();
					});
				}
			});
		});

	/* End of active code */
	};

	setTimeout(function() {
		if (typeof jQuery !== 'undefined') {
			/*	jQuery ready test for svg */
			if ( document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image','1.1') ) {
				init(jQuery);
				return;
			} else {
				return;	
			}
		} else {
			setTimeout(arguments.callee, 60);
		}
	}, 60);
})();