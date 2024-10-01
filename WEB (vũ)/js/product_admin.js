var productArrays = [];
// let currentPage = 1
// let perPage = 5
// let totalPage = productArrays.length/5
// let perproductArrays = [];
function createProduct() {
  if (localStorage.getItem("products") == null) {
    var product1 = {
      title: "Taylor AD17E",
      price: "44100000",
      details: "Một cây đàn chuyên nghiệp','Tự hào được sản xuất tại Mỹ','Gỗ được lựa chọn kỹ lưỡng cho âm thanh tốt','Mặt trên bằng vân sam cứng - một tiêu chuẩn guitar acoustic lâu đời','Back & Side là gỗ Solid ovangkol – đặc tính âm tương tự như gỗ Rosewood",
      categoryMain: "Guitar acoustic",
      img: "./img/product/dan1.png",
    };
    var product2 = {
      title: "Taylor 114CE-S",
      price: "44100000",
      details: "Một cây đàn chuyên nghiệp','Tự hào được sản xuất tại Mỹ','Gỗ được lựa chọn kỹ lưỡng cho âm thanh tốt','Mặt trên bằng vân sam cứng - một tiêu chuẩn guitar acoustic lâu đời','Back & Side là gỗ Solid ovangkol – đặc tính âm tương tự như gỗ Rosewood",
      categoryMain: "Guitar acoustic",
      img: "./img/product/dan1.png",
    };
    productArrays.push(product1);
    productArrays.push(product2);
    console.log(productArrays);
    localStorage.setItem("products", JSON.stringify(productArrays));
  }
  
}


function showUserList() {
  if (localStorage.getItem("products") === null) return false;
  productArrays = JSON.parse(localStorage.getItem("products"))
  var tr = "";
  for (var i = 0; i < productArrays.length; i++) {
    tr += `
    <tr>
        <td>${i + 1}</td>
        <td>${productArrays[i].title}</td>
        <td>${productArrays[i].price}</td>
        <td>${productArrays[i].details}</td>
        <td>${productArrays[i].categoryMain}</td>
        <td><img class='imgtest' src='${productArrays[i].img}'/></td>
        <td><button class='delete btn-action' onclick='editUser("${
          productArrays[i].title
        }")'>Chỉnh sửa</button></td>
        <td><button class='delete btn-action' onclick='deleteUser("${
          productArrays[i].title
        }")'>&times;</button></td>
    </tr>`;
  }
  document.getElementById("list-user").innerHTML = tr;
}

showUserList()

// function renderProducts()
// {
//   perproductArrays.map(value => {
//     // <td>${value.title}</td>
//     // <td>${value.title}</td>
//     // <td>${value.title}</td>
//     // <td>${value.title}</td> 
//     // <td>${value.title}</td>

//   })
// }

function deleteUser(title) {
  if (confirm("Bạn có chắc muốn xóa chưa ?")) {
    var productArrays = JSON.parse(localStorage.getItem("products"));
    for (i = 0; i < productArrays.length; i++) {
      if (productArrays[i].title == title) {
       
        productArrays.splice(i, 1);
      }
    }
    localStorage.setItem("products", JSON.stringify(productArrays));
    showUserList();
  }
}

function editUser(title) {
  productArrays = JSON.parse(localStorage.getItem("products"));
  for (i = 0; i < productArrays.length; i++) {
    if (productArrays[i].title == title) {
      document.getElementById("title").value = productArrays[i].title;
      document.getElementById("price").value = productArrays[i].price;
      document.getElementById("details").value = productArrays[i].details;
      document.getElementById("categoryMain").value = productArrays[i].categoryMain;
      document.getElementById("img").src = productArrays[i].img;
      break;
    }
  }
}

function updateUser() {
  const tmptitle = document.getElementById("title").value;
  console.log(tmptitle);
  productArrays = JSON.parse(localStorage.getItem("products"));
  let foundUser = productArrays.find((item) => item.title === tmptitle);
  if (!foundUser) {
    alert("title không tồn tại");
  }
  for (i = 0; i < productArrays.length; i++) {
    if (productArrays[i].title == tmptitle) {
      productArrays[i] = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        details: document.getElementById("details").value,
        categoryMain: document.getElementById("categoryMain").value,
        img: document.getElementById("img").src,
      };
      alert("Cập nhật thành công");
      break;
    }
  }
  localStorage.setItem("products", JSON.stringify(productArrays));
  showUserList();
}


function createUser() {
  const productData = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    details: document.getElementById("details").value,
    categoryMain: document.getElementById("categoryMain").value,
    img: document.getElementById("img").src,
  };
  productArrays = JSON.parse(localStorage.getItem("products"));
  let foundUser = productArrays.find((item) => item.title === productData.title);

  if (foundUser) {
    alert("Dữ liệu đã tồn tại");
  } else {
    productArrays.push(productData);
    localStorage.setItem("products", JSON.stringify(productArrays));
  }
  alert("Sản phẩm đã được thêm")
  showUserList();
}
function checkUser(){
  var adminInfo = JSON.parse(localStorage.getItem("adminInfo"))

  if(!adminInfo)
  {
    alert("Vui long dang nhap")
    window.location.href = "form_Login.html"
  }
}
function logout() {
  

  localStorage.removeItem('adminInfo')
  window.location.href = "form_Login.html"

}
