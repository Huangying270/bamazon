DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE items (
  item_id INT NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INTEGER(10),
  PRIMARY KEY (item_id)
);

INSERT INTO items (item_name, category, price, stock)
VALUES  ("Nintendo Switch", "Electronics", 299.99, 99),
        ("Super Mario Party", "Games", 39.99, 99),
        ("Samsung Refrigerator", "Appliances", 799.99, 99),
        ("Babalot Tennis Racquet", "Sports", 149.99, 49),
        ("Wilson Tennis Bag", "Sports", 49.99, 60),
        ("Marshmallow Bag", "Food", 6.99, 199),
        ("Oreos", "Food", 8.99, 399),
        ("Settlers of Catan", "Games", 49.99, 50);
