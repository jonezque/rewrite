import { CircularProgress } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React, { lazy, Suspense, useState } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Header from './Header';
import SidebarMenu from './SidebarMenu';

const GroupPage = lazy(() => import('./groups'));
const SubjectPage = lazy(() => import('./subjects'));

export default () => {
    const [show, setShow] = useState(true);
    return (
        <Router>
            <Header setShow={setShow} />
            <main>
                <Box mt={8} display="flex">
                    <Box pl={1} pr={2}>
                        <SidebarMenu show={show} />
                    </Box>
                    <Box flex={1} mt={2} mr={1}>
                        <Switch>
                            <Route path="/groups">
                                <Suspense fallback={<CircularProgress size={200} />}>
                                    <GroupPage />
                                </Suspense>
                            </Route>
                            <Route path="/subjects">
                                <Suspense fallback={<CircularProgress size={200} />}>
                                    <SubjectPage />
                                </Suspense>
                            </Route>
                            <Route exact path="/">
                                <Redirect to="/groups" />
                            </Route>
                            <Route path="*">
                                <div> 404 Not Found</div>
                            </Route>
                        </Switch>
                    </Box>
                </Box>
            </main>
        </Router>
    );
};
