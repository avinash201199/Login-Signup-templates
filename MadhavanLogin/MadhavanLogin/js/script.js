/**
 * MadhavanLogin Template
 * ----------------------
 * Description:
 * A modern, responsive login/register toggle interface with smooth overlay animation.
 * 
 * Features:
 * - Toggle between login and register forms
 * - Fully responsive design for desktop, tablet, and mobile
 * - Simple JS logic with CSS transitions for smooth UX
 * 
 * Author: Madhavan
 * Related Issue: #243
 */

'use strict';

const loginContainer = document.getElementById('login-container');

// Function to toggle the overlay and switch forms
const moveOverlay = () => loginContainer.classList.toggle('move');

// Desktop view buttons
document.getElementById('open-register').addEventListener('click', moveOverlay);
document.getElementById('open-login').addEventListener('click', moveOverlay);

// Mobile view buttons
document.getElementById('open-register-mobile').addEventListener('click', moveOverlay);
document.getElementById('open-login-mobile').addEventListener('click', moveOverlay);
