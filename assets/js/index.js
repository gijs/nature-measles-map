(function() {
	var init = function($) {

		// /*	Load D3 */
		// $.getScript("http://www.nature.com/polopoly_static/js/d3.v3.min.js", function() {

		// 	buildmap();

		// }); /* End of d3js getscript call */

		$.when( $.getScript("http://www.nature.com/polopoly_static/js/d3.v3.min.js"),
				$.getScript("http://d3js.org/topojson.v1.min.js")
		).then( function () {
			buildmap();
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