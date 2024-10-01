function loadData(){
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    console.log(userInfo);

    document.getElementById("name").value = userInfo.fullname
    document.getElementById("phone").value = userInfo.username
    document.getElementById("address").value = userInfo.address
    document.querySelector('.others-usrname').innerHTML = userInfo.fullname;
}

function handleUpdate()
{
    var name = document.getElementById("name").value
    var phone = document.getElementById("phone").value
    var address = document.getElementById("address").value
    const userData = JSON.parse(localStorage.getItem("userData"))
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    for(let i = 0; i< userData.length ; i++)
    {
        if(userData[i].email == userInfo.email)
        {
            userData[i].name = name
            userData[i].phone = phone
            userData[i].address = address
            userInfo.address = address
            userInfo.fullname = name
            userInfo.username = phone
        }

    }
    localStorage.setItem("userData",JSON.stringify(userData))
    localStorage.setItem("userInfo",JSON.stringify(userInfo))
    alert("Bạn đã cập nhật thành công")
}

