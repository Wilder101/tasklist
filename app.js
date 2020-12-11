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

    // Remove task event
    taskList.addEventListener("click", removeTask);

    // Clear tasks event
    clearBtn.addEventListener("click", clearTasks);

    // Filter tasks event
    filter.addEventListener("keyup", filterTasks);
}

// Add Task 
function addTask(e) {

    // Check for blank entries
    if(taskInput.value === "") {
        alert("Add a task");

    // An entry has been made
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

    // Prevent default behavior of page reloading
    e.preventDefault();
}

// Remove Task
function removeTask(e) {

    // Check for icon clicked
    if(e.target.parentElement.classList.contains("delete-item")) {

        // Remove parent's (a tag) parent (li tag)
        e.target.parentElement.parentElement.remove();
    }
}

// Clear Tasks
function clearTasks() {

    // Either set taskList.innerHTML to blank or loop and removeChild (better performance)
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

}

// Filter Tasks
function filterTasks(e) {

    // Get value of input
    const text = e.target.value.toLowerCase();

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
