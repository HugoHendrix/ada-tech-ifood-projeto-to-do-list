// Declare the global array to store tasks
let taskArray = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  if (taskInput.value === "") {
    alert("Por favor, insira uma tarefa.");
    return;
  }

  taskArray.push(taskInput.value);

  // Store tasks in local storage
  localStorage.setItem("tasks", JSON.stringify(taskArray));

  // Update the task list
  updateTaskList();

  taskInput.value = ""; // Clear the input field
}

function updateTaskList() {
  const taskList = document.getElementById("taskList");

  taskList.innerHTML = "";

  for (const task of taskArray) {
    const listItem = createListItem(task);
    taskList.appendChild(listItem);
  }
}

function createListItem(text) {
  const listItem = document.createElement("div");
  listItem.className = "list-item"; // Add the list-item class

  const textContainer = document.createElement("span");
  textContainer.appendChild(document.createTextNode(text));
  listItem.appendChild(textContainer);

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  const editButton = createButton("Editar    ", () => editTask(textContainer), "btn btn-secondary btn-margin");
  const deleteButton = createButton("Excluir    ", () => {
    // Remove task from taskArray
    const taskIndex = taskArray.indexOf(text);
    taskArray.splice(taskIndex, 1);

    // Show confirmation message
    const confirm = window.confirm("Deseja realmente excluir esse item?");

    // Update local storage if confirmed
    if (confirm) {
      localStorage.setItem("tasks", JSON.stringify(taskArray));

      // Remove list item from the DOM
      listItem.remove();
    }
  }, "btn btn-danger btn-margin");
  const completeButton = createButton("Concluir    ", () => completeTask(textContainer), "btn btn-success btn-margin");

  // Add icons to buttons
  editButton.appendChild(document.createElement("i"));
  editButton.querySelector("i").className = "fas fa-pencil-alt";

  deleteButton.appendChild(document.createElement("i"));
  deleteButton.querySelector("i").className = "fas fa-trash";

  completeButton.appendChild(document.createElement("i"));
  completeButton.querySelector("i").className = "fas fa-check-square";

  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);
  buttonContainer.appendChild(completeButton);

  listItem.appendChild(buttonContainer);

  // Add the class to the task list container
  listItem.classList.add("list-item-container");

  return listItem;
}

function createButton(label, onClick, classes) {
  const button = document.createElement("button");
  button.appendChild(document.createTextNode(label));
  button.onclick = onClick;
  button.className = classes;

  return button;
}

function editTask(textContainer) {
  const newTask = prompt("Editar tarefa:", textContainer.innerText);
  if (newTask !== null && newTask !== "") {
    textContainer.innerText = newTask;
  }
}

function completeTask(textContainer) {
  textContainer.style.textDecoration = textContainer.style.textDecoration === "none" ? "line-through" : "none";
}

// Add an event listener on load to store tasks from local storage
document.addEventListener("DOMContentLoaded", () => {
  // Read tasks from local storage
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks) {
    taskArray = storedTasks;
    updateTaskList();
  }
});
