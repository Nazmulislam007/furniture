import DashboardTable from '@/components/Dashboard/DashboardTable';
import Settings from '@/components/Dashboard/Settings/Settings';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <Box maxWidth="lg" marginX="auto" px={1} my={8}>
      <Box sx={{ padding: 3, bgcolor: 'white' }}>
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography variant="body1" fontSize={25}>
            Customers
          </Typography>
          <Link href="/dashboard/create-customer">
            <Button variant="contained" startIcon={<AddIcon />}>
              New Customer
            </Button>
          </Link>
        </Stack>
        <DashboardTable />
      </Box>
      <Settings />
    </Box>
  );
}
