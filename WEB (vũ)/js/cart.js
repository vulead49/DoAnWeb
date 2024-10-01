cartArray = [];

function addToCart(product_id) {
  const listProduct = JSON.parse(localStorage.getItem("products"));
  const cartArray = JSON.parse(localStorage.getItem("cartArray")) || [];
  alert("Đã thêm vào giỏ hàng")
  console.log(listProduct);

  for (var i = 0; i < cartArray.length; i++) {
    if (cartArray[i].id == product_id) {
      alert("Sản phẩm đã tồn tại ở giỏ hàng");
      return;
    }
  }

  if (localStorage.getItem("cartArray") != null)
    CartArray = JSON.parse(localStorage.getItem("cartArray"));

  for (var i = 0; i < listProduct.length; i++) {
    if (listProduct[i].id == product_id) {
      const cartItem = {
        id: listProduct[i].id,
        title: listProduct[i].title,
        img: listProduct[i].img,
        price: listProduct[i].price,
        amount: 1,
        totalPrice: listProduct[i].price,
      };

      cartArray.push(cartItem);
      localStorage.setItem("cartArray", JSON.stringify(cartArray));
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  showCart();
});

function showCart() {
  const CartArray = JSON.parse(localStorage.getItem("cartArray")) || [];
  console.log(CartArray);
  for (var i = 0; i < CartArray.length; i++) addcart(CartArray[i]);
}
function checkout(product_id) {
  const listProduct = JSON.parse(localStorage.getItem("products"));
  const cartArray = JSON.parse(localStorage.getItem("cartArray")) || [];
  
  console.log(listProduct);

  for (var i = 0; i < cartArray.length; i++) {
    if (cartArray[i].id == product_id) {
      
      return;
      
    }
    window.location.href="cart.html"
  }

  if (localStorage.getItem("cartArray") != null)
    CartArray = JSON.parse(localStorage.getItem("cartArray"));

  for (var i = 0; i < listProduct.length; i++) {
    if (listProduct[i].id == product_id) {
      const cartItem = {
        id: listProduct[i].id,
        title: listProduct[i].title,
        img: listProduct[i].img,
        price: listProduct[i].price,
        amount: 1,
        totalPrice: listProduct[i].price,
      };

      cartArray.push(cartItem);
      localStorage.setItem("cartArray", JSON.stringify(cartArray));
    }
  }
  
  window.location.href = "cart.html";
}
function addcart(cartItem) {
  var addtr = document.createElement("tr");

  var trcontent =
    '<td><img src="' +
    cartItem.img +
    '" alt=""></td><td><p class="title">' +
    cartItem.title +
    '</p></td><td><input class="amount-product" type="number" value="' +
    cartItem.amount +
    '" min="1"></td><td><p class="price">' +
    cartItem.price +
    '"<sub>đ</sub></p></td><td><span class="cart-delete">X</span></td>"';
  addtr.innerHTML = trcontent;
  

  // Add a class to the newly created <tr> element
  addtr.classList.add("item"); // Replace "your-class-name" with the desired class name
  
  
  var cartTable = document.querySelector("tbody");
  cartTable.append(addtr);

  carttotal();
  deleteCart();
}
function carttotal() {
  var cartItem = document.querySelectorAll("tbody .item");
  const CartArray = JSON.parse(localStorage.getItem("cartArray"));
  console.log(cartItem);
  var totalC = 0;
  var totalProduct = 0;

  for (var i = 0; i < cartItem.length; i++) {
    var inputValue = parseFloat(
      cartItem[i].querySelector(".amount-product").value
    );
    var productPriceText = cartItem[i].querySelector(".price").innerHTML;
    var productPrice = parseFloat(
      productPriceText.replace("đ", "").replace(",", "")
    );

    CartArray[i].amount = inputValue;
    localStorage.setItem("cartArray", JSON.stringify(CartArray));

    // Check if inputValue and productPrice are valid numbers before doing the multiplication
    if (!isNaN(inputValue) && !isNaN(productPrice)) {
      totalC += inputValue * productPrice;
      totalProduct += inputValue;
    }
  }

  // Round the totalC to 2 decimal places to avoid floating-point issues
  totalC = roundToTwoDecimals(totalC);

  var cartTotalA = document.querySelector(".price-total");

  cartTotalA.innerHTML = totalC.toLocaleString("de-DE");

  provisional = document.querySelector(".provisional");
  provisional.innerHTML = totalC.toLocaleString("de-DE");
  total = document.querySelector(".total-product");
  total.innerHTML = totalProduct;
  inputchange();
}

// Helper function to round to 2 decimal places
function roundToTwoDecimals(value) {
  return Math.round(value * 100) / 100;
}

function deleteCart() {
  console.log("handle Delete");
  var cartItem = document.querySelectorAll("tbody .item");
  for (var i = 0; i < cartItem.length; i++) {
    var productT = document.querySelectorAll(".cart-delete");
    productT[i].addEventListener("click", function (event) {
      var cartDelete = event.target;
      var cartitemR = cartDelete.parentElement.parentElement;
      //console.log(cartitemR)
      nameDelete = cartitemR.querySelector(".title").innerHTML;
      cartitemR.remove();
      savelocalstorage(nameDelete);
      carttotal();
      
    });
  } 
}
function deleteCart() {
  console.log("handle Delete");
  var cartItem = document.querySelectorAll("tbody .item");
  for (var i = 0; i < cartItem.length; i++) {
    var productT = document.querySelectorAll(".cart-delete");
    productT[i].addEventListener("click", function (event) {
      var cartDelete = event.target;
      var cartitemR = cartDelete.parentElement.parentElement;
      var nameDelete = cartitemR.querySelector(".title").innerHTML;

      var confirmation = window.confirm(`Bạn có muốn xóa sản phẩm "${nameDelete}" không?`);
      if (confirmation) {
        cartitemR.remove();
        savelocalstorage(nameDelete);
        carttotal();
      }
    });
  } 
}
function inputchange() {
  var cartItem = document.querySelectorAll("tbody .item");
  console.log(cartItem);
  for (var i = 0; i < cartItem.length; i++) {
    var inputValue = cartItem[i].querySelector(".amount-product");
    inputValue.addEventListener("change", function () {
      carttotal();
    });
  }
}

function savelocalstorage(nameDelete) {
  CartArray = JSON.parse(localStorage.getItem("cartArray"));
  tmpCart = [];
  for (var i = 0; i < CartArray.length; i++) {
    var productImg = CartArray[i].img;
    var productName = CartArray[i].title;
    var productPrice = CartArray[i].price;
    if (nameDelete != productName) {
      localCart = {
        title: productName,
        img: productImg,
        price: productPrice,
      };
      tmpCart.push(localCart);
      localStorage.setItem("cartArray", JSON.stringify(tmpCart));
    }
  }
  localStorage.setItem("cartArray", JSON.stringify(tmpCart));
}

function checkPayment() {
    var cartArray = JSON.parse(localStorage.getItem("cartArray"))
    var userInfo = JSON.parse(localStorage.getItem("userInfo"))
    console.log(typeof userInfo);
    if(userInfo == null)
    {
      alert("Vui lòng đăng nhập!")
      window.location.href = "form_Login.html"
    }
else
{
  if(cartArray == null || cartArray.length == 0)
  {
    alert("Chưa có sản phẩm. Vui lòng mua sản phẩm")
    window.location.href="index.html"
  }
  else
    window.location.href = "delivery.html"
}



  
}
