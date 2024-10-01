const userInfo = JSON.parse(localStorage.getItem("userInfo"))
const userData = JSON.parse(localStorage.getItem("userData"))
function handleUpdate()
{
    var password = document.getElementById("password").value 
    var newpassword = document.getElementById("newpassword").value
    var confirmpassword = document.getElementById("confirmpassword").value
    if (confirmpassword === newpassword)
    {
        if (password === newpassword){
            alert("Mật khẩu trùng với mật khẩu cũ")
        }
        else
        {
            if(password == userInfo.password)
            {
                userInfo.password = newpassword
                for(let i = 0 ; i < userData.length ; i++)
                {
                    if(userInfo.email == userData[i].email)
                        userData[i].password = newpassword
                }
                alert("Cập nhật thành công mật khẩu mới")
                localStorage.setItem("userInfo",JSON.stringify(userInfo))
                localStorage.setItem("userData",JSON.stringify(userData))
            }
            else
            {
                alert("Mật khẩu không trùng khớp")
            }
        }

    }
    else
    alert("Xác nhận mật khẩu không khớp")

    
}