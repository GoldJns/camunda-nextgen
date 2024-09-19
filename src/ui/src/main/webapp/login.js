const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () =>
container.classList.add('right-panel-active'));

signInButton.addEventListener('click', () =>
container.classList.remove('right-panel-active'));

// ============ Login ======================
document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("emailLogin").value.trim();
    const password = document.getElementById("passwordLogin").value.trim();
    const credentials = {
        email: email,
        password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/auth/login",{
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          
          body: JSON.stringify(credentials),
        });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("accessToken", data.jwt);
      }
    } catch (error) {
        console.error("Fehler:", error);
    }
});

async function fetchUser() {
    const token = sessionStorage.getItem("accessToken");
    try {
      const response = await fetch("http://localhost:8080/auth/user",{
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
          },
        });
  
        const user = await response.json();
        return user;
    } catch (error) {
        console.error("Fehler:", error);
    }
}

// ============ Registration ======================
document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwörter stimmen nicht überein!");
        return;
    }

    const userData = {
        email: email,
        password: password,
        firstname: "test",
        lastname: "test",
        role: "doctor",
        age: 30 
    };

    try {
        const response = await fetch("http://localhost:8080/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const data = await response.json();
            sessionStorage.setItem("accessToken", data.jwt);
        } 
    } catch (error) {
        console.error("Fehler:", error);
    }
});

