import React, {Component,useState} from 'react';
import {Form, Button, Card, Container} from 'react-bootstrap';
import {login} from '../../actions/menu'
// import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect, useHistory} from 'react-router-dom';

import {connect} from 'react-redux';

const Login = ({menu,login}) => {
     let history = useHistory();
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const submit =(e) =>{
        login(email,password)
        setEmail('')
        setPassword('')
        history.push("/dashboard");
        e.preventDefault()


    }
    if(menu.jwt){
        return <Redirect to='/dashboard' />
    }

    return (
        <Container className={'mt-5 p-3 col-6 align-content-center'}>
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" placeholder="Enter Username"  onChange={e=>setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={submit}>
                Login
            </Button>
        </Form>
</Container>
    )

}

const mapStateToProps = (state) => (
    {
     menu: state.menu,
    });


export default connect(mapStateToProps, {login})(Login);
