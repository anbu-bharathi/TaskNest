
  document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user || user.role !== "admin") {
      alert("Access denied. Redirecting...");
      window.location.href = "index.html"; // or login page
      return;
    }

    document.getElementById("adminName").textContent = user.name;
    document.getElementById("adminEmail").textContent = user.email;
  });


