import {
    Box,
    Container,

} from '@mui/material';

import { AppRouter } from '../../../router/AppRouter';

export const Overview = () => {
    return (
        <Box sx={{ p: 2, pt: 0, }}>
            <Box sx={{ boxShadow: 'rgba(234, 234, 234, 0.2) 0px 8px 24px;', borderRadius: 2, }}>
                <AppRouter />
            </Box>
        </Box>
    );
};
