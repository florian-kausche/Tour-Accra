document.getElementById('login-btn').addEventListener('click', () => {
    window.location.href = '/auth/github'; // Redirect to GitHub login
});

document.getElementById('logout-btn').addEventListener('click', async () => {
    try {
        const response = await fetch('/logout', { method: 'GET' });
        if (response.ok) {
            window.location.href = '/login.html'; // Redirect to login page
        } else {
            console.error('Logout failed');
        }
    } catch (error) {
        console.error('An error occurred during logout:', error);
    }
});

document.getElementById('github-login-btn').addEventListener('click', () => {
    window.location.href = '/auth/github';
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

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Authentication required' });
};