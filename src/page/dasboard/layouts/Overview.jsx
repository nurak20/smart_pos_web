import {
    Box,
    Container,

} from '@mui/material';

import RecentTransactionsTable from './RecentTransactionsTable';

export const Overview = () => {
    return (
        <Container maxWidth="xxl">
            <Box >
                <RecentTransactionsTable transactions={mockTransactions} />
            </Box>
        </Container>
    );
};

const mockTransactions = [
    {
        id: 'TXN001',
        date: '2024-01-15',
        time: '14:30',
        customer: 'John Doe',
        items: 3,
        total: 125.50,
        status: 'completed',
        paymentMethod: 'Card'
    },
    {
        id: 'TXN002',
        date: '2024-01-15',
        time: '14:15',
        customer: 'Jane Smith',
        items: 1,
        total: 89.99,
        status: 'completed',
        paymentMethod: 'Cash'
    },
    {
        id: 'TXN003',
        date: '2024-01-15',
        time: '14:00',
        customer: 'Bob Johnson',
        items: 5,
        total: 234.75,
        status: 'refunded',
        paymentMethod: 'Card'
    },
    {
        id: 'TXN004',
        date: '2024-01-15',
        time: '13:45',
        customer: 'Alice Brown',
        items: 2,
        total: 67.25,
        status: 'completed',
        paymentMethod: 'Digital'
    },
    {
        id: 'TXN005',
        date: '2024-01-15',
        time: '13:30',
        customer: 'Charlie Wilson',
        items: 4,
        total: 156.80,
        status: 'completed',
        paymentMethod: 'Card'
    }
];