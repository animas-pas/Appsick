// Auth related elements
const signInBtn = document.getElementById('signInBtn');
const signUpBtn = document.getElementById('signUpBtn');
const authModal = document.getElementById('authModal');
const closeAuthModal = document.getElementById('closeAuthModal');
const authTitle = document.getElementById('authTitle');
const authForm = document.getElementById('authForm');
const authSwitch = document.getElementById('authSwitch');
const authSwitchLink = document.getElementById('authSwitchLink');

let isSignIn = true;

function updateAuthUI() {
    authTitle.textContent = isSignIn ? 'Sign In' : 'Sign Up';
    authSwitch.textContent = isSignIn ? "Don't have an account? " : "Already have an account? ";
    authSwitchLink.textContent = isSignIn ? 'Sign Up' : 'Sign In';
}

signInBtn.addEventListener('click', () => {
    isSignIn = true;
    updateAuthUI();
    authModal.style.display = 'block';
});

signUpBtn.addEventListener('click', () => {
    isSignIn = false;
    updateAuthUI();
    authModal.style.display = 'block';
});

closeAuthModal.addEventListener('click', () => {
    authModal.style.display = 'none';
});

authSwitchLink.addEventListener('click', (e) => {
    e.preventDefault();
    isSignIn = !isSignIn;
    updateAuthUI();
});

authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = authForm.querySelector('input[type="email"]').value;
    const password = authForm.querySelector('input[type="password"]').value;

    // Here you would typically make an API call to handle authentication
    console.log(`${isSignIn ? 'Signing in' : 'Signing up'} with:`, { email });

    // For demo purposes, just close the modal
    authModal.style.display = 'none';
    authForm.reset();
});

// Mock data for apps
const apps = [
    {
        id: 1,
        name: "Anilab",
        description: "Anilab is your ultimate free anime hub, where you can watch and download anime completely free and unlimitedly. With no information required, you can right away jump into your favorite show without any commitment. There are thousands of titles available on Anilab and regular updates, making sure your thirst for anime can always be quenched. Download the app, find your favorite anime, tap play, and let the streaming begin. ",
        developer: "ProductivityLabs",
        category: "🎥 Entertainment",
        rating: 3,
        downloads: "2k+",
        price: 0,
        size: "16.2MB",
        screenshots: [
            "Anime.jpg",
            "Anime.jpg"
        ],
        deviceTypes: ["Phone", "Tablet", "Desktop"],
        icon: "logo.png",
        downloadlink: "AnilabApp.apk"
    }
    
];


// DOM Elements
const appGrid = document.getElementById('appGrid');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const categoryButtons = document.querySelectorAll('.category-btn');
const modal = document.getElementById('appDetailModal');
const closeModalBtn = modal.querySelector('.close-btn');

// Utility Functions
function formatNumber(num) {
    return num.toLocaleString();
}

function createStarRating(rating) {
    const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
    return `<span class="stars">${stars}</span>`;
}

// App Card Creation
function createAppCard(app) {
    const card = document.createElement('div');
    card.className = 'app-card';
    card.innerHTML = `
        <img src="${app.screenshots[0]}" alt="${app.name}" class="app-screenshot">
        <div class="app-info">
            <div class="app-header">
                <img src="${app.icon}" alt="${app.name} icon" class="app-icon">
                <div>
                    <div class="app-name">${app.name}</div>
                    <div class="app-developer">${app.developer}</div>
                </div>
            </div>
            <div class="rating">
                ${createStarRating(app.rating)}
                <span class="downloads">${formatNumber(app.downloads)} downloads</span>
            </div>
        </div>
    `;

    card.addEventListener('click', () => showAppDetails(app));
    return card;
}

// App Display Functions
function displayApps(appsToShow) {
    appGrid.innerHTML = '';
    appsToShow.forEach(app => {
        appGrid.appendChild(createAppCard(app));
    });
}

function filterAppsByCategory(category) {
    if (category === 'all') {
        return apps;
    }
    return apps.filter(app => app.category === category);
}

function searchApps(query) {
    const searchTerm = query.toLowerCase();
    return apps.filter(app =>
        app.name.toLowerCase().includes(searchTerm) ||
        app.description.toLowerCase().includes(searchTerm)
    );
}

// Modal Functions
function showAppDetails(app) {
    const modalContent = modal.querySelector('.app-detail-content');
    modalContent.innerHTML = `
        <div class="app-header">
            <img src="${app.icon}" alt="${app.name} icon" class="app-icon">
            <div>
                <h2 class="app-name">${app.name}</h2>
                <div class="app-developer">${app.developer}</div>
            </div>
        </div>
        <div class="screenshots">
            ${app.screenshots.map(src => `
                <img src="${src}" alt="${app.name} screenshot" style="width: 100%; margin-top: 1rem; border-radius: var(--radius);">
            `).join('')}
        </div>
        <div style="margin-top: 1rem;">
            <p>${app.description}</p>
            <div style="margin-top: 1rem;">
                <strong>Version:</strong> ${app.version}<br>
                <strong>Size:</strong> ${app.size}<br>
                <strong>Category:</strong> ${app.category}<br>
                <strong>Compatible with:</strong> ${app.deviceTypes.join(', ')}
            </div>
        </div>
        <button id="downloadButton">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download
        </button>
    `;

    const downloadBtn = document.getElementById('downloadButton');
    downloadBtn.onclick = () => {
        // Create a fake download progress
        downloadBtn.disabled = true;
        downloadBtn.innerHTML = `
            <svg class="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6"></path>
            </svg>
            Downloading...
        `;

        setTimeout(() => {
            downloadBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"></path>
                </svg>
                Downloaded
            `;

            // Create a notification
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = `${app.name} has been downloaded successfully!`;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.remove();
                // Reset button state
                downloadBtn.disabled = false;
                downloadBtn.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download
                `;
            }, 3000);
        }, 2000);
    };

    modal.style.display = 'block';
}

// Event Listeners
searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    displayApps(searchApps(query));
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value;
        displayApps(searchApps(query));
    }
});

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const category = button.dataset.category;
        displayApps(filterAppsByCategory(category));
    });
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Initial load
displayApps(apps);

// Add styles for the notification
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem;
        border-radius: var(--radius);
        animation: slide-in 0.3s ease-out;
        z-index: 1000;
    }

    @keyframes slide-in {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .animate-spin {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(style);