
const urlParams = new URLSearchParams(window.location.search);

window.onload = function () {
  console.log(urlParams);
  let name = urlParams.get("name");
  document.getElementById("name").value = name;
};

// Update Product
const addCategoryForm = document.getElementById("addCategoryForm");
addCategoryForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let name = document.getElementById("name").value;
  
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

  const response = await fetch("http://localhost:8080/POSTCategory", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        },
    body: JSON.stringify(data),
  });

    if (response.ok) {
        const result = await response.json();
        alert("Category added successfully!");
        addCategoryForm.reset();
    } else {
        console.error(
        "Error adding category:",
        response.status,
        response.statusText
        );
        alert("An error occurred while adding the category.");
    }

});
