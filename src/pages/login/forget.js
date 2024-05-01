import { apiUrl } from '@/Context/constant';
import { Box, Button, FormControl, FormLabel, Input, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Forget() {
  const [email, setEmail] = useState({ email: '', subject: 'reset  password' });
  const handleChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('email', email);
    const apiUrlEndpoint = `${apiUrl}/api/emailsend`;
    const response = await fetch(apiUrlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(email)
    });
    const res = await response.json();
    alert(res.message);
    router.replace('/');
  };
  return (
    <Box
      sx={{
        maxWidth: 350,
        mx: 'auto',
        my: 6,
        py: 3,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 'sm',
        boxShadow: 'md',
        bgcolor: 'white'
      }}
    >
      <FormControl>
        <FormLabel sx={{ fontSize: 22, color: 'black' }}>Email</FormLabel>
        <Typography fontSize={13} component="span" pb={1}>
          Enter your email address and we’ll send you a link to reset your password.
        </Typography>
        <Input
          name="email"
          type="email"
          onChange={handleChange}
          value={email.email}
          placeholder="johndoe@email.com"
        />
      </FormControl>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button variant="contained" onClick={(e) => handleSubmit(e)}>
          Reset
        </Button>
      </Stack>
    </Box>
  );
}
