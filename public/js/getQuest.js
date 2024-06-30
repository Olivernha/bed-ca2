let questId;
document.addEventListener("DOMContentLoaded", function () {
  function displayQuests(responseStatus, responseData) {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    const questList = document.getElementById("questList");
    questList.innerHTML = "";
    if (responseData.length === 0) {
      // make beautiful design with card
      const displayQuest = createNoDataCard("quests", "info");
      setTimeout(function () {
        displayQuest.classList.add("add");
        questList.appendChild(displayQuest);
      }, 200);
    } else {
      const questList = document.getElementById("questList");
      questList.innerHTML = "";

      responseData.forEach((quest, index) => {
        const displayItem = createQuestCard(quest);

        // Add animation class after a delay
        setTimeout(() => {
          displayItem.classList.add("add");
          questList.appendChild(displayItem);
        }, index * 200); // Adjust the delay (200ms in this case) according to your preference
      });
      // responseData.forEach((quest) => {
      //     const displayItem = createQuestCard(quest);
      //     questList.appendChild(displayItem);
      // });

      questList.addEventListener("click", function (event) {
        if (event.target.classList.contains("join-btn")) {
          const questId = event.target.getAttribute("data-quest-id");
          removeModal();
          fetchQuestDetailsAndShowModal(questId);
        }
      });
    }
  }

  function createQuestCard(quest) {
    const displayItem = document.createElement("div");
    displayItem.id = "quest" + quest.quest_id;
    displayItem.className =
      "card card-quest rounded-0 w-100 mb-3 border-0 border-start border-primary border-3 shadow-sm";

    displayItem.innerHTML = `
            <div class="card-body px-3 py-3">
                <h5 class="card-title text-info h4">${quest.title}</h5>
                <div class="card-text mb-2 small">${quest.description}</div>
                <div class="d-flex justify-content-between align-items-center">
                    <button type="button"   class="btn btn-primary join-btn" data-quest-id="${quest.quest_id}">Join</button>
                    <div class="text-info">Difficulty : <span class="text-danger">${quest.difficulty_level}</span></div>
                </div>
            </div>
        `;
    return displayItem;
  }

  function fetchQuestDetailsAndShowModal(questId) {
    function displayQuestDetails(responseStatus, responseData) {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      const quest = responseData;

      const modalContainer = createQuestModal(quest);
      document.body.appendChild(modalContainer);

      const questModal = new bootstrap.Modal(modalContainer);
      questModal.show();
    }

    fetchMethod(
      currentUrl + "/api/quests/" + questId,
      displayQuestDetails,
      "GET",
      null,
      localStorage.getItem("token")
    );
  }

  function createQuestModal(quest) {
    const modalContainer = document.createElement("div");
    modalContainer.className = "modal modalQuest fade";
    modalContainer.id = `quest${quest.quest_id}Modal`;
    modalContainer.tabIndex = -1;
    modalContainer.setAttribute(
      "aria-labelledby",
      `quest${quest.quest_id}ModalLabel`
    );
    modalContainer.setAttribute("aria-hidden", "true");

    const modalDialog = document.createElement("div");
    modalDialog.className =
      "modal-dialog modal-dialog-centered modal-dialog-scrollable";

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
            <h5 class="modal-title text-info">${quest.title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        `;

    const modalBody = document.createElement("div");
    modalBody.className = "modal-body";
    modalBody.innerHTML = `<p class="text-info">
            Description -  <span class="text-warning">${quest.description}</span>
            <br>
            Difficulty - <span class="text-danger">${quest.difficulty_level}</span>
        </p>
        <p class="text-info">
   
            Reward Item - <a href="#" class="border-0 text-success" id="reward_item" data-bs-target="#item${quest.item_id}Modal" data-bs-dismiss="modal">${quest.name}</a>
        </p>`;
    const rewardItemLink = modalBody.querySelector("#reward_item");

    rewardItemLink?.addEventListener("click", function (event) {
      displayItemDetails(quest);
    });

    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    modalFooter.innerHTML = `
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary join-task" data-bs-dismiss="modal">Join</button>
        `;
    const joinTaskButton = modalFooter.querySelector(".join-task");
    joinTaskButton.addEventListener("click", function (event) {
      const data = {
        user_id: localStorage.getItem("user_id"),
        quest_id: quest.quest_id,
      };
      removeModal();
      joinTask(data);
    });
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);

    modalContent.appendChild(modalFooter);

    modalDialog.appendChild(modalContent);
    modalContainer.appendChild(modalDialog);

    return modalContainer;
  }

  function joinTask(data) {
    questId = data.quest_id;
    function updateQuestUI(responseStatus, responseData) {
      const questDeleted = document.getElementById(`quest${questId}`);
      questDeleted.classList.remove("add");
      questDeleted.classList.add("delete");

      setTimeout(function () {
        questDeleted.remove();

        if (document.querySelectorAll(".card-quest").length === 0) {
          const displayQuest = createNoDataCard("quests", "info");
          setTimeout(function () {
            displayQuest.classList.add("add");
            questList.appendChild(displayQuest);
          }, 700);
        }
      }, 400);

      function displayTasks(responseStatus, responseData) {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseData.length === 0) {
          const taskList = document.getElementById("taskList");
          taskList.innerHTML = "";
          const displayTask = createNoDataCard("tasks", "warning");
          setTimeout(function () {
            displayTask.classList.add("add");
            taskList.appendChild(displayTask);
          }, 200);
          return;
        }
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

        responseData.forEach((task, index) => {
          const displayItem = createTaskCard(task);
          displayItem.addEventListener("click", function (event) {
            const task_id = event.target.getAttribute("data-task-id");
            const points = event.target.getAttribute("data-points");
            const data = {
              task_id: task_id,
              user_id: user_id,
              points: points,
              completion_date: new Date()
                .toISOString()
                .slice(0, 19)
                .replace("T", " "),
            };
            removeModal();
            addNotesAndFinishTask(data);
          });
          // Add animation class after a delay
          setTimeout(() => {
            displayItem.classList.add("add");
            taskList.appendChild(displayItem);
          }, index * 200);
        });
      }
      const user_id = localStorage.getItem("user_id");
      fetchMethod(
        currentUrl + `/api/users/${user_id}/quest/tasks`,
        displayTasks,
        "GET",
        null,
        localStorage.getItem("token")
      );
    }
    fetchMethod(
      currentUrl + "/api/users/" + data.user_id + "/quests/" + questId,
      updateQuestUI,
      "POST",
      data,
      localStorage.getItem("token")
    );
  }

  function displayItemDetails(quest) {
    const itemModalContainer = createItemModal(quest);

    document.body.appendChild(itemModalContainer);

    const itemBootstrapModal = new bootstrap.Modal(itemModalContainer);
    itemBootstrapModal.show();

    // addBackButtonListener(itemModalContainer, previousQuestModal);
  }

  function createItemModal(questItem) {
    const itemModalContainer = document.createElement("div");
    itemModalContainer.className = "modal modalItem fade";
    itemModalContainer.id = `item${questItem.item_id}Modal`;
    itemModalContainer.tabIndex = -1;
    itemModalContainer.setAttribute(
      "aria-labelledby",
      `item${questItem.item_id}ModalLabel`
    );
    itemModalContainer.setAttribute("aria-hidden", "true");

    const itemModalDialog = document.createElement("div");
    itemModalDialog.className = "modal-dialog modal-dialog-centered";

    const itemModalContent = document.createElement("div");
    itemModalContent.className = "modal-content";

    const itemModalHeader = document.createElement("div");
    itemModalHeader.className =
      "modal-header flex justify-content-between align-items-center";

    itemModalHeader.innerHTML = `
             <h5 class="modal-title text-info">${questItem.name}</h5>
        `;

    const itemModalBody = document.createElement("div");
    itemModalBody.className = "modal-body";
    itemModalBody.innerHTML = `<p>
Type - <span class="text-warning">${questItem.type}</span>
<br>
description - <span class="text-warning">${questItem.description}</span>
<br>
Rarity - <span class="text-warning">${questItem.rarity}</span>
<br>
Attributes - <span class="text-warning">${questItem.attributes || null}</span>
<br>
Effects - <span class="text-warning">${questItem.effects || null}</span>
</p>`;

    const itemModalFooter = document.createElement("div");
    itemModalFooter.className = "modal-footer";
    itemModalFooter.innerHTML = `

        <button type="button" data-bs-target="#quest${questItem.quest_id}Modal"  class="btn btn-secondary btn-back" data-bs-toggle="modal" >Close</button>
    `;
    const backButton = itemModalFooter.querySelector(".btn-back");
    backButton.addEventListener("click", function (event) {
      removeItemModal(questItem.item_id);
    });
    itemModalContent.appendChild(itemModalHeader);
    itemModalContent.appendChild(itemModalBody);
    itemModalContent.appendChild(itemModalFooter);

    itemModalDialog.appendChild(itemModalContent);
    itemModalContainer.appendChild(itemModalDialog);

    return itemModalContainer;
  }

  function removeItemModal(item) {
    const itemModal = document.querySelectorAll(`#item${item}Modal`);
    if (itemModal.length > 0) {
      itemModal.forEach((itemModal) => {
        itemModal.remove();
      });
    }
  }

  fetchMethod(
    currentUrl + "/api/users/" + localStorage.getItem("user_id") + "/quests",
    displayQuests,
    "GET",
    null,
    localStorage.getItem("token")
  );
});
function removeModal() {
  const modal = document.querySelectorAll(".modal");

  if (modal.length > 0) {
    modal.forEach((modal) => {
      modal.remove();
    });
  }
}
