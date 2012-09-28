
/**
 * Called after page is loaded
 **/
$(document).ready( function() {
	$("select, input:checkbox, input:radio, input:file").uniform();
	
	//this is unfortunately needed due to a race condition in safari  
    //limit the selector to only what you know will be buttons :)  
    /*
    $("#play_time_series").css({  
         'padding' : '3px 20px',  
         'font-size' : '12px',  
    });
    */
    
	//show all on load
	$("#all_seaters").click();
	$("#all_zoners").click();
	$("#all_jumpers").click();
	
	//for time-series and options buttons
	$('a.minibutton').bind({
		mousedown: function() {
			$(this).addClass('mousedown');
		},
		blur: function() {
			$(this).removeClass('mousedown');
		},
		mouseup: function() {
			$(this).removeClass('mousedown');
		}
	});
  
	//only show the 'scroll arrow' if we're not at the bottom of the page
	show_arrow = true;
	$(window).scroll(function(){
		if(isScrollBottom()){
			show_arrow = false;
		}
	});

	function isScrollBottom() {
		var documentHeight = $(document).height();
		var scrollPosition = $(window).height() + $(window).scrollTop();
		return (documentHeight == scrollPosition);
	}
	
	//show scroll-down arrow animation
	if(show_arrow == true) {
	setTimeout(function() {
		if(show_arrow == true) {
			$("#arrow_down").fadeTo("fast",0.01).animate({
				opacity: 0.3,
				marginBottom: '15px'
			}, 500, function() {
				$("#arrow_down").animate({
					opacity: '0',
					marginBottom: '0'
				}, 500, function() {
					$(this).fadeOut();
				});
			});
			}
		},4000);
	}
			
	//update checkboxes
	$.uniform.update();
});
//end document.ready


/**
 * Gets fields from GET
 **/
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


/**
 * Sets the content pane containing data controls
 **/
function setContent(by_what) {	
		clearCanvas();
		
		var content = "";
		content += "<div style='float:left;width:110px;padding-right:10px;'>";
		content += "<span class='categoryTitle'>Jump around a lot</span><br />";
		content += "<div style='border-left:2px solid #424254;position:relative;left:1px;top:0'>";
		content += "<label><input type='checkbox' class='control_select_all' id='all_jumpers' style='vertical-align: middle; margin: 0px' /> Visualize all</label><br />";
		for(i=0;i<names_jumpers.length;i++) {
			content += "<label><input type='checkbox' name='control_jumpers' class='control' id='" + names_jumpers[i] + "' /> <span id='text_" + names_jumpers[i] + "'>" + names_jumpers[i] + "</span></label><br />";
		}
		content += "</div></div>";

		content += "<div style='float:left;width:110px;padding-right:10px;'>";
		content += "<span class='categoryTitle'>Prefer a single seat</span><br />";
		content += "<div style='border-left:2px solid #E8CAA4;position:relative;left:1px;top:0'>";
		content += "<label><input type='checkbox' class='control_select_all' id='all_seaters' style='vertical-align: middle; margin: 0px' /> Visualize all</label><br />";
		for(i=0;i<names_seaters.length;i++) {
			content += "<label><input type='checkbox' name='control_seaters' class='control' id='" + names_seaters[i] + "' /> <span id='text_" + names_seaters[i] + "'>" + names_seaters[i] + "</span></label><br />"
		}
		content += "</div></div>";
		
		content += "<div style='float:left;width:110px;padding-right:10px;'>";
		content += "<span class='categoryTitle'>Prefer a single zone</span><br />";
		content += "<div style='border-left:2px solid #64908A;position:relative;left:1px;top:0'>";
		content +="<label><input type='checkbox' class='control_select_all' id='all_zoners' style='vertical-align: middle; margin: 0px' /> Visualize all</label><br />";
		for(i=0;i<names_zoners.length;i++) {
			content += "<label><input type='checkbox' name='control_zoners' class='control' id='" + names_zoners[i] + "' /> <span id='text_" + names_zoners[i] + "'>" + names_zoners[i] + "</span></label><br />";
		}
		content += "</div></div>";
		content += "<br /><br />";
	
		$("#scrollPaneContent").html(content).fadeIn();
		
		//reassign event listeners
		assignEventListeners();
}


/**
 * Scales the symbol and returns its new size
 **/
function scaleSymbol(valj) {
	valmin = 1.0;
	pmin = 14.0;
	
	//return Math.sqrt(d.count * 100)
	var pj = 1.0083 * Math.pow((valj/valmin),0.5716) * pmin;
	//return Math.pow((valj/valmin),0.5) * pmin;
	
	return pj;
}


/**
 * Mouseout event for our controls and circles
 **/
function mouseout() {
	component_clicked = this.id;

	vis.selectAll(".select_"+component_clicked)
		.transition()
			.duration(1000)
			.style("opacity", 0);	    

	$("#text_"+component_clicked).animate({
		color:'#343434'
		}, 500);
}


/**
 * Mouseover event for our controls and circles
 **/
function mouseover() {
	//alert(d3.select(this).attr("id"));
	component_clicked = d3.select(this).attr("id");

	vis.selectAll("selected_group_"+component_clicked)
		.data(eval("data_"+component_clicked))
	    .enter().append("svg:circle")
		.attr("class", "select_"+component_clicked)
    	.attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; })
	    .attr("r", 60)
	    .style("fill", "none")
	    .style("stroke", "#fff")
		.style("stroke-opacity", 1e-6)
	    .style("stroke-width", 2)
		.transition()
			.duration(750)
			.attr("r", function(d) {
				return scaleSymbol(d.count);
			})
		.style("stroke-opacity", 1);
		
	$("#text_"+component_clicked).animate({
		color:'red'
		}, 500);
}


/**
 * Assign our event listeners
 **/
function assignEventListeners() {

	//add event listener for the individual controls
	d3.selectAll(".control").on("click", function() {
		student = this.id;
	
		vis.selectAll(".dot_"+student)
			.transition()
		        .duration(500)
		        .attr("r", 0)
		        .remove();

		//if checking, show circles, otherwise hide them
		if(this.checked) {
			vis.selectAll("dot") //initially, this will be an empty collection
		    		.data(eval("data_"+student)) //bind each elements in our data_[student_name] array to a svg-circle
					.enter().append("svg:circle")
				    .attr("class", "dot dot_"+student)
				    .attr("id", student)
				    .attr("fill", function() {//alert(student + " :: " + $.inArray(student, names_zoners));
				    	if($.inArray(student, names_jumpers) != -1)
					   		return color[0]; 
					   	else if($.inArray(student, names_seaters) != -1)
				   			return color[1];
					   	else if($.inArray(student, names_zoners) != -1) {
					   		return color[2];
					   	}
				    })
					.style("fill-opacity",0.7)
				    .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; })
				    .attr("r", 0)
			    	.transition()
				    	.delay(200)
				        .duration(800)
					    .attr("r", function(d) { return scaleSymbol(d.count); });

				//add a mouseover event to our vis to add the circle hover and text highlight effects
				vis.selectAll(".dot")
					.on("mouseover", mouseover)
					.on("mouseout", mouseout);
		}
	}) //end if control clicked


	//add event listener for the 'select all' controls 
	d3.selectAll(".control_select_all").on("click", function() {
		component_clicked = this.id;
	
		//the names array whose members we'll be checking 
		var which_arr;
	
		//check all checkboxes
		if(this.checked) {
    		if(component_clicked == "all_jumpers") {
    			checkAll(document.getElementsByName("control_jumpers"));
    			which_arr = names_jumpers;
	    	}
    		else if(component_clicked == "all_zoners") {
    			checkAll(document.getElementsByName("control_zoners"));
    			which_arr = names_zoners;
	    	}
    		else if(component_clicked == "all_seaters") {
    			checkAll(document.getElementsByName("control_seaters"));
    			which_arr = names_seaters;
	    	}
    		else {
	    		checkAll(document.getElementsByName("control"));
	    		which_arr = names;
		    }
	    
    		//show all circles
		    //bind our data points to our symbols (circles)
			$.each(which_arr, function(i, student) {
				student = which_arr[i];
				
				vis.selectAll("dot") //initially, this will be an empty collection
		    		.data(eval("data_"+student)) //bind each elements in our data_[student_name] array to a svg-circle
					.enter().append("svg:circle")
				    .attr("class", "dot dot_"+student)
				    .attr("id", student)
				    .attr("fill", function() {//alert(student + " :: " + $.inArray(student, names_zoners));
				    	if($.inArray(student, names_jumpers) != -1)
					   		return color[0]; 
					   	else if($.inArray(student, names_seaters) != -1)
				   			return color[1];
					   	else if($.inArray(student, names_zoners) != -1) {
					   		return color[2];
					   	}
				    })
					.style("fill-opacity",0.7)
				    .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; })
				    .attr("r", 0)
			    	.transition()
				    	.delay(200)
				        .duration(800)
					    .attr("r", function(d) { return scaleSymbol(d.count); });

				//add a mouseover event to our vis to add the circle hover and text highlight effects
				vis.selectAll(".dot")
					.on("mouseover", mouseover)
					.on("mouseout", mouseout);
			});
	    }
    	else {
	    	//the names array whose members we'll be unchecking
    		var which_arr;
    
		    if(component_clicked == "all_jumpers") {
    			uncheckAll(document.getElementsByName("control_jumpers"));
    			which_arr = names_jumpers;
	    	}
    		else if(component_clicked == "all_seaters") {
    			uncheckAll(document.getElementsByName("control_seaters"));
    			which_arr = names_seaters;
	    	}
    		else if(component_clicked == "all_zoners") {
    			uncheckAll(document.getElementsByName("control_zoners"));
    			which_arr = names_zoners;
	    	}
    		else {
	    		uncheckAll(document.getElementsByName("control"));
	    		which_arr = names;
		    }
	    	
	    	$.each(which_arr, function(i, student) {
				vis.selectAll(".dot_"+student)
					.transition()
			        .duration(500)
			        .attr("r", 0)
			        .remove();
			});
		}
	}) //end if control_select_all clicked
	
	//add event listener for the time series player feature
	d3.select("#play_time_series").on("click", function() {
		clearCanvas();
		showTips();
		setTimeout('add_and_animate_time_series_elements()', 1000);		
	}) //end if time series player link clicked
	
	//add event listener for the options button
	d3.select("#options").on("click", options) //end if options button clicked
}


/**
 * Shows tittle-tips
 **/
function showTips() {
	if($(":checked").length == 0) {
		$("#msgs").html("select at least two students to compare their seating habits")
			.fadeOut("fast", function(){
				$(this).show();
				setTimeout(function() {
					$('#msgs').fadeOut();
				},4000);
			});
	}
	else if($(":checked").length == (TOTAL_STUDENTS+3)) {
		$("#msgs").html("<span style='font-weight:bold'>tip</span> - it might be more useful to select a smaller set of students")
			.fadeOut("fast", function(){
				$(this).show();
				setTimeout(function() {
					$('#msgs').fadeOut();
				},4000);
			});
	}
}


/**
 * Shows the options window (TODO)
 **/
function options() {
	$("#msgs").html("<span style='font-weight:bold'>soon</span> - speed/step/history controls for both the time-series and static views")
		.fadeOut("fast", function(){
			$(this).show();
			setTimeout(function() {
				$('#msgs').fadeOut();
			},8000);
		});
}


/**
 * Starts the time-series player
 **/
function add_and_animate_time_series_elements(selected_students) {
	var selected_students = new Array();
	$.each($(":checked"), function() {
		//alert($(this).attr("id"));
		//strip the 'visualize all' buttons if they're checked
		if($(this).attr("id") != "all_jumpers" 
			&& $(this).attr("id") != "all_zoners"
			&& $(this).attr("id") != "all_seaters"
			) {
			selected_students.push($(this).attr("id"));
		}
	});
		
	//add the circles
	$.each(selected_students, function(i, student) {
		/*
		console.log("--- calling step for lecture: 1, student: " + student + ", x: " 
			+ eval("data_time_series_"+student)[0].x + ", y: " 
			+ eval("data_time_series_"+student)[0].y + ", missing: " 
			+ eval("data_time_series_"+student)[0].missing);
		*/

		vis.append("svg:g")
      		.attr("id", "group_"+student)
      		.attr("class", "groupie")
      		.attr("transform", function(d) { return "translate(" + x(eval("data_time_series_"+student)[0].x) + "," + y(eval("data_time_series_"+student)[0].y) + ")"; })
			.transition()
				.duration(1000)
				.delay(500)
				.each("end",step(eval("data_time_series_"+student)[1].x, eval("data_time_series_"+student)[1].y, 2, student));
				
		d3.selectAll("#group_"+student).append("svg:circle")
			.attr("id","the_badass_dot_" + student)
			.attr("class","dot")
    		.attr("fill", function(d, j) {
			   	if($.inArray(student, names_jumpers) != -1)
			   		return color[0]; 
			   	else if($.inArray(student, names_seaters) != -1)
			   		return color[1];
			   	else if($.inArray(student, names_zoners) != -1)
			   		return color[2];
			})
			.style("fill-opacity",0.8)
			.attr("r", 0)
			.transition()
				.duration(500)
				.attr("r", 18);
				
		d3.selectAll("#the_badass_dot_"+student)
			.style("fill-opacity",function() {
				//if the student has missing data for this point, fade out the point
				//recall that a[0] is for lecture 1
				if(eval("data_time_series_"+student)[0].missing == "1") {
					return "0.5";
				}
				else
					return "0.8";
			});
			
		d3.selectAll("#group_"+student).append("svg:text")
				.attr("class","the_badass_label")
				.attr("font-size","10px")
				.attr("font-weight","normal")
				.attr("font-stretch","ultra-condensed")
				.attr("fill","#fff")
				.attr("y","3px")
				.attr("fill-opacity",0)
				.attr("text-anchor", "middle")
				.text(student)
				.transition()
					.delay(100)
					.duration(1000)
					.attr("fill-opacity", 0.99);
		});
}


/**
 * Displays animation steps for the 'time series' feature
 * Note that calling array a[lecture] will return data for lecture+1 since array is zero-indexed
 **/
function step(_x,_y, lecture, student) {
	if(lecture == 19)
		return function(){
		};
	else {
		return function() {
			/*
			console.log("--- calling step for lecture: " + lecture + ", student: " + student 
				+ ", x: " + _x + ", y: " + _y + ", missing: " 
				+ eval("data_time_series_"+student)[lecture-1].missing);
			*/
	
			//move circle for this lecture
			d3.select(this).transition()
				.duration(1000)
				.delay(500)
				.attr("transform", function(d) { return "translate(" + x(_x) + "," + y(_y) + ")"; }) //recall that _x and _y are for a[lecture-1]
				.each("end", step(eval("data_time_series_"+student)[lecture].x, eval("data_time_series_"+student)[lecture].y, lecture+1, student));
				//console.log("student :: " + student + ", x :: " + _x + ", y :: " + _y + ", lecture :: " + lecture);
				
			//fade in/out circle for this lecture based on whether or not the data for it are missing
			d3.select("#the_badass_dot_"+student)
				.transition()
					.duration(500)
					.style("fill-opacity",function(d) { //if the student has missing data for this point, fade out the point
						//alert("above to fade out/in for missing for " + lecture)
						if(eval("data_time_series_"+student)[lecture-1].missing == "1")
							return 0.5;
						else
							return 0.99;
					});
					
			
		}
	}
}


/**
 * Clears the visualization area
 **/
function clearCanvas() {
	d3.selectAll(".the_badass_label")
		.transition()
			.attr("fill-opacity", 0);
					
	d3.selectAll(".dot")
		.transition()
			.duration(500)
			.attr("r", 0)
			.each("end",function() { 
				d3.select(this).remove();					
				vis.selectAll(".groupie").remove();
			});
	
	vis.selectAll(".dot")
		.transition()
			.duration(500)
			.attr("r", 0)
			.remove();
	
	vis.selectAll(".groupie").transition().duration(500).attr("width", 0).remove();
}