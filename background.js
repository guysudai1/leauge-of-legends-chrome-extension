var lolnexusthing = {
	id: "goto",
	title: "goto"
}
chrome.contextMenus.create(lolnexusthing);

	
	
chrome.contextMenus.onClicked.addListener(function(tab) {
	if (localStorage.length > 0) {
		hrefTo();	
	} else {
		tellUse(tab);
	}
	
});
function hrefTo() {
	var wind = window.open("http://www.lolnexus.com/" + localStorage.region + "/search?name=" + localStorage.name+"&region=" + localStorage.region);
	wind.focus(); 
}
function tellUse(tab) {
	if (document.getElementById("imJustArandomDiv") ) {
		document.getElementById("imJustArandomDiv").innerHTML = "";
	}
	var url = chrome.extension.getURL("popupMenus.html");
	var windowx = chrome.windows.create({focused: true,type: "panel", url: url, width: 300, height: 120});
	var windowId;
	chrome.windows.getCurrent( {} , (windows) => {
		console.log(windows);
		windowId = windows.id;
	});
	
	var interval = setTimeout(() => {
		chrome.tabs.get(windowId , (tab)=>{
			if (tab) {
				chrome.windows.remove(windowId);
			} else {
				clearInterval(interval);
			}
		});
		
	} , 1500);

}

