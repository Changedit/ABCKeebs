function browseProducts(name) {
  if (!name && !id) {
    location.href = "/products.html";
  } else {
    location.href = `/products.html?category=${name}`;
  }
}

function listCategories() {
  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:8080/GETProducts", true);
  request.onload = function () {
    var products = JSON.parse(request.responseText);

    if (request.status === 200) {
      var products = JSON.parse(request.responseText);
      var categorizedProducts = {}; // Using an object for a more convenient structure

      for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let productName = product.name;
        let categoryName = product.category_name;

        if (!categorizedProducts[categoryName]) {
          categorizedProducts[categoryName] = {}; // Create category if it doesn't exist
        }

        if (!categorizedProducts[categoryName][productName]) {
          categorizedProducts[categoryName][productName] = []; // Create product entry
        }

        categorizedProducts[categoryName][productName].push(product);
      }



      var styles = ``;
      var hyperText = ``;
      for (let i = 0; i < Object.keys(categorizedProducts).length; i++) {
        let category = Object.keys(categorizedProducts)[i];
        let productLines = Object.keys(categorizedProducts[category]);

        thumbnailItem = categorizedProducts[category][productLines[0]][0];

        thumbnail = thumbnailItem.picture;
        backgroundColor = `background-image: linear-gradient(192deg,${
          variantDictionary[thumbnailItem.variant.toLowerCase()]
        })`;

        hyperText += `
            <li class="card-large card-light" id="sup-${category}">
            <div class="card-image">          
                <img src="${thumbnail}" />
            </div>
            <ul>
            ${category}`;

        for (let j = 0; j < productLines.length; j++) {
          const productLine = productLines[j];
          let categoryId = categorizedProducts[category][productLine][0].category_id;
          hyperText += `
                <li><a href="product.html?category_id=${categoryId}&name=${productLine}">${productLine}</a></li>`;
        
        }

        console.log(category);
        hyperText += `
                    <button class="btn-outline-light" onclick="browseProducts('${category}')">
                    Shop ${category}<span class="material-symbols-outlined">arrow_forward</span>
                    </button>
                </ul>
            </li>`;

        styles += `.card-large#sup-${category},
        .card-med#sup-${category} > .card-image {
            ${backgroundColor}
        }
            `;
      }

      function injectCSS(styles) {
        var styleSheet = document.createElement("style");
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
      }

      function injectHyperText(hyperText) {
        var categoryDisplay = document.getElementById("category-display");
        categoryDisplay.innerHTML = hyperText;
      }

      injectCSS(styles);
    injectHyperText(hyperText);
    } else {
      console.error("Error loading products. Status:", request.status);
    }
  };
  request.onerror = function () {
    console.error("Request failed");
  };
  request.send();
}
