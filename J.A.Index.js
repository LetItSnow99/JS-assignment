const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
const loginLink = document.getElementById('loginLink');
const logoutLink = document.getElementById('logoutLink');
const userEmailDisplay = document.getElementById('user-email');
const postsContainer = document.getElementById('posts-container');

if (loggedInUser) {
    userEmailDisplay.textContent = loggedInUser.email;
    loginLink.style.display = 'none';
    logoutLink.style.display = 'block';
} else {
    userEmailDisplay.textContent = 'guest@example.com';
    loginLink.style.display = 'block';
    logoutLink.style.display = 'none';
}

if (logoutLink) {
    logoutLink.addEventListener('click', function () {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'J.A.Login.html';
    });
}

function loadPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
            posts.slice(0, 12).forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post-item');
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.body.substring(0, 100)}...</p>
                    <a href="J.A.SinglePost.html?id=${post.id}" class="read-more">Read more</a>
                `;
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
            postsContainer.innerHTML = `<p>Failed to load posts. Please try again later.</p>`;
        });
}

loadPosts();
