const theInput = document.querySelector(".add-task input");
const addButton = document.querySelector(".add-task .plus");
const tasksContainer = document.querySelector(".tasks-content");
const tasksCount = document.querySelector(".tasks-count span");
const completedTasks = document.querySelector(".tasks-completed span");
const deleteAllButton = document.querySelector(".delete-all");
window.onload = () => {
  theInput.focus();
};
addButton.onclick = () => {
  if (theInput.value === "") {
    Swal.fire({
      title: "Error!",
      text: "Input field can not be empty.",
      icon: "error",
      confirmButtonText: "OK"
    });
  } else {
    const noTasksMessage = document.querySelector(".no-tasks-message");
    if (document.body.contains(noTasksMessage)) {
      noTasksMessage.remove();
    }
    const mainSpan = document.createElement("span");
    mainSpan.textContent = theInput.value;
    mainSpan.classList.add("task-box");
    const deleteButton = document.createElement("span");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    mainSpan.appendChild(deleteButton);
    tasksContainer.appendChild(mainSpan);
    theInput.value = "";
    theInput.focus();
    tasksCount.innerHTML = document.querySelectorAll(".task-box").length;
    deleteAllButton.style.display = "block";
    const tasksBoxs = document.querySelectorAll(".task-box");
    for (let i = 0; i < tasksBoxs.length; i++) {
      tasksBoxs[i].setAttribute("id", i);
    }
  }
};
document.addEventListener("click", (element) => {
  if (element.target.classList.contains("delete")) {
    element.target.parentElement.remove();
    tasksCount.innerHTML -= 1;
    completedTasks.innerHTML = document.querySelectorAll(".finished").length;
    if (tasksContainer.childElementCount == 0) {
      noTasksMessage();
    }
  }
  if (element.target.classList.contains("task-box")) {
    element.target.classList.toggle("finished");
    if (document.querySelectorAll(".finished").length > 0) {
      completedTasks.innerHTML = document.querySelectorAll(".finished").length;
    } else {
      completedTasks.textContent = 0;
    }
  }
});
function noTasksMessage() {
  const msgSpan = document.createElement("span");
  msgSpan.classList.add("no-tasks-message");
  const msgText = document.createTextNode("No Task To Show");
  msgSpan.appendChild(msgText);
  tasksContainer.appendChild(msgSpan);
  deleteAllButton.style.display = "none";
}
deleteAllButton.onclick = function () {
  document.querySelectorAll(".task-box").forEach(function (task) {
    task.remove();
  });
  tasksCount.innerHTML = document.querySelectorAll(".task-box").length;
  completedTasks.innerHTML = document.querySelectorAll(".finished").length;
  noTasksMessage();
  theInput.focus();
};
