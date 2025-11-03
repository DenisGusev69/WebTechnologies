console.log("ToDo List loaded");

const addButton = document.getElementById("add");
const changeButton = document.getElementById("change");
const removeButton = document.getElementById("remove");
const taskInput = document.getElementById("task");
const categorySelect = document.getElementById("category");
const prioritySelect = document.getElementById("priority");
const myTaskDiv = document.getElementById("my_task");

myTaskDiv.innerHTML = "";

let tasks = [];
let currentEditId = null;
let sortBy = 'date';

changeButton.style.display = "none";

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
/*
    if (taskText.length < 3) {
        console.log("Задача должна содержать минимум 3 символа");
        taskInput.classList.add("invalid");
        //myTaskDiv.innerHTML += "<p class='error'>Задача должна содержать минимум 3 символа</p>";
        return;
    } else {
        taskInput.classList.remove("invalid");
    }
*/
    if (currentEditId !== null) {
        const taskIndex = tasks.findIndex(task => task.id == currentEditId);
        if (taskIndex !== -1) {
            tasks[taskIndex].text = taskText;
            tasks[taskIndex].category = categoryValue;
            tasks[taskIndex].priority = priorityValue;
            currentEditId = null;
            addButton.textContent = "Добавить";
        }
    } else {
        const task = {
            id: Date.now(),
            text: taskText,
            category: categoryValue,
            priority: priorityValue,
            completed: false,
            createdAt: new Date()
        };

        tasks.push(task);
    }

    renderTasks();
    taskInput.value = "";
});

changeButton.addEventListener("click", () => {
    console.log("Режим редактирования");
    if (sortBy == 'date') {
        sortBy = 'category';
        changeButton.textContent = 'Сортировка: По месту';
    } else if (sortBy == 'category') {
        sortBy = 'priority';
        changeButton.textContent = 'Сортировка: По важности';
    } else {
        sortBy = 'date';
        changeButton.textContent = 'Сортировка: По дате';
    }
    renderTasks();
});
/*
removeButton.addEventListener("click", () => {
    console.log("Удаление задач");
});
*/
function getCategoryText(categoryValue) {
    switch (categoryValue) {
        case "Home":
            return "Дом";
        case "Study":
            return "Университет";
        case "Work":
            return "Работа";
        case "Other":
            return "Другое";
        default:
            return categoryValue;
    }
}

function getPriorityText(priorityValue) {
    switch (priorityValue) {
        case "Low":
            return "Низкий";
        case "Middle":
            return "Средний";
        case "High":
            return "Высокий";
        default:
            return priorityValue;
    }
}

function renderTasks() {
    myTaskDiv.innerHTML = "";

    if (tasks.length > 1) {
        changeButton.style.display = 'block';
    } else {
        changeButton.style.display = 'none';
        sortBy = 'date';
        changeButton.textContent = 'Сортировка: По дате';
    }
    /*
    if (tasks.length == 0) {
        myTaskDiv.innerHTML = '<p class="no-tasks">Задачи отсутствуют</p>';
        return;
    }
    */
    const sortedTasks = sortTasks(tasks);

    sortedTasks.forEach((task) => {
        const categoryText = getCategoryText(task.category);
        const priorityText = getPriorityText(task.priority);
        const dateText = formatDateTime(task.createdAt);

        const taskHTML = `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <div class="task-content">
                    <div class="task-text">${task.text}</div>
                    <div class="task-info">
                        <span class="task-date">${dateText}</span>
                        <span class="task-category category-${task.category}">${categoryText}</span>
                        <span class="task-priority priority-${task.priority}">${priorityText}</span>
                        ${task.completed ? '<span class="task-status">Выполнено</span>' : ''}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="complete-btn">${task.completed ? 'Возобновить' : 'Завершить'}</button>
                    <button class="edit-btn">Изменить</button>
                    <button class="delete-btn">Удалить</button>
                </div>
            </div>
        `;

        myTaskDiv.innerHTML += taskHTML;
    });

    document.querySelectorAll('.complete-btn').forEach(btn => {
        btn.addEventListener('click', CompleteTask);
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', EditTask);
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', DeleteTask);
    });
}

function sortTasks(tasks) {
    switch (sortBy) {
        case 'date':
            return [...tasks].sort((a, b) => b.createdAt - a.createdAt);
        case 'category':
            return [...tasks].sort((a, b) => {
                const categoryOrder = { 'Home': 1, 'Study': 2, 'Work': 3, 'Other': 4 };
                return categoryOrder[a.category] - categoryOrder[b.category];
            });
        case 'priority':
            return [...tasks].sort((a, b) => {
                const priorityOrder = { 'High': 1, 'Middle': 2, 'Low': 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            });
        default:
            return tasks;
    }
}

function CompleteTask(e) {
    const taskItem = e.target.closest('.task-item');
    const taskId = parseInt(taskItem.dataset.id);
    const taskIndex = tasks.findIndex(task => task.id == taskId);

    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        renderTasks();
    }
}

function EditTask(e) {
    const taskItem = e.target.closest('.task-item');
    const taskId = parseInt(taskItem.dataset.id);
    const taskIndex = tasks.findIndex(task => task.id == taskId);

    if (taskIndex !== -1) {
        const newText = prompt("Введите новый текст задачи:", tasks[taskIndex].text);

        if (newText && newText.trim() !== "") {
            if (newText.trim().length < 3) {
                alert("Задача должна содержать минимум 3 символа");
                return;
            }

            tasks[taskIndex].text = newText.trim();
            renderTasks();
        }
    }
}

function DeleteTask(e) {
    const taskItem = e.target.closest('.task-item');
    const taskId = parseInt(taskItem.dataset.id);
    const taskIndex = tasks.findIndex(task => task.id == taskId);

    if (taskIndex !== -1) {

        tasks.splice(taskIndex, 1);
        renderTasks();

    }
}


function formatDateTime(date) {
    const taskDate = new Date(date);
    const dateString = taskDate.toLocaleDateString('ru-RU');
    const timeString = taskDate.toLocaleTimeString('ru-RU'); 
    return `${dateString} ${timeString}`; 
}
