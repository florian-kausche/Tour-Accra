document.getElementById('login-btn').addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Send login request to the server
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            // Redirect to the route that serves the collections
            window.location.href = '/places';
        } else {
            // Handle login error
            const data = await response.json();
            alert(data.message);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred. Please try again later.');
    }
});

document.getElementById('github-login-btn').addEventListener('click', () => {
    window.location.href = '/auth/github';
});