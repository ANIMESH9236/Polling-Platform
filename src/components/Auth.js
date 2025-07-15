// src/components/Auth.js
export const saveUser = (username, password) => {
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[username]) {
    return { success: false, message: "User already exists" };
  }
  users[username] = { password };
  localStorage.setItem("users", JSON.stringify(users));
  return { success: true };
};

export const loginUser = (username, password) => {
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[username] && users[username].password === password) {
    localStorage.setItem("currentUser", username);
    return { success: true };
  }
  return { success: false, message: "Invalid credentials" };
};

export const logoutUser = () => {
  localStorage.removeItem("currentUser");
};

export const getCurrentUser = () => {
  return localStorage.getItem("currentUser");
};
