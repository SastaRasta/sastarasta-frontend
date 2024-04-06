function onClick()
{
    fetch("http://192.168.137.159:5000/auth/login")
    .then(res => res.json())
    .then(data => {
        window.location.href = data.url
    })

}

const tripSuggestionForm = document.getElementById("trip_suggestion");
tripSuggestionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(tripSuggestionForm);
    const data = Object.fromEntries(formData);
    console.log(data);
});