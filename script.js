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

    // Hamburger Menu (Mobile)
    setupHamburger();
});

// ==================== 1. NAVIGATION & SMOOTH SCROLLING ====================
function setupNavigation() {
    // All nav links
    const navLinks = document.querySelectorAll('.nav ul li a');
    const footerButtons = document.querySelectorAll('.footer-content button');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const target = this.getAttribute('href');

            // Allow actual page navigation for links that are not anchors
            if (!target.startsWith('#')) {
                // Let the default navigation happen
                return;
            }

            // Handle anchor links
            e.preventDefault();
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
    const email = document.querySelector('#form-login input[type="email"]').value.trim();
    const pass = document.querySelector('#form-login input[type="password"]').value.trim();
    if (!email || !pass) return showFormMessage('⚠️ Please fill in all fields.');
    if (!validateEmail(email)) return showFormMessage('⚠️ Please enter a valid email address.');

    const result = Auth.login(email, pass);
    if (result.success) {
        showFormMessage(`✅ Welcome back, ${result.user.firstName}!`);
        // Update UI immediately
        setTimeout(() => {
            location.reload();
        }, 1000);
    } else {
        showFormMessage(result.message);
    }
}

function handleRegister() {
    const inputs = document.querySelectorAll('#form-register input');
    let allFilled = true;
    inputs.forEach(i => { if (!i.value.trim()) allFilled = false; });
    if (!allFilled) return showFormMessage('⚠️ Please fill in all fields.');

    const passwords = document.querySelectorAll('#form-register input[type="password"]');
    if (passwords[0].value !== passwords[1].value) return showFormMessage('⚠️ Passwords do not match!');

    const firstName = inputs[0].value.trim();
    const lastName = inputs[1].value.trim();
    const email = inputs[2].value.trim();
    const college = inputs[3].value.trim();
    const password = passwords[0].value;

    const result = Auth.register(firstName, lastName, email, college, password);
    if (result.success) {
        showFormMessage(`🎓 Account created! Welcome, ${firstName}!`);
        // Switch to login tab after successful registration and scroll to form
        setTimeout(() => {
            switchTab('login');
            // Clear form fields
            inputs.forEach(input => input.value = '');
            // Scroll to login form
            const loginSection = document.getElementById('page-login');
            if (loginSection) {
                loginSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 1500);
    } else {
        showFormMessage(result.message);
    }
}

function showFormMessage(message) {
    const container = document.querySelector('.auth-container');
    if (!container) return;
    const existing = container.querySelector('.form-message');
    if (existing) existing.remove();
    const msg = document.createElement('div');
    msg.className = 'form-message';
    msg.textContent = message;
    msg.style.cssText = 'background:rgba(255,140,0,0.15);color:darkorange;padding:12px;border-radius:8px;margin-top:16px;font-size:0.9rem;font-weight:600;text-align:center;';
    container.appendChild(msg);
    setTimeout(() => msg.remove(), 3500);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function switchTab(tab) {
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');

    if (tab === 'login') {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        formLogin.classList.remove('hidden');
        formRegister.classList.add('hidden');
    } else {
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        formRegister.classList.remove('hidden');
        formLogin.classList.add('hidden');
    }
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

// ==================== NEW FEATURES FUNCTIONS ====================

// Study Resources Functions
function showResourceMessage(type) {
    const messages = {
        'notes': '📚 Study Notes section coming soon! Notes will be available after login.',
        'pdfs': '📄 PDFs & Books section coming soon! Materials will be available after login.',
        'papers': '📝 Previous Year Papers section coming soon! Papers will be available after login.',
        'links': '🔗 Important Links section coming soon! Links will be available after login.'
    };
    alert(messages[type] || 'Coming soon!');
}

// Job/Internship Functions
function showJobMessage(type) {
    const messages = {
        'web-dev': '💼 Application submitted for Web Development Intern! We will contact you soon.',
        'content': '✍️ Application submitted for Content Writer position! We will contact you soon.',
        'data': '📊 Application submitted for Data Analysis Intern! We will contact you soon.',
        'tutor': '👨‍🏫 Application submitted for Tutor position! We will contact you soon.'
    };
    alert(messages[type] || 'Application submitted!');
}

// Budget Planner Functions
function calculateBudget() {
    const totalBudget = parseFloat(document.getElementById('total-budget').value) || 0;
    const rent = parseFloat(document.getElementById('rent-budget').value) || 0;
    const food = parseFloat(document.getElementById('food-budget').value) || 0;
    const transport = parseFloat(document.getElementById('transport-budget').value) || 0;
    const study = parseFloat(document.getElementById('study-budget').value) || 0;
    const other = parseFloat(document.getElementById('other-budget').value) || 0;

    const totalExpenses = rent + food + transport + study + other;
    const remaining = totalBudget - totalExpenses;

    document.getElementById('display-total').textContent = `₹${totalBudget.toLocaleString()}`;
    document.getElementById('display-expenses').textContent = `₹${totalExpenses.toLocaleString()}`;
    document.getElementById('display-remaining').textContent = `₹${remaining.toLocaleString()}`;

    const percentage = totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0;
    document.getElementById('budget-fill').style.width = `${Math.min(percentage, 100)}%`;

    const messageElement = document.getElementById('budget-message');
    if (remaining < 0) {
        messageElement.textContent = '⚠️ Warning: You are over budget by ₹' + Math.abs(remaining).toLocaleString();
        messageElement.style.color = '#ff4757';
    } else if (remaining < totalBudget * 0.1) {
        messageElement.textContent = '⚠️ Caution: You have very little budget remaining.';
        messageElement.style.color = '#ffa502';
    } else {
        messageElement.textContent = '✅ Great! You are within your budget.';
        messageElement.style.color = '#2ed573';
    }

    document.getElementById('budget-result').style.display = 'block';
}

// Smart Recommendation System
function getRecommendations() {
    const category = document.getElementById('rec-category').value;
    const budget = parseFloat(document.getElementById('rec-budget').value) || 0;
    const location = document.getElementById('rec-location').value;

    const recommendations = {
        'pg': [
            'Student PG Near College - ₹4,500/month',
            'Cozy Living PG - ₹5,000/month',
            'Budget Stay PG - ₹3,500/month'
        ],
        'mess': [
            'Home Style Mess - ₹2,500/month',
            'Student Tiffin Service - ₹2,000/month',
            'Quality Food Mess - ₹3,000/month'
        ],
        'coaching': [
            'Excellence Coaching Center - ₹3,000/month',
            'Success Academy - ₹2,500/month',
            'Smart Learning Hub - ₹3,500/month'
        ],
        'library': [
            'Central Library - Free for students',
            'Study Hall Library - ₹500/month',
            'Quiet Zone Library - ₹800/month'
        ]
    };

    const recList = document.getElementById('rec-list');
    recList.innerHTML = '';

    const categoryRecs = recommendations[category] || [];
    categoryRecs.forEach(rec => {
        const item = document.createElement('div');
        item.className = 'rec-item';
        item.textContent = rec;
        recList.appendChild(item);
    });

    document.getElementById('rec-results').style.display = 'block';
}

// ==================== HAMBURGER MENU (MOBILE) ====================
function setupHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when clicking on a nav link
        const navLinks = navMenu.querySelectorAll('ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('open');
                navMenu.classList.remove('open');
            }
        });
    }
}
