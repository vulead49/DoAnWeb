var Orders = JSON.parse(localStorage.getItem("listOrder"));

function loadMyOrder() {
  const myInfo = JSON.parse(localStorage.getItem("userInfo"));
  console.log(myInfo);
  for (var i = 0; i < Orders.length; i++) {
    if (Orders[i].email == myInfo.email) {
      showOrder(Orders[i]);
      console.log(Orders[i]);
    }
  }
}

function showOrder(order) {
  var adddiv = document.createElement("div");
  adddiv.classList.add("list-order-container");
  var divcontent = "";
  divcontent += '<div class="box-order" style="width: 100%"><ul class="group-info">';
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

  divcontent += "</tbody></table></form> </section>";

  // Thêm nút "Hủy đơn hàng" nếu trạng thái không phải "Đã xử lý"
  if (order.status !== "Đã xử lý") {
    divcontent +=
      '<div class="cancel-order-container"><button onclick="cancelOrder(' +
      order.order_id +
      ')" class="cancel-order-btn">Hủy đơn hàng</button></div>';
  }

  adddiv.innerHTML = divcontent;

  var cartTable = document.querySelector(".order-check-container");

  cartTable.append(adddiv);
}

function cancelOrder(orderID) {
  // Tìm đơn hàng cần hủy trong mảng Orders
  for (var i = 0; i < Orders.length; i++) {
    if (Orders[i].order_id == orderID) {
      // Kiểm tra nếu trạng thái là "Chờ xử lý", hiển thị cửa sổ xác nhận
      if (Orders[i].status === "Chờ xử lý") {
        var confirmCancel = window.confirm("Bạn có chắc chắn muốn hủy đơn hàng?");
        if (!confirmCancel) {
          return;
        }
      }
      
       else {
        // Trạng thái không phải "Chờ xử lý", không thực hiện hủy đơn hàng
        alert("Bạn không thể hủy đơn hàng đã xử lý.");
        return;
      }

      // Thay đổi trạng thái từ "Chờ xử lý" thành "Đã hủy"
      Orders[i].status = "Đã hủy";

      break;

    }
   
  }

  // Cập nhật lại giao diện hiển thị đơn hàng
  var cartTable = document.querySelector(".order-check-container");
  cartTable.innerHTML = "";
  loadMyOrder();
}function cancelOrder(orderID) {
  // Tìm đơn hàng cần hủy trong mảng Orders
  for (var i = 0; i < Orders.length; i++) {
    if (Orders[i].order_id == orderID) {
      if (Orders[i].status === "Đã hủy") {
        // Hiển thị thông báo nếu đơn hàng đã có trạng thái "Đã hủy"
        alert("Đơn hàng này đã được hủy.");
        return;
      }if(Orders[i].status ==="Đã xác nhận"){
        alert("Không thể hủy đơn hàng đã được xác nhận");
        return; 
      }
       else if (Orders[i].status === "Chờ xử lý") {
        // Hiển thị cửa sổ xác nhận nếu đơn hàng đang có trạng thái "Chờ xử lý"
        var confirmCancel = window.confirm("Bạn có chắc chắn muốn hủy đơn hàng?");
        if (!confirmCancel) {
          return;
        }
      }

      // Thay đổi trạng thái từ "Chờ xử lý" thành "Đã hủy"
      Orders[i].status = "Đã hủy";
      localStorage.setItem("listOrder", JSON.stringify(Orders));

      break;
    }
  }

  // Cập nhật lại giao diện hiển thị đơn hàng
  var cartTable = document.querySelector(".order-check-container");
  cartTable.innerHTML = "";
  loadMyOrder();
}
loadMyOrder();