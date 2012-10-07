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
function createHeat(data, dimensions, metrics) {
	var rowData = dimensions.valueObjects;
	var rowNames = dimensions.valueNames;
	var colData = metrics.objects;
	var colNames = metrics.names;

	function isVisible(d) {
		return d[dimensions.name] != "*";
	}

	function visibleMetrics(metric) {
		switch (metric.name) {
			default:
				return true;
		}
	}

	var grid = new Array();
	data.filter(isVisible).map(function(data) {
		metrics.objects.filter(visibleMetrics).map(function(metric) {
			value = data[metric.name]/data[base.name];
			switch (metric.format) {
				case "%":
					formattedValue = Math.round(100*value)+"%";
					break;
				case "z":
					formattedValue = Math.round(10*value)/10;
					break;
				default:
					formattedValue = value;
			}
			metric.max = Math.max(metric.max, value);
			grid.push({
				name: data[dimensions.name]+","+metric.name,
				y: rowNames.indexOf(data[dimensions.name]),
				x: colNames.indexOf(metric.name),
				v: value,
				f: formattedValue
			});
		});
	});
	
	var	rows = vis.selectAll("g.row").data(rowData, function(d) {return d.name;}),
		cols = vis.selectAll("g.col").data(colData, function(d) {return d.name;}),
		cells = vis.selectAll("g.cell").data(grid, function(d) {return d.name;});

	rows.exit().call(fadeOutRow);
	cols.exit().call(fadeOutCol);
	cells.exit().call(fadeOutCell);
	
	//Rows
	var newRows = rows.enter().append("svg:g")
		.attr("class", "row")
		.style("opacity", "0")
	;

	//Columns			
	var newCols = cols.enter().append("svg:g")
		.attr("class", "col")
		.style("opacity", "0")
	;
			
	var newrowlabels = newRows.append("svg:text")
		.style("text-anchor", "end")
	;
	var collabels = newCols.append("svg:text")
		.style("text-anchor", "middle")
	;

	newrowlabels
		.append("svg:tspan")
		.text(function(d) {return d.name;})
	;
	collabels
		.append("svg:tspan")
		.text(function(d) {return d.name;})
	;
	
	newrowlabels
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

	widthScale.domain([0, colData.length-1]).range([0, w - dimensions.maxNameWidth]);
	var	colSpacing = widthScale.range().pop()/(colData.length),
	gridSize = Math.min(rowSpacing, colSpacing);
	colScale.domain([0, colData.length-1]).range([dimensions.maxNameWidth+rowLabelMargin+rowSpacing, w-rowSpacing]);

	var	rowEntryScale = rowScale.copy().domain([-1, 2]),
		colEntryScale = colScale.copy().domain([-1, 2]);

	metrics.objects.filter(visibleMetrics).forEach(function(metric) {
		metric.scale.domain([0, metric.max]).range([0, gridSize/1.5]);
	});
	
	//Position new and updated row and column labels
	rows.select("text")
		.attr("x", colScale(-rowSpacing/colSpacing)-rowLabelMargin)
		.attr("dy", "0.5ex")
	;
	cols.select("text")
		.attr("x", "0")
		.attr("dy", "0ex")
	;
			
	newRows.append("svg:line")
		.attr("x1", colScale(-rowSpacing/colSpacing))
		.attr("x2", colScale(colData.length))
	;
	newCols.append("svg:line")
		.attr("y1", rowScale(-1))
		.attr("y2", rowScale(rowData.length))
	;
	
//	Fade in new and updated rows and columns
	rows.call(function(d, i) {fadeInRow(this, rowScale);});
	cols.call(function(d, i) {fadeInCol(this, colScale);});

	//Add a border around the grid
	if (false) {
		vis.append("svg:g")
			.attr("class", "border")
			.attr("transform", function(d, i) {return "translate("+colScale(-1)+"," + rowScale(-1) + ")";})
			.append("svg:rect")
				.attr("width", widthScale(colData.length))
				.attr("height", heightScale(rowData.length))
		;
	}
	
	var newCells = cells
		.enter().append("svg:g")
			.attr("class", "cell")
			.attr("transform", function(d) {return "translate("+colEntryScale(Math.random())+","+rowEntryScale(Math.random())+")";})
	;

	newCells.append("svg:circle")
		.attr("r", 0)
	;
	newCells.append("svg:text")
		.style("text-anchor", "middle")
		.attr("dy", "0.5ex")
		.style("opacity", 0)
		.style("font-size", 0)
		.append("svg:tspan")
			.text(function(d) {return d.f;})
	;
	
	cells.call(fadeInCell);
}
