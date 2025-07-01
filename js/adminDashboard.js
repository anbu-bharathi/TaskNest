//console.log("Hiii");
$(document).ready(function () {
  $('.demo-btn').click(function () {
    alert("Demo request sent! Our team will contact you.");
  });

  $('.sub-nav button').hover(function () {
    $(this).css("background-color", "#d6d6d6");
  }, function () {
    $(this).css("background-color", "#fff");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const dueTaskData = {
    pending: 7,
    inProgress: 5,
    completed: 3,
  };

  const priorityData = {
    low: 4,
    medium: 6,
    high: 8,
  };

});
//   const dueTaskChart = new Chart(document.getElementById('dueTaskChart'), {
//     type: 'doughnut',
//     data: {
//       labels: ['Pending', 'In Progress', 'Completed'],
//       datasets: [{
//         data: [dueTaskData.pending, dueTaskData.inProgress, dueTaskData.completed],
//         backgroundColor: ['#9b59b6', '#00bcd4', '#2ecc71'],
//         borderWidth: 2
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: { position: 'bottom' },
//         tooltip: { enabled: true }
//       }
//     }
//   });


//   const priorityChart = new Chart(document.getElementById('priorityChart'), {
//     type: 'bar',
//     data: {
//       labels: ['Low', 'Medium', 'High'],
//       datasets: [{
//         label: 'Number of Tasks',
//         data: [priorityData.low, priorityData.medium, priorityData.high],
//         backgroundColor: ['#2ecc71', '#f39c12', '#e74c3c'],
//         borderRadius: 6
//       }]
//     },
//     options: {
//       responsive: true,
//       scales: {
//         y: { beginAtZero: true, ticks: { stepSize: 1 } }
//       },
//       plugins: {
//         legend: { display: false }
//       }
//     }
//   });
// });



