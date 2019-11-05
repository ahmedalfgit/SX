
// Set the date for the input of the new job form
let today = new Date().toISOString().substr(0, 10);
document.querySelector("#appointmentDate").value = today;

function f(id) {
    return document.getElementById(id).value;
}

function showForm() {
    document.getElementById("newAppointmentFormDiv").style.display = "block";
}

function submitForm() {
    // if validation();
    // add validation()
    let  inputData = {
        meetingatitle: f("appointmentTitle"),
        meetingDate: f("appointmentDate"),
        startTime: f("startTime"),
        startTimeMeridiem: f("startTimeMeridiem"),
        endTime: f("endTime"),
        endTimeMeridiem: f("endTimeMeridiem"),
        room: f("room")
    };

    storeData(inputData);
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
            [tableData.meetingatitle,  tableData.meetingDate, tableData.startTime + " " + tableData.startTimeMeridiem, tableData.endTime + " " + tableData.endTimeMeridiem, tableData.room],
        ]);

        var table = new google.visualization.Table(document.getElementById('table_div'));

        table.draw(data, {width: '100%', height: '100%'});
    }
    hideForm()
}

function hideForm() {
    document.getElementById("newAppointmentFormDiv").style.display = "none";
}
