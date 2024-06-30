document.addEventListener("DOMContentLoaded", function () {
  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const userId = urlParams.get("user_id") || localStorage.getItem("user_id");

  const createUserCard = (data) => {
    const container = document.createElement("div");
    container.className = "card card-manual";
    container.style = "margin: 0 auto; max-width: 540px";
    container.innerHTML = `
      <div class="row g-0">
        <div class="col-4 col-xs-6">
          <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" class="active" aria-label="Slide 1" aria-current="true"></button>
              <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1" aria-label="Slide 2" class=""></button>
              <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2" aria-label="Slide 3" class=""></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="https://kpopofficial.com/wp-content/uploads/2022/11/IVE-Members-JAN-WONYOUNG.jpg" class="d-block img-fluid rounded-start w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="https://kpopofficial.com/wp-content/uploads/2022/11/IVE-Members-AN-YUJIN.jpg" class="d-block img-fluid rounded-start w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="https://kpopofficial.com/wp-content/uploads/2022/11/IVE-Members-REI.jpg" class="d-block img-fluid rounded-start w-100" alt="...">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div class="col-8 col-xs-6">
          <div id="userContainer" class="card-body card-body-manual  text-center h-100 d-flex flex-column justify-content-center" 
    
          ></div>
        </div>
      </div>
    `;

    const card = document.createElement("div");
    card.innerHTML = `
      <h3 class="card-title text-warning">User Information</h3>
     <h5 class="card-title text-info">Name - ${data.username}</h5>
      <p class="card-text">
        <span>${ data.user_id == localStorage.getItem('user_id') ? `ID: ${data.user_id}` : ``}</span>
      </p>
      <p class="card-text">
        <span>Email: ${data.email}</span>
      </p>
      <p class="card-text py-1">
        <span>Points: <small class="text-info">( ${data.points} )</small></span>
      </p>
    `;

    // Append the container and card to the document or any desired parent element

    container.querySelector("#userContainer").appendChild(card);
    return container;
  };
  const callbackForUserrInfo = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const cardUserContainer = document.getElementById("cardUserContainer");
    cardUserContainer.innerHTML = "";
    const userCard = createUserCard(responseData);
    cardUserContainer.appendChild(userCard);
  };

  fetchMethod(
    currentUrl + "/api/users/" + userId,
    callbackForUserrInfo,
    "GET",
    null,
    localStorage.getItem("token")
  );
});
