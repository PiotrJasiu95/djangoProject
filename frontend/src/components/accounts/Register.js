import React, {Component,useState} from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import {register} from '../../actions/menu'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";

const Register = ({register}) => {
    let history = useHistory();
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const submit =(e) =>{
        register(email,password)
        setEmail('')
        setPassword('')
        e.preventDefault()
        history.push("/login");
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
                Register
            </Button>
        </Form>
        </Container>

    )

}



export default connect(null, {register})(Register);
