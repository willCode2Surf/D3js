function WorkOccupancy(d, t) {
	return (t + d.n) / (t + d.d);
}

function WaitOccupancy(d, t) {
	return d.n / (t + d.d);
}

function WorkOccupancyTween() {
	return function(d, i) {
		return function(t) {
			return y(WorkOccupancy(d, t));
		};
	};
}

function WaitOccupancyTween() {
	return function(d, i) {
		return function(t) {
			return y(WaitOccupancy(d, t));
		};
	};
}

function WorkStart(agent, d, call) {
	agent.attr("class", "talk");		
	d.busy = 1;
	d.n = d.talktime / call.duration;
	d.d = d.totaltime / call.duration;
	d.talktime += call.duration;
	d.totaltime += call.duration;
	agent.transition()
		.duration(speed * call.duration)
		.ease("linear")
		.attrTween("cy", WorkOccupancyTween())
		.each("end", WaitStart);
}

function WaitStart() {
	agent = d3.select(this);
	agent.attr("class", "idle");		
	d = agent.datum();
	//See if there are any calls
	d.busy = 0;
	WaitTransitionStart(agent, d);
}

function WaitTransitionStart(agent, d) {
	transitiontime = 100;
	d.n = d.talktime / transitiontime;
	d.d = d.totaltime / transitiontime;
	d.idletime += transitiontime;
	d.totaltime += transitiontime;
	agent.transition()
		.duration(speed * transitiontime)
		.ease("linear")
		.attrTween("cy", WaitOccupancyTween())
		.each("end", WaitTransitionEnd);
}

function WaitTransitionEnd() {
	agent = d3.select(this);
	d = agent,datum();
//	WaitTransitionStart(agent, d);
	
	//See if there are any calls (temporary - for testing)
	if (calls.length > 0) {
		WorkStart(agent, d, calls.shift());
	} else {
		WaitTransitionStart(agent, d);//Keep waiting
	}

}
