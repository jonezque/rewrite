import { createStyles, makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import RefreshIcon from '@material-ui/icons/Refresh';
import React, { Dispatch, memo, SetStateAction } from 'react';
import { useSelector } from 'react-redux';

import { IStoreState } from './store';

const useStyle = makeStyles(
    createStyles({
        spaceBtw: {
            display: 'flex',
            justifyContent: 'space-between',
        },
    }),
);

export default memo(({ setShow }: { setShow: Dispatch<SetStateAction<boolean>> }) => {
    const classes = useStyle();
    const title = useSelector((state: IStoreState) => state.title);
    return (
        <AppBar>
            <Toolbar className={classes.spaceBtw}>
                <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={() => setShow((prev: boolean) => !prev)}>
                    <MenuIcon />
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" noWrap>
                    {title}
                </Typography>
                <IconButton color="inherit">
                    <RefreshIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
});
