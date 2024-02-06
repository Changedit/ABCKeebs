function getProductData() {
    var request = new XMLHttpRequest();

    request.open('GET', 'http://localhost:8080/e-commerce/products', true);

    request.onload = function () {
        var obj = JSON.parse(request.responseText);
        console.log(obj)

        // Get div elements by id
        var productList = document.getElementById("productList");

        for (var i = 0; i < obj.length; i++) {
            // Update the content of div elements
            productList.innerHTML +=
                '<div class="col-md-4">' +
                '<h4>Product Name: ' + obj[i].name + '</h4>' +
                '<p>Description: ' + obj[i].description + '</p>' +
                '<p>Price: ' + obj[i].price + '</p>' +
                '<p>Category id: ' + obj[i].category_id + '</p>' +
                '<img src="images/' + obj[i].picture + '" alt="Product Image" width="150" height="100">' +
                '</div>'
        }

    };

    request.send();
}