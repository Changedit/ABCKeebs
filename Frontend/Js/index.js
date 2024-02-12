// Function to retrieve all products and update the HTML content for the product list
function getProducts() {
  var request = new XMLHttpRequest();

  request.open("GET", "http://localhost:8080/GETproducts", true);

  request.onload = function () {
    var products = JSON.parse(request.responseText);
    var keyboards = [];
    var keycaps = [];
    var switches = [];
    var accessories = [];
    var randomKeyboards = {};

    for (var i = 0; i < products.length; i++) {
      var product = products[i];
      if (product.category_name === "Keyboards") {
        keyboards.push(product);
      } else if (product.category_name === "Keycaps") {
        keycaps.push(product);
      } else if (product.category_name === "Switches") {
        switches.push(product);
      } else {
        accessories.push(product);
      }
    }

    console.log(keyboards);
    console.log(keycaps);
    console.log(switches);
    console.log(accessories);

    let nameVariantsMap = {};
    // Build a map of product names to their variants
    keyboards.forEach(product => {
        if (!nameVariantsMap[product.name]) {
            nameVariantsMap[product.name] = [];
        }
        nameVariantsMap[product.name].push(product);
    });
    // Select one variant randomly from each product name
    for (let productName in nameVariantsMap) {
        if (nameVariantsMap.hasOwnProperty(productName)) {
            let variants = nameVariantsMap[productName];
            let randomIndex = Math.floor(Math.random() * variants.length);
            let randomVariant = variants[randomIndex];
            randomKeyboards[productName] = randomVariant;
        }
    }
    
    const productLine = document.getElementById("product-list");
    let html = "";
    for (const productName in products) {
      if (product.hasOwnproperty(productName)) {
        html += generateProductHTML(products[productName]);
      }
    }
    productList.innerHTML = html;

  };
  request.send();
}

// Function to generate HTML for each product
function generateProductHTML(product) {
  return `
    <li class="card-med">
      <div class="card-image" style="background: ${variantDictionary[product.variant.toLowerCase()] || '#fafafa'}">
        <img src="${product.picture}" />
      </div>
      <a href="#">
        <span>${product.name}</span>
        <span>More Info <span class="material-symbols-outlined">arrow_forward</span></span>
      </a>
    </li>
  `;
}

var variantDictionary = {
  azur: "background: #2ecbbe",
  iced: "background: #c9cdd0",
  haze: "background: #a53fb8",
  soya: "background: #aea797",
  moon: "background: #818a8b",
  noct: "background: #6d6e70",
  kuro: "background: #b7b9b8",
  rose: "background: #a59790",
  null: "background: #fafafa",
};

window.onload = function () {
  getProducts();
};
