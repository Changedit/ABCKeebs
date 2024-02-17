function browseProducts(category_name) {
    if (category_name === "All") {
        location.href = "/products.html";
    }
    else {
        location.href = `/products.html?category=${category_name}`;
    }
}