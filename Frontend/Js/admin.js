function addProduct() {
    var product;
    // Get the value of the input fields
    var product_name = document.getElementById("product_name").value;
    var product_price = document.getElementById("product_price").value;
    var product_description = document.getElementById("product_description").value;
    var product_category = document.getElementById("product_category").value;
    var product_picture = document.getElementById("product_picture").value;
    var product_variant = document.getElementById("product_variant").value;
    var product = {
        name: product_name,
        rice: product_price,
        description: product_description,
        category: product_category,
        picture: product_picture,
        variant: product_variant
    };

    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8080/product", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        var obj = JSON.parse(request.responseText);
        console.log(obj);
        getProductData();
    };
    request.send(JSON.stringify(product));

    // Clear the input fields
    document.getElementById("product_name").value = "";
    document.getElementById("product_price").value = "";
    document.getElementById("product_description").value = "";
    document.getElementById("product_category").value = "";
    document.getElementById("product_picture").value = "";
    document.getElementById("product_variant").value = "";

}

function displayProducts() {
    getProductData();
    var addProductButton = document.getElementById("add-product");
    addProductButton.addEventListener("click", addProduct);
}