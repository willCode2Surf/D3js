function createDimensionOptions(dimensions, selectedDimension) {
	var content = "";
	dimensions.objects.forEach(function(dimension) {
		if (dimension.name != selectedDimension) {
			content += "<div style='float:left;padding-right:10px;padding-top:10px;'>";
			content += "<span class='categoryTitle'>"+dimension.name+"</span><br />";
			content += "<div style='border-left:2px solid #f24254;position:relative;left:1px;top:0'>";
			content += "<label class='crap'><input type='checkbox' class='xcontrol_select_all' id='all_"+dimension.name+"' style='vertical-align: middle; margin: 0px' /> Visualize all</label>";
//			content += "<input type='checkbox' class='control_select_all' id='all_"+dimension.name+"' style='vertical-align: middle; margin: 0px' /> <span>Visualize all</span><br />";

			for(i=0;i<dimension.valueObjects.length;i++) {
				content += "<label class='crap'><input type='checkbox' name='control_seaters' class='control' id='" + dimension.valueObjects[i].name + "' /> <span id='text_" + dimension.valueObjects[i].name + "'>" + dimension.valueObjects[i].name + "</span></label>"
//				content += "<input type='checkbox' name='control_seaters' class='control' id='" + dimension.valueObjects[i].name + "' /> <span class='checker' id='text_" + dimension.valueObjects[i].name + "'>" + dimension.valueObjects[i].name + "</span><br />"
			}
			content += "</div></div>";
		}
		
	});
	$("#scrollPaneContent").html(content);
	$("input:checkbox").uniform();
	$(".xcontrol_select_all").click();
}

function fadeout(selection)
{
	console.log(selection);
	selection.transition()
		.duration(500)
		.each("end",function() { 
			d3.select(this).remove();					
		})
	;
//	selection.selectAll("circle")
//		.transition()
//			.duration(500)
//			.attr("r", 0)
//	;
//	var xxx1 = selection.selectAll("text, line, rect")
//		.transition()
//			.duration(400)
//			.delay(100)
//			.style("fill-opacity", 0)
//			.style("stroke-opacity", 0)
//	;
//	console.log("the lines being removed");
//	console.log(xxx1);
}

function fadeIn(selection, scale)
{
	console.log(selection);
	selection.transition()
		.duration(500)
		.attr("transform", function(d, i) {return "translate(0," + scale(i) + ")";})
	;
//	selection.selectAll("circle")
//		.transition()
//			.duration(500)
//			.attr("r", 0)
//	;
	selection.selectAll("text, line, rect")
		.transition()
			.delay(0)
			.duration(500)
			.style("fill-opacity", 1)
			.style("stroke-opacity", 1)
	;
}

function createHeat(data, dimensions, metrics) {
	var rowData = dimensions.valueObjects;
	var rowNames = dimensions.valueNames;
	var colData = metrics.objects;
	var colNames = metrics.names;

	var grid = new Array();
	data.filter(isVisible).map(function(data) {
		metrics.objects.filter(visibleMetrics).map(function(metric) {
			value = data[metric.name]/data[base.name];
			switch (metric.format) {
				case "%":
					formattedValue = Math.round(100*value)+"%";
					break;
				default:
					formattedValue = value;
			}
			metric.max = Math.max(metric.max, value);
			grid.push({
				y: rowNames.indexOf(data[dimensions.name]),
				x: colNames.indexOf(metric.name),
				v: value,
				f: formattedValue
			});
		});
	});
	
	var crap = vis.selectAll("g.crap")
		.data(rowData)
		.enter()
	;
	crapg = crap.append("svg:g")
		.attr("class", "crap")
	;
	crapg.append("svg:g")
		.attr("class", "morecrap")
	;
	
	//Remove old rows
	vis.selectAll("g.row")
		.data(rowData,  function(d) {return d.name;})
		.exit().call(function() {fadeout(this);})
	;
	//Remove old columns
	vis.selectAll("g.col")
		.data(colData,  function(d) {return d.name;})
		.exit().call(function() {fadeout(this);})
	;
	//Remove old cells
	vis.selectAll("g.cell")
		.data(grid,  function(d) {return d.x+","+d.y;})
		.exit().call(function() {fadeout(this);})
	;
	
	//Rows
	var rows = vis.selectAll("g.row")
		.data(rowData,  function(d) {return d.name;})
		.enter().append("svg:g")
			.attr("class", "row")
	;

	//Columns			
	var cols = vis.selectAll("g.col")
		.data(colData,  function(d) {return d.name;})
		.enter().append("svg:g")
			.attr("class", "col")
	;
			
	rowlabels = rows.append("svg:text")
		.style("text-anchor", "end")
	;
	collabels = cols.append("svg:text")
		.style("text-anchor", "middle")
	;

	rowlabels
		.append("tspan")
		.text(function(d) {return d.name;})
	;
	collabels
		.append("tspan")
		.text(function(d) {return d.name;})
	;
			
	rowlabels
		.each(function(d) {
			d.BBox = this.getBBox();
			dimensions.maxNameWidth = Math.max(d.BBox.width, dimensions.maxNameWidth);
			dimensions.maxNameHeight = Math.max(d.BBox.height, dimensions.maxNameHeight);
		})
	;
	collabels
		.each(function(d) {
			d.BBox = this.getBBox();
			metrics.maxNameWidth = Math.max(d.BBox.width, metrics.maxNameWidth);
			metrics.maxNameHeight = Math.max(d.BBox.height, metrics.maxNameHeight);
		})
	;
	
	rowScale.domain([-1, rowData.length]).range([metrics.maxNameHeight, h]);
	heightScale.domain([-1, rowData.length]).range([0, h - metrics.maxNameHeight]);
	var	rowSpacing = heightScale.range().pop()/(rowData.length+1),
		rowLabelMargin = 10;

//			colScale.domain([-1, colData.length]).range([maxRowTextWidth, w]);
//			widthScale.domain([-1, colData.length]).range([0, w - maxRowTextWidth]);
	widthScale.domain([0, colData.length-1]).range([0, w - dimensions.maxNameWidth]);
	var	colSpacing = widthScale.range().pop()/(colData.length),
	gridSize = Math.min(rowSpacing, colSpacing);
	colScale.domain([0, colData.length-1]).range([dimensions.maxNameWidth+rowLabelMargin+rowSpacing, w-rowSpacing]);

	rowlabels
		.attr("x", colScale(-rowSpacing/colSpacing)-rowLabelMargin)
		.attr("dy", "0.5ex")
	;
			
	rows.append("svg:line")
		.attr("x1", colScale(-rowSpacing/colSpacing))
		.attr("x2", colScale(colData.length))
	;
			
	rows.call(function() {fadeIn(this, rowScale);});
//		.attr("transform", function(d, i) {return "translate(0," + rowScale(i) + ")";})
	;
//	cols
	vis.selectAll("g.col")
		.data(colData,  function(d) {return d.name;})
//			.call(function() {fadeIn(this, colScale);})
			.transition()
				.duration(500)
				.attr("transform", function(d, i) {return "translate(" + colScale(i) + ",0)";})
	;

	cols.append("svg:line")
		.attr("y1", rowScale(-1))
		.attr("y2", rowScale(rowData.length))
	;

	if (false) {
		vis.append("svg:g")
			.attr("class", "border")
			.attr("transform", function(d, i) {return "translate("+colScale(-1)+"," + rowScale(-1) + ")";})
			.append("svg:rect")
				.attr("width", widthScale(colData.length))
				.attr("height", heightScale(rowData.length))
		;
	}

	//Have the grid now
//			var gridSize = Math.min(widthScale.range().pop()/(colData.length+1), heightScale.range().pop()/(rowData.length+1));
			
	function isVisible(d) {
		return d[dimensions.name] != "*";
	}

	function visibleMetrics(metric) {
		switch (metric.name) {
			default:
				return true;
		}
	}

	metrics.objects.filter(visibleMetrics).forEach(function(metric) {
		metric.scale.domain([0, metric.max]).range([0, gridSize/1.5]);
	});

//	var existingCells = vis.selectAll("g.cell")
//		.data(grid, function(d) {return d.x+","+d.y;})
//	;
	var newCells = vis.selectAll("g.cell")
		.data(grid, function(d) {return d.x+","+d.y;})
		.enter().append("svg:g")
			.attr("class", "cell")
			.attr("transform", function(d) {return "translate("+colScale(d.x)+","+rowScale(d.y)+")";})
	;
	newCells.append("svg:circle");
	newCells.append("svg:text");
	
	var cells = vis.selectAll("g.cell").data(grid, function(d) {return d.x+","+d.y;});
//	console.log("cells");

	cells
		.transition()
			.delay(0)
			.duration(800)
			.attr("transform", function(d) {return "translate("+colScale(d.x)+","+rowScale(d.y)+")";})
	;
	
	cells.selectAll("circle")
    	.transition()
	    	.delay(0)
	        .duration(800)
			.attr("r", function(d) {return metrics.objects[d.x].scale(d.v);})
	;

	cells.selectAll("text")
   		.transition()
			.style("text-anchor", "middle")
			.attr("dy", "0.5ex")
			.text(function(d) {return d.f;})
	;
}
