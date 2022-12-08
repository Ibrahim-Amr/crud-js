let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCategory = document.getElementById("productCategory");
let productDesc = document.getElementById("productDesc");

let productList = [];
let updatedProductIndex;

if (localStorage.getItem("Product") != null) {
  productList = JSON.parse(localStorage.getItem("Product"));
  displayProduct(productList);
  console.log(productList);
}

function pushProduct() {
  if (validateProductName() == true) {
    if (document.getElementById("mainBTN").innerText == "Update Product Data") {
      updateProduct(updatedProductIndex);
      document.getElementById("mainBTN").textContent = "Add Product";
    } else {
      let product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDesc.value,
      };
      productList.push(product);
      displayProduct(productList);
      localStorage.setItem("Product", JSON.stringify(productList));
      document.getElementById("invalidName").classList.add("d-none");
      ClearProdunct();
    }
  } else {
    document.getElementById("invalidName").classList.remove("d-none");
  }
}

function displayProduct(list) {
  let cartona = ``;
  for (let i = 0; i < list.length; i++) {
    cartona += `<tr>
                  <td>${i}</td>
                  <td>${list[i].name}</td>
                  <td>${list[i].price}</td>
                  <td>${list[i].category}</td>
                  <td>${list[i].desc}</td>
                  <td><button class="btn btn-outline-warning" onclick="getStudentInfo(${i});">Update</button></td>
                  <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i});">Delete</button></td>
              </tr>`;
    document.getElementById("tableBody").innerHTML = cartona;
  }
}

function deleteProduct(productIndex) {
  productList.splice(productIndex, 1);
  displayProduct(productList);
  localStorage.setItem("Product", JSON.stringify(productList));
}

function ClearProdunct() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
}

function getStudentInfo(index) {
  productName.value = productList[index].name;
  productPrice.value = productList[index].price;
  productCategory.value = productList[index].category;
  productDesc.value = productList[index].desc;
  document.getElementById("mainBTN").textContent = "Update Product Data";
  document
    .getElementById("mainBTN")
    .classList.replace("btn-outline-success", "btn-outline-warning");

  updatedProductIndex = index;
}

function updateProduct(index) {
  productList[index].name = productName.value;
  productList[index].price = productPrice.value;
  productList[index].category = productCategory.value;
  productList[index].desc = productDesc.value;
  displayProduct(productList);
  localStorage.setItem("Product", JSON.stringify(productList));
  ClearProdunct();
}

function validateProductName() {
  var regex = /^[\w]{1,40}$/;
  if (regex.test(productName.value) == true) {
    return true;
  } else {
    return false;
  }
}

function searchProduct(searchKey) {
  let searchList = [];
  for (i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(searchKey.toLowerCase())) {
      searchList.push(productList[i]);
      displayProduct(searchList);
    }
  }
}
