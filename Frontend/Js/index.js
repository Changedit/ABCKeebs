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

    var keyboardDictionary = {};
    for (var i = 0; i < keyboards.length; i++) {
      var keyboard = keyboards[i];
      if (!keyboardDictionary[keyboard.name]) {
        keyboardDictionary[keyboard.name] = [];
      }
      keyboardDictionary[keyboard.name].push(keyboard);
        }
      console.log(keyboardDictionary);

      
  };

  request.send();
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
