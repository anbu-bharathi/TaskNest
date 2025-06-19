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
    displayTasks(); // always refresh when viewing
  }

  buttons.forEach(btn => btn.classList.remove("active"));
  document.querySelector(`[onclick="showTab('${tab}')"]`).classList.add("active");
}


const form = document.getElementById("taskForm");
const message = document.getElementById("message");
const taskList = document.getElementById("taskList");

// Input fields
const taskNameInput = document.getElementById("taskName");
const taskDescInput = document.getElementById("taskDesc");
const dueDateInput = document.getElementById("dueDate");
const priorityInput = document.getElementById("priority");
const teamMemberInput = document.getElementById("teamMember");

// Error fields
const taskNameError = document.getElementById("taskNameError");
const taskDescError = document.getElementById("taskDescError");
const dueDateError = document.getElementById("dueDateError");
const priorityError = document.getElementById("priorityError");
const teamMemberError = document.getElementById("teamMemberError");

// Dummy task list
let tasks = [
  {
    name: "Create a Home Page",
    desc: "Add navbar and animation",
    due: "2025-06-19",
    prior: "High",
    teamMem: "Anbu"
  },
  {
    name: "Create a Feature Page",
    desc: "Add navbar and animation",
    due: "2025-06-21",
    prior: "Medium",
    teamMem: "Bharathi"
  }
];

// allow future dates only
const today = new Date().toISOString().split("T")[0];
dueDateInput.setAttribute("min", today);

// Validation functions
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

    tasks.push(newTask); // Add to existing array
    form.reset();
    displayTasks();

    message.textContent = "✅ Task created successfully!";
    message.style.color = "lightgreen";

    [taskNameError, taskDescError, dueDateError, priorityError, teamMemberError].forEach(el => el.textContent = "");
  } else {
    message.textContent = "❌ Please correct the above errors.";
    message.style.color = "#f80404";
  }
});

// Display all tasks
function displayTasks() {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task");
    taskItem.innerHTML = `
      <h3>${task.name}</h3>
      <p><strong>Description:</strong> ${task.desc}</p>
      <p><strong>Due Date:</strong> ${task.due}</p>
      <p><strong>Priority:</strong> ${task.prior}</p>
      <p><strong>Team:</strong> ${task.teamMem}</p>
    `;
    taskList.appendChild(taskItem);
  });
}

