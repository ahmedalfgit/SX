

function error(divId, msg) {
    return document.getElementById(divId).innerHTML = msg;
}

// Set the date for the input of the new job form
let today = new Date().toISOString().substr(0, 10);
document.querySelector("#appointmentDate").value = today;

function showForm() {
    console.log("clicked add");
    // document.getElementById("newAppointmentFormDiv").style.display = "block";
}


function submitForm() {
    console.log("clicked");
    if (validation()){
        let  inputData = {
            appointmentTitle: document.getElementById("appointmentTitle").value,
            appointmentDate: document.getElementById("appointmentDate").value,
            appointmentStartTime: document.getElementById("appointmentStartTime").value,
            appointmentStartTimeMeridian: document.getElementById("appointmentStartTimeMeridian").value,
            appointmentEndTime: document.getElementById("appointmentEndTime").value,
            appointmentEndTimeMeridian: document.getElementById("appointmentEndTimeMeridian").value,
            appointmentRoom: document.getElementById("appointmentRoom").value
        };
        storeData(inputData);
    }

}

function validation() {
    let appointmentTitle = document.getElementById("appointmentTitle").value;
    let appointmentStartTime = document.getElementById("appointmentStartTime").value;
    let appointmentStartTimeMeridian = document.getElementById("appointmentStartTimeMeridian").value;
    let appointmentEndTime = document.getElementById("appointmentEndTime").value;
    let appointmentEndTimeMeridian = document.getElementById("appointmentEndTimeMeridian").value;
    var regex = /^[a-zA-Z ]{2,30}$/;
    if (appointmentTitle === "" || regex.test(appointmentTitle) === false){
        error("appointmentTitleError", "Please insert meeting title");
        return;
    } else {
        error("appointmentTitleError", "");
    }
    if (appointmentStartTime === "1" && appointmentStartTimeMeridian === "am" || appointmentStartTime === "2" && appointmentStartTimeMeridian === "am" ||
        appointmentStartTime === "3" && appointmentStartTimeMeridian === "am" || appointmentStartTime === "4" && appointmentStartTimeMeridian === "am" ||
        appointmentStartTime === "5" && appointmentStartTimeMeridian === "am" ){
        error("appointmentStartTimeError", "No appointments between 1am - 5am");
        return;
    } else {
        if(appointmentStartTimeMeridian === "Meridian" || appointmentStartTime === "Hour") {
            error("appointmentStartTimeError", "Time and Meridian can't be empty");
            return;
        } else {
            error("appointmentStartTimeError", "");
        }
    }
    if (appointmentEndTime === "7" && appointmentEndTimeMeridian === "pm" || appointmentEndTime === "8" && appointmentEndTimeMeridian === "pm" ||
        appointmentEndTime === "9" && appointmentEndTimeMeridian === "pm" || appointmentEndTime === "10" && appointmentEndTimeMeridian === "pm" ||
        appointmentEndTime === "11" && appointmentEndTimeMeridian === "pm" || appointmentEndTime === "12" && appointmentEndTimeMeridian === "am"){
        error("appointmentEndTimeErrorDiv", "No appointments between 7pm - mid-night");
        return;
    }
    else {
        if (appointmentEndTimeMeridian === "Meridian" || appointmentEndTime === "Hour") {
            error("appointmentEndTimeErrorDiv", "Time and Meridian can't be empty");
            return;
        } else {
            error("appointmentEndTimeErrorDiv", "");
        }
    }
    return true;
}

function storeData(inputData) {
    window.localStorage.setItem('inputData', JSON.stringify(inputData));
    loadGoogleTable();
}

function loadGoogleTable() {

    google.charts.load('current', {'packages':['table']});
    google.charts.setOnLoadCallback(drawTable);

    function drawTable() {
        var data = new google.visualization.DataTable();
        var tableData = JSON.parse( localStorage.getItem("inputData"));
        console.log(tableData);
        data.addColumn('string', 'Title');
        data.addColumn('string', 'Date');
        data.addColumn('string', 'Starts at');
        data.addColumn('string', 'Ends at');
        data.addColumn('string', 'Location');
        data.addRows([
            [tableData.appointmentTitle,  tableData.appointmentDate, tableData.appointmentStartTime + " " + tableData.appointmentStartTimeMeridian, tableData.appointmentEndTime + " " + tableData.appointmentEndTimeMeridian, tableData.appointmentRoom],
        ]);

        var table = new google.visualization.Table(document.getElementById('table_div'));

        table.draw(data, {width: '100%', height: '100%'});
    }
    hideForm()
}

function hideForm() {
    document.getElementById("newAppointmentFormDiv").style.display = "none";
}
