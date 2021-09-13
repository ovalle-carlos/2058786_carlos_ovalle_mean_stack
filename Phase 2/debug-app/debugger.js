let stdNames = ["Raj", "Seeta", "Reeta", "Meeta", "Veeta"];

var data = new Array();

function updateArraySize(){
	document.getElementById("cartSize").innerHTML="New Cart Size: " + data.length;
}

function getData(){
    var str = localStorage.getItem("localData");
    if (str!= null)
        data = JSON.parse(str);
}

function addToCart(product_name, price){
	getData();
	data.push({name:product_name,costs:price});
	localStorage.setItem("localData",JSON.stringify(data));
	updateArraySize();
}


function displayData() {
	getData();
	let table = `<table border=1>
                            	<tr>
                                	<th>Name</th>
                                	<th>Cost</th>
                            	</tr>
                            	`;
    var total = 0;                        	
	for(var i = 0; i < data.length; i++){
		table +="<tr><td>" + data[i].name +"</td><td>"+ data[i].costs+ "</td></tr>";
		total += parseInt(data[i].costs);
	}
    table +="</table>";
    document.getElementById("checkout").innerHTML=table + "<br>TOTAL COST:" + total;
}