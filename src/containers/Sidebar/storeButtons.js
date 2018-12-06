import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { siteConfig } from '../../settings';
import { Modal, Button, Dropdown, Menu, Icon, message, Carousel } from 'antd';
import { connect } from 'react-redux';

class StoreButtons extends Component {
  constructor(props) {
    super(props);
    this.renderStoreName = this.renderStoreName.bind(this);
    this.createStore = this.createStore.bind(this);

  }

  state = { 
    showCreateStoreModal: false,
    page: 0

  }

  handleMenuClick(e) {
    // message.info('Click on menu item.');
    this.createStore();
    console.log('click', e);
  }

  createStore() {
    this.setState({
      showCreateStoreModal: true,
    });
  }

  handleOk(e) {
    this.slider.next()
    // console.log(e);
    // this.setState({
    //   showCreateStoreModal: false,
    // });
  }

  handleCancel(e) {
    console.log(e);
    this.setState({
      showCreateStoreModal: false,
    });
  }

  renderStoreName() {
    const User = this.props.User

    const storeName = User && User.user && User.user.stores && !!User.user.stores[0] ? User.user.stores[0].store_name : null;

    if (storeName) {
      return (
        <Dropdown overlay={this.renderMenu()}>
          <Button type='primary'>
            {storeName} <Icon type="down" />
          </Button>
        </Dropdown>
      )
    } else {
      return (
        <Button type="primary" onClick={this.createStore}>
          create store
        </Button>
      )
    }
  }

  renderMenu() {
    return (
      <Menu onClick={this.handleMenuClick.bind(this)}>
        <Menu.Item key="1"><Icon type="shop" />1st menu item</Menu.Item>
        <Menu.Item key="2"><Icon type="shop" />2nd menu item</Menu.Item>
        <Menu.Item key="3"><Icon type="shop" />3rd item</Menu.Item>
      </Menu>
    )
  }

  beforeChange(email, from, to) {
    console.log(email, from , to)
    if (to === 0) {
      this.setState({
        showCreateStoreModal: false
      })
    } else if (to === 1) {
      if (!email) {
        console.log('no email layer, this will be filled in email page(first time user), so click to submit email to db')
        // submit Email to server
      }
    }
  }

  render() {
    const email = this.props.User && this.props.User.user && this.props.User.user.email  || null
    return (
      <div className="isoLogoWrapper">
        {this.props.collapsed ? (
          <div>
            <h3>
              <Icon type="shop" theme="twoTone"/>
            </h3>
          </div>
        ) : (
          <div>
            {this.renderStoreName()}
          </div>
          )
        }

        <Modal
          title={!!email ? 'Create store' : 'Welcome to Starchain'}
          visible={this.state.showCreateStoreModal}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          okButtonProps={{ disabled: false }}
          cancelButtonProps={{ disabled: true }}
        >
          <Carousel vertical ref={slider => (this.slider = slider)} beforeChange={this.beforeChange.bind(this, email)}>
            {!email &&  (<div><h3>1</h3></div>)}            
            <div><h3>2</h3></div>
            <div><h3>3</h3></div>
            <div><h3>4</h3></div>
          </Carousel>
        </Modal>
      </div>
    )
  };
};


export default connect(
  state => ({
    User: state.User,
  })
  // { logout }
)(StoreButtons);
