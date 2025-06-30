document.addEventListener("DOMContentLoaded", () => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const elements = {
    showLogin: document.getElementById("showLogin"),
    showSignup: document.getElementById("showSignup"),
    loginModal: document.getElementById("loginModal"),
    signupModal: document.getElementById("signupModal"),

    loginForm: document.getElementById("loginForm"),
    signupForm: document.getElementById("signupForm"),

    loginEmail: document.getElementById("loginEmail"),
    loginPass: document.getElementById("loginPassword"),
    loginRole: document.getElementById("loginRole"),
    loginSubmit: document.querySelector("#loginForm button[type='submit']"),

    signupName: document.getElementById("signupUsername"),
    signupEmail: document.getElementById("signupEmail"),
    signupPass: document.getElementById("signupPassword"),
    signupRole: document.getElementById("signupRole"),
    signupSubmit: document.querySelector("#signupForm button[type='submit']"),

    loginEmailError: document.getElementById("loginEmailError"),
    loginPassError: document.getElementById("loginPassError"),
    signupEmailError: document.getElementById("signupEmailError"),
    signupPassError: document.getElementById("signupPassError"),
    passwordStrengthMsg: document.getElementById("passwordStrengthMsg") || createStrengthMsg()
  };

  function validateEmail(email) {
    return /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email);
  }

  function validatePassword(password) {
    return password.length >= 6;
  }

  function getPasswordStrength(password) {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { level: "Weak", class: "weak" };
    if (score === 2) return { level: "Medium", class: "medium" };
    return { level: "Strong", class: "strong" };
  }

  function updateInputStyle(input, isValid) {
    input.classList.remove("valid", "invalid");
    input.classList.add(isValid ? "valid" : "invalid");
  }

  function shakeForm(form) {
    form.classList.add("shake");
    setTimeout(() => form.classList.remove("shake"), 500);
  }

  function createStrengthMsg() {
    const msg = document.createElement("small");
    msg.id = "passwordStrengthMsg";
    msg.className = "strength-msg";
    elements.signupPass.insertAdjacentElement("afterend", msg);
    return msg;
  }

  function toggleModal(type) {
    elements.loginModal.style.display = type === "login" ? "flex" : "none";
    elements.signupModal.style.display = type === "signup" ? "flex" : "none";
  }

  function checkSignupValidity() {
    const valid =
      validateEmail(elements.signupEmail.value.trim()) &&
      validatePassword(elements.signupPass.value.trim()) &&
      elements.signupName.value.trim() &&
      elements.signupRole.value &&
      !users.some(u => u.email === elements.signupEmail.value.trim());

    elements.signupSubmit.disabled = !valid;
  }

  function checkLoginValidity() {
    const valid =
      validateEmail(elements.loginEmail.value.trim()) &&
      validatePassword(elements.loginPass.value.trim()) &&
      elements.loginRole.value;

    elements.loginSubmit.disabled = !valid;
  }

  function resetInputStyles(fields) {
    fields.forEach(id => {
      elements[id].classList.remove("valid", "invalid");
    });
  }

  elements.showLogin.addEventListener("click", () => toggleModal("login"));
  elements.showSignup.addEventListener("click", () => toggleModal("signup"));

  window.closeModal = id => {
    document.getElementById(id).style.display = "none";
  };

  window.togglePassword = id => {
    const field = document.getElementById(id);
    field.type = field.type === "password" ? "text" : "password";
  };

  window.switchToSignup = () => toggleModal("signup");
  window.switchToLogin = () => {
    toggleModal("login");
    setTimeout(() => elements.loginEmail.focus(), 300);
  };

  elements.signupEmail.addEventListener("input", () => {
    const value = elements.signupEmail.value.trim();
    const valid = validateEmail(value);
    const exists = users.some(u => u.email === value);

    if (!valid) {
      elements.signupEmailError.textContent = "Invalid email format.";
      updateInputStyle(elements.signupEmail, false);
    } else if (exists) {
      elements.signupEmailError.textContent = "Email already exists.";
      updateInputStyle(elements.signupEmail, false);
    } else {
      elements.signupEmailError.textContent = "";
      updateInputStyle(elements.signupEmail, true);
    }

    checkSignupValidity();
  });

  elements.signupPass.addEventListener("input", () => {
    const value = elements.signupPass.value.trim();
    const isValid = validatePassword(value);
    const strength = getPasswordStrength(value);

    elements.passwordStrengthMsg.textContent = value ? `Strength: ${strength.level}` : "";
    elements.passwordStrengthMsg.className = `strength-msg ${strength.class}`;
    elements.signupPassError.textContent = isValid ? "" : "Password must be at least 6 characters.";
    updateInputStyle(elements.signupPass, isValid);
    checkSignupValidity();
  });

  elements.loginEmail.addEventListener("input", () => {
    const value = elements.loginEmail.value.trim();
    const valid = validateEmail(value);
    elements.loginEmailError.textContent = valid ? "" : "Invalid email format.";
    updateInputStyle(elements.loginEmail, valid);
    checkLoginValidity();
  });

  elements.loginPass.addEventListener("input", () => {
    const value = elements.loginPass.value.trim();
    const valid = validatePassword(value);
    elements.loginPassError.textContent = valid ? "" : "Password must be at least 6 characters.";
    updateInputStyle(elements.loginPass, valid);
    checkLoginValidity();
  });

  elements.signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = elements.signupName.value.trim();
    const email = elements.signupEmail.value.trim();
    const password = elements.signupPass.value.trim();
    const role = elements.signupRole.value;

    if (users.some(u => u.email === email)) {
      elements.signupEmailError.textContent = "Email already exists.";
      shakeForm(elements.signupForm);
      return;
    }

    const newUser = { name, email, password, role };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Signup successful! Please login.");
    elements.signupForm.reset();
    resetInputStyles(["signupEmail", "signupPass"]);
    elements.signupSubmit.disabled = true;
    window.switchToLogin();
  });

  elements.loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = elements.loginEmail.value.trim();
    const password = elements.loginPass.value.trim();
    const role = elements.loginRole.value;

    const user = users.find(u => u.email === email && u.password === password && u.role === role);

    if (!user) {
      elements.loginPassError.textContent = "Invalid email or password.";
      shakeForm(elements.loginForm);
      return;
    }

    alert(`✅ Welcome ${user.name} (${user.role})`);
    elements.loginForm.reset();
    resetInputStyles(["loginEmail", "loginPass"]);
    elements.loginSubmit.disabled = true;
    elements.loginModal.style.display = "none";
  });

  localStorage.setItem("loggedInUser", JSON.stringify(user));

alert(`✅ Welcome ${user.name} (${user.role})`);
elements.loginForm.reset();
resetInputStyles(["loginEmail", "loginPass"]);
elements.loginSubmit.disabled = true;
elements.loginModal.style.display = "none";

// ✅ Redirect based on role
if (user.role === "admin") {
  window.location.href = "admin-dashboard.html";
} else {
  window.location.href = "member-dashboard.html"; // for members if needed
}

  elements.signupSubmit.disabled = true;
  elements.loginSubmit.disabled = true;
});
