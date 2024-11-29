const defaultImage = 'https://www.transparentpng.com/thumb/user/blak-frame-user-profile-png-icon--cupR3D.png';
let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || null;

const userEmailDisplay = document.getElementById('user-email');
const profileEmailDisplay = document.getElementById('profile-email');
const userImage = document.getElementById('user-image');
const changeImageButton = document.getElementById('change-image-button');
const deleteImageButton = document.getElementById('delete-image-button');
const changePasswordButton = document.getElementById('change-password-button');
const confirmPasswordChangeButton = document.getElementById('confirm-password-change');
const modal = document.getElementById('change-password-modal');
const closeModalButton = document.getElementById('close-modal');
const authLink = document.getElementById('auth-link');

function updateAuthLink() {
    if (loggedInUser) {
        authLink.textContent = 'Logout ✖';
        authLink.href = '#';
        authLink.addEventListener('click', logoutUser);
    } else {
        authLink.textContent = 'Login ↪';
        authLink.href = 'J.A.Login.html';
        authLink.removeEventListener('click', logoutUser);
    }
}

function logoutUser(event) {
    event.preventDefault();
    localStorage.removeItem('loggedInUser');
    loggedInUser = null;
    window.location.href = 'J.A.Login.html';
}

function updateProfile() {
    if (loggedInUser) {
        userEmailDisplay.textContent = loggedInUser.email;
        profileEmailDisplay.textContent = loggedInUser.email;
    } else {
        userEmailDisplay.textContent = 'guest@example.com';
        profileEmailDisplay.textContent = 'guest@example.com';
    }
}

changeImageButton.addEventListener('click', () => {
    const imageUrl = prompt('Enter the URL of the new image:');
    if (imageUrl) {
        userImage.src = imageUrl;
        alert('Profile image updated!');
    } else {
        userImage.src = defaultImage;
        alert('No image entered. Default image restored.');
    }
});

deleteImageButton.addEventListener('click', () => {
    userImage.src = defaultImage;
    alert('Profile image reset to default.');
});

confirmPasswordChangeButton.addEventListener('click', () => {
    const oldPassword = document.getElementById('old-password').value.trim();
    const newPassword = document.getElementById('new-password').value.trim();
    const repeatNewPassword = document.getElementById('repeat-new-password').value.trim();

    if (!loggedInUser || oldPassword !== loggedInUser.password) {
        alert('Old password is incorrect.');
        return;
    }

    if (newPassword !== repeatNewPassword) {
        alert('New passwords do not match.');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.email === loggedInUser.email);

    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
    }

    loggedInUser.password = newPassword;
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

    alert('Password successfully changed!');
    modal.classList.add('hidden');
});

changePasswordButton.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

closeModalButton.addEventListener('click', () => {
    modal.classList.add('hidden');
});

updateAuthLink();
updateProfile();
