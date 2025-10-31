console.log("ToDo List loaded");

const addButton = document.getElementById("add");
const changeButton = document.getElementById("change");
const removeButton = document.getElementById("remove");
const taskInput = document.getElementById("task");
const categorySelect = document.getElementById("category");
const prioritySelect = document.getElementById("priority");
const myTaskDiv = document.getElementById("my_task");

myTaskDiv.innerHTML = "";

addButton.addEventListener("click", () => {
    let taskText = taskInput.value.trim();
    let categoryValue = categorySelect.value;
    let priorityValue = prioritySelect.value;

    if (taskText == "") {
        console.log("Введите задачу");
        taskInput.classList.add("invalid");
        //myTaskDiv.innerHTML += "<p class='error'>Введите задачу</p>";
        return;
    } else {
        taskInput.classList.remove("invalid");
    }
    
    if (taskText.length < 3) {
        console.log("Задача должна содержать минимум 3 символа");
        taskInput.classList.add("invalid");
        //myTaskDiv.innerHTML += "<p class='error'>Задача должна содержать минимум 3 символа</p>";
        return;
    } else {
        taskInput.classList.remove("invalid");
    }
    
    let categoryText = "";
    switch(categoryValue) {
        case "Home":
            categoryText = "Дом";
            break;
        case "Study":
            categoryText = "Университет";
            break;
        case "Work":
            categoryText = "Работа";
            break;
        case "Other":
            categoryText = "Другое";
            break;
    }
    
    let priorityText = "";
    switch(priorityValue) {
        case "Low":
            priorityText = "Низкий";
            break;
        case "Middle":
            priorityText = "Средний";
            break;
        case "High":
            priorityText = "Высокий";
            break;
    }
    
    const taskHTML = `
        <div class="task-item">
            <div class="task-content">
                <div class="task-text">${taskText}</div>
                <div class="task-info">
                    <span class="task-category category-${categoryValue}">${categoryText}</span>
                    <span class="task-priority priority-${priorityValue}">${priorityText}</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="edit-btn">Изменить</button>
                <button class="delete-btn">Удалить</button>
            </div>
        </div>
    `;

    myTaskDiv.innerHTML += taskHTML;
    taskInput.value = "";

});

changeButton.addEventListener("click", () => {
    console.log("Режим редактирования");
});

removeButton.addEventListener("click", () => {
    console.log("Удаление задач");
});