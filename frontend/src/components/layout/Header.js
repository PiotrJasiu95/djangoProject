import React, {Component, useState, useEffect} from "react";
import {Button, Card, Container, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import Logout from "../accounts/Logout";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import jwt_decode from "jwt-decode";

const Header = ({menu}) => {
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


    }, [menu.jwt])
    return (

        logged ?
            <Container>
                <Navbar bg="light" expand="lg"  className={'mb-3'}>
                    <Navbar.Brand href="/dashboard">Twoja Restruacjs</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Card>
                                <Link to={'/dashboard'}>Dashboard</Link>
                            </Card>
                        </Nav>
                        <Nav className="mr-auto">
                            <Card>
                                <Link to={'/orders'}>My Orders</Link>
                            </Card>
                        </Nav>

                        {admin && <Nav className="mr-auto">
                            <Card>
                                <Link to={'/adminmenu'}>Edit Menu</Link>
                            </Card>

                        </Nav>}

                        {admin && <Nav className="mr-auto">
                            <Card>
                                <Link to={'/adminorderpage2'}>View Orders</Link>
                            </Card>

                        </Nav>}
                        <Nav className="mr-auto">
                            <Card>
                                <Logout/>
                            </Card>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar> </Container> :
            <Container>
                <Navbar bg="light" expand="lg"  className={'mb-3 mr-auto'}>

                    <Navbar.Brand href="#login">Twoja Restruacjs</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Card>
                                <Link to={'/login'}>Login</Link>
                            </Card>
                        </Nav>
                        <Nav  className="mr-auto">
                            <Card>
                                <Link to={'/register'}>Register</Link>
                            </Card>
                        </Nav>
                        <Nav className="mr-auto">

                            <Card>
                                <Link to={'/dashboard'}>Dashboard</Link>
                            </Card>
                        </Nav>


                    </Navbar.Collapse>
                </Navbar>

            </Container>
    )

}

const mapStateToProps = (state) => (
    {
        menu: state.menu,
    });


export default connect(mapStateToProps, null)(Header);
