
import React, {Component,useState} from 'react';
import {Card,Button} from 'react-bootstrap';
import {login, logout} from '../../actions/menu'
// import 'bootstrap/dist/css/bootstrap.min.css';

import {connect} from 'react-redux';

const Logout = ({logout}) => {
    const submit =(e) =>{
        e.preventDefault()
        logout()
    }

    return (
        <Card onClick={submit}>
            Logout
        </Card>


    )

}



export default connect(null, {logout})(Logout);
