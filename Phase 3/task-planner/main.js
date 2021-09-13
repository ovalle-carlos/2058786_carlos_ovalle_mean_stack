var data = new Array();
var fs = require("fs");


function getData(){
    var str = localStorage.getItem("localStorage");
    if (str!= null)
        data = JSON.parse(str);
}

function addId(){
	getData();
	data.push({empId:emp_id.value,taskId:task_id.value,listTask:task.value,listDate:date.value});
	localStorage.setItem("localStorage",JSON.stringify(data));
	displayData();
}

function deleteId(){
	getData();
	alert("before loop");
	for(var i = data.length-1; i >=0 ; i--){
		if(data[i].task_id == delete_id){
			data.splice(i,1);
		}
	}
	localStorage.setItem("localStorage",JSON.stringify(data));
	displayData();
}

function displayData() {
	getData();
	let table = `<table border=1>
                            	<tr>
                                	<th>Employee Id</th>
                                	<th>Task Id</th>
                                	<th>Task</th>
                                	<th>Date</th>
                            	</tr>
                            	`;                    	
	for(var i = 0; i < data.length; i++){
		table +="<tr><td>" + data[i].empId +"</td><td>"+ data[i].taskId+ "</td><td>"+ data[i].listTask + "</td><td>"+ data[i].listDate + "</td></tr>";
	}
    table +="</table>";
    document.getElementById("addHere").innerHTML=table;
}