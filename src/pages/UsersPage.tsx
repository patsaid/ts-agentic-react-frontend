import React from 'react';
import { useEffect, useState } from 'react';
import { createUser, getUsers, User } from '../api/user-api';
import LoadingSpinner from '../components/LoadingSpinner';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getUsers();
        setUsers(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = await createUser(form);
    setUsers((prev) => [...prev, newUser]);
    setForm({ name: '', email: '' });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Users</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add User
        </button>
      </form>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <ul className="space-y-2">
          {users.map((u) => (
            <li key={u._id} className="border p-2 rounded">
              <strong>{u.name}</strong> – {u.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
