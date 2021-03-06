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

//options for manager function
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
};

//displays products and all info
function viewProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("ID#: " + res[i].id + " || " + "Product: " + res[i].product_name + " || " + "Price : $" + res[i].price + " || " + "In stock: " + res[i].stock_quantity);
    }
    runOptions();
  });
};

//shows products that have less than 5 in stock
function lowInventory() {
  var query = "SELECT * FROM products WHERE stock_quantity < 5";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("Product: " + res[i].product_name + " || " + "In stock: " + res[i].stock_quantity);
    }
    runOptions();
  });
};

//lets manager add inventory to product of choice
function addInventory() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // console.log(res);
    var productsArr = [];
    for (var i = 0; i < res.length; i++) {
      productsArr.push(res[i].product_name);
    }

    inquirer
      .prompt([{
          name: 'add',
          message: 'Which product would you like to add more of?',
          type: 'list',
          choices: productsArr
        },
        {
          name: 'howMany',
          message: 'How many do you want to add?',
          type: 'input',
          default: 1,
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function (choice) {
        var itemPicked = {};
        for (var i = 0; i < res.length; i++) {
          if (res[i].product_name === choice.add) {
            itemPicked = res[i];
          }
        };
        // console.log(itemPicked);
        //update the inventory of that selected item
        console.log("Stock for this product has been updated.");
        connection.query('UPDATE products SET stock_quantity = ' + (itemPicked.stock_quantity + parseInt(choice.howMany)) + ' WHERE id = ' + itemPicked.id, function (err, res) {
          if (err) throw err;
          // console.log(res.affectedRows);
        })
        runOptions();
      });
  });
};

//lets manager add a new product into store
function newProduct() {
  inquirer
    .prompt([{
        name: 'new',
        message: 'What new product do you want to add?',
        type: 'input',
        default: 'Computer'
      },
      {
        name: 'department',
        message: 'What department does the product go under?',
        type: 'input',
        default: 'Electronics'
      },
      {
        name: 'price',
        message: 'How much is the product?',
        type: 'input',
        default: 5
      },
      {
        name: 'stock',
        message: 'How many are in stock?',
        type: 'input',
        default: 1
      }
    ])
    .then(function (data) {
      console.log("Added a new product...\n");
      var query = connection.query(
        "INSERT INTO products SET ?", {
          product_name: data.new,
          department_name: data.department,
          price: data.price,
          stock_quantity: data.stock
        },
        function (err, res) {
          if (err) throw err;
        }
      );
      runOptions();
    });
};