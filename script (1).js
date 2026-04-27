// ERTS - Everything Required To Students
// JavaScript using ONLY your HTML classes & IDs

document.addEventListener('DOMContentLoaded', function () {
    console.log('ERTS JavaScript Loaded! 🚀');

    // Navigation & Smooth Scrolling
    setupNavigation();

    // Hero Section Buttons
    setupHeroButtons();

    // Category Cards (box-content)
    setupCategoryCards();

    // Login/Register Forms
    setupAuthForms();

    // Page Navigation (page-login)
    setupPageNavigation();

    // Scroll Animations
    setupScrollAnimations();

    // How it works section
    setupHowItWorks();
});

// ==================== 1. NAVIGATION & SMOOTH SCROLLING ====================
function setupNavigation() {
    // All nav links
    const navLinks = document.querySelectorAll('.nav ul li a');
    const footerButtons = document.querySelectorAll('.footer-content button');

    // Hero section nav link
    const homeLink = document.querySelector('.nav ul li a[href="#home"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');

            if (target === '#page-login') {
                showLoginPage();
            } else if (target === '#home') {
                scrollToHome();
            } else {
                scrollToExplore();
            }
        });
    });

    // Footer buttons
    footerButtons.forEach(button => {
        button.addEventListener('click', function () {
            scrollToExplore();
        });
    });
}

function scrollToHome() {
    const homeSection = document.getElementById('home');
    homeSection.scrollIntoView({ behavior: 'smooth' });
}

function scrollToExplore() {
    const exploreSection = document.getElementById('Explore');
    exploreSection.scrollIntoView({ behavior: 'smooth' });
}

// ==================== 2. HERO SECTION BUTTONS ====================
function setupHeroButtons() {
    // Explore Now button
    const exploreBtn = document.querySelector('.explore-btn');
    // Create Account button  
    const accountBtn = document.querySelector('.account-btn');
    // Student Login button
    const studentLogin = document.querySelector('.student-login');

    if (exploreBtn) {
        exploreBtn.addEventListener('click', function () {
            scrollToExplore();
        });
    }

    if (accountBtn) {
        accountBtn.addEventListener('click', function () {
            showLoginPage();
        });
    }

    if (studentLogin) {
        studentLogin.addEventListener('click', function () {
            showLoginPage();
        });
    }
}

// ==================== 3. CATEGORY CARDS (box-content) ====================
function setupCategoryCards() {
    const categoryBoxes = document.querySelectorAll('.categories .box-content');

    categoryBoxes.forEach(box => {
        // Hover effects
        box.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';

            // Arrow animation
            const arrow = this.querySelector('h2 span:last-child');
            if (arrow) {
                arrow.style.transform = 'translateX(5px)';
                arrow.style.transition = 'transform 0.3s ease';
            }
        });

        box.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';

            const arrow = this.querySelector('h2 span:last-child');
            if (arrow) {
                arrow.style.transform = 'translateX(0)';
            }
        });

        // Click effect
        box.addEventListener('click', function () {
            const categoryName = this.querySelector('h2').textContent.trim().split(' ')[0];
            showCategoryMessage(categoryName);
        });
    });
}

function showCategoryMessage(category) {
    const messages = {
        'Hostel': '🏩 Verified Hostels & PGs near colleges!',
        'Messs': '🍛 Budget-friendly Mess & Tiffins!',
        '24/7': '🏥 24/7 Hospitals & Clinics!',
        'Local': '🏛️ Temples, Ghats & Local Attractions!',
        'Nearby': '📚 Study Libraries & Reading Rooms!'
    };

    alert(messages[category] || `${category} listings coming soon!`);
}

// ==================== 4. LOGIN/REGISTER FORMS ====================
function setupAuthForms() {
    // Toggle buttons
    const btnLogin = document.getElementById('btnLogin');
    const btnRegister = document.getElementById('btnRegister');
    const formLogin = document.getElementById('formLogin');
    const formRegister = document.getElementById('formRegister');

    // Switch links
    const goRegister = document.getElementById('goRegister');
    const goLogin = document.getElementById('goLogin');

    // Form buttons
    const doLogin = document.getElementById('doLogin');
    const doRegister = document.getElementById('doRegister');

    // Toggle Login/Register
    if (btnLogin && btnRegister) {
        btnLogin.addEventListener('click', () => toggleForm('login', btnLogin, btnRegister, formLogin, formRegister));
        btnRegister.addEventListener('click', () => toggleForm('register', btnLogin, btnRegister, formLogin, formRegister));
    }

    // Switch links
    if (goRegister) goRegister.addEventListener('click', () => toggleForm('register', btnLogin, btnRegister, formLogin, formRegister));
    if (goLogin) goLogin.addEventListener('click', () => toggleForm('login', btnLogin, btnRegister, formLogin, formRegister));

    // Form submissions
    if (doLogin) doLogin.addEventListener('click', handleLogin);
    if (doRegister) doRegister.addEventListener('click', handleRegister);
}

function toggleForm(type, btnLogin, btnRegister, formLogin, formRegister) {
    if (type === 'login') {
        btnLogin.classList.add('active');
        btnRegister.classList.remove('active');
        formLogin.classList.add('active');
        formRegister.classList.remove('active');
    } else {
        btnRegister.classList.add('active');
        btnLogin.classList.remove('active');
        formRegister.classList.add('active');
        formLogin.classList.remove('active');
    }
}

function handleLogin() {
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const loginMsg = document.getElementById('loginMsg');

    if (!loginEmail.value || !loginPassword.value) {
        showFormMessage(loginMsg, 'Please fill all fields!', 'error');
        return;
    }

    // Simulate login
    loginMsg.textContent = 'Logging in...';
    loginMsg.className = 'form-msg loading';

    setTimeout(() => {
        showFormMessage(loginMsg, '✅ Login Successful! Welcome back!', 'success');
        setTimeout(hideLoginPage, 2000);
    }, 1500);
}

function handleRegister() {
    const regName = document.getElementById('regName');
    const regEmail = document.getElementById('regEmail');
    const regCollege = document.getElementById('regCollege');
    const regPassword = document.getElementById('regPassword');
    const registerMsg = document.getElementById('registerMsg');

    if (!regName.value || !regEmail.value || !regCollege.value || !regPassword.value) {
        showFormMessage(registerMsg, 'Please fill all fields!', 'error');
        return;
    }

    // Simulate register
    registerMsg.textContent = 'Creating account...';
    registerMsg.className = 'form-msg loading';

    setTimeout(() => {
        showFormMessage(registerMsg, `🎓 Welcome ${regName.value}! Account created!`, 'success');
        setTimeout(() => {
            toggleForm('login', document.getElementById('btnLogin'), document.getElementById('btnRegister'),
                document.getElementById('formLogin'), document.getElementById('formRegister'));
        }, 2000);
    }, 1500);
}

function showFormMessage(msgElement, message, type) {
    msgElement.textContent = message;
    msgElement.className = `form-msg ${type}`;
}

// ==================== 5. PAGE NAVIGATION (#page-login) ====================
function setupPageNavigation() {
    // Back to home link in footer of login page
    const backToHomeLinks = document.querySelectorAll('footer p a[data-page="page-home"]');
    backToHomeLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            hideLoginPage();
        });
    });
}

function showLoginPage() {
    const pageLogin = document.getElementById('page-login');
    pageLogin.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Smooth scroll to login page
    pageLogin.scrollIntoView({ behavior: 'smooth' });
}

function hideLoginPage() {
    const pageLogin = document.getElementById('page-login');
    pageLogin.style.display = 'none';
    document.body.style.overflow = 'auto';
    scrollToHome();
}

// ==================== 6. SCROLL ANIMATIONS ====================
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Observe your exact sections
    const animateElements = document.querySelectorAll('.box-content', '.sec-box', '.popular-categories', '.how-it-works');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ==================== 7. HOW IT WORKS SECTION ====================
function setupHowItWorks() {
    const secBoxes = document.querySelectorAll('.sec-box');

    secBoxes.forEach((box, index) => {
        box.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
        });

        box.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });
}

// ==================== 8. BUTTON HOVER EFFECTS (All buttons) ====================
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px)';
        this.style.transition = 'all 0.2s ease';
    });

    button.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// ==================== 9. WINDOW EVENTS ====================
window.addEventListener('load', function () {
    // Page load animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 200);
});

window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
        document.body.style.overflow = 'auto';
    }
});