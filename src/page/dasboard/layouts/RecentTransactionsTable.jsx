import { useEffect, useState } from "react";
import {
    ThemeProvider,
    CssBaseline,
    Box,
    Drawer,
    AppBar,
    Toolbar,
    Typography,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Badge,
    useMediaQuery,
    Container,
    Grid,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    Chip,
    LinearProgress,
    createTheme
} from '@mui/material';
import { TransactionStatus } from "./TransactionStatus";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { axiosGET } from "../../../service/ApiService";
import { formatDate, formatKHR, formatUSD, StyleColors } from "../../../util/helper/Extension";


const RecentTransactionsTable = ({ transactions }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [orders, setOrders] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedTransactions = orders.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );
    const getOrderData = async () => {
        const res = await axiosGET('v1/order');
        if (res) {
            setOrders(res.data);
        }

    }
    useEffect(() => {
        getOrderData();
    }, []);

    return (
        <>
            <Card elevation={0} sx={{ boxShadow: 'none' }}>

                <CardContent>
                    <Box variant="h5" sx={{ display: 'flex', alignItems: 'center', pb: 2, gap: 1 }}>
                        <AccessTimeIcon /> Recent Transactions

                    </Box>
                    <TableContainer>
                        <Table aria-label="recent transactions table">
                            <TableHead>
                                <TableRow>
                                    <TableCell width={300}>Order</TableCell>
                                    <TableCell align="right">Exchange</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                    <TableCell width={100}>Payment</TableCell>
                                    <TableCell>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedTransactions.map((transaction) => (
                                    <TableRow
                                        key={transaction.order_id}
                                        hover
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Avatar />
                                                <Box>
                                                    <Typography variant="body2">
                                                        Guest
                                                    </Typography>

                                                    <Typography variant="body2" color={StyleColors.textGray}>
                                                        {formatDate(transaction.order_date)}
                                                    </Typography>
                                                </Box>
                                            </Box>


                                        </TableCell>
                                        <TableCell align="right">{formatKHR(transaction.exchange_rate)}</TableCell>
                                        <TableCell align="right">
                                            <Typography variant="body2" fontWeight="medium">
                                                {formatUSD(transaction.total_amount_usd)}
                                            </Typography>
                                            <Typography variant="body2" fontWeight="medium" color={StyleColors.textGray}>
                                                {formatKHR(transaction.total_amount_riel)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{transaction.payment_type}</TableCell>
                                        <TableCell>
                                            <Typography variant="body2" fontWeight="medium">
                                                {transaction.description}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={transactions.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        aria-label="table pagination"
                    />
                </CardContent>

            </Card>

        </>
    );
};

export default RecentTransactionsTable;