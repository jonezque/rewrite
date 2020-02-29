import { AnyAction } from 'redux';

import { IStoreState, REQUEST_STARTED, SEARCH_ERROR, SEARCH_SUCCESS, TITLE } from '.';

export const initialState: IStoreState = {
    error: false,
    subjects: [],
    loading: false,
    count: 0,
    title: '',
};

export default (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SEARCH_SUCCESS:
            return { ...state, error: false, subjects: action.payload.rows, count: action.payload.count, loading: false };
        case SEARCH_ERROR:
            return { ...state, error: true, subjects: [], loading: false };
        case REQUEST_STARTED:
            return { ...state, loading: true };
        case TITLE:
            return { ...state, title: action.payload };
        default:
            return state;
    }
};
