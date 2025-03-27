'use client';

import React, { useEffect, useState } from 'react';

export default function TestPage() {
  const [inhalt, setInhalt] = useState('');
  const [message, setMessage] = useState('');
  const [data, setData] = useState<{ id: string; inhalt: string }[]>([]);

  useEffect(() => {
    fetch('/api/test')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inhalt }),
    });

    if (res.ok) {
      setMessage('Eintrag erfolgreich erstellt! ✅');
    } else {
      setMessage('Fehler beim Erstellen des Eintrags ❌');
    }
  };

  return (
    <div>
      <h1>Neuen Eintrag erstellen</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Inhalt"
          value={inhalt}
          onChange={(e) => setInhalt(e.target.value)}
          required
        />
        <button type="submit">Erstellen</button>
      </form>
      {message && <p>{message}</p>}

      <h2>Vorhandene Einträge:</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <strong>{item.inhalt}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}