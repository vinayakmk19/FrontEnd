let tasks = [];
const taskList = document.getElementById('items-container');
const addTaskInput = document.getElementById('add');
const addTaskInputclick = document.getElementById('add-task-btn');
const tasksCounter = document.getElementById('tasks-counter');

// Function to add task to the DOM Element

function addTaskToDOM(task) {
    
    const li = document.createElement('div');
    li.className += 'list-item';


    li.innerHTML = `
        
        <label for = "${task.id}">${task.text}</label>
        
        <div class="icons">
        <input type = "checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class = "custom-checkbox">
        <img src="download.png" class="delete" data-id="${task.id}" /> 
        </div>
    `;

    taskList.append(li);

}

// Rendering the list of items added to the array

function renderList () {
    
    taskList.innerHTML = '';

    for(let i=0; i < tasks.length; i++){
        addTaskToDOM(tasks[i]);
    }

    tasksCounter.innerHTML = tasks.length;
}

// Showing Task completed or not

function toggleTask (taskId) {
    
    const task = tasks.filter(function(task) {
        return task.id === taskId
    });

    if( task.length > 0 ){
        const currentTask = task[0];

        currentTask.done = !currentTask.done;
        renderList();
        showNotification('Taks Completed successfully!!');
        return;
    }

    showNotification('Could not toggle the task');

}

// Deleting Task by ID

function deleteTask (taskId) {
    
    const newTasks = tasks.filter(function(task){
       return task.id !== taskId
    });

    tasks = newTasks;
    renderList();
    showNotification('Task deleted Successfully!!.');
}

// Adding task in the list 

function addTask (task) {
    
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task added successfully!!.');
        return;
    }

    showNotification('Task cannot be added.');
}

function showNotification(text) {
    alert(text);
}

// Events click and keyuplike taking inputs from the keyboard

function handleInputKeypress(e) {
    
    if(e.key === 'Enter'){
        const text = e.target.value;

        if(!text){
            showNotification('task text cannot be empty');
            return;
        }
    
        const task = {
            text,
            id: Date.now().toString(),
            done : false
        }

        e.target.value = '';
        addTask(task);
    }
    else if(e.type == "click"){
        const text = addTaskInput.value;

        if(!text){
            showNotification('task text cannot be empty');
            return;
        }
    
        const task = {
            text,
            id: Date.now().toString(),
            done : false
        }
        console.log(task);

        addTaskInput.value = '';
        addTask(task);     
    } 
}

function handleClickListener(e){
    var target = e.target;

    if (target.className === 'delete'){
        const taskid = target.dataset.id;
        deleteTask(taskid);
        return;
    }else if(target.className === 'custom-checkbox'){
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
}


function initializeApp(){
    addTaskInput.addEventListener('keyup', handleInputKeypress);
    addTaskInputclick.addEventListener('click', handleInputKeypress);
    document.addEventListener('click', handleClickListener);
}

initializeApp();
