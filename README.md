# CHARIS TECHNOLOGIES WEBSITE
**Empowering Generations Through Technology**

---

## 📋 TABLE OF CONTENTS
1. [Overview](#overview)
2. [Website Structure](#website-structure)
3. [Getting Started](#getting-started)
4. [Adding Your Images](#adding-your-images)
5. [Customizing Content](#customizing-content)
6. [Hosting Your Website](#hosting-your-website)
7. [Important Files](#important-files)
8. [Features](#features)
9. [Browser Compatibility](#browser-compatibility)
10. [Support](#support)

---

## 🎯 OVERVIEW

This is a professional, fully responsive website for Charis Technologies. The website includes:
- **6 HTML Pages**: Home, Programs, Services, About Us, Contact Us, and Program Details
- **Modern Design**: Clean, professional, and mobile-friendly
- **Interactive Features**: Smooth animations, mobile navigation, form validation
- **SEO Optimized**: Proper meta tags and semantic HTML for better search engine visibility

---

## 📁 WEBSITE STRUCTURE

```
charis-technologies/
│
├── index.html              # Home page (landing page)
├── programs.html           # All training programs
├── services.html           # All tech services
├── about.html              # About us, vision, mission, values
├── contact.html            # Contact form and information
├── program-details.html    # Expanded program information
│
├── style.css               # Main stylesheet (all styling)
├── script.js               # Main JavaScript (all interactivity)
│
└── assets/                 # Folder for images and media
    ├── logo.png            # Your logo (ADD THIS)
    ├── digital-literacy.jpg
    ├── summer-bootcamp.jpg
    ├── school-training.jpg
    ├── adult-training.jpg
    ├── web-design.jpg
    ├── frontend-dev.jpg
    ├── backend-dev.jpg
    ├── fullstack-dev.jpg
    ├── python.jpg
    ├── mobile-dev.jpg
    ├── cybersecurity.jpg
    ├── graphics.jpg
    ├── uiux.jpg
    ├── data-analytics.jpg
    ├── gallery-1.jpg
    ├── gallery-2.jpg
    ├── gallery-3.jpg
    ├── gallery-4.jpg
    ├── gallery-5.jpg
    └── gallery-6.jpg
```

---

## 🚀 GETTING STARTED

### Step 1: Extract Files
1. Extract all files from the zip folder to a location on your computer
2. Keep all files in the same folder structure

### Step 2: Open in Browser
1. Double-click on `index.html` to view the website
2. You should see the home page open in your default browser

### Step 3: Test Navigation
- Click through all the menu items (Home, Programs, Services, About Us, Contact Us)
- Test the mobile menu by resizing your browser to a smaller width
- Try clicking the hamburger menu icon (three lines) on mobile view

---

## 🖼️ ADDING YOUR IMAGES

### CRITICAL: Add Your Logo
1. Save your logo as `logo.png` in the `assets/` folder
2. Recommended size: 200x200 pixels or similar square dimensions
3. Format: PNG with transparent background works best

### Adding Program & Service Images
For each program and service, add an image to the `assets/` folder:

**Program Images** (Recommended size: 800x600 pixels):
- `digital-literacy.jpg`
- `summer-bootcamp.jpg`
- `school-training.jpg`
- `adult-training.jpg`
- `web-design.jpg`
- `frontend-dev.jpg`
- `backend-dev.jpg`
- `fullstack-dev.jpg`
- `python.jpg`
- `mobile-dev.jpg`
- `cybersecurity.jpg`
- `graphics.jpg`
- `uiux.jpg`
- `data-analytics.jpg`

**Gallery Images** (Recommended size: 1200x900 pixels):
- `gallery-1.jpg` - Summer Coding Bootcamp photo
- `gallery-2.jpg` - Digital Literacy Workshop photo
- `gallery-3.jpg` - Certificate Award Ceremony photo
- `gallery-4.jpg` - Tech Hub Workspace photo
- `gallery-5.jpg` - Community Tech Outreach photo
- `gallery-6.jpg` - Hands-on Training Session photo

### Where to Find Free Stock Images
If you need placeholder images:
- **Unsplash**: https://unsplash.com (search for "technology", "coding", "students learning")
- **Pexels**: https://pexels.com
- **Pixabay**: https://pixabay.com

---

## ✏️ CUSTOMIZING CONTENT

### Updating Contact Information

**In ALL HTML files**, find and replace:
- Phone: `+234 913 027 6015` → Your actual phone number
- Email: `charistechnologies123@gmail.com` → Your actual email
- Location: `Lagos, Nigeria` → Your specific location

### Updating Social Media Links

**In ALL HTML files**, find and replace:
- Facebook: `https://facebook.com/Charis_Technologies`
- Instagram: `https://instagram.com/charistechnologies`
- Twitter: `https://twitter.com/charistech`
- LinkedIn: `https://linkedin.com/company/charistechnologies`

### Changing Colors

Open `style.css` and modify the CSS variables (lines 18-31):

```css
:root {
  --primary-blue: #1a2b5c;      /* Main brand color */
  --accent-purple: #8b2fc9;     /* Secondary brand color */
  --accent-pink: #e91e63;       /* Tertiary brand color */
  --accent-red: #ff4444;        /* Call-to-action color */
  /* ... change these to your brand colors */
}
```

### Adding More Programs

1. Open `programs.html`
2. Find the `.cards-grid` section
3. Copy one of the existing `.card` blocks
4. Paste it and modify the content:
   - Change the image source
   - Update the title
   - Update the description
   - Update the duration and price
   - Update the program ID in links

### Adding More Services

Follow the same process as programs in `services.html`

---

## 🌐 HOSTING YOUR WEBSITE

### Option 1: Free Hosting (Recommended for Beginners)

**Netlify** (Easiest):
1. Go to https://www.netlify.com
2. Sign up for a free account
3. Drag and drop your entire website folder
4. Get a free subdomain: `yoursite.netlify.app`
5. Optional: Connect a custom domain

**GitHub Pages**:
1. Create a GitHub account at https://github.com
2. Create a new repository named `charistechnologies.github.io`
3. Upload all your files
4. Your site will be live at `https://charistechnologies.github.io`

### Option 2: Paid Hosting (For Custom Domain)

**Recommended Hosting Providers**:
- **Namecheap**: Affordable, includes domain + hosting
- **Hostinger**: Very cheap for beginners
- **SiteGround**: Excellent support

**Steps**:
1. Buy a domain (e.g., `charistechnologies.com.ng`)
2. Buy hosting or use free hosting from domain provider
3. Upload files via FTP or hosting control panel
4. Point your domain to the hosting

---

## 📄 IMPORTANT FILES

### style.css
- Contains ALL styling for the website
- Includes responsive breakpoints for mobile, tablet, and desktop
- Uses CSS variables for easy color customization
- **Don't delete or rename this file**

### script.js
- Handles mobile navigation menu
- Form validation
- Smooth scrolling
- Animations and interactivity
- **Don't delete or rename this file**

### index.html
- The landing page (first page visitors see)
- Most important page for SEO
- **This should be your main entry point**

---

## ✨ FEATURES

### 🎨 Design Features
- ✅ Modern, professional design
- ✅ Smooth animations and transitions
- ✅ Interactive hover effects
- ✅ Clean, readable typography
- ✅ Consistent color scheme

### 📱 Responsive Features
- ✅ Mobile-first design approach
- ✅ Hamburger menu for mobile devices
- ✅ Touch-friendly buttons and links
- ✅ Optimized images for all screen sizes
- ✅ Flexible layouts that adapt to any device

### 🎯 Interactive Features
- ✅ Smooth scroll navigation
- ✅ Contact form with validation
- ✅ Image gallery with lightbox
- ✅ Back-to-top button
- ✅ Active page highlighting in navigation

### 🔍 SEO Features
- ✅ Proper meta tags on all pages
- ✅ Semantic HTML structure
- ✅ Alt tags for images
- ✅ Fast loading performance
- ✅ Mobile-friendly (Google ranking factor)

---

## 🌍 BROWSER COMPATIBILITY

This website works on:
- ✅ Google Chrome (recommended)
- ✅ Mozilla Firefox
- ✅ Safari
- ✅ Microsoft Edge
- ✅ Opera
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📞 NEED HELP?

### Testing Checklist
Before going live, test:
- [ ] All navigation links work
- [ ] All images display correctly
- [ ] Logo appears on all pages
- [ ] Contact form submits (or displays confirmation)
- [ ] Mobile menu works on small screens
- [ ] All social media links are correct
- [ ] Phone number and email are correct
- [ ] Website looks good on mobile phone
- [ ] Website looks good on tablet
- [ ] Website looks good on desktop

### Common Issues

**Logo not showing?**
- Make sure logo.png is in the `assets/` folder
- Check that the filename is exactly `logo.png` (lowercase)

**Images not showing?**
- Verify images are in the `assets/` folder
- Check image filenames match exactly (case-sensitive)
- Make sure image formats are supported (.jpg, .png, .webp)

**Mobile menu not working?**
- Make sure `script.js` is linked correctly in your HTML
- Check browser console for errors (F12 → Console tab)

**Colors look wrong?**
- Edit the CSS variables in `style.css` (lines 18-31)

---

## 🎓 NEXT STEPS

1. **Add Your Logo**: This is the most important first step
2. **Add Program Images**: Use photos from your actual training sessions
3. **Update Contact Info**: Replace all placeholder contact details
4. **Test Thoroughly**: Click every link, test every page
5. **Choose Hosting**: Deploy to Netlify, GitHub Pages, or paid hosting
6. **Get a Domain**: Consider `charistechnologies.com.ng`
7. **SEO Setup**: Submit to Google Search Console
8. **Analytics**: Add Google Analytics to track visitors

---

## 🙏 FINAL NOTES

This website is **100% ready to deploy**. All you need to do is:
1. Add your images (especially the logo)
2. Update contact information
3. Upload to a hosting service

The code is clean, professional, and follows modern web development best practices. Your website will look great on all devices and will help you reach more students and clients.

**Good luck with Charis Technologies! 🚀**

*"Empowering Generations Through Technology"*

---

**Created with care for Lawrence Adetunji and Charis Technologies**
**© 2025 Charis Technologies. All rights reserved.**
