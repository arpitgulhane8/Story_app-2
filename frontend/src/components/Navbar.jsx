import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal.jsx";
import Login from "../pages/Login";
import Register from "../pages/Register";
import StoryForm from "../components/Createstory.jsx";
import { logout } from "../redux/actions/authActions.js";
import "../styles/Navbar.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showStoryForm, setShowStoryForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobileMenuOpen(window.innerWidth <= 650);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector((state) => state.auth.user);

  const handleLoginOpen = () => setShowLogin(true);
  const handleLoginClose = () => setShowLogin(false);
  const handleRegisterOpen = () => setShowRegister(true);
  const handleRegisterClose = () => setShowRegister(false);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLogout = async () => {
    try {
      setDropdownOpen(false);
      await dispatch(logout());
      toast.success("Logout Successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleCreateStoryOpen = () => setShowStoryForm(true);
  const handleCreateStoryClose = () => setShowStoryForm(false);

  return (
    <nav className="navbar">
      <div className="navbar-links">
        {!isAuthenticated ? (
          <>
            <button
              onClick={handleRegisterOpen}
              id="btn-signup"
              className="nav-button"
            >
              Register Now
            </button>
            <button
              onClick={handleLoginOpen}
              id="btn-register"
              className="nav-button"
            >
              Sign in
            </button>
            <div className="hamburger-menu mobile" onClick={toggleDropdown}>
              <span className="hamburger-icon">☰</span>
            </div>
            {mobileMenuOpen && (
              <div className="mobile-menu">
                {dropdownOpen && (
                  <>
                    <div
                      className="navbar-close-btn"
                      onClick={() => setDropdownOpen(false)}
                    >
                      ⓧ
                    </div>
                    <button
                      onClick={handleRegisterOpen}
                      id="btn-signup-mobile"
                      className="mobile-nav-button"
                    >
                      Register Now
                    </button>
                    <button
                      onClick={handleLoginOpen}
                      id="btn-register-mobile"
                      className="mobile-nav-button"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </div>
            )}
          </>
        ) : (
          <>
          <button className="nav-back" onClick={()=>{navigate("/")}}>
          <i className="fas fa-less-than"></i>
        </button>
            <button
              className="nav-button"
              onClick={() => navigate("/Bookmark")}
            >
              <i
                className="fas fa-bookmark"
                style={{ color: "white,", marginRight: "3px" }}
              ></i>
              Bookmark
            </button>
            <button onClick={handleCreateStoryOpen} className="nav-button">
              Create Story
            </button>
            <div className="hamburger-menu" onClick={toggleDropdown}>
              <span className="hamburger-icon">☰</span>
            </div>
            {dropdownOpen && (
              <>
                {mobileMenuOpen ? (
                  <div className="mobile-menu">
                    <>
                      <div
                        className="navbar-close-btn"
                        onClick={() => setDropdownOpen(false)}
                      >
                        ⓧ
                      </div>
                      <p>{username}</p>
                      <button
                        className="mobile-nav-button"
                        onClick={() => navigate("/Bookmark")}
                      >
                        <i
                          className="fas fa-bookmark"
                          style={{ color: "white" }}
                        ></i>{" "}
                        Bookmark
                      </button>
                      <button
                        onClick={handleCreateStoryOpen}
                        className="mobile-nav-button"
                      >
                        Create Story
                      </button>
                      <button
                        className="mobile-nav-button"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </>
                  </div>
                ) : (
                  <div className="dropdown-menu">
                    <p>{username}</p>
                    <button className="logout-button" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      <Modal show={showLogin} handleClose={handleLoginClose}>
        <Login handleClose={handleLoginClose} />
      </Modal>

      <Modal show={showRegister} handleClose={handleRegisterClose}>
        <Register handleClose={handleRegisterClose} />
      </Modal>

      {showStoryForm && (
        <div className="modal-overlay">
          <StoryForm close={handleCreateStoryClose} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
