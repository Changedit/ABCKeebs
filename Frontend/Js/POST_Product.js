

function toggleImagePathInput(showImageInput, imagePath = "") {

  const imagePathInput = document.querySelector(".image-path-input");
  imagePathInput.style.display = showImageInput ? "block" : "none";


  const displayPathElement = document.getElementById("display-path");
  displayPathElement.textContent = imagePath;
}


toggleImagePathInput(false);


const relativeRadio = document.getElementById("relative-directory");
const absoluteRadio = document.getElementById("absolute-directory");

const addProductForm = document.getElementById("addProductForm");

relativeRadio.addEventListener("change", () => {
  toggleImagePathInput(false);
});

absoluteRadio.addEventListener("change", () => {
  toggleImagePathInput(true);
});

function fetchCategoryName(categoryId) {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8080/GETcategory/" + categoryId, true);
    request.onload = function () {
      if (request.status === 200) {
        const categoryData = JSON.parse(request.responseText);
        console.log("Category Data:", categoryData.name);
        resolve(categoryData.name);
      } else {
        console.error("Error fetching category: ", request.status);
        reject("Error fetching category");
      }
    };
    request.send();
  });
}

function fetchCategories() {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8080/GETcategories", true);
    request.onload = function () {
      if (request.status === 200) {
        const categories = JSON.parse(request.responseText);
        console.log("Categories:", categories);
        resolve(categories);
      } else {
        console.error("Error fetching categories: ", request.status);
        reject("Error fetching categories");
      }
    };
    request.send();
  });
}



addProductForm.addEventListener("submit", async (event) => {
  event.preventDefault();


  const productName = document.getElementById("name").value;
  const productVariant = document.getElementById("variant").value;
  const productPrice = document.getElementById("price").value;
  const productDescription = document.getElementById("description").value;
  const productCategory = document.getElementById("category").value;
  


  const directoryType = document.querySelector(
    'input[name="directory-type"]:checked'
  ).value;

  try {

    const categoryName = await fetchCategoryName(productCategory);

    let picturePath;
    if (directoryType === "relative") {
      picturePath =
        "../resources/" +
        categoryName +
        "/" +
        productName +
        "/" +
        productVariant +
        ".png";
      console.log("Calculated Path:", picturePath);
      toggleImagePathInput(false, picturePath);
    } else {
      picturePath = document.getElementById("picture").value;
    }

    if (!productName || !productPrice || !productCategory || !picturePath || !productDescription || !productVariant) {
      alert("Please fill all required fields.");
      return;
    } else if (picturePath.includes(`'`) || productDescription.includes(`'`) || productVariant.includes(`'`)){
      alert("Please remove any single quotes from the fields.");
      return;
    }


    const product = {
      product_name: productName,
      description: productDescription,
      price: productPrice,
      category_id: productCategory,
      variant: productVariant,
      picture: picturePath,
    };


    const response = await fetch("/POSTproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      const result = await response.json();
      alert("Product added successfully!");
      addProductForm.reset();
    } else {
      console.error(
        "Error adding product:",
        response.status,
        response.statusText
      );
      alert("An error occurred while adding the product.");
    }
  } catch (error) {
    console.error("Error adding product:", error);
    alert("An error occurred while adding the product.");
  }
});

window.onload = async () => {
  const categories = await fetchCategories();
  const categoryDropdown = document.getElementById("category");
  categoryDropdown.innerHTML = "";
  console.log("Categories:", categories);
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categoryDropdown.appendChild(option); });
  };