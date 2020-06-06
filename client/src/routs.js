import React from "react";
import {Route,Switch,Redirect} from "react-router-dom";
import {AuthPage} from "./Pages/AuthPage";
import {CreatePage} from "./Pages/CreatePage";
import {DetailPage} from "./Pages/DetailPage";
import {LinksPage} from "./Pages/LinksPage";


export const useRouts = isAuthenticated => {
    if(isAuthenticated){
        return(
            <Switch>
                <Route path="/create" exact>
                    <CreatePage/>
                </Route>
                <Route path="/links" exact>
                    <LinksPage/>
                </Route>
                <Route path="/detail/:id">
                    <DetailPage/>
                </Route>
                <Redirect to ="/create"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/">
                <AuthPage/>
            </Route>
        </Switch>
    )
};