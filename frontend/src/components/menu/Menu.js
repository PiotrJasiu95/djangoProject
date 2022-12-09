import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { getMenu, deleteDish } from '../../actions/menu';

export class Menu extends Component{

    static propTypes = {

        menu: PropTypes.array.isRequired,
        deleteDish: PropTypes.func.isRequired,
        getMenu: PropTypes.func.isRequired,
  };

    componentDidMount() {
    this.props.getMenu();

  }

    render() {
        //         var ingredientList = [];
        // for(var i in this.props.menu.ingredients)
        //     ingredientList.push([i, this.props.menu.ingredients [i]]);

 return (
      <Fragment>
        <h2>Menu</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Dish</th>
                <th>Price</th>
              <th>Ingredients</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.menu.map((menu) => (
              <tr key={menu.id}>
                <td>{menu.id}</td>
                <td>{menu.name}</td>
                <td>{menu.price === null ? 0 : menu.price}</td>
                <td>{menu.length >0 ?menu.ingredients[0] : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
 )
    }
}

const mapStateToProps = (state) => ({
  menu: state.menu.menu,
});


export default connect(mapStateToProps, { getMenu, deleteDish })(Menu);