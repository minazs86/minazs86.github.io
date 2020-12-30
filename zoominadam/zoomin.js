function zoomin(x) {
	x.height=x.height*2;
	x.width=x.width*2;
	x.style.zIndex = 2;
}

function zoomout(x) {
	x.height=x.height/2;
	x.width=x.width/2;
	x.style.zIndex = 1;
}