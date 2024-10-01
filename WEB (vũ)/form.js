

// hien mat khau
function Password() {
    let input = document.getElementById("Password");
    let inputConfirm = document.getElementById("ConfirmPassword");
    if (input.type == "password") {

        input.type = "text";
        inputConfirm.type = "text"
        document.getElementsByClassName("fa-solid fa-eye form__icon")[0].style.visibility = "hidden";
        document.getElementsByClassName("fa-solid fa-eye-slash form__icon")[0].style.visibility = "unset";
    } else {
        input.type = "password";
        inputConfirm.type = "password"
        document.getElementsByClassName("fa-solid fa-eye form__icon")[0].style.visibility = "unset";
        document.getElementsByClassName("fa-solid fa-eye-slash form__icon")[0].style.visibility = "hidden";
    }
    
}

var showPassword_hide = document.querySelector("#iconPWD_hide");
showPassword_hide.addEventListener("click", Password);
var showPassword = document.querySelector("#iconPWD");
showPassword.addEventListener("click", Password);



// dong form
var close = document.getElementById("close");
close.addEventListener("click", function(){
    document.getElementById("content").style.display = "none";
})








