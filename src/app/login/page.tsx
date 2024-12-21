"use client"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Home() {
  const [username, setUsername] = React.useState("");
  const [optToken, setOptToken] = React.useState("");
  const [roomId, setRoomId] = React.useState("");
  const router = useRouter();
  React.useEffect(() => {
    setRoomId('123456')
  }, [])

  const handleLogin = () => {
    axios.post("/api/login", {
        username: username,
        // password: passwdRef.current?.value,
        roomId: roomId,
        token: optToken 
    }).then(res => {
        if (res.status !== 200) {
            alert(`登录失败: ${res.status}`)
        } else {
            if (typeof window != 'undefined') {
                router.push(`/chat?roomId=${roomId}`)
            }
        }
    }).catch(err => {
        alert(`${err.response.data}`)
    })
  }
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
          value={username}
          id="outlined-required"
          label="username"
          onChange={(e) => setUsername(e.target.value)}
          size='small'
        />
        <TextField
          required
          value={optToken}
          id="outlined-password-input"
          label="OptToken"
          onChange={(e) => setOptToken(e.target.value)}
          type="password"
          size='small'
          autoComplete="current-password"
        />
        <TextField
          required
          value={roomId}
          id="outlined"
          label="RoomId"
          onChange={(e) => setRoomId(e.target.value)}
          size='small'
        />
        <Button variant="contained" onClick={handleLogin}>Login</Button>
      </Stack>
    </Box>
  );
}
