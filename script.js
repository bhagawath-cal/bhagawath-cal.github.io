document.addEventListener('DOMContentLoaded', function() {
    
    // --- Sidenav Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidenav = document.getElementById('mySidenav');
    const mainContent = document.getElementById('main');
    
    if (menuToggle && sidenav && mainContent) {
        menuToggle.addEventListener('click', () => {
            sidenav.classList.toggle('open');
            mainContent.classList.toggle('shifted');
        });
    }

    // --- Theme Switcher ---
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.getElementById('main-body');
    
    if (themeSwitcher && body) {
        const currentTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Set initial theme
        if (currentTheme === 'light') {
            body.setAttribute('data-theme', 'light');
        } else if (currentTheme === 'dark') {
            body.removeAttribute('data-theme');
        } else if (prefersDark) {
            body.removeAttribute('data-theme');
        } else {
            body.setAttribute('data-theme', 'light');
        }

        // Add click listener
        themeSwitcher.addEventListener('click', () => {
            if (body.getAttribute('data-theme') === 'light') {
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                body.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // --- Profile Picture Slideshow ---
    const profileImages = document.querySelectorAll('.profile-image');
    let currentImageIndex = 0;

    function nextImage() {
        if (profileImages.length === 0) return;

        profileImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % profileImages.length;
        profileImages[currentImageIndex].classList.add('active');
    }

    // Start slideshow only if there's more than one image
    if (profileImages.length > 1) {
        setInterval(nextImage, 5000); // Change image every 5 seconds
    } else if (profileImages.length === 1) {
        profileImages[0].classList.add('active'); // Ensure single image is visible
    }


    // --- Skills Section Stepper ---
    const skillSteps = document.querySelectorAll('.stepper-step');
    if (skillSteps.length > 0) {
        const skillGroups = document.querySelectorAll('.skill-group');
        const skillCategoryTitle = document.getElementById('skill-category-title');
        const stepperProgress = document.getElementById('stepper-progress');
        
        const categoryNames = ["Languages & Scripting", "Databases & Backend", "ML & Data Processing", "Cloud & DevOps", "Programming Concepts", "Quantum & Advanced AI", "Finance & Corporate", "IDEs & Operating Systems"];
        const progressWidths = ["0%", "14.2%", "28.5%", "42.8%", "57.1%", "71.4%", "85.7%", "100%"];

        function switchSkillCategory(targetStep) {
            if (!targetStep) return;
            const stepIndex = parseInt(targetStep) - 1;

            if (skillCategoryTitle) skillCategoryTitle.textContent = categoryNames[stepIndex];
            if (stepperProgress) stepperProgress.style.width = progressWidths[stepIndex];
            
            skillSteps.forEach(step => step.classList.remove('active'));
            const activeStep = document.querySelector(`.stepper-step[data-step='${targetStep}']`);
            if (activeStep) activeStep.classList.add('active');

            skillGroups.forEach(group => group.classList.remove('active'));
            const activeGroup = document.querySelector(`.skill-group[data-group='${targetStep}']`);
            if (activeGroup) activeGroup.classList.add('active');
        }

        skillSteps.forEach(step => {
            step.addEventListener('click', () => {
                switchSkillCategory(step.dataset.step);
            });
        });

        switchSkillCategory("1");
    }

    // --- Certifications Accordion ---
    const collapsibles = document.querySelectorAll('.collapsible');
    collapsibles.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content) {
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            }
        });
    });

    // --- Background Animation Controls ---

    // 1. Logic for the Wand Cycler Button
    const bgCyclerBtn = document.getElementById('bg-cycler-btn');
    if (bgCyclerBtn) {
        bgCyclerBtn.addEventListener('click', () => {
            if (typeof cycleBackgroundAnimation === 'function') {
                cycleBackgroundAnimation();
            }
        });
    }

    // 2. Logic for the Dropdown Selector Menu
    const bgSelectorBtn = document.getElementById('bg-selector-btn');
    const bgOptions = document.getElementById('bg-options');

    if (bgSelectorBtn && bgOptions) {
        // Toggle the menu when the arrow button is clicked
        bgSelectorBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            bgOptions.classList.toggle('show');
        });

        // Set the animation when a dropdown option is clicked
        bgOptions.querySelectorAll('li').forEach(option => {
            option.addEventListener('click', (event) => {
                const selectedMode = event.currentTarget.dataset.mode;
                if (typeof setAnimationMode === 'function') {
                    setAnimationMode(selectedMode);
                }
                bgOptions.classList.remove('show');
            });
        });

        // UPDATED: Close the dropdown if the user clicks anywhere else
        window.addEventListener('click', (event) => {
            // Check if the click was outside the new main container
            if (!event.target.closest('#bg-controls-container')) {
                if (bgOptions.classList.contains('show')) {
                    bgOptions.classList.remove('show');
                }
            }
        });
    }


    // --- Photography Lightbox ---
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const galleryImages = document.querySelectorAll('.photo-item img');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.querySelector('.lightbox-close');

        if (galleryImages.length > 0 && lightboxImg && lightboxClose) {
            galleryImages.forEach(image => {
                image.addEventListener('click', () => {
                    lightboxImg.src = image.src;
                    lightbox.classList.remove('lightbox-hidden');
                });
            });

            lightboxClose.addEventListener('click', () => {
                lightbox.classList.add('lightbox-hidden');
            });

            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.classList.add('lightbox-hidden');
                }
            });
        }
    }
});