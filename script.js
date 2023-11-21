function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
  
    if (taskInput.value === "") {
      alert("Por favor, insira uma tarefa.");
      return;
    }
  
    const createListItem = (text) => {
      const listItem = document.createElement("div");
      listItem.className = "list-item"; // Adiciona a classe list-item
  
      const textContainer = document.createElement("span");
      textContainer.appendChild(document.createTextNode(text));
      listItem.appendChild(textContainer);
  
      const buttonContainer = document.createElement("div");
      buttonContainer.className = "button-container";
  
      const editButton = createButton("Editar   ", () => editTask(textContainer), "btn btn-secondary btn-margin");
      const deleteButton = createButton("Excluir   ", () => deleteTask(listItem), "btn btn-danger btn-margin");
      const completeButton = createButton("Concluir   ", () => completeTask(textContainer), "btn btn-success btn-margin");
  
      // Adiciona os ícones aos botões
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
  
      // Adiciona a classe ao contêiner da lista de tarefas
      listItem.classList.add("list-item-container");
  
      return listItem;
    };
  
    const createButton = (label, onClick, classes) => {
      const button = document.createElement("button");
      button.appendChild(document.createTextNode(label));
      button.onclick = onClick;
      button.className = classes;
  
      return button;
    };
  
    const editTask = (textContainer) => {
      const newTask = prompt("Editar tarefa:", textContainer.innerText);
      if (newTask !== null && newTask !== "") {
        textContainer.innerText = newTask;
      }
    };
  
    const deleteTask = (listItem) => {
      const confirm = window.confirm("Deseja realmente excluir esse item?");
      if (confirm) {
        listItem.remove();
      }
    };
  
    const completeTask = (textContainer) => {
      textContainer.style.textDecoration = textContainer.style.textDecoration === "none" ? "line-through" : "none";
    };
  
    const taskArray = [...taskList.children];
  
    const taskExists = taskArray.filter(
      (item) => item.querySelector(".list-item span").innerText === taskInput.value
    ).length > 0;
  
    if (!taskExists) {
      const listItem = createListItem(taskInput.value);
      taskList.appendChild(listItem);
    } else {
      alert("Esta tarefa já existe na lista.");
    }
  
    taskInput.value = "";
  }
  