//bring in mysql and inquirer packages
var mysql = require("mysql");
var inquirer = require("inquirer");

//connect to localhost
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
  // console.log("Connected as id " + connection.threadId);
  displayItems();
});

//display all items
function displayItems() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("ID " + res[i].id + " || " + "Product: " + res[i].product_name + " || " + "Price : $" + res[i].price);
    }
    //inquirer prompt asking what product user wants to buy and how many
    inquirer
      .prompt([{
          //ask for ID of product they want to buy
          name: 'id',
          message: 'What is the ID of the product you want to buy?',
          type: 'input',
          default: 1
        },
        {
          //ask how many they want to buy
          name: 'units',
          message: 'How many would you like to buy?',
          type: 'input',
          default: 1
        }
      ])
      .then(function (response) {
        var itemPicked = {};
        console.log(response);
        for (var i = 0; i < res.length; i++) {
          if (res[i].id === response.id) {
            itemPicked = res[i];
          }
        };
        console.log(itemPicked);

        if (itemPicked.stock_quantity < response.units) {
          console.log("Sorry! Insufficient quantity!");
        }
      })
  });
};