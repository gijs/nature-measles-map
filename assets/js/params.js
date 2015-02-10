function buildParams (num, year) {
	var params = {};

	var contentWidth = jQuery("#content").width();

	params.mapScale = 100;
	params.ticks = 20;
	params.lifeCycleRadius = "3px";
	params.mapRatio = 0.5;

	if ( contentWidth < 450 ) {
		params.mapScale = 50;
		params.ticks = 5;
		params.mapRatio = 0.8;
	}

	params.uiColour = {
		veryLightGrey: "#ddd",
		lightGrey: "#999",
		grey: "#666",
		darkGrey: "#333",
		noData: "#ccc",
		lineColour: "#cb181d",
		vaccinationLineColour: "#238b45"	
	};

	params.key = {
		keyRange: [20000, 40000, 60000, 80000, 100000, 120000, 140000, 160000, 180000, 200000],
		vaccinationRange: [10,20,30,40,50,60,70,80,90,100],
		verticalShift: [20, 36, 60],
		horizontalShift: 25,
		keyHead: "Cases of measles",
		keyHeadVaccination: "Vaccination rate %"
	};

	/* Life cycle data */
	params.selectedData = [];
	params.selectedVaccinationData = [];
	params.selectedMaxArray = [];
	params.selectedFeature = num;

	/* Target ids */
	params.mapTarget = "#chart";
	params.brushTarget = "#year-slider";
	params.keyTarget = "#measles-scale";
	params.lifeCycleChartTarget = "#life-cycle-chart";
	params.vaccinationChartTarget = "#vaccination-chart";
	params.selectedCountryTarget = "#selected-country";
	params.checkboxTarget = "#scale-y-axis";

	/*	Map margin, width and height */
	params.mapMargin = {top: 0, right: 15, bottom: 0, left: 15};
	params.mapWidth = contentWidth  - params.mapMargin.left - params.mapMargin.right;
	params.mapHeight = (contentWidth * params.mapRatio) - params.mapMargin.top - params.mapMargin.bottom;

	/*	Brush margin, width and height */
	params.brushMargin = {top: 0, right: 10, bottom: 0, left: 70};
	params.brushWidth = contentWidth  - params.brushMargin.left - params.brushMargin.right - 30;
	params.brushHeight = 50 - params.brushMargin.top - params.brushMargin.bottom;

	/*	Lifecycle margin, width and height */
	params.lifeCycleMargin = {top: 10, right: 10, bottom: 20, left: 70};
	params.lifeCycleWidth = contentWidth - params.lifeCycleMargin.left - params.lifeCycleMargin.right - 30;
	params.lifeCycleHeight = 100;
	params.scaleYAxis = d3.select("#scale-y-axis").property("checked");


	params.brushScale = d3.scale.linear()
							.domain([1980, 2013])
							.range([0, params.brushWidth])
							.clamp(true);

	params.format = d3.format("0,000");

	params.year = year;

	params.duration = 100;

	params.showCases = true;

	/* Max value is 1122285 -> from Excel */
	params.color = d3.scale.linear()
					.range(["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d","#000000"])
					.domain(params.key.keyRange)
					.clamp(true);

	params.vaccinationColor = d3.scale.linear()
								.range(["#ffffff","#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c","#00441b"])
								.domain(params.key.vaccinationRange)
								.clamp(true);

	params.projection = d3.geo.mercator()
						.scale(params.mapScale)
    					.translate([(params.mapWidth * 0.5), (params.mapHeight * 0.6)]);

	params.path = d3.geo.path()
					.projection(params.projection);

	return params;
}
