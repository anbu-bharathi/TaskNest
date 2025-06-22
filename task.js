// script.js
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function showTab(tab) {
  document.querySelectorAll(".tab-content").forEach(tabContent => tabContent.classList.remove("active"));
  document.getElementById(`${tab}-tab`).classList.add("active");

  document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`[onclick="showTab('${tab}')"]`).classList.add("active");

  if (tab === 'view') displayTasks();
}

document.getElementById("taskForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = taskName.value.trim();
  const desc = taskDesc.value.trim();
  const due = dueDate.value;
  const prior = priority.value;
  const teamMem = teamMember.value.trim();

  if (!name || !desc || !due || !prior || !teamMem) return;
  if (new Date(due) < new Date().setHours(0,0,0,0)) {
    alert("Please select a future due date.");
    return;
  }

  tasks.push({ name, desc, due, prior, teamMem });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  this.reset();
  displayTasks();
  showTab('view');
});

function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

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
        <button onclick="toggleEditMode(this, ${index})">📝</button>
        <button class="cancel-btn" onclick="cancelEdit(this, ${index})">❎</button>
        <button onclick="deleteTask(${index})">🗑️</button>
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
    const [name, desc, due, priorSelect, team] = inputs;
    if (new Date(due.value) < new Date().setHours(0,0,0,0)) {
      alert("Due date must be in the future.");
      return;
    }

    tasks[index] = {
      name: name.value,
      desc: desc.value,
      due: due.value,
      prior: priorSelect.value,
      teamMem: team.value
    };

    localStorage.setItem("tasks", JSON.stringify(tasks));
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

function cancelEdit(btn, index) {
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
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("dueDate").min = today;
});
