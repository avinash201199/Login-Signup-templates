/*
Accessibility note (2025-10-27):
- Improved the "How to contribute" dialog for keyboard and screen reader users.
- Replaced non-focusable close <span> with a <button>.
- Trigger now exposes aria-expanded and aria-controls; dialog has tabindex="-1".
- Script manages focus (save/restore), Esc to close, Tab trapping, and overlay click.

Manual test: open index.html, Tab to the trigger, Enter to open, verify focus moves inside, Tab cycles,
Esc closes and restores focus to trigger.
*/

//A list of all the template folder names.
const templateFolders = [
  "Anuradha",
  "Ankit_nonsense3",
  "AasthaRai",
  "Aerospace-Prog",
  "Abhinav Shukla",
  "Amit Raj Sharm",
  "JwelSrivastava_Form",
  "Aniruddha Dwivedi",
  "Archisman Nath Choudhury",
  "Aurora-Glass-Auth",
  "Avinash",
  "Ayush",
  "Baveja Template",
  "Bootsnipp",
  "Card Flip",
  "Chanakya",
  "Chinmay",
  "Chitraxi Porwal",
  "CodePenTemplate-1",
  "Coding Nepal",
  "colorlib Template",
  "Cursor Following",
  "Dhruva Bhat",
  "Divyansh-Raj-Template",
  "EdwinAdamsV",
  "Foolish Developer",
  "HimanshuDubey",
  "Igneel-98",
  "Ipsit",
  "Ivan Grozdic",
  "Jayanta Ghosh",
  "Modern Animated Template",
  "Pranilash",
  "Parth",
  "Prachi",
  "RajdeepSingh",
  "Ruthwik",
  "SaurabhMishra(edtech+ecommerce)",
  "Tech Zero",
  "Template 1",
  "Template 2",
  "chatfly",
  "Elango-Kannan-00",
  "Gihan Harindra",
  "Glassmorphism-adiprem73",
  "Jaswanth-Kumar",
  "Joyston",
  "Kartik Tripathi",
  "Khushi",
  "khushi-batra",
  "Kruti Amrutiya",
  "Minaal",
  "Sahil-Kumar",
  "samim29",
  "Sansriti Mishra",
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
  "prem",
  "SaurabhMishra(edtech+ecommerce)",
  "Dev-Portal-Shikha",
  "Ivan Grozdic",
  "Himanshu",
  "Janavi-Pandole",
  "karthik-srivathsa-05",
  "Modern Animated Template",
  "Modern-Glassmorphic-Login",
  "Neon-Cyberpunk-Login",
  "Nitin",
  "SaurabhMishra(edtech+ecommerce)",
  "Shivaram",
  "SohamPadalkar",
  "Split-Screen-Dark-Shikha",
  "SrushtiThombre",
  "Tech Zero",
  "Template 1",
  "Template 2",
  "VedantTapkir",
  "OnkarJondhale",
  "SrushtiThombre",
  "Rohan",
  "Kanishka",
  "Ishika Singh Rajput",
  "Harsh-Login-Form",
  "shiva-sharma",
];

// Template details with descriptions and features
const templateDetails = {
  "JwelSrivastava_Form": {
    title: "JwelSrivastava Form",
    description: "Modern Glassmorphism Login Form",
    features: ["Glassmorphism Design", "Real-time Validation", "Password Toggle", "Social Login", "Responsive Design"],
    author: "Jwel Srivastava",
    technologies: ["HTML5", "CSS3", "Vanilla JavaScript"],
    category: "Modern",
    difficulty: "Intermediate"
  }
};

// A list of only the templates that were working.
const workingTemplates = [
  "Ankit_nonsense3",
  "Aerospace-Prog",
  "Aurora-Glass-Auth",
  "JwelSrivastava_Form",
  "QuantumNeon-Auth",
  "SaurabhMishra(edtech+ecommerce)",
  "CodePenTemplate-1",
  "Bootsnipp",
  "Anuradha",
  "Ayush",
  "Parth",
  "Prachi",
  "Joyston",
  "Shivaram",
  "Avinash",
  "Abhinav Shukla",
  "Amit Raj Sharm",
  "Baveja Template",
  "Chanakya",
  "Chinmay",
  "Chitraxi Porwal",
  "Jayanta Ghosh",
  "Coding Nepal",
  "colorlib Template",
  "Dhruva Bhat",
  "Divyansh-Raj-Template",
  "Foolish Developer",
  "Igneel-98",
  "Ivan Grozdic",
  "Modern-Glassmorphic-Login",
  "Modern Animated Template",
  "Nitin",
  "Pranilash",
  "Tech Zero",
  "Template 1",
  "Template 2",
  "chatfly",
  "Himanshu",
  "HimanshuDubey",
  "SohamPadalkar",
  "Elango-Kannan-00",
  "Gihan Harindra",
  "Ishika Singh Rajput",
  "Glassmorphism-adiprem73",
  "Jaswanth-Kumar",
  "Kartik Tripathi",
  "Khushi",
  "khushi-batra",
  "Kruti Amrutiya",
  "Minaal",
  "Ruthwik",
  "Sahil-Kumar",
  "samim29",
  "Sansriti Mishra",
  "SaurabhMishra(edtech+ecommerce)",
  "Janavi-Pandole",
  "CodePenTemplate-1",
  "Bootsnipp",
  "Ayush",
  "Avinash",
  "Dev-Portal-Shikha",
  "Split-Screen-Dark-Shikha",
  "SrushtiThombre",
  "OnkarJondhale",
  "Kanishka",
  "AasthaRai",
  "AniruddhaDwivedi",
  "Cursor Following",
  "Card Flip",
];



//container element from the HTML
const cardContainer = document.getElementById("card-container");

// Loop through each folder name and creating a card for it
templateFolders.forEach((folderName) => {
  // Create the HTML elements for the card
  const card = document.createElement("a");
  card.classList.add("template-card");

  // Add special styling for JwelSrivastava_Form
  if (folderName === "JwelSrivastava_Form") {
    card.style.cssText += `
      border: 2px solid #6366f1;
      box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
      position: relative;
    `;

    // Add "NEW" badge
    const newBadge = document.createElement("div");
    newBadge.textContent = "NEW";
    newBadge.style.cssText = `
      position: absolute;
      top: 8px;
      right: 8px;
      background: #10b981;
      color: white;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 10px;
      font-weight: bold;
      z-index: 10;
    `;
    card.appendChild(newBadge);
  }

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

  // Add template details if available
  const details = templateDetails[folderName];
  if (details) {
    // Add description
    const description = document.createElement("p");
    description.textContent = details.description;
    description.style.cssText = `
      font-size: 12px;
      color: #888;
      margin: 4px 0;
      text-align: center;
    `;

    // Add features badge
    const featuresDiv = document.createElement("div");
    featuresDiv.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      justify-content: center;
      margin-top: 8px;
    `;

    details.features.slice(0, 2).forEach(feature => {
      const badge = document.createElement("span");
      badge.textContent = feature;
      badge.style.cssText = `
        background: #6366f1;
        color: white;
        padding: 2px 6px;
        border-radius: 10px;
        font-size: 10px;
        font-weight: 500;
      `;
      featuresDiv.appendChild(badge);
    });

    // Adding the screenshot, title, description and features to the card
    card.appendChild(screenshot);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(featuresDiv);
  } else {
    // Adding the screenshot and title to the card (default)
    card.appendChild(screenshot);
    card.appendChild(title);
  }

    // Adding the completed card to the container
    cardContainer.appendChild(card);
});

// how to contribute info code (accessibility improvements)
const controInfo = document.querySelector(".contro-info");
const popup = document.getElementById("popup");
const closeBtn = document.querySelector(".close-btn");

if (popup) {
  // ensure hidden on load
  popup.hidden = true;

  // store last focused element so we can restore focus on close
  let lastFocus = null;

  // utility: get focusable elements inside the dialog
  const getFocusable = () => {
    return Array.from(
      popup.querySelectorAll(
        'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement);
  };

  const openDialog = () => {
    lastFocus = document.activeElement;
    popup.hidden = false;
    popup.setAttribute('aria-hidden', 'false');
    if (controInfo) controInfo.setAttribute('aria-expanded', 'true');

    // Move focus to the dialog container so screen readers announce it
    popup.focus({ preventScroll: true });

    // focus first meaningful control (close button or first focusable)
    const focusables = getFocusable();
    if (focusables.length) {
      focusables[0].focus({ preventScroll: true });
    }

    // add keydown handler for Esc and Tab trapping
    popup.addEventListener('keydown', handleKeyDown);
  };

  const closeDialog = () => {
    popup.hidden = true;
    popup.setAttribute('aria-hidden', 'true');
    if (controInfo) controInfo.setAttribute('aria-expanded', 'false');
    // remove key handler
    popup.removeEventListener('keydown', handleKeyDown);
    // restore focus
    if (lastFocus && typeof lastFocus.focus === 'function') {
      lastFocus.focus({ preventScroll: true });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      e.preventDefault();
      closeDialog();
      return;
    }

    if (e.key === 'Tab') {
      // basic focus trap
      const focusables = getFocusable();
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  };

  if (controInfo) {
    // ensure trigger has proper ARIA attributes (in case markup missing)
    controInfo.setAttribute('aria-controls', 'popup');
    controInfo.setAttribute('aria-expanded', controInfo.getAttribute('aria-expanded') || 'false');

    controInfo.addEventListener('click', (e) => {
      e.preventDefault();
      openDialog();
    });

    // allow keyboard activation via Enter/Space (button already handles this, but keep defensive)
    controInfo.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDialog();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDialog();
    });
  }

  // overlay click (click outside popup-content closes)
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      closeDialog();
    }
  });

  // Close popup with ESC key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !popup.hidden) {
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


// --- Search Functionality ---
const searchInput = document.getElementById("search-input");
const clearBtn = document.getElementById("clear-search");

if (searchInput) {
    searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase().trim();
        const cards = document.querySelectorAll(".template-card");
        let visibleCount = 0;

        cards.forEach((card) => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            const isMatch = title.includes(query);
            card.style.display = isMatch ? "block" : "none";
            if (isMatch) visibleCount++;
        });

        // Create or show "No results" message
        let noResultMsg = document.getElementById("no-results");
        if (!noResultMsg) {
            noResultMsg = document.createElement("p");
            noResultMsg.id = "no-results";
            noResultMsg.textContent = "No templates found";
            noResultMsg.style.textAlign = "center";
            noResultMsg.style.marginTop = "40px";
            noResultMsg.style.fontSize = "1.2rem";
            noResultMsg.style.color = "var(--text-secondary)";
            cardContainer.parentNode.insertBefore(
                noResultMsg,
                cardContainer.nextSibling
            );
        }

        noResultMsg.style.display = visibleCount === 0 ? "block" : "none";
    });

    //clear search button
    if (clearBtn) {
        clearBtn.addEventListener("click", function () {
            searchInput.value = "";
            const cards = document.querySelectorAll(".template-card");
            cards.forEach((card) => (card.style.display = "block"));
            const noResultMsg = document.getElementById("no-results");
            if (noResultMsg) noResultMsg.style.display = "none";
            searchInput.focus();
        });
    }
}
