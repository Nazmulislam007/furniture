import { apiUrl } from '@/Context/constant';
import { Box, Button, FormControl, FormLabel, Input, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Login() {
   const router = useRouter();
   const pathname = usePathname();
   useEffect(() => {
      const userData = typeof window !== "undefined" ? JSON.parse(window.sessionStorage.getItem('user')) : null;
      if (userData) {
         router.replace("/");
      }
   }, []);
   const [loginData, setLoginData] = useState({});
   const onchangeHandler = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setLoginData({ ...loginData, [name]: value })
   }
   const loginHandler = async (e) => {
      e.preventDefault();
      try {
         if (loginData.email && loginData.password) {
            const apiUrlEndpoint = `${apiUrl}/api/login`;
            const response = await fetch(apiUrlEndpoint, {
               method: 'POST', headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(loginData)
            });
            const res = await response.json();
            if (res?.data?.status === 1) {
               sessionStorage.setItem("user", JSON.stringify(res.data));
               router.reload();
               alert("login successful.");
            } else {
               alert(res.message);
            }
         }
      } catch (error) {
         console.log("error", error);
      }

   }
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
            bgcolor: 'white',
         }}
      >
         <FormControl>
            <FormLabel>Email</FormLabel>
            <Input name="email" onChange={(e) => onchangeHandler(e)} type="email" value={loginData.email} placeholder="johndoe@email.com" />
         </FormControl>
         <FormControl>
            <FormLabel>Password</FormLabel>
            <Input name="password" onChange={(e) => onchangeHandler(e)} type="password" value={loginData.password} placeholder="password" />
         </FormControl>
         <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography fontSize="sm" color="#1565c0">
               <Link href="/login/forget">Forgot Password?</Link>
            </Typography>
            <Button variant="contained" onClick={(e) => loginHandler(e)}>Log in</Button>
         </Stack>
      </Box>
   );
}
