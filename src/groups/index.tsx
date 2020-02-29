import { Box, Paper } from '@material-ui/core';
import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setTitle } from '../store';

export default memo(() => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setTitle('Группы'));
    }, [dispatch]);
    return (
        <Paper style={{ padding: '2rem' }}>
            <Box padding={2}>
                <div>fdghdfhdfh</div>
            </Box>
        </Paper>
    );
});
