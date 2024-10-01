
// tao ma xac nhan ngau nhien
var cpt;
function create_captcha() {
    document.getElementsByClassName("verifi__input-captcha").value = "";
    cpt = document.getElementById("captcha");
    const randomchar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let cpt_inner = "";
    for (let i = 0; i < 7; i++) {
        cpt_inner += randomchar.charAt(Math.random() * randomchar.length)
    }
    cpt.innerHTML = cpt_inner;
}

// Tao xa xac nhan tren form
var  captcha = document.getElementsByClassName("fa-solid fa-rotate-right fa-rotate-90")[0];
captcha.addEventListener("click", create_captcha);
window.addEventListener("load", create_captcha);

//
