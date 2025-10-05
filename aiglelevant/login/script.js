lucide.createIcons();

const testimonials = [
    {
        quote: "“Acme’s tools made our workflow seamless — productivity skyrocketed!”",
        name: "Evelyn Carter",
        role: "Customer, Founder of BrightLabs",
    },
    {
        quote: "“At Acme, innovation drives everything we build. Simplifying business for everyone.”",
        name: "Jordan Miles",
        role: "Executive, CEO of Acme Inc.",
    },
    {
        quote: "“Partnering with Acme was a game-changer — delivery time cut in half.”",
        name: "A. Murugadoss",
        role: "Client, Director at CloudNova",
    },
];

let index = 0;
const quote = document.getElementById("quote");
const nameEl = document.getElementById("name");
const roleEl = document.getElementById("role");

function updateTestimonial(i) {
    quote.style.opacity = 0;
    setTimeout(() => {
        quote.textContent = testimonials[i].quote;
        nameEl.textContent = testimonials[i].name;
        roleEl.textContent = testimonials[i].role;
        quote.style.opacity = 1;
    }, 400);
}

document.getElementById("next").onclick = () => {
    index = (index + 1) % testimonials.length;
    updateTestimonial(index);
};
document.getElementById("prev").onclick = () => {
    index = (index - 1 + testimonials.length) % testimonials.length;
    updateTestimonial(index);
};
setInterval(() => {
    index = (index + 1) % testimonials.length;
    updateTestimonial(index);
}, 6000);

const toggleBtn = document.getElementById("theme-toggle");
const container = document.getElementById("login-container");
const icon = document.getElementById("theme-icon");

function applyTheme(dark) {
    if (dark) {
        document.body.style.background =
            "linear-gradient(to bottom right, oklch(12.9% 0.042 264.695), oklch(25.8% 0.092 26.042))";
        container.style.background = "oklch(25.8% 0.092 26.042)";
        container.style.color = "oklch(97.1% 0.013 17.38)";
        icon.setAttribute("data-lucide", "sun");
    } else {
        document.body.style.background =
            "linear-gradient(to bottom right, oklch(97.1% 0.013 17.38), oklch(25.8% 0.092 26.042))";
        container.style.background = "oklch(12.9% 0.042 264.695)";
        container.style.color = "oklch(97.1% 0.013 17.38)";
        icon.setAttribute("data-lucide", "moon");
    }
    lucide.createIcons();
}

let darkMode = localStorage.getItem("darkMode") === "true";
applyTheme(darkMode);

toggleBtn.onclick = () => {
    darkMode = !darkMode;
    localStorage.setItem("darkMode", darkMode);
    applyTheme(darkMode);
};
