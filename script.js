//A list of all the template folder names.
const templateFolders = [
  "Aerospace-Prog",
  "Abhinav Shukla",
  "Amit Raj Sharm",
  "Aurora-Glass-Auth",
  "Avinash",
  "Ayush",
  "Baveja Template",
  "Bootsnipp",
  "Chanakya",
  "CodePenTemplate-1",
  "Coding Nepal",
  "colorlib Template",
  "Dhruva Bhat",
  "Divyansh-Raj-Template",
  "Foolish Developer",
  "HimanshuDubey",
  "Ivan Grozdic",
  "Modern Animated Template",
  "Pranilash",
  "Parth",
  "QuantumNeon-Auth",
  "SaurabhMishra(edtech+ecommerce)",
  "Tech Zero",
  "Template 1",
  "Template 2",
  "chatfly",
  "Elango-Kannan-00",
  "Gihan Harindra",
  "Glassmorphism-adiprem73",
  "Jaswanth-Kumar",
  "Kartik Tripathi",
  "Kruti Amrutiya",
  "Minaal",
  "Sahil-Kumar",
  "samim29",
"shivaram",
    "Abhinav Shukla",
    "Amit Raj Sharm",
    "Anuradha",
    "Avinash",
    "Ayush",
    "Baveja Template",
    "Bootsnipp",
    "Chanakya",
    "CodePenTemplate-1",
    "Coding Nepal",
    "colorlib Template",
    "Dev-Portal-Shikha",
    "Dhruva Bhat",
    "Foolish Developer",
    "Ivan Grozdic",
    "Himanshu",
    "Janavi-Pandole",
    "Modern Animated Template",
    "SaurabhMishra(edtech+ecommerce)",
  "shivaram",
    "Split-Screen-Dark-Shikha",
    "Tech Zero",
    "Template 1",
  "Template 2",
  "Kanishka",
];

// A list of only the templates that were working.
const workingTemplates = [
  "Aerospace-Prog",
  "Aurora-Glass-Auth",
  "QuantumNeon-Auth",
  "SaurabhMishra(edtech+ecommerce)",
  "CodePenTemplate-1",
  "Bootsnipp",
  "Ayush",
  "Avinash",
  "Abhinav Shukla",
  "Amit Raj Sharm",
  "Baveja Template",
  "Chanakya",
  "Coding Nepal",
  "colorlib Template",
  "Dhruva Bhat",
  "Divyansh-Raj-Template",
  "Foolish Developer",
  "Ivan Grozdic",
  "Modern Animated Template",
  "Pranilash",
  "Tech Zero",
  "Template 1",
  "Template 2",
  "chatfly",
  "Elango-Kannan-00",
  "Gihan Harindra",
  "Glassmorphism-adiprem73",
  "Jaswanth-Kumar",
  "Kartik Tripathi",
  "Kruti Amrutiya",
  "Minaal",
  "Sahil-Kumar",
  "samim29",
    "SaurabhMishra(edtech+ecommerce)",
    "Janavi-Pandole",
    "CodePenTemplate-1",
    "Bootsnipp",
    "Ayush",
    "Avinash",
    "Dev-Portal-Shikha",
  "Split-Screen-Dark-Shikha",
  "Kanishka",
];

//container element from the HTML
const cardContainer = document.getElementById("card-container");

// Loop through each folder name and creating a card for it
templateFolders.forEach((folderName) => {
  // Create the HTML elements for the card
  const card = document.createElement("a");
  card.classList.add("template-card");

  // Special fix for 'Tech Zero' link
  if (folderName === "Tech Zero") {
    card.href = `./${folderName}/login.html`;
  } else {
    card.href = `./${folderName}/`;
  }

  const screenshot = document.createElement("img");

  // Checking if the template is in our "working" list
  if (workingTemplates.includes(folderName)) {
    // If it works, use your real screenshot
    screenshot.src = `./screenshots/${folderName}.png`;
  } else {
    // If it's broken, using a professional placeholder
    screenshot.src = `https://placehold.co/400x300/2d3436/dfe6e9/png?text=Preview+Not+Available`;
  }

  const title = document.createElement("h3");
  title.textContent = folderName;

  // Adding the screenshot and title to the card
  card.appendChild(screenshot);
  card.appendChild(title);

  // Adding the completed card to the container
  cardContainer.appendChild(card);
});

// how to contribute info code
const controInfo = document.querySelector(".contro-info");
const popup = document.getElementById("popup");
const closeBtn = document.querySelector(".close-btn");

// Safety guards in case elements are missing
if (popup) {
  // Ensure popup is hidden on load (use the boolean hidden attribute)
  popup.hidden = true;

  if (controInfo) {
    controInfo.addEventListener("click", () => {
      popup.hidden = false;
      // move focus into the dialog for accessibility
      const firstHeading = popup.querySelector('#popup-title');
      if (firstHeading) firstHeading.focus({ preventScroll: true });
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      popup.hidden = true;
      if (controInfo) controInfo.focus({ preventScroll: true });
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.hidden = true;
      if (controInfo) controInfo.focus({ preventScroll: true });
    }
  });
}

// Scroll to top function 
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Function to check scroll position and toggle button visibility
const scrollFunction = () => {
  // If the user has scrolled down more than 100px from the top
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    // Show the button
    scrollToTopBtn.style.display = "block";
  } else {
    // Otherwise, hide the button
    scrollToTopBtn.style.display = "none";
  }
};

// Function to scroll smoothly to the top of the page
const topFunction = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // This enables smooth scrolling
  });
};

// Add an event listener that calls scrollFunction() whenever the user scrolls
window.onscroll = () => {
  scrollFunction();
};

// Add an event listener that calls topFunction() when the button is clicked
scrollToTopBtn.addEventListener("click", topFunction);

    // --- NEW: THEME SWITCHER LOGIC ---
const themeToggle = document.querySelector("#theme-checkbox");
const currentTheme = localStorage.getItem("theme");

    // On page load, apply the saved theme
    if (currentTheme) {
        document.body.classList.add(currentTheme);
  if (currentTheme === "light-mode") {
            themeToggle.checked = true;
        }
    }

    // Add event listener for the toggle switch
themeToggle.addEventListener("change", function () {
        if (this.checked) {
    document.body.classList.add("light-mode");
    localStorage.setItem("theme", "light-mode");
        } else {
    document.body.classList.remove("light-mode");
    localStorage.setItem("theme", ""); // When unchecked, it's the default dark mode
        }
    });
    