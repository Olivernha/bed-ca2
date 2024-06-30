document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    const expiryDate = localStorage.getItem('expiryDate');
    const pathname = window.location.pathname;
    const filename = pathname.split('/').pop();
    const isTokenValid = isValidToken(expiryDate);

    if (isTokenValid && token && user_id) {
        if (filename === 'login.html' || filename === 'signup.html') {
            window.location.href = "dashboard.html"; // Redirect to dashboard after login
        }
    } else {
        redirectToLoginPage();
    }

    function isValidToken(expiryDate) {
        // Implement your logic to validate token expiry here
        // For example, compare expiryDate with current date
        return true; // Return true if token is valid, false otherwise
    }

    function redirectToLoginPage() {
        window.location.href = "login.html";
    }

    function handleUnauthorizedUser(responseStatus, responseData) {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        if (isUnauthorized(responseStatus)) {
            clearLocalStorage();
            redirectToLoginPage();
        }
    }

    function isUnauthorized(responseStatus) {
        return responseStatus === 404 || responseStatus === 401;
    }

    function fetchUserData(callback) {
        const userId = localStorage.getItem("user_id");
        const token = localStorage.getItem("token");
        const url = currentUrl + "/api/users/" + userId;

        fetchMethod(url, callback, "GET", null, token);
    }

    fetchUserData();
});


