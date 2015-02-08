function buildParams () {
	var params = {};

	var contentWidth = jQuery("#content").width();

	params.uiColour = {
		veryLightGrey: "#ddd",
		lightGrey: "#999",
		grey: "#666",
		darkGrey: "#333",
		noData: "#ccc",
		lineColour: "#0B7B0B"	
	};

	params.key = {
		keyRange: [25000, 50000, 75000, 100000, 125000],
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
	params.color = d3.scale.quantile()
					.range(['rgb(255,255,178)','rgb(254,204,92)','rgb(253,141,60)','rgb(240,59,32)','rgb(189,0,38)'])
					.domain(params.key.keyRange);

	params.projection = d3.geo.mercator()
						.scale(650)
    					.translate([(params.mapWidth * 0.5), (params.mapHeight * 0.6)]);

	params.path = d3.geo.path()
					.projection(params.projection);

	return params;
}