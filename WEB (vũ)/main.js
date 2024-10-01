const products = JSON.parse(localStorage.getItem('products'))
console.log(products);

window.onload = setName()
function setName() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    console.log(userInfo);
    if(userInfo)  document.querySelector('.others-usrname').innerHTML = userInfo.fullname;
    else document.querySelector('.others-usrname').innerHTML = " ";
}
//chi tiet san ph
// window.onload = initProducts();
function handleShowModal() {
	modal.classList.toggle('open');
	modal.classList.remove('hide');
}

function handleHideModal() {
	modal.classList.toggle('hide');
	modal.classList.remove('open');
}
function showDetail([...details]) {
    let htmls=``;
    details.map(
        (detail)=>{
            htmls+=`<li class="label" >${detail}</li>`
        }
    )
    return htmls
}
const modal = document.querySelector('#modal');

const btnCloseModal = document.querySelector('.modal__close');
function handleHideModal() {
	modal.classList.toggle('hide');
	modal.classList.remove('open');
}
modal.addEventListener('click', (e) => {
	if (e.target === e.currentTarget) handleHideModal();
});
btnCloseModal.addEventListener('click', handleHideModal);
//
let modalbody=document.querySelector('.modal__body')
function showModalBuy(id){
    console.log(id);
    let product = products.find(item=>item.id===id)
    console.log(product);
    handleHideModal()
    let htmls = `<div class="product">
    <div class="product-wp row">
        <div class="product-left">
            <div class="product-img">
                <img src="${product.img}" alt="${product.title}">
            </div>
        </div>
   
        <div class="product-right">
            <div class="product-right-wp">
                <div class="product-info">
                    <div class="product-info-top">
                        <p class="product-info-name">${product.title}</p>
                        <p class="product-info-price">${convertFormatPrice(product.price)}</p>
                    </div>
                    <div class="product-info-body">
                                <ul>
                                    <li style="list-style-type: none;">
                                        <ul class="list-feature">
                                        ${showDetail(product.details)}
                                        
                                    </li>
                                </ul>
                            </p>
                    </div>
                    <div class="product-info-bottom row ">
                        <button onclick='addToCart(${product.id})'  class="btn btn--primary btn-buy">Thêm vào giỏ hàng</button>
                        <button onclick='checkout(${product.id})' class="btn btn--primary btn-addcart" >Thanh toán </button>
                    </div>
                </div>  
            </div>
        </div>
    </div>
</div>`

modalbody.innerHTML= htmls;
handleShowModal()
}
//phan  duoi bo//
const productLs=document.querySelector('.category-right-content')
function renderProducts(pductLs, pductContainer){
    let htmls = pductLs.map(
        function(product){
            return `
            
                <div class="category-right-content-item" onclick="showModalBuy(${product.id})">
                    <img src="${product.img}" alt="">
                    <h1>${product.title}</h1>
                    <p>${(product.price==='Liên hệ')?'Liên hệ':convertFormatPrice(product.price)}</p>
                </div>
            `
        }
    )
    console.log(pductContainer)
    pductContainer.innerHTML=htmls.join('');
    // console.log(htmls.join(''))
}
// renderProducts(products, productLs);
window.addEventListener('load',()=>{
    let pductLsFiltered = products.filter((product)=> (product.categoryMain.toLowerCase().trim() === 'guitar acoustic')
        )
        display(pductLsFiltered,perPage,currPage, productLs);
        renderPageNumber(pductLsFiltered, perPage)
})
let listNow,listDefault;
const categoryMainLs = document.querySelectorAll('.item-link');
categoryMainLs.forEach(function (categoryMain){
    categoryMain.addEventListener('click', (event)=>{
        event.preventDefault()
        let selected = categoryMain.textContent.toLowerCase().trim()
        console.log(selected)

        let pductLsFiltered = products.filter((product)=> (product.categoryMain.toLowerCase().trim() == selected)
        )
        console.log(pductLsFiltered)
        display(pductLsFiltered,perPage,1,productLs)
        renderPageNumber(pductLsFiltered, perPage)
        // renderProducts(pductLsFiltered, productLs);
        listNow=pductLsFiltered;
        listDefault=pductLsFiltered
    })
})

const categorySubLs = document.querySelectorAll('.sub-item-link');
categorySubLs.forEach(function (categorySub){
    categorySub.addEventListener('click', (event)=>{
        event.preventDefault()
        let selected = categorySub.textContent.toLowerCase().trim()

        let pductLsFiltered = products.filter((product)=> (product.category.toLowerCase().trim() === selected)
        )
        display(pductLsFiltered,perPage,currPage,productLs)
        renderPageNumber(pductLsFiltered, perPage)
        // renderProducts(pductLsFiltered, productLs);
        listNow=pductLsFiltered;
        listDefault=pductLsFiltered


    })
})
//phan trang
    let currPage = 1
    let perPage = 8
    let perProduct=[]
    let totalPage = Math.ceil(products.length/perPage)
    function handlePageNumber(num){
        currPage = num
        let pductShow = perProduct.slice(
        (num - 1)*perPage,
        (num - 1)*perPage + perPage,
        )
        renderProducts(pductShow,productLs)
    }
    function display(productAll,perPage,currPage,pductContainer){
        perProduct=productAll
        let productShow = productAll.slice(
        (currPage - 1)*perPage,
        (currPage - 1)*perPage + perPage,
        )
        renderProducts(productShow,pductContainer)
    }
    function  renderPageNumber(productAll, perPage){
        let countPage =Math.ceil(productAll.length/perPage)
        document.querySelector(".category-right-bottom-items").innerHTML=""
        for(let i=1;i<= countPage;i++){
            document.querySelector(".category-right-bottom-items").innerHTML += `<span class="pani-item" onclick="handlePageNumber(${i})">${i} </span>`
        }
    }

    const btnSearch = document.querySelector('.btn-search')
    btnSearch.addEventListener('click', () => {
        handleSearch()        
    });
    //don vi tien te
    function convertFormatPrice(price) {
        const VND = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
        return VND.format(price);
    }
//sap xep
    function sortByPriceAscending(products) {
        

        return products.sort((a, b) => a.price - b.price);
    }
    
    // Sắp xếp mảng sản phẩm theo giá giảm dần
    function sortByPriceDescending(products) {
        
        return products.sort((a, b) => b.price - a.price);
    }

    function handleSearch(){
        const searchInput = document.querySelector('.others__search-inp')

        if (searchInput.value) {
            // let products = JSON.parse(localStorage.getItem('products'))
            
            let searchInp = searchInput.value.toLowerCase().trim();
            let productsSearch = products.filter((product) =>
                product.title.toLowerCase().trim().includes(searchInp)
            );

            const data = sortByPriceAscending(productsSearch)
            if(productsSearch.length !== 0){
                display(productsSearch,perPage,currPage,productLs)
                renderPageNumber(data, perPage)
                window.scrollTo(0, 810);
            } else productLs.innerHTML = alert(`sản phẩm không tồn tại`)
           
	    }

        
    }       

    function handleSortChange() {
        var selectElement = document.getElementById("sortOptions");
        var selectedValue = selectElement.value;

        if (selectedValue === "macdinh") {
            loadData()
        }
    
        if (selectedValue === "asc") {
            // Gọi hàm xử lý sắp xếp giá từ cao đến thấp
            handleAsd();
        } else if (selectedValue === "desc") {
            // Gọi hàm xử lý sắp xếp giá từ thấp đến cao
            handleDes();
        } 
    }
    
    function handleAsd() {
            const data = sortByPriceAscending(listNow)

            if(data.length !== 0){
                display(data,perPage,currPage,productLs)
                renderPageNumber(data, perPage)
                window.scrollTo(0, 810);
            }
        console.log("Đã chọn sắp xếp giá từ cao đến thấp");
    }
    
    function handleDes() {

        const data = sortByPriceDescending(listNow)
            if(data.length !== 0){
                display(data,perPage,currPage,productLs)
                renderPageNumber(data, perPage)
                window.scrollTo(0, 810);





                

            }
        console.log("Đã chọn sắp xếp giá từ cao đến thấp");
    }

    function loadData() {
        display(listDefault,perPage,currPage,productLs)
                renderPageNumber(listDefault, perPage)
                window.scrollTo(0, 810);
        // window.location.href = "index.html"

    }
  

// Khi co loi tra ve thong bao loi
// khi khong co loi tra ve undefined




function Validator(options) {
    
   
    // thong bao loi
    function validate(inputElement, rule) { 
        var errorMessage = inputElement.parentElement.querySelector(options.errorSelector);
        var error = rule.test(inputElement.value);
        if (error){
            errorMessage.innerText =  error;
            inputElement.parentElement.querySelector(".form__wrapper-input").classList.add("invalid");
        } else {
            errorMessage.innerText =  "";
            inputElement.parentElement.querySelector(".form__wrapper-input").classList.remove("invalid");
        }
        return error;
    }

    var formElement = document.querySelector(options.form);


    if (formElement) {
        formElement.onsubmit = function(e) {
            var isFormValid = true;
            e.preventDefault();
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                validate(inputElement,rule);
                var isValid = validate(inputElement,rule);
                if (isValid) {
                    isFormValid = false;
                }
                // form dung
                if (isFormValid) {
                //    if (typeof options.onsubmit == "function") {
                //         var enableInput = formElement.querySelectorAll("[name]");
                //         var formValue = Array.from(enableInput).reduce(function(values, input){
                //             values[input.name] = input.value;
                //             return values;
                //     }, {})

                //    }
                }
        })}
        
        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {
                //khong nhap input
                inputElement.onblur = function (){
                    validate(inputElement,rule);
                }
                //Nhap input
                inputElement.oninput = function (){
                    validate(inputElement,rule);
                } 
            }
        });
            
    }
}

Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value){
            return value ? undefined : "Không được để trống dòng này";
        }
    }
}

Validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function (value){
            var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
            
            if (value) {
                return regex.test(value) ? undefined : "Email@domain.com";
            }else {
                return "Không được để trống dòng này";
            }
        }
    }
}

Validator.isPassword = function(selector, minlength) {
    return {
        selector: selector,
        test: function(value){
            if (value) {
                return value.length >= minlength ? undefined : 'Mật khẩu tối thiểu 8 kí tự';
            }else {
                return "Không được để trống dòng này";
            }
        }
    }
}

Validator.isPhoneNumber = function(selector) {
    return {
        selector: selector,
        test: function(value){//isNaN -> true(khong phai number)
            if (value) {
                if (isNaN(value)) {
                    return "Vui lòng nhập số điện thoại";
                }else{
                    if (value.length != 10) {
                        return "Số điện thoại phải có 10 số"
                    }else{
                        return undefined;
                    }
                }
            }else {
                return value ? undefined : "Không được để trống dòng này";
            }
            
        }
    }
}

