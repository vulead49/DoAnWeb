var userArray = [];

function checkUser(){
  var adminInfo = JSON.parse(localStorage.getItem("adminInfo"))

  if(!adminInfo)
  {
    alert("Vui long dang nhap")
    window.location.href = "form_Login.html"
  }
}

function createAdmin() {
  // alert("Ban muon tao Admin!");
  // if( localStorage.getItem('user')==null)

  if (localStorage.getItem("userData") == null) {
    var user1 = {
      username: "0123123123",
      email: "phuongvu@gmail.com",
      password: "123123",
      fullname: "Nguyen Hoang Phuong Vu",
      address: "170/5 Hoa Hung",
      type: "admin",
    };
    var user2 = {
      username: "0456456456",
      email: "kiet@gmail.com",
      password: "123123",
      fullname: "Tuan Kiet",
      address: "273 An Duong Vuong",
      type: "admin",
    };
    
    userArray.push(user1);
    userArray.push(user2);
    console.log(userArray);
    localStorage.setItem("userData", JSON.stringify(userArray));
  }
}
function logout() {
  

  localStorage.removeItem('adminInfo')
  localStorage.removeItem('userInfo')
  window.location.href = "form_Login.html"

}
function loginuser() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("Password").value;
  var userArray = JSON.parse(localStorage.getItem("userData"));
  for (i = 0; i < userArray.length; i++) {
    if (
      userArray[i].username == username &&
      userArray[i].password == password
    ) {
      if (userArray[i].type == "user") {
        var userInfo = {
          username: userArray[i].username,
          email: userArray[i].email,
          password: userArray[i].password,
          fullname: userArray[i].fullname,
          address: userArray[i].address,
          type: userArray[i].type,
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        alert("Đăng nhập thành công!");
        window.location.href = "index.html";
      } else if (userArray[i].type == "admin") {
        alert("Xin chào ADMIN! ");
        var userInfo = {
          username: userArray[i].username,
          email: userArray[i].email,
          password: userArray[i].password,
          fullname: userArray[i].fullname,
          address: userArray[i].address,
          type: userArray[i].type,
        };
        localStorage.setItem("adminInfo", JSON.stringify(userInfo));
        window.location.href = "user_manage.html";
      }
      return true;
    }
  }
  alert("Sai thông tin tài khoản hoặc mật khẩu!");
  return false;
}

function register() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("Password").value;
  const confirmPassword = document.getElementById("ConfirmPassword").value;
  const fullname = document.getElementById("fullname").value;

  userArray = JSON.parse(localStorage.getItem("userData")) || [];
  if(username != "" && email != "" && password != "" &&  confirmPassword !="" && fullname!="")
  {
    
  if (password != confirmPassword) {
    alert("Mật khẩu không khớp");
  } else {
    let foundEmail = userArray.find((item) => item.email === email);
    let foundUsername = userArray.find((item) => item.username === username);

    if (foundEmail || foundUsername) {
      alert("Thông tin email hoặc số điện thoại đã tồn tại");
    } else {
      const dataUser = {
        username: username,
        email: email,
        password: password,
        fullname: fullname,
        address: "",
        type: "user",
      };

      userArray.push(dataUser);
      localStorage.setItem("userData", JSON.stringify(userArray));
      alert("Tạo tài khoản thành công vui lòng đăng nhập");
      window.location.href = "form_Login.html"
    }
  }
  }
  else
  {
    alert("Vui lòng nhập đầy đủ thông tin!")
  }

}

function showUserList() {
  if (localStorage.getItem("userData") === null) return false;
  userArray = JSON.parse(localStorage.getItem("userData"));

  var tr = "";
  for (var i = 0; i < userArray.length; i++) {
    tr += `
    <tr>
        <td>${i + 1}</td>
        <td>${userArray[i].username}</td>
        <td>${userArray[i].email}</td>
        <td>${userArray[i].fullname}</td>
        <td>${userArray[i].password}</td>
        <td>${userArray[i].address}</td>
        <td>${userArray[i].type}</td>
        <td><button class='delete btn-action' onclick='editUser("${
          userArray[i].username
        }")'>Chỉnh sửa</button></td>
        <td><button class='delete btn-action' onclick='deleteUser("${
          userArray[i].username
        }")'>&times;</button></td>
    </tr>`;
  }
  document.getElementById("list-user").innerHTML = tr;
}

function deleteUser(username) {
  if (confirm("Bạn có chắc muốn xóa chưa ?")) {
    var userArray = JSON.parse(localStorage.getItem("userData"));
    for (i = 0; i < userArray.length; i++) {
      if (userArray[i].username == username) {
        // alert("Ban muon xoa tai khoan nay??");
        userArray.splice(i, 1);
      }
    }
    localStorage.setItem("userData", JSON.stringify(userArray));
    showUserList();
  }
}

function editUser(username) {
  userArray = JSON.parse(localStorage.getItem("userData"));
  for (i = 0; i < userArray.length; i++) {
    if (userArray[i].username == username) {
      document.getElementById("username").value = userArray[i].username;
      document.getElementById("email").value = userArray[i].email;
      document.getElementById("fullname").value = userArray[i].fullname;
      document.getElementById("password").value = userArray[i].password;
      document.getElementById("type").value = userArray[i].type;
      document.getElementById("address").value = userArray[i].address;
      break;
    }
  }
}

function updateUser() {
  const tmpusername = document.getElementById("username").value;
  console.log(tmpusername);
  userArray = JSON.parse(localStorage.getItem("userData"));
  let foundUser = userArray.find((item) => item.username === tmpusername);
  if (!foundUser) {
    alert("Username không tồn tại");
  }
  for (i = 0; i < userArray.length; i++) {
    if (userArray[i].username == tmpusername) {
      userArray[i] = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        fullname: document.getElementById("fullname").value,
        password: document.getElementById("password").value,
        type: document.getElementById("type").value,
        address: document.getElementById("address").value,
      };
      alert("Cập nhật thành công");
      break;
    }
  }
  localStorage.setItem("userData", JSON.stringify(userArray));
  showUserList();
}

function createUser() {
  const userData = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    fullname: document.getElementById("fullname").value,
    password: document.getElementById("password").value,
    type: document.getElementById("type").value,
    address: document.getElementById("address").value,
  };
  userArray = JSON.parse(localStorage.getItem("userData"));
  let foundUser = userArray.find((item) => item.username === userData.username);

 if(username != "" && email != "" && fullname != "" && password != "" && type != "" && address!="" )
 {
  if (foundUser) {
    alert("Dữ liệu đã tồn tại");
  } else {
    userArray.push(userData);
    localStorage.setItem("userData", JSON.stringify(userArray));
  }
 }
  showUserList();
}

function showOrderList() {
  // Lấy danh sách đơn hàng từ localStorage
  const listOrder = JSON.parse(localStorage.getItem("listOrder")) || [];
  console.log(listOrder);

  // Lấy tham chiếu đến tbody của bảng đơn hàng
  var orderList = document.getElementById("orderList");

  // Xóa nội dung hiện tại trong tbody
  orderList.innerHTML = "";

  // Duyệt qua danh sách đơn hàng và tạo các hàng trong bảng
  listOrder.forEach(function (order, index) {
  
    var tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${order.order_id}</td>
      <td>${order.name}</td>
      <td>${order.email}</td>
      <td>${order.address}</td>
      <td>${order.phone}</td>
      <td>${order.Date}</td>
      <td class="${getStatusColorClass(order.status)}">${order.status}</td>
      <td>
  <button onclick="updateOrderStatus(${index}, 'Đã xác nhận')">Xác nhận</button>
  <button onclick="updateOrderStatus(${index}, 'Đã hủy')">Hủy</button>
</td>
      <td>
        <button onclick="viewOrderDetail(${order.order_id})">Xem</button>
      </td>
    `;
    orderList.appendChild(tr);
  });
}

function updateOrderStatus(index, newStatus) {
  // Lấy danh sách đơn hàng từ localStorage
  const listOrder = JSON.parse(localStorage.getItem("listOrder")) || [];
  var result = window.confirm(`Bạn có muốn ${newStatus} đơn hàng không?`);
  if (result === true) {
    // Kiểm tra xem chỉ số index có hợp lệ hay không
    if (index >= 0 && index < listOrder.length) {
      var currentStatus = listOrder[index].status;
      
      if (currentStatus === "Đã xác nhận" && newStatus === "Đã hủy") {
        // Hiển thị thông báo lỗi khi đã xác nhận đơn hàng và muốn hủy
        alert("Không thể hủy đơn hàng đã được xác nhận.");
      }   
       else if (currentStatus === "Đã hủy" && newStatus === "Đã xác nhận") {
        // Hiển thị thông báo lỗi khi đã hủy đơn hàng và muốn xác nhận
        alert("Không thể xác nhận đơn hàng đã được hủy.");
      } else {
        // Cập nhật trạng thái mới cho đơn hàng
        listOrder[index].status = newStatus;

        // Lưu danh sách đơn hàng đã cập nhật vào localStorage
        localStorage.setItem("listOrder", JSON.stringify(listOrder));

        // Hiển thị lại danh sách đơn hàng
        showOrderList();
      }
    }
  }
}

function viewOrderDetail(order_id) {
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

const listOrder = JSON.parse(localStorage.getItem("listOrder"))
for (let i = 0; i < listOrder.length; i++){
  if (listOrder[i].order_id == order_id){
    showOrder(listOrder[i])
  }
}
}

function showOrder(order){
console.log(order);
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
function loadCart2(){
showOrderList();
}
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
}

function getStatusColorClass(status) {
switch (status) {
  case 'Đã xác nhận':
    return 'status-processed';
  case 'Đã hủy':
    return 'status-cancelled';
  default:
    return 'status-pending';
}
}
