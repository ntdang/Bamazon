# Bamazon

This is an Amazon-like CLI app that takes in orders from customers and depletes stock from the store's inventory, which is stored in databases using mySQL/Sequel Pro. This app requires the **mySQL** and **Inquirer** npm packages to be installed. 

The *customer app* first displays all of the items available for sale. It prompts the user with two messages: the id of the product they want to purchase, and how many.

If there is **not enough** of the product in stock...

[![https://gyazo.com/21f3752aac80baf692d818f67ba8247e](https://i.gyazo.com/21f3752aac80baf692d818f67ba8247e.gif)](https://gyazo.com/21f3752aac80baf692d818f67ba8247e)

If there **is enough** in stock, it will show the customer the total price. It will also deplete from the stock and update in the database...

[![https://gyazo.com/d79775f669ca787e3d934bf512be0046](https://i.gyazo.com/d79775f669ca787e3d934bf512be0046.gif)](https://gyazo.com/d79775f669ca787e3d934bf512be0046)

The *manager app* gives the manager the following options: 
* View Products for Sale

* View Low Inventory

* Add to Inventory

* Add New Product

The first option displays all the products for sale and the second option displays the products with an inventory count of less than 5...

[![https://gyazo.com/bbf2de8a719e1bbe75c5462b51c52aab](https://i.gyazo.com/bbf2de8a719e1bbe75c5462b51c52aab.gif)](https://gyazo.com/bbf2de8a719e1bbe75c5462b51c52aab)

The third option allows the manager to add to the inventory of a specific product and updates it in the database...

[![https://gyazo.com/ce93810098d8ef34498d174258ba8273](https://i.gyazo.com/ce93810098d8ef34498d174258ba8273.gif)](https://gyazo.com/ce93810098d8ef34498d174258ba8273)

The fourth option allows the manager to add a new product into a specific department, and asks for the price and how many will be in stock. This will be updated in the database...

[![https://gyazo.com/4bae4a8be250414bc4026c8e33547006](https://i.gyazo.com/4bae4a8be250414bc4026c8e33547006.gif)](https://gyazo.com/4bae4a8be250414bc4026c8e33547006)

The *supervisor app* gives the supervisor the following options:
* View Product Sales by Department
* Create New Department

The first option prints out a table in terminal that summarizes each department's overhead costs, product, and total profit.
(This option is still a work in progress.)

The second option allows the supervisor to create a new department with it's overhead costs. This will update in the database...

[![https://gyazo.com/7d677d059756d93303f3cce240b10a71](https://i.gyazo.com/7d677d059756d93303f3cce240b10a71.gif)](https://gyazo.com/7d677d059756d93303f3cce240b10a71)