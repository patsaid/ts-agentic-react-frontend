import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export interface User {
  _id?: string;
  name: string;
  email: string;
}

export async function createUser(user: Omit<User, '_id'>): Promise<User> {
  const res = await axios.post<User>(`${API_URL}/users`, user);
  return res.data;
}

export async function getUsers(): Promise<User[]> {
  const res = await axios.get<User[]>(`${API_URL}/users`);
  return res.data;
}
