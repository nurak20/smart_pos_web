import {
    Box,
    Container,

} from '@mui/material';

import { AppRouter } from '../../../router/AppRouter';

export const Overview = () => {
    return (
        <Container maxWidth="xxl">
            <Box >
                <AppRouter />
            </Box>
        </Container>
    );
};
