import { apiUrl } from '@/Context/constant';
import { Box, Button, FormControl, FormLabel, Input, Stack, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function resetPassword() {
    const [data, setData] = useState({ password: "", confirmPassword: "", email: "" });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const searchParams = useSearchParams();
    const search = searchParams.get('token');
    const router = useRouter()

    useEffect(() => {
        setData((prevData) => ({ ...prevData, email: search }));
    }, [search]);

    const validation = (data) => {
        let valid = false;
        if (data.password === data.confirmPassword) {
            valid = true;
        } else {
            alert("Passwords do not match");
        }
        return valid;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validation(data)) {
            const apiUrlEndpoint = `${apiUrl}/api/resetPassword`;
            const response = await fetch(apiUrlEndpoint, {
                method: 'POST', headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            const res = await response.json();
            alert(res.message);
            router.replace('/login')
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
                <FormLabel sx={{ fontSize: 22, color: 'black' }}>Email</FormLabel>
                <Typography fontSize={13} component="span" pb={1}>
                    Enter your password address and we’ll send you a link to reset your password.
                </Typography>
                <Input name="password" type="password" onChange={handleChange} value={data.password} placeholder="Enter Password" />
                <Input name="confirmPassword" type="password" onChange={handleChange} value={data.confirmPassword} placeholder="Enter Confirm Password" />
            </FormControl>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Button variant="contained" onClick={(e) => handleSubmit(e)} >Submit</Button>
            </Stack>
        </Box>
    );
}
