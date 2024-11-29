const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const repeatPassword = document.getElementById('repeat-password').value.trim();

    console.log('Registration data:', { email, password, repeatPassword });

    if (!email || !password || !repeatPassword) {
        alert('All fields are required!');
        return;
    }

    if (password !== repeatPassword) {
        alert('Passwords do not match!');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Current users in localStorage:', users);

    const userExists = users.some(user => user.email === email);
    if (userExists) {
        alert('User with this email already exists!');
        return;
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    console.log('Updated users in localStorage:', users);

    alert('Registration successful! You can now login.');
    window.location.href = 'J.A.Login.html';
});
