/*	http://bl.ocks.org/mgold/c2cc7242c8f800c736c4 */
BuildWidget.prototype.buildZoom = function() {
	var self = this;
	var buttonDuration = 200;

	this.zoomButtonGroup = this.svg.append("g")
								.attr("transform","translate(10,40)");

	this.zoomInButton = this.zoomButtonGroup.append("rect")
						.attr("x", 0)
						.attr("y", 0)
						.attr("width", 45)
						.attr("height", 45)
						.attr("fill","#fff")
						.attr("opacity", 0)
						.attr("class","zoom_in")
						.attr("cursor","pointer")
						.on("click", zoomInOut)
						.on("dblclick", function () {
							d3.event.stopPropagation();
						});

	this.zoomInIcon = this.zoomButtonGroup.append("path")
						.attr("d", "M22.646,19.307c0.96-1.583,1.523-3.435,1.524-5.421C24.169,8.093,19.478,3.401,13.688,3.399C7.897,3.401,3.204,8.093,3.204,13.885c0,5.789,4.693,10.481,10.484,10.481c1.987,0,3.839-0.563,5.422-1.523l7.128,7.127l3.535-3.537L22.646,19.307zM13.688,20.369c-3.582-0.008-6.478-2.904-6.484-6.484c0.006-3.582,2.903-6.478,6.484-6.486c3.579,0.008,6.478,2.904,6.484,6.486C20.165,17.465,17.267,20.361,13.688,20.369zM15.687,9.051h-4v2.833H8.854v4.001h2.833v2.833h4v-2.834h2.832v-3.999h-2.833V9.051z")
						.attr("fill","#666")
						.attr("transform", "scale(1.4)")
						.attr("class","zoom_in")
						.attr("cursor","pointer")
						.on("click", zoomInOut)
						.on("dblclick", function () {
							d3.event.stopPropagation();
						}).on("mouseenter", function () {
							d3.select(this).transition()
											.duration(buttonDuration)
											.attr("fill","#333");
						}).on("mouseleave", function () {
							d3.select(this).transition()
											.duration(buttonDuration)
											.attr("fill","#666");
						});

	this.zoomOutButton = this.zoomButtonGroup.append("rect")
						.attr("x", 0)
						.attr("y", 55)
						.attr("width", 45)
						.attr("height", 45)
						.attr("fill","#fff")
						.attr("opacity", 0)
						.attr("class","zoom_out")
						.attr("cursor","pointer")
						.on("click", zoomInOut)
						.on("dblclick", function () {
							d3.event.stopPropagation();
						});

	this.zoomOutIcon = this.zoomButtonGroup.append("path")
						.attr("d", "M22.646,19.307c0.96-1.583,1.523-3.435,1.524-5.421C24.169,8.093,19.478,3.401,13.688,3.399C7.897,3.401,3.204,8.093,3.204,13.885c0,5.789,4.693,10.481,10.484,10.481c1.987,0,3.839-0.563,5.422-1.523l7.128,7.127l3.535-3.537L22.646,19.307zM13.688,20.369c-3.582-0.008-6.478-2.904-6.484-6.484c0.006-3.582,2.903-6.478,6.484-6.486c3.579,0.008,6.478,2.904,6.484,6.486C20.165,17.465,17.267,20.361,13.688,20.369zM8.854,11.884v4.001l9.665-0.001v-3.999L8.854,11.884z")
						.attr("fill","#666")
						.attr("transform", "translate(0,55), scale(1.4)")
						.attr("class","zoom_out")
						.attr("cursor","pointer")
						.on("click", zoomInOut)
						.on("dblclick", function () {
							d3.event.stopPropagation();
						}).on("mouseenter", function () {
							d3.select(this).transition()
											.duration(buttonDuration)
											.attr("fill","#333");
						}).on("mouseleave", function () {
							d3.select(this).transition()
											.duration(buttonDuration)
											.attr("fill","#666");
						});

	this.zoomInButton.on("mouseenter", function () {
		self.zoomInIcon.transition()
						.duration(buttonDuration)	
						.attr("fill","#333");
	}).on("mouseleave", function () {
		self.zoomInIcon.transition()
						.duration(buttonDuration)
						.attr("fill","#666");
	});

	this.zoomOutButton.on("mouseenter", function () {
		self.zoomOutIcon.transition()
						.duration(buttonDuration)
						.attr("fill","#333");
	}).on("mouseleave", function () {
		self.zoomOutIcon.transition()
						.duration(buttonDuration)
						.attr("fill","#666");
	});

	function zoomInOut () {
		var that = self;

		var scale = self.zoom.scale();
		var extent = self.zoom.scaleExtent();
		var translate = self.zoom.translate();
		var x = translate[0];
		var y = translate[1];
		var factor = (d3.select(this).attr("class") === 'zoom_in') ? 1.5 : 0.5;
		var target_scale = scale * factor;

		/* If we're already at an extent, done */
		if (target_scale === extent[0] || target_scale === extent[1]) { return false; }
		/* If the factor is too much, scale it down to reach the extent exactly */
		var clamped_target_scale = Math.max(extent[0], Math.min(extent[1], target_scale));
		if (clamped_target_scale != target_scale){
			target_scale = clamped_target_scale;
			factor = target_scale / scale;
		}

		/* Center each vector, stretch, then put back */
		x = (x - that.params.center[0]) * factor + that.params.center[0];
		y = (y - that.params.center[1]) * factor + that.params.center[1];

		/* Transition to the new view over 350ms */
		d3.transition().duration(200).tween("zoom", function () {
			var interpolate_scale = d3.interpolate(scale, target_scale);
			var interpolate_trans = d3.interpolate(translate, [x,y]);
			return function (t) {
					that.zoom.scale(interpolate_scale(t))
						.translate(interpolate_trans(t));
					that.zoom.event(self.svg);
	        };
	    });
	}
};
