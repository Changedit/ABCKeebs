const urlParams = new URLSearchParams(window.location.search);

window.onload = function () {
  console.log(urlParams);
  let name = urlParams.get("name");
  let variant = urlParams.get("variant");
  let price = urlParams.get("price");
  let description = urlParams.get("description");
  let picture = urlParams.get("picture");
  let category_id = urlParams.get("category_id");
  console.log(name, variant, price, description, picture, category_id);
  document.getElementById("name").value = name;
  document.getElementById("variant").value = variant;
  document.getElementById("price").value = price;
  document.getElementById("description").value = description;
  document.getElementById("picture").value = picture;
  document.getElementById("category").value = category_id;
};

// Update Product
const updateProductForm = document.getElementById("updateProductForm");
updateProductForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let id = urlParams.get("id");
  var name = document.getElementById("name").value;
  var variant = document.getElementById("variant").value;
  var price = document.getElementById("price").value;
  var description = document.getElementById("description").value;
  var picture = document.getElementById("picture").value;
  var category_id = document.getElementById("category").value;
  console.log(name, variant, price, description, picture, category_id);
  
  if (!name || !price || !category || !picture || !description || !variant) {
    alert("Please fill all required fields.");
    return;
  } else if ((name || price || category || picture || description || variant).includes("'")) {
    alert("Please remove any single quotes from the fields.");
    return;
  }

  var data = {
    product_name: name,
    price: price,
    variant: variant,
    description: description,
    category_id: category_id,
    picture: picture
  };
  console.log(data);
  fetch("http://localhost:8080/UPDATEproduct/" + id , {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
