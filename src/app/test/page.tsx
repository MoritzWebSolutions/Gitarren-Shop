'use client';

import AppTopBar from './app-top-bar';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
    <Box>
      <AppTopBar/>
        
      <Typography variant="h1">Neuen Eintrag erstellen</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField required
                   label="Eintrag eingeben"
                   value={inhalt}
                   onChange={(e) => setInhalt(e.target.value)}/>
        <Button type="submit" variant="contained">Erstellen</Button>
      </Box>

      {message && <Typography variant="body1">{message}</Typography>}

      <Typography variant="h2">Vorhandene Einträge:</Typography>
      <List>
        {data.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.inhalt}/>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}