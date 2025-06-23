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

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const taskName = document.getElementById("taskName").value.trim();
  const taskDesc = document.getElementById("taskDesc").value.trim();
  const dueDate = document.getElementById("dueDate").value;
  const priority = document.getElementById("priority").value;
  const teamMember = document.getElementById("teamMember").value.trim();

  let valid = true;

  document.querySelectorAll(".form-error").forEach(el => el.textContent = "");

  if (taskName === "") {
    document.getElementById("taskNameError").textContent = "Task Name is required";
    valid = false;
  }

  if (taskDesc === "") {
    document.getElementById("taskDescError").textContent = "Description is required";
    valid = false;
  }

  if (dueDate === "") {
    document.getElementById("dueDateError").textContent = "Due Date is required";
    valid = false;
  }

  if (priority === "") {
    document.getElementById("priorityError").textContent = "Priority is required";
    valid = false;
  }

  if (teamMember === "") {
    document.getElementById("teamMemberError").textContent = "Team Member is required";
    valid = false;
  }

  if (!valid) return;

  const task = {
    name: taskName,
    desc: taskDesc,
    due: dueDate,
    prior: priority,
    teamMem: teamMember
  };

  tasks.push(task);
  renderTasks();
  taskForm.reset();
  document.getElementById("message").textContent = "Task added successfully!";
  setTimeout(() => document.getElementById("message").textContent = "", 3000);
});

function renderTasks() {
  taskList.innerHTML = "";
  if (tasks.length === 0) {
    taskList.innerHTML = "<p>No tasks available.</p>";
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
      <td><input type="text" value="${task.name}" disabled></td>
      <td><input type="text" value="${task.desc}" disabled></td>
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
        <button onclick="toggleEditMode(this)">✏️</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </td>
    `;

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  taskList.appendChild(table);
}

function toggleEditMode(btn) {
  const row = btn.closest("tr");
  const isEditing = row.classList.contains("editing");

  document.querySelectorAll("tr.editing").forEach(r => {
    r.classList.remove("editing");
    r.querySelectorAll("input, select").forEach(el => el.disabled = true);
    const actionCell = r.querySelector("td:last-child");
    actionCell.innerHTML = `
      <button onclick="toggleEditMode(this)">✏️</button>
      <button onclick="deleteTask(${[...r.parentNode.children].indexOf(r)})">🗑️</button>
    `;
  });

  if (!isEditing) {
    row.classList.add("editing");
    row.querySelectorAll("input, select").forEach(el => el.disabled = false);

    const actionCell = row.querySelector("td:last-child");
    actionCell.innerHTML = `
      <button onclick="saveTask(this)">💾</button>
      <button onclick="cancelEdit(this)">❌</button>
    `;
  }
}

function saveTask(btn) {
  const row = btn.closest("tr");
  const index = [...row.parentNode.children].indexOf(row);
  const inputs = row.querySelectorAll("input, select");

  tasks[index] = {
    name: inputs[0].value,
    desc: inputs[1].value,
    due: inputs[2].value,
    prior: inputs[3].value,
    teamMem: inputs[4].value
  };

  row.classList.remove("editing");
  renderTasks();
}

function cancelEdit(btn) {
  renderTasks();
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("dueDate").min = today;
});
