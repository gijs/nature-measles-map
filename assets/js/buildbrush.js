function buildbrush () {
	/* http://bl.ocks.org/mbostock/6452972 */

	/*	Margin, Width and height */
	var margin = {top: 0, right: 30, bottom: 0, left: 30};
	var width = $('.outerwrapper').width()  - margin.left - margin.right;
	var height = 50- margin.top - margin.bottom;

	var brushScale = d3.scale.linear()
						.domain([1980, 2013])
						.range([0, width])
						.clamp(true);

	var brush = d3.svg.brush()
					.x(brushScale)
					.extent(0, 0)
					.on("brush", brushed);

	var rangeSvg = d3.select("#year-slider").append("svg")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
					  .append("g")
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	rangeSvg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height / 2 + ")")
	    .call(d3.svg.axis()
	      .scale(brushScale)
	      .orient("bottom")
	      .tickFormat(function(d) { return d; })
	      .tickSize(0)
	      .ticks(20)
	      .tickPadding(12))
	  .select(".domain")
	  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
	    .attr("class", "halo");

	var slider = rangeSvg.append("g")
    	.attr("class", "slider")
    	.call(brush);

	slider.selectAll(".extent,.resize")
    	.remove();

	slider.select(".background")
    	.attr("height", height);

	var handle = slider.append("circle")
	    .attr("class", "handle")
	    .attr("transform", "translate(0," + height / 2 + ")")
	    .attr("r", 9);

	function brushed() {

		var value = brush.extent()[0];

		if (d3.event.sourceEvent) { // not a programmatic event
			value = brushScale.invert(d3.mouse(this)[0]);
			brush.extent([value, value]);
		}

		handle.attr("cx", brushScale(value));
		console.log(Math.floor(value));
	 //  d3.select("body").style("background-color", d3.hsl(value, .8, .8));
	}
}