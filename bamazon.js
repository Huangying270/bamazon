var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",
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
            confirmOrder(itemID, quantityWanted);
        });
}

function confirmOrder(id, amountWanted){
    connection.query("SELECT * FROM items WHERE item_id = " + id, function(err,res){
        if(err) throw err;
        if(amountWanted <= res[0].stock){
            var totalCost = res[0].price * amountWanted;
            console.log("Your total for " + amountWanted + " " + res[0].item_name + " is " + totalCost + " Thank you!");
            connection.query("UPDATE items SET stock = stock - " + amountWanted + " WHERE item_id = " + id);
        } else {
            console.log("Insufficient stock");
        };
        displayInventory();
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