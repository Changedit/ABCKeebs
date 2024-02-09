


// Function to load product data from the server
function loadProductData() {
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
  
  // Function to display product data in the table
  function displayProductData(products) {
    var productData = document.getElementById("productData"); // Assuming your table has the ID 'productData'
    var tbody = productData.getElementsByTagName("tbody")[0];
    tbody.innerHTML = ""; // Clear existing data
  
    products.forEach(function (product) {
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
          <button class="btn" onclick="editProduct(${product.id})">Edit</button>
          <button class="btn" onclick="deleteProductData(${product.id})">Delete</button>
        </td>
      `;
    });
  }
  
  // Function to handle editing a product
  function editProduct(productId) {
    // Redirect to updateProductData.html with the product ID as a query parameter
    window.location.href = `updateProductData.html?id=${productId}`;
  }
  
  // Function to handle deleting a product
  function deleteProductData(productId) {
    if (confirm("Are you sure you want to delete this product?")) {
      console.log("Deleting product with ID: " + productId);
  
      var request = new XMLHttpRequest();
      request.open("DELETE", "http://localhost:8080/DELETEproduct/" + productId, true);
  
      request.onload = function () {
        if (request.status === 200) {
          console.log("Product deleted successfully");
          location.href = "/GET_Products.html"; // Or reload the current page
        } else {
          console.error("Failed to delete product. Status:", request.status);
        }
      };
  
      request.send();
    }
  }
  
  // Load product data when the page is loaded
  window.onload = function () {
    loadProductData();
  };