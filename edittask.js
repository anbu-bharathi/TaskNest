let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function showTab(tab) {
  document.querySelectorAll(".tab-content").forEach(tabContent => tabContent.classList.remove("active"));
  document.getElementById(`${tab}-tab`).classList.add("active");

  document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`[onclick="showTab('${tab}')"]`).classList.add("active");

  if (tab === 'view') displayTasks();
}

document.getElementById("taskForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("taskName").value;
  const desc = document.getElementById("taskDesc").value;
  const due = document.getElementById("dueDate").value;
  const prior = document.getElementById("taskPriority").value;
  const teamMem = document.getElementById("teamMember").value;

  if (new Date(due) < new Date()) {
    alert("Please select a future due date.");
    return;
  }

  tasks.push({ name, desc, due, prior, teamMem });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  this.reset();
  alert("Task added!");
});

//uodated code

function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td data-label="Name"><input value="${task.name}" readonly /></td>
      <td data-label="Description"><input value="${task.desc}" readonly /></td>
      <td data-label="Due Date"><input type="date" value="${task.due}" disabled /></td>
      <td data-label="Priority">
        <select disabled>
          <option ${task.prior === "High" ? "selected" : ""}>High</option>
          <option ${task.prior === "Medium" ? "selected" : ""}>Medium</option>
          <option ${task.prior === "Low" ? "selected" : ""}>Low</option>
        </select>
      </td>
      <td data-label="Team"><input value="${task.teamMem}" readonly /></td>
      <td class="actions" data-label="Actions">
        <button onclick="toggleEditMode(this, ${index})">📝</button>
        <button class="cancel-btn" onclick="cancelEdit(this, ${index})" style="display:none">❎</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </td>
    `;

    taskList.appendChild(row);
  });
}

function toggleEditMode(editBtn, index) {
  const row = editBtn.closest("tr");
  const inputs = row.querySelectorAll("input, select");
  const cancelBtn = row.querySelector(".cancel-btn");
  const isEditing = editBtn.textContent === "💾";

  if (isEditing) {
    // Save logic
    const [name, desc, due, priorSelect, team] = inputs;
    if (new Date(due.value) < new Date()) {
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
    editBtn.textContent = "📝";
    cancelBtn.style.display = "none";
    row.classList.remove("editing");

    inputs.forEach(i => {
      i.readOnly = true;
      i.disabled = true;
    });

  } else {
    // Enter edit mode
    editBtn.textContent = "💾";
    cancelBtn.style.display = "inline";
    row.classList.add("editing");

    // Store original values in data-* attributes
    inputs.forEach(input => {
      input.dataset.original = input.value;
      input.readOnly = false;
      input.disabled = false;

      // Auto-save on change
      input.oninput = () => {
        autoSaveRow(index, row);
      };
    });
  }
}

function autoSaveRow(index, row) {
  const inputs = row.querySelectorAll("input, select");
  const [name, desc, due, priorSelect, team] = inputs;

  if (new Date(due.value) < new Date()) {
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
}

function cancelEdit(cancelBtn, index) {
  const row = cancelBtn.closest("tr");
  const inputs = row.querySelectorAll("input, select");
  const editBtn = row.querySelector("button");

  inputs.forEach(input => {
    input.value = input.dataset.original;
    input.readOnly = true;
    input.disabled = true;
    input.oninput = null;
  });

  cancelBtn.style.display = "none";
  editBtn.textContent = "📝";
  row.classList.remove("editing");
}

function deleteTask(index) {
  const confirmDelete = confirm("Are you sure you want to delete this task?");
  if (confirmDelete) {
    tasks.splice(index, 1); // Remove task from array
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Update storage
    displayTasks(); // Re-render the task list
  }
}
