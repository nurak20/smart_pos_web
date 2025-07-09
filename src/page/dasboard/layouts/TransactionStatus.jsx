import { Chip } from "@mui/material";

export const TransactionStatus = ({ status }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'success';
            case 'refunded': return 'error';
            case 'pending': return 'warning';
            default: return 'default';
        }
    };

    return (
        <Chip
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            size="small"
            color={getStatusColor(status)}
            variant="outlined"
        />
    );
};