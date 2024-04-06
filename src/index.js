function onClick()
{
    fetch("http://192.168.137.159:5000/auth/login")
    .then(res => res.json())
    .then(data => {
        window.location.href = data.url
    })

}

let login = document.getElementById("login");
login.addEventListener("click",onClick);