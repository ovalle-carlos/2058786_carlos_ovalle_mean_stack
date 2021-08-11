function displayData(){
	alert("we in");
	document.getElementById("addHere").innerHTML += document.getElementById("title").value + "<br />";
	document.getElementById("addHere").innerHTML += document.getElementById("article").value+ "<br />";
	document.getElementById("addHere").innerHTML += document.getElementById("image").value+ "<br />" ;
}