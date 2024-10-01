

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
// 


// function validatePassword(password) {
//     if (password.length >= 6) {
//         console.log("Mật khẩu hợp lệ");
//         // Thêm xử lý khác nếu cần thiết khi mật khẩu hợp lệ
//         return true;
//     } else {
//         console.log("Mật khẩu phải có ít nhất 6 ký tự");
//         // Thêm xử lý khác nếu cần thiết khi mật khẩu không hợp lệ
//         return false;
//     }
// }
Validator.isPhoneNumber = function(selector) {
    return {
        selector: selector,
        test: function(value){//isNaN -> true(khong phai number)
            if (value) {
                if (isNaN(value)) {
                    return "Vui lòng nhập số điện thoại";
                }else{
                    if (!/^[0]/.test(value)) {
                        return "Số điện thoại phải bắt đầu từ số 0";}
                    if (value.length != 10  ) {
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

Validator.checkCaptcha = function(selector, getCPT) {
    return {
        selector: selector,
        test: function(value){
           
            
        }
    }
}












