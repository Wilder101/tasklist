// Define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Call load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    
    // DOM load event
    document.addEventListener("DOMContentLoaded", getTasks);

    // Add task event
    form.addEventListener("submit", addTask);

    // Remove task event
    taskList.addEventListener("click", removeTask);

    // Clear tasks event
    clearBtn.addEventListener("click", clearTasks);

    // Filter tasks event
    filter.addEventListener("keyup", filterTasks);
}

// Get Tasks from Local Storage
function getTasks() {

    // Local variable
    let tasks;

    // Check Local Storage for any stored tasks
    if(localStorage.getItem("tasks") === null) {

        // Set to empty array
        tasks = [];

    // Capture existing entries in Local Storage
    } else {

        // Parse Local Storage entry from a string to an array
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task) {

        // Create li element
        const li = document.createElement("li");
        
        // Add a good looking Materialize class name
        li.className = "collection-item"

        // Create next node and append to the li
        li.appendChild(document.createTextNode(task));

        // Create new link to delete element
        const link = document.createElement("a");

        // Add Materialize class names
        link.className = "delete-item secondary-content";

        // Add icon html
        link.innerHTML = "<i class='fa fa-remove'></i>";

        // Append the link to the li
        li.appendChild(link);

        // Append the li to the ul
        taskList.appendChild(li);
    });
}

// Add Task 
function addTask(e) {

    // Check for blank entries
    if(taskInput.value === "") {
        alert("Add a task");

    // An entry has been made
    } 
    // else {
    // ASSUME AN ENTRY HAS BEEN MADE
        
        // Create li element
        const li = document.createElement("li");
        
        // Add a good looking Materialize class name
        li.className = "collection-item"

        // Create next node and append to the li
        li.appendChild(document.createTextNode(taskInput.value));

        // Create new link to delete element
        const link = document.createElement("a");

        // Add Materialize class names
        link.className = "delete-item secondary-content";

        // Add icon html
        link.innerHTML = "<i class='fa fa-remove'></i>";

        // Append the link to the li
        li.appendChild(link);

        // Append the li to the ul
        taskList.appendChild(li);

        // Store in Local Storage
        storeTaskInLocalStorage(taskInput.value);
    // }

    // Clear the input
    taskInput.value = "";

    // Prevent default behavior of page reloading
    e.preventDefault();
}

// Store in Local Storage
function storeTaskInLocalStorage(task) {

    // Local variable
    let tasks;

    // Check Local Storage for any stored tasks
    if(localStorage.getItem("tasks") === null) {

        // Set to empty array
        tasks = [];

    // Capture existing entries in Local Storage
    } else {

        // Parse Local Storage entry from a string to an array
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    // Add given task to local variable
    tasks.push(task);
    
    // Set Local Storage from local variable to a string representing an array
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {

    // Check for icon clicked
    if(e.target.parentElement.classList.contains("delete-item")) {

        // Remove parent's (a tag) parent (li tag)
        e.target.parentElement.parentElement.remove();

        // Remove from Local Storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {

    // Local variable
    let tasks;

    // Check Local Storage for any stored tasks
    if(localStorage.getItem("tasks") === null) {

        // Set to empty array
        tasks = [];

    // Capture existing entries in Local Storage
    } else {

        // Parse Local Storage entry from a string to an array
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    // Loop through
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    // Set Local Storage with updated tasks
    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// Clear Tasks
function clearTasks() {

    // Either set taskList.innerHTML to blank or loop and removeChild (for better performance)
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear the input
    filter.value = "";

    // Clear from Local Storage
    clearTasksFromLocalStorage();
}

// Clear from Local Storage
function clearTasksFromLocalStorage() {

    // Clear it
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {

    // Get value of input
    const text = e.target.value.toLowerCase();

    // Loop through all tasks to find a match
    document.querySelectorAll(".collection-item").forEach(function(task){

        // Assign temp variable to given text
        const item = task.firstChild.textContent;

        // Check for match
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";

        // There is no match
        }  else {
            task.style.display = "none";
        }
    });
}
