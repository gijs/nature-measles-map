function buildParams () {
	var params = {};

	var contentWidth = jQuery("#content").width();

	/* Target ids */
	params.mapTarget = "#chart";
	params.brushTarget = "#year-slider";

	/*	Map margin, width and height */
	params.mapMargin = {top: 0, right: 0, mid: 0, bottom: 0, left: 0};
	params.mapWidth = contentWidth  - params.mapMargin.left - params.mapMargin.right;
	params.mapHeight = contentWidth - params.mapMargin.top - params.mapMargin.bottom;

	/*	Brush margin, width and height */
	params.brushMargin = {top: 0, right: 30, bottom: 0, left: 30};
	params.brushWidth = contentWidth  - params.brushMargin.left - params.brushMargin.right;
	params.brushHeight = 50 - params.brushMargin.top - params.brushMargin.bottom;

	params.brushScale = d3.scale.linear()
							.domain([1980, 2013])
							.range([0, params.brushWidth])
							.clamp(true);

	params.format = d3.format("0,000");

	params.year = "1980";

	/* Max value is 1122285 -> from Excel */
	params.color = d3.scale.linear()
					.range(["#ffffb2", "#e31a1c"])
					.domain([0,100000])
					.clamp("true");

	params.projection = d3.geo.mercator()
						.scale(650)
    					.translate([params.mapWidth / 2, params.mapHeight / 2]);

	params.path = d3.geo.path()
					.projection(params.projection);

	return params;
}