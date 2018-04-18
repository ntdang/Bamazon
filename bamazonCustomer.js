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
      console.log("ID#: " + res[i].id + " || " + "Product: " + res[i].product_name + " || " + "Price : $" + res[i].price);
    }
    //inquirer prompts asking what product user wants to buy and how many
    inquirer
      .prompt([{
          //ask for ID of product they want to buy
          name: 'itemId',
          message: 'What is the ID# of the product you want to buy?',
          type: 'input',
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
        {
          //ask how many they want to buy
          name: 'quantity',
          message: 'How many would you like to buy?',
          type: 'input',
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function (response) {
        var itemPicked = res[0];
        connection.query("SELECT stock_quantity FROM products WHERE id ='" + response.itemId + "'", function (err, res) {
          if (err) throw err;
          console.log(res[0]);
          if (response.quantity > itemPicked.stock_quantity) {
            console.log("Sorry! Not enough product in stock!");
          } else {
            console.log("Thank you for your purchase!");
            // connection.query("UPDATE products SET ? WHERE ?")
          }
        })
      });
  })
}