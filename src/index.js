const remoteURL = "http://localhost:5000"

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

const login = document.getElementById("login");
login.addEventListener("click", (e) => {
    fetch(`${remoteURL}/auth/login`)
        .then(res => res.json())
        .then(data => {
            window.location.href = data.url
        })
});

const tripSuggestionForm = document.getElementById("trip_suggestion");
tripSuggestionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(tripSuggestionForm);
    const data = Object.fromEntries(formData);
    
    fetch(`${remoteURL}/trip/suggest`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getCookie("access_token")
        },
        body: JSON.stringify(data),
    })
    .then(res => {
        if (res.ok) {
            return res.text();
        } else if (res.status === 401) {
            alert("You are not authorized to perform this action. Please login.")
        } 
    })
    .then(data => {
        console.log(data)
        document.getElementById('ifr').srcdoc = data;
    })

});