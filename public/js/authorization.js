document.addEventListener("DOMContentLoaded", function () {
  handleUnauthorizedUser();
  const filename = getCurrentFilename();
  console.log("filename:", filename);
    if (filename == "login.html" || filename == "sign-up.html") {
        !checkTokenValidity() && redirectToBack();
    }
});

function getCurrentFilename() {
  const pathname = window.location.pathname;
  return pathname.split('/').pop();
}
function handleUnauthorizedUser() {
  const unAuthorizedUserCallback = (responseStatus, responseData) => {
    console.log("responseStatus: hello", responseStatus);
    console.log("responseData:", responseData);

    if (isUnauthorized(responseStatus)) {
      clearLocalStorage();
      redirectToLoginPage();
    }
  };

  fetchUserData(unAuthorizedUserCallback);
}

function isUnauthorized(responseStatus) {
  return responseStatus === 404 || responseStatus === 401;
}

function redirectToBack() {
  window.history.back();
}

function redirectToLoginPage() {
  window.location.href = "login.html";
}

function fetchUserData(callback) {
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const url = currentUrl + "/api/users/" + userId;

  fetchMethod(url, callback, "GET", null, token);
}
