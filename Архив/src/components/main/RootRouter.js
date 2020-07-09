import React from 'react';
import {Route, Switch} from "react-router-dom";
import Shop from "../user/Shop";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import Cabinet from "../user/Cabinet";
import AdminLogin from "../admin/AdminLogin";
import AdminPanel from "../admin/AdminPanel";
import Dashboard from "./Dashboard";
import ModeratorPanel from "../moderator/ModeratorPanel";
import ModeratorLogin from "../moderator/ModeratorLogin";

export const RootRouter = () => {
    return (
        <Switch>
            <Route path={'/'} exact>
                <Shop />
            </Route>
            <Route path={'/login'}>
                <SignIn />
            </Route>
            <Route path={'/reg'}>
                <SignUp />
            </Route>
            <Route path={'/cabinet'}>
                <Cabinet />
            </Route>
            <Route path={'/admin'} exact>
                <AdminLogin />
            </Route>
            <Route path={'/admin/panel'}>
                <AdminPanel />
            </Route>
            <Route path={'/moderator'} exact>
                <ModeratorLogin />
            </Route>
            <Route path={'/moderator/panel'}>
                <ModeratorPanel />
            </Route>
            <Route path={'/dashboard'}>
                <Dashboard />
            </Route>
        </Switch>
    )
};