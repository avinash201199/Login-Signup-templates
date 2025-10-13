// List of feedback template folder names (contributors add their folder name here)
const feedbackTemplateFolders = [
  "Elegant_Feedback_by_komal",
  // add more folder names here (name must match folder and screenshot file)
];

// container element (same id used on the homepage)
const cardContainer = document.getElementById("card-container");
if (!cardContainer) {
  console.warn("card-container not found");
}

(function renderFeedbackCards() {
  if (!cardContainer) return;
  const placeholder = 'https://placehold.co/400x300/2d3436/dfe6e9/png?text=Preview+Not+Available';

  feedbackTemplateFolders.forEach(folderName => {
    const card = document.createElement('a');
    card.className = 'template-card';
    card.href = `./${encodeURIComponent(folderName)}/`; // link to folder index

    const img = document.createElement('img');
    img.src = `./screenshots/${encodeURIComponent(folderName)}.png`;
    img.alt = `${folderName} preview`;
    img.onerror = () => {
      img.onerror = null;
      img.src = placeholder;
    };

    const title = document.createElement('h3');
    title.textContent = folderName;

    const caption = document.createElement('p');
    caption.className = 'caption';
    caption.textContent = 'Feedback template';

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(caption);

    cardContainer.appendChild(card);
  });
})();