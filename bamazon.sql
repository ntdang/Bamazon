DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) default 0 NOT NULL,
  stock_quantity INT default 0 NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO 
  products (product_name, department_name, price, stock_quantity)
VALUES 
  ("PurSteam Fabric Steamer", "Home & Kitchen", 19.99, 4), 
  ("Web Design with HTML, CSS, Javascript, and jQuery", "Books", 29.55, 7), 
  ("Cheetah Adult Onesie", "Clothing", 29.99, 5),
  ("Thayers Witch Hazel Toner", "Beauty & Personal Care", 8.76, 11),
  ("Aztec Healing Face Mask", "Beauty & Personal Care", 8.70, 2),
  ("Friends Pivot Mug", "Home & Kitchen", 14.75, 6),
  ("Magic Treehouse Boxed Set", "Books", 16.24, 7),
  ("Mosiso Macbook Air case", "Electronics", 15.99, 2),
  ("Wireless Mouse", "Electronics", 8.59, 1),
  ("Plaid Blanket Scarf", "Clothing", 12.79, 3);