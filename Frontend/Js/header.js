const variantDictionary = {
  azur: "#22BFB1, #054842",
  iced: "#CCCFD0,#454448",
  haze: "#A33EB7, #2D1740",
  soya: "#c1bcb0, #ABA494",
  moon: "#BEC6CC, #81898C",
  noct: "#707374, #1E1F23",
  milk: "#cadddd, #B6B9BA",
  kuro: "#535253, #010303",
  rose: "#F5E9DD , #A25D43",
  dandy: "#B8B1A7, #55655B",
  neko: "#C8BFC2, #BF7E96",
  metropolis: "#29A283 , #1D262A",
  dualshot: "#ADAEB3, #454649",
  fuji: "#6E6574, #A1A9C5",
  ivory: "#DABDAD, #DBB59F",
  eclipse: "#D16360, #201C22",
  pagoda: "#A6AFB9, #394250",
  rocks: "#D1BAAB, #5B6972",
  black: "#000000, #000000",
  duck: "#F7D67D, #606770",
  frog: "#63c552, #4c6045",
  cream: "#E7EEEA, #595950",
  ink: "#0B0B0B, #B3B2B1",
  dark: "#E46900, #555458",
  light: "#FCC133, #c8c2a1",
  lake: "#60697C, #2B3650",
  mint: "#80C0A5, #1D984C",
  musk: "#DFB3C4, #BE647F",
  tang: "#E4D2B7, #CB9139",
  yolk: "#E4C921, #2b2926",
  black: "#000000, #FFFFFF",
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
        '<div class="card-image" style="background: linear-gradient(196deg, ' +
        color +
        ')">' +
        '<img src="' +
        keyboard.picture +
        '" />' +
        "</div>" +
        '<a href="product.html?category_id=1&name=' + keyboard.name + '">' +
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
