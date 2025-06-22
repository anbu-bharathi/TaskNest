// tabs
function showTab(tab) {
  const addTab = document.getElementById("add-tab");
  const viewTab = document.getElementById("view-tab");
  const buttons = document.querySelectorAll(".tab-button");

  if (tab === 'add') {
    addTab.classList.add("active");
    viewTab.classList.remove("active");
  } else {
    addTab.classList.remove("active");
    viewTab.classList.add("active");
    displayTasks(); 
  }

  buttons.forEach(btn => btn.classList.remove("active"));
  document.querySelector(`[onclick="showTab('${tab}')"]`).classList.add("active");
}


// add task
const form = document.getElementById("taskForm");
const message = document.getElementById("message");
const taskList = document.getElementById("taskList");


const taskNameInput = document.getElementById("taskName");
const taskDescInput = document.getElementById("taskDesc");
const dueDateInput = document.getElementById("dueDate");
const priorityInput = document.getElementById("priority");
const teamMemberInput = document.getElementById("teamMember");


const taskNameError = document.getElementById("taskNameError");
const taskDescError = document.getElementById("taskDescError");
const dueDateError = document.getElementById("dueDateError");
const priorityError = document.getElementById("priorityError");
const teamMemberError = document.getElementById("teamMemberError");

// view task

let tasks = [];

const today = new Date().toISOString().split("T")[0];
dueDateInput.setAttribute("min", today);


function validateTaskName() {
  const value = taskNameInput.value.trim();
  if (!value) {
    taskNameError.textContent = "Task name is required.";
    return false;
  } else if (value.length > 25) {
    taskNameError.textContent = "Max 25 characters allowed.";
    return false;
  }
  taskNameError.textContent = "";
  return true;
}

function validateTaskDesc() {
  const value = taskDescInput.value.trim();
  if (!value) {
    taskDescError.textContent = "Description is required.";
    return false;
  } else if (value.length > 100) {
    taskDescError.textContent = "Max 100 characters allowed.";
    return false;
  }
  taskDescError.textContent = "";
  return true;
}

function validateDueDate() {
  const value = dueDateInput.value;
  if (!value) {
    dueDateError.textContent = "Due date is required.";
    return false;
  }
  dueDateError.textContent = "";
  return true;
}

function validatePriority() {
  const value = priorityInput.value;
  if (!value) {
    priorityError.textContent = "Select a priority.";
    return false;
  }
  priorityError.textContent = "";
  return true;
}

function validateTeamMember() {
  const value = teamMemberInput.value.trim();
  if (!value) {
    teamMemberError.textContent = "Add at least one member.";
    return false;
  }
  teamMemberError.textContent = "";
  return true;
}


taskNameInput.addEventListener("input", validateTaskName);
taskDescInput.addEventListener("input", validateTaskDesc);
dueDateInput.addEventListener("change", validateDueDate);
priorityInput.addEventListener("change", validatePriority);
teamMemberInput.addEventListener("input", validateTeamMember);


form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isValid =
    validateTaskName() &&
    validateTaskDesc() &&
    validateDueDate() &&
    validatePriority() &&
    validateTeamMember();

  if (isValid) {
    const newTask = {
      name: taskNameInput.value.trim(),
      desc: taskDescInput.value.trim(),
      due: dueDateInput.value,
      prior: priorityInput.value,
      teamMem: teamMemberInput.value.trim()
    };

    tasks.push(newTask);
    form.reset();
    
    message.textContent = "✅ Task created successfully!";
    message.style.color = "darkgreen";

    
  } else {
    message.textContent = "❌ Please correct the above errors.";
    message.style.color = "#f80404";
    document.querySelectorAll(".form-error").forEach(error => {
    error.textContent = "";
    });
  }
});


function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    const row = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 6;
    td.textContent = "🚫 No tasks created yet.";
    td.style.textAlign = "center";
    td.style.color = "darkred";
    td.style.fontWeight = "bold";
    row.appendChild(td);
    taskList.appendChild(row);
    return;
  }

  tasks.forEach((task, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><input value="${task.name}" readonly /></td>
      <td><input value="${task.desc}" readonly /></td>
      <td><input type="date" value="${task.due}" disabled /></td>
      <td>
        <select disabled>
          <option ${task.prior === "High" ? "selected" : ""}>High</option>
          <option ${task.prior === "Medium" ? "selected" : ""}>Medium</option>
          <option ${task.prior === "Low" ? "selected" : ""}>Low</option>
        </select>
      </td>
      <td><input value="${task.teamMem}" readonly /></td>
      <td>
        <button title="Edit Task" onclick="toggleEditMode(this, ${index})">📝</button>
        <button title="Cancel Edit" class="cancel-btn" onclick="cancelEdit(this, ${index})">❎</button>
        <button title="Delete Task" onclick="deleteTask(${index})">🗑️</button>
      </td>
    `;

    taskList.appendChild(row);
  });
}


function toggleEditMode(btn, index) {
  const row = btn.closest("tr");
  const inputs = row.querySelectorAll("input, select");
  const cancelBtn = row.querySelector(".cancel-btn");
  const isEditing = btn.textContent === "💾";

  if (isEditing) {
    const [name, desc, due, prior, team] = inputs;
    if (new Date(due.value) < new Date().setHours(0, 0, 0, 0)) {
      alert("Due date must be in the future.");
      return;
    }

    tasks[index] = {
      name: name.value,
      desc: desc.value,
      due: due.value,
      prior: prior.value,
      teamMem: team.value
    };

    btn.textContent = "📝";
    cancelBtn.style.display = "none";
    row.classList.remove("editing");
    inputs.forEach(i => {
      i.readOnly = true;
      i.disabled = true;
    });
  } else {
    btn.textContent = "💾";
    cancelBtn.style.display = "inline";
    row.classList.add("editing");
    inputs.forEach(input => {
      input.dataset.original = input.value;
      input.readOnly = false;
      input.disabled = false;
    });
  }
}

function cancelEdit(btn) {
  const row = btn.closest("tr");
  const inputs = row.querySelectorAll("input, select");
  const editBtn = row.querySelector("button");
  inputs.forEach(input => {
    input.value = input.dataset.original;
    input.readOnly = true;
    input.disabled = true;
  });
  btn.style.display = "none";
  editBtn.textContent = "📝";
  row.classList.remove("editing");
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    displayTasks();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("dueDate").min = today;
});
