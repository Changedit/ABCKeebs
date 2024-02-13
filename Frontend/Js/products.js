function listProducts() {
  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:8080/GETProducts", true);
  request.onload = function () {
    var products = JSON.parse(request.responseText);

    if (request.status === 200) {
      var products = JSON.parse(request.responseText);
      var keyboards = {};
      var keycaps = {};
      var acccessories = {};
      var switches = {};

      for (var i = 0; i < products.length; i++) {
        let product = products[i];
        if (product.category_name === "Keyboards") {
          if (!keyboards[product.name]) {
            keyboards[product.name] = [];
          }
          keyboards[product.name].push(product);
        } else if (product.category_name === "Keycaps") {
          if (!keycaps[product.name]) {
            keycaps[product.name] = [];
          }
          keycaps[product.name].push(product);
        } else if (product.category_name === "Switches") {
          if (!switches[product.name]) {
            switches[product.name] = [];
          }
          switches[product.name].push(product);
        } else {
          if (!acccessories[product.name]) {
            acccessories[product.name] = [];
          }
          acccessories[product.name].push(product);
        }
      }

      console.log(keyboards);
      console.log(keycaps);
      console.log(switches);
      console.log(acccessories);

      var productList = document.getElementById("product-list");

      var allCategories = [keyboards, keycaps, switches, acccessories];
      for (let i = 0; i < allCategories.length; i++) {
        let category = allCategories[i];
        for (const item in category) {
          if (category.hasOwnProperty(item)) {
            const variants = category[item];
            let randomIndex = Math.floor(Math.random() * variants.length);
            let randomVariant = variants[randomIndex];
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
              `<span class="product-category">`+ category_name + `</span>` +
              `<h4><a href="product.html?productLine=` +
              name +
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
