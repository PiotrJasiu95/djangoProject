import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Form from './Form'
import {getMenu, deleteDish, getOrder, updateOrder, deleteOrder} from '../../actions/menu';
import {Card, Container} from "react-bootstrap";
import {DisplayUserOrder} from "./DisplayUserOrder";

export class AdminMenu extends Component {
    state = {
        tmp: '',

    };

    static propTypes = {

        menu: PropTypes.array.isRequired,
        deleteDish: PropTypes.func.isRequired,
        getMenu: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getMenu();
        this.props.getOrder();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.menu.length !== this.props.menu.length) {
            this.props.getMenu();
            this.props.getOrder();
            this.forceUpdate()

        }
    }

    submit(id, status) {
        this.props.updateOrder(id, status)
        this.props.getMenu();
        this.props.getOrder();
        this.forceUpdate()
        this.render()
    }

    delete(id) {
        this.props.deleteOrder(id)
        this.props.getMenu();
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
                    <table className="table table-striped">

                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Dish</th>
                            <th>Ingredients</th>
                            <th>Price</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.menu.map((menu) => (
                            <tr key={menu.id}>
                                <td>{menu.id}</td>
                                <td>{menu.name}</td>
                                <td>{menu.ingredients !== null ? menu.ingredients : 'Not available'}</td>
                                <td>{menu.price}</td>
                                <td>
                                    <button
                                        onClick={this.props.deleteDish.bind(this, menu.id)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        {' '}
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </Card>
                <Card>
                    <Form/>
                </Card>

            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    menu: state.menu.menu,
    active: state.menu.active_order,
});


export default connect(mapStateToProps, {getMenu, deleteDish, getOrder, updateOrder, deleteOrder})(AdminMenu);