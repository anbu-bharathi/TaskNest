window.addEventListener("DOMContentLoaded", () => {
  initTaskManager();
});

function initTaskManager() {
  const form = document.getElementById("taskForm");
  const message = document.getElementById("message");
  const searchInput = document.getElementById("searchInput");

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

  window.sortAscending = true;
  const defaultTasks = [
  {
    name: "Design Login Page",
    desc: "Create a responsive login UI using HTML, CSS, and JavaScript.",
    due: "2025-06-30",
    prior: "High",
    teamMem: "Anbu"
  },
  {
    name: "Setup Database",
    desc: "Initialize MongoDB and create schema for user data.",
    due: "2025-07-02",
    prior: "Medium",
    teamMem: "Sneha"
  },
  {
    name: "Develop API Endpoints",
    desc: "Write RESTful APIs for adding and retrieving tasks.",
    due: "2025-07-04",
    prior: "High",
    teamMem: "Monika"
  },
  {
    name: "Create Dashboard UI",
    desc: "Design task list and analytics components for the dashboard.",
    due: "2025-07-05",
    prior: "Low",
    teamMem: "Kaviya"
  }
];

  window.tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  window.filteredTasks = [...tasks];

  window.toggleEditMode = (btn) => toggleEdit(btn);
  window.saveTask = (btn) => saveTask(btn);
  window.cancelEdit = () => renderTasks();
  window.deleteTask = (index) => deleteTask(index);
  window.exportTasks = () => exportToCSV(filteredTasks);

  window.showTab = function (tab) {
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

  taskNameInput.addEventListener("input", () => validateTaskName(taskNameInput, taskNameError));
  taskDescInput.addEventListener("input", () => validateTaskDesc(taskDescInput, taskDescError));
  dueDateInput.addEventListener("change", () => validateDueDate(dueDateInput, dueDateError));
  priorityInput.addEventListener("change", () => validatePriority(priorityInput, priorityError));
  teamMemberInput.addEventListener("input", () => validateTeamMember(teamMemberInput, teamMemberError));
  // if (searchInput) {
  //   searchInput.addEventListener("input", () => {
  //     const keyword = searchInput.value.toLowerCase();
  //     filteredTasks = tasks.filter(task =>
  //       task.name.toLowerCase().includes(keyword) ||
  //       task.teamMem.toLowerCase().includes(keyword)
  //     );
  //     renderTasks();
  //   });
  // }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const isValid =
      validateTaskName(taskNameInput, taskNameError) &&
      validateTaskDesc(taskDescInput, taskDescError) &&
      validateDueDate(dueDateInput, dueDateError) &&
      validatePriority(priorityInput, priorityError) &&
      validateTeamMember(teamMemberInput, teamMemberError);

    if (!isValid) {
      showMsg("❌ Please correct the above errors.", "error", message);
      return;
    }

    const task = {
      id: Date.now(), 
      name: taskNameInput.value.trim(),
      desc: taskDescInput.value.trim(),
      due: dueDateInput.value,
      prior: priorityInput.value,
      teamMem: teamMemberInput.value.trim()
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    filteredTasks = [...tasks];
    renderTasks();
    displayDueTomorrowTasks();
    form.reset();
    showMsg("✅ Task added successfully!", "success", message);
    [taskNameError, taskDescError, dueDateError, priorityError, teamMemberError].forEach(el => el.textContent = "");
  });

  dueDateInput.min = new Date().toISOString().split("T")[0];
  renderTasks();
  displayDueTomorrowTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  const sortType = document.getElementById("sortType")?.value || "";
  const sortAscending = window.sortAscending;

  let html = `
    <div id="sort-controls" style="text-align: right; margin-bottom: 10px;">
      <label for="sortType">Sort by: </label>
      <select id="sortType">
        <option value="">-- Select --</option>
        <option value="priority" ${sortType === "priority" ? "selected" : ""}>Priority</option>
        <option value="dueDate" ${sortType === "dueDate" ? "selected" : ""}>Due Date</option>
        <option value="name" ${sortType === "name" ? "selected" : ""}>Task Name</option>
        <option value="teamMem" ${sortType === "teamMem" ? "selected" : ""}>Team Member</option>
      </select>
      <button id="sortOrderBtn">${sortAscending ? "⬆️ Asc" : "⬇️ Desc"}</button>
      <button onclick="exportTasks()">📁 Export CSV</button>
    </div>
  `;

  if (filteredTasks.length === 0) {
    html += `<p>No tasks available.</p>`;
  } else {
    html += `<table class="task-table"><thead><tr>
        <th>Task Name</th><th>Description</th><th>Due Date</th>
        <th>Priority</th><th>Team Member</th><th>Actions</th>
      </tr></thead><tbody>`;

    filteredTasks.forEach((task) => {
    html += `<tr data-id="${task.id}">
      <td><textarea disabled>${task.name}</textarea></td>
      <td><textarea disabled>${task.desc}</textarea></td>
      <td><input type="date" value="${task.due}" disabled></td>
      <td><select disabled>
          <option value="High" ${task.prior === "High" ? "selected" : ""}>High</option>
          <option value="Medium" ${task.prior === "Medium" ? "selected" : ""}>Medium</option>
          <option value="Low" ${task.prior === "Low" ? "selected" : ""}>Low</option>
      </select></td>
      <td><input type="text" value="${task.teamMem}" disabled></td>
      <td>
        <button onclick="toggleEditMode(this)">✏️</button>
        <button onclick="deleteTask(${task.id})">🗑️</button>
      </td></tr>`;
  });


    html += `</tbody></table>`;
  }

  taskList.innerHTML = html;

  document.getElementById("sortType").addEventListener("change", function () {
    sortTasks(this.value);
  });

  document.getElementById("sortOrderBtn").addEventListener("click", function () {
    window.sortAscending = !window.sortAscending;
    this.textContent = window.sortAscending ? "⬆️ Asc" : "⬇️ Desc";
    sortTasks(document.getElementById("sortType").value);
  });
}

function sortTasks(type) {
  const compare = {
    priority: (a, b) => ({ High: 1, Medium: 2, Low: 3 })[a.prior] - ({ High: 1, Medium: 2, Low: 3 })[b.prior],
    dueDate: (a, b) => new Date(a.due) - new Date(b.due),
    name: (a, b) => a.name.localeCompare(b.name),
    teamMem: (a, b) => a.teamMem.localeCompare(b.teamMem)
  };
  if (type && compare[type]) {
    filteredTasks.sort((a, b) => window.sortAscending ? compare[type](a, b) : compare[type](b, a));
  }
  renderTasks();
}

function toggleEdit(btn) {
  const row = btn.closest("tr");
  const isEditing = row.classList.contains("editing");

  document.querySelectorAll("tr.editing").forEach(r => {
    r.classList.remove("editing");
    r.querySelectorAll("textarea, input, select").forEach(el => el.disabled = true);
    const taskId = r.getAttribute("data-id");
    r.querySelector("td:last-child").innerHTML = `
      <button onclick="toggleEditMode(this)">✏️</button>
      <button onclick="deleteTask(${taskId})">🗑️</button>`;
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

function saveTask(btn) {
  const row = btn.closest("tr");
  const taskId = Number(row.getAttribute("data-id"));

  const name = row.querySelector("td:nth-child(1) textarea").value.trim();
  const desc = row.querySelector("td:nth-child(2) textarea").value.trim();
  const due = row.querySelector("td:nth-child(3) input").value;
  const prior = row.querySelector("td:nth-child(4) select").value;
  const teamMem = row.querySelector("td:nth-child(5) input").value.trim();

  const todayStr = new Date().toISOString().split("T")[0];

  if (!name || !desc || !due || !prior || !teamMem) {
    return showMsg("❌ Please fill in all fields before saving", "error", document.getElementById("message"));
  }

  if (due < todayStr) {
    return showMsg("❌ Due date can't be in the past", "error", document.getElementById("message"));
  }

  const globalIndex = tasks.findIndex(task => task.id === taskId);
  if (globalIndex === -1) {
    return showMsg("❌ Could not find the task to update", "error", document.getElementById("message"));
  }

  tasks[globalIndex] = { id: taskId, name, desc, due, prior, teamMem };
  localStorage.setItem("tasks", JSON.stringify(tasks));
  filteredTasks = [...tasks];
  renderTasks();
  displayDueTomorrowTasks();
  showMsg("✅ Task saved successfully!", "success", document.getElementById("message"));
}



function deleteTask(id) {
  if (confirm("Are you sure you want to delete this task?")) {

    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) {
      showMsg("❌ Task not found.", "error", document.getElementById("message"));
      return;
    }
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    filteredTasks = [...tasks];
    renderTasks();
    displayDueTomorrowTasks();
    showMsg("🗑️ Task deleted successfully!", "success", document.getElementById("message"));
  }
}


function exportToCSV(data) {
  const headers = ["Task Name", "Description", "Due Date", "Priority", "Team Member"];
  const rows = data.map(task => [task.name, task.desc, task.due, task.prior, task.teamMem]);
  const csvContent = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.setAttribute("href", URL.createObjectURL(blob));
  link.setAttribute("download", "tasks.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function validateTaskName(input, errorEl) {
  const value = input.value.trim();
  if (!value) return errorEl.textContent = "Task name is required.", false;
  if (value.length > 25) return errorEl.textContent = "Max 25 characters allowed.", false;
  return errorEl.textContent = "", true;
}

function validateTaskDesc(input, errorEl) {
  const value = input.value.trim();
  if (!value) return errorEl.textContent = "Description is required.", false;
  if (value.length > 100) return errorEl.textContent = "Max 100 characters allowed.", false;
  return errorEl.textContent = "", true;
}

function validateDueDate(input, errorEl) {
  const value = input.value;
  const today = new Date().toISOString().split("T")[0];
  if (!value) return errorEl.textContent = "Due date is required.", false;
  if (value < today) return errorEl.textContent = "Due date can't be in the past.", false;
  return errorEl.textContent = "", true;
}

function validatePriority(input, errorEl) {
  if (!input.value) return errorEl.textContent = "Select a priority.", false;
  return errorEl.textContent = "", true;
}

function validateTeamMember(input, errorEl) {
  if (!input.value.trim()) return errorEl.textContent = "Add at least one member.", false;
  return errorEl.textContent = "", true;
}

function showMsg(text, type, el) {
  el.textContent = text;
  el.style.color = type === "success" ? "darkgreen" : "red";
  setTimeout(() => el.textContent = "", 3000);
}

function displayDueTomorrowTasks() {
  const banner = document.getElementById("dueTasksBanner");
  if (!banner) return;
  const tomorrow = new Date();
  console.log(tomorrow);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];
  const dueTomorrowTasks = tasks.filter(task => task.due === tomorrowStr);
  const latestDue = tasks.reduce((latest, task) =>
    new Date(task.due) > new Date(latest) ? task.due : latest, tasks[0]?.due || tomorrowStr);
  if (dueTomorrowTasks.length === 0) {
    banner.textContent = "🎉 No tasks due tomorrow!";
  } else if (latestDue === tomorrowStr) {
    banner.textContent = "⚠️ Tomorrow is the last due date. Complete your pending tasks!";
  } else {
    const taskNames = dueTomorrowTasks.map(t => t.name).join(" | ");
    banner.textContent = `⏰ Tasks due tomorrow: ${taskNames}`;
  }
}