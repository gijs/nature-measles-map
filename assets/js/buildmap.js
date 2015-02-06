function buildmap () {
	/*	GLOBAL VARIABLES FOR D3 */

	/*	Margin, Width and height */
	var margin = {top: 0, right: 0, bottom: 0, left: 0};
	var width = $('.outerwrapper').width()  - margin.left - margin.right;
	var height = 650 - margin.top - margin.bottom;
	/*	Global variable to control the length of D3 transitons */
	var duration = 600;

	var data = [];

	var myInput = d3.select("input");
	var year = "1980";

	var yearHeader = d3.select("h2").text(year);

	/* Max value is 1122285 -> from Excel */

	var color = d3.scale.linear()
					.range(["#ffffb2", "#e31a1c"])
					.domain([0,100000])
					.clamp("true");

	var projection = d3.geo.mercator()
						.scale(650)
    					.translate([width / 2, height / 2]);

	var path = d3.geo.path()
					.projection(projection);

	var svg = d3.select("#chart").append("svg")
					.attr("width", width)
					.attr("height", height);

	var clipGroupSvg = svg.append("g").attr("clip-path", "url(#clip)");

	svg.call(d3.behavior.zoom()
			.translate([0, 0])
			.scale(1)
			.scaleExtent([1, 8])
			.on("zoom", zoomed));

	var clip = svg.append("defs").append("svg:clipPath")
					.attr("id", "clip")
				  .append("svg:rect")
					.attr("x", 0)
					.attr("y", 0)
					.attr("width", width)
					.attr("height", height);

	var countriesSVG = clipGroupSvg.append("g");
	var bordersSVG = clipGroupSvg.append("g");

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
			
			countriesSVG.selectAll("path")
				.data(features)
				.enter().append("path")
				.attr("d", path)
				.attr("fill", function (d) {
					if ( d.values ) {
						if ( d.values[0][year] === "noData") {
							return "#ccc";
						} else {
							return color(d.values[0][year]);
						}

					} else {
						return "#ccc";
					}
				})
				.on("click", function (d) {
					if ( d.values ) {
						if ( d.values[0][year] === "noData") {
							console.log(d.values[0].Cname +  ": No Data");
						} else {
							console.log(d.values[0].Cname + ": " + d.values[0][year] + " cases");
						}
					} else {
						console.log(d.id + ": No Data");
					}
				});

			bordersSVG.append("path")
				.datum(topojson.mesh(world, world.objects.units, function(a, b) { return a !== b; }))
				.attr("d", path)
				.attr("class", "subunit-boundary")
				.attr("fill", "none")
				.attr("stroke", "#666")
				.attr("stroke-width", "0.1px");
		});


	});

	function zoomed() {
		svg.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
		countriesSVG.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
		bordersSVG.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
		// console.log(d3.event.scale);
	}

}