// Toggle tabs
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
    renderTasks();
  }

  buttons.forEach(btn => btn.classList.remove("active"));
  document.querySelector(`[onclick="showTab('${tab}')"]`).classList.add("active");
}

// Task data
let tasks = [
  {
    name: "Create a Home Page",
    desc: "Add navbar and animation",
    due: "2025-06-25",
    prior: "High",
    teamMem: "Anbu"
  },
  {
    name: "Create a Feature Page",
    desc: "Add navbar and animation",
    due: "2025-06-26",
    prior: "Medium",
    teamMem: "Bharathi"
  }
];

// Get form elements
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

// Real-time validation listeners
taskNameInput.addEventListener("input", validateTaskName);
taskDescInput.addEventListener("input", validateTaskDesc);
dueDateInput.addEventListener("change", validateDueDate);
priorityInput.addEventListener("change", validatePriority);
teamMemberInput.addEventListener("input", validateTeamMember);

// Form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isValid =
    validateTaskName() &&
    validateTaskDesc() &&
    validateDueDate() &&
    validatePriority() &&
    validateTeamMember();

  if (!isValid) {
    message.textContent = "❌ Please correct the above errors.";
    message.style.color = "#ffbbbb";
    return;
  }

  const task = {
    name: taskNameInput.value.trim(),
    desc: taskDescInput.value.trim(),
    due: dueDateInput.value,
    prior: priorityInput.value,
    teamMem: teamMemberInput.value.trim()
  };

  tasks.push(task);
  renderTasks();
  form.reset();
  message.textContent = "✅ Task added successfully!";
  message.style.color = "lightgreen";
  setTimeout(() => (message.textContent = ""), 3000);
  [taskNameError, taskDescError, dueDateError, priorityError, teamMemberError].forEach(el => el.textContent = "");
});

// Render task list
function renderTasks() {
  taskList.innerHTML = "";

  // Create and add sort dropdown
  const sortControls = document.createElement("div");
  sortControls.id = "sort-controls";
  sortControls.style.textAlign = "right";
  sortControls.style.marginBottom = "10px";
  sortControls.innerHTML = `
    <label for="sortSelect">Sort by: </label>
    <select id="sortSelect" onchange="handleSort(this.value)">
      <option value="">-- Select --</option>
      <option value="priority">Priority</option>
      <option value="dueDate">Due Date</option>
    </select>
  `;
  taskList.appendChild(sortControls);

  // ✅ Check for no tasks AFTER appending dropdown
  if (tasks.length === 0) {
    const noTaskMsg = document.createElement("p");
    noTaskMsg.textContent = "No tasks available.";
    taskList.appendChild(noTaskMsg);
    return;
  }

  const table = document.createElement("table");
  table.className = "task-table";

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>Task Name</th>
      <th>Description</th>
      <th>Due Date</th>
      <th>Priority</th>
      <th>Team Member</th>
      <th>Actions</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  tasks.forEach((task, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><textarea disabled maxlength="50">${task.name}</textarea></td>
      <td><textarea disabled maxlength="200">${task.desc}</textarea></td>
      <td><input type="date" value="${task.due}" disabled></td>
      <td>
        <select disabled>
          <option value="High" ${task.prior === "High" ? "selected" : ""}>High</option>
          <option value="Medium" ${task.prior === "Medium" ? "selected" : ""}>Medium</option>
          <option value="Low" ${task.prior === "Low" ? "selected" : ""}>Low</option>
        </select>
      </td>
      <td><input type="text" value="${task.teamMem}" disabled></td>
      <td>
        <button onclick="toggleEditMode(this)" title="Edit Task">✏️</button>
        <button onclick="deleteTask(${index})" title="Delete Task">🗑️</button>
      </td>
    `;

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  taskList.innerHTML = ""; // clear before appending
  taskList.appendChild(table);
}


// Edit task
function toggleEditMode(btn) {
  const row = btn.closest("tr");
  const isEditing = row.classList.contains("editing");

  document.querySelectorAll("tr.editing").forEach(r => {
    r.classList.remove("editing");
    r.querySelectorAll("textarea, input, select").forEach(el => el.disabled = true);
    const actionCell = r.querySelector("td:last-child");
    const index = [...r.parentNode.children].indexOf(r);
    actionCell.innerHTML = `
      <button onclick="toggleEditMode(this)" title="Edit Task">✏️</button>
      <button onclick="deleteTask(${index})" title="Delete Task">🗑️</button>
    `;
  });

  if (!isEditing) {
    row.classList.add("editing");
    const today = new Date().toISOString().split("T")[0];
    row.querySelector("input[type='date']").setAttribute("min", today);
    row.querySelectorAll("textarea, input, select").forEach(el => el.disabled = false);

    // Auto-resize textareas
    row.querySelectorAll("textarea").forEach(t => {
      t.style.height = "auto";
      t.style.height = t.scrollHeight + "px";
      t.addEventListener("input", () => {
        t.style.height = "auto";
        t.style.height = t.scrollHeight + "px";
      });
    });

    // ✅ FIX: Define actionCell before modifying it
    const actionCell = row.querySelector("td:last-child");

    actionCell.innerHTML = `
      <button onclick="saveTask(this)" title="Save Task">💾</button>
      <button onclick="cancelEdit(this)" title="Cancel">❌</button>
    `;
  }
}



// Save edited task
function saveTask(btn) {
  const row = btn.closest("tr");
  const index = [...row.parentNode.children].indexOf(row);

  const taskName = row.querySelector("td:nth-child(1) textarea").value.trim();
  const taskDesc = row.querySelector("td:nth-child(2) textarea").value.trim();
  const dueDate = row.querySelector("td:nth-child(3) input[type='date']").value;
  const priority = row.querySelector("td:nth-child(4) select").value;
  const teamMember = row.querySelector("td:nth-child(5) input[type='text']").value.trim();

  // ✅ Validation
  if (!taskName || !taskDesc || !dueDate || !priority || !teamMember) {
    showToast("❌ Please fill in all fields before saving", "error");
    return;
  }

  // ✅ Save updated task
  tasks[index] = { name: taskName, desc: taskDesc, due: dueDate, prior: priority, teamMem: teamMember };

  // ✅ Exit edit mode and disable fields
  row.classList.remove("editing");
  row.querySelectorAll("textarea, input, select").forEach(el => el.disabled = true);

  // ✅ Replace action buttons
  const actionCell = row.querySelector("td:last-child");
  actionCell.innerHTML = `
    <button onclick="toggleEditMode(this)" title="Edit Task">✏️</button>
    <button onclick="deleteTask(${index})" title="Delete Task">🗑️</button>
  `;

  // ✅ Highlight row briefly
  row.classList.add("saved-row");
  setTimeout(() => row.classList.remove("saved-row"), 1000);

  // ✅ Show toast message
  showToast("✅ Task saved successfully!", "success");
}


// Cancel editing
function cancelEdit(btn) {
  renderTasks();
}

// Delete task
function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

function handleSort(type) {
  if (type === "priority") {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    tasks.sort((a, b) => priorityOrder[a.prior] - priorityOrder[b.prior]);
  } else if (type === "dueDate") {
    tasks.sort((a, b) => new Date(a.due) - new Date(b.due));
  }
  renderTasks();
}


// Restrict past dates
window.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];
  dueDateInput.min = today;
});


function showToast(message, type = "success") {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.className = `show ${type}`;
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 2500);
}

