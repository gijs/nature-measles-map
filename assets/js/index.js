(function() {
	var init = function($) {

		$.when( $.getScript("http://www.nature.com/polopoly_static/js/d3.v3.min.js"),
				$.getScript("http://d3js.org/topojson.v1.min.js")
		).then( function () {

			

			d3.csv("data/cases-by-who-region-edit.csv", function (d) {
				/* Convert the text numbers into real numbers */
				/* If the number is "" make it zero */
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

					measlesMap.buildMap();
					measlesMap.buildBrush();

				});
			});
		});

	/* End of active code */
	};


	setTimeout(function() {
		if (typeof jQuery !== 'undefined') {
			init(jQuery);
		} else {
			setTimeout(arguments.callee, 60);
		}
	}, 60);
})();