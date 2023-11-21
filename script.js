function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value === "") {
        alert("Por favor, insira uma tarefa.");
        return;
    }

    const createListItem = (text) => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        const editButton = createButton("Editar", () => editTask(span), " btn btn-secondary mr-2");
        const deleteButton = createButton("Excluir", () => deleteTask(li), "btn btn-danger");
        

        span.appendChild(document.createTextNode(text));
        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        return li;
    };

    const createButton = (label, onClick, classes) => {
        const button = document.createElement("button");
        button.appendChild(document.createTextNode(label));
        button.onclick = onClick;
        
        // Adiciona classes diretamente ao botão
        button.className = classes;

        return button;
    };

    const editTask = (span) => {
        const newTask = prompt("Editar tarefa:", span.innerText);
        if (newTask !== null && newTask !== "") {
            span.innerText = newTask;
        }
    };

    const deleteTask = (li) => {
        li.remove();
    };

    // Converte a lista de tarefas em um array usando spread operator
    const taskArray = [...taskList.children];

    // Verifica se a tarefa já existe na lista usando a função de filtro
    const taskExists = taskArray.filter(
        (item) => item.firstChild.innerText === taskInput.value
    ).length > 0;

    if (!taskExists) {
        taskList.appendChild(createListItem(taskInput.value));
    } else {
        alert("Esta tarefa já existe na lista.");
    }

    taskInput.value = "";
}
