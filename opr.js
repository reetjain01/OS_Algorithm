//taking the required html elments
const reset = document.getElementById('reset');
const calculate = document.getElementById("calculate");
const referenceStringInput = document.getElementById('referenceStringInput');
const frameNumberInput = document.getElementById('frameNumberInput');
const answer = document.getElementById('answer');
const otable = document.getElementById('outputtable');
const outputTable = document.getElementById('outputTable');
const table = document.getElementById('table');
const box = document.getElementById('box');

//creating the variabes used
var frameNumber;
var referenceString;
var k = [];
var arrrr = new Array(frameNumber);
let count2 = 0;
var misse = true;
var hit = 0;
var found = 0;
var to_be_replaced;
var f =[];
var n_of_found = 0;
var u = [];
var index1;
var totalPages = 0;

//reset button fuction
reset.addEventListener("click", function () {
    var getValue4 = document.getElementById("frameNumberInput");
    if (getValue4.value != "") {
     getValue4.value = "";
    }
    var getValue5 = document.getElementById("referenceStringInput");
    if (getValue5.value != "") {
     getValue5.value = "";
    }
    });

// calculate button fuction
calculate.addEventListener("click" , function(){
    frameNumber = frameNumberInput.value;
    referenceString = referenceStringInput.value;

    // consition checking for error
    if(frameNumber === "" || referenceString === ""){
        alert("All Fields are Required!");
        }
        else if(frameNumber < 0){
            alert("frameNumber should always be Positive!")
        }
        else if(frameNumber != "" || referenceString != ""){
        // displaying another form
        k = referenceString.split(',');
        // form.style.visibility = 'visible';
        totalPages = k.length;   
        optimal_page_replacement();  
        }
        box.style.visibility='visible';
})

// main optimal_page replacement algorithm

    function optimal_page_replacement(){
        //creating a array of same length of frames so that we can check which pages occur further in order
        for(var t = 0; t < f.length;t++){
            u.push(0);
        }
        
    for(var i = 0; i < k.length;i++){
        for(var w = 0; w< f.length;w++){
            u[w] = 0;
        }
        found = 0;
        n_of_found = 0;
        if(f.length<frameNumber){
            //checking if even though the frames might not be full if there is a hit for page
            if(f.includes(k[i])){
                hit = hit + 1;
                misse = false;
                index1 = f.findIndex(k[i]);
            }//if the page is not present and no of frame is not equal to its max value we push the page into new frame
            else{
            f.push(k[i]);
            index1 = i;
            
        }}//if the no of frames is equal to the max value
        else{for(var p = 0 ; p < frameNumber;p++){
            //checking if there is a hit or notc
            if(k[i] == f[p]){
                found=1;    
                hit = hit + 1; 
                index1 = p;
                misse = false;
                break;
            }
    
        }
        //if there is no hit we check the further pages to figure out which page is used later or which page is not used at all
        if(found == 0){
            console.log(".");
            for(var j = 0 ; j <frameNumber;j++){
            for(var l = i+1 ; l < k.length;l++){
                if(k[l]== f[j]){
                    n_of_found = n_of_found + 1;
                    u[j] = 1;
                    if(n_of_found == frameNumber - 1){
                       break;
                    }
                }
            }if(n_of_found == frameNumber - 1){
                    break;    
            }
        }for(var r = 0; r < f.length;r++){
            if(u[r]==0){
                to_be_replaced = r;
                index1 = r;
                misse = true;
                break;
            }
        }//replacing thhe page in frame
        f[to_be_replaced] = k[i];}}
        arrrr = f;
        console.log(arrrr);
        OutputTable(otable,arrrr,misse,index1);
    }
    // Inserting values entered from the user to output table to show the value of hitpages , misspages , hitratio , missratio
    const r1 = answer.insertRow();
    const cell1 = r1.insertCell(0);
    const cell2 = r1.insertCell(1);
    const cell3 = r1.insertCell(2);
    const cell4 = r1.insertCell(3);
    
    cell1.innerHTML = hit;
    cell2.innerHTML = totalPages-hit;
    cell3.innerHTML = parseFloat(((hit/totalPages)*100)).toPrecision(4) + "%";
    cell4.innerHTML = parseFloat(((totalPages-hit)/totalPages)*100).toPrecision(4) + "%";
    answer.style.visibility = "visible";
    // creating localhost and connecting the database and the frontend (the pages (reference pages) tables ) and storing them into the database opr created in mySql
    
    fetch("http://localhost:5500/opr", {
        method: 'POST',             // use HTTP POST method to send data to server
        headers: {                  // set content type to JSON
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({     // convert data into a JSON string
            hit:hit,
            miss:totalPages-hit,
            hitratio:String(((hit/totalPages)*100).toPrecision(4)+"%"),
            missratio:String((((totalPages-hit)/totalPages)*100).toPrecision(4)+"%")
        }),
    }).then((response) => response.json())    // parse response as JSON
        .then((data) => {                       // handle successful response
            console.log('Success:', data);
        })
        .catch((error) => {                     // handle error
            console.error('Error:', error);
        });
} 
    
    // Creating the function OutputTable for Output Table which shows where the page is hit and miss , and it makes easy to calculate hit ratio and miss ratio 
    
    function OutputTable(OutputTable, arr, miss, index) {
        let row;
        let td;
        let text;
        for(let g = 0; g<frameNumber; g++){
            if(count2 == 0){
                row = document.createElement('tr');
                td = document.createElement('td');
                if(typeof arr[g] == 'undefined'){
                    text = document.createTextNode('');
                }else{
                    text = document.createTextNode(arr[g]);
                }
                td.appendChild(text);
                row.appendChild(td);
                OutputTable.appendChild(row);
            }else{
                row = OutputTable.getElementsByTagName('tr')[g];
                td = document.createElement('td');
                if(typeof arr[g] == 'undefined'){
                    text = document.createTextNode('');
                }
                else{
                    text = document.createTextNode(arr[g]);
                }
                td.appendChild(text);
                row.appendChild(td);
            }
        }

        // when there is a miss , the cell of the table will be red which indicates that there is a miss in the page
        if(miss == true){
            let cell = OutputTable.rows[index].cells[count2];
            cell.style.backgroundColor = "red";
        }
        
        // when there is not a miss , the cell of the table will be green which indicates that there is a hit in the page 
        else{
            let cell = OutputTable.rows[index].cells[count2];
            cell.style.backgroundColor = "green";
        }
        count2 = count2 + 1;
    }
    
