document.addEventListener('DOMContentLoaded', function() {
    
    // --- Sidenav Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidenav = document.getElementById('mySidenav');
    const mainContent = document.getElementById('main');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidenav.classList.toggle('open');
            mainContent.classList.toggle('shifted');
        });
    }

    // --- Theme Switcher ---
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.getElementById('main-body');
    const currentTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (currentTheme === 'light') {
        body.setAttribute('data-theme', 'light');
    } else if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
    } else if (prefersDark) {
        body.removeAttribute('data-theme');
    } else {
        body.setAttribute('data-theme', 'light');
    }

    if (themeSwitcher) {
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
    const skillGroups = document.querySelectorAll('.skill-group');
    const skillCategoryTitle = document.getElementById('skill-category-title');
    const stepperProgress = document.getElementById('stepper-progress');
    
    // Updated for eight categories
    const categoryNames = ["Languages & Scripting", "Databases & Backend", "ML & Data Processing", "Cloud & DevOps", "Programming Concepts", "Quantum & Advanced AI", "Finance & Corporate", "IDEs & Operating Systems"];
    const progressWidths = ["0%", "14.2%", "28.5%", "42.8%", "57.1%", "71.4%", "85.7%", "100%"];

    function switchSkillCategory(targetStep) {
        const stepIndex = parseInt(targetStep) - 1;

        // Update Category Title
        skillCategoryTitle.textContent = categoryNames[stepIndex];

        // Update Progress Bar
        stepperProgress.style.width = progressWidths[stepIndex];
        
        // Update Active Step Icon
        skillSteps.forEach(step => {
            step.classList.remove('active');
            if(step.dataset.step === targetStep) {
                step.classList.add('active');
            }
        });

        // Update Active Skill Group
        skillGroups.forEach(group => {
            group.classList.remove('active');
            if(group.dataset.group === targetStep) {
                group.classList.add('active');
            }
        });
    }

    skillSteps.forEach(step => {
        step.addEventListener('click', () => {
            switchSkillCategory(step.dataset.step);
        });
    });

    // Initialize the first category
    switchSkillCategory("1");
});