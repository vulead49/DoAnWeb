var Orders = JSON.parse(localStorage.getItem("listOrder"));

function checkorder() {
  // Lấy phần tử chứa danh sách đơn hàng
  var orderCheckContainer = document.querySelector(".order-check-container");

  // Kiểm tra xem phần tử có tồn tại không
  if (orderCheckContainer) {
    // Lấy tất cả các phần tử con có class là "list-order-container"
    var listOrderContainers = orderCheckContainer.querySelectorAll(
      ".list-order-container"
    );

    // Duyệt qua từng phần tử và xóa chúng
    listOrderContainers.forEach(function (element) {
      element.remove();
    });
  } 
  var getemail = document.getElementById("info-email").value;
  var getphone = document.getElementById("info-phone").value;
  var getid = document.getElementById("info-id").value;
  if (getemail != "" || getphone != "" || getid != "") {
    for (var i = 0; i < Orders.length; i++) {
      if (
        getemail == Orders[i].email ||
        getphone == Orders[i].phone ||
        getid == Orders[i].order_id
      ) {
        showOrder(Orders[i]);
      }
    }
  } else {
    alert("Vui lòng nhập đầy đủ thông tin! ");
  }
}


function showOrder(order) {

  var adddiv = document.createElement("div");
  adddiv.classList.add("list-order-container");
  divcontent = "";
  divcontent += '<div class="box-order"><ul class="group-info">';
  divcontent +=
  '<li class="group-info-item"><span class="order-status">Trạng thái: ' +
  order.status +
  '</span></li><li class="group-info-item divider-2"></li>';

  divcontent +=
    '<li class="group-info-item"><span class="order-title">Đơn hàng: ' +
    order.order_id +
    " </span>";
  divcontent +=
    '<span class="total-price">' + order.totalPrice + " VNĐ</span></li>";
  divcontent +=
    '<li class="group-info-item"><span class="date-order">Ngày ' +
    order.Date +
    "</span>";
  divcontent +=
    '<span class="info-name">' +
    order.name +
    '</span><span class="payment">Payment methods: ' +
    order.payment +
    "</span></li>";
  divcontent += '<li class="group-info-item divider-1"></li></ul>';
  divcontent +=
    '<section class="cart"><form action=""> <table><thead><tr><th>Sản phẩm</th><th>Giá</th><th>Số lượng</th></tr></thead><tbody>';

  const cartArray = order.cartArray;
  for (var i = 0; i < cartArray.length; i++) {
    divcontent +=
      '<tr><td style="display:flex; align-items: center;"><img src="' +
      cartArray[i].img +
      '" style="width:70px" alt="">' +
      cartArray[i].title +
      "</td><td><p><span>" +
      cartArray[i].price +
      "</span><sup>đ</sup></p></td><td><span>" +
      cartArray[i].amount +
      "</span></td></tr>";
  }

  divcontent += "</tbody></table></form> </section></div>";

  adddiv.innerHTML = divcontent;

  var cartTable = document.querySelector(".order-check-container");

  cartTable.append(adddiv);
}


function checkFooter()
{
  
}