
var products = getProducts();

var colorDictionary = {
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

// Function to retrieve all products and update the HTML content for the product list
function getProducts() {
  var request = new XMLHttpRequest();

  request.open("GET", "http://localhost:8080/GETproducts", true);

  request.onload = function () {
    var obj = JSON.parse(request.responseText);
    console.log(obj);
    return obj;
  };

  request.send();

}

function randomKeyboard() {
  var keyboards = [];
  //loop through each product
  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    if (product.category_name === "Keyboards") {
      keyboards.push(product);
    }
  }
  //loop through each keyboard
  
}