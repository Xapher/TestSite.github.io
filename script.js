var menuOpen = false;
var menu;
var hovers;
var x;
var openFuntion;
var opening = false;
var normalGallery = [];
var uniqueGallery = [];
var trinketGallery = [];
var body;
var MenuBar; 
function openMenu() {
	menu = document.getElementById('HiddenBar');
	hovers = document.getElementById('hover');
	x = document.getElementsByClassName("blankSpace");
	body = document.getElementById('BodyContainer');
	MenuBar = document.getElementById("MenuBar");
	if(!opening) {
		openFuntion = setInterval(smoothOpen, 10);
		opening = true;
	}
}

var closing = false;
function closeMenu() {
	if(!closing && !opening) {
		openFuntion = setInterval(smoothClose, 10);
		closing = true;
	}
}


var width = 0;
var hw = 100;
var sidew = 90;

function smoothOpen() {
	width += 0.05;
	if(width >= 1) {
		menuOpen = true;
		opening = false;
		closing = false;
		clearInterval(openFuntion);
	}
	if(!menuOpen) {
		var thw = 100 + (hw * width);
		body.style.marginLeft = (sidedif + (sidew * width)) + "px";
		menu.style.width = (sidedif + (sidew * width)) + "px";
		menu.style.opacity = width;
		hovers.style.width = thw + "px";
		document.getElementById('Logo').style.width =  thw + "px";
		for (var i = 0; i < x.length; i++) {
			x[i].style.height = thw + "px";
		}
	}
	
}

var sidedif = 45;
function smoothClose() {
	width -= 0.1;
	if(menuOpen) {
		var thw = 100 + (hw * width);
		body.style.marginLeft = (sidedif + (sidew * width)) + "px";
		menu.style.width = (sidedif + (sidew * width)) + "px";
		menu.style.opacity = width;
		hovers.style.width = thw + "px";
		document.getElementById('Logo').style.width =  thw + "px";
		for (var i = 0; i < x.length; i++) {
			x[i].style.height = thw + "px";
		}
	}
	if(width < 0) {
		width = 0;
		menuOpen = false;
		opening = false;
		closing = false;
		clearInterval(openFuntion);
	}
}



var bigPic;
var bigTimer;
function closeBig() {
	bigOpacity = 1;
	bigPic = document.getElementById("bigPicture");
	bigTimer = setInterval(smoothCloseBig, 10);
}



var bigOpacity = 1;
function smoothCloseBig() {
	bigOpacity -= 0.1;
	bigPic.style.opacity = bigOpacity;
	if(bigOpacity <= 0) {
		clearInterval(bigTimer);
		bigPic.style.display = "none";
	}
}


function openBig(argument) {
	bigPic = document.getElementById("bigPicture");
	bigOpacity = 0;
	bigPic.style.display = "block";
	document.getElementById("bigPreview").src = argument;
	bigTimer = setInterval(smoothOpenBig, 10);
	document.getElementById("bigPreview").style.maxHeight = (window.innerHeight) * 0.95 + "px";
}
function smoothOpenBig() {
	bigOpacity += 0.1;
	bigPic.style.opacity = bigOpacity;
	if(bigOpacity >= 1) {
		clearInterval(bigTimer);
	}
}




function loadImages() {
	var x = document.getElementById("images");
    var y = (x.contentWindow || x.contentDocument);
    if (y.document)y = y.document;
    y.body.style.backgroundColor = "red";
}







function hover(argument) {
	document.getElementById('hover' + argument).style.backgroundColor = "#6A4E67";
}

function unhover(argument) {
	document.getElementById('hover' + argument).style.backgroundColor = "transparent";	
}

var image;
var dir = "Assets/Gallery/";
var slideImages = ["Trinkets/Bracelets 2.jpeg", "Trinkets/Solar light 2.jpeg", "Normal/Cougar.png", "Normal/Elk.png", "Unique/IMG_8421.jpeg", "Unique/IMG_8434.jpeg"];
var fadeScript;

function MiniSlide() {
	document.getElementById("GalleryPreview").style.height = (window.innerHeight) * 0.65 + "px";
	image = document.getElementById('SlideShow');
	image.style.backgroundImage = "url(\'" + dir + slideImages[currentSlide] + "\')";
	document.getElementById('mini0').style.backgroundColor = "black";
	setTimeout(startFade, 3000);
}

function startFade() {
	fadeScript = setInterval(fadeIn, 10);
}

var currentSlide = 0;
function slideChange() {
	currentSlide++;
	if(currentSlide > 5) {
		currentSlide = 0;
	} 
	image.style.backgroundImage = "url(\'" + dir + slideImages[currentSlide] + "\')";
	if(currentSlide == 0) {
		document.getElementById('mini0').style.backgroundColor = "black";
		document.getElementById('mini5').style.backgroundColor = "white";
	}
	else {
		document.getElementById('mini' + currentSlide).style.backgroundColor = "black";
		document.getElementById('mini' + (currentSlide - 1)).style.backgroundColor = "white";
	}
}

var opacity = 1.0;
function fadeOut() {
	opacity += 0.01;
	image.style.opacity = opacity;
	if(opacity >= 1.0) {
		clearInterval(fadeScript);
		setTimeout(startFade, 3000);
	}
}

function fadeIn() {
	opacity -= 0.01;
	image.style.opacity = opacity;
	if(opacity <= 0.0) {
		clearInterval(fadeScript);
		slideChange();
		fadeScript = setInterval(fadeOut, 10);
	}
}


function createXHR() 
{
    var request = false;
        try {
            request = new ActiveXObject('Msxml2.XMLHTTP');
        }
        catch (err2) {
            try {
                request = new ActiveXObject('Microsoft.XMLHTTP');
            }
            catch (err3) {
				try {
					request = new XMLHttpRequest();
				}
				catch (err1) 
				{
					request = false;
				}
            }
        }
    return request;
}


function assignImages(fileResponse, gallery) 
{
	if(gallery.includes("normal")) {
		console.log("Normal Gallery");
		normalGallery = fileResponse.split('\r\n');
		var ngd = document.getElementById("normalGallery");
		var ngInner = "";
		for (var i = 0; i < normalGallery.length - 1; i++) {
			ngInner += "<button onclick=\"openBig(\'Assets/Gallery/Normal/" + normalGallery[i] + "\')\" class=\"GalleryButton\"><img class=\"GalleryItem\" src=\"Assets/Gallery/Normal/" + normalGallery[i] + "\"/></button>"; 
		}
		ngd.innerHTML = ngInner;
	}
	else if(gallery.includes("trinket")) {
		trinketGallery = fileResponse.split('\r\n');
		var tgd = document.getElementById("trinketGallery");
		var tgInner = "";
		for (var i = 0; i < trinketGallery.length - 1; i++) {
			tgInner += "<button onclick=\"openBig(\'Assets/Gallery/Trinkets/" + trinketGallery[i] + "\')\" class=\"GalleryButton\"><img class=\"GalleryItem\" src=\"Assets/Gallery/Trinkets/" + trinketGallery[i] + "\"/></button>"; 
		}
		tgd.innerHTML = tgInner;
	}
	else if(gallery.includes("unique")) {
		uniqueGallery = fileResponse.split('\r\n');
		var ugd = document.getElementById("uniqueGallery");
		var ugInner = "";
		for (var i = 0; i < uniqueGallery.length - 1; i++) {
			ugInner += "<button onclick=\"openBig(\'Assets/Gallery/Unique/" + uniqueGallery[i] + "\')\" class=\"GalleryButton\"><img class=\"GalleryItem\" src=\"Assets/Gallery/Unique/" + uniqueGallery[i] + "\"/></button>"; 
		}
		ugd.innerHTML = ugInner;
	}
   	return fileResponse;   
} 

function loadHTML(url, fun, storage, param, gallery)
{
	var xhr = createXHR();
	xhr.onreadystatechange=function()
	{ 
		if(xhr.readyState == 4)
		{
			assignImages(xhr.responseText, gallery);
		} 
	}; 
	xhr.open("GET", url , true);
	xhr.send(null); 
} 

function processHTML(temp, target)
{
	target.innerHTML = temp.innerHTML;
}

function loadWholePage(path, gallery)
{
	var y = document.getElementById("storage");
	var x = document.getElementById("images");
	loadHTML(path, processHTML, x, y, gallery);
}

window.onload = function() {
	loadImageGallery();
	updateGallery();
};

function loadImageGallery() {
	loadWholePage("Assets/Gallery/Normal/Images.txt","normal");
	loadWholePage("Assets/Gallery/Unique/Images.txt","unique");
	loadWholePage("Assets/Gallery/Trinkets/Images.txt","trinket");
}

var openGalleries = [0,1,2];
function addGallery(argument) {
	if(openGalleries.includes(argument)) {
		openGalleries.splice(openGalleries.indexOf(argument), 1 );
	}
	else{
		openGalleries.push(argument);
	}
	updateGallery();
}

function updateGallery() {
	//update styles based off of how many galleries are open
	var ngd = document.getElementById("normalGallery");
	var ugd = document.getElementById("uniqueGallery");
	var tgd = document.getElementById("trinketGallery");
	console.log(openGalleries);
	var width = 100 / openGalleries.length;
	if(openGalleries.includes(0)) {
		ngd.style.width = width + "%";
		ngd.style.display = "block";
	}
	else {
		ngd.style.width = "0px";
		ngd.style.display = "none";
	}
	if(openGalleries.includes(1)) {
		ugd.style.width = width + "%";	
		ugd.style.display = "block";
	}
	else {
		ugd.style.width = "0px";
		ugd.style.display = "none";
	}
	if(openGalleries.includes(2)) {
		tgd.style.width = width + "%";
		tgd.style.display = "block";
	}
	else {
		tgd.style.width = "0px";
		tgd.style.display = "none";
	}	
}


function fadeOutBig() {
	
<<<<<<< HEAD
}
=======
=======
var menuOpen = false;
var menu;
var hovers;
var x;
var openFuntion;
var opening = false;
var normalGallery = [];
var uniqueGallery = [];
var trinketGallery = [];
var body;
var MenuBar; 
function openMenu() {
	menu = document.getElementById('HiddenBar');
	hovers = document.getElementById('hover');
	x = document.getElementsByClassName("blankSpace");
	body = document.getElementById('BodyContainer');
	MenuBar = document.getElementById("MenuBar");
	if(!opening) {
		openFuntion = setInterval(smoothOpen, 10);
		opening = true;
	}
}

var closing = false;
function closeMenu() {
	if(!closing && !opening) {
		openFuntion = setInterval(smoothClose, 10);
		closing = true;
	}
}


var width = 0;
var hw = 100;
var sidew = 90;

function smoothOpen() {
	width += 0.05;
	if(width >= 1) {
		menuOpen = true;
		opening = false;
		closing = false;
		clearInterval(openFuntion);
	}
	if(!menuOpen) {
		var thw = 100 + (hw * width);
		body.style.marginLeft = (sidedif + (sidew * width)) + "px";
		menu.style.width = (sidedif + (sidew * width)) + "px";
		menu.style.opacity = width;
		hovers.style.width = thw + "px";
		document.getElementById('Logo').style.width =  thw + "px";
		for (var i = 0; i < x.length; i++) {
			x[i].style.height = thw + "px";
		}
	}
	
}

var sidedif = 45;
function smoothClose() {
	width -= 0.1;
	if(menuOpen) {
		var thw = 100 + (hw * width);
		body.style.marginLeft = (sidedif + (sidew * width)) + "px";
		menu.style.width = (sidedif + (sidew * width)) + "px";
		menu.style.opacity = width;
		hovers.style.width = thw + "px";
		document.getElementById('Logo').style.width =  thw + "px";
		for (var i = 0; i < x.length; i++) {
			x[i].style.height = thw + "px";
		}
	}
	if(width < 0) {
		width = 0;
		menuOpen = false;
		opening = false;
		closing = false;
		clearInterval(openFuntion);
	}
}



var bigPic;
var bigTimer;
function closeBig() {
	bigOpacity = 1;
	bigPic = document.getElementById("bigPicture");
	bigTimer = setInterval(smoothCloseBig, 10);
}



var bigOpacity = 1;
function smoothCloseBig() {
	bigOpacity -= 0.1;
	bigPic.style.opacity = bigOpacity;
	if(bigOpacity <= 0) {
		clearInterval(bigTimer);
		bigPic.style.display = "none";
	}
}


function openBig(argument) {
	bigPic = document.getElementById("bigPicture");
	bigOpacity = 0;
	bigPic.style.display = "block";
	document.getElementById("bigPreview").src = argument;
	bigTimer = setInterval(smoothOpenBig, 10);
	document.getElementById("bigPreview").style.maxHeight = (window.innerHeight) * 0.95 + "px";
}
function smoothOpenBig() {
	bigOpacity += 0.1;
	bigPic.style.opacity = bigOpacity;
	if(bigOpacity >= 1) {
		clearInterval(bigTimer);
	}
}




function loadImages() {
	var x = document.getElementById("images");
    var y = (x.contentWindow || x.contentDocument);
    if (y.document)y = y.document;
    y.body.style.backgroundColor = "red";
}







function hover(argument) {
	document.getElementById('hover' + argument).style.backgroundColor = "#6A4E67";
}

function unhover(argument) {
	document.getElementById('hover' + argument).style.backgroundColor = "transparent";	
}

var image;
var dir = "Assets/Gallery/";
var slideImages = ["Trinkets/Bracelets 2.jpeg", "Trinkets/Solar light 2.jpeg", "Normal/Cougar.png", "Normal/Elk.png", "Unique/IMG_8421.jpeg", "Unique/IMG_8434.jpeg"];
var fadeScript;

function MiniSlide() {
	document.getElementById("GalleryPreview").style.height = (window.innerHeight) * 0.65 + "px";
	image = document.getElementById('SlideShow');
	image.style.backgroundImage = "url(\'" + dir + slideImages[currentSlide] + "\')";
	document.getElementById('mini0').style.backgroundColor = "black";
	setTimeout(startFade, 3000);
}

function startFade() {
	fadeScript = setInterval(fadeIn, 10);
}

var currentSlide = 0;
function slideChange() {
	currentSlide++;
	if(currentSlide > 5) {
		currentSlide = 0;
	} 
	image.style.backgroundImage = "url(\'" + dir + slideImages[currentSlide] + "\')";
	if(currentSlide == 0) {
		document.getElementById('mini0').style.backgroundColor = "black";
		document.getElementById('mini5').style.backgroundColor = "white";
	}
	else {
		document.getElementById('mini' + currentSlide).style.backgroundColor = "black";
		document.getElementById('mini' + (currentSlide - 1)).style.backgroundColor = "white";
	}
}

var opacity = 1.0;
function fadeOut() {
	opacity += 0.01;
	image.style.opacity = opacity;
	if(opacity >= 1.0) {
		clearInterval(fadeScript);
		setTimeout(startFade, 3000);
	}
}

function fadeIn() {
	opacity -= 0.01;
	image.style.opacity = opacity;
	if(opacity <= 0.0) {
		clearInterval(fadeScript);
		slideChange();
		fadeScript = setInterval(fadeOut, 10);
	}
}


function createXHR() 
{
    var request = false;
        try {
            request = new ActiveXObject('Msxml2.XMLHTTP');
        }
        catch (err2) {
            try {
                request = new ActiveXObject('Microsoft.XMLHTTP');
            }
            catch (err3) {
				try {
					request = new XMLHttpRequest();
				}
				catch (err1) 
				{
					request = false;
				}
            }
        }
    return request;
}


function assignImages(fileResponse, gallery) 
{
	if(gallery.includes("normal")) {
		console.log("Normal Gallery");
		normalGallery = fileResponse.split('\r\n');
		var ngd = document.getElementById("normalGallery");
		var ngInner = "";
		for (var i = 0; i < normalGallery.length - 1; i++) {
			ngInner += "<button onclick=\"openBig(\'Assets/Gallery/Normal/" + normalGallery[i] + "\')\" class=\"GalleryButton\"><img class=\"GalleryItem\" src=\"Assets/Gallery/Normal/" + normalGallery[i] + "\"/></button>"; 
		}
		ngd.innerHTML = ngInner;
	}
	else if(gallery.includes("trinket")) {
		trinketGallery = fileResponse.split('\r\n');
		var tgd = document.getElementById("trinketGallery");
		var tgInner = "";
		for (var i = 0; i < trinketGallery.length - 1; i++) {
			tgInner += "<button onclick=\"openBig(\'Assets/Gallery/Trinkets/" + trinketGallery[i] + "\')\" class=\"GalleryButton\"><img class=\"GalleryItem\" src=\"Assets/Gallery/Trinkets/" + trinketGallery[i] + "\"/></button>"; 
		}
		tgd.innerHTML = tgInner;
	}
	else if(gallery.includes("unique")) {
		uniqueGallery = fileResponse.split('\r\n');
		var ugd = document.getElementById("uniqueGallery");
		var ugInner = "";
		for (var i = 0; i < uniqueGallery.length - 1; i++) {
			ugInner += "<button onclick=\"openBig(\'Assets/Gallery/Unique/" + uniqueGallery[i] + "\')\" class=\"GalleryButton\"><img class=\"GalleryItem\" src=\"Assets/Gallery/Unique/" + uniqueGallery[i] + "\"/></button>"; 
		}
		ugd.innerHTML = ugInner;
	}
   	return fileResponse;   
} 

function loadHTML(url, fun, storage, param, gallery)
{
	var xhr = createXHR();
	xhr.onreadystatechange=function()
	{ 
		if(xhr.readyState == 4)
		{
			assignImages(xhr.responseText, gallery);
		} 
	}; 
	xhr.open("GET", url , true);
	xhr.send(null); 
} 

function processHTML(temp, target)
{
	target.innerHTML = temp.innerHTML;
}

function loadWholePage(path, gallery)
{
	var y = document.getElementById("storage");
	var x = document.getElementById("images");
	loadHTML(path, processHTML, x, y, gallery);
}

window.onload = function() {
	loadImageGallery();
	updateGallery();
};

function loadImageGallery() {
	loadWholePage("Assets/Gallery/Normal/Images.txt","normal");
	loadWholePage("Assets/Gallery/Unique/Images.txt","unique");
	loadWholePage("Assets/Gallery/Trinkets/Images.txt","trinket");
}

var openGalleries = [0,1,2];
function addGallery(argument) {
	if(openGalleries.includes(argument)) {
		openGalleries.splice(openGalleries.indexOf(argument), 1 );
	}
	else{
		openGalleries.push(argument);
	}
	updateGallery();
}

function updateGallery() {
	//update styles based off of how many galleries are open
	var ngd = document.getElementById("normalGallery");
	var ugd = document.getElementById("uniqueGallery");
	var tgd = document.getElementById("trinketGallery");
	console.log(openGalleries);
	var width = 100 / openGalleries.length;
	if(openGalleries.includes(0)) {
		ngd.style.width = width + "%";
		ngd.style.display = "block";
	}
	else {
		ngd.style.width = "0px";
		ngd.style.display = "none";
	}
	if(openGalleries.includes(1)) {
		ugd.style.width = width + "%";	
		ugd.style.display = "block";
	}
	else {
		ugd.style.width = "0px";
		ugd.style.display = "none";
	}
	if(openGalleries.includes(2)) {
		tgd.style.width = width + "%";
		tgd.style.display = "block";
	}
	else {
		tgd.style.width = "0px";
		tgd.style.display = "none";
	}	
}


function fadeOutBig() {
	
}
>>>>>>> 283e0d50f1e5277c64e8251b14497fe982967be8
