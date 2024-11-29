let photosShown = 0;
const photosPerPage = 18;
const galleryContainer = document.getElementById('gallery-container');
const loadMoreButton = document.getElementById('load-more');
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || null;
const userEmailDisplay = document.getElementById('user-email');
const authLink = document.getElementById('auth-link');

if (loggedInUser) {
    userEmailDisplay.textContent = loggedInUser.email;
    authLink.innerHTML = 'Logout ✖';
    authLink.href = '#';
    authLink.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'J.A.Login.html';
    });
} else {
    userEmailDisplay.textContent = 'guest@example.com';
    authLink.innerHTML = 'Login ↪';
    authLink.href = 'J.A.Login.html';
}

function loadMorePhotos() {
    fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(photos => {
            const nextPhotos = photos.slice(photosShown, photosShown + photosPerPage);
            nextPhotos.forEach(photo => {
                const photoElement = document.createElement('div');
                photoElement.classList.add('gallery-item');
                photoElement.innerHTML = `
                    <img src="${photo.thumbnailUrl}" alt="${photo.title}" loading="lazy">
                    <p>${photo.title}</p>
                `;
                galleryContainer.appendChild(photoElement);
            });

            photosShown += photosPerPage;

            if (photosShown >= photos.length) {
                loadMoreButton.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error fetching photos:', error);
            galleryContainer.innerHTML = `<p>Failed to load photos. Please try again later.</p>`;
        });
}

loadMorePhotos();

loadMoreButton.addEventListener('click', loadMorePhotos);
