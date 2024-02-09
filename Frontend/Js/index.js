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
function getProductData() {
  var request = new XMLHttpRequest();

  request.open("GET", "http://localhost:8080/GET products", true);

  request.onload = function () {
    var obj = JSON.parse(request.responseText);
    console.log(obj);

    // Get div elements by id
    var productLine = document.getElementById("product-line");

    for (var i = 0; i < obj.length; i++) {
      if (obj[i].category_name === "Keyboard") {
        // Update the content of div elements
        productLine.innerHTML +=
          '<li class="card-med"' +
          colorDictionary[obj[i].variant] +
          ">" +
          '<div class="card-image">' +
          '<img src="' +
          obj[i].picture +
          '"/>' +
          "</div>";
        '<a href="#">' +
          "<span>" +
          obj[i].name +
          "</span>" +
          '<span>More Info<span class="material-symbols-outlined">arrow_forward</span></span>' +
          "</a>" +
          "</li>";
      }
    }
  };

  request.send();
}


