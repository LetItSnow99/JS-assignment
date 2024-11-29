const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const enteredEmail = document.getElementById('email').value.trim();
    const enteredPassword = document.getElementById('password').value.trim();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.email === enteredEmail && user.password === enteredPassword);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('Login successful!');
        window.location.href = 'J.A.Index.html';
    } else {
        alert('Invalid email or password!');
    }
});
