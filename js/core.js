function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
}
urlsong = decodeURI(getUrlVars()["song"]);
urlskin = decodeURI(getUrlVars()["skin"]);

pathS = "";


var gui = require('nw.gui');
pathM=gui.App.dataPath+"\\..\\..";

theme = new Array();
//theme["folder"] = "Unipad S Skin";
//theme["folder"] = "Unipad Real Ilusion";
//theme["folder"] = "Syberteky S Shadow 1.0.0_1";
//theme["folder"] = "Unipad TV - 3D mod With Led on Chain";

if(urlskin=='undefined'){
	theme["folder"] = "Siber VIP Skin 1.0.0_1";
}

$.getScript('./skins/'+theme["folder"]+'/script.js');

//HTMLPADS
htmlpadsinner = "";
for (y = 1; y <= 8; y++) {
	for (x = 1; x <= 8; x++) {
		if(x<=4&&y<=4){
			if(x==4&&y==4){
				var thebutton = "phantom_";
			} else {
				var thebutton = "phantom";
			}
			var style = "transform: rotate(0deg)";
		} else if (x>=5&&y<=4){
			if (x==5&&y==4){
				var thebutton = "phantom_";
			} else {
				var thebutton = "phantom";
			}
			var style = "transform: rotate(90deg)";
		} else if (x<=4&&y>=5){
			if (x==4&&y==5){
				var thebutton = "phantom_";
			} else {
				var thebutton = "phantom";
			}
			var style = "transform: rotate(270deg)";
		} else if (x>=5&&y>=5){
			if (x==5&&y==5){
				var thebutton = "phantom_";
			} else {
				var thebutton = "phantom";
			}
			var style = "transform: rotate(180deg)";
		}
		htmlpadsinner = htmlpadsinner+'<div style="background-color:#cccccc;" class="pad" id="pad" data-x="'+x+'" data-y="'+y+'"><img style="'+style+'" src="'+pathS+'/skins/'+theme["folder"]+'/'+thebutton+'.png"></img></div>';
	}
}
tab = 0;
document.getElementById("htmlpads").innerHTML = htmlpadsinner;

//HTMLCHAIN
htmlchainsinner = "";
for (y = 1; y <= 8; y++) {
	if(y==1){
		htmlchainsinner = htmlchainsinner+'<div class="chain" id="chain" data-chain="'+y+'"><img id="chain_'+y+'" src="'+pathS+'/skins/'+theme["folder"]+'/chain_.png"></img></div>';
	} else {
		htmlchainsinner = htmlchainsinner+'<div class="chain" id="chain" data-chain="'+y+'"><img id="chain_'+y+'" src="'+pathS+'/skins/'+theme["folder"]+'/chain.png"></img></div>';
	}
}
document.getElementById("htmlchains").innerHTML = htmlchainsinner;


fs = nw.require('fs');
keyledrepeat  = new Array();
keySongRepeat = new Array();
autoplay = false;
$('#theme_background').css("background-image", "url('"+pathS+"/skins/"+theme["folder"]+"/playbg.png')");
chain = "1";

function resetRepeats(){
	for(var x=1;x<=8;x++){
		for(var y=1;y<=8;y++){
			keyledrepeat[x+" "+y] = -1;
			keySongRepeat[x+" "+y] = -1;
		}
	}
}

function blurAll(){
 var tmp = document.createElement("input");
 document.body.appendChild(tmp);
 tmp.focus();
 document.body.removeChild(tmp);
}

function colorAll(color){
	for(var x=1;x<=8;x++){
		for(var y=1;y<=8;y++){
			$("div[class='pad'][data-x='"+x+"'][data-y='"+y+"']").css("background-color", colorList[color]);
		}
	}
	for(var y=1;y<=8;y++){
		$("div[class='chain'][data-chain='"+y+"']").css("background-color", colorList[color]);
	}
}
function removeAprenderColor(){
	for(var x=1;x<=8;x++){
		for(var y=1;y<=8;y++){
			$('div[class="pad"][data-x="'+x+'"][data-y="'+y+'"]').css('box-shadow', 'none');
		}
	}
	for(var y=1;y<=8;y++){
		$("div[class='chain'][data-chain='"+y+"']").css('box-shadow', 'none');
	}
}

resetRepeats();
$('.chain').click(function(event) {
	changeChain($(this).data('chain'));
});

function changeChain(newchain){
	if(aprenderButton=="chain"+newchain){
		$('#chain_'+newchain).attr("src", ""+pathS+"/skins/"+theme["folder"]+"/chain.png");
		aprenderFunction(aprenderPosition+1);
	}
	if(fakeplay==true){
		if(fakeplayButtonType=="c"){
			var newchain = fakeplayButtonC;
			fakeplayButtonX = 0;
			fakeplayButtonY = 0;
			fakeplayButtonC = 0;
			fakeplayFunction(fakeplayPosition+1);
		} else {
			clickButton(fakeplayButtonX, fakeplayButtonY);
			return;
		}
	}
	for(var y=1;y<=8;y++){
		$('#chain_'+y).attr("src", ""+pathS+"/skins/"+theme["folder"]+"/chain.png");
		$("div[class='chain'][data-chain='"+y+"']").css("background-color", $("div[class='pad'][data-x=8][data-y='"+y+"']").css("background-color"));

	}
	chain = newchain;
	$('#chain_'+chain).attr("src", ""+pathS+"/skins/"+theme["folder"]+"/chain_.png");
	$("div[class='chain'][data-chain='"+chain+"']").css("background-color", $("div[class='pad'][data-x=8][data-y='"+chain+"']").css("background-color"));
	resetRepeats();
}

$('.pad').click(function(event) {
	var x = $(this).data('x');
	var y = $(this).data('y');
	clickButton(x, y);
});

function changeAudioVolume(volume) {
	audioVolume = volume;
	if(typeof songpart!='undefined'){
		for (buttonname in songpart) {
			songpart[buttonname].volume = audioVolume;
		}
	}
}

function clickButton(x, y){
	//keySongRepeat[x+" "+y] = 0;
	if(aprenderButton=="button"+x+" "+y){
		$('div[class="pad"][data-x="'+x+'"][data-y="'+y+'"]').css('box-shadow', 'none');
		aprenderFunction(aprenderPosition+1);
	}
	if(fakeplay==true){
		if(fakeplayButtonType=="o"){
			x = fakeplayButtonX;
			y = fakeplayButtonY;
			fakeplayButtonX = 0;
			fakeplayButtonY = 0;
			fakeplayButtonC = 0;
			fakeplayFunction(fakeplayPosition+1);
		} else {
			changeChain(fakeplayButtonC);
			return;
		}
	}
	keySongRepeat[x+" "+y]++;
	keySongOrder=keySongRepeat[x+" "+y];
	if(typeof keySound[chain+" "+y+" "+x+" "+keySongOrder]=='undefined'){
		keySongRepeat[x+" "+y] = 0;
		keySongOrder=0;
	}
	var buttonname = chain+" "+y+" "+x+" "+keySongOrder;
	if(typeof keySound[buttonname]!=='undefined') {
		if(typeof songpart[buttonname]=='undefined'){
			songpart[buttonname] = new Audio(""+pathM+"/songs/"+selected_song+"/Sounds/"+keySound[buttonname]);
		}
		songpart[buttonname].currentTime = 0;
		songpart[buttonname].volume = audioVolume;
		songpart[buttonname].play();
	}
	if($('#options_led').is(':checked')){
		keyledrepeat[x+" "+y]++;
		keyledorder=keyledrepeat[x+" "+y];
		if(typeof keyLed[chain+" "+y+" "+x+" "+keyledorder]=='undefined'){
			keyledrepeat[x+" "+y] = 0;
			keyledorder = 0;
		}
		ledeffect(chain, y, x, keyledorder, 0);
	}
}

function options_led(){
	if($('#options_led').is(':checked')){
		$('label[for="options_led"]').css('background-color', '#ff0000');
		colorAll(0);
	} else {
		$('label[for="options_led"]').css('background-color', '#00ff00');
	}
}
function options_autoplay(){
	if($('#options_autoplay').is(':checked')){
		$('label[for="options_autoplay"]').css('background-color', '#ff0000');
		$('input[id="autoplay_range"]').css('display','none');
		autoplay = false;
		if(typeof autoPlayFunctionTimeout !== "undefined"){
			clearTimeout(autoPlayFunctionTimeout);
		}
		if(aprender==true){
			$('div[id=fakeplayDiv]').css('display', 'none');
		} else {
			$('div[id=fakeplayDiv]').css('display', 'inline');
		}
		$('div[id=aprenderDiv]').css('display', 'inline');
	} else {
		$('label[for="options_autoplay"]').css('background-color', '#00ff00');
		$('input[id="autoplay_range"]').css('display','inline');
		colorAll(0);
		autoplay = true;
		autoPlayFunction(0);
		fakeplay = false;
		$('div[id=fakeplayDiv]').css('display', 'none');
		if(aprender==true){
			$('div[id=aprenderDiv]').css('display', 'inline');
		} else {
			$('div[id=aprenderDiv]').css('display', 'none');
		}
	}
}
function options_aprender(){
	if($('#options_aprender').is(':checked')){
		$('label[for="options_aprender"]').css('background-color', '#ff0000');
		$('input[id="aprender_range"]').css('display','none');
		aprender = false;
		for(var x=1;x<=8;x++){
			for(var y=1;y<=8;y++){
				$("div[class='pad'][data-x='"+x+"'][data-y='"+y+"']").css("box-shadow", "none");
			}
		}
		$('div[id=fakeplayDiv]').css('display', 'inline');
		if(autoplay==true){
			$('div[id=aprenderDiv]').css('display', 'none');
			$('div[id=fakeplayDiv]').css('display', 'none');
		} else {
			$('div[id=fakeplayDiv]').css('display', 'inline');
		}
	} else {
		$('label[for="options_aprender"]').css('background-color', '#00ff00');
		$('input[id="aprender_range"]').css('display','inline');
		colorAll(0);
		aprender = true;
		aprenderFunction(0);
		fakeplay = false;
		$('div[id=fakeplayDiv]').css('display', 'none');
	}
}

function options_fakeplay(){
	if($('#options_fakeplay').is(':checked')){
		$('label[for="options_fakeplay"]').css('background-color', '#ff0000');
		$('input[id="fakeplay_range"]').css('display','none');
		fakeplay = false;
		for(var x=1;x<=8;x++){
			for(var y=1;y<=8;y++){
				$("div[class='pad'][data-x='"+x+"'][data-y='"+y+"']").css("box-shadow", "none");
			}
		}
		$('div[id=aprenderDiv]').css('display', 'inline');
		$('div[id=autoplayDiv]').css('display', 'inline');
	} else {
		$('label[for="options_fakeplay"]').css('background-color', '#00ff00');
		$('input[id="fakeplay_range"]').css('display','inline');
		fakeplay = true;
		fakeplayFunction(0);
		colorAll(0);
		aprender = false;
		$('div[id=aprenderDiv]').css('display', 'none');
		autoplay = false;
		$('div[id=autoplayDiv]').css('display', 'none');
	}
}

function options_replay(){
	if($('#options_replay').is(':checked')){
		$('label[for="options_replay"]').css('background-color', '#ff0000');
		$('input[id="replay_range"]').css('display','none');
		replay = false;
	} else {
		$('label[for="options_replay"]').css('background-color', '#00ff00');
		$('input[id="replay_range"]').css('display','inline');
		replay = true;
	}
}


function createHiperPads(){
	selected_song = urlsong;
	songpart = new Array();
	aprenderPosition = 0;
	aprenderButton = 0;
	fakeplayPosition = 0;
	fakeplayButtonC = 0;
	fakeplayButtonX = 0;
	fakeplayButtonY = 0;
	changeChain(1);
	document.getElementById('title').innerHTML = "HiperPads v2.0 - "+selected_song;
	document.getElementById('options_autoplay').checked = false;
	$('label[for="options_autoplay"]').css('background-color', '#ff0000');
	autoplay = false;
	document.getElementById('options_aprender').checked = false;
	$('label[for="options_aprender"]').css('background-color', '#ff0000');
	aprender = false;
	document.getElementById('options_fakeplay').checked = false;
	$('label[for="options_fakeplay"]').css('background-color', '#ff0000');
	fakeplay = false;
	document.getElementById('options_replay').checked = false;
	$('label[for="options_replay"]').css('background-color', '#ff0000');
	replay = false;
	if(typeof autoPlayFunctionTimeout !== "undefined"){
		clearTimeout(autoPlayFunctionTimeout);
	}
	colorAll(0);
	removeAprenderColor();
	createKeySound();
	document.getElementById("loading").style.display = "none";
	blurAll();
}
function ledeffect(vchain, x, y, keyledorder, ledposition){
	if(typeof keyLed[vchain+" "+x+" "+y+" "+keyledorder]!='undefined'){
		if(typeof keyLed[vchain+" "+x+" "+y+" "+keyledorder][ledposition]!='undefined'){
			if(typeof keyLed[vchain+" "+x+" "+y+" "+keyledorder][ledposition][0]!='undefined'){
				if(keyLed[vchain+" "+x+" "+y+" "+keyledorder][ledposition][0]=="o"){
					var thisY = keyLed[vchain+" "+x+" "+y+" "+keyledorder][ledposition][1];
					var thisX = keyLed[vchain+" "+x+" "+y+" "+keyledorder][ledposition][2];
					var thisColor = keyLed[vchain+" "+x+" "+y+" "+keyledorder][ledposition][4];
					if(typeof colorList[thisColor]=='undefined'){
						thisColor = "#"+thisColor;
					} else {
						thisColor = colorList[thisColor];
					}
					$("div[class='pad'][data-x='"+thisX+"'][data-y='"+thisY+"']").css("background-color", thisColor);
					if(thisX==8){
						$("div[class='chain'][data-chain='"+thisY+"']").css("background-color", thisColor);
					}
					ledeffect(vchain, x, y, keyledorder, ledposition+1);
				} else if(keyLed[vchain+" "+x+" "+y+" "+keyledorder][ledposition][0]=="f"){
					var thisY = keyLed[vchain+" "+x+" "+y+" "+keyledorder][ledposition][1];
					var thisX = keyLed[vchain+" "+x+" "+y+" "+keyledorder][ledposition][2];
					thisColor = colorList[0];
					$("div[class='pad'][data-x='"+thisX+"'][data-y='"+thisY+"']").css("background-color", thisColor);
					if(thisX==8){
						$("div[class='chain'][data-chain='"+thisY+"']").css("background-color", thisColor);
					}
					ledeffect(vchain, x, y, keyledorder, ledposition+1);
				} else if(keyLed[vchain+" "+x+" "+y+" "+keyledorder][ledposition][0]=="d"){
					setTimeout(function(){
						ledeffect(vchain, x, y, keyledorder, ledposition+1);
					}, keyLed[vchain+" "+x+" "+y+" "+keyledorder][ledposition][1]);
				}
			}
		}
	}
}

function autoPlayFunction(position){
	if(autoplay==true){
		if(position<autoPlay.length){
			document.getElementById("autoplay_range").max=autoPlay.length;
			document.getElementById("autoplay_range").value=position;
			if(autoPlay[position][0]=="c"){
				changeChain(autoPlay[position][1]);
				autoPlayFunction(position+1);
			} else if(autoPlay[position][0]=="d"){
				autoPlayFunctionTimeout = setTimeout(function(){
					autoPlayFunction(position+1);
				}, autoPlay[position][1]);
			} else if(autoPlay[position][0]=="f"){
				autoPlayFunction(position+1);
			} else if(autoPlay[position][0]=="o"){
				clickButton(autoPlay[position][2], autoPlay[position][1]);
				autoPlayFunction(position+1);
			} else {
				autoPlayFunction(position+1);
			}
		} else {
			document.getElementById('options_autoplay').checked = false;
			$('label[for="options_autoplay"]').css('background-color', '#ff0000');
			autoplay = false;
			if(replay==true){
				autoplay = true;
				autoPlayFunction(0);
				document.getElementById('options_autoplay').checked = true;
				$('label[for="options_autoplay"]').css('background-color', '#00ff00');
				$('input[id="autoplay_range"]').css('display','inline');
			}
		}
	} else {
		document.getElementById('options_autoplay').checked = false;
		$('label[for="options_autoplay"]').css('background-color', '#ff0000');
		autoplay = false;
		if(replay==true){
			autoplay = true;
			autoPlayFunction(0);
			document.getElementById('options_autoplay').checked = true;
			$('label[for="options_autoplay"]').css('background-color', '#00ff00');
			$('input[id="autoplay_range"]').css('display','inline');
		}
	}
}


function aprenderFunction(position, color){
	if(aprender==true){
		if(position<autoPlay.length){
			document.getElementById("aprender_range").max=autoPlay.length;
			document.getElementById("aprender_range").value=position;
			if(autoPlay[position][0]=="c"){
				RecommendChangeChain(autoPlay[position][1]);
				aprenderPosition = position;
				aprenderButton = "chain"+autoPlay[position][1];
			} else if(autoPlay[position][0]=="d"){
				aprenderFunction(position+1);
			} else if(autoPlay[position][0]=="f"){
				aprenderFunction(position+1);
			} else if(autoPlay[position][0]=="o"){
				recommendButtons(position);
				RecommendClickButton(autoPlay[position][2], autoPlay[position][1],0);
				aprenderPosition = position;
				aprenderButton = "button"+autoPlay[position][2]+" "+autoPlay[position][1];
			} else {
				aprenderFunction(position+1);
			}
		} else {
			document.getElementById('options_aprender').checked = false;
			$('label[for="options_aprender"]').css('background-color', '#ff0000');
			aprender = false;
		}
	} else {
		document.getElementById('options_aprender').checked = false;
		$('label[for="options_aprender"]').css('background-color', '#ff0000');
		aprender = false;
	}
}

function recommendButtons(position){
	var i = 1;
	while(position<=autoPlay.length+1 && autoPlay[position+i][0]!="o") {
		i++;
	}
	if(autoPlay[position+i][0]=="o"){
		RecommendClickButton(autoPlay[position+i][2], autoPlay[position+i][1],1);
	}
	i++;
	while(position<=autoPlay.length+2 && autoPlay[position+i][0]!="o") {
		i++;
	}
	if(autoPlay[position+i][0]=="o"){
		RecommendClickButton(autoPlay[position+i][2], autoPlay[position+i][1],2);
	}
}

function fakeplayFunction(position, color){
	if(fakeplay==true){
		if(position<autoPlay.length){
			document.getElementById("fakeplay_range").max=autoPlay.length;
			document.getElementById("fakeplay_range").value=position;
			if(autoPlay[position][0]=="c"){
				fakeplayPosition = position;
				fakeplayButtonType = "c";
				fakeplayButtonC = autoPlay[position][1];
			} else if(autoPlay[position][0]=="d"){
				fakeplayFunction(position+1);
			} else if(autoPlay[position][0]=="f"){
				fakeplayFunction(position+1);
			} else if(autoPlay[position][0]=="o"){
				fakeplayPosition = position;
				fakeplayButtonType = "o";
				fakeplayButtonX = autoPlay[position][2];
				fakeplayButtonY = autoPlay[position][1];
			} else {
				fakeplayFunction(position+1);
			}
		} else {
			document.getElementById('options_fakeplay').checked = false;
			$('label[for="options_fakeplay"]').css('background-color', '#ff0000');
			fakeplay = false;
		}
	} else {
		document.getElementById('options_fakeplay').checked = false;
		$('label[for="options_fakeplay"]').css('background-color', '#ff0000');
		fakeplay = false;
	}
}

function RecommendChangeChain(newchain){
	$('#chain_'+newchain).attr("src", ""+pathS+"/skins/"+theme["folder"]+"/chain__.png");
}


function RecommendClickButton(x, y, color){
	if(color==0){
		var colorR = 0;
		var colorG = 255;
		var colorB = 0;
		var opacity = 1;
	} else if(color==1){
		var colorR = 255;
		var colorG = 255;
		var colorB = 0;
		var opacity = 0.45;
	} else if(color==2){
		var colorR = 255;
		var colorG = 0;
		var colorB = 0;
		var opacity = 0.15;
	}
	$("div[class='pad'][data-x='"+x+"'][data-y='"+y+"']").css('box-shadow', 'rgba('+colorR+', '+colorG+', '+colorB+', '+opacity+') 0px 0px 0px 10px inset');
}

function createKeyLedContent(dirFile){ 
	$.get(''+pathM+'/songs/'+selected_song+'/keyLED/'+dirFile, function(txt) {
		var linesSpace = dirFile.split(" ");
		if(typeof tempKeyLed[linesSpace[0]+" "+linesSpace[1]+" "+linesSpace[2]]=='undefined'){
			var keyLedKey = linesSpace[0]+" "+linesSpace[1]+" "+linesSpace[2]+" "+0;
			tempKeyLed[linesSpace[0]+" "+linesSpace[1]+" "+linesSpace[2]] = 0;
		} else {
			tempKeyLed[linesSpace[0]+" "+linesSpace[1]+" "+linesSpace[2]] = tempKeyLed[linesSpace[0]+" "+linesSpace[1]+" "+linesSpace[2]]+1;
			var keyLedKey = linesSpace[0]+" "+linesSpace[1]+" "+linesSpace[2]+" "+tempKeyLed[linesSpace[0]+" "+linesSpace[1]+" "+linesSpace[2]];
		}
		keyLed[keyLedKey] = new Array();
		var lines = txt.match(/[^\r\n]+/g);
		for(var ii in lines){
			keyLed[keyLedKey][ii] = new Array();
			var linesSpaceFile = lines[ii].split(" ");
			if(linesSpaceFile[0]=="o" || linesSpaceFile[0]=="on"){
				keyLed[keyLedKey][ii].push("o");
				keyLed[keyLedKey][ii].push(linesSpaceFile[1]);
				keyLed[keyLedKey][ii].push(linesSpaceFile[2]);
				keyLed[keyLedKey][ii].push("a");
				if(linesSpaceFile[3]=="a" || linesSpaceFile[3]=="auto"){
					keyLed[keyLedKey][ii].push(linesSpaceFile[4]);
				} else {
					keyLed[keyLedKey][ii].push(linesSpaceFile[3]);
				}
			} else if(linesSpaceFile[0]=="f" || linesSpaceFile[0]=="off"){
				keyLed[keyLedKey][ii].push("f");
				keyLed[keyLedKey][ii].push(linesSpaceFile[1]);
				keyLed[keyLedKey][ii].push(linesSpaceFile[2]);
			} else if(linesSpaceFile[0]=="d" || linesSpaceFile[0]=="delay"){
				keyLed[keyLedKey][ii].push("d");
				keyLed[keyLedKey][ii].push(linesSpaceFile[1]);
			}
		}
	});
}
function createKeyLed(){
	fs.readdir(''+pathM+'/songs/'+selected_song+'/keyLED', (err, dirFiles) => {
		keyLed = new Array();
		tempKeyLed = new Array();
		for(var i in dirFiles) {
			createKeyLedContent(dirFiles[i]);
		}
	});
}


function createKeySound(){
	keySound = new Array();
	var tempKeySoundRepeat = new Array();
	$.get(''+pathM+'/songs/'+selected_song+'/keySound', function(fileContent) {
		var lines = fileContent.match(/[^\r\n]+/g);
		for(var i in lines){
			var linesSpace = lines[i].split(" ");
			if(typeof keySound[linesSpace[0]+" "+linesSpace[1]+" "+linesSpace[2]+" "+0] == 'undefined'){
				tempKeySoundRepeat[linesSpace[0]+" "+linesSpace[1]+" "+linesSpace[2]] = 0;
				keySound[linesSpace[0]+" "+linesSpace[1]+" "+linesSpace[2]+" "+0] = linesSpace[3];
			} else {
				tempKeySoundRepeat[linesSpace[0]+" "+linesSpace[1]+" "+linesSpace[2]] = tempKeySoundRepeat[linesSpace[0]+" "+linesSpace[1]+" "+linesSpace[2]]+1;
				keySound[linesSpace[0]+" "+linesSpace[1]+" "+linesSpace[2]+" "+tempKeySoundRepeat[linesSpace[0]+" "+linesSpace[1]+" "+linesSpace[2]]] = linesSpace[3];
			}
		}
	}, 'text');
	createKeyLed();
	createAutoPlay();
}

function createAutoPlay(){
	autoPlay = new Array();
	$.get(''+pathM+'/songs/'+selected_song+'/autoplay', function(fileContent) {
		var lines = fileContent.match(/[^\r\n]+/g);
		for(var i in lines){
			var linesSpace = lines[i].split(" ");
			autoPlay[i] = new Array();
			if(linesSpace[0]=="chain"||linesSpace[0]=="c"){
				autoPlay[i] = new Array("c", linesSpace[1]);
			} else if(linesSpace[0]=="delay"||linesSpace[0]=="d"){
				autoPlay[i] = new Array("d", linesSpace[1]);
			} else if(linesSpace[0]=="on"||linesSpace[0]=="o"||linesSpace[0]=="touch"||linesSpace[0]=="t"){
				autoPlay[i] = new Array("o", linesSpace[1], linesSpace[2]);
			} else if(linesSpace[0]=="off"||linesSpace[0]=="f"){
				autoPlay[i] = new Array("f", linesSpace[1], linesSpace[2]);
			}
		}
	}, 'text');
}

colorList = new Array();
colorList.push("#888888");
colorList.push("#CDD5E0");
colorList.push("#DEE2E9");
colorList.push("#FAFAFA");
colorList.push("#F8BBD0");
colorList.push("#EF5350");
colorList.push("#E57373");
colorList.push("#EF9A9A");
colorList.push("#FFF3E0");
colorList.push("#FFA726");
colorList.push("#FFB960");
colorList.push("#FFCC80");
colorList.push("#FFE0B2");
colorList.push("#FFEE58");
colorList.push("#FFF59D");
colorList.push("#FFF9C4");
colorList.push("#DCEDC8");
colorList.push("#8BC34A");
colorList.push("#AED581");
colorList.push("#BFDF9F");
colorList.push("#5EE2B0");
colorList.push("#00CE3C");
colorList.push("#00BA43");
colorList.push("#119C3F");
colorList.push("#57ECC1");
colorList.push("#00E864");
colorList.push("#00E05C");
colorList.push("#00D545");
colorList.push("#7AFDDD");
colorList.push("#00E4C5");
colorList.push("#00E0B2");
colorList.push("#01EEC6");
colorList.push("#49EFEF");
colorList.push("#00E7D8");
colorList.push("#00E5D1");
colorList.push("#01EFDE");
colorList.push("#6ADDFF");
colorList.push("#00DAFE");
colorList.push("#01D6FF");
colorList.push("#08ACDC");
colorList.push("#73CEFE");
colorList.push("#0D9BF7");
colorList.push("#148DE4");
colorList.push("#2A77C9");
colorList.push("#8693FF");
colorList.push("#2196F3");
colorList.push("#4668F6");
colorList.push("#4153DC");
colorList.push("#B095FF");
colorList.push("#8453FD");
colorList.push("#634ACD");
colorList.push("#5749C5");
colorList.push("#FFB7FF");
colorList.push("#E863FB");
colorList.push("#D655ED");
colorList.push("#D14FE9");
colorList.push("#FC99E3");
colorList.push("#E736C2");
colorList.push("#E52FBE");
colorList.push("#E334B6");
colorList.push("#ED353E");
colorList.push("#FFA726");
colorList.push("#F4DF0B");
colorList.push("#8BC34A");
colorList.push("#5CD100");
colorList.push("#00D29E");
colorList.push("#2388FF");
colorList.push("#3669FD");
colorList.push("#00B4D0");
colorList.push("#475CDC");
colorList.push("#EFF0F3");
colorList.push("#E9EBF0");
colorList.push("#F72737");
colorList.push("#D2EA7B");
colorList.push("#C8DF10");
colorList.push("#7FE422");
colorList.push("#00C931");
colorList.push("#00D7A6");
colorList.push("#00D8FC");
colorList.push("#0B9BFC");
colorList.push("#585CF5");
colorList.push("#AC59F0");
colorList.push("#D980DC");
colorList.push("#B8814A");
colorList.push("#FF9800");
colorList.push("#ABDF22");
colorList.push("#9EE154");
colorList.push("#66BB6A");
colorList.push("#3BDA47");
colorList.push("#6FDEB9");
colorList.push("#27DBDA");
colorList.push("#9CC8FD");
colorList.push("#79B8F7");
colorList.push("#AFAFEF");
colorList.push("#D580EB");
colorList.push("#F74FCA");
colorList.push("#EA8A1F");
colorList.push("#DBDB08");
colorList.push("#9CD60D");
colorList.push("#F3D335");
colorList.push("#C8AF41");
colorList.push("#00CA69");
colorList.push("#24D2B0");
colorList.push("#757EBE");
colorList.push("#5388DB");
colorList.push("#E5C5A6");
colorList.push("#E93B3B");
colorList.push("#F9A2A1");
colorList.push("#ED9C65");
colorList.push("#E1CA72");
colorList.push("#B8DA78");
colorList.push("#98D52C");
colorList.push("#626CBD");
colorList.push("#CAC8A0");
colorList.push("#90D4C2");
colorList.push("#CEDDFE");
colorList.push("#BECCF7");
colorList.push("#C1CBD9");
colorList.push("#CDD5E0");
colorList.push("#DEE2E9");
colorList.push("#FE1624");
colorList.push("#CD2724");
colorList.push("#9CCC65");
colorList.push("#009C1B");
colorList.push("#FFFF00");
colorList.push("#BEB212");
colorList.push("#F5D01D");
colorList.push("#E37829");
colorList.push("#000000");
colorAll(0);

function configKeyboardButtonT0(s) {
	var defaultjson = '{"49":"o 1 1","50":"o 1 2","51":"o 1 3","52":"o 1 4","53":"o 1 5","54":"o 1 6","55":"o 1 7","56":"o 1 8","81":"o 2 1","87":"o 2 2","69":"o 2 3","82":"o 2 4","84":"o 2 5","89":"o 2 6","85":"o 2 7","73":"o 2 8","65":"o 3 1","83":"o 3 2","68":"o 3 3","70":"o 3 4","71":"o 3 5","72":"o 3 6","74":"o 3 7","75":"o 3 8","90":"o 4 1","88":"o 4 2","67":"o 4 3","86":"o 4 4","66":"o 4 5","78":"o 4 6","77":"o 4 7","188":"o 4 8"}';
	if(s!=="silent"){
		var json = window.prompt('Digite abaixo o JSON para o Tab0', defaultjson);
		alert('O JSON para o Tab0 foi salvo.');
	} else {
		var json = defaultjson;
	}
	if(json==""){
		var json = defaultjson;
	}
	configKeyboard0 = JSON.parse(json);
}
function configKeyboardButtonT1(s) {
	defaultjson = '{"49":"o 5 1","50":"o 5 2","51":"o 5 3","52":"o 5 4","53":"o 5 5","54":"o 5 6","55":"o 5 7","56":"o 5 8","81":"o 6 1","87":"o 6 2","69":"o 6 3","82":"o 6 4","84":"o 6 5","89":"o 6 6","85":"o 6 7","73":"o 6 8","65":"o 7 1","83":"o 7 2","68":"o 7 3","70":"o 7 4","71":"o 7 5","72":"o 7 6","74":"o 7 7","75":"o 7 8","90":"o 8 1","88":"o 8 2","67":"o 8 3","86":"o 8 4","66":"o 8 5","78":"o 8 6","77":"o 8 7","188":"o 8 8"}';
	if(s!=="silent"){
		var json = window.prompt('Digite abaixo o JSON para o Tab1', defaultjson);
		alert('O JSON para o Tab1 foi salvo.');
	} else {
		var json = defaultjson;
	}
	if(json==""){
		var json = defaultjson;
	}
	configKeyboard1 = JSON.parse(json);

}
function configKeyboardButtonT0_1(s) {
	defaultjson = '{"96":"c 1","97":"c 1","98":"c 2","99":"c 3","100":"c 4","101":"c 5","102":"c 6","103":"c 7","104":"c 8","105":"c 8"}';
	if(s!=="silent"){
		var json = window.prompt('Digite abaixo o JSON constante', defaultjson);
		alert('O JSON constante foi salvo.');
	} else {
		var json = defaultjson;
	}
	if(json==""){
		var json = defaultjson;
	}
	configKeyboard0_1 = JSON.parse(json);

}
configKeyboardButtonT0("silent");
configKeyboardButtonT1("silent");
configKeyboardButtonT0_1("silent");

var keysdown = {};

$(document).bind("keydown",function(e){
	if(!(e.key in keysdown)) {
		keysdown[e.key] = true;
		blurAll();
		if(e.keyCode==9){
			if(tab==0){
				tab=1;
			} else {
				tab=0;
			}
		} else {
			keydown = ""+e.keyCode;
			if(tab==0){
				keyPressed = configKeyboard0[keydown];
			} else {
				keyPressed = configKeyboard1[keydown];
			}
			if(typeof keyPressed=='undefined'){
				keyPressed = configKeyboard0_1[keydown];
			}
			if(typeof keyPressed!='undefined'){
				keyPressed = keyPressed.split(" ");
				if(keyPressed[0]=="o"||keyPressed[0]=="on"||keyPressed[0]=="t"||keyPressed[0]=="touch"){
					clickButton(keyPressed[2], keyPressed[1]);
				} else if(keyPressed[0]=="c"||keyPressed[0]=="chain") {
					changeChain(keyPressed[1]);
				}
			}
		}
	}
});
$(document).bind("keyup",function(e){
	delete keysdown[e.key];
});

fakeplay = false;
changeAudioVolume(1);
createHiperPads();
