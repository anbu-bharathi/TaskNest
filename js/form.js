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

let currentSortType = "";
let sortAscending = true;

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
    desc: "Design and build the homepage layout, add responsive navbar, and apply smooth animations.",
    due: "2025-06-26",
    prior: "Low",
    teamMem: "Anbu"
  },
  {
    name: "Fix Contact Page",
    desc: "Fix form bug, add validations, improve layout, and test user input handling across devices.",
    due: "2025-07-01",
    prior: "Medium",
    teamMem: "Bharathi"
  },
  {
    name: "Develop Login Module",
    desc: "Implement user authentication, password reset, and session management using JWT.",
    due: "2025-06-27",
    prior: "High",
    teamMem: "Kavin"
  },
  {
    name: "Test Mobile Responsiveness",
    desc: "Perform cross-device testing and fix layout issues on tablets and mobile phones.",
    due: "2025-07-11",
    prior: "Medium",
    teamMem: "Priya"
  }
];



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
    message.style.color = "red";
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
  displayDueTomorrowTasks(); 
  form.reset();
  message.textContent = "✅ Task added successfully!";
  message.style.color = "darkgreen";
  setTimeout(() => (message.textContent = ""), 3000);
  [taskNameError, taskDescError, dueDateError, priorityError, teamMemberError].forEach(el => el.textContent = "");
});

function renderTasks() {
  let html = `
    <div id="sort-controls" style="text-align: right; margin-bottom: 10px;">
      <label for="sortType">Sort by: </label>
      <select id="sortType">
        <option value="">-- Select --</option>
        <option value="priority" ${currentSortType === "priority" ? "selected" : ""}>Priority</option>
        <option value="dueDate" ${currentSortType === "dueDate" ? "selected" : ""}>Due Date</option>
      </select>
      <button id="sortOrderBtn">${sortAscending ? "⬆️ Asc" : "⬇️ Desc"}</button>
    </div>
  `;

  if (tasks.length === 0) {
    html += `<p>No tasks available.</p>`;
  } else {
    html += `
      <table class="task-table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Team Member</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
    `;

    tasks.forEach((task, index) => {
      html += `
        <tr>
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
        </tr>
      `;
    });

    html += `
        </tbody>
      </table>
    `;
  }

  taskList.innerHTML = html;

  const sortTypeSelect = document.getElementById("sortType");
  const sortOrderBtn = document.getElementById("sortOrderBtn");

  if (sortTypeSelect) {
    sortTypeSelect.addEventListener("change", handleSortChange);
  }

  if (sortOrderBtn) {
    sortOrderBtn.addEventListener("click", toggleSortOrder);
  }
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

    row.querySelectorAll("textarea").forEach(t => {
      t.style.height = "auto";
      t.style.height = t.scrollHeight + "px";
      t.addEventListener("input", () => {
        t.style.height = "auto";
        t.style.height = t.scrollHeight + "px";
      });
    });

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

  if (!taskName || !taskDesc || !dueDate || !priority || !teamMember) {
    showMsg("❌ Please fill in all fields before saving", "error");
    return;
  }

  tasks[index] = { name: taskName,
                   desc: taskDesc, 
                   due: dueDate, 
                   prior: priority, 
                   teamMem: teamMember 
                  };

  row.classList.remove("editing");
  row.querySelectorAll("textarea, input, select").forEach(el => el.disabled = true);

  const actionCell = row.querySelector("td:last-child");
  actionCell.innerHTML = `
    <button onclick="toggleEditMode(this)" title="Edit Task">✏️</button>
    <button onclick="deleteTask(${index})" title="Delete Task">🗑️</button>
  `;

  row.classList.add("saved-row");
  setTimeout(() => row.classList.remove("saved-row"), 1000);
  displayDueTomorrowTasks();
  showMsg("✅ Task saved successfully!", "success");
}

function cancelEdit(btn) {
  renderTasks();
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    renderTasks();
    dueTomorrowTasks();
  }
}

function handleSortChange() {
  const sortTypeSelect = document.getElementById("sortType");
  currentSortType = sortTypeSelect.value;
  sortTasks();
}

function toggleSortOrder() {
  sortAscending = !sortAscending;
  const btn = document.getElementById("sortOrderBtn");
  btn.textContent = sortAscending ? "⬆️ Asc" : "⬇️ Desc";
  sortTasks();
}

function sortTasks() {
  if (currentSortType === "priority") {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    tasks.sort((a, b) => {
      const result = priorityOrder[a.prior] - priorityOrder[b.prior];
      return sortAscending ? result : -result;
    });
  } else if (currentSortType === "dueDate") {
    tasks.sort((a, b) => {
      const result = new Date(a.due) - new Date(b.due);
      return sortAscending ? result : -result;
    });
  }
  renderTasks();
}

window.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];
  dueDateInput.min = today;

  displayDueTomorrowTasks();
  document.addEventListener("change", function (e) {
    if (e.target && e.target.id === "sortType") {
      handleSortChange();
    }
  });

  document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "sortOrderBtn") {
      toggleSortOrder();
    }
  });
});

function showMsg(message, type = "success") {
  const msg = document.getElementById("msg");
  msg.textContent = message;
  msg.className = `show ${type}`;
  setTimeout(() => {
    msg.className = msg.className.replace("show", "");
  }, 2500);
}


function displayDueTomorrowTasks() {
  const banner = document.getElementById("dueTasksBanner");
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const dueTomorrowTasks = tasks.filter(task => task.due === tomorrowStr);

 
  const latestDue = tasks.reduce((latest, task) => {
    return new Date(task.due) > new Date(latest) ? task.due : latest;
  }, tasks[0]?.due || tomorrowStr); 

  if (dueTomorrowTasks.length === 0) {
    banner.textContent = "🎉 No tasks due tomorrow!";
  } else if (latestDue === tomorrowStr) {
    banner.textContent = "⚠️ Tomorrow is the last due date. Complete your pending tasks!";
  } else {
    const taskNames = dueTomorrowTasks.map(t => t.name).join(" | ");
    banner.textContent = `⏰ Tasks due tomorrow: ${taskNames}`;
  }
}



