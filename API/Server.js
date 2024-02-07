// Import required modules
var express = require("express");
const app = express();
var cors = require("cors");

// Import required modules
const path = require('path');
const frontendPath = path.join(__dirname, '../Frontend');
const dbPath = path.join(__dirname, '../DB/db');
const db = require(dbPath); // This file handles database connections

// Middleware setup
app.use(express.json()); // Parse incoming requests as JSON
app.use(express.static(frontendPath)); // Serve static files from the 'Frontend' directory)
app.use(cors()); // Enable Cross-Origin Resource Sharing

app.route('GET product').get(function (req, res) {
    var sql = "SELECT product.id AS id, " +
            "product.name AS name, " +
            "product.description AS description, " +
            "product.price AS price, " +
            "category.name AS name, " +
            "product.picture AS picture " +
            "FROM `e-commerce`.`product` " +
            "JOIN `e-commerce`.`category` ON product.category_id = category.id " +
            "WHERE product.id = ?";
    var parameters = [req.params.id];

    db.query(sql, parameters, function (error, result) {
        if (error) {
            // Handle errors gracefully
            console.error("Error retrieving product:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            if (result.length === 0) {
                // Return product is not found if there are no results
                res.status(404).json({ error: "Product not found" });
            } else {
                res.json(result);
            }
        }
    });
});

// Define route to get all products with category names
app.route('GET products').get(function (req, res) {
    var sql = "SELECT product.id AS id, " +
            "product.name AS name, " +
            "product.description AS description, " +
            "product.price AS price, " +
            "category.name AS name, " +
            "product.picture AS picture " +
            "FROM `e-commerce`.`product` " +
            "JOIN `e-commerce`.`category` ON product.category_id = category.id";

    db.query(sql, function (error, result) {
        if (error) {
            console.error("Error retrieving products:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(result);
        }
    });
});

// Enable pre-flight request for POST request to prevent CORS policy error
app.options('POST', cors());

// Define route to handle POST requests to add a new product
app.route('POST product').post(function (req, res) {
    var sql = "INSERT INTO `e-commerce`.`product` (`name`, `description`, `price`, `category_id`, `picture`) VALUES (?, ?, ?, ?, ?)";
    var parameters = [req.body.product_name, req.body.description, req.body.price, req.body.category_id, req.body.picture];

    db.query(sql, parameters, function (error, result) {
        if (error) {
            console.error("Error inserting product:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(result);
        }
    });
});

// Define route to handle PUT requests to update a product by ID
app.route('UPDATE product').put(function (req, res) {
    var sql = "UPDATE `e-commerce`.`product` SET name = ?, description = ?, price = ?, category_id = ?, picture = ? WHERE id = ?";
    var parameters = [req.body.product_name, req.body.description, req.body.price, req.body.category_id, req.body.picture, req.params.id];

    db.query(sql, parameters, function (error, result) {
        if (error) {
            console.error("Error updating product:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            if (result.affectedRows === 0) {
                // Return a 404 response if the product is not found
                res.status(404).json({ error: "Product not found" });
            } else {
                res.json(result);
            }
        }
    });
});

// Define route to handle DELETE requests to delete a product by ID
app.route('DELETE product').delete(function (req, res) {
    var sql = "DELETE FROM `e-commerce`.`product` WHERE id = ?";
    var parameters = [req.params.id];

    db.query(sql, parameters, function (error, result) {
        if (error) {
            console.error("Error deleting product:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ error: "Product not found" });
            } else {
                res.json(result);
            }
        }
    });
});

app.listen(8080, "127.0.0.1"); // start the nodejs to be listening for incoming request @ port 8080
console.log("web server running @ http://127.0.0.1:8080"); // output to console to show that the server is running