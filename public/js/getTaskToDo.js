document.addEventListener("DOMContentLoaded", function () {
  funcTask();
});
function createNoDataCard(name, color) {
  const displayTask = document.createElement("div");
  displayTask.className = `card card-task rounded-0 w-100 mb-3 border-0 border-start border-${color} border-3 shadow-sm`;
  displayTask.innerHTML = `
        <div class="card-body px-3 py-3">
        <h5 class="card-title text-${color} h4">No ${
    name.charAt(0).toUpperCase() + name.slice(1)
  }</h5>
        <div class="card-text mb-2 small">You have no ${name}</div>
        </div>
    `;
  return displayTask;
}
function addNotesAndFinishTask(data) {
  const modalContainer = createNoteCard(data);

  document.body.appendChild(modalContainer);
  const questModal = new bootstrap.Modal(modalContainer);
  if (document.querySelectorAll(".modalmodalTaskNote.length") > 1) {
    document.querySelectorAll(".modalmodalTaskNote").forEach((modal) => {
      modal.remove();
    });
  }
  questModal.show();
  //user start type note, button will be enable.give me code

  const finishNoteTaskButton = document.querySelectorAll(".finish-note-task");
  const formNote = document.querySelectorAll("#taskNote");
  formNote.forEach((form) => {
    form.addEventListener("keyup", function () {
      if (form.value.length > 0) {
        finishNoteTaskButton.forEach((button) => {
          button.disabled = false;
        });
      } else {
        finishNoteTaskButton.forEach((button) => {
          button.disabled = true;
        });
      }
    });
  });
  finishNoteTaskButton.forEach((button) => {
    button.addEventListener("click", function () {
      const note = document.querySelector("#taskNote").value;
      data.note = note;
      fetchMethod(
        currentUrl + `/api/taskprogress`,
        (responseStatus, responseData) => {
          console.log(responseStatus, responseData);
          const task = document.getElementById("task" + responseData.task_id);
          console.log(task);
          task.classList.remove("add");
          task.classList.add("delete");
          setTimeout(function () {
            task.remove();
            if (
              document.querySelectorAll(".card-task").length === 0 ||
              document.getElementById("taskList").innerHTML === ""
            ) {
              // Show the "no data" card
              const displayTask = createNoDataCard("tasks", "warning");
              setTimeout(function () {
                displayTask.classList.add("add");
                taskList.appendChild(displayTask);
              }, 700);
            }
          }, 400);
          autoUpdateCompleted();
        },
        "POST",
        data,
        localStorage.getItem("token")
      );
    });
  });
}
function createNoteCard(data) { 
  const modalContainer = document.createElement("div");
  modalContainer.className = "modal modalTaskNote fade";
  modalContainer.id = `taskNote${data.task_id}Modal`;
  modalContainer.tabIndex = -1;
  modalContainer.setAttribute(
    "aria-labelledby",
    `taskNote${data.task_id}ModalLabel`
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
      <h5 class="modal-title text-warning">Notes</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  `;

  const modalBody = document.createElement("div");
  modalBody.className = "modal-body";
  modalBody.innerHTML = `<p class="text-info">
      <span class="text-warning">Please write note to finish this task</span>
      </p>
      <textarea class="form-control mt-1" id="taskNote" rows="3" required></textarea>
    
`;
  const modalFooter = document.createElement("div");
  modalFooter.className = "modal-footer";
  modalFooter.innerHTML = `
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button disabled type="submit" class="btn btn-primary finish-note-task" data-bs-dismiss="modal">Finish</button>
  `;

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);

  modalContent.appendChild(modalFooter);

  modalDialog.appendChild(modalContent);
  modalContainer.appendChild(modalDialog);

  return modalContainer;
}
function createTaskCard(task) {
  // Create the outer div with id "todotaskList"
  const cardDiv = document.createElement("div");
  cardDiv.id = "task" + task.task_id;
  cardDiv.className =
    "card card-task rounded-0 w-100 mb-3 border-0 border-start border-warning border-3 shadow-sm";

  // Create the inner div for card body using innerHTML
  cardDiv.innerHTML = `
      <div class="card-body px-3 py-3">
        <div class="card-title text-warning h4">${task.description}</div>
        <div class="card-text mb-2 small">Quest - ${task.title}</div>
        <div class="card-text mb-2 small">Points - ${task.points}</div>
        <button type="button" id="taskCard${task.task_id}" data-points="${task.points}" data-task-id="${task.task_id}" class="btn btn-warning text-white finishTask-btn">Finish</button>
      </div>
    `;

  return cardDiv;
}
function funcTask() {
  const user_id = localStorage.getItem("user_id");

  function displayTasks(responseStatus, responseData) {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    if (responseData.length === 0) {
      // make beautiful design with card
      const displayTask = createNoDataCard("tasks", "warning");
      setTimeout(function () {
        displayTask.classList.add("add");
        taskList.appendChild(displayTask);
      }, 200);
    } else {
      const reversedData = responseData.slice().reverse();
      reversedData.forEach((task, index) => {
        const displayTask = createTaskCard(task);

        // Add animation class after a delay
        setTimeout(() => {
          displayTask.classList.add("add");
          taskList.appendChild(displayTask);
        }, index * 200); // Adjust the delay (200ms in this case) according to your preference
      });

      // Add event listener to the finish button
      taskList.addEventListener("click", function (event) {
        if (event.target.classList.contains("finishTask-btn")) {
          const taskId = event.target.getAttribute("data-task-id");
          const points  = event.target.getAttribute("data-points");
          console.log(taskId);
          const data = {
            task_id: taskId,
            points :  points,
            user_id: user_id,
            completion_date: new Date()
              .toISOString()
              .slice(0, 19)
              .replace("T", " "),
          };
          removeModal();
          addNotesAndFinishTask(data);
          // catch notetextarea
        }
      });
    }
  }

  fetchMethod(
    currentUrl + `/api/users/${user_id}/quest/tasks`,
    displayTasks,
    "GET",
    null,
    localStorage.getItem("token")
  );
}
