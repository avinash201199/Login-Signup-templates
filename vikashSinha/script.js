document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("status");

  if (!name || !email || !message) {
    showStatus("Please fill in all fields.", "error");
    return;
  }

  // Email pattern validation
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    showStatus("Please enter a valid email.", "error");
    return;
  }

  // ✅ Show confirmation popup with entered data
  alert(
    `✅ Your data has been saved!\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
  );

  // ✅ Also show it below the form
  showStatus("Message sent successfully!", "success");
  displayUserData(name, email, message);

  // Clear inputs
  document.getElementById("contactForm").reset();
});

function showStatus(message, type) {
  const status = document.getElementById("status");
  status.textContent = message;
  status.style.color = type === "success" ? "green" : "red";
  status.style.opacity = "0";
  status.style.transition = "opacity 0.4s ease";
  setTimeout(() => {
    status.style.opacity = "1";
  }, 100);
}

// ✅ Function to display user data under the form
function displayUserData(name, email, message) {
  let dataBox = document.getElementById("savedData");

  // Create box if not present
  if (!dataBox) {
    dataBox = document.createElement("div");
    dataBox.id = "savedData";
    dataBox.style.marginTop = "20px";
    dataBox.style.background = "#f5f5f5";
    dataBox.style.padding = "15px";
    dataBox.style.borderRadius = "10px";
    dataBox.style.border = "1px solid #ccc";
    dataBox.style.fontSize = "0.95rem";
    dataBox.style.color = "#333";
    document.querySelector(".container").appendChild(dataBox);
  }

  dataBox.innerHTML = `
    <h3 style="color:#4a90e2;">Saved Data</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message}</p>
  `;
}
