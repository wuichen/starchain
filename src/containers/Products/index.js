import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import Button from '../../components/uielements/button';
import notification from '../../components/notification';
import AuthHelper from '../../helpers/authHelper';
import productsAction from '../../redux/products/actions';

const {fetchProducts} = productsAction

class Products extends Component {
  state = { loading: false };

  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    return (
      <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
          products
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}
export default connect(
  state => ({
    Product: state.Product
  }),
  {
    fetchProducts
  }
)(Products);
