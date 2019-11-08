
// Set the date for the input of the new job form
let today = new Date().toISOString().substr(0, 10);
document.querySelector("#jobStartDate").value = today;


// function to show the form section when click on add and hide after submit form
function showForm() {
    document.getElementById("addButton").addEventListener("click", function (){
        document.getElementById("newJobFormDiv").classList.add("showForm");

    });
}
function hideForm(){
    document.getElementById("newJobFormDiv").classList.remove("showForm");
    storeData();
}

function storeData() {
    window.localStorage.setItem('chartData', JSON.stringify(chartData));
    drawChart();
}


    // function to return the document.getElementById(id)
var x = function(id) {
    return document.getElementById(id).value;
    };

var form = new Object();
var chartData = [];
// Submit form with submitForm function.
function submitForm() {
    var jobName = x("jobName");
    let jobTitle = document.getElementById("jobNameDiv");
    jobTitle.innerHTML = "<img src=job.png id='img'>" + "<div class='px-xs-2'>Job Name: </div>" + jobName;
    var jobId = x("jobId");
    let jobIdDiv = document.getElementById("jobIdDiv");
    jobIdDiv.innerHTML = "<img src=id.png id='img'>" + "<div class='px-xs-2'>Job Id: </div>" + jobId;
    var jobDesigner = x("jobDesigner");
    let jobDesinerDiv = document.getElementById("jobDesignerDiv");
    jobDesinerDiv.innerHTML = "<img src=designer.png id='img'>" + "<div class='px-xs-2'>Designer: </div>" + jobDesigner;
    var jobStartDate = x("jobStartDate");
    var jobDueDate = x("jobDueDate");
    let jobDueDateDiv = document.getElementById("jobDueDateDiv");
    jobDueDateDiv.innerHTML = "<img src=due-date.png id='img'>" + "<div class='px-xs-2'>Job Due Date: </div>" + jobDueDate;
    var category = x("category");
    let categoryDiv = document.getElementById("jobCategoryDiv");
    categoryDiv.innerHTML = "<img src=category.png id='img'>" + "<div class='px-xs-2'>Category: </div>" + category;
    var process = [];

    // loop through the check boxed values and return the names of the boxes selected to the process array
    var checkBoxes = document.querySelectorAll("#processList li input[type=checkbox]:checked");
    for (let i = 0 ; i < checkBoxes.length; i++){
        process.push(checkBoxes[i].name);
    }

    // If checkbox selected
    process.forEach(function(element, value) {
        if (element === "design"){
            value = 26
        } else if (element === "laser") {
            value = 9;
        } else if (element === "bend") {
            value = 11;
        } else if (element === "weld") {
            value = 26;
        } else if (element === "metalFinish") {
            value = 14;
        } else if (element === "assembly") {
            value = 15;
        } else {
            console.log("Nothing selected");
        }
        return chartData.push(value);
    });

    if (validation()) // Calling validation function
    {
        // document.getElementById("newJobForm").submit(); //form submission
        // form.jobName = jobName;
        // form.jobId = jobId;
        // form.jobDesigner = jobDesigner;
        // form.jobStartDate = jobStartDate;
        // form.jobDueDate = jobDueDate;
        // form.category = category;
        // form.processList = process;
        // // console.log(form);
    }

    hideForm();
}

// Name and Email validation Function.
function validation() {
    var startDateValid = 10/20/2019;
    var jobName = x("jobName");
    var jobId = x("jobId");
    var jobDesigner = x("jobDesigner");
    var jobStartDate = x("jobStartDate");
    var jobDueDate = x("jobDueDate");
    var category = x("category");
    var processList = x("processList");
    if (jobName === '' || jobId === '' || jobDesigner === '' || jobStartDate <= startDateValid || category === '' || processList === '') {
        alert("Please fill all fields...!!!!!!");
        return false;
    }  else {
        return true;
    }
}

//define the chart package
google.charts.load('current', {'packages':['corechart']});

//submit requires text inputs to use parseInt to work as numbers
function drawChart() {
    var inputValues = JSON.parse(localStorage.getItem("chartData"));

    //replace data with variable names
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Week'],
        ['Design',     inputValues[0]],
        ['Laser',      inputValues[1]],
        ['Bend',  inputValues[2]],
        ['Weld', inputValues[3]],
        ['Metal Finish',    inputValues[4]],
        ['Assembly',    inputValues[5]]
    ]);
    var options = {
        hAxis: {
            titleTextStyle: {color: '#607d8b'},
            gridlines: { count:0},
            textStyle: { color: '#b0bec5', fontName: 'Roboto', fontSize: '12', bold: true}
        },
        vAxis: {
            minValue: 0,
            gridlines: {color:'#37474f', count:4},
            baselineColor: 'transparent'
        },
        legend: {position: 'top', alignment: 'center', textStyle: {color:'#607d8b', fontName: 'Roboto', fontSize: '9'}},
        colors: ["#3f51b5","#2196f3","#03a9f4","#00bcd4","#009688","#4caf50","#8bc34a","#cddc39"],
        areaOpacity: 0.24,
        lineWidth: 1,
        backgroundColor: 'transparent',
        chartArea: {
            backgroundColor: "transparent",
            width: '100%',
            height: '80%'
        },
        height:200, // example height, to make the demo charts equal size
        width:400,
        pieSliceBorderColor: '#263238',
        pieSliceTextStyle:  {color:'#607d8b' },
        pieHole: 0.9,
        bar: {groupWidth: "40" },
        colorAxis: {colors: ["#3f51b5","#2196f3","#03a9f4","#00bcd4"] },
        backgroundColor: 'transparent',
        datalessRegionColor: '#37474f',
        displayMode: 'regions'
    };
    //the id is the DOM location to draw the chart
    var chart = new google.visualization.PieChart(document.getElementById('pieChart'));
    chart.draw(data, options);
}


