window.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("dueTasksBanner");
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  if (!banner || tasks.length === 0) {
    banner.textContent = "🎉 No tasks due tomorrow!";
    return;
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const dueTomorrowTasks = tasks.filter(task => task.due === tomorrowStr);
  // const latestDue = tasks.reduce((latest, task) =>
  //   new Date(task.due) > new Date(latest) ? task.due : latest,
  //   tasks[0]?.due || tomorrowStr
  // );

  if (dueTomorrowTasks.length === 0) {
    banner.textContent = "🎉 No tasks due tomorrow!";
  } 
  // else if (latestDue === tomorrowStr) {
  //   banner.textContent = "⚠️ Tomorrow is the last due date. Complete your pending tasks!";
  // } 
  else {
    const taskNames = dueTomorrowTasks.map(t => t.name).join(" | ");
    banner.textContent = `⏰ Tasks due tomorrow: ${taskNames}`;
  }
});



