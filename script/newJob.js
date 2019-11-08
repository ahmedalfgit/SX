
// Defining a function to display error message
function printError(elemId, msg) {
    document.getElementById(elemId).innerHTML = msg;
}
function getFormData() {
    // Retrieving the values of form elements
    var jobName = document.jobForm.jobName.value;
    var jobId = document.jobForm.jobId.value;
    var jobDesigner = document.jobForm.jobDesigner.value;
    var jobStart = document.jobForm.jobStart.value;
    var jobDue = document.jobForm.jobDue.value;
    var category = document.jobForm.category.value;
    var process = [];
    var checkboxes = document.getElementsByName("process[]");
    for(var i=0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked) {
            // Populate hobbies array with selected values
            process.push(checkboxes[i].value);
        }
    }

    // Defining error variables with a default value
    var nameErr = jobDesignerErr = jobStartErr = jobDueErr = categoryErr =  true;

    // Validate job name
    if(jobName === "") {
        printError("nameErr", "Please enter job name");
    } else {
        var regex = /^[a-zA-Z\s]+$/;
        if(regex.test(jobName) === false) {
            printError("nameErr", "Please enter a valid name");
        } else {
            printError("nameErr", "");
            nameErr = false;
        }
    }

    // Validate job Designer
    if(jobDesigner === "") {
        printError("jobDesignerErr", "Please enter your mobile number");
    } else {
        var regex = /^[a-zA-Z\s]+$/;
        if(regex.test(jobDesigner) === false) {
            printError("jobDesignerErr", "Please enter a valid 10 digit mobile number");
        } else{
            printError("jobDesignerErr", "");
            jobDesignerErr = false;
        }
    }

    // Validate job start date
    if(jobStart === "") {
        printError("jobStartErr", "Please enter your mobile number");
    } else {
        var regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
        if(regex.test(jobStart) === false) {
            printError("jobStartErr", "Please enter a valid 10 digit mobile number");
        } else{
            printError("jobStartErr", "");
            jobStartErr = false;
        }
    }

    // Validate job due date
    if(jobDue === "") {
        printError("jobDueErr", "Please enter your mobile number");
    } else {
        var regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
        if(regex.test(jobDue) === false) {
            printError("jobDueErr", "Please enter a valid 10 digit mobile number");
        } else{
            printError("jobDueErr", "");
            jobDueErr = false;
        }
    }
    // Validate category
    if(category === "Select") {
        alert("select category");
        printError("categoryErr", "Please select the category");
        return;
    } else {
        printError("categoryErr", "");
        categoryErr = false;
    }

    var data = [];
    // Prevent the form from being submitted if there are any errors
    if((nameErr || idErr || jobDesignerErr || jobStartErr || jobDueErr || categoryErr ) === true) {
        return false;
    } else {
        // Creating a string from input data for preview
        data.push(jobName);
        data.push(jobId);
        data.push(jobDesigner);
        data.push(jobStart);
        data.push(jobDue);
        data.push(category);
        data.push(process);

    }
    return data;
}

chartData = [];

function submitData() {
    var allInputData = getFormData();
    console.log(allInputData);
    window.localStorage.setItem('allInputData', JSON.stringify(allInputData));

    var allInputDataFromLocalStorage = JSON.parse(localStorage.getItem("allInputData"));
    document.getElementById("jobNameDiv").innerHTML = "<img src=job.png id='img'>" + "<div class='px-xs-2'>Job Name: </div>" + allInputDataFromLocalStorage[0];
    document.getElementById("jobIdDiv").innerHTML = "<img src=id.png id='img'>" + "<div class='px-xs-2'>Job Id: </div>" + allInputDataFromLocalStorage[1];
    document.getElementById("jobDesignerDiv").innerHTML = "<img src=designer.png id='img'>" + "<div class='px-xs-2'>Job Designer: </div>" + allInputDataFromLocalStorage[2];
    document.getElementById("jobDueDateDiv").innerHTML = "<img src=due-date.png id='img'>" + "<div class='px-xs-2'>Job due: </div>" + allInputDataFromLocalStorage[4];
    document.getElementById("jobCategoryDiv").innerHTML = "<img src=category.png id='img'>" + "<div class='px-xs-2'>Job Category: </div>" + allInputDataFromLocalStorage[5];

    allInputDataFromLocalStorage[6].forEach(function(element, value) {
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
        }
        chartData.push(value);
        document.getElementById("newJobFormDiv").style.display = "none";
        drawChart();
    });
}

google.charts.load('current', {'packages':['corechart']});

function drawChart(){
    //replace data with variable names
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Week'],
        ['Design',     chartData[0]],
        ['Laser',      chartData[1]],
        ['Bend',  chartData[2]],
        ['Weld', chartData[3]],
        ['Metal Finish',    chartData[4]],
        ['Assembly',    chartData[5]]
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
        colors: ["#60b502","#f301f3","#f40f0a","#00bcd4","#009688","#0010af","#c38c64","#cddc39"],
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
