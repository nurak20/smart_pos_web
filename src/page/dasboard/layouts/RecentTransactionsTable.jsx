import { useEffect, useState, useMemo } from "react";
import { Box, Avatar, Typography, LinearProgress } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { DataGrid } from "@mui/x-data-grid";
import { axiosGET } from "../../../service/ApiService";
import { formatDate, formatKHR, formatUSD, StyleColors } from "../../../util/helper/Extension";

const RecentTransactionsGrid = () => {
    const [orders, setOrders] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getOrderData = async () => {
            setLoading(true);
            const res = await axiosGET("v1/order");
            if (res) setOrders(res.data);
            setLoading(false);
        };
        getOrderData();
    }, []);

    const columns = useMemo(() => [
        {
            field: "order_id",
            headerName: "Order",
            flex: 1,
            minWidth: 240,
            headerAlign: "left",
            align: "left",
            renderCell: (params) => (
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 1,
                    height: "100%",
                    width: "100%"
                }}>
                    <Avatar />
                    <Box>
                        <Typography variant="body2">Guest</Typography>
                        <Typography variant="body2" color={StyleColors.textGray}>
                            {formatDate(params.row.order_date)}
                        </Typography>
                    </Box>
                </Box>
            ),
            sortable: false,
            filterable: false,
        },
        {
            field: "exchange_rate",
            headerName: "Exchange",
            type: "number",
            flex: 0.5,
            minWidth: 120,
            headerAlign: "left",
            align: "left",
            valueFormatter: ({ value }) => formatKHR(value),
        },
        {
            field: "total_amount_usd",
            headerName: "Total (USD/Riel)",
            flex: 0.8,
            minWidth: 180,
            headerAlign: "left",
            align: "left",
            renderCell: (params) => (
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%"
                }}>
                    <Typography variant="body2" fontWeight="medium">
                        {formatUSD(params.row.total_amount_usd)}
                    </Typography>
                    <Typography variant="body2" fontWeight="medium" color={StyleColors.textGray}>
                        {formatKHR(params.row.total_amount_riel)}
                    </Typography>
                </Box>
            ),
            sortable: false,
            filterable: false,
        },
        {
            field: "payment_type",
            headerName: "Payment",
            flex: 0.4,
            minWidth: 120,
            headerAlign: "left",
            align: "left",
        },
        {
            field: "description",
            headerName: "Description",
            flex: 1,
            minWidth: 200,
            headerAlign: "left",
            align: "left",
            sortable: false,
            filterable: false,
        },
    ], []);

    return (
        <Box sx={{ height: '100%', width: "100%", bgcolor: "white", p: 2, borderRadius: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", pb: 2, gap: 1 }}>
                <AccessTimeIcon />
                <Typography variant="h6">Recent Transactions</Typography>
            </Box>
            <Box sx={{ maxHeight: 700, width: "100%", overflow: "auto" }}>
                <DataGrid
                    rows={orders}
                    columns={columns}
                    getRowId={(row) => row.order_id}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                    rowHeight={70}
                    loading={loading}
                    components={{
                        LoadingOverlay: LinearProgress,
                    }}
                    disableColumnMenu
                    autoHeight
                    sx={{
                        ...StyleColors.tableStyle,
                        '& .MuiDataGrid-footerContainer': {
                            display: 'none',
                            backgroundColor: 'white',
                            borderTop: '0px solid #ddd',
                        },

                    }}
                />
            </Box>
        </Box>
    );
};

export default RecentTransactionsGrid;