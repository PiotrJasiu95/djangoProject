import React, {Fragment, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

import Header from './layout/Header';
import Dashboard from './menu/Dashboard';
import {connect, Provider} from 'react-redux';
import store from "../store";

import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {addDish, logout} from "../actions/menu";
import {Form} from "./menu/Form";
import {Container} from "react-bootstrap";
import Login from "./accounts/Login";
import OrderPage from "./menu/OrderPage";
import Register from "./accounts/Register";
import jwt_decode from "jwt-decode";
import AdminMenu from "./menu/AdminMenu";
import DisplayUserOrder from "./menu/DisplayUserOrder";
import AdminOrderPage2 from "./menu/AdminOrderPage2";

const MainPage = ({menu}) => {
    const [logged, setLogged] = useState(false);
    const [admin, setAdmin] = useState(false);
    useEffect(() => {
        if (menu.jwt) {
            setLogged(true)
            const decoded = jwt_decode(menu.jwt);
            if (decoded.user_id === 3) {
                setAdmin(true)
            }
        } else {
            setLogged(false)

        }
      },[menu.jwt])

        return (
            <>
                <Header/>

                {logged ? <Switch>,
                        <Container className={'mt-5'}>
                            <Route exact path={'/'}><OrderPage/></Route>
                            <Route path={'/dashboard'}><OrderPage/></Route>
                            <Route path={'/orders'}><DisplayUserOrder/></Route>
                            {admin && <Route excat path={'/adminmenu'}><AdminMenu/></Route>}
                            {admin && <Route path={'/adminorderpage2'}><AdminOrderPage2/></Route>}
                        </Container>
                    </Switch>
                    :
                    <Switch>
                        <Container className={'mt-5'}>
                            <Route exact path={'/'}><Dashboard/></Route>
                            <Route path={'/dashboard'}><Dashboard/></Route>
                            <Route path={'/login'}><Login/></Route>
                            <Route path={'/register'}><Register/></Route>
                        </Container>
                    </Switch>
                }
            </>


        )

    }


    const mapStateToProps = (state) => ({
        menu: state.menu,
    });


    export default connect(mapStateToProps, null)(MainPage);