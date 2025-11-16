// Login menggunakan submit form
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault()

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const msg = document.getElementById("login-message")

    console.log(username, password)

    fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username,
            password: password,
            expiresInMins: 30
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if (data.accessToken) {
            localStorage.setItem("local-storage", data.accessToken)
            msg.style.color = "green"
            msg.textContent = "Login berhasil"
        } else {
            msg.style.color = "red"
            msg.textContent = "Username atau password salah"
        }
    })
})

// Tombol tampilkan data
document.getElementById("show-data-btn").addEventListener("click", fetchUserData)

function fetchUserData() {
    const token = localStorage.getItem("local-storage")

    const authMsg = document.getElementById("auth-message")
    const userdata = document.getElementById("userdata")

    authMsg.textContent = ""
    userdata.classList.add("hidden")

    if (!token) {
        authMsg.textContent = "Anda belum login"
        return
    }

    fetch("https://dummyjson.com/auth/me", {
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("user-name").textContent = data.firstName + " " + data.lastName
        document.getElementById("user-email").textContent = data.email
        document.getElementById("user-username").textContent = data.username

        userdata.classList.remove("hidden")
    })
}