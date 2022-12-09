import React, {Component, Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {clear_order, getMenu, getOrder, place_order, postOrder, remove_order} from '../../actions/menu';
import {Menu} from "./Menu";
import {Button, Card, Container, Form} from "react-bootstrap";


export class DisplayUserOrder extends Component {
    state = {
        desc: '',
        adres1: '',
        adres2: '',
    };

    componentDidMount() {
        this.props.getOrder();


    }

    render() {

        return (
            <Container>
                <Card>
                <h2>Your Orders</h2>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Status</th>
                        <th>DATE OF PLACING THE ORDER</th>
                        <th>DISHES</th>
                        <th>PRICE</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>

                    {this.props.menu.map((menu) => (
                        <tr key={menu.id}>
                            <td>{menu.status}</td>
                            <td>{menu.time}</td>
                            <td>{menu.dish}</td>
                            <td>{menu.total}</td>

                        </tr>
                    ))}
                    </tbody>
                </table>
                </Card>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    menu: state.menu.active_order,
    order: state.menu.order,
});


export default connect(mapStateToProps, {getOrder, place_order, remove_order,postOrder,clear_order})(DisplayUserOrder);