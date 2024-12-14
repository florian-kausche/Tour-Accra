export const handleAuthError = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const error = urlParams.get('error');
  
  const errorMessages = {
    not_registered: 'You are not a registered user. Please register first.',
    auth_failed: 'GitHub authentication failed. Please try again.',
    session_expired: 'Your session has expired. Please log in again.',
    github_error: 'There was an error connecting to GitHub. Please try again.'
  };

  if (error && errorMessages[error]) {
    // You can replace this with a more sophisticated notification system
    alert(errorMessages[error]);
  }
}; 