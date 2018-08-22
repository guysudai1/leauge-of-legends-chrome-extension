
var submit;
var playerChamp;
var region;
var err;

document.addEventListener('DOMContentLoaded',() => { // checking for when the DOM is loaded
	var checkboxes = document.getElementsByTagName("input"); // getting all of the inputs

    for (var j = 0; j < checkboxes.length;j++) { // looping through the inputs while checking their types
		if (checkboxes[j].type == "submit") {
			
			submit = checkboxes[j];
		} else if (checkboxes[j].type == "text") {
			
			checkboxes[j].value = localStorage.name;
			playerChamp = checkboxes[j];
		}

	}
	region = document.getElementById("selectRegion"); // getting the region selection 
	err = document.getElementById("error"); // getting the error div
	addListeners(); // calling the listeners function
});


function error(msg) { // adds an error with a message at the top of the extension
	err.innerHTML = "<h3>" + msg + "</h3>";
}
function removeErr() { // removing the error ( error that is mentioned above )
	err.innerHTML = "";
}
function regex(region) { // checking for special characters based on region of the player
	switch (region) {
		case "NA":
			return /^[0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz]{3,16}$/g;
			break;
		case "OCE":
			return /^[0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz]{3,16}$/g;
			break;
		case "EUW":
			return /^[0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzªµºÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿĄąĆćĘęıŁłŃńŒœŚśŠšŸŹźŻżŽžƒˆˇˉμﬁﬂ]{3,16}$/g;
			break;
		case "EUNE":
			return /^[0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzªµºÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿĂăĄąĆćĘęıŁłŃńŐőŒœŚśŞşŠšŢţŰűŸŹźŻżŽžƒȘșȚțˆˇˉΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩάέήίαβγδεζηθικλμνξοπρςστυφχψωόύώﬁﬂ]{3,16}$/g;
			break;
		case "BR": 
			return /^[0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÀÁÂÃÇÉÊÍÓÔÕÚàáâãçéêíóôõú]{3,16}$/g;
			break;
		case "RUS":
			return /^[regex = /[0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя]{3,16}$/g;
			break;
		case "TUR":
			return /^[ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïð 0123456789ABCDEFGĞHIİJKLMNOPQRSŞTUVWXYZabcçdefgğhıijklmnoöpqrsştuvwxyzªµºÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿıŁłŒœŠšŸŽžƒˆˇˉμﬁﬂĄąĘęÓóĆćŁłŃńŚśŹźŻż]{3,16}$/g;
			break
		case "LAT":
			return /^[0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚÜ abcdefghijklmnñopqrstuvwxyzáéíóúü]{3,16}$/g;
			break;
	}

}
function markSelection(valueX) {
	if (region != null) {
		for (var i = 0;i < region.length;i++) {
			if (region[i].value == valueX) {
				region[i].selected = true;
			}
		}	
	}
	
}
function makeStorage(champ , region) { // making the local storage
	  localStorage.name = champ;
	  localStorage.region = region;
}
function handleResponse(message) {
  console.log("Message from the background script: " + message.response);
}

function handleError(error) {
  console.log("Error: " + error);
}
function notifyBackgroundPage() {

  var sending = chrome.runtime.sendMessage({
    name: localStorage.name,
    region: localStorage.region
  });
  sending.then(handleResponse, handleError);  
}
function addListeners() { // adding listeners to the inputs
	if (localStorage.region) markSelection(localStorage.region);
	if (playerChamp != null ) {
		playerChamp.addEventListener("change" , () => {
			playerChamp.value = playerChamp.value;
		});
	}
	if (region != null) {
		region.addEventListener("change" , () => {
			region.value = region.value;
		});
	}
	
	function change() {
		playerChamp.value = playerChamp.value;
		region.value = region.value;
	}
	if (submit != null) {
		submit.addEventListener("click" , () => { // checking if the extension has been submitted
			change(); // calling the check function, definition above.
			var regexx = regex(region.value); // calling the regex function with the @param of the region's name
			if (!(regexx.test(playerChamp.value))) { // testing the player's name for special characters
				removeErr(); // removing the previous error ( if there is any )
				error("Invalid champion name, make sure your region is the region that is chosen."); // sending an error message
			} else {
				removeErr(); // removing the previous error ( if there is any )
				makeStorage(playerChamp.value , region.value); // making the local storage.d
					
				hrefTo();
			}
			
		});
	}
	
}
// setInterval(()=>{
// 	notifyBackgroundPage();
// } , 200);
function hrefTo() {
	var wind = window.open("http://www.lolnexus.com/" + region.value + "/search?name=" + playerChamp.value +"&region=" + region.value);
	wind.focus(); 
}