import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../components/Login";

describe("Login component", () => {
  let originalAxiosPost;
  let setItemMock;

  beforeEach(() => {
    // Store the original axios.post function
    originalAxiosPost = axios.post;

    // Mock sessionStorage.setItem with a custom mock function
    setItemMock = (key, value) => {
      Object.defineProperty(window.sessionStorage, key, {
        value,
        writable: true,
      });
    };
  });

  afterEach(() => {
    // Restore the original axios.post function after each test
    axios.post = originalAxiosPost;
  });

  const mockAxiosPost = async (url, data) => {
    if (url === "https://localhost:7295/api/Users/authenticate") {
      if (
        data.email === "test@example.com" &&
        data.password === "password123"
      ) {
        return {
          data: {
            token: "mock-token",
            userId: "mock-user-id",
          },
        };
      } else {
        throw new Error("Invalid credentials");
      }
    }
  };

  it("successfully logs in with valid credentials", async () => {
    // Replace axios.post with the mockAxiosPost function
    axios.post = mockAxiosPost;

    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(screen.getByText("Sign in"));

    await act(async () => {
      await Promise.resolve();
    });

    // Expect sessionStorage.setItem to be called with the expected values
    expect(window.sessionStorage.token).toBe("mock-token");
    expect(window.sessionStorage.userId).toBe("mock-user-id");

    expect(window.location.pathname).toBe("/home");
  });

  it("displays error message for invalid credentials", async () => {
    // Replace axios.post with the mockAxiosPost function
    axios.post = mockAxiosPost;

    // Mock sessionStorage.setItem with a custom mock function
    const setItemMock = (key, value) => {
      Object.defineProperty(window.sessionStorage, key, {
        value,
        writable: true,
      });
    };

    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "invalidpassword" } });

    fireEvent.click(screen.getByText("Sign in"));

    await act(async () => {
      await Promise.resolve();
    });

    setItemMock("token", "mock-token");
    setItemMock("userId", "mock-user-id");

    expect(window.sessionStorage.getItem("token")).toBe("mock-token");
    expect(window.sessionStorage.getItem("userId")).toBe("mock-user-id");

    expect(
      screen.getByText("Login failed. Please check your email and password.")
    ).toBeInTheDocument();
  });
});
