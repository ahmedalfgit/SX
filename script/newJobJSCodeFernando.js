
// function hideForm(){
//     document.getElementById("newJobFormDiv").classList.remove("showForm");
// }


// function returnCheckboxValues(id,checkbox ) {
// 	checkbox = document.getElementById(id).value;
// 	for (let i = 0; i < checkbox; i++){
// 		if(checkbox[i].checked) {
// 			return checkbox[i].value;
// 		}
// 	}
// }

function returnIdValue(id) {
	return document.getElementById(id).value;
}

function getFormFieldValues() {
    
	var jobs = [
		'jobName', 
		'jobId', 
		'jobDesigner', 
		'jobStartDate', 
		'jobDueDate', 
		'category', 
		'design', 
		'metalCut', 
		'metalBending', 
		'welding', 
		'metalFinishing',
		'assembly'],
	formFieldObj = {},
	data = [];

	// loop through the jobs to create an object containing the retrieved form field values
	for (var i=0;i<jobs.length;i++) {
		formFieldObj.name = jobs[i];
		formFieldObj.value = document.getElementById(jobs[i]).value;
		data.push(formFieldObj); // add object to data array
		formFieldObj = {}; // clear the object
	}
	console.log("Data is below");
	console.log(data);
	return data;
	
};

function createChartData(jobProcess) {
	
	var obj = {};
	
	if (jobProcess === "design") {
        
		obj.process = jobProcess;
		obj.value = 26;
		
    } else if (jobProcess === "laser") {
        
		obj.process = jobProcess;
		obj.value = 9;
		
    } else if (jobProcess === "bend") {
        
		obj.process = jobProcess;
		obj.value = 11;
		
    } else if (jobProcess === "weld") {
        
		obj.process = jobProcess;
		obj.value = 26;
		
    } else if (jobProcess === "metalFinish") {
        
		obj.process = jobProcess;
		obj.value = 14;
		
    } else if (jobProcess === "assembly") {
        
		obj.process = jobProcess;
		obj.value = 15;	
    } 
	
	return obj;
}

// Submit form with submitForm function.
function submitForm() {
    
	// Ed, you can apply the form validation here
	var chartData = getFormFieldValues();
	validation();
	storeData(chartData);
	displayPieChart();
	
	return false;
}

// Name and Email validation Function.
function validation() {
    var startDateValid = 10/20/2019;
    var jobName = returnIdValue("jobName");
    var jobId = returnIdValue("jobId");
    var jobDesigner = returnIdValue("jobDesigner");
    var jobStartDate = returnIdValue("jobStartDate");
    var jobDueDate = returnIdValue("jobDueDate");
    var category = returnIdValue("category");
    var processList = returnIdValue("processList");
    if (jobName === '' || jobId === '' || jobDesigner === '' || jobStartDate <= startDateValid || category === '' || processList === '') {
        alert("Please fill all fields...!!!!!!");
        return false;
    }  else {
        return true;
    }
}

function storeData(chartData) {
	window.localStorage.setItem('chartData', JSON.stringify(chartData));
}

function displayPieChart() {
    var json;
    var data;
    var ctx;
    var pieChart;
    var options = {
        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke : true,

        //String - The colour of each segment stroke
        segmentStrokeColor : "#000",

        //Number - The width of each segment stroke
        segmentStrokeWidth : 2,

        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout : 10, //50, // This is 0 for Pie charts

        //Number - Amount of animation steps
        animationSteps : 80,

        //String - Animation easing effect
        animationEasing : "easeOutBounce",

        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate : true,

        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale : false,

        //String - A legend template
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

    }

    data = JSON.parse(window.localStorage.getItem('chartData'));
	// make sure the chart data is structured in a way that Chart can use it.
	// a pieChart id must exist in your HTML in order for the library to render the chart
	ctx = document.getElementById("pieChart").getContext("2d");
	pieChart = new Chart(ctx).Pie(data, options);

}


// function to draw chart using the data from chartData;
// function init() {
//     // showForm();
// }

// window.addEventListener("load", init);

