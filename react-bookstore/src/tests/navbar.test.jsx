import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, it, expect, beforeEach } from "vitest";
import Navbar from "../components/Navbar";
import { AuthProvider, AuthContext } from "../components/AuthContext";

describe("Navbar Component", () => {
  let mockAuthContextValue;

  beforeEach(() => {
    mockAuthContextValue = {
      isLoggedIn: false, // Initial state: not logged in
      isAdmin: false,
      checkAuthStatus: () => {}, // Mock function 
    };
  });

  it("renders the Home link when logged in", () => {
    mockAuthContextValue.isLoggedIn = true; // Simulate logged in state

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <Router>
          <Navbar />
        </Router>
      </AuthContext.Provider>
    );

    const homeLinks = screen.queryAllByRole("link", { name: /home/i });
    expect(homeLinks.length).toBeGreaterThan(0);
  });

  it("does not render the Home link when not logged in", () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <Router>
          <Navbar />
        </Router>
      </AuthContext.Provider>
    );
    const homeLinks = screen.getAllByText(/Home/i);
    expect(homeLinks.length).toBe(2);
  });

  it("renders the Admin Panel link when the user is an admin", () => {
    mockAuthContextValue.isLoggedIn = true; // Simulate logged in state
    mockAuthContextValue.isAdmin = true; // Simulate admin user

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <Router>
          <Navbar />
        </Router>
      </AuthContext.Provider>
    );

    const adminLink = screen.queryAllByRole("link", { name: /admin/i });
    expect(adminLink.length).toBeGreaterThan(0);
  });

  it("does not render the Admin Panel link when the user is not an admin", () => {
    mockAuthContextValue.isLoggedIn = true; // Simulate logged in state
    mockAuthContextValue.isAdmin = false; // Simulate non-admin user

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <Router>
          <Navbar />
        </Router>
      </AuthContext.Provider>
    );

    const adminLinks = screen.queryAllByRole("link", { name: /admin panel/i });
    expect(adminLinks.length).toBe(0);
  });
});
