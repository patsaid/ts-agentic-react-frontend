import React, { useState, useContext } from 'react';
import { FaRobot, FaUserCircle } from 'react-icons/fa';
import '../styles/global.css';
import { AuthContext } from '../context/AuthContext';
import { createUser, loginUser } from '../api/user-api';

function Header() {
  const auth = useContext(AuthContext);
  const isSignedIn = auth?.isSignedIn ?? false;
  const setIsSignedIn = auth?.setIsSignedIn;
  const setUser = auth?.setUser;
  const user = auth?.user;

  const [menuOpen, setMenuOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  // form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignOut = () => {
    if (setIsSignedIn) setIsSignedIn(false);
    if (setUser) setUser(null);
    setMenuOpen(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loggedInUser = await loginUser({ email, password });
      if (setIsSignedIn) setIsSignedIn(true);
      if (setUser) setUser({ ...loggedInUser, _id: loggedInUser._id ?? '' });
      setMenuOpen(false);
    } catch (err: any) {
      alert(err.response?.data?.error || err.message);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newUser = await createUser({ email, password });
      if (setIsSignedIn) setIsSignedIn(true);
      if (setUser) setUser({ ...newUser, _id: newUser._id ?? '' });
      setMenuOpen(false);
    } catch (err: any) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <header className="header">
      {/* Left: logo */}
      <div className="header-left">
        <FaRobot size={30} color="#2b6cb0" />
        <h1 className="header-title">Agentic Demo</h1>
      </div>

      {/* Right: user */}
      <div className="user-menu">
        <div onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: 'pointer' }}>
          {isSignedIn && user ? (
            <div className="user-avatar">{user.email.charAt(0).toUpperCase()}</div>
          ) : (
            <FaUserCircle size={30} color="#555" />
          )}
        </div>

        {menuOpen && (
          <div className="dropdown">
            {isSignedIn && user ? (
              <>
                <div>
                  <p>{user.email}</p>
                </div>
                <button onClick={handleSignOut}>Sign out</button>
              </>
            ) : (
              <form
                onSubmit={isSignUp ? handleSignUp : handleSignIn}
                style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
              >
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">{isSignUp ? 'Sign up' : 'Sign in'}</button>
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  style={{ marginTop: '0.5rem' }}
                >
                  {isSignUp ? 'Already have an account? Sign in' : 'No account? Sign up'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
