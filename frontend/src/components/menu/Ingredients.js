import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {addDish} from '../../actions/menu';
import {Menu} from "./Menu";


export class Ingredients extends Component {
  state = {
    name: '',
    menu: ''
  };

  // static propTypes = {
  //   menu: PropTypes.array.isRequired,
  //   addDish: PropTypes.func.isRequired,
  // };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {

    const { name, menu } = this.state;
    const dish = { name, menu };


    this.props.addDish(name);
    //this.props.addDish(dish);
    e.preventDefault();
    this.setState({
      name: '',
      menu: '',
    });

  };

  render() {
    const { name, menu } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Dish</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            />
          </div>


          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  menu: state.menu.menu,
});


export default connect(mapStateToProps, { addDish })(Ingredients);