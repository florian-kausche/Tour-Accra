import React from 'react';

const AuthButton = ({ type = 'register' }) => {
  const handleAuth = () => {
    // Redirect to GitHub OAuth
    window.location.href = 'http://localhost:3001/auth/github';
  };

  return (
    <button 
      onClick={handleAuth}
      className={`auth-button ${type}-button`}
    >
      {type === 'register' ? 'Register' : 'Login'} with GitHub
    </button>
  );
};

export default AuthButton; 