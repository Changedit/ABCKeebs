const urlParams = new URLSearchParams(window.location.search);


// Update Product
const updateCategoryForm = document.getElementById("updateCategoryForm");
updateCategoryForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  var name = document.getElementById("name").value;
  
  if (!name) {
    alert("Please fill all required fields.");
    return;
  } else if (name.includes("'")) {
    alert("Please remove any single quotes from the fields.");
    return;
  }

  var data = {
    name: name,

  };

const response = await fetch("http://localhost:8080/UPDATEcategory/" + id , {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  
    if (response.ok) {
        const result = await response.json();
        alert("Category updated successfully!");
        updateCategoryForm.reset();
    } else {
        console.error(
        "Error updating category:",
        response.status,
        response.statusText
        );
        alert("An error occurred while updating the category.");
    }
    
});
