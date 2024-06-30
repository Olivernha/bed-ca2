function clearLocalStorage() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("user_id");
}
function autoUpdateCompleted() {
    function displayCompletedQuests(responseStatus, responseData) {
        console.log(responseData);
        const completedQuestsList = document.getElementById("completedQuestsList");
        completedQuestsList.innerHTML = "";
        if (responseData[0].affectedRows === 0 && responseData[1].length > 0) {
            const completedQuests = responseData[1];
            completedQuestsList.innerHTML = "";
            completedQuests.forEach((quest, index) => {
                const displayCompletedQuestListCard = createCompletedQuestCard(quest);

                setTimeout(() => {
                    displayCompletedQuestListCard.classList.add("add");
                    completedQuestsList.appendChild(displayCompletedQuestListCard);
                }, index * 200);
            });
        } else if (
            responseData[0].affectedRows === 1 &&
            responseData[1].length > 0
        ) {
            const completedQuests = responseData[1];
            completedQuestsList.innerHTML = "";
            completedQuests.forEach((quest, index) => {
                const displayCompletedQuestListCard = createCompletedQuestCard(quest);

                setTimeout(() => {
                    displayCompletedQuestListCard.classList.add("add");
                    completedQuestsList.appendChild(displayCompletedQuestListCard);
                }, index * 200);
            });
            fetchMethod(
                currentUrl + `/api/users/${user_id}/taskprogress`,
                (responseStatus, responseData) => {},
                "DELETE",
                null,
                localStorage.getItem("token")
            );
        } else {
            const displayCompletedQuestListCard = createNoDataCard(
                "quests",
                "success"
            );
            setTimeout(function () {
                displayCompletedQuestListCard.classList.add("add");
                completedQuestsList.appendChild(displayCompletedQuestListCard);
            }, 200);
        }
    }

    fetchMethod(
        currentUrl + `/api/users/${user_id}/quests/completed`,
        displayCompletedQuests,
        "GET",
        null,
        localStorage.getItem("token")
    );
}
const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};
function removeModal() {
    const modal = document.querySelectorAll(".modal");

    if (modal.length > 0) {
        modal.forEach((modal) => {
            modal.remove();
        });
    }
}
function fetchData(callback) {
    fetchMethod(
        currentUrl + "/api/messages",
        (responseStatus, responseData) => {
            callback(responseStatus, responseData);
        },
        "GET",
        null,
        localStorage.getItem("token")
    );
}
