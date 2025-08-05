//gets the path to the current directory
const fullPath = window.location.pathname;
const directoryPath = fullPath.substring(0, fullPath.lastIndexOf('/'));
//gets the images from the correct location based on the current directory
if (directoryPath == "/LHS_Cube_Club/html" || "/html") {
	src_light_mode = "../images/icon_light_mode.png";
	src_dark_mode = "../images/icon_dark_mode.png";
}
else {
	src_light_mode = "images/icon_light_mode.png";
	src_dark_mode = "images/icon_dark_mode.png";
}
//variable for keeping track of the current mode
var image = document.getElementById("dm_toggle_button");
image.src = "images/icon_light_mode.png";
dark_mode = false;
//automatically sets the websites theme to the user's preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // dark mode
	var elements = document.getElementsByClassName("dark_mode");
	for (i=0;i<elements.length;i++) {
		elements[i].classList.toggle("light_mode");
	}
	dark_mode = true;
	var image = document.getElementById("dm_toggle_button");
	image.src = src_dark_mode;
	dark_mode = true;
}
//automatically switches the websites theme if the user changes their own default theme
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    var elements = document.getElementsByClassName("dark_mode");
	for (i=0;i<elements.length;i++) {
		elements[i].classList.toggle("light_mode");
	}
});
//switches the theme upon being called
function dark_mode_toggle() {
	var elements = document.getElementsByClassName("dark_mode");
	for (i=0;i<elements.length;i++) {
		elements[i].classList.toggle("light_mode");
	}
	if (dark_mode == true) {
		var image = document.getElementById("dm_toggle_button");
		image.src = src_light_mode;
		dark_mode = false;
	}
	else {
		var image = document.getElementById("dm_toggle_button");
		image.src = src_dark_mode;
		dark_mode = true;
	}
}
