const user_id = localStorage.getItem("user_id");
document.addEventListener("DOMContentLoaded", function () {
  autoUpdateCompleted();
});
function createCompletedQuestCard(quest) {
  const cardDiv = document.createElement("div");
  cardDiv.id = "completedQuestist" + quest.quest_id;
  cardDiv.className =
    "card card-completedQuestList rounded-0 w-100 mb-3 border-0 border-start border-success border-3 shadow-sm";

  // Create the inner div for card body using innerHTML
  cardDiv.innerHTML = `
  <div class="card-body px-3 py-3">
    <h5 class="card-title text-success h4">${quest.title}</h5>
    <div class="card-text mb-2 small">${quest.description}</div>
    <div class="d-flex justify-content-between align-items-center">
        <button type="button"  disabled class="btn btn-success join-btn" data-quest-id="${quest.quest_id}">Completed</button>
        <div class="text-success">Difficulty : <span class="text-danger">${quest.difficulty_level}</span></div>
    </div>
  </div>
    `;

  return cardDiv;
}

