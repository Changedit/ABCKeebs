const variantDictionary = {
  azur: "background: #2ecbbe",
  iced: "background: #c9cdd0",
  haze: "background: #a53fb8",
  soya: "background: #aea797",
  moon: "background: #818a8b",
  noct: "background: #6d6e70",
  kuro: "background: #b7b9b8",
  rose: "background: #a59790",
  dandy: "background: #768E72",
  neko: "background: #F8C8DC",
  metropolis: "background: #282B30",
};

// Function to retrieve all products and update the HTML content for the product list
function displayProductLines() {
  var request = new XMLHttpRequest();

  request.open("GET", "http://localhost:8080/GETproducts", true);

  request.onload = function () {
    var products = JSON.parse(request.responseText);
    var keyboards = [];
    var randomKeyboards = {};

    for (var i = 0; i < products.length; i++) {
      let product = products[i];
      if (product.category_name === "Keyboards") {
        keyboards.push(product);
    }
  }


    let nameVariantsMap = {};
    // Build a map of product names to their variants
    keyboards.forEach((product) => {
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

    var productLine = document.getElementById("product-line");
    for (const name in randomKeyboards) {
      let keyboard = randomKeyboards[name];
      console.log(name);
      let variant = randomKeyboards[name].variant;
      let color = variantDictionary[variant.toLowerCase()];
      if (!color) {
        color = "background: #fafafa";
      }
      productLine.innerHTML +=
        '<li class="card-med">' +
        '<div class="card-image" style="' +
        color +
        '">' +
        '<img src="' +
        keyboard.picture +
        '" />' +
        "</div>" +
        '<a href="product.html?category=Keyboards&productLine=' + keyboard.name + '">' +
        "<span>" +
        keyboard.name +
        "</span>" +
        '<span>More Info<span class="material-symbols-outlined">arrow_forward</span></span></a></li>';
    }
  };

  request.send();
}

function returnMain() {
  location.href = "/index.html";
}
