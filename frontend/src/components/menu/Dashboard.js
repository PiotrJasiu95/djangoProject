import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Menu from './Menu'
import Ingredients from './Ingredients'
import Form from "./Form";
import Login from "../accounts/Login";
import Register from "../accounts/Register";
import Logout from "../accounts/Logout";
import OrderPage from "./OrderPage";
import {Container} from "react-bootstrap";

export default function Dashboard(){
        return (
            <Container className={'mt-5 p-3 col-6 align-content-center'}>
                <Menu/>
            </Container>
        )
}

