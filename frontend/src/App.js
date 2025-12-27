import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div className="App">
      {/* Fixed Navbar with proper alignment */}
      <nav className="navbar-glass">
        <div className="container">
          <Link to="/restaurants" className="navbar-brand">
            🍽️ Restaurant Reviews
          </Link>
          
          <div className="navbar-nav">
            <Link to={"/restaurants"} className="nav-link">
              📋 Restaurants
            </Link>
            
            {user ? (
              <div className="user-menu">
                <span className="user-greeting">👋 Welcome, {user.name}</span>
                <button onClick={logout} className="btn-logout">
                  🚪 Logout
                </button>
              </div>
            ) : (            
              <Link to={"/login"} className="btn-primary nav-login">
                🔐 Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <Routes>
            <Route path="/" element={<RestaurantsList />} />
            <Route path="/restaurants" element={<RestaurantsList />} />
            <Route 
              path="/restaurants/:id/review"
              element={<AddReview user={user} />}
            />
            <Route 
              path="/restaurants/:id"
              element={<Restaurant user={user} />}
            />
            <Route 
              path="/login"
              element={<Login login={login} />}
            />
          </Routes>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="container">
          <p>© 2025 Restaurant Reviews - Find your next favorite spot</p>
        </div>
      </footer>
    </div>
  );
}

export default App;