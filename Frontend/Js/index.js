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

    for (var i = 0; i < keyboards.length; i++) {
      var keyboard = keyboards[i];
      
        }
      

      
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
  null: "background: #ffffff",
};

window.onload = function () {
  getProducts();
};
