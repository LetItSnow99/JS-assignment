const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || null;
const userEmailDisplay = document.getElementById('user-email');
const loginLink = document.getElementById('loginLink');
const logoutLink = document.getElementById('logoutLink');

if (loggedInUser) {
    userEmailDisplay.textContent = loggedInUser.email;
    loginLink.style.display = 'none';
    logoutLink.style.display = 'inline';
} else {
    userEmailDisplay.textContent = 'guest@example.com';
    loginLink.style.display = 'inline';
    logoutLink.style.display = 'none';
}

const logoutButton = document.getElementById('logout');
if (logoutButton) {
    logoutButton.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.removeItem('loggedInUser');
        window.location.href = 'J.A.Login.html';
    });
}

if (!postId) {
    document.body.innerHTML = '<h1>Error: No post ID provided in the URL</h1>';
} else {
    const postContainer = document.getElementById('post-container');

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch post data');
            }
            return response.json();
        })
        .then(post => {
            postContainer.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <a href="J.A.Index.html">← Back to Posts</a>
            `;
        })
        .catch(error => {
            console.error('Error fetching post:', error);
            postContainer.innerHTML = `<p>Could not load post details. Please try again later.</p>`;
        });
}
