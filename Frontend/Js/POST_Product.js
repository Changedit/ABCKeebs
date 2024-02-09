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

addProductForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Gather form data
  const productName = document.getElementById("name").value;
  const productVariant = document.getElementById("variant").value;
  const productPrice = document.getElementById("price").value;
  const productDescription = document.getElementById("description").value;
  const productCategory = document.getElementById("category").value;
  async function fetchCategoryName(categoryId) {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8080/GETCategory" + categoryId, true);
    request.onload = function () {
      if (request.status === 200) {
        const categoryData = JSON.parse(request.responseText);
        console.log("Category Data:", categoryData[0].name);
        return categoryData[0].name; // Assuming your result includes 'name' field
      } else {
        console.error("Error fetching category: ", request.status);
        return null; // Or a placeholder category name in case of error
      }
    };
    request.send();
  }

  // Get directory type
  const directoryType = document.querySelector(
    'input[name="directory-type"]:checked'
  ).value;

  // Get image path and modify if 'relative' is selected
  let picturePath = document.getElementById("picture").value;
  if (directoryType === "relative") {
    const categoryName = await fetchCategoryName(productCategory);

    if (categoryName) {
      picturePath =
        "../resources/" +
        categoryName +
        "/" +
        productName +
        "/" +
        productVariant +
        ".png"; // Use fetched name
      console.log("Calculated Path:", picturePath);
      toggleImagePathInput(false, picturePath);
    } else {
      // Handle fallback path construction  if the category  was not retrieved
    }
  }

  // Basic validation (Enhance as needed)
  if (!productName || !productPrice || !productCategory) {
    // Modify as per your exact requirements
    alert("Please fill all required fields.");
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
  try {
    const response = await fetch("/POSTproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Indicate JSON data
      },
      body: JSON.stringify(product), // Convert object to JSON string
    });

    if (response.ok) {
      const result = await response.json();
      alert("Product added successfully!");
      addProductForm.reset(); // Reset the form fields after submission
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
