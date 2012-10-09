String.prototype.makeId = function() {
    return this.replace(/\s|\\|\//g, '_');
};

function createDimensionOptions(dimensions, selectedDimension) {
	var content = "";
	dimensions.objects.forEach(function(dimension) {
		if (dimension.name != selectedDimension) {
			content += "<div style='float:left;padding-right:10px;padding-top:10px;'>";
			content += "<span class='categoryTitle'>"+dimension.name.makeId()+"</span><br />";
			content += "<div style='border-left:2px solid #f24254;position:relative;left:1px;top:0'>";
//			content += "<label class='crap'><input type='checkbox' class='control_select_all' id='"+dimension.name.makeId()+"' style='vertical-align: middle; margin: 0px' /> Visualize all</label>";
			content += "<label class='crap'><input type='checkbox' class='control_select_all' id='" + dimension.name.makeId() + "' /> <span id='text_" + dimension.name.makeId() + "'> Visualize All</span></label>"

			for(i=0;i<dimension.valueObjects.length;i++) {
//				content += "<label class='crap'><input type='checkbox' name='control_seaters' class='control' id='" + dimension.valueObjects[i].name + "' /> <span id='text_" + dimension.valueObjects[i].name + "'>" + dimension.valueObjects[i].name + "</span></label>"
				content += "<label class='crap'><input type='checkbox' class='control' id='" + dimension.valueObjects[i].name.makeId() + "' dimension='"+dimension.name.makeId()+"' /> <span id='text_" + dimension.valueObjects[i].name.makeId() + "'>" + dimension.valueObjects[i].name.makeId() + "</span></label>"
			}
			content += "</div></div>";
		}
		
	});
	$("#scrollPaneContent").html(content);
	assignEventListeners();

//	$(".control_select_all").attr('checked','checked');
//	$(".control_select_all").click();
//	$(".control").click();
	$("input:checkbox").uniform();
	$.uniform.update();
}

function assignEventListeners() {
	d3.selectAll(".control").on("click", function(d, i) {
		clickDimension(this);
		$.uniform.update();
	});
	
	d3.selectAll(".control_select_all").on("click", function(d, i) {
		clickAllDimensions(this);
		$.uniform.update();
	});
}

function clickDimension(e) {
	var	visualizeAll = d3.select("#"+e.getAttribute("dimension")),
		checkedDimensions = $(".checked [dimension="+e.getAttribute("dimension")+"]").length,
		allDimensions = $("[dimension="+e.getAttribute("dimension")+"]").length;
	
	if (e.parentElement.getAttribute("class") == "checker") {
		//this was not checked, is being checked
		checkedDimensions += 1;
	} else {
		//this was checked, is being unchecked
		checkedDimensions -= 1;			
	}
	
	if (allDimensions == checkedDimensions) {
		visualizeAll.attr("checked", "checked");
	} else {
		if (visualizeAll.attr("checked") != null) {
			visualizeAll.attr("checked", null);
		}
	}

}

function clickAllDimensions(e) {
	console.log("all clicked");
	return;
	
	$(".checked [dimension="+e.id+"]").click();
	if ($(".checked #"+e.id).length == 0) {
		//this was not checked, is being checked
		console.log("aa");
		$("[dimension="+e.id+"]").click();
	}
}

function createHeat(data, dimension, metrics) {
	dimensions.objects.forEach(function(d) {
		d.selected = false;
	});
	dimension.selected = true;
	
	console.log(dimensions);
	var rowData = dimension.valueObjects;
	var rowNames = dimension.valueNames;
	var colData = metrics.objects;
	var colNames = metrics.names;

	var look = {};
	dimensions.objects.map(function(d) {
		if(d.selected) {
			look[d.name] = d.valueNames;			
		} else {
			look[d.name] = ["*"];
		}
	});

	$(".control_select_all").click();
	$.uniform.update();

//	console.log(look);
	function isVisible(d) {
		for(i in look) {
			if (look[i].indexOf(d[i]) < 0) {
				return false;
			}
		}
		return true;
	}
	
	function xisVisible(d) {
		return d[dimension.name] != "*";
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
			grid.push({
				name: data[dimension.name]+","+metric.name,
				y: rowNames.indexOf(data[dimension.name]),
				x: colNames.indexOf(metric.name),
				v: value,
				f: formattedValue
			});
			metric.max = Math.max(metric.max, value);
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
			dimension.maxNameWidth = Math.max(d.BBox.width, dimension.maxNameWidth);
			dimension.maxNameHeight = Math.max(d.BBox.height, dimension.maxNameHeight);
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

	widthScale.domain([0, colData.length-1]).range([0, w - dimension.maxNameWidth]);
	var	colSpacing = widthScale.range().pop()/(colData.length),
	gridSize = Math.min(rowSpacing, colSpacing);
	colScale.domain([0, colData.length-1]).range([dimension.maxNameWidth+rowLabelMargin+rowSpacing, w-rowSpacing]);

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
