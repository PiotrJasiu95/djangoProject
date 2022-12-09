import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {getMenu, deleteDish, getOrder, updateOrder, deleteOrder} from '../../actions/menu';
import {Card, Container} from "react-bootstrap";
import {DisplayUserOrder} from "./DisplayUserOrder";

export class AdminOrderPage2 extends Component {
    state = {
        tmp: '',
    };

    static propTypes = {

        menu: PropTypes.array.isRequired,
        deleteDish: PropTypes.func.isRequired,
        getMenu: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getOrder();


    }

    submit(id,status) {
        this.props.updateOrder(id,status)
        this.props.getOrder();
        this.forceUpdate()
    }

    delete(id) {
        this.props.deleteOrder(id)
        this.props.getOrder();
        this.forceUpdate()
    }

    render() {
        //         var ingredientList = [];
        // for(var i in this.props.menu.ingredients)
        //     ingredientList.push([i, this.props.menu.ingredients [i]]);

        return (
             <Container className={'mt-5 p-3 col-10 align-content-center'}>
            <Card>


                    <Card>
                        <h2>Active Orders</h2>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Status</th>
                                <th>Time</th>
                                <th>Dishes</th>
                                <th>Total Price</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>

                            {this.props.active.map((menu) => (
                                <tr key={menu.id}>
                                    <td>{menu.status}</td>
                                    <td>{menu.time}</td>
                                    <td>{menu.dish}</td>
                                    <td>{menu.total} PLN</td>
                                    <td>
                                        {menu.status === 'Order Placed' && <button
                                            onClick={this.submit.bind(this, menu.id, 'Order Approved')}
                                            className="btn btn-primary btn-sm"
                                        >
                                            {' '}
                                            Approve Order
                                        </button>}
                                        {menu.status === 'Order Approved' && <button
                                            onClick={this.submit.bind(this, menu.id, 'Order in Delivery')}
                                            className="btn btn-primary btn-sm"
                                        >
                                            {' '}
                                            Send Order
                                        </button>}
                                        {menu.status === 'Order in Delivery' && <button
                                            onClick={this.delete.bind(this, menu.id)}
                                            className="btn btn-danger btn-sm"
                                        >
                                            {' '}
                                            Delete Order
                                        </button>}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </Card>

                </Card>
             </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    menu: state.menu.menu,
    active: state.menu.active_order,
});


export default connect(mapStateToProps, {getMenu, deleteDish, getOrder, updateOrder, deleteOrder})(AdminOrderPage2);