document.getElementById('login-btn').addEventListener('click', () => {
    window.location.href = '/auth/github'; // Redirect to GitHub login
});

document.getElementById('logout-btn').addEventListener('click', async () => {
    await fetch('/auth/logout', { method: 'GET' });
    window.location.href = '/login.html'; // Redirect to login page
});

// Check authentication status on page load
window.onload = async () => {
    const response = await fetch('/auth/status');
    const data = await response.json();

    if (data.isAuthenticated) {
        document.getElementById('protected-area').style.display = 'block'; // Show protected area
    } else {
        document.getElementById('protected-area').style.display = 'none'; // Hide protected area
    }
};