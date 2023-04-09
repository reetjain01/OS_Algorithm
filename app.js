// creating express constant to use the express by making it require by require('express')
const express = require("express");

// creating app constant to use the express by making it use all the libraries and packages inside the expresss
const app = express();

// creating path constant to use the path(directory) by making it require by require('path')
const path = require("path");

// same as path and express , we create cors constant
const cors = require("cors");
app.use(cors());

app.use(express.static("../Project"));
// Adding middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mysql = require("mysql");

// making local host and connecting it to the server
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Pindwara@123",
  database: "os_project",
});

//if the coonnection is successfully it will show the connection seccessfully establishes msg in the terminal other wise it show error and also print the msg that the server has started
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database!");
});
app.listen(5500, function () {
  console.log("Server Started!!");
});

// For Optimal Page Replacement

app.post("/opr", (req, res) => {
  // printing the value of the table in the terminal to cross check
  console.log(req.body.hit);
  console.log(req.body.hitratio);
  console.log(req.body.missratio);
  console.log(req.body.miss);

  // writng the queries of creating table and declaring th variable its datatype
  connection.query(
    "CREATE TABLE if not exists Optimal_Page_Replacement(Pages_ID int AUTO_INCREMENT primary key,Page_Hits int,Page_Miss int,Hit_Ratio varchar(10),Miss_Ratio varchar(10))",
    function (err, result) {
      if (err) throw err;

      // adding values into SQL, and writing the sql statements
      var values = [
        [
          null,
          req.body.hit,
          req.body.miss,
          req.body.hitratio,
          req.body.missratio,
        ],
      ];

      var sql = "INSERT INTO Optimal_Page_Replacement VALUES ?";
      connection.query(sql, [values], function (err, result) {
        if (err) throw err;
        else {
          //shows that the data is inserted successfully
          console.log("Data inserted Successfully");
        }
      });
    }
  );
});

// For FCFS Disk Scheduling

app.post("/fcfs", (req, res) => {
  // printing the value of the table in the terminal to cross check
  console.log(req.body.sum);

  // writng the queries of creating table and declaring th variable its datatype
  connection.query(
    "CREATE TABLE if not exists FCFS_Simulation(Pages_ID int AUTO_INCREMENT primary key,Seek_Operation int )",
    function (err, result) {
      if (err) throw err;

      // adding values into SQL, and writing the sql statements
      var values = [[null, req.body.sum]];

      var sql = "INSERT INTO FCFS_Simulation VALUES ?";
      connection.query(sql, [values], function (err, result) {
        if (err) throw err;
        else {
          //shows that the data is inserted successfully
          console.log("Data inserted Successfully");
        }
      });
    }
  );
});

// For Priority Simulation //

app.post("/priority", (req, res) => {
  // printing the value of the table in the terminal to cross check
  console.log(req.body.processID);
  console.log(req.body.arrivalTime);
  console.log(req.body.cpuBurstTime);
  console.log(req.body.priority);
  console.log(req.body.completionTime);
  console.log(req.body.turnaroundTime);
  console.log(req.body.waitingTime);
  console.log(req.body.responseTime);

  // writng the queries of creating table and declaring th variable its datatype
  connection.query(
    "CREATE TABLE if not exists Priority_Simulation(Pages_ID int AUTO_INCREMENT primary key,Process_ID varchar(10) , ArrivalTime varchar(10) , BurstTime varchar(10) , priority varchar(10) , CompletionTime varchar(10) , TurnAroundTime varchar(10) , WaitingTime varchar(10) , ResponseTime varchar(10))",
    function (err, result) {
      if (err) throw err;

      // adding values into SQL, and writing the sql statements
      var values = [
        [
          null,
          req.body.processID,
          req.body.arrivalTime,
          req.body.cpuBurstTime,
          req.body.priority,
          req.body.completionTime,
          req.body.turnaroundTime,
          req.body.waitingTime,
          req.body.responseTime,
        ],
      ];

      var sql = "INSERT INTO Priority_Simulation VALUES ?";
      connection.query(sql, [values], function (err, result) {
        if (err) throw err;
        else {
          //shows that the data is inserted successfully
          console.log("Data inserted Successfully");
        }
      });
    }
  );
});
