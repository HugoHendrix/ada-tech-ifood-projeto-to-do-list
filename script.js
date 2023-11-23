document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks) {
      taskArray = storedTasks;
      updateTaskList();
  }

  showDateTimeGreeting();
});

function showDateTimeGreeting() {
  const dateTimeContainer = document.getElementById("dateTimeContainer");
  const greetingContainer = document.getElementById("greetingContainer");

  // Obter a data e hora atual
  const now = new Date();

  // Configurar o formato da hora
  const options = { hour: 'numeric', minute: 'numeric', hour12: true };

  // Exibir a hora
  const currentTime = now.toLocaleTimeString('en-US', options);
  dateTimeContainer.innerHTML = `Hoje é ${getDayOfWeek(now)}, ${now.getDate()} de ${getMonthName(now)} de ${now.getFullYear()}, ${currentTime}`;

  // Determinar a saudação com base na hora do dia
  const currentHour = now.getHours();
  let greeting;

  if (currentHour >= 5 && currentHour < 12) {
      greeting = "Bom dia!";
  } else if (currentHour >= 12 && currentHour < 18) {
      greeting = "Boa tarde!";
  } else if (currentHour >= 18 && currentHour < 24) {
      greeting = "Boa noite!";
  } else {
      greeting = "Boa madrugada!";
  }

  greetingContainer.innerHTML = greeting;
}

function getDayOfWeek(date) {
  const daysOfWeek = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
  return daysOfWeek[date.getDay()];
}

function getMonthName(date) {
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  return months[date.getMonth()];
}



let taskArray = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskPriority = document.getElementById("taskPriority");

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
    id: Date.now(),
    text: taskInput.value,
    priority: taskPriority.value,
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

  // Configura a lista para ser ordenável usando SortableJS
  new Sortable(taskList, {
    animation: 150, // Duração da animação em milissegundos
    onUpdate: updateTaskOrder, // Função chamada após o arrastar e soltar
  });
}

function createListItem(task) {
  const listItem = document.createElement("li");

  const textContainer = document.createElement("span");
  textContainer.appendChild(document.createTextNode(task.text));

  const priorityContainer = document.createElement("span");
  priorityContainer.className = "task-priority " + task.priority.toLowerCase();
  priorityContainer.appendChild(document.createTextNode(task.priority));

  listItem.appendChild(textContainer);
  listItem.appendChild(priorityContainer);

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
    task.text = newTaskText;
    updateTaskArrayAndLocalStorage();
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
  updateTaskArrayAndLocalStorage();
}

function updateTaskOrder() {
  // Atualize a ordem das tarefas no array e no armazenamento local
  const newTaskArray = [];
  const taskList = document.getElementById("taskList");
  taskList.childNodes.forEach(li => {
    const task = taskArray.find(t => t.text === li.firstChild.textContent);
    if (task) {
      newTaskArray.push(task);
    }
  });

  taskArray = newTaskArray;
  updateTaskArrayAndLocalStorage();
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
