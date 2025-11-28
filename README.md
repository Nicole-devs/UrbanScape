# UrbanScape Architecture Website

A professional, accessible, and modern static website showcasing architectural projects, company information, and a contact form powered by Netlify Forms for easy deployment without a backend server.

***

## Features

- Clean, semantic HTML structure with accessibility best practices (ARIA attributes, proper form labels, keyboard-friendly modal)
- Responsive design with CSS covering navbar, slideshow galleries (residential and commercial projects), about section, and contact form
- Contact form integrated with **Netlify Forms**—no backend required to handle submissions
- Dynamic hidden field that captures the website domain on form submission, supporting multi-domain deployments
- Fully static site enabling easy drag-and-drop deployment on Netlify or similar platforms
- Smooth user experience with form input enhancements (automatic name capitalization) and submission feedback modal
- Professional styling with organized CSS and clean UI components

***

## Getting Started

### Prerequisites

- No backend/server needed—this is a static site
- Optional: Git, text editor (VS Code recommended)

### Running Locally

1. Clone this repo:
   ```bash
   git clone https://github.com/Nicole-devs/urbanscape-architecture.git
   ```
2. Open `index.html` in any modern web browser to view the site locally.

### Deployment

**Recommended: Deploy on Netlify**

1. Sign up or log in at [netlify.com](https://www.netlify.com)
2. Create a new site by dragging and dropping your project folder
3. Site is instantly live at `yoursite.netlify.app`
4. Netlify will handle the contact form submissions automatically
5. Set up custom domain if desired in Netlify dashboard

**Alternatively, deploy on GitHub Pages** for static hosting without forms backend.

***

## Contact Form

- Uses [Netlify Forms](https://docs.netlify.com/forms/setup/) with the `netlify` attribute on the form element
- Vanilla JavaScript dynamically sets the hidden `website` field to track source domain
- Form submission triggers a thank-you modal for user feedback

***

## Folder Structure

```
/images/        # Project and UI images
index.html      # Main HTML file
style.css       # CSS styles
script.js       # JavaScript for form, modal, name capitalization
README.md       # This file
```

***

## Customization

- Update images in `/images` folder to showcase your own projects
- Modify or extend CSS styles in `style.css`
- Adjust form fields or modal behavior in `index.html` and `script.js`

***

## License

© 2025 Nicole-devs. All rights reserved.

This project is a personal portfolio sample and is not intended for commercial use or distribution.

***

**Architecture Portfolio — Bringing Visions to Life**