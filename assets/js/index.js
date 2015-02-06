(function() {
	var init = function($) {

		$.when( $.getScript("http://www.nature.com/polopoly_static/js/d3.v3.min.js"),
				$.getScript("http://d3js.org/topojson.v1.min.js")
		).then( function () {
			buildmap();
			buildbrush();
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