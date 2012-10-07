function fadeOutRow(selection)
{
	selection.transition()
		.delay(function(d, i) {return i*10;})
		.duration(1000)
		.attr("transform", function(d, i) {return "translate(0,0)";})
		.style("opacity", 0)
		.each("end",function() { 
			d3.select(this).remove();					
		})
	;
}

function fadeOutCol(selection)
{
	selection.transition()
		.delay(function(d, i) {return i*10;})
		.duration(1000)
		.attr("transform", function(d, i) {return "translate(0,0)";})
		.style("opacity", 0)
		.each("end",function() { 
			d3.select(this).remove();					
		})
	;
}

function fadeOutCell(selection)
{	
	var	rowExitScale = rowScale.copy().domain([-1, 2]),
		colExitScale = colScale.copy().domain([-1, 2]);

	selection.transition()
		.delay(function(d, i) {return i*10;})
		.duration(800)
		.attr("transform", function(d) {return "translate("+colExitScale(Math.random())+","+rowExitScale(Math.random())+")";})
		.style("opacity", 0)
		.each("end",function() { 
			d3.select(this).remove();					
		})
	;

	selection.select("circle")
		.transition()
			.delay(function(d, i) {return i*10;})
			.duration(800)
			.attr("r", 0)
	;

	selection.select("text")
		.transition()
			.delay(function(d, i) {return i*10;})
			.duration(800)
			.style("font-size", 0)
	;
}

function fadeInRow(selection, scale)
{
	selection.transition()
		.delay(function(d, i) {return i*10;})
		.duration(1000)
		.attr("transform", function(d, i) {return "translate(0," + scale(i) + ")";})
		.style("opacity", 1)
	;
}

function fadeInCol(selection, scale)
{
	selection.transition()
		.delay(function(d, i) {return i*10;})
		.duration(1000)
		.attr("transform", function(d, i) {return "translate("+scale(i) + ",0)";})
		.style("opacity", 1)
	;
}

function fadeInCell(selection) {
	selection
		.transition()
			.delay(function(d, i) {return i*10;})
			.duration(1000)
			.attr("transform", function(d) {return "translate("+colScale(d.x)+","+rowScale(d.y)+")";})
	;

	selection.select("circle")
		.transition()
			.delay(function(d, i) {return i*10;})
	        .duration(1000)
			.style("opacity", 1)
			.attr("r", function(d) {return metrics.objects[d.x].scale(d.v);})
	;

	selection.select("text")
		.transition()
			.delay(function(d, i) {return i*10;})
	        .duration(1000)
			.style("opacity", 1)
			.style("font-size", 12)
	;
}
