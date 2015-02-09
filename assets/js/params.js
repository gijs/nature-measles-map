function buildParams () {
	var params = {};

	var contentWidth = jQuery("#content").width();

	params.mapScale = 100;
	params.ticks = 20;
	params.lifeCycleRadius = "4px";

	if ( contentWidth < 310 ) {
		params.mapScale = 50;
		params.ticks = 5;
		params.lifeCycleRadius = "2px";
	}

	params.uiColour = {
		veryLightGrey: "#ddd",
		lightGrey: "#999",
		grey: "#666",
		darkGrey: "#333",
		noData: "#ccc",
		lineColour: "#0B7B0B"	
	};

	params.key = {
		keyRange: [20000, 40000, 60000, 80000, 100000, 120000, 140000, 160000, 180000, 200000],
		verticalShift: [20, 36, 60],
		horizontalShift: 25,
		keyHead: "Cases of measles"
	};

	/* Life cycle data */
	params.selectedCountry = "United States of America (the)";
	params.selectedID = "USA";
	params.selectedData = [];
	params.selectedMaxArray = [];
	params.selectedFeature = 202;

	/* Target ids */
	params.mapTarget = "#chart";
	params.brushTarget = "#year-slider";
	params.keyTarget = "#measles-scale";
	params.lifeCycleChartTarget = "#life-cycle-chart";
	params.selectedCountryTarget = "#selected-country";
	params.checkboxTarget = "#scale-y-axis";

	/*	Map margin, width and height */
	params.mapMargin = {top: 0, right: 15, bottom: 0, left: 15};
	params.mapWidth = contentWidth  - params.mapMargin.left - params.mapMargin.right;
	params.mapHeight = (contentWidth * 0.5) - params.mapMargin.top - params.mapMargin.bottom;

	/*	Brush margin, width and height */
	params.brushMargin = {top: 0, right: 10, bottom: 0, left: 70};
	params.brushWidth = contentWidth  - params.brushMargin.left - params.brushMargin.right - 30;
	params.brushHeight = 50 - params.brushMargin.top - params.brushMargin.bottom;

	/*	Lifecycle margin, width and height */
	params.lifeCycleMargin = {top: 10, right: 10, bottom: 20, left: 70};
	params.lifeCycleWidth = contentWidth - params.lifeCycleMargin.left - params.lifeCycleMargin.right - 30;
	params.lifeCycleHeight = 100;
	params.scaleYAxis = false;


	params.brushScale = d3.scale.linear()
							.domain([1980, 2013])
							.range([0, params.brushWidth])
							.clamp(true);

	params.format = d3.format("0,000");

	params.year = "1980";

	params.duration = 100;

	/* Max value is 1122285 -> from Excel */
	params.color = d3.scale.linear()
					.range(["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d","#000000"])
					.domain(params.key.keyRange)
					.clamp(true);

	params.projection = d3.geo.mercator()
						.scale(params.mapScale)
    					.translate([(params.mapWidth * 0.5), (params.mapHeight * 0.6)]);

	params.path = d3.geo.path()
					.projection(params.projection);

	return params;
}
