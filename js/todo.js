document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addButton = document.getElementById("addButton");
    const deleteButton = document.getElementById("deleteButton");
    const taskList = document.getElementById("taskList");
    const taskTotal = document.getElementById("taskTotal");

    // Mettre le curseur dans le champ taskInput à l'ouverture
	
    taskInput.focus();

    // Fonction pour mettre à jour l'état du bouton "Ajout"
	
	
    function updateAddButton() {
        addButton.disabled = taskInput.value.trim() === "";
    }

    // Fonction pour mettre à jour l'état du bouton "Suppression"
    function updateDeleteButton() {
        const checkedTasks = taskList.querySelectorAll("input[type='checkbox']:checked");
        deleteButton.disabled = checkedTasks.length === 0;
    }

    // Ajouter une tâche
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", updateDeleteButton);

        const span = document.createElement("span");
        span.textContent = taskText;
        span.addEventListener("click", function() {
            span.classList.toggle("strike-task");
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        taskList.appendChild(li);

        taskInput.value = "";
        updateAddButton();
        updateTaskTotal();
    }

    // Supprimer les tâches sélectionnées
    function deleteTasks() {
        const checkedTasks = taskList.querySelectorAll("input[type='checkbox']:checked");
        checkedTasks.forEach(task => task.parentElement.remove());
        updateDeleteButton();
        updateTaskTotal();
    }

    // Mettre à jour le nombre total de tâches
	
    function updateTaskTotal() {
        taskTotal.textContent = `(${taskList.childElementCount})`;
    }

    // Événements
	
    taskInput.addEventListener("input", updateAddButton);
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    addButton.addEventListener("click", addTask);
    deleteButton.addEventListener("click", deleteTasks);

    // Initialiser l'état des boutons
    updateAddButton();
    updateDeleteButton();
    updateTaskTotal();
});
