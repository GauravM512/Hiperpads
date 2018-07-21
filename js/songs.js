pathS = "";
gui = require('nw.gui');
fs = nw.require('fs');
pathM=gui.App.dataPath+"\\..\\..";

function openSongsPath(){
	var spawn = require('child_process').spawn,
	child     = spawn("explorer.exe", [pathM]);
}

theme = new Array();
theme["folder"] = "Unipad Real Ilusion";

selectattr = '<option>ESCOLHA UMA MÚSICA</option>';
function getSongsInfo(songFolder){
	$.get(''+pathM+'/songs/'+songFolder+'/info', function(txt) {
		songInfo = txt.match(/[^\r\n]+/g);
		for(i in songInfo){
			getSongInfoAttr = songInfo[i].split("=");
			songList[songFolder][getSongInfoAttr[0]] = getSongInfoAttr[1];
		}
		selectattr = selectattr+'<option value="'+songFolder+'">'+songList[songFolder]["title"]+'</option>';
		document.getElementById("options_song").innerHTML = selectattr;
	});
}

function updateSongs(){
	songList = new Array();
	fs.readdir(''+pathM+'/songs', (err, dirFiles) => {
		for(var i in dirFiles) {
			songList[dirFiles[i]] = new Array();
			getSongsInfo(dirFiles[i]);
		}
	});
}
updateSongs()

document.getElementById("options_song").onchange = function(){
	selected_song = this.value;
	window.location.href="pads.html?song="+encodeURI(selected_song);
}