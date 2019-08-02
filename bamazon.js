var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    displayInventory();
});

function displayInventory() {
    var query = "SELECT * FROM items";
    connection.query(query, function (err, res) {
        if (err) throw err;
        var displayTable = new Table({
            head: ["Item ID", "Item Name", "Category", "Price", "Stock Quantity"],
            colWidth: [10, 20, 20, 10, 10]
        });
        for (var i = 0; i < res.length; i++) {
            displayTable.push([res[i].item_id, res[i].item_name, res[i].category, res[i].price, res[i].stock]);
        }
        console.log(displayTable.toString());
        makePurchase();
    });
}

function makePurchase() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "Please enter item ID you would like to purchase"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to purchase?"
            }
        ]).then(function(answer){
            var itemID = answer.id;
            var quantityWanted = answer.quantity;
            console.log(itemID);
            console.log(quantityWanted);
        });
}

/* CREATE TABLE items (
    item_id INT NOT NULL AUTO_INCREMENT,
    item_name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER(10),
    PRIMARY KEY (item_id)
  ); */