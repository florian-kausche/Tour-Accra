document.getElementById('login-btn').addEventListener('click', () => {
    window.location.href = '/auth/github'; // Redirect to GitHub login
});

document.getElementById('logout-btn').addEventListener('click', async () => {
    await fetch('/auth/logout', { method: 'GET' });
    window.location.href = '/'; // Redirect to login page
});

// Check authentication status on page load
window.onload = async () => {
    const response = await fetch('/auth/status');
    const data = await response.json();

    if (data.isAuthenticated) {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('protected-area').style.display = 'block';
    } else {
        document.getElementById('protected-area').style.display = 'none';
    }
};