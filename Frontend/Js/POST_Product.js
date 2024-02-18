
// Function to display or hide the input
function toggleImagePathInput(showImageInput, imagePath = "") {
  // Added imagePath
  const imagePathInput = document.querySelector(".image-path-input");
  imagePathInput.style.display = showImageInput ? "block" : "none";

  // Update the display element
  const displayPathElement = document.getElementById("display-path");
  displayPathElement.textContent = imagePath; // Update the text content
}

// Call it at initialization to match initial visibility
toggleImagePathInput(false); // Initially the input is hidden

// Add Event Listeners to the radio buttons (modify your existing selectors or add the below on change of a single element).
const relativeRadio = document.getElementById("relative-directory");
const absoluteRadio = document.getElementById("absolute-directory");

const addProductForm = document.getElementById("addProductForm"); // Get the form element

relativeRadio.addEventListener("change", () => {
  toggleImagePathInput(false); // No need to pass in a path yet
});

absoluteRadio.addEventListener("change", () => {
  toggleImagePathInput(true);
});
// Function to fetch category name
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


// Inside the submit event listener function
addProductForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Gather form data
  const productName = document.getElementById("name").value;
  const productVariant = document.getElementById("variant").value;
  const productPrice = document.getElementById("price").value;
  const productDescription = document.getElementById("description").value;
  const productCategory = document.getElementById("category").value;
  

  // Get directory type
  const directoryType = document.querySelector(
    'input[name="directory-type"]:checked'
  ).value;

  try {
    // Fetch category name
    const categoryName = await fetchCategoryName(productCategory);
    // Construct picturePath
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
      toggleImagePathInput(false, picturePath); // Show the calculated path
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

    // Create the product object
    const product = {
      product_name: productName,
      description: productDescription,
      price: productPrice,
      category_id: productCategory,
      variant: productVariant,
      picture: picturePath,
    };

    // Make the POST request using fetch
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
  categoryDropdown.innerHTML = ""; // Clear the existing options
  console.log("Categories:", categories);
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categoryDropdown.appendChild(option); });
  };