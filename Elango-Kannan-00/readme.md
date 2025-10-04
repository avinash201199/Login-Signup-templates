Login & Signup Template - Professional or Product template.
Overview

This project provides responsive and reusable HTML, CSS, and JS templates for a Login and Signup page.
It is created as a Hacktoberfest 2025 contribution and can be reused or customized for any web project.

Features:

Responsive design for desktop and mobile.

Login and Signup forms with validation.

Social login buttons (Google, LinkedIn) placeholders.

Easy navigation between login and signup pages.

Fully reusable and customizable.

Folder Structure
project-root/
│
├─ login/
│   ├─ index.html       # Login page
│   ├─ script.js         # Login form validation & redirection
│   └─ style.css        # Login page styles
│
├─ signup/
│   ├─ index.html       # Signup page
│   ├─ script.js        # Signup form validation & redirection
│   └─ styles.css       # Signup page styles

How to Use

Clone or download the project folder.

Open login/index.html in your browser to access the login page.

Click the Register button to navigate to the signup page.

Fill the forms and submit. Alerts will show form validation messages.

Use the Back to Login link in the signup page to return to login.

How to Customize
1. Change Logo or Text

In index.html files, locate the .logo section:

<div class="logo">
  <i class="fa-solid fa-graduation-cap"></i>
  <span>Your Project Name</span>
</div>


Replace the icon or text with your own brand/logo.

2. Change Colors and Styles

Edit the style.css or styles.css files for each page.

You can update:

Background color

Button styles

Font styles

Input box appearance

3. Add or Remove Input Fields

Open login/index.html or signup/index.html.

Add or remove <div class="input-box"> sections.

Update the corresponding JS validation in login.js or signup.js.

4. Change Redirection

By default:

Login → Register button goes to ../signup/index.html

Signup → Back to Login goes to ../login/index.html

You can change these paths in login.js and signup.js if you move files.

5. Integrate with Backend

Currently, forms show alerts for demonstration.

To connect with backend:

Replace alert() with API calls using fetch or axios.

Handle authentication and database storage as needed.

Notes

The social login buttons are placeholders; you can integrate real OAuth if needed.

The templates are fully reusable and can be adapted to any web project.

Make sure the folder structure remains consistent or update the JS paths accordingly.