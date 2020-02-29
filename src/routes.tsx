import AssignmentIndTwoToneIcon from '@material-ui/icons/AssignmentIndTwoTone';
import GroupTwoToneIcon from '@material-ui/icons/GroupTwoTone';
import React from 'react';

interface IMenuItem {
    text: string;
    icon: JSX.Element;
    route: string;
}

export const routes: IMenuItem[] = [
    {
        text: 'Группы',
        icon: <GroupTwoToneIcon />,
        route: 'groups',
    },
    {
        text: 'Пользователи',
        icon: <AssignmentIndTwoToneIcon />,
        route: 'subjects',
    },
];
