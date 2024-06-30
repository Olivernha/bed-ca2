document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("signUpButton");
  const profileButton = document.getElementById("profileButton");
  const logoutButton = document.getElementById("logoutButton");
  const boardButton = document.getElementById("boardButton");
  const msgButton = document.getElementById("msgButton");

  // Check if token exists in local storage
  const token = localStorage.getItem("token");
  if (token) {
    // Token exists, show profile button and hide login and register buttons
    loginButton.classList.add("d-none");
    registerButton.classList.add("d-none");
    profileButton.classList.remove("d-none");
    logoutButton.classList.remove("d-none");
    boardButton.classList.remove("d-none");
    msgButton.classList.remove("d-none");
  } else {
    // Token does not exist, show login and register buttons and hide profile and logout buttons
    loginButton.classList.remove("d-none");
    registerButton.classList.remove("d-none");
    profileButton.classList.add("d-none");
    logoutButton.classList.add("d-none");
    boardButton.classList.add("d-none");
    msgButton.classList.add("d-none");
  }

  logoutButton.addEventListener("click", function () {
    // Remove the token from local storage and redirect to index.html
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("expiryDate");
    window.location.href = "index.html";
  });
});
