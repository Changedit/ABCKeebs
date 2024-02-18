// Function to load product data from the server
function populateProductTable() {
  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:8080/GETProducts", true);
  request.onload = function () {
    if (request.status === 200) {
      var products = JSON.parse(request.responseText);
      displayProductData(products);
    } else {
      console.error("Error loading products. Status:", request.status);
    }
  };
  request.onerror = function () {
    console.error("Request failed");
  };
  request.send();
}

function populateCategoryTable() {
  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:8080/GETcategories", true);
  request.onload = function () {
    if (request.status === 200) {
      var categories = JSON.parse(request.responseText);
      displayCategoryData(categories);
    } else {
      console.error("Error loading categories. Status:", request.status);
    }
  };
  request.onerror = function () {
    console.error("Request failed");
  };
  request.send();
}

function displayCategoryData(categories) {
  var categoryData = document.getElementById("categoryData");
  var tbody = categoryData.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";

  categories.forEach(function (category) {
    let params = "";
    for (const info in category) {
      params += `${info}=${encodeURIComponent(category[info])}&`;
    }
    console.log(category);
    var newRow = tbody.insertRow();
    newRow.innerHTML = `
        <td>${category.id}</td>
        <td>${category.name}</td>
        <td class="btn-container">
          <button class="btn" onclick="editCategory(${"`" + params + "`"})">Edit</button>
          <button class="btn" onclick="deleteCategoryData(${category.id})">Delete</button>
        </td>
      `;
  });
}

// Function to display product data in the table
function displayProductData(products) {
  var productData = document.getElementById("productData"); // Assuming your table has the ID 'productData'
  var tbody = productData.getElementsByTagName("tbody")[0];
  tbody.innerHTML = ""; // Clear existing data

  products.forEach(function (product) {
    let params = "";
    for (const info in product) {
      params += `${info}=${encodeURIComponent(product[info])}&`;
    }
    console.log(product);
    var newRow = tbody.insertRow();
    newRow.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.variant}</td>
        <td>${product.price}</td>
        <td>${product.description}</td>
        <td><img src="../${product.picture}" alt="Product Image" width="150"></td> 
        <td>${product.category_id}</td>
        <td>${product.category_name}</td> 
        <td class="btn-container">
          <button class="btn" onclick="editProduct(${"`" + params + "`"})">Edit</button>
          <button class="btn" onclick="deleteProductData(${product.id})">Delete</button>
        </td>
      `;
  });
}

function editCategory(params) {
  window.location.href = `PUT_Category.html?${params}`;
}

function deleteCategoryData(categoryId) {
  if (confirm("Are you sure you want to delete this category?")) {
    console.log("Deleting category with ID: " + categoryId);

    var request = new XMLHttpRequest();
    const response = fetch("http://localhost:8080/DELETEcategory/" + categoryId, {
      method: "DELETE",
    });

    response.then((res) => {
      if (res.ok) {
        alert("Category deleted successfully!");
        location.href = "/Admin.html"; // Or reload the current page
      } else {
        console.error("Failed to delete category. Status:", res.status);
      }
    }
    );
  }
}

// Function to handle editing a product
function editProduct(params) {
  // Redirect to updateProductData.html with the product ID as a query parameter
  window.location.href = `PUT_Product.html?${params}`;
}

// Function to handle deleting a product
function deleteProductData(productId) {
  if (confirm("Are you sure you want to delete this product?")) {
    console.log("Deleting product with ID: " + productId);

    var request = new XMLHttpRequest();
    request.open(
      "DELETE",
      "http://localhost:8080/DELETEproduct/" + productId,
      true
    );

    request.onload = function () {
      if (request.status === 200) {
        console.log("Product deleted successfully");
        location.href = "/Admin.html"; // Or reload the current page
      } else {
        console.error("Failed to delete product. Status:", request.status);
      }
    };

    request.send();
  }
}

function redirect(location) {
  window.location.href = location
}

// Load product data when the page is loaded
window.onload = function () {
  populateProductTable();
  populateCategoryTable();
};
