import { Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@material-ui/core';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSearch, IStoreState, setTitle } from '../store';

export default memo(() => {
    const searchRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const handlePerPageChange = useCallback(
        (data: React.ChangeEvent<HTMLInputElement>) => {
            setPerPage(+data.target.value);
            dispatch(fetchSearch(searchRef.current?.querySelector('input')?.value, +data.target.value, page));
        },
        [dispatch, page],
    );

    const handlePageChange = useCallback(
        (event: React.MouseEvent<HTMLButtonElement> | null, pageNumber: number) => {
            setPage(pageNumber);
            dispatch(fetchSearch(searchRef.current?.querySelector('input')?.value, perPage, pageNumber));
        },
        [dispatch, perPage],
    );

    const onEnterHandle = useCallback(
        ({ keyCode }: React.KeyboardEvent) => {
            if (keyCode === 13) {
                dispatch(fetchSearch(searchRef.current?.querySelector('input')?.value, perPage, page));
            }
        },
        [dispatch, perPage, page],
    );

    useEffect(() => {
        dispatch(setTitle('Пользователи'));
        dispatch(fetchSearch());
        searchRef.current?.querySelector('input')?.focus();
    }, [dispatch]);

    const { rows, loading, count } = useSelector((state: IStoreState) => ({
        rows: state.subjects,
        loading: state.loading,
        count: state.count,
    }));

    const search = searchRef.current?.querySelector('input')?.value || '';
    return (
        <Paper style={{ padding: '2rem' }}>
            <TextField variant="filled" label="Поиск" style={{ marginBottom: '2rem' }} onKeyDown={onEnterHandle} ref={searchRef} />

            {loading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress size={200} />
                </Box>
            ) : !rows.length ? (
                <div>Нет записей</div>
            ) : (
                <>
                    <TableContainer>
                        <Table aria-labelledby="tableTitle" aria-label="enhanced table" style={{ tableLayout: 'fixed' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ФИО</TableCell>
                                    <TableCell align="right">PersonId</TableCell>
                                    <TableCell align="right">ТН</TableCell>
                                    <TableCell align="right">Название штатной должности</TableCell>
                                    <TableCell align="right">Название компании</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(row => (
                                    <TableRow key={row.name}>
                                        <TableCell scope="row" style={{ background: search !== '' && row.name.indexOf(search) !== -1 ? 'orange' : 'inherit' }}>
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right" style={{ background: search !== '' && row.calories === +search ? 'orange' : 'inherit' }}>
                                            {row.calories}
                                        </TableCell>
                                        <TableCell align="right" style={{ background: search !== '' && row.fat === +search ? 'orange' : 'inherit' }}>
                                            {row.fat}
                                        </TableCell>
                                        <TableCell align="right">{row.carbs}</TableCell>
                                        <TableCell align="right">{row.protein}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        rowsPerPageOptions={[5, 10, 25]}
                        colSpan={3}
                        count={count}
                        rowsPerPage={perPage}
                        page={page}
                        style={{ width: '100%' }}
                        SelectProps={{
                            inputProps: { 'aria-label': 'Записей на странице' },
                            native: true,
                        }}
                        labelRowsPerPage="Записей на странице"
                        onChangePage={handlePageChange}
                        onChangeRowsPerPage={handlePerPageChange}
                    />
                </>
            )}
        </Paper>
    );
});
