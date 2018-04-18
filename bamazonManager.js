var mysql = require("mysql");
var inquirer = require("inquirer");

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
  runOptions();
});

function runOptions() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View Products for Sale":
          viewProducts();
          break;

        case "View Low Inventory":
          lowInventory();
          break;

        case "Add to Inventory":
          addInventory();
          break;

        case "Add New Product":
          newProduct();
          break;
      }
    });
}

function viewProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("ID#: " + res[i].id + " || " + "Product: " + res[i].product_name + " || " + "Price : $" + res[i].price + " || " + "In stock: " + res[i].stock_quantity);
    }
    runOptions();
  });
}

function lowInventory() {
  var query = "SELECT * FROM products WHERE stock_quantity < 5";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("Product: " + res[i].product_name + " || " + "In stock: " + res[i].stock_quantity);
    }
    runOptions();
  });
}

// function addInventory() {
//   inquirer
//     .prompt([{
//         name: "start",
//         type: "input",
//         message: "Enter starting position: ",
//         validate: function (value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       },
//       {
//         name: "end",
//         type: "input",
//         message: "Enter ending position: ",
//         validate: function (value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       }
//     ])
//     .then(function (answer) {
//       var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//       connection.query(query, [answer.start, answer.end], function (err, res) {
//         for (var i = 0; i < res.length; i++) {
//           console.log(
//             "Position: " +
//             res[i].position +
//             " || Song: " +
//             res[i].song +
//             " || Artist: " +
//             res[i].artist +
//             " || Year: " +
//             res[i].year
//           );
//         }
//         runOptions();
//       });
//     });
// }

// function newProduct() {
//   inquirer
//     .prompt({
//       name: "song",
//       type: "input",
//       message: "What song would you like to look for?"
//     })
//     .then(function (answer) {
//       console.log(answer.song);
//       connection.query("SELECT * FROM top5000 WHERE ?", {
//         song: answer.song
//       }, function (err, res) {
//         console.log(
//           "Position: " +
//           res[0].position +
//           " || Song: " +
//           res[0].song +
//           " || Artist: " +
//           res[0].artist +
//           " || Year: " +
//           res[0].year
//         );
//         runOptions();
//       });
//     });
// }