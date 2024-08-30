const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () =>
    container.classList.add('right-panel-active')
);

signInButton.addEventListener('click', () =>
    container.classList.remove('right-panel-active')
);

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    loginForm.addEventListener('submit', (event) => {
        if (!validateLoginForm()) {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        if (!validateRegisterForm()) {
            return;
        }

        const name = document.getElementById('username').value;
        const email = document.getElementById('signupemail').value;
        const password = document.getElementById('signuppassword').value;

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => { throw new Error(data.error); });
            }
            return response.json(); // Attempt to parse JSON
        })
        .then(data => {
            if (data.success) {
                window.location.href = '/html/category.html';
            } else {
                alert('Registration failed: ' + data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    });

    const validateLoginForm = () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return false;
        }

        return true;
    };

    const validateRegisterForm = () => {
        const username = document.getElementById('username').value;
        const email = document.getElementById('signupemail').value;
        const password = document.getElementById('signuppassword').value;

        if (username.trim() === '') {
            alert('Please enter your name.');
            return false;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return false;
        }

        return true;
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };
});
