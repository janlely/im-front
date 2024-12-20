import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import React from 'react';

export default function Home() {
  const userRef = React.useRef<HTMLInputElement>(null);
  const tokenRef = React.useRef<HTMLInputElement>(null);
  const roomIdRef = React.useRef<HTMLInputElement>(null);

  const handleLogin = () => {
    axios.post("/api/login", {
        username: userRef.current?.value,
        // password: passwdRef.current?.value,
        roomId: roomIdRef.current?.value,
        token: tokenRef.current?.value
    }).then(res => {
        if (res.status !== 200) {
            alert(`登录失败: ${res.status}`)
        } else {
            window.location.href = `/Chat?${roomIdRef.current?.value}`
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
          ref={userRef}
          id="outlined-required"
          label="username"
          size='small'
        />
        <TextField
          required
          ref={tokenRef}
          id="outlined-password-input"
          label="OptToken"
          type="password"
          size='small'
          autoComplete="current-password"
        />
        <TextField
          required
          ref={roomIdRef}
          id="outlined"
          label="RoomId"
          defaultValue="123456"
          size='small'
        />
        <Button variant="contained" onClick={handleLogin}>Login</Button>
      </Stack>
    </Box>
  );
}
