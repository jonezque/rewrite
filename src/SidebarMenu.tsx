import { createStyles, makeStyles } from '@material-ui/core';
import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { routes } from './routes';

const useStyleMenu = makeStyles(
    createStyles({
        list: (props: { show: boolean }) => ({
            listStyleType: 'none',
            transition: 'width 0.2s',
            width: props.show ? '200px' : '40px',
            paddingInlineStart: 0,
            '& a': {
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: '#333',
            },
            '& li:hover': {
                background: 'rgba(0,0,0,0.2)',
            },
            '& a:active': {
                fontWeight: 600,
            },
        }),
    }),
);

const MenuItem = memo(({ text, children, route }: { text: string; children: JSX.Element; route: string }) => {
    return (
        <li>
            <NavLink to={route} activeStyle={{ fontWeight: 800 }}>
                {children}
                {text}
            </NavLink>
        </li>
    );
});

export default memo(({ show }: { show: boolean }) => {
    const classes = useStyleMenu({ show });
    return (
        <nav>
            <ul className={classes.list}>
                {routes.map(r => (
                    <MenuItem key={r.route} text={show ? r.text : ''} route={r.route}>
                        {r.icon}
                    </MenuItem>
                ))}
            </ul>
        </nav>
    );
});
