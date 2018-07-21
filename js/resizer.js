var gui = require('nw.gui');
var win = gui.Window.get();

var original_width  = 1280;
var original_height =  720;

function resizescreen() {
	if(fullscreen==0) {
		windowheight = window.innerHeight-23;
	} else {
		windowheight = window.innerHeight;
	}
	document.getElementById("content").style.width  = original_width+"px";
	document.getElementById("content").style.height = original_height+"px";
	width =  window.innerWidth /original_width;
	height = windowheight/original_height;
	document.getElementById("content").style.transform = "scale(" + width + ", " + height + ")";
}

window.onresize = function(event) {
	resizescreen();
}

function winclose() {
	win.close();
}
function maxmin(){
	if(maximized==0){
		if(fullscreen==0){
			win.maximize();
			maximized=1;
		}
	} else {
		if(fullscreen==0){
			maximized=0;
			win.restore();
		}
	}
}
function togglefullscreen(){
	if(fullscreen==0){
		win.enterFullscreen()
		fullscreen=1;
		document.getElementById("maxmin").style.backgroundColor = "#cccccc";
		document.getElementById("maxmin").style.borderColor = "#bbbbbb";
	} else {
		fullscreen=0;
		win.restore();
		document.getElementById("maxmin").style.backgroundColor = "";
		document.getElementById("maxmin").style.borderColor = "";
	}
	resizescreen();
}
function winminimize() {
	win.minimize();
}

win.on('maximize', function() {
	maximized = 1;
});

win.on('restore', function() {
	maximized = 0;
	fullscreen = 0;
	document.getElementById("maincontent").style.paddingTop = "25px";
});
win.on('enterfullscreen', function() {
	fullscreen = 1;
	document.getElementById("maincontent").style.paddingTop = "0px";
});

maximized = 0;
fullscreen = 0;

document.getElementById("bar").style.top = "0px";
document.getElementById("maincontent").style.paddingTop = "25px";


document.getElementById("barhover").onmouseover = function(){
	document.getElementById("bar").style.top = "0px";
	if(fullscreen==1){
		document.getElementById("maincontent").style.paddingTop = "0px";
	} else {
		document.getElementById("maincontent").style.paddingTop = "25px";
	}
}
document.getElementById("barhover").onmouseout = function(){
	if(fullscreen==1){
		if(typeof barhoverTimeout!='undefined'){
			clearTimeout(barhoverTimeout);
			document.getElementById("maincontent").style.paddingTop = "0px";
		}
		barhoverTimeout = setTimeout(function(){
			document.getElementById("bar").style.top = "-25px";
			document.getElementById("maincontent").style.paddingTop = "0px";
		}, 2000);
	} else {
		if(typeof barhoverTimeout!='undefined'){
			clearTimeout(barhoverTimeout);
		}
		document.getElementById("bar").style.top = "0px";
		document.getElementById("maincontent").style.paddingTop = "25px";
	}
}

resizescreen();