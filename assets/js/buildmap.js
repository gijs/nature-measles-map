function buildmap () {
	/*	GLOBAL VARIABLES FOR D3 */

	/*	Margin, Width and height */
	var margin = {top: 15, right: 0, bottom: 20, left: 0};
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
			element["1980"] = parseInt(element["1980"], 10) || "noData";
			element["1981"] = parseInt(element["1981"], 10) || "noData";
			element["1982"] = parseInt(element["1982"], 10) || "noData";
			element["1983"] = parseInt(element["1983"], 10) || "noData";
			element["1984"] = parseInt(element["1984"], 10) || "noData";
			element["1985"] = parseInt(element["1985"], 10) || "noData";
			element["1985"] = parseInt(element["1985"], 10) || "noData";
			element["1986"] = parseInt(element["1986"], 10) || "noData";
			element["1987"] = parseInt(element["1987"], 10) || "noData";
			element["1988"] = parseInt(element["1988"], 10) || "noData";
			element["1989"] = parseInt(element["1989"], 10) || "noData";
			element["1990"] = parseInt(element["1990"], 10) || "noData";
			element["1991"] = parseInt(element["1991"], 10) || "noData";
			element["1992"] = parseInt(element["1992"], 10) || "noData";
			element["1993"] = parseInt(element["1993"], 10) || "noData";
			element["1994"] = parseInt(element["1994"], 10) || "noData";
			element["1995"] = parseInt(element["1995"], 10) || "noData";
			element["1996"] = parseInt(element["1996"], 10) || "noData";
			element["1997"] = parseInt(element["1997"], 10) || "noData";
			element["1998"] = parseInt(element["1998"], 10) || "noData";
			element["1999"] = parseInt(element["1999"], 10) || "noData";
			element["2000"] = parseInt(element["2000"], 10) || "noData";
			element["2001"] = parseInt(element["2001"], 10) || "noData";
			element["2002"] = parseInt(element["2002"], 10) || "noData";
			element["2003"] = parseInt(element["2003"], 10) || "noData";
			element["2004"] = parseInt(element["2004"], 10) || "noData";
			element["2005"] = parseInt(element["2005"], 10) || "noData";
			element["2006"] = parseInt(element["2006"], 10) || "noData";
			element["2007"] = parseInt(element["2007"], 10) || "noData";
			element["2008"] = parseInt(element["2008"], 10) || "noData";
			element["2009"] = parseInt(element["2009"], 10) || "noData";
			element["2010"] = parseInt(element["2010"], 10) || "noData";
			element["2011"] = parseInt(element["2011"], 10) || "noData";
			element["2013"] = parseInt(element["2013"], 10) || "noData";
			element["2014"] = parseInt(element["2014"], 10) || "noData";
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

			myInput.on("input", function () {
				year = this.value;
			  	
				countriesSVG.selectAll("path")
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
					});

				yearHeader.text(year);

			});

		});
	});



	function zoomed() {
		svg.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
		countriesSVG.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
		bordersSVG.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
		// console.log(d3.event.scale);
	}




}