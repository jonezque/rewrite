import { Dispatch } from 'redux';

import { REQUEST_STARTED, SEARCH_ERROR, SEARCH_SUCCESS, TITLE } from '.';

export interface ISubject {
    name: string;
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
}

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export const fetchSearch = (search = '', perPage = 10, page = 0) => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: REQUEST_STARTED });
        try {
            const data = await new Promise(resolve => {
                setTimeout(() => resolve({ rows, count: 100 }), 1000);
            });
            return dispatch({ type: SEARCH_SUCCESS, payload: data });
        } catch (error) {
            return dispatch({ type: SEARCH_ERROR });
        }
    };
};

export const setTitle = (title: string) => ({
    payload: title,
    type: TITLE,
});
