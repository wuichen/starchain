import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { siteConfig } from '../../settings';
import { Modal, Button, Dropdown, Menu, Icon, message, Carousel, Form, Input, Checkbox} from 'antd';
import { connect } from 'react-redux';
const FormItem = Form.Item;

class StoreButtons extends Component {
  constructor(props) {
    super(props);
    this.renderStoreName = this.renderStoreName.bind(this);
    this.createStore = this.createStore.bind(this);

  }

  state = { 
    showCreateStoreModal: false,
    showNewUserModal: false,
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

  handleOk(type, e) {
    if (type === 'newUser') {
      this.newUserSlider.next()
    } else {
      this.createStoreSlider.next()
    }
  }

  handleCancel(type, e) {
    if (type === 'newUser') {

    }
    this.setState({
      showCreateStoreModal: false,
      showNewUserModal: false
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

  beforeChange(type, from, to) {
    console.log(type, from , to)
    if (to === 0) {
      if (type === 'newUser') {
        this.setState({
          showNewUserModal: false
        })
      } else {
        this.setState({
          showCreateStoreModal: false
        })
      }
    }
  }

  submitEmail(email) {
    console.log(email)
  }

  renderNewUserModal() {
    return (
      <Modal
        title='Welcome to Starchain'
        visible={this.state.showNewUserModal}
        onOk={this.handleOk.bind(this, 'newUser')}
        onCancel={this.handleCancel.bind(this, 'newUser')}
        footer={null}
        maskClosable={false}
      >
        <h3>
          Please input your email:
        </h3>
        <WrappedRegistrationForm submitEmail={this.submitEmail} />
      </Modal>
    )
  }
  
  renderCreateStoreModal() {
    return (
      <Modal
        title='Create store'
        visible={this.state.showCreateStoreModal}
        onOk={this.handleOk.bind(this, 'createStore')}
        onCancel={this.handleCancel.bind(this)}
        okButtonProps={{ disabled: false }}
        cancelButtonProps={{ disabled: true }}
      >
        <Carousel vertical ref={slider => (this.createStoreSlider = slider)} beforeChange={this.beforeChange.bind(this, 'createStore')}>
          <div><h3>Create Store 1</h3></div>           
          <div><h3>Create Store 2</h3></div>
          <div><h3>Create Store 3</h3></div>
          <div><h3>Create Store 4</h3></div>
        </Carousel>
      </Modal>
    )
  }

  componentDidMount() {
    const email = this.props.User && this.props.User.user && this.props.User.user.email  || null
    // if (!email) {
    //   this.setState({
    //     showNewUserModal: true
    //   })
    // } else {
    //   this.setState({
    //     showNewUserModal: false
    //   })
    // }
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
        {this.renderNewUserModal()}
        {this.renderCreateStoreModal()}
      </div>
    )
  };
};

class RegistrationForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submitEmail(values.email)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 18 },
      },
      wrapperCol: {
        xs: { span: 6 },
        sm: { span: 18 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 24,
          offset: 0,
        },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem >
          <Button type="primary" htmlType="submit" className="login-form-button">
            Start
          </Button>
        </FormItem>
      </Form>
    );
  }
}


const WrappedRegistrationForm = Form.create()(RegistrationForm);


export default connect(
  state => ({
    User: state.User,
  })
  // { logout }
)(StoreButtons);
