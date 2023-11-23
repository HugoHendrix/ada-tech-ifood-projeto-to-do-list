let taskArray = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  if (taskInput.value === "") {
    alert("Por favor, insira uma tarefa.");
    return;
  }

  // Verifica se a tarefa já existe
  if (taskArray.find(task => task.text === taskInput.value)) {
    alert("Essa tarefa já foi adicionada.");
    return;
  }

  const newTask = {
    id: Date.now(), // Usando a função Date.now() como identificador único
    text: taskInput.value,
  };

  taskArray.push(newTask);

  localStorage.setItem("tasks", JSON.stringify(taskArray));

  updateTaskList();

  taskInput.value = "";
}

function updateTaskList() {
  const taskList = document.getElementById("taskList");

  taskList.innerHTML = "";

  for (const task of taskArray) {
    const listItem = createListItem(task);
    taskList.appendChild(listItem);
  }
}

function createListItem(task) {
  const listItem = document.createElement("div");
  listItem.className = "list-item";

  const textContainer = document.createElement("span");
  textContainer.appendChild(document.createTextNode(task.text));
  listItem.appendChild(textContainer);

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  const editButton = createButton("Editar ", () => editTask(task), "btn btn-secondary btn-margin");
  const deleteButton = createButton("Excluir ", () => deleteTask(listItem, task), "btn btn-danger btn-margin");
  const completeButton = createButton("Concluir ", () => completeTask(textContainer), "btn btn-success btn-margin");

  editButton.appendChild(document.createElement("i")).className = "fas fa-pencil-alt";
  deleteButton.appendChild(document.createElement("i")).className = "fas fa-trash";
  completeButton.appendChild(document.createElement("i")).className = "fas fa-check-square";

  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);
  buttonContainer.appendChild(completeButton);

  listItem.appendChild(buttonContainer);

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

function editTask(task) {
  const newTaskText = prompt("Editar tarefa:", task.text);
  if (newTaskText !== null && newTaskText !== "") {
    // Atualiza o texto da tarefa
    task.text = newTaskText;

    // Atualiza a taskArray e o localStorage
    updateTaskArrayAndLocalStorage();

    // Atualiza a lista de tarefas na interface
    updateTaskList();
  }
}

function deleteTask(listItem, task) {
  const confirm = window.confirm("Deseja realmente excluir esse item?");
  if (confirm) {
    const taskIndex = taskArray.findIndex((t) => t.id === task.id);
    taskArray.splice(taskIndex, 1);

    updateTaskArrayAndLocalStorage();

    listItem.remove();
  }
}

function completeTask(textContainer) {
  textContainer.style.textDecoration = textContainer.style.textDecoration === "none" ? "line-through" : "none";
}

function updateTaskArrayAndLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(taskArray));
}

document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks) {
    taskArray = storedTasks;
    updateTaskList();
  }
});
