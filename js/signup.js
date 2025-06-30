// signup.js
document.getElementById('signup-button').addEventListener('click', function() {
  document.getElementById('signup-popup').style.display = 'block';
});

document.getElementById('close-signup').addEventListener('click', function() {
  document.getElementById('signup-popup').style.display = 'none';
});

document.getElementById('login-link').addEventListener('click', function(event) {
  event.preventDefault();
  document.getElementById('signup-popup').style.display = 'none';
  document.getElementById('login-popup').style.display = 'block';
});

document.getElementById('signup-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const companyName = document.getElementById('signup-company-name').value;
  const email = document.getElementById('signup-email').value;
  const firstName = document.getElementById('signup-first-name').value;
  const lastName = document.getElementById('signup-last-name').value;
  const country = document.getElementById('signup-country').value;
  const phone = document.getElementById('signup-phone').value;
  const password = document.getElementById('signup-password').value;

  if (!companyName || !email || !firstName || !lastName || !country || !phone || !password) {
    alert('Please fill in all fields.');
    return;
  }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

 
  const phoneRegex = /^\d{10}$/; 
  if (!phoneRegex.test(phone)) {
    alert('Please enter a valid phone number.');
    return;
  }

  alert('Signup successful!');
  document.getElementById('signup-popup').style.display = 'none';
});