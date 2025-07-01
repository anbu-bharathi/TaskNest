document.addEventListener("DOMContentLoaded", () => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const elements = getDOMElements();

  setupListeners(elements, users);
});

function getDOMElements() {
  return {
    loginForm: document.getElementById("loginForm"),
    loginEmail: document.getElementById("loginEmail"),
    loginPassword: document.getElementById("loginPassword"),
    loginRole: document.getElementById("loginRole"),
    loginEmailError: document.getElementById("loginEmailError"),
    loginPassError: document.getElementById("loginPassError"),

    signupForm: document.getElementById("signupForm"),
    signupUsername: document.getElementById("signupUsername"),
    signupEmail: document.getElementById("signupEmail"),
    signupPassword: document.getElementById("signupPassword"),
    signupRole: document.getElementById("signupRole"),
    signupEmailError: document.getElementById("signupEmailError"),
    signupPasswordError: document.getElementById("signupPasswordError"),
    passwordStrengthMsg: document.getElementById("passwordStrengthMsg"),

    loginModal: document.getElementById("loginModal"),
    signupModal: document.getElementById("signupModal"),
    showLoginBtn: document.getElementById("showLogin"),
    showSignupBtn: document.getElementById("showSignup"),
  };
}


function setupListeners(elements, users) {
  elements.signupForm.addEventListener("submit", (e) =>
    handleSignup(e, elements, users)
  );
  elements.loginForm.addEventListener("submit", (e) =>
    handleLogin(e, elements, users)
  );

  elements.signupPassword.addEventListener("input", () =>
    showPasswordStrength(elements.signupPassword.value, elements.passwordStrengthMsg)
  );

  elements.showLoginBtn.addEventListener("click", () =>
    showModal("loginModal")
  );
  elements.showSignupBtn.addEventListener("click", () =>
    showModal("signupModal")
  );
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getPasswordStrength(password) {
  if (password.length < 6) return "weak";
  if (/[A-Z]/.test(password) && /\d/.test(password) && password.length >= 8)
    return "strong";
  return "medium";
}

function isStrongPassword(password) {
  return getPasswordStrength(password) === "strong";
}

function showPasswordStrength(password, element) {
  const strength = getPasswordStrength(password);
  element.textContent = `Strength: ${strength}`;
  element.style.color = {
    weak: "red",
    medium: "orange",
    strong: "green",
  }[strength];
  element.style.transition = "all 0.3s ease";
}


function showModal(id) {
  closeModal("loginModal");
  closeModal("signupModal");
  document.getElementById(id).style.display = "block";
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "none";
}

function handleSignup(e, elements, users) {
  e.preventDefault();
  const username = elements.signupUsername.value.trim();
  const email = elements.signupEmail.value.trim();
  const password = elements.signupPassword.value.trim();
  const role = elements.signupRole.value;

  clearErrors(elements);

  let isValid = true;

  if (!username) {
    alert("Username is required.");
    isValid = false;
  }

  if (!isValidEmail(email)) {
    elements.signupEmailError.textContent = "Invalid email format.";
    isValid = false;
  } else if (users.some((u) => u.email === email)) {
    elements.signupEmailError.textContent = "Email already exists.";
    isValid = false;
  }

  if (!isStrongPassword(password)) {
    elements.signupPasswordError.textContent =
      "Password too weak. Use 8+ chars, upper, lower, number.";
    isValid = false;
  }

  if (!role) {
    alert("Please select a role.");
    isValid = false;
  }

  if (isValid) {
    const newUser = { username, email, password, role };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! Please login.");
    elements.signupForm.reset();
    showModal("loginModal");
  }
}

function handleLogin(e, elements, users) {
  e.preventDefault();
  const email = elements.loginEmail.value.trim();
  const password = elements.loginPassword.value.trim();
  const role = elements.loginRole.value;

  clearErrors(elements);

  let isValid = true;

  if (!isValidEmail(email)) {
    elements.loginEmailError.textContent = "Invalid email format.";
    isValid = false;
  }

  if (!password) {
    elements.loginPassError.textContent = "Password is required.";
    isValid = false;
  }

  if (!role) {
    alert("Please select a role.");
    isValid = false;
  }

  if (isValid) {
    const user = users.find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (user) {
      alert(`Welcome ${user.username}`);
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "./admin-dashboard.html";
    } else {
      alert("Invalid credentials.");
    }
  }
}

function clearErrors(el) {
  el.signupEmailError.textContent = "";
  el.signupPasswordError.textContent = "";
  el.passwordStrengthMsg.textContent = "";
  el.loginEmailError.textContent = "";
  el.loginPassError.textContent = "";
}

function togglePassword(id, icon) {
  const input = document.getElementById(id);
  if (input) {
    const isVisible = input.type === "text";
    input.type = isVisible ? "password" : "text";
    icon.textContent = isVisible ? "👁️" : "👁️‍🗨️";
  }
}



