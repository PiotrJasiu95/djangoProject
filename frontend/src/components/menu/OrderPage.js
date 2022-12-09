import React, {Component, Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {clear_order, getMenu, place_order, postOrder, remove_order} from '../../actions/menu';
import {Menu} from "./Menu";
import {Button, Card, Container, Form, Row} from "react-bootstrap";


export class OrderPage extends Component {
    state = {
        desc: '',
        adres1: '',
        adres2: '',
        total: 0

    };

    componentDidMount() {
        this.props.getMenu();


    }
    componentDidUpdate(prevProps) {
      if (prevProps.order.length !== this.props.order.length) {

          let tmp =0;
         this.props.menu.filter(item=>this.props.order.includes(item.id)).map(item => tmp+=item.price )
          this.setState({total:tmp})
      }
}
    submit() {
            console.log("PRE ORDER")
            const desc=this.state.desc
         const ad1=this.state.adres1
         const ad2=this.state.adres2
         const dish=this.props.order
            this.props.postOrder(desc,ad1,ad2,dish)
            console.log("POST ORDER")
            this.setState({
            desc: '',
            adres1: '',
            adres2: '',

            })
            this.props.clear_order()

        }
    render() {

        return (
            <Container className={'mt-5 p-3 col-10 align-content-center'}>
                <h2>Menu</h2>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Dish</th>
                        <th>Price</th>
                        <th>Ingredients</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>

                    {this.props.menu.map((menu) => (
                        <tr key={menu.id}>
                            <td>{menu.id}</td>
                            <td>{menu.name}</td>
                            <td>{menu.price === null ? 0 : menu.price}</td>
                             <td>{menu.ingredients !== null ? menu.ingredients : 'Not available'}</td>
                            <td>
                                {this.props.order.includes(menu.id) ? <button
                                    onClick={this.props.remove_order.bind(this, menu.id)}
                                    className="btn btn-danger btn-sm"
                                >
                                    {' '}
                                    Delete from Order
                                </button> : <button
                                    onClick={this.props.place_order.bind(this, menu.id)}
                                    className="btn btn-primary btn-sm"
                                >
                                    {' '}
                                    Add to Order
                                </button>}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Card className={'mt-5 p-3'}>
                    <Form>
                        <Form.Group controlId="adres1">
                            <Form.Label>Address Line 1</Form.Label>
                            <Form.Control type="text"  value={this.state.adres1} placeholder="Address Line 1" onChange={(e)=> {
                                this.setState({adres1:e.target.value})
                            }}/>
                        </Form.Group>

                        <Form.Group controlId="adres2">
                            <Form.Label>Address Line 2</Form.Label>
                            <Form.Control type="text" value={this.state.adres2} placeholder="Address Line 2" onChange={(e)=> {
                                this.setState({adres2:e.target.value})
                            }}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Extra information</Form.Label>
                            <Form.Control type="text" value={this.state.desc} placeholder="Extra information" onChange={(e)=> {
                                this.setState({desc:e.target.value})
                            }}/>
                        </Form.Group>

                            <Card>
                                Total: {this.state.total} PLN
                        </Card>
                        <Button className={'mt-3'} variant="primary" type="submit" onClick={this.submit.bind(this)}>
                            Place order
                        </Button>


                    </Form>
                </Card>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    menu: state.menu.menu,
    order: state.menu.order,
});


export default connect(mapStateToProps, {getMenu, place_order, remove_order,postOrder,clear_order})(OrderPage);