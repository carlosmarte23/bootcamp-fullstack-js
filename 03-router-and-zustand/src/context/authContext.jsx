/**
 * useAuth hook
 * Provides the current authentication state and functions to log in and log out.
 *
 * @returns {Object} containing the current authentication state and functions to log in and log out.
 * @example
 * const { isLoggedIn, login, logout } = useAuth();
 *
 * if (isLoggedIn) {
 *   // already logged in
 * } else {
 *   login();
 * }
 *
 * logout();
 */

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useAuth must be used inside an AuthProvider`);
  }

  return context;
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  function login() {
    setIsLoggedIn(true);
  }

  function logout() {
    setIsLoggedIn(false);
  }

  const value = {
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
}
