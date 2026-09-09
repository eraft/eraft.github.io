// ===== Global State =====
let extensionsData = [];
let currentLanguage = 'ja';
let translations = {};
let isDarkMode = false;

// ===== Constants =====
const SUPPORTED_LANGUAGES = ['ja', 'en'];
const STORAGE_KEYS = {
    LANGUAGE: 'preferred-language',
    THEME: 'preferred-theme'
};

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', async () => {
    await loadExtensionsData();
    await loadTranslations();
    initializeLanguage();
    initializeTheme();
    setupEventListeners();
    renderChangelog();
    updatePageLanguage();
    updateCopyrightYear();
});

// ===== Update Copyright Year =====
function updateCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ===== Data Loading =====
async function loadExtensionsData() {
    try {
        const response = await fetch('extensions.json');
        extensionsData = await response.json();
    } catch (error) {
        console.error('Failed to load extensions data:', error);
        extensionsData = [];
    }
}

async function loadTranslations() {
    try {
        const promises = SUPPORTED_LANGUAGES.map(async (lang) => {
            const response = await fetch(`locales/${lang}.json`);
            const data = await response.json();
            translations[lang] = data;
        });
        await Promise.all(promises);
    } catch (error) {
        console.error('Failed to load translations:', error);
    }
}

// ===== Language Management =====
function initializeLanguage() {
    const savedLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    const browserLanguage = detectBrowserLanguage();

    currentLanguage = savedLanguage || browserLanguage;

    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = currentLanguage;
    }
}

function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0];

    return SUPPORTED_LANGUAGES.includes(langCode) ? langCode : 'ja';
}

function changeLanguage(lang) {
    if (!SUPPORTED_LANGUAGES.includes(lang)) return;

    currentLanguage = lang;
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);

    updatePageLanguage();
    renderChangelog();
}

function updatePageLanguage() {
    const t = translations[currentLanguage];
    if (!t) return;

    // Update document language
    document.documentElement.lang = currentLanguage;

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedTranslation(t, key);
        if (translation) {
            element.textContent = translation;
        }
    });
}

function getNestedTranslation(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

// ===== Theme Management =====
function initializeTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    isDarkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);
    applyTheme();
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem(STORAGE_KEYS.THEME, isDarkMode ? 'dark' : 'light');
    applyTheme();
}

function applyTheme() {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');

    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');

    if (moonIcon && sunIcon) {
        moonIcon.style.display = isDarkMode ? 'none' : 'block';
        sunIcon.style.display = isDarkMode ? 'block' : 'none';
    }
}

// ===== Event Listeners =====
function setupEventListeners() {
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    }

    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleTheme);
    }
}

// ===== Changelog Rendering =====
function renderChangelog() {
    // Get extension ID from URL
    const pathParts = window.location.pathname.split('/');
    const filename = pathParts[pathParts.length - 1];
    const extensionId = filename.replace('changelog-', '').replace('.html', '');

    // Find extension data
    const extension = extensionsData.find(ext => ext.id === extensionId);
    if (!extension || !extension.changelog) {
        const noChangelogText = currentLanguage === 'ja' ? '変更履歴がありません。' : 'No changelog available.';
        document.getElementById('changelog-content').innerHTML = `<p>${noChangelogText}</p>`;
        return;
    }

    // Get changelog for current language
    const changelog = extension.changelog[currentLanguage] || extension.changelog['ja'] || [];

    // Render changelog items
    const content = document.getElementById('changelog-content');
    content.innerHTML = changelog.map(entry => `
        <div class="changelog-page-item">
            <div class="changelog-page-item-header">
                <span class="changelog-page-version">v${entry.version}</span>
                <span class="changelog-page-date">${entry.date}</span>
            </div>
            <ul class="changelog-page-changes">
                ${entry.changes.map(change => `<li>${change}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}
