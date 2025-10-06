// A list of all the template folder names.
const templateFolders = [
  "Abhinav Shukla",
  "Amit Raj Sharm",
  "Avinash",
  "Ayush",
  "Baveja Template",
  "Bootsnipp",
  "Chanakya",
  "CodePenTemplate-1",
  "Coding Nepal",
  "colorlib Template",
  "Dhruva Bhat",
  "Foolish Developer",
  "Ivan Grozdic",
  "Modern Animated Template",
  "Parth",
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
    "Template 2"


];

// A list of only the templates that were working.
const workingTemplates = [
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
  "Foolish Developer",
  "Ivan Grozdic",
  "Modern Animated Template",
  "Tech Zero",
  "Template 1",
  "Template 2",
  "chatfly",
  "Elango-Kannan-00",
  "Gihan Harindra",
  "Glassmorphism-adiprem73",
  "Jaswanth-Kumar",
  "Kartik Tripathi",
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
    "Split-Screen-Dark-Shikha"
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

controInfo.addEventListener("click", () => {
  popup.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});
