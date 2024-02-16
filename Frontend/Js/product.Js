const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productLine = encodeURIComponent(urlParams.get("name"));
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

function displayProductLine(products, category_name) {
  // receive category_name as parameter
  let firstProduct = products[0];
  let name = firstProduct.name;
  let variant = firstProduct.variant;
  let price = firstProduct.price;
  let description = firstProduct.description;
  let picture = firstProduct.picture;
  let category_id = firstProduct.category_id;
  const display = document.getElementById("display");

  function loadProductInfo(name, price, variant, description) {
    display.innerHTML += `
    <div class="info-wrap mob-margin">
    <p class="title-up">${category_name}</p>
    <h2 id="product-line">${name}</h2>
    <h4>${"$" + price}</h4>	
    <div class="section-fluid">
      <input class="desc-btn" type="radio" id="desc-1" name="desc-btn" checked/>
      <label for="desc-1">${variant}</label>  
      <div class="section-fluid desc-sec accor-1">
        <p>${description}</p>
      </div>
    </div>	
    <h5>Choose color:</h5>
  </div>
  <div class="clearfix"></div>
  <input class="color-btn for-color-1" type="radio" id="color-1" name="color-btn" checked/>
  <label class="first-color" for="color-1"></label> `;
  }

  loadProductInfo(name, price, variant, description);

  function loadButtons() {
    for (let i = 1; i < products.length; i++) {
      let product = products[i];
      let color = product.color;
      display.innerHTML += `
      <input class="color-btn for-color-${i + 1}" type="radio" id="color-${
        i + 1
      }" name="color-btn"/>
      <label class="color-${i + 1}" for="color-${i + 1}"></label>
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
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      let picture = product.picture;
      display.innerHTML += `
      <div class="img-wrap chair-${i + 1}"></div>
      `;
    }
    display.innerHTML += `
    <div class="back-color"></div>
    `;
  }

  function loadColors() {
    for (let i = 1; i < products.length; i++) {
      let product = products[i];
      let color = product.color;
      display.innerHTML += `
      <div class="back-color chair-${i + 1}"></div>
      `;
    }
  }
  
  loadButtons();
  loadImages();
  loadColors();

  return false;
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
