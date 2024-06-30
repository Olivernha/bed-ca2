
document.addEventListener("DOMContentLoaded", function () {
  const yourNotesBtn = document.getElementById("your-notes");
  const otherNotesBtn = document.getElementById("other-notes");
  const allNotesBtn = document.getElementById("all-notes");
  const noteMessageList = document.getElementById("note-full-container");
  const addNoteMessageBtn = document.getElementById("add-notes");

  noteMessageList.innerHTML = "";

  allNotesBtn.addEventListener("click", function (e) {
    e.preventDefault();
    noteMessageList.innerHTML = "";
    // remove active class from other button and add active class to this button
    allNotesBtn.classList.add("active");
    yourNotesBtn.classList.remove("active");
    otherNotesBtn.classList.remove("active");

    setTimeout(function () {
      fetchData((responseStatus, responseData) => {
        renderNoteMessages(responseData);
      });
    }, 1000);
    //   showNoNoteMessage();
  });

  otherNotesBtn.addEventListener("click", function (e) {
    e.preventDefault();
    noteMessageList.innerHTML = "";
    // remove active class from other button and add active class to this button
    otherNotesBtn.classList.add("active");
    yourNotesBtn.classList.remove("active");
    allNotesBtn.classList.remove("active");
    setTimeout(function () {
      fetchData((responseStatus, responseData) => {
        const filteredData = responseData.filter(
          (noteMessage) =>
            noteMessage.user_id != localStorage.getItem("user_id")
        );
        renderNoteMessages(filteredData);
      });
    }, 1000);

    //   showNoNoteMessage();
  });

  yourNotesBtn.addEventListener("click", function (e) {
    e.preventDefault();
    noteMessageList.innerHTML = "";
    // remove active class from other button and add active class to this button
    yourNotesBtn.classList.add("active");
    otherNotesBtn.classList.remove("active");
    allNotesBtn.classList.remove("active");

    setTimeout(function () {
      fetchData((responseStatus, responseData) => {
        const filteredData = responseData.filter(
          (noteMessage) =>
            noteMessage.user_id == localStorage.getItem("user_id")
        );
        renderNoteMessages(filteredData);
      });
    }, 1000);
  });

  addNoteMessageBtn.addEventListener("click", function (e) {
    removeModal();
    const addNewNoteCard = newNoteCardModal();
    document.body.appendChild(addNewNoteCard);

    const addNewNoteCardModal = new bootstrap.Modal(addNewNoteCard);
    addNewNoteCardModal.show();

    // const addConfirmNoteBtn = document.getElementById("addConfirmNoteBtn");
    const forms = document.querySelectorAll(".needs-validation");

    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            form.classList.add("was-validated");
            event.preventDefault();
            event.stopPropagation();
          } else {
            event.preventDefault();
            const title = document.getElementById(
              "validationCustomTitle"
            ).value;

            const message = document.getElementById(
              "validationCustomMsg"
            ).value;
            const data = {
              title: title,
              message: message,
              user_id: localStorage.getItem("user_id"),
            };

            // Reset the form fields
            form.classList.remove("was-validated");
            form.reset();
            const callback = (responseStatus, responseData) => {
              noteMessageList.innerHTML = "";
              if (responseStatus == 201) {
                addNewNoteCardModal.hide();
                removeModal();
                //make loading
                setTimeout(function () {
                  fetchData((responseStatus, responseData) => {
                    renderNoteMessages(responseData);
                  });
                }, 1000);
              }
            };
            fetchMethod(currentUrl + "/api/messages", callback, "POST", data);
          }
        },
        false
      );
    });
  });

  fetchData((responseStatus, responseData) => {
    renderNoteMessages(responseData);
  });
});

function createNoteMessageCard(noteMessage, randomColor) {
  const card = document.createElement("div");
  card.className = "col-md-4 single-note-item all-category";
  card.id = `noteMessage${noteMessage.message_id}`;
  card.style.display = "block";
  card.innerHTML = `
 
    <div class="card card-body">
        <span class="side-stick " style="background-color : ${randomColor};"></span>
        <h5 class="note-title  text-truncate w-75 mb-0" style="color: ${randomColor}">
            Title - ${noteMessage.title}
            <i class="point fa fa-circle ml-2 font-10" style="color : ${randomColor}; margin-left:5px" ></i>
        </h5>
        <p class="mt-1">${formattedDate(noteMessage.updated_on)}</em></p>
       
        <div class="note-content">
            <p class="note-inner-content my-3" style="color: ${randomColor}">
               ${noteMessage.message}
            </p>
        </div>
        <div class="d-flex justify-content-between align-items-center mt-2">
            <div>
              
               ${
                 noteMessage.user_id == localStorage.getItem("user_id")
                   ? ` 
                   <button id="viewNoteMsgBtn">
                   <i class="fa fa-eye" aria-hidden="true" style="width: 1em ; color: ${randomColor}"></i>
                   </button>
                   <button id="deleteNoteMsgBtn">
                  <i class="fa fa-trash remove-note " style="width: 1em ; color: ${randomColor}";></i>
               </button>
               <button id="editNoteMsgBtn">
               <i class="fa fa-pencil-square-o" style="width: 1em ; color: ${randomColor}";></i>
               </button>`
                   : `
                    <button id="viewNoteMsgBtn">
                    <i class="fa fa-eye" aria-hidden="true" style="width: 1em ; color: ${randomColor}"></i>
                    </button>
                    `
               }
            </div>
            <p>
               Written By - <a href="profile.html?user_id=${
                 noteMessage.user_id
               }" class="text-decoration-none"style="color: ${randomColor}" >${Capitalize(
    noteMessage.username
  )}</a>
            </p>

                
            </a>
        </div>
    </div>

    `;
  return card;
}

function viewNoteCardModal(noteMessage, randomColor) {
  const modalContainer = document.createElement("div");
  modalContainer.className = "modal modalMsg fade";
  modalContainer.id = `noteMessageModal${noteMessage.message_id}`;
  modalContainer.tabIndex = -1;
  modalContainer.setAttribute("aria-labelledby", "noteMessageModalLabel");
  modalContainer.setAttribute("aria-hidden", "true");

  const modalDialog = document.createElement("div");
  modalDialog.className =
    "modal-dialog modal-dialog-centered modal-dialog-scrollable";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
    <h5 class="modal-title" style="color: ${randomColor}">${noteMessage.title}</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  `;

  const modalBody = document.createElement("div");
  modalBody.className = "modal-body";
  modalBody.innerHTML = `
    <p class="mt-1">${formattedDate(noteMessage.updated_on)}</em></p>
    <div class="note-content">
      <p class="note-inner-content my-3" style="color: ${randomColor}">
        ${noteMessage.message}
      </p>
    </div>
  `;

  const modalFooter = document.createElement("div");
  modalFooter.className = "modal-footer";
  modalFooter.innerHTML = `
    <p>Written By - <a href="#" class="text-decoration-none" style="color: ${randomColor}">${Capitalize(
    noteMessage.username
  )}</a></p>
  `;

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);

  modalDialog.appendChild(modalContent);
  modalContainer.appendChild(modalDialog);

  return modalContainer;
}
function createNoDataCard(name, color) {
  const displayTask = document.createElement("div");
  displayTask.className = `card card-task rounded-0 w-100 mb-3 border-0 border-start border-${color} border-3 shadow-sm`;
  displayTask.innerHTML = `
          <div class="card-body px-3 py-3">
          <h5 class="card-title text-${color} h4">No ${
    name.charAt(0).toUpperCase() + name.slice(1)
  }</h5>
          <div class="card-text mb-2 small">You have no ${name} to do</div>
          </div>
      `;
  return displayTask;
}
function renderNoteMessages(responseData) {
  const noteMessageList = document.getElementById("note-full-container");
  const colorArray = [
    "rgb(245 137 21)",
    "rgb(28 175 101)",
    "rgb(11 167 241 / 85%)",
    "#ff5050",
  ];
  if(responseData.length === 0){
    const displayTask = createNoDataCard("message", "warning");
    setTimeout(function () {
      displayTask.classList.add("add");
      noteMessageList.appendChild(displayTask);
    }, 700);
  }else{
    responseData.forEach((noteMessage, index) => {
      const randomColor =
          colorArray[Math.floor(Math.random() * colorArray.length)];
      const displayNoteMessageCard = createNoteMessageCard(
          noteMessage,
          randomColor
      );
      setTimeout(() => {
        displayNoteMessageCard.classList.add("add");
        noteMessageList.appendChild(displayNoteMessageCard);
      }, index * 200); //

      const deleteNoteMessageButton =
          displayNoteMessageCard.querySelector("#deleteNoteMsgBtn");
      if (deleteNoteMessageButton != null) {
        deleteNoteMessageButton.addEventListener("click", function () {
          fetchMethod(
              currentUrl + `/api/messages/${noteMessage.message_id}`,
              (responseStatus, responseData) => {
                console.log(responseStatus, responseData);
                const noteMessage = document.getElementById(
                    "noteMessage" + responseData[0][0].message_id
                );
                console.log(noteMessage);
                noteMessage.classList.remove("add");
                noteMessage.classList.add("delete");
                setTimeout(function () {
                  noteMessage.remove();
                }, 400);
              },
              "DELETE",
              {
                message_id: noteMessage.message_id,
                user_id: localStorage.getItem("user_id"),
              },
              localStorage.getItem("token")
          );
        });
      }

      const editNoteMessageButton =
          displayNoteMessageCard.querySelector("#editNoteMsgBtn");
      if (editNoteMessageButton != null) {
        editNoteMessageButton.addEventListener("click", function () {
          removeModal();

          const callback = (responseStatus, responseData) => {
            console.log(responseData);
            const editNoteCard = editNoteCardModal(responseData);
            document.body.appendChild(editNoteCard);
            const editNoteCardModalPopup = new bootstrap.Modal(editNoteCard);
            editNoteCardModalPopup.show();

            const forms = document.querySelectorAll(".needs-validation");
            forms.forEach((form) => {
              form.addEventListener(
                  "submit",
                  (event) => {
                    if (!form.checkValidity()) {
                      form.classList.add("was-validated");
                      event.preventDefault();
                      event.stopPropagation();
                    } else {
                      event.preventDefault();
                      const title = document.getElementById(
                          "validationEditCustomTitle"
                      ).value;

                      const message = document.getElementById(
                          "validationEditCustomMsg"
                      ).value;
                      const data = {
                        title: title,
                        message: message,
                        user_id: localStorage.getItem("user_id"),
                      };

                      // Reset the form fields
                      form.classList.remove("was-validated");
                      form.reset();
                      const callback = (responseStatus, responseData) => {
                        noteMessageList.innerHTML = "";
                        if (responseStatus == 200) {
                          editNoteCardModalPopup.hide();
                          removeModal();
                          //make loading
                          setTimeout(function () {
                            fetchData((responseStatus, responseData) => {
                              renderNoteMessages(responseData);
                            });
                          }, 1000);
                        }
                      };
                      fetchMethod(
                          currentUrl + `/api/messages/${noteMessage.message_id}`,
                          callback,
                          "PUT",
                          data,
                          localStorage.getItem("token")
                      );
                    }
                  },
                  false
              );
            });
          };

          fetchMethod(
              currentUrl + `/api/messages/${noteMessage.message_id}`,
              callback,
              "GET",
              null,
              localStorage.getItem("token")
          );
          // const titleInput = document.getElementById("validationCustomTitle");
        });
      }

      const viewNoteMessageButton =
          displayNoteMessageCard.querySelector("#viewNoteMsgBtn");
      if (viewNoteMessageButton != null) {
        viewNoteMessageButton.addEventListener("click", function () {
          removeModal();
          const callback = (responseStatus, responseData) => {
            console.log(responseData);
            const viewNoteCard = viewNoteCardModal(responseData, randomColor);
            document.body.appendChild(viewNoteCard);
            const viewNoteCardModalPopup = new bootstrap.Modal(viewNoteCard);
            viewNoteCardModalPopup.show();
          };
          fetchMethod(
              currentUrl + `/api/messages/${noteMessage.message_id}`,
              callback,
              "GET",
              null,
              localStorage.getItem("token")
          );
        });
      }
    });
  }

}

function newNoteCardModal() {
  const modalContainer = document.createElement("div");
  modalContainer.className = "modal modalMsg fade";
  modalContainer.id = "messageModal";
  modalContainer.tabIndex = -1;
  modalContainer.setAttribute("aria-labelledby", "messageModalLabel");
  modalContainer.setAttribute("aria-hidden", "true");

  const modalDialog = document.createElement("div");
  modalDialog.className =
    "modal-dialog modal-dialog-centered modal-dialog-scrollable";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
    <h5 class="modal-title text-info">Add Message</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  `;

  const modalBody = document.createElement("div");
  modalBody.className = "modal-body";

  const form = document.createElement("form");
  form.id = "formAddNoteMsg";
  form.className = "row g-3 needs-validation";
  form.noValidate = true;

  const titleFormGroup = document.createElement("div");
  titleFormGroup.className = "col-md-12";

  const titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "validationCustomTitle");
  titleLabel.textContent = "Title";

  const titleInputGroup = document.createElement("div");
  titleInputGroup.className = "input-group has-validation";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.className = "form-control";
  titleInput.id = "validationCustomTitle";
  titleInput.setAttribute("aria-describedby", "inputGroupPrepend");
  titleInput.required = true;

  const titleInvalidFeedback = document.createElement("div");
  titleInvalidFeedback.className = "invalid-feedback";
  titleInvalidFeedback.textContent = "Please choose a title.";

  titleInputGroup.appendChild(titleInput);
  titleInputGroup.appendChild(titleInvalidFeedback);
  titleFormGroup.appendChild(titleLabel);
  titleFormGroup.appendChild(titleInputGroup);

  const messageFormGroup = document.createElement("div");
  messageFormGroup.className = "col-md-12";

  const messageLabel = document.createElement("label");
  messageLabel.setAttribute("for", "validationCustomMsg");
  messageLabel.textContent = "Message";

  const messageInput = document.createElement("textarea");
  messageInput.type = "password";
  messageInput.className = "form-control";
  messageInput.id = "validationCustomMsg";
  messageInput.required = true;

  const messageInvalidFeedback = document.createElement("div");
  messageInvalidFeedback.className = "invalid-feedback";
  messageInvalidFeedback.textContent = "Please provide a message.";

  messageFormGroup.appendChild(messageLabel);
  messageFormGroup.appendChild(messageInput);
  messageFormGroup.appendChild(messageInvalidFeedback);

  const modalFooter = document.createElement("div");
  modalFooter.className = "modal-footer";
  modalFooter.innerHTML = `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button type="submit" class="btn btn-primary" id="addConfirmNoteBtn">Add</button>
  `;
  form.appendChild(titleFormGroup);
  form.appendChild(messageFormGroup);
  form.appendChild(modalFooter);

  modalBody.appendChild(form);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);

  modalDialog.appendChild(modalContent);
  modalContainer.appendChild(modalDialog);

  return modalContainer;
}
function editNoteCardModal(data) {
  const modalContainer = document.createElement("div");
  modalContainer.className = "modal modalMsg fade";
  modalContainer.id = "messageModal";
  modalContainer.tabIndex = -1;
  modalContainer.setAttribute("aria-labelledby", "messageModalLabel");
  modalContainer.setAttribute("aria-hidden", "true");

  const modalDialog = document.createElement("div");
  modalDialog.className =
    "modal-dialog modal-dialog-centered modal-dialog-scrollable";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
    <h5 class="modal-title text-info">Add Message</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  `;

  const modalBody = document.createElement("div");
  modalBody.className = "modal-body";

  const form = document.createElement("form");
  form.id = "formAddNoteMsg";
  form.className = "row g-3 needs-validation";
  form.noValidate = true;

  const titleFormGroup = document.createElement("div");
  titleFormGroup.className = "col-md-12";

  const titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "validationCustomTitle");
  titleLabel.textContent = "Title";

  const titleInputGroup = document.createElement("div");
  titleInputGroup.className = "input-group has-validation";

  const titleInput = document.createElement("input");
  titleInput.type = "text";

  titleInput.className = "form-control";
  titleInput.id = "validationEditCustomTitle";
  titleInput.setAttribute("aria-describedby", "inputGroupPrepend");
  titleInput.required = true;
  titleInput.value = data.title;

  const titleInvalidFeedback = document.createElement("div");
  titleInvalidFeedback.className = "invalid-feedback";
  titleInvalidFeedback.textContent = "Please choose a title.";

  titleInputGroup.appendChild(titleInput);
  titleInputGroup.appendChild(titleInvalidFeedback);
  titleFormGroup.appendChild(titleLabel);
  titleFormGroup.appendChild(titleInputGroup);

  const messageFormGroup = document.createElement("div");
  messageFormGroup.className = "col-md-12";

  const messageLabel = document.createElement("label");
  messageLabel.setAttribute("for", "validationCustomMsg");
  messageLabel.textContent = "Message";

  const messageInput = document.createElement("textarea");
  messageInput.type = "password";
  messageInput.className = "form-control";
  messageInput.id = "validationEditCustomMsg";
  messageInput.required = true;
  messageInput.value = data.message;

  const messageInvalidFeedback = document.createElement("div");
  messageInvalidFeedback.className = "invalid-feedback";
  messageInvalidFeedback.textContent = "Please provide a message.";

  messageFormGroup.appendChild(messageLabel);
  messageFormGroup.appendChild(messageInput);
  messageFormGroup.appendChild(messageInvalidFeedback);

  const modalFooter = document.createElement("div");
  modalFooter.className = "modal-footer";
  modalFooter.innerHTML = `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button type="submit" class="btn btn-primary" id="addConfirmNoteBtn">Update</button>
  `;
  form.appendChild(titleFormGroup);
  form.appendChild(messageFormGroup);
  form.appendChild(modalFooter);

  modalBody.appendChild(form);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);

  modalDialog.appendChild(modalContent);
  modalContainer.appendChild(modalDialog);

  return modalContainer;
}

