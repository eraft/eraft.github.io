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
    renderExtensions();
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
    renderExtensions();
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

function t(key) {
    return getNestedTranslation(translations[currentLanguage], key) || key;
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

    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// ===== Rendering =====
function renderExtensions() {
    const grid = document.getElementById('extensions-grid');
    if (!grid) return;

    grid.innerHTML = '';

    extensionsData.forEach(extension => {
        const card = createExtensionCard(extension);
        grid.appendChild(card);
    });
}

function createExtensionCard(extension) {
    const card = document.createElement('div');
    card.className = 'extension-card';
    card.onclick = () => openModal(extension);

    const extData = translations[currentLanguage]?.extensions?.[extension.id] || {};
    const screenshot = extension.screenshot?.[currentLanguage] || extension.screenshot?.en;

    card.innerHTML = `
        <div class="card-header">
            <img src="${extension.icon}" alt="${extension.name}" class="card-icon">
            <div class="card-title-group">
                <h3 class="card-title">${extension.name}</h3>
                <p class="card-version">v${extension.version}</p>
            </div>
        </div>
        <p class="card-tagline">${extData.tagline || ''}</p>
        ${screenshot ? `<img src="${screenshot}" alt="${extension.name} screenshot" class="card-screenshot">` : ''}
        <div class="card-meta">
            <span class="meta-badge">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1L9 5L13 5.5L10 8.5L10.5 13L7 11L3.5 13L4 8.5L1 5.5L5 5L7 1Z" fill="currentColor"/>
                </svg>
                ${extension.languages} ${t('site.languages')}
            </span>
            <span class="meta-badge">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2v10M4 2v10M2 5h10M2 9h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                ${t(`categories.${extension.category}`)}
            </span>
        </div>
        <div class="card-actions">
            <a href="${extension.chromeWebStoreUrl}" class="button button-primary" onclick="event.stopPropagation()" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2v10m0 0l-3-3m3 3l3-3M3 11v1a2 2 0 002 2h6a2 2 0 002-2v-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                ${t('site.installButton')}
            </a>
            <button class="button button-secondary" onclick="event.stopPropagation(); openModal(extensionsData.find(e => e.id === '${extension.id}'))">
                ${t('site.viewDetails')}
            </button>
        </div>
    `;

    return card;
}

// ===== Modal =====
function openModal(extension) {
    const modal = document.getElementById('extension-modal');
    if (!modal) return;

    const extData = translations[currentLanguage]?.extensions?.[extension.id] || {};
    const video = extension.video?.[currentLanguage] || extension.video?.en;

    // Update modal content
    document.getElementById('modal-icon').src = extension.icon;
    document.getElementById('modal-title').textContent = extension.name;
    document.getElementById('modal-tagline').textContent = extData.tagline || '';
    document.getElementById('modal-description').textContent = extData.description || '';
    document.getElementById('modal-version').textContent = extension.version;
    document.getElementById('modal-languages').textContent = extension.languages;
    document.getElementById('modal-privacy').textContent = extData.privacy || '';

    // Update video (YouTube iframe)
    const videoElement = document.getElementById('modal-video');
    if (video && videoElement) {
        videoElement.src = video;
    }

    // Update features list
    const featuresList = document.getElementById('modal-features');
    if (featuresList && extData.features) {
        featuresList.innerHTML = extData.features.map(feature => `<li>${feature}</li>`).join('');
    }

    // Update install button
    const installButton = document.getElementById('modal-install-button');
    if (installButton) {
        installButton.href = extension.chromeWebStoreUrl;
    }

    // Update changelog
    const changelogSection = document.getElementById('changelog-section');
    const changelogPageLink = document.getElementById('changelog-page-link');

    if (extension.changelog) {
        // Check if changelog exists for any language
        const hasChangelog = (extension.changelog.ja && extension.changelog.ja.length > 0) ||
                            (extension.changelog.en && extension.changelog.en.length > 0) ||
                            (Array.isArray(extension.changelog) && extension.changelog.length > 0);

        if (hasChangelog) {
            // Setup changelog page link
            changelogPageLink.href = `changelog-${extension.id}.html`;
            changelogSection.style.display = 'block';
        } else {
            changelogSection.style.display = 'none';
        }
    } else {
        changelogSection.style.display = 'none';
    }

    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('extension-modal');
    if (!modal) return;

    modal.style.display = 'none';
    document.body.style.overflow = '';

    // Stop YouTube video by clearing src
    const video = document.getElementById('modal-video');
    if (video) {
        video.src = '';
    }
}

// Make openModal available globally for onclick attributes
window.openModal = openModal;
window.extensionsData = extensionsData;
