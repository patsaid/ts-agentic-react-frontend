import React, { useState, useContext } from 'react';
import { FaRobot, FaUserCircle } from 'react-icons/fa';
import '../styles/global.css';
import { AuthContext } from '../context/AuthContext';

function Header() {
  const auth = useContext(AuthContext);
  const isSignedIn = auth?.isSignedIn ?? false;
  const setIsSignedIn = auth?.setIsSignedIn;

  const [menuOpen, setMenuOpen] = useState(false);

  const user = { name: 'Patrick', email: 'patrick@example.com' };

  const handleAuth = () => {
    if (setIsSignedIn) setIsSignedIn(!isSignedIn);
    setMenuOpen(false);
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
          {isSignedIn ? (
            <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
          ) : (
            <FaUserCircle size={30} color="#555" />
          )}
        </div>

        {menuOpen && (
          <div className="dropdown">
            {isSignedIn ? (
              <>
                <div>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                </div>
                <button onClick={handleAuth}>Sign out</button>
              </>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (setIsSignedIn) setIsSignedIn(true);
                  setMenuOpen(false);
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
              >
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Sign in</button>
              </form>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
