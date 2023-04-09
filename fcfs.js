// getting the html elements by getElementById method
const reset = document.getElementById("reset");
const calculate = document.getElementById("calculate");
const requestSequenceInput = document.getElementById("requestSequenceInput");
const headPositionInput = document.getElementById("headPositionInput");
const graph = document.getElementById("graph");
const showArray = document.getElementById("showArray");
const box = document.getElementById("box");
const ctx = document.getElementById("myChart");
//creating the required variables
var num;
var i = [];
var p = 0;
var label4 = [];

var j;
//declaring total seek operation be zero
var sum = 0;

var requestSequence;
var headPosition;
var n = 0;
var k = [];

//function for reset button
reset.addEventListener("click", function () {
  var getValue4 = document.getElementById("requestSequenceInput");
  if (getValue4.value != "") {
    getValue4.value = "";
  }
  var getValue5 = document.getElementById("headPositionInput");
  if (getValue5.value != "") {
    getValue5.value = "";
  }
});

//calculate button fuction
calculate.addEventListener("click", function () {
  requestSequence = requestSequenceInput.value;
  headPosition = headPositionInput.value;
  num = headPosition;
  // condition checking for error
  if (requestSequence === "" || headPosition === "") {
    alert("All Fields are Required!");
  } else if (headPosition < 0) {
    alert("HeadPosition should always be Positive!");
  } else if (requestSequence != "" || headPosition != "") {
    // displaying another form
    var ks = requestSequence.split(","); // the array is split by the commas
    for (let o = 0; o < ks.length; o++) {
      k.push(parseInt(ks[o]));
    }

    fcfsm();
    // make the output visible
    box.style.visibility = "visible";

    for (let ch = 0; ch < k.length; ch++) {
      if (k[ch] < 0) {
        alert("RequestSequence should be positive");
        box.style.visibility = "hidden";
      }
    }

    // inserting the value of total seek operation in the sum cell of the table
    const row = processTable.insertRow();
    const o_cell = row.insertCell(0);
    o_cell.innerHTML = sum;
    //creating lables
    for (var t = 0; t <= k.length; t++) {
      if (t == 0) {
        i[t] = headPosition;
      } else {
        i[t] = k[t - 1];
      }
      label4.push(t);
    }
    // displaying the graph and adding style to the graph
    // graph.style.visibility = 'visible';
    // heading.style.visibility = 'visible';
    new Chart(ctx, {
      type: "line",
      data: {
        labels: label4,
        datasets: [
          {
            label: "process no",
            data: i,
            borderWidth: 2,
            borderColor: "black",
          },
        ],
      },
      options: {
        scales: {
          // adding css to the x-axis

          x: {
            gridLines: {
              borderWidth: 3,
              zeroLineColor: "black",
            },
            ticks: {
              color: "black",
            },
          },

          // adding css to the y-axis

          y: {
            ticks: {
              colorWidth: 3,
              color: "black",
            },
            beginAtZero: true,
          },
        },
      },
    });
    return;
  }
});
//main first come first serve funtion
function fcfsm() {
  // checking the condition by the length of the array , then applying the algorithm of fcfs`
  while (n < k.length) {
    console.log(mod(num - k[n]));
    sum = sum + mod(num - k[n]);
    num = k[n];

    n = n + 1;
  }
  console.log(sum);

  fetch("http://localhost:5500/fcfs", {
    method: "POST", // use HTTP POST method to send data to server
    headers: {
      // set content type to JSON
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // convert data into a JSON string
      sum: sum,
    }),
  })
    .then((response) => response.json()) // parse response as JSON
    .then((data) => {
      // handle successful response
      console.log("Success:", data);
    })
    .catch((error) => {
      // handle error
      console.error("Error:", error);
    });
}
// mod fuction to convert negative number to positive
function mod(c) {
  if (c < 0) {
    return c * -1;
  } else {
    return c;
  }
}
