// getting the requiered html elements 
const processTable = document.getElementById("processTable");
const processIDInput = document.getElementById("processIDInput");
const arrivalTimeInput = document.getElementById("arrivalTimeInput");
const cpuBurstTimeInput = document.getElementById("cpuBurstTimeInput");
const priorityInput = document.getElementById("priorityInput");
const add = document.getElementById("add");
const reset = document.getElementById("reset");
const calculate = document.getElementById("calculate");
const resultTable = document.getElementById("resultTable");
const GanttChartTable = document.getElementById("GanttChart");
const AvgWaitTime = document.getElementById("AvgWaitTime");
const AvgTATime = document.getElementById("AvgTATime");
const table = document.getElementById('table');
const box = document.getElementById('box');

// creating the process array , which has different input values
let processes = [];
  const M = 1000, N = 2;
  let GanttChart = new Array(M);            // create an empty array of length `M`
  for (var i = 0; i < M; i++) {
    GanttChart[i] = new Array(N).fill(0);        // make each element an array
  }

  //fuction for add button
  add.addEventListener("click", function () {
    const processID = processIDInput.value;
    const arrivalTime = arrivalTimeInput.value;
    const cpuBurstTime = cpuBurstTimeInput.value;
    const priority = priorityInput.value;

    //checking the condition
    if (arrivalTime<0) {
      alert("Please enter arrival time greater or equal to zero");
      return;
    }
    if (cpuBurstTime<=0) {
      alert("Please enter cpu burst time greater than zero");
      return;
    }
  
    if (priority<0) {
      alert("Please enter prirority greater or equal to zero");
      return;
    }

    if (processID === "" || arrivalTime === "" || cpuBurstTime === "" || priority === "") {
      alert("All fields are required!");
      return;
    }

    // pushing the value of input user in the process array
    processes.push({
      processID,
      arrivalTime: parseInt(arrivalTime),
      cpuBurstTime: parseInt(cpuBurstTime),
      priority: parseInt(priority)
    });
      //displaying the values in tabular form and stroing them into the variable
    const row = processTable.insertRow();
    const processIDCell = row.insertCell(0);
    const arrivalTimeCell = row.insertCell(1);
    const cpuBurstTimeCell = row.insertCell(2);
    const priorityCell = row.insertCell(3);

    processIDCell.innerHTML = processID;
    arrivalTimeCell.innerHTML = arrivalTime;
    cpuBurstTimeCell.innerHTML = cpuBurstTime;
    priorityCell.innerHTML = priority;

    // making the output visible
    box.style.visibility='visible';
    table.style.visibility='visible';

    processIDInput.value = "";
    arrivalTimeInput.value = "";
    cpuBurstTimeInput.value = "";
    priorityInput.value = "";


  });

  //fuction of rest button
  reset.addEventListener("click", function () {

    var getValue = document.getElementById("processIDInput");
    if (getValue.value != "") {
      getValue.value = "";
    }
    var getValue1 = document.getElementById("arrivalTimeInput");
    if (getValue1.value != "") {
      getValue1.value = "";
    }
    var getValue2 = document.getElementById("cpuBurstTimeInput");
    if (getValue2.value != "") {
      getValue2.value = "";
    }
    var getValue3 = document.getElementById("priorityInput");
    if (getValue3.value != "") {
      getValue3.value = "";
    }

  });
  //function to do the final calculations
  calculate.addEventListener("click", function () {
    if (processes.length === 0) {
      alert("Add some processes first!");
      return;
    }

  //   resultTable.style.visibility = "visible";

    document.getElementById("GanttChart1").style.visibility = "visible";
    add.style.visibility="hidden";
    // dropButton.style.display="none";
    reset.style.visibility="hidden";
    calculate.style.visibility="hidden";
    resultTable.style.visibility = "visible";
    AvgTATime.style.visibility = "visible";
    AvgWaitTime.style.visibility = "visible";

    priorityScheduling(processes);

    
  });


  // logical main function
  function priorityScheduling(processes) {
      //declaring required variables
    const n = processes.length;
    burst_remaining = new Array(n).fill(0);
    let current_time = 0;
    let completed = 0;
    let is_completed = new Array(100).fill(0);
    let prev = -1;
    let b = 0;
    let a = 0;

    for (let i = 0; i < n; i++) {
      burst_remaining[i] = processes[i].cpuBurstTime;
    }

    //loop running until all process are completed
    while (completed != n) {
      let index = -1;
      let max = Number.MAX_SAFE_INTEGER;

      for (let i = 0; i < n; i++) {
        if (processes[i].arrivalTime <= current_time && is_completed[i] == 0) {
          if (processes[i].priority < max) {
            max = processes[i].priority;
            index = i;
          }
          if (processes[i].priority == max) {
            if (processes[i].arrivalTime < processes[index].arrivalTime) {
              max = processes[i].priority;
              index = i;
            }
          }
        }
      }
        //creation of ganttChart
      if (index != -1) {

        // checking the condition for the ganttchart
        if (burst_remaining[index] == processes[index].cpuBurstTime) {
          processes[index].startTime = current_time;
          if (prev == -1) {
            GanttChart[b][0] = processes[index].startTime;
            GanttChart[b][1] = processes[index].processID;
            b++;
            GanttChart[b][0] = processes[index].startTime;
          }
        }
        if (prev != index && prev != -1) {
          let a = b;
          GanttChart[b][1] = processes[index].processID;
          b++;
          GanttChart[b][0] = GanttChart[a][0];

        }

        GanttChart[b][0] = GanttChart[b][0] + 1;


        burst_remaining[index] -= 1;

        current_time++;

        //calculation the values
        if (burst_remaining[index] == 0) {

          // adding the value into the process array of various output cell
          processes[index].completionTime = current_time;
          processes[index].turnaroundTime = processes[index].completionTime - processes[index].arrivalTime;
          processes[index].waitingTime = processes[index].turnaroundTime - processes[index].cpuBurstTime;
          processes[index].responseTime = processes[index].startTime - processes[index].arrivalTime;

          is_completed[index] = 1;
          completed++;
        }
        prev = index;
      }
      else {
        current_time++;
      }

    }
    let avgWaitingTime = 0;
    let avgTurnAroundTime = 0;
    for (let i = 0; i < n; i++) {
      avgWaitingTime += processes[i].waitingTime;
      avgTurnAroundTime += processes[i].turnaroundTime;
    }
// calculation avg waiting time and turn arraound time
    avgWaitingTime = avgWaitingTime / n;

    avgTurnAroundTime = avgTurnAroundTime / n;

//displaying ganttChart and adding the value and showing the value in the ganttchart
    let row1 = GanttChartTable.insertRow();
    let row2 = GanttChartTable.insertRow();
    let row3 = GanttChartTable.insertRow();
    row1.insertCell(0).innerHTML = "Start Time";
    row2.insertCell(0).innerHTML = "Running Procces";
    row3.insertCell(0).innerHTML = "End Time";
    for (let i = 0; i < 100; i++) {
      let a = i;
      a++;
      if (GanttChart[i][1] == 0) {
        break;
      }
      else {
        row1.insertCell(a).innerHTML = GanttChart[i][0];
        row2.insertCell(a).innerHTML = GanttChart[i][1];
        row3.insertCell(a).innerHTML = GanttChart[a][0];
      }

    }


// displaying the value of avg waiting time and TAT time
    document.getElementById("avgWaitTime").innerHTML = avgWaitingTime;
    document.getElementById("avgTATime").innerHTML = avgTurnAroundTime;

    
    for(let j = 0 ; j < processes.length;j++){
      //inserting the final values in the table
      var rowr = resultTable.insertRow();
var processIDCell = rowr.insertCell(0);
var arrivalTimeCell = rowr.insertCell(1);
var cpuBurstTimeCell = rowr.insertCell(2);
var priorityCell = rowr.insertCell(3);
var completionTimeCell = rowr.insertCell(4);
var turnaroundTimeCell = rowr.insertCell(5);
var waitingTimeCell = rowr.insertCell(6);
var responseTimeCell = rowr.insertCell(7);
var startTimeCell = rowr.insertCell(8);

// storing the value of the output table to add in the database

processIDCell.innerHTML = processes[j].processID;
arrivalTimeCell.innerHTML = processes[j].arrivalTime;
cpuBurstTimeCell.innerHTML = processes[j].cpuBurstTime;
priorityCell.innerHTML = processes[j].priority;
completionTimeCell.innerHTML = processes[j].completionTime;
turnaroundTimeCell.innerHTML = processes[j].turnaroundTime;
waitingTimeCell.innerHTML = processes[j].waitingTime;
responseTimeCell.innerHTML = processes[j].responseTime;
startTimeCell.innerHTML = processes[j].startTime;

fetch("http://localhost:5500/priority", {
          method: 'POST',             // use HTTP POST method to send data to server
          headers: {                  // set content type to JSON
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({     // convert data into a JSON string
              processID : processes[j].processID,
              arrivalTime:processes[j].arrivalTime,
              cpuBurstTime : processes[j].cpuBurstTime,
              priority : processes[j].priority,
              completionTime : processes[j].completionTime,
              turnaroundTime : processes[j].turnaroundTime,
              waitingTime : processes[j].waitingTime,
              responseTime : processes[j].responseTime
          }),
      }).then((response) => response.json())    // parse response as JSON
          .then((data) => {                       // handle successful response
              console.log('Success:', data);
          })
          .catch((error) => {                     // handle error
              console.error('Error:', error);
          });

    }
    
    return processes;
    
  }