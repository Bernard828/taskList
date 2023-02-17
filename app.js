//DEFINE UI VARS
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//LOAD ALL EVENT LISTENERS
loadEventListeners();

//load all event listenrers
function loadEventListeners() {
    //dom load event
    document.addEventListener('DOMContentLoaded', getTasks)
    //add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask)
    //clear task event
    clearBtn.addEventListener('click', clearTasks);
    //filter tasks event
    filter.addEventListener('keyup', filterTask)
}
//get tasks from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        //create li element
        const li = document.createElement('li');
        //add class
        li.className = 'collection-item';
        //create text node and append child
        li.appendChild(document.createTextNode(task));
        //create new link element
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';
        //add icon html
        link.innerhtml = '<i class="fa fa-remove"></i>';
        //appemd the link to li
        li.appendChild(link);

        //append li to ul
        taskList.appendChild(li);
    })
}

//add task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task')
    }

    //create li element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //create text node and append child
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerhtml = '<i class="fa fa-remove"></i>';
    //appemd the link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);

    //store task in local storage
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';

    e.preventDefault();
}

//store task
function storeTaskInLocalStorage(tasks) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove task
function removeTask(e) {
    if (e.target.parentElement.classLidy.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.remove();

            //remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
        console.log(e.target)
    }
}

//remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log(taskItem);

}

//clear task
function clearTasks() {
    // taskList.innerHTML = "";

    //faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    //clear from LS
    clearTasksFromLocalStorage();
}

//clear from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

//filter tasks
function filterTask(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
    console.log(text);

}