class SocialAuthHandler {
    constructor() {
        this.init();
    }

    init() {
        // Initialize social login buttons
        const socialButtons = document.querySelectorAll('.social-login-btn');
        socialButtons.forEach(btn => {
            btn.addEventListener('click', () => this.handleSocialLogin(btn));
        });
    }

    handleSocialLogin(button) {
        // ... use the clean code from above
    }

    // ... rest of the methods
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SocialAuthHandler();
});