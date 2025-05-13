'use client';
import { useEffect, useState } from 'react';

export default function UserPage() {
  const [users, setUsers] = useState<{id: string, username: string}[]>([]);

  useEffect(() => {
    async function loadUsers() {
      const res = await fetch('api/users');
      const data = await res.json();
      setUsers(data);
    }

    loadUsers();
  }, []);

  return (
    <div>
      <h1>Usuários</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}
