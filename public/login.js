document.getElementById('login-btn').addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Send login request to the server
    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        // Redirect to the dashboard or another page
        window.location.href = '/dashboard.html';
    } else {
        // Handle login error
        const data = await response.json();
        alert(data.message);
    }
});

document.getElementById('github-login-btn').addEventListener('click', () => {
    window.location.href = '/auth/github';
});