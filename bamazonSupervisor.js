var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) throw err;
  superOptions();
});

//supervisor options
function superOptions() {
  var tasks = ["View Product Sales by Department", "Create New Department"];

  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: tasks
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View Product Sales by Department":
          viewProdSales();
          break;

        case "Create New Department":
          createDept();
          break;
      }
    });
};

//view product sales
// function viewProdSales () {

//     When a supervisor selects View Product Sales by Department, the app should display a summarized table in their terminal/bash window.
//     The total_profit column should be calculated on the fly using the difference between over_head_costs and product_sales. total_profit should not be stored in any database. You should use a custom alias.

//SELECT (SUM(dept.overhead) - SUM(dept.sales)) AS total_profit from dept
//some type of join
// };


//create a new department
function createDept() {
  inquirer
    .prompt([{
        name: 'new',
        message: 'What new department do you want to add?',
        type: 'input',
      },
      {
        name: 'overhead',
        message: 'What is the overhead cost?',
        type: 'input',
      },
    ])
    .then(function (data) {
      console.log("Added a new department.\n");
      var query = connection.query(
        "INSERT INTO departments SET ?", {
          department_name: data.new,
          over_head_costs: data.overhead
        },
        function (err, res) {
          if (err) throw err;
        }
      );
      superOptions();
    });
};