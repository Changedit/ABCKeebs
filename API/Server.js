// Import required modules
const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql");

// Configuration
const frontendPath = path.join(__dirname, "../Frontend");
const dbConfig = {
  host: "localhost",
  port: "3306", // Default port for MySQL is 3306
  user: "root",
  password: "john4int",
  database: "ABCKeeb",
};
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(frontendPath));
app.use(cors());

// Database Connection Pool
const db = mysql.createPool(dbConfig);

// Input Validation (Simplified Example)
function validateProductData(productData) {
  console.log("Validating Product Data:", productData); // Logs out entire object

  if (!productData.product_name || !productData.price) {
      throw new Error("Missing required fields");
  } 
  // ... Further checks ...
} 

// Error Handling Middleware
function handleError(err, req, res, next) {
  console.error(err);
  const statusCode = err.statusCode || 500; // Customize status codes as needed
  res
    .status(statusCode)
    .json({ error: err.message || "Internal Server Error" });
}

// Helper function for database queries
function executeQuery(sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

//  Routes (with improvements)
app.route("/GETproduct/:id").get(async (req, res) => {
  try {
    const sql =
    "SELECT product.id AS id, " +
    "product.name AS name, " +
    "product.description AS description, " +
    "product.price AS price, " +
    "category.id AS category_id, " + // Include category_id
    "category.name AS category_name, " +
    "product.picture AS picture, " +
    "product.variant AS variant " +
    "FROM `ABCKeeb`.`product` " +
    "JOIN `ABCKeeb`.`category` ON product.category_id = category.id";
      "WHERE product.id = ?";
    const parameters = [req.params.id];
    const result = await executeQuery(sql, parameters);

    if (result.length === 0) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(result);
    }
  } catch (error) {
    handleError(error, req, res);
  }
});

app.route("/GETproductline/:name").get(async (req, res) => {
  try {
      const sql = "SELECT product.name, " +
                  "product.description AS description, " +
                  "product.price AS price, " +
                  "category.id AS category_id, " + 
                  "category.name AS category_name, " +
                  "product.picture AS picture, " +
                  "product.variant AS variant " +
                  "FROM `ABCKeeb`.`product` " +
                  "JOIN `ABCKeeb`.`category` ON product.category_id = category.id " +
                  "WHERE product.name = ?";
      const parameters = [req.params.name]; 
      const result = await executeQuery(sql, parameters);

      if (result.length === 0) {
          res.status(404).json({ error: "Product line not found" }); // Refined Error
      } else {
          res.json(result);
      }
  } catch (error) {
      handleError(error, req, res);
  }
});

app.route("/GETproducts").get(async (req, res) => {
    try {
      const sql =
        "SELECT product.id AS id, " +
        "product.name AS name, " +
        "product.description AS description, " +
        "product.price AS price, " +
        "category.id AS category_id, " + // Include category_id
        "category.name AS category_name, " +
        "product.picture AS picture, " +
        "product.variant AS variant " +
        "FROM `ABCKeeb`.`product` " +
        "JOIN `ABCKeeb`.`category` ON product.category_id = category.id";
      const result = await executeQuery(sql);
      res.json(result);
    } catch (error) {
      handleError(error, req, res);
    }
  });
  

app.options("POST", cors());
app.route("/POSTproduct").post(async (req, res) => {
  try {
    validateProductData(req.body);

    const sql =
      "INSERT INTO `ABCKeeb`.`product` (`name`, `description`, `price`, `category_id`, `picture`, `variant`) VALUES (?, ?, ?, ?, ?, ?)";
    const parameters = [
      req.body.product_name,
      req.body.description,
      req.body.price,
      req.body.category_id,
      req.body.picture,
      req.body.variant,
    ];

    const result = await executeQuery(sql, parameters);
    res.json(result);
  } catch (error) {
    handleError(error, req, res);
  }
});

// PUT /UPDATE product Route
app.route("/UPDATEproduct/:id").put(async (req, res) => {
  try {
    validateProductData(req.body);

    const sql =
      "UPDATE `ABCKeeb`.`product` SET name = ?, description = ?, price = ?, category_id = ?, picture = ?, variant = ? WHERE id = ?";
    const parameters = [
      req.body.product_name,
      req.body.description,
      req.body.price,
      req.body.category_id,
      req.body.picture,
      req.body.variant,
      req.params.id,
    ];

    const result = await executeQuery(sql, parameters);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(result);
    }
  } catch (error) {
    handleError(error, req, res);
  }
});

// DELETE /DELETE product Route
app.route("/DELETEproduct/:id").delete(async (req, res) => {
  try {
    const sql = "DELETE FROM `ABCKeeb`.`product` WHERE id = ?";
    const parameters = [req.params.id];

    const result = await executeQuery(sql, parameters);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(result);
    }
  } catch (error) {
    handleError(error, req, res);
  }
});

app.route("/GETcategory/:id").get(async (req, res) => {
  try {
      const categoryId = req.params.id;

      // Assuming 'executeQuery' is your database function:
      const sql = "SELECT * FROM `ABCKeeb`.`category` WHERE id = " + categoryId; 
      const parameters = [categoryId];
      const result = await executeQuery(sql, parameters); 

      if (result.length === 0) {
          res.status(404).json({ error: "Category not found" });
      } else {
          const categoryData = result[0]; // Access  single record 
          res.json(categoryData); 
      }
  } catch (error) {
      handleError(error, req, res); 
  }
});

// Error Handling (place at the end)
app.use(handleError);

// Server start
app.listen(8080, "127.0.0.1");
console.log("web server running @ http://127.0.0.1:8080");
