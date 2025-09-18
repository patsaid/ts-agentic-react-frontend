import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export interface User {
  _id?: string;
  email: string;
  password?: string; // plain password only used for sign-up/login
}

/**
 * Create a new user (sign up)
 */
export async function createUser(user: { email: string; password: string }): Promise<User> {
  const res = await axios.post<User>(`${API_URL}/users`, user);
  return res.data;
}

/**
 * Log in a user
 */
export async function loginUser(credentials: { email: string; password: string }): Promise<User> {
  const res = await axios.post<User>(`${API_URL}/users/login`, credentials);
  return res.data;
}

/**
 * Update a user's email or password
 */
export async function updateUser(
  userId: string,
  updates: { email?: string; password?: string }
): Promise<User> {
  const res = await axios.put<User>(`${API_URL}/users/${userId}`, updates);
  return res.data;
}

/**
 * Delete a user
 */
export async function deleteUser(userId: string): Promise<{ message: string }> {
  const res = await axios.delete<{ message: string }>(`${API_URL}/users/${userId}`);
  return res.data;
}
