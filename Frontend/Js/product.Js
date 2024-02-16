const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productLine = urlParams.get("name");
const category_id = encodeURIComponent(urlParams.get("category_id"));

function GETProductLine() {
  return fetch(
    `http://localhost:8080/GETProductLine?name=${productLine}&category_id=${category_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

function GETCategoryName() {
  return fetch(`http://localhost:8080/GETCategory/${category_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data.name)
    .catch((err) => console.log(err));
}


function updateProductInfo(category_name , price, variant, description) {
  const productCategory = document.getElementById("product-category-name");
  const productName = document.getElementById("product-name");
  const productPrice = document.getElementById("product-price");
  const productVariant = document.getElementById("product-variant");
  const productDescription = document.getElementById("product-desc");

  productCategory.innerHTML = decodeURIComponent(category_name);
  productName.innerHTML = decodeURIComponent(productLine);
  productPrice.innerHTML = `$${price}`;
  productVariant.innerHTML = decodeURIComponent(variant);
  productDescription.textContent = decodeURIComponent(description);
  
}

function displayProductLine(products, category_name) {
  // receive category_name as parameter
  let firstProduct = products[0];
  let variant = firstProduct.variant;
  let price = firstProduct.price;
  let description = firstProduct.description;
  let picture = firstProduct.picture;
  let params = `'${encodeURIComponent(category_name)}', ${encodeURIComponent(price)}, '${encodeURIComponent(variant.replace(/'/g, "\\'"))}', '${encodeURIComponent(description.replace(/'/g, "\\'"))}'`
  var styles = ``;

  let initbackgroundColor = ``;
  if (variantDictionary[variant.toLowerCase()] === undefined) {
    initbackgroundColor = `background-image: linear-gradient(196deg, #FFFFFF , #000000)`;
  } else {
    initbackgroundColor = `background-image: linear-gradient(196deg, ${
      variantDictionary[variant.toLowerCase()]
    })`;
  }

  const display = document.getElementById("display");
  display.innerHTML += `
    <input class="color-btn for-color-1" type="radio" id="color-1" name="color-btn" checked onclick="updateProductInfo(${params})"/>
    <label class="first-color" for="color-1"></label>`;

  updateProductInfo(category_name , price , variant , description);

  styles += `
  label.first-color {
    ${initbackgroundColor};
  }
  .back-color {
    ${initbackgroundColor};
  }
  `;

  function loadButtons() {
    for (let i = 1; i < products.length; i++) {
      let product = products[i];
      let price = product.price;
      let description = product.description;
      let variant = product.variant;
      let backgroundColor = ``;
      let params = `'${encodeURIComponent(category_name)}', ${encodeURIComponent(price)}, '${encodeURIComponent(variant.replace(/'/g, "\\'"))}', '${encodeURIComponent(description.replace(/'/g, "\\'"))}'`
      if (variantDictionary[variant.toLowerCase()] === undefined) {
        backgroundColor = `background-image: linear-gradient(196deg, #fafafa)`;
      } else {
        backgroundColor = `background-image: linear-gradient(196deg, ${
          variantDictionary[variant.toLowerCase()]
        })`;
      }

      display.innerHTML += `
      <input class="color-btn for-color-${i + 1}" type="radio" id="color-${
        i + 1
      }" name="color-btn" onclick="updateProductInfo(${params})"/>
      <label class="color-${i + 1}" for="color-${i + 1}"></label>
      `;
      styles += `
      label.color-${i + 1} {
        ${backgroundColor};
      }

      `;
    }

    display.innerHTML += `
    <div class="clearfix"></div>
	      	<div class="info-wrap">
				<a href="#" class="btn"><i class="uil uil-shopping-cart icon"></i> Add To Cart</a>
	      	</div>
    `;
  }

  function loadImages() {
    styles += `
    .img-wrap {
      background-image: url("${picture}");
    }
    .for-color-1:checked ~ .img-wrap.item-1 {
      opacity: 1;
      animation: shake 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    }
    `;
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      let picture = product.picture;

      display.innerHTML += `
      <div class="img-wrap item-${i + 1}"></div>
      `;

      styles += `
      .img-wrap.item-${i + 1} {
        background-image: url("${picture}");
      }
      .for-color-${i + 1}:checked ~ .img-wrap.item-${i + 1} {
        opacity: 1;
        animation: shake 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
      }
      `;
    }

    display.innerHTML += `
    <div class="back-color"></div>
    `;
  }

  function loadColors() {
    for (let i = 1; i < products.length; i++) {
      let product = products[i];
      let variant = product.variant;
      let backgroundColor = ``;
      if (variantDictionary[variant.toLowerCase()] === undefined) {
        backgroundColor = `background-image: linear-gradient(196deg, #fafafa)`;
      } else {
        backgroundColor = `background-image: linear-gradient(196deg, ${
          variantDictionary[variant.toLowerCase()]
        })`;
      }
      display.innerHTML += `
      <div class="back-color item-${i + 1}"></div>
      `;

      styles += `
      .back-color.item-${i + 1} {
        ${backgroundColor};
        opacity: 0;
      }
      .for-color-${i + 1}:checked ~ .back-color.item-${i + 1}{
        opacity: 1;
      }
      `;
    }
  }

  function injectCSS(styles) {
    var styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  }

  

  loadButtons();
  loadImages();
  loadColors();
  injectCSS(styles);
}

window.onload = async function () {

  try {
    var products = await GETProductLine();
    var category_name = await GETCategoryName();
    console.log(products, category_name);
    displayProductLine(products, category_name); // pass category_name as an argument
  } catch (err) {
    console.log(err);
  }
};
