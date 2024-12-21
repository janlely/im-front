"use client"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import React from 'react';
import Link from 'next/link';


export default function Home() {
  const [roomId, setRoomId] = React.useState("");
  React.useEffect(() => {
    setRoomId('123456')
  }, [])
  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Stack spacing={2}>
        <TextField
          required
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          id="outlined"
          label="RoomId"
          size='small'
        />
        <Button variant="contained">
          <Link href={`/chat?roomId=${roomId}`} style={{ color: 'white', textDecoration: 'none' }}>Goto</Link>
        </Button>
      </Stack>
    </Box>
  );
}
