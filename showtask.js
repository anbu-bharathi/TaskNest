document.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("dueDate").min = today;

  const taskForm = document.getElementById("taskForm");
  const taskList = document.getElementById("taskList");

  function showTab(tab) {
    document.getElementById("add-tab").classList.remove("active");
    document.getElementById("view-tab").classList.remove("active");

    document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));

    if (tab === 'add') {
      document.getElementById("add-tab").classList.add("active");
      document.querySelector(".tab-button:nth-child(1)").classList.add("active");
    } else {
      document.getElementById("view-tab").classList.add("active");
      document.querySelector(".tab-button:nth-child(2)").classList.add("active");
      renderTasks();
    }
  }

  window.showTab = showTab;

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("taskName").value.trim();
    const desc = document.getElementById("taskDesc").value.trim();
    const due = document.getElementById("dueDate").value;
    const priority = document.getElementById("priority").value;

    if (!name || !desc || !due || !priority) {
      alert("Please fill in all required fields.");
      return;
    }

    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push({ name, desc, due, priority });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskForm.reset();
    alert("Task added successfully!");
  });

  function renderTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    taskList.innerHTML = "";

    if (tasks.length === 0) {
      taskList.innerHTML = "<p>No tasks available.</p>";
      return;
    }

    tasks.forEach(task => {
      const card = document.createElement("div");
      card.className = "task-card";
      card.innerHTML = `
        <h3>${task.name}</h3>
        <p><strong>Description:</strong> ${task.desc}</p>
        <p><strong>Due Date:</strong> ${task.due}</p>
        <p><strong>Priority:</strong> ${task.priority}</p>
      `;
      taskList.appendChild(card);
    });
  }
});



