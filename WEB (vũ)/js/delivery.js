function loadCart() {
  if (localStorage.getItem("cartArray") === null) return false;
  const cartArray = JSON.parse(localStorage.getItem("cartArray"));
  console.log(cartArray);
  // Assuming you already have a reference to the tbody element
  var tbody = document.querySelector(".delivery-content-right table tbody");
  var totalPrice = 0;

  // Assuming your cartArray is an array of items
  for (var i = 0; i < cartArray.length; i++) {
    var tr = document.createElement("tr");
    tr.innerHTML = `
    <td id="title"><img style="width: 100px;" src="${cartArray[i].img}" /> 
    <p>${cartArray[i].title}</p></td>

    <td id="quantity">${cartArray[i].amount}</td>
    <td id="price">${cartArray[i].price}</td>
    <td><p id="amount">${
      cartArray[i].price * cartArray[i].amount
    }<sup>đ</sup></p></td>
  `;
    tbody.appendChild(tr);
    totalPrice += cartArray[i].price * cartArray[i].amount;
  }
  // Calculate VAT (10% of totalPrice)
  var VAT = totalPrice * 0.1;

  // Calculate totalCost (totalPrice + VAT)
  var totalCost = totalPrice + VAT;

  var addTotalPrice = document.querySelector(".total-price");
  var addVAT = document.querySelector(".vat");
  var addTotalCost = document.querySelector(".total-cost");

  addTotalPrice.innerHTML = totalPrice.toLocaleString("de-DE");
  addVAT.innerHTML = VAT.toLocaleString("de-DE");
  addTotalCost.innerHTML = totalCost.toLocaleString("de-DE");
}
function isValidPhone(phone) {
  // Simple phone number validation
  // You can customize this based on your specific requirements
  var phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}
function handleSubmit() {
  var city = document.getElementById("city").value;
  var district = document.getElementById("district").value;
  var ward = document.getElementById("ward").value;
  var homeaddress = document.getElementById("home-address").value;
  var name = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;
  var totalCostElement = document.getElementById("total-cost");
  var addTotalCost = totalCostElement.innerText; // hoặc totalCostElement.innerHTML;

  var address = homeaddress + " " + ward + " " + district + " " + city;
  var phoneReget = isValidPhone(phone);


  console.log(addTotalCost);
 if (name != "" &&  phone != "" && address != ""){
  if(!phoneReget)
{
  alert("Số điện thoại không hợp lệ!")
  return
}
  const tmpOrder = {
    name: name,
    phone: phone,
    address: address,
    totalPrice: addTotalCost,
  };

  localStorage.setItem("tmpOrder", JSON.stringify(tmpOrder));
}
 else {
  alert("Vui lòng nhập đủ thông tin")
}

if (name != "" &&  phone != "" && address != "")
{
  if (city == "" || district == "" || ward == "")
{
  alert("Vui lòng nhập đầy đủ thông tin!!");
  
}
else
  window.location.href = "payment.html"
  }
}



function generateRandomNumber() {
  // Math.random() trả về một số từ 0 đến 1 (không bao gồm 1)
  // Nhân nó với 900000 để có giá trị từ 0 đến 899999
  // Thêm 100000 để đảm bảo có ít nhất 6 chữ số và giữ nguyên phạm vi từ 100000 đến 999999
  var randomNumber = Math.floor(Math.random() * 900000) + 100000;

  return randomNumber;
}

function uploadDataToListOrder(data) {
  const listOrder = JSON.parse(localStorage.getItem("listOrder")) || [];
  listOrder.push(data);
  localStorage.setItem("listOrder", JSON.stringify(listOrder));
}

function addAddressToUserData(email,address){
  const userData = JSON.parse(localStorage.getItem("userData"))
  for (let i = 0; i < userData.length ; i++)
  {
    if(email == userData[i].email)
    {
      userData[i].address = address
    }
  }
  localStorage.setItem("userData", JSON.stringify(userData));
}

function closePopup() {
  // popup.classList.remove("open_popup");
  window.location.href = "index.html";
}

    document.addEventListener("DOMContentLoaded", function () {
      let popup = document.getElementById("popup");
  
      function openPopup() {
          popup.classList.add("open_popup");
      }
  
      
  
      window.handlePayment = function() {
          openPopup();
          openPopup()
  // Lấy tất cả các radio button với attribute name="method-payment"
  var paymentMethodRadios = document.querySelectorAll(
    'input[name="method-payment"]'
  );

  // Biến chứa giá trị được chọn
  var selectedPaymentMethod;

  // Lặp qua tất cả radio button
  paymentMethodRadios.forEach(function (radio) {
    // Kiểm tra nếu radio button đang được kiểm tra (checked)
    if (radio.checked) {
      // Lấy giá trị của radio button được kiểm tra
      selectedPaymentMethod = radio.value;
    }
  });

  // Kiểm tra xem có radio button được kiểm tra hay không
  if (selectedPaymentMethod) {
    console.log("Phương thức thanh toán được chọn:", selectedPaymentMethod);
  } else {
    console.log("Không có phương thức thanh toán nào được chọn");
  }

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || [];
  const tmpOrder = JSON.parse(localStorage.getItem("tmpOrder")) || [];
  const cartArray = JSON.parse(localStorage.getItem("cartArray")) || [];

  console.log(userInfo);
  if (userInfo) {
    
    if (selectedPaymentMethod){
      var date = new Date();
    var infodate = "";
    infodate += date.getDate() + "/";
    infodate += date.getMonth() + 1 + "/";
    infodate += date.getFullYear();

    const data = {
      order_id: generateRandomNumber(),
      ...tmpOrder,
      payment: selectedPaymentMethod,
      cartArray,
      Date: infodate,
      email: userInfo.email,
      status: "Chờ xử lý",
    };
    uploadDataToListOrder(data);
    addAddressToUserData(userInfo.email, tmpOrder.address)
    localStorage.removeItem('cartArray')
    } else {
      alert("Vui lòng chọn phương thức thanh toán")
    }
    
  } else {
    alert("Bạn chưa đăng nhập");
    window.location.href = "form_Login.html"
    return 
  }
  
      };
  });

