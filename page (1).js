// ============================================================
//  page.js — Shared JS for all ERTS category pages
// ============================================================

// ===========================
// RENDER LISTINGS (category pages only)
// ===========================
function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
}

function createCard(item, index) {
    return `
        <div class="listing-card" style="animation: fadeUp 0.5s ${index * 0.07}s ease both;">
            <div class="card-img-placeholder">${item.emoji}</div>
            <div class="card-body">
                <span class="card-tag" style="background:${hexToRgba(item.tagColor, 0.15)};color:${item.tagColor};">
                    ${item.tag}
                </span>
                <h3>${item.name}</h3>
                <p class="card-location">📍 ${item.location}</p>
                <div class="card-meta">
                    <div class="card-price">${item.price} <span>${item.unit}</span></div>
                    <div class="card-rating">⭐ ${item.rating.toFixed(1)}</div>
                </div>
                <button class="card-contact" onclick="contactPlace('${item.name}', '${item.contact}')">
                    📞 Contact / Details
                </button>
            </div>
        </div>
    `;
}

function renderCards(data) {
    const grid = document.getElementById('listing-grid');
    const noResult = document.getElementById('no-results');
    if (!grid) return;

    if (data.length === 0) {
        grid.innerHTML = '';
        noResult.style.display = 'block';
        return;
    }
    noResult.style.display = 'none';
    grid.innerHTML = data.map((item, i) => createCard(item, i)).join('');
}

function extractNumber(str) {
    const num = str.replace(/[^0-9]/g, '');
    return num ? parseInt(num) : 0;
}

function filterListings() {
    if (typeof SECTION_KEY === 'undefined') return;

    const query = document.getElementById('search-input').value.toLowerCase().trim();
    const sortVal = document.getElementById('filter-sort').value;

    let filtered = listingsData[SECTION_KEY].filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.tag.toLowerCase().includes(query)
    );

    if (sortVal === 'low') filtered.sort((a, b) => extractNumber(a.price) - extractNumber(b.price));
    if (sortVal === 'high') filtered.sort((a, b) => extractNumber(b.price) - extractNumber(a.price));
    if (sortVal === 'rating') filtered.sort((a, b) => b.rating - a.rating);

    renderCards(filtered);
}

function contactPlace(name, contact) {
    showToast(`📞 ${name}: ${contact}`);
}

// ===========================
// AUTO-LOAD on category pages
// ===========================
if (typeof SECTION_KEY !== 'undefined' && typeof listingsData !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
        renderCards(listingsData[SECTION_KEY]);
    });
}

// ===========================
// AUTH (login.html)
// ===========================
function switchTab(tab) {
    const loginForm = document.getElementById('form-login');
    const registerForm = document.getElementById('form-register');
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    if (!loginForm) return;

    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
    } else {
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
    }
}

function handleLogin() {
    const email = document.querySelector('#form-login input[type="email"]').value.trim();
    const pass = document.querySelector('#form-login input[type="password"]').value.trim();
    if (!email || !pass) return showToast('⚠️ Please fill in all fields.');
    if (!validateEmail(email)) return showToast('⚠️ Please enter a valid email address.');
    showToast('✅ Login successful! Welcome back.');
}

function handleRegister() {
    const inputs = document.querySelectorAll('#form-register input');
    let allFilled = true;
    inputs.forEach(i => { if (!i.value.trim()) allFilled = false; });
    if (!allFilled) return showToast('⚠️ Please fill in all fields.');

    const passwords = document.querySelectorAll('#form-register input[type="password"]');
    if (passwords[0].value !== passwords[1].value) return showToast('⚠️ Passwords do not match!');
    showToast('🎓 Account created! Welcome to ERTS.');
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===========================
// TOAST
// ===========================
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
}

// ===========================
// HAMBURGER (mobile)
// ===========================
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
        document.querySelectorAll('.right ul li a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }
});