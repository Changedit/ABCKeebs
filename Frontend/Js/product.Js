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

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productLine = urlParams.get("productLine");

function getProductLine() {
  var request = new XMLHttpRequest();

  request.open(
    "GET",
    "http://localhost:8080/GETproductline/" + productLine,
    true
  );

  request.onload = function () {
    var products = JSON.parse(request.responseText);
    console.log(products);
  };

  request.send();
}

window.onload = function () {
  getProductLine();
};

