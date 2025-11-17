document.addEventListener("DOMContentLoaded", checkLoginStatus)

function checkLoginStatus() {
    const token = localStorage.getItem("access-token")
    const loginStatus = document.getElementById("login-status")

    loginStatus.innerHTML = ""

    if (token) {
        loginStatus.innerHTML = `
            <div class="card">
                <h2>You already Logged In</h2>
                <p>Do you want to logout?</p>
                <button id="logout-btn">Logout</button>
            </div>
        `

        document.getElementById("logout-btn").addEventListener("click", logout)

    } else {
        loginStatus.innerHTML = `
            <form id="login-form" method="post">
                <div class="card">
                    <h2>Login</h2>

                    <input type="text" id="username" placeholder="Username" required>
                    <input type="password" id="password" placeholder="Password" required>

                    <button type="submit" id="login-btn" style="margin-top: 5px;">Login</button>

                    <div id="login-message" class="message"></div>
                </div>
            </form>
        `

        document.getElementById("login-form").addEventListener("submit", login)
    }
}

function login(event) {
    event.preventDefault()

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const msg = document.getElementById("login-message")

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
        if (data.accessToken) {
            localStorage.setItem("access-token", data.accessToken)
            msg.style.color = "green"
            msg.textContent = "Login Successful"

            setTimeout(checkLoginStatus, 500)
        } else {
            msg.style.color = "red"
            msg.textContent = "Wrong username or password"
        }
    })
}


function logout() {
    localStorage.removeItem("access-token")
    checkLoginStatus()
}


document.getElementById("show-data-btn").addEventListener("click", fetchUserData)

function fetchUserData() {
    const token = localStorage.getItem("access-token")

    const authMsg = document.getElementById("auth-message")
    const collectionBox = document.getElementById("collection-data")

    authMsg.textContent = ""
    collectionBox.innerHTML = ""
    collectionBox.classList.add("hidden")

    if (!token) {
        authMsg.textContent = "Please login first to see user data."
        return
    }

    fetch("https://dummyjson.com/c/cd87-475c-493b-bd2d", {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(result => {
        result.data.forEach(item => {
            const div = document.createElement("div")
            div.className = "card-item"
            div.innerHTML = `
                <p><b>ID:</b> ${item.id}</p>
                <p><b>First Name:</b> ${item.first_name}</p>
                <p><b>Last Name:</b> ${item.last_name}</p>
                <hr>
            `
            collectionBox.appendChild(div)
        })

        collectionBox.classList.remove("hidden")
    })
    .catch(err => {
        authMsg.textContent = "Failed to fetch data."
        console.error(err)
    })
}
