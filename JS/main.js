const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

const customAlert = document.getElementById("customAlert");

const editModal = document.getElementById("editModal");
const editInput = document.getElementById("editInput");
const saveEditBtn = document.getElementById("saveEditBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentEditIndex = null;

function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showAlert(msg){
  customAlert.textContent = msg;
  customAlert.classList.add("show");

  setTimeout(()=>{
    customAlert.classList.remove("show");
  },2000);
}

function renderTasks(){
  taskList.innerHTML = "";

  emptyMessage.style.display = tasks.length ? "none" : "block";

  tasks.forEach((task,index)=>{
    const li = document.createElement("li");

    li.className = task.completed ? "task-item completed" : "task-item";

    li.innerHTML = `
      <div>
        <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${index})">
        <span class="task-text">${task.text}</span>
      </div>

      <div class="actions">
        <button class="edit-btn" onclick="editTask(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

taskForm.addEventListener("submit",(e)=>{
  e.preventDefault();

  const value = taskInput.value.trim();

  if(!value){
    showAlert("Please enter task");
    return;
  }

  tasks.push({text:value, completed:false});

  taskInput.value = "";

  saveTasks();
  renderTasks();

  showAlert("Task added");
});

function toggleTask(index){
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index){
  tasks.splice(index,1);
  saveTasks();
  renderTasks();
  showAlert("Task deleted");
}

function editTask(index){
  currentEditIndex = index;
  editInput.value = tasks[index].text;
  editModal.style.display = "flex";
}

saveEditBtn.onclick = ()=>{
  const value = editInput.value.trim();

  if(!value){
    showAlert("Cannot be empty");
    return;
  }

  tasks[currentEditIndex].text = value;

  saveTasks();
  renderTasks();

  editModal.style.display = "none";

  showAlert("Updated");
}

cancelEditBtn.onclick = ()=>{
  editModal.style.display = "none";
}

renderTasks();