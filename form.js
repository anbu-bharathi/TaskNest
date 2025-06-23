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
    displayTasks();
  }

  buttons.forEach(btn => btn.classList.remove("active"));
  document.querySelector(`[onclick="showTab('${tab}')"]`).classList.add("active");
}

// Elements
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




// Task Manager Script

let tasks = JSON.parse(localStorage.getItem("tasks")) || [
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

let currentlyEditingRow = null;

function showTab(tab) {
  document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`[onclick="showTab('${tab}')"]`).classList.add("active");

  document.getElementById("add-tab").classList.remove("active");
  document.getElementById("view-tab").classList.remove("active");
  document.getElementById(`${tab}-tab`).classList.add("active");

  if (tab === "view") displayTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function validateForm() {
  let isValid = true;
  const name = document.getElementById("taskName");
  const desc = document.getElementById("taskDesc");
  const due = document.getElementById("dueDate");
  const prior = document.getElementById("priority");
  const team = document.getElementById("teamMember");

  const errors = {
    taskNameError: name.value.trim() === "",
    taskDescError: desc.value.trim() === "",
    dueDateError: due.value === "" || new Date(due.value) < new Date().setHours(0, 0, 0, 0),
    priorityError: prior.value === "",
    teamMemberError: team.value.trim() === ""
  };

  for (let key in errors) {
    document.getElementById(key).textContent = errors[key] ? "Required" : "";
    if (errors[key]) isValid = false;
  }

  return isValid;
}

function clearForm() {
  ["taskName", "taskDesc", "dueDate", "priority", "teamMember", "attachment"].forEach(id => {
    document.getElementById(id).value = "";
  });
  document.querySelectorAll(".form-error").forEach(e => e.textContent = "");
  document.getElementById("message").textContent = "";
}

document.getElementById("taskForm").addEventListener("submit", e => {
  e.preventDefault();
  if (!validateForm()) return;

  const task = {
    name: document.getElementById("taskName").value.trim(),
    desc: document.getElementById("taskDesc").value.trim(),
    due: document.getElementById("dueDate").value,
    prior: document.getElementById("priority").value,
    teamMem: document.getElementById("teamMember").value.trim()
  };

  tasks.push(task);
  saveTasks();
  clearForm();
  document.getElementById("message").textContent = "✅ Task added successfully!";
});

function displayTasks() {
  const container = document.getElementById("taskList");
  container.innerHTML = "";

  if (tasks.length === 0) {
    container.innerHTML = "<p>No tasks available.</p>";
    return;
  }

  const table = document.createElement("table");
  table.className = "task-table";
  table.innerHTML = `
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Due Date</th>
        <th>Priority</th>
        <th>Team</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${tasks.map((task, index) => `
        <tr>
          <td><input type="text" value="${task.name}" readonly style="min-height: 40px; font-size: 15px;" /></td>
          <td>
            <textarea readonly style="min-height: 80px; font-size: 15px; resize: vertical;">${task.desc}</textarea>
          </td>
          <td><input type="date" value="${task.due}" readonly /></td>
          <td>
            <select disabled>
              <option ${task.prior === "High" ? "selected" : ""}>High</option>
              <option ${task.prior === "Medium" ? "selected" : ""}>Medium</option>
              <option ${task.prior === "Low" ? "selected" : ""}>Low</option>
            </select>
          </td>
          <td><input type="text" value="${task.teamMem}" readonly /></td>
          <td>
            <button onclick="toggleEditMode(this, ${index})">📝</button>
            <button class="cancel-btn" onclick="cancelEdit(this)" style="display:none">❎</button>
            <button onclick="deleteTask(${index})">🗑️</button>
          </td>
        </tr>`).join("")}
    </tbody>
  `;
  container.appendChild(table);
}


function toggleEditMode(btn, index) {
  const row = btn.closest("tr");

  if (currentlyEditingRow && currentlyEditingRow !== row) {
    alert("Only one row can be edited at a time. Please save or cancel the current edit.");
    return;
  }

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
    currentlyEditingRow = null;
    saveTasks();
  } else {
    btn.textContent = "💾";
    cancelBtn.style.display = "inline";
    row.classList.add("editing");
    inputs.forEach(input => {
      input.dataset.original = input.value;
      input.readOnly = false;
      input.disabled = false;
    });
    currentlyEditingRow = row;
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
  currentlyEditingRow = null;
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("dueDate").min = today;
});