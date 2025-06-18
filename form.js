
  const form = document.getElementById("taskForm");
  const message = document.getElementById("message");

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
      message.textContent = "✅ Task created successfully!";
      message.style.color = "lightgreen";
      form.reset();
      
      [taskNameError, taskDescError, dueDateError, priorityError, teamMemberError].forEach(el => el.textContent = "");
    } else {
      message.textContent = "❌ Please correct the errors above.";
      message.style.color = "#ffbbbb";
    }
  });
