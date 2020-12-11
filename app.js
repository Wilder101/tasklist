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
    // Add task event
    form.addEventListener("submit", addTask);
}

// Add Task
function addTask(e) {

    // Check for blank entries
    if(taskInput.value === "") {
        alert("Add a task");

    // If an entry has been made
    } else {
        
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
    }

    // Clear the input
    taskInput.value = "";

    e.preventDefault();
}