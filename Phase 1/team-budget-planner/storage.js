let totalExpenses = 0;
var data = new Array();

function formData(client_name, project_name, budget) {
    this.client_name = client_name;
    this.project_name = project_name
    this.budget = budget;
}

function storeData() {
    // take value from text field using id or name
    //we can store json object. but we have to convert 
    // into string. 
    getData();
    data.push({
    	client_name: document.getElementById("client_name").value,
    	project_name: document.getElementById("project_name").value,
    	budget: document.getElementById("budget").value
    });
    localStorage.setItem("localData",JSON.stringify(data));
    alert("Data has been stored");
}

function createTable() {
	getData();
    var row = new Array();
    row = JSON.parse(localStorage.getItem("localData"));

    var tbl = document.getElementById("table_data");

    for(i=0; i<row.length;row++){
    	var r = tbl.insertRow(-1);
    	var cell1 = r.insertCell();
    	var cell2 = r.insertCell();
    	var cell3 = r.insertCell();

    	cell1.innerHTML = row[i].client_name;
    	cell2.innerHTML = row[i].project_name;
    	cell3.innerHTML = parseInt(row[i].budget);
    }

}

function getData(){
    var str = localStorage.getItem("localData");
    if (str!= null)
        arr = JSON.parse(str);
}

function removeData() {
    sessionStorage.removeItem("obj1");
    localStorage.removeItem("obj1");
}

function displayData() {
    let empObj = sessionStorage.getItem("empObj");
    let empJson = JSON.parse(empObj)
    var tableContent=""
    var startTable ="<table border=1 class='table'><tr><th>Id</th><th>Name</th><th>Age</th></tr>"
    
    tableContent ="<tr><td>"+empJson.id+"</td><td>"+empJson.name+"</td><td>"+empJson.age+"</td></tr>"
    
    var endTable="</table>"
    tableContent = startTable+tableContent+endTable
    document.getElementById("main").innerHTML=tableContent;
}