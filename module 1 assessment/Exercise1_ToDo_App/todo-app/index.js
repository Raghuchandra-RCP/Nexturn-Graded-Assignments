
//Task array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


//Function to add tasks
function addTask(){
    var task = document.getElementById('task').value;
    document.getElementById('task').value = '';
    tasks.unshift({text: task, completed: false});
    displayTasks();
}




//Function to display tasks
function displayTasks(){
    const taskContainer = document.getElementById("taskContainer");
    taskContainer.innerHTML = '';
    tasks.forEach(function(task, index){
        //creating nessesary elements and classes
        const taskElement = document.createElement("div");
        const taskDiv = document.createElement("div");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        const buttonDiv = document.createElement("div");
        taskElement.innerHTML = task.text;
        taskElement.classList.add("task");

        //Strike through if task is completed
        if(task.completed){
            taskElement.classList.add("strike");
        }

        //Edit button
        editButton.innerHTML = "Edit";
        editButton.classList.add("editButton");
        editButton.addEventListener("click", function(){
            editTask(taskElement, index);
        })

        //Delete button
        deleteButton.innerHTML = "Delete";
        deleteButton.classList.add("deleteButton");

        //Function to delete task
        deleteButton.addEventListener("click", function(){
            tasks[index].completed = true;
            displayTasks();
        })

        //Appending elements to the task container
        buttonDiv.appendChild(editButton);
        buttonDiv.appendChild(deleteButton);
        buttonDiv.classList.add("buttonDiv");
        taskDiv.classList.add("taskDiv");
        taskDiv.appendChild(taskElement);
        taskDiv.appendChild(buttonDiv);
        taskContainer.appendChild(taskDiv);
    });
    saveTasks();
    pendingCount();
}


//Function to edit tasks
function editTask(index){
    var task = prompt("Enter new task");
    tasks[index] = task;
    displayTasks();
}



var input = document.getElementById("task");

input.addEventListener("keypress", function(event) {
    if(event.key === "Enter"){
        document.getElementById("addButton").click();
    }
})


//Event listener to display tasks on page load
document.addEventListener("DOMContentLoaded", function(){
    displayTasks();
})

//Function to save tasks to localStorage
function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Function to display pending tasks
function pendingCount(){
    let pendingTasks = tasks.filter(function(task){
        return !task.completed;
    })
    const heading = document.createElement("h3");
    heading.innerHTML = "Pending Tasks: " + pendingTasks.length;
    document.getElementById("pendingTasks").innerHTML = '';
    document.getElementById("pendingTasks").appendChild(heading);
    console.log(pendingTasks.length);
}