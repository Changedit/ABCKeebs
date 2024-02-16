function listProducts() {
  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:8080/GETProducts", true);
  request.onload = function () {
    var products = JSON.parse(request.responseText);

    if (request.status === 200) {
      var products = JSON.parse(request.responseText);
      var categorizedProducts = {}; // Using an object for a more convenient structure

      for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let productName = product.name;
        let categoryName = product.category_name;

        if (!categorizedProducts[categoryName]) {
          categorizedProducts[categoryName] = {}; // Create category if it doesn't exist
        }

        if (!categorizedProducts[categoryName][productName]) {
          categorizedProducts[categoryName][productName] = []; // Create product entry
        }

        categorizedProducts[categoryName][productName].push(product);
      }

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      var requestedCategory = urlParams.get("category");

      var title = document.getElementById("title");
      if (requestedCategory) {
        title.innerHTML = requestedCategory;
      } else {
        title.innerHTML = "All Products";
      }
      var productList = document.getElementById("product-list");

      for (const category in categorizedProducts) {
        for (const items in categorizedProducts[category]) {
          const item = categorizedProducts[category][items];
          const category_id = item[0].category_id;
          if (categorizedProducts[category].hasOwnProperty(items)) {
            const variants = item;
            let randomIndex = Math.floor(Math.random() * variants.length);
            let randomVariant = variants[randomIndex];

            if (
              requestedCategory &&
              requestedCategory !== randomVariant.category_name
            ) {
              continue;
            }

            let name = randomVariant.name;
            let thumbnail = randomVariant.picture;
            let description = randomVariant.description;
            let category_name = randomVariant.category_name;

            console.log(thumbnail);
            //Gets the highest price of the product
            var price = Math.min.apply(
              Math,
              variants.map(function (product) {
                return parseFloat(product.price).toFixed(2); // Add parseFloat and toFixed(2)
              })
            );

            if (category_name === "Switches") {
              price += " / switch";
            }

            productList.innerHTML +=
              `<li>` +
              `<div class="product-card">` +
              `<div class="badge">Hot</div>` +
              `<div class="product-tumb"><img src="` +
              thumbnail +
              `" alt=""></div>` +
              `<div class="product-details">` +
              `<span class="product-category">` +
              category_name +
              `</span>` +
              `<h4><a href="product.html?category_id=` + category_id + `&name=` + name +
              `">` +
              name +
              `</a></h4>` +
              `<p class="description">` +
              description +
              `</p>` +
              `<div class="product-bottom-details">` +
              `<div class="product-price">$` +
              price +
              `</div>` +
              `</div>` +
              `</div>` +
              `</div>` +
              `</li>`;
          }
        }
      }
    } else {
      console.error("Error loading products. Status:", request.status);
    }
  };
  request.onerror = function () {
    console.error("Request failed");
  };
  request.send();
}
