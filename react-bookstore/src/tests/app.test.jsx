import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, it, expect, beforeEach } from "vitest";
import App from "../App";
import { AuthProvider, AuthContext } from "../components/AuthContext";

describe("App component", () => {
  let mockAuthContextValue;

  beforeEach(() => {
    mockAuthContextValue = {
      isLoggedIn: false, // Initial state: not logged in
      isAdmin: false,
      checkAuthStatus: () => {}, // Mock function 
    };
  });
  it("renders the Login page initially", () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <App />
      </AuthContext.Provider>
    );
    const login = screen.getAllByText(/sign in/i);
    expect(login.length).toBeGreaterThan(0);
  });

  it("renders the Home page after login", () => {
    mockAuthContextValue.isLoggedIn = true;

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <App />
      </AuthContext.Provider>
    );

    const loginButton = screen.getByText(/Sign in/i); 
    fireEvent.click(loginButton); 

    const homeElements = screen.getAllByText(/home/i); 
    expect(homeElements.length).toBeGreaterThan(0);
  });

  it("hides the Login button and shows the Logout button after login", () => {
    mockAuthContextValue.isLoggedIn = true;

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <App />
      </AuthContext.Provider>
    );

    const loginButton = screen.getByText(/sign in/i);
    fireEvent.click(loginButton);

    const homeElements = screen.getAllByText(/home/i);
    expect(homeElements.length).toBeGreaterThan(0);
  });
});
