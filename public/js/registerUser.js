

document.addEventListener("DOMContentLoaded", function () {
// Function to generate a unique user ID using UUID

    const forms = document.querySelectorAll(".needs-validation");
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");


    // Fetch all the forms we want to apply custom Bootstrap validation styles to

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    if(!warningCard.classList.contains("d-none")){
                        warningCard.classList.add("d-none");
                    }
                    form.classList.add('was-validated');

                    event.preventDefault()
                    event.stopPropagation();

                }  else {
                    event.preventDefault();
                    const username = document.getElementById("validationCustomUsername").value;
                    const email = document.getElementById("validationCustomEmail").value;
                    const password = document.getElementById("validationCustomPassword").value;
                    const data = {
                        username: username,
                        email: email,
                        password: password,
                    };

                    const callback = (responseStatus, responseData) => {
                        console.log("responseStatus:", responseStatus);
                        console.log("responseData:", responseData);
                        if (responseStatus == 200) {
                            // Check if signup was successful
                            if (responseData.token) {
                                // Store the token in local storage
                                localStorage.setItem("token", responseData.token);
                                localStorage.setItem("user_id", responseData.user_id);
                                const remainingMilliseconds = 60 * 60 * 1000;
                                const expiryDate = new Date(
                                    new Date().getTime() + remainingMilliseconds
                                );
                                localStorage.setItem('expiryDate', expiryDate.toISOString());
                                setTimeout(()=>{
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("user_id");
                                    localStorage.removeItem("expiryDate");
                                    window.location.href = "login.html";
                                },remainingMilliseconds);
                                // Redirect or perform further actions for logged-in user
                                window.location.href = "index.html";
                            }
                        } else {
                            warningCard.classList.remove("d-none");
                            warningText.innerText = responseData.message;
                        }
                    };

// Perform signup request
                    fetchMethod(currentUrl + "/api/register", callback, "POST", data);

// Reset the form fields
                    form.classList.remove('was-validated')
                    form.reset();
                }

            }, false);


    });
});
