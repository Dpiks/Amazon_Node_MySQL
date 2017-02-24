var inquirer = require("inquirer");
var mysql = require("mysql");

//details of DB connection are stored using the the 'mysql' constructor 'createConnection' 
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: "abcd12",
    database: 'amazon_db'
});


console.log("Welcome to Basic Amazon App!!");

//establishing connection with amazon_db at MySQL
connection.connect(function(err) {
    if (err) throw err;
    //The user is allowed to query the DB only after a connection is established
    promptUser();
});

console.log("Welcome to Basic Amazon App!!");

function promptUser() {
    inquirer.prompt([{
        name: "user_choice",
        type: "rawlist",
        message: "What would you like to do?",
        choices: ["Search product catalog", "Exit"],
        default: ["Search product catalog"]
    }]).then(function(user) {
        if (user.user_choice === "Search product catalog") {
            displayProducts();
            // promptBuyer();
        } else {
            connection.end();
        }
    });
}


function displayProducts() {
    connection.query("SELECT item_id,product_name,price FROM PRODUCTS", function(err, data) {
        console.log("ID \t Product \t Price \n");
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].item_id + "\t" + data[i].product_name + "\t $" + data[i].price);
        }
        promptBuyer();
    });
}

function promptBuyer() {
    inquirer.prompt([{
        name: "product_id",
        type: "input",
        message: "From the list above, What would you like to buy?\nEnter the ID of the product:",
        validate: function(value) {
            if (!isNaN(value)) {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function(product) {
        var prod_id = product.product_id;
        let query = "SELECT COUNT(item_id) as Exist FROM PRODUCTS WHERE ?";
        connection.query(query, { item_id: prod_id }, function(err, data) {


            if (data[0].Exist === 1) {

                promptQuantity(prod_id);


            } else {
                console.log("Enter a valid product ID!!\n");
                promptBuyer();
            }

        });
    });
}

function promptQuantity(prod_id) {
    inquirer.prompt([{
        name: "product_quantity",
        type: "input",
        message: "Enter the quantity you would like to buy: "
    }]).then(function(product) {
        purchaseProduct(prod_id, product.product_quantity);
    })
}

function purchaseProduct(id, quantity) {

    inquirer.prompt([{
        name: "confirm",
        type: "confirm",
        message: "Do you want to place the order?",
        default: false
    }]).then(function(confirm) {
       
        if (confirm.confirm) {
            connection.query("SELECT stock_quantity FROM Products where ?", { item_id: id }, function(err, data) {

                if (err) throw err;
                if (data[0].stock_quantity >= quantity) {
                    //Update the stock in the DB accounting for the sale
                    //UPDATE Products SET stock_quantity = stock_quantity-quantity WHERE item_id=id
                    connection.query("UPDATE Products SET ? WHERE ?", [{ stock_quantity: data[0].stock_quantity - quantity }, { item_id: id }], function(err, data) {
                        if (err) throw err;
                        connection.query("SELECT price FROM Products where ?", { item_id: id }, function(err, data) {
                            console.log("----------------------------------------------------------\n \t\tPurchase Successful!!");
                            console.log("\t\tThe cost of your purchase is " + data[0].price * quantity);
                            console.log("----------------------------------------------------------");
                            promptUser();
                        })
                    })

                } else {
                    console.log("Insufficient quantity!! Try a lesser quantity");
                    promptQuantity(id);
                }
            })
        }else{
        	promptUser();
        }
    })
}
