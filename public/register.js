// document.addEventListener('DOMContentLoaded', () => {
//     const registerForm = document.getElementById('register-form');
//     const messageDiv = document.getElementById('message');

//     registerForm.addEventListener('submit', async (e) => {
//         e.preventDefault();

//         const username = document.getElementById('username').value;
//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;
//         const confirmPassword = document.getElementById('confirm-password').value;

//         // Basic validation
//         if (password !== confirmPassword) {
//             showMessage('Passwords do not match', 'error');
//             return;
//         }

//         try {
//             const response = await fetch('/api/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     username,
//                     email,
//                     password
//                 })
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 showMessage('Registration successful! Redirecting...', 'success');
//                 // Redirect to index page after successful registration
//                 setTimeout(() => {
//                     window.location.href = '/index.html';
//                 }, 1500); // Redirect after 1.5 seconds to show the success message
//             } else {
//                 showMessage(data.message || 'Registration failed', 'error');
//             }
//         } catch (error) {
//             showMessage('An error occurred during registration', 'error');
//             console.error('Registration error:', error);
//         }
//     });

//     function showMessage(message, type) {
//         messageDiv.textContent = message;
//         messageDiv.className = `message ${type}`;
//     }
// }); 

 // Event listener for the GitHub registration button
 document.getElementById('github-register-btn').addEventListener('click', () => {
    window.location.href = '/auth/github'; // Redirects the user to the GitHub registration URL
});

// Event listener for the email registration form submission
document.getElementById('email-register-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        const messageDiv = document.getElementById('message');
        messageDiv.classList.remove('hidden');
        messageDiv.classList.add('visible');
        messageDiv.textContent = data.message;

        if (response.ok) {
            console.log('Registration successful, redirecting...');
            setTimeout(() => {
                window.location.href = '/login.html';
            }, 2000);
        } else {
            console.error('Registration failed:', data.message);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        const messageDiv = document.getElementById('message');
        messageDiv.classList.remove('hidden');
        messageDiv.classList.add('visible');
        messageDiv.textContent = 'An error occurred. Please try again later.';
    }
});